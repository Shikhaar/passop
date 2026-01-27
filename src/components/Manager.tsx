import { Session } from '@supabase/supabase-js';
import { usePasswords } from '../hooks/usePasswords';
import PasswordForm from './PasswordForm';
import PasswordRow from './PasswordRow';

interface ManagerProps {
  session: Session;
}

const Manager = ({ session }: ManagerProps) => {
  const {
    form,
    passwordArray,
    loading,
    handleChange,
    savePassword,
    deletePassword,
    editPassword,
    copyToClipboard,
  } = usePasswords(session);

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="mycontainer mx-auto min-h-[85vh] mt-10 px-4">
        <h1 className='text-5xl font-extrabold text-center bg-gradient-to-r from-blue-400 to-slate-200 bg-clip-text text-transparent mb-3'>
          <span className='text-blue-500'>&lt;</span>
          <span>Pass</span><span className='text-blue-500'>OP/&gt;</span>
        </h1>
        <p className='text-lg text-slate-400 text-center mb-12'>Your own digital vault.</p>

        <div className="flex flex-col p-4 w-full max-w-4xl mx-auto space-y-6">
          <PasswordForm
            form={form}
            handleChange={handleChange}
            savePassword={savePassword}
          />

          <div className="passwords mt-16">
            <h2 className='font-bold text-2xl py-4 text-white border-b border-slate-800 mb-6'>Your Passwords</h2>

            {loading ? (
              <div className='text-slate-500 text-center py-10'>
                Loading...
              </div>
            ) : passwordArray.length === 0 ? (
              <div className='text-slate-500 text-center py-10 bg-slate-900/30 rounded-2xl border border-slate-800/50 backdrop-blur-sm'>
                No passwords to show
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='w-full text-left'>
                  <thead className='text-slate-400 text-sm uppercase border-b border-slate-800'>
                    <tr>
                      <th className='py-3 px-4'>Site</th>
                      <th className='py-3 px-4'>Username</th>
                      <th className='py-3 px-4'>Password</th>
                      <th className='py-3 px-4 text-right'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {passwordArray.map((item) => (
                      <PasswordRow
                        key={item.id}
                        item={item}
                        onEdit={editPassword}
                        onDelete={deletePassword}
                        onCopy={copyToClipboard}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
