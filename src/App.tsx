import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Auth from './components/Auth';
import AnimatedBackground from './components/AnimatedBackground';
import { ThemeProvider, useTheme } from './components/ThemeContext';

function AppContent() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to get session:", err);
        setLoading(false);
      });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <AnimatedBackground />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
            border: theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: theme === 'dark' ? '#f1f5f9' : '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: theme === 'dark' ? '#f1f5f9' : '#ffffff',
            },
          },
        }}
      />
      {session ? (
        <>
          <Navbar session={session} />
          <Manager session={session} />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;