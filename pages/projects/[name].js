import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchFileSystem } from '../../firebase/utils/fireStoreOperations';
import { useRouter } from 'next/router';

export default function ProjectPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    // Only fetch when we have the project name
    if (!name) return;

    const initFS = async () => {
      try {
        setLoading(true);
        setError(null);
        const fs = await fetchFileSystem();
        
        console.log(fs?.["~"]?.["content"]?.["projects"]?.["content"]);
        if (fs?.["~"]?.["content"]?.["projects"]?.["content"]?.[name]?.["content"]) {
          setContent(fs["~"]["content"]["projects"]["content"][name]["content"]);
          
        } else {
          throw new Error("Project content not found");
        }
      } catch (err) {
        console.error("Error loading project:", err);
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    initFS();
  }, [name]); // Add name as dependency

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#1e1e1e',
        color: '#00ff00',
        fontFamily: 'Cascadia Code, monospace'
      }}>
        <div style={{
          border: '2px solid #00ff00',
          padding: '2rem',
          borderRadius: '8px',
          animation: 'pulse 1.5s infinite',
          background: 'rgba(0,255,0,0.1)'
        }}>
          <style jsx>{`
            @keyframes pulse {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
          `}</style>
          Loading project details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: '#ff0000',
        background: '#1e1e1e',
        fontFamily: 'Cascadia Code, monospace'
      }}>
        <div>Error: {error}</div>
      </div>
    );
  }

  return content ? (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
    }}>
      <iframe 
        srcDoc={content} 
        title="HTML Viewer" 
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          overflow: 'auto',
          display: 'block', // Remove any inline spacing
          position: 'absolute',
          top: 0,
          left: 0
        }} 
      />
    </div>
  ) : null;
}