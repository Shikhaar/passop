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
    <nav className='sticky top-4 z-50 mx-4 mt-4 backdrop-blur-xl bg-black/40 border border-white/10 shadow-2xl rounded-3xl'>
      <div className='flex items-center justify-between px-6 py-4 max-w-6xl mx-auto'>
        <Logo size="small" />

        <div className='flex items-center gap-4'>
          <span className='text-zinc-400 text-sm font-medium'>
            {session.user.email}
          </span>
          <button
            onClick={handleLogout}
            className='bg-white/5 hover:bg-rose-500/10 text-zinc-300 hover:text-rose-400 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border border-white/10 hover:border-rose-500/30 shadow-inner'
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
