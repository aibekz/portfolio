import { useState, useCallback, useRef, useEffect } from 'react';
import { apiClient, handleApiError, isNetworkError } from '../utils/api.js';

/**
 * Custom hook for API calls with loading, error, and retry logic
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const execute = useCallback(async (apiCall, options = {}) => {
    const { 
      onSuccess, 
      onError, 
      showLoading = true,
      retryOnNetworkError = true 
    } = options;

    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);

      const result = await apiCall();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      // Don't handle aborted requests
      if (err.name === 'AbortError') {
        return;
      }

      const errorMessage = handleApiError(err);
      setError(errorMessage);

      // Retry on network errors if enabled
      if (retryOnNetworkError && isNetworkError(err)) {
        console.warn('Network error detected, retrying...');
        // Could implement retry logic here
      }

      if (onError) {
        onError(err);
      }

      throw err;
    } finally {
      if (showLoading) {
        setLoading(false);
      }
      abortControllerRef.current = null;
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    cancel,
    clearError,
  };
};

/**
 * Custom hook for GET requests with caching
 */
export const useApiGet = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, execute, clearError } = useApi();
  const cacheRef = useRef(new Map());
  
  const {
    params = {},
    dependencies = [],
    enabled = true,
    cacheKey,
    cacheDuration = 5 * 60 * 1000, // 5 minutes
    onSuccess,
    onError,
  } = options;

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (!endpoint || !enabled) return;

    const key = cacheKey || `${endpoint}_${JSON.stringify(params)}`;
    const cached = cacheRef.current.get(key);
    
    // Return cached data if available and not expired
    if (!forceRefresh && cached && (Date.now() - cached.timestamp) < cacheDuration) {
      setData(cached.data);
      return cached.data;
    }

    try {
      const result = await execute(
        () => apiClient.get(endpoint, params),
        { onSuccess, onError }
      );

      // Cache the result
      cacheRef.current.set(key, {
        data: result,
        timestamp: Date.now(),
      });

      setData(result);
      return result;
    } catch (err) {
      console.error('API GET error:', err);
      throw err;
    }
  }, [endpoint, params, enabled, cacheKey, cacheDuration, execute, onSuccess, onError]);

  // Auto-fetch on mount and dependency changes
  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    clearError,
  };
};

/**
 * Custom hook for POST requests
 */
export const useApiPost = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, execute, clearError } = useApi();
  
  const { onSuccess, onError } = options;

  const post = useCallback(async (postData) => {
    try {
      const result = await execute(
        () => apiClient.post(endpoint, postData),
        { onSuccess, onError }
      );

      setData(result);
      return result;
    } catch (err) {
      console.error('API POST error:', err);
      throw err;
    }
  }, [endpoint, execute, onSuccess, onError]);

  return {
    data,
    loading,
    error,
    post,
    clearError,
  };
};

/**
 * Custom hook for PUT requests
 */
export const useApiPut = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, execute, clearError } = useApi();
  
  const { onSuccess, onError } = options;

  const put = useCallback(async (putData) => {
    try {
      const result = await execute(
        () => apiClient.put(endpoint, putData),
        { onSuccess, onError }
      );

      setData(result);
      return result;
    } catch (err) {
      console.error('API PUT error:', err);
      throw err;
    }
  }, [endpoint, execute, onSuccess, onError]);

  return {
    data,
    loading,
    error,
    put,
    clearError,
  };
};

/**
 * Custom hook for DELETE requests
 */
export const useApiDelete = (options = {}) => {
  const [data, setData] = useState(null);
  const { loading, error, execute, clearError } = useApi();
  
  const { onSuccess, onError } = options;

  const deleteRequest = useCallback(async (endpoint) => {
    try {
      const result = await execute(
        () => apiClient.delete(endpoint),
        { onSuccess, onError }
      );

      setData(result);
      return result;
    } catch (err) {
      console.error('API DELETE error:', err);
      throw err;
    }
  }, [execute, onSuccess, onError]);

  return {
    data,
    loading,
    error,
    delete: deleteRequest,
    clearError,
  };
};

/**
 * Custom hook for paginated API calls
 */
export const useApiPagination = (endpoint, options = {}) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  
  const { loading, error, execute, clearError } = useApi();
  
  const {
    pageSize = 10,
    initialPage = 1,
    onSuccess,
    onError,
  } = options;

  const fetchPage = useCallback(async (page = 1) => {
    try {
      const result = await execute(
        () => apiClient.get(endpoint, { page, limit: pageSize }),
        { onSuccess, onError }
      );

      setData(result.data || result);
      setPagination({
        page: result.page || page,
        totalPages: result.totalPages || 1,
        totalItems: result.totalItems || (result.data?.length || 0),
        hasNextPage: result.hasNextPage || false,
        hasPrevPage: result.hasPrevPage || false,
      });

      return result;
    } catch (err) {
      console.error('API Pagination error:', err);
      throw err;
    }
  }, [endpoint, pageSize, execute, onSuccess, onError]);

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      return fetchPage(pagination.page + 1);
    }
  }, [fetchPage, pagination.hasNextPage, pagination.page]);

  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      return fetchPage(pagination.page - 1);
    }
  }, [fetchPage, pagination.hasPrevPage, pagination.page]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      return fetchPage(page);
    }
  }, [fetchPage, pagination.totalPages]);

  // Initial fetch
  useEffect(() => {
    fetchPage(initialPage);
  }, [fetchPage, initialPage]);

  return {
    data,
    pagination,
    loading,
    error,
    fetchPage,
    nextPage,
    prevPage,
    goToPage,
    clearError,
  };
};
