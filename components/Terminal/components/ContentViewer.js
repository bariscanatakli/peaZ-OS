import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import DOMPurify from 'dompurify';

const IframeViewer = ({ content }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      
      // Add default styles
      const styles = `
        body { 
          margin: 0; 
          padding: 1rem;
          font-family: 'Courier New', monospace;
          color: #00ff00;
          background: #1e1e1e;
        }
        pre { white-space: pre-wrap; }
      `;

      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <style>${styles}</style>
          </head>
          <body>${DOMPurify.sanitize(content)}</body>
        </html>
      `);
      doc.close();

      // Resize iframe to content
      const resizeObserver = new ResizeObserver(() => {
        iframe.style.height = doc.body.scrollHeight + 'px';
      });
      resizeObserver.observe(doc.body);

      return () => resizeObserver.disconnect();
    }
  }, [content]);

  return (
    <iframe
      ref={iframeRef}
      className="html-viewer-iframe"
      sandbox="allow-same-origin"
      title="HTML Content"
    />
  );
};

const ContentViewer = ({ content, type = 'text' }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  if (!content) return null;
  if (isLoading) return <div className="content-loading">Loading content...</div>;
  if (error) return <div className="content-error">{error}</div>;

  try {
    switch (type.toLowerCase()) {
      case 'html':
        return (
          <div className="html-viewer-container">
            <IframeViewer content={content} />
          </div>
        );

      case 'markdown':
        return (
          <ReactMarkdown
            className="markdown-viewer"
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        );

      default:
        return (
          <pre className="text-viewer">
            {content}
          </pre>
        );
    }
  } catch (error) {
    console.error('Content rendering error:', error);
    setError('Error rendering content. Please try again.');
    return null;
  }
};

export default ContentViewer;