import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import Navbar from './components/Navbar';
import Manager from './components/Manager';
import Auth from './components/Auth';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
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

export default App;