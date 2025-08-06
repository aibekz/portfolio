import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github.css'; // You can change this theme

export default function MarkdownRenderer({ content, className = '' }) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // Custom styling for markdown elements
          h1: ({ children }) => (
            <h1 className="text-2xl font-mono font-bold mb-4 pb-2 markdown-h1">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-mono font-bold mb-3 mt-6 markdown-h2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-mono font-bold mb-2 mt-4 markdown-h3">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-body font-mono leading-relaxed mb-4 markdown-p">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-accent hover:underline"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          code: ({ inline, className, children }) => {
            if (inline) {
              return (
                <code className="bg-gray-100 text-primary px-1 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono`}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 pl-4 italic my-4 font-mono markdown-blockquote">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 font-mono space-y-1 markdown-list">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 font-mono space-y-1 markdown-list">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-body leading-relaxed">
              {children}
            </li>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border border-gray-300 font-mono text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-3 py-2 bg-gray-100 font-bold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-3 py-2">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="border-gray-300 my-6" />
          ),
          strong: ({ children }) => (
            <strong className="font-bold markdown-strong">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic markdown-em">
              {children}
            </em>
          ),
          img: ({ src, alt, title }) => (
            <img
              src={src}
              alt={alt}
              title={title}
              className="max-w-full h-auto rounded-lg shadow-md my-4 mx-auto block"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
