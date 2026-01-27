import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface NavbarProps {
  session: Session;
}

const Navbar = ({ session }: NavbarProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-slate-700/50 shadow-lg'>
      <div className='max-w-6xl mx-auto flex justify-between items-center px-4 py-4'>

        <div className="logo font-bold text-white text-2xl tracking-tight cursor-pointer flex items-center gap-1">
          <span className='text-blue-500 text-3xl'>&lt;</span>
          <span>Pass</span><span className='text-blue-500'>OP/&gt;</span>
        </div>

        <div className='flex items-center gap-6'>
          <span className='text-slate-400 text-sm hidden sm:block'>
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
