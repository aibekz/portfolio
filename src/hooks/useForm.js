import { useState, useCallback, useRef } from 'react';
import { validateForm } from '../utils/validation.js';

/**
 * Custom hook for form management with validation
 */
export const useForm = (initialValues = {}, validationRules = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const initialValuesRef = useRef(initialValues);

  // Update field value
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  }, [errors]);

  // Handle input change
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValue(name, fieldValue);
  }, [setValue]);

  // Handle field blur
  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }));

    // Validate single field on blur
    if (validationRules[name]) {
      const fieldValidation = validateForm(
        { [name]: values[name] },
        { [name]: validationRules[name] }
      );
      
      if (!fieldValidation.isValid) {
        setErrors(prev => ({
          ...prev,
          [name]: fieldValidation.errors[name],
        }));
      }
    }
  }, [values, validationRules]);

  // Set field error
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, []);

  // Clear field error
  const clearFieldError = useCallback((name) => {
    setErrors(prev => ({
      ...prev,
      [name]: undefined,
    }));
  }, []);

  // Validate all fields
  const validate = useCallback(() => {
    const validation = validateForm(values, validationRules);
    setErrors(validation.errors);
    return validation.isValid;
  }, [values, validationRules]);

  // Reset form
  const reset = useCallback((newValues = initialValuesRef.current) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setIsDirty(false);
    initialValuesRef.current = newValues;
  }, []);

  // Submit form
  const handleSubmit = useCallback((onSubmit) => {
    return async (event) => {
      if (event) {
        event.preventDefault();
      }

      setIsSubmitting(true);
      
      // Mark all fields as touched
      const allTouched = Object.keys(validationRules).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setTouched(allTouched);

      // Validate form
      const isValid = validate();
      
      if (isValid && onSubmit) {
        try {
          await onSubmit(values);
        } catch (error) {
          console.error('Form submission error:', error);
          // Handle submission errors if needed
        }
      }

      setIsSubmitting(false);
    };
  }, [values, validate, validationRules]);

  // Get field props for easy binding
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
  }), [values, handleChange, handleBlur]);

  // Get field state
  const getFieldState = useCallback((name) => ({
    error: errors[name],
    touched: touched[name],
    hasError: Boolean(errors[name] && touched[name]),
  }), [errors, touched]);

  // Check if form is valid
  const isValid = Object.keys(errors).length === 0;

  // Check if form has been modified
  const isModified = isDirty && JSON.stringify(values) !== JSON.stringify(initialValuesRef.current);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    isValid,
    isModified,
    setValue,
    setFieldError,
    clearFieldError,
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    reset,
    getFieldProps,
    getFieldState,
  };
};

/**
 * Custom hook for multi-step forms
 */
export const useMultiStepForm = (steps = [], initialValues = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState(
    steps.reduce((acc, _, index) => {
      acc[index] = {};
      return acc;
    }, {})
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const nextStep = useCallback(() => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  }, [isLastStep]);

  const prevStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  const goToStep = useCallback((step) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  }, [totalSteps]);

  const updateStepData = useCallback((step, data) => {
    setStepData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  }, []);

  const getAllData = useCallback(() => {
    return Object.values(stepData).reduce((acc, data) => ({
      ...acc,
      ...data,
    }), initialValues);
  }, [stepData, initialValues]);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setStepData(
      steps.reduce((acc, _, index) => {
        acc[index] = {};
        return acc;
      }, {})
    );
  }, [steps]);

  return {
    currentStep,
    isFirstStep,
    isLastStep,
    totalSteps,
    progress,
    stepData: stepData[currentStep] || {},
    allData: getAllData(),
    nextStep,
    prevStep,
    goToStep,
    updateStepData: (data) => updateStepData(currentStep, data),
    reset,
  };
};

/**
 * Custom hook for form field arrays (dynamic lists)
 */
export const useFieldArray = (name, initialValue = []) => {
  const [fields, setFields] = useState(initialValue);

  const append = useCallback((value) => {
    setFields(prev => [...prev, value]);
  }, []);

  const prepend = useCallback((value) => {
    setFields(prev => [value, ...prev]);
  }, []);

  const insert = useCallback((index, value) => {
    setFields(prev => [
      ...prev.slice(0, index),
      value,
      ...prev.slice(index),
    ]);
  }, []);

  const remove = useCallback((index) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  }, []);

  const move = useCallback((from, to) => {
    setFields(prev => {
      const newFields = [...prev];
      const [removed] = newFields.splice(from, 1);
      newFields.splice(to, 0, removed);
      return newFields;
    });
  }, []);

  const swap = useCallback((indexA, indexB) => {
    setFields(prev => {
      const newFields = [...prev];
      [newFields[indexA], newFields[indexB]] = [newFields[indexB], newFields[indexA]];
      return newFields;
    });
  }, []);

  const update = useCallback((index, value) => {
    setFields(prev => prev.map((field, i) => i === index ? value : field));
  }, []);

  const clear = useCallback(() => {
    setFields([]);
  }, []);

  const reset = useCallback((newFields = initialValue) => {
    setFields(newFields);
  }, [initialValue]);

  return {
    fields,
    append,
    prepend,
    insert,
    remove,
    move,
    swap,
    update,
    clear,
    reset,
  };
};
