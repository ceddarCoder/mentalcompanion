import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MessageBubbleProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isUser, timestamp }) => {
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const components: Components = {
    code: ({ className, children, ...props }) => {
      const isBlock = className?.includes('language-') || children?.toString().includes('\n');

      if (isBlock) {
        return (
          <div className="bg-gray-100 rounded-md p-3 my-2">
            <code className="text-gray-800 text-sm font-mono" {...props}>
              {children}
            </code>
          </div>
        );
      }

      return (
        <code className="bg-gray-100 text-gray-800 px-1 py-0.5 rounded" {...props}>
          {children}
        </code>
      );
    },
    ul: ({ children }) => <ul className="list-disc pl-4 my-1">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal pl-4 my-1">{children}</ol>,
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-teal-600 hover:text-teal-700 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    h1: ({ children }) => <h1 className="text-xl font-bold my-2">{children}</h1>,
    h2: ({ children }) => <h2 className="text-lg font-bold my-2">{children}</h2>,
    h3: ({ children }) => <h3 className="text-base font-bold my-1">{children}</h3>,
    p: ({ children }) => <p className="my-1">{children}</p>, // Ensure consistent paragraph styling
  };

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
      <span className="text-xs text-gray-500 mb-1 px-2">{formatTimestamp(timestamp)}</span>
      <div
        className={`rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-teal-500 text-white rounded-tr-none'
            : 'bg-gray-100 text-gray-800 rounded-tl-none'
        }`}
      >
        {/* Use the same font and font weight for both user and model messages */}
        <div className="font-sans text-base font-normal"> {/* Explicitly set font-normal */}
          {isUser ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : (
            <div className="markdown-content prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:my-0">
              <ReactMarkdown components={components}>{text}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;