import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useTheme } from './ThemeContext';
import Logo from './Logo';

interface NavbarProps {
  session: Session;
}

const Navbar = ({ session }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className='sticky top-4 z-50 mx-4 mt-4 backdrop-blur-xl bg-black/40 dark:bg-black/40 border-white/10 dark:border-white/10 border-slate-200/50 shadow-2xl rounded-3xl'>
      <div className='flex items-center justify-between px-6 py-4 max-w-6xl mx-auto'>
        <Logo size="small" />

        <div className='flex items-center gap-4'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-xl text-zinc-500 hover:text-indigo-500 bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300'
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>

          <span className='hidden sm:block text-zinc-500 dark:text-zinc-400 text-sm font-medium'>
            {session.user.email}
          </span>
          <button
            onClick={handleLogout}
            className='bg-white/5 hover:bg-rose-500/10 text-zinc-600 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border border-black/10 dark:border-white/10 hover:border-rose-500/30 shadow-inner'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
