import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import Logo from './Logo';

interface NavbarProps {
  session: Session;
}

const Navbar = ({ session }: NavbarProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className='sticky top-4 z-50 mx-4 mt-4 backdrop-blur-md bg-slate-900/60 border border-slate-700/50 shadow-xl rounded-2xl'>
      <div className='flex items-center justify-center px-6 py-4 gap-8'>
        <Logo size="small" />

        <div className='flex items-center gap-2'>
          <span className='text-slate-400 text-sm'>
            {session.user.email}
          </span>
          <button
            onClick={handleLogout}
            className='bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-700'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
