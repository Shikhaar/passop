import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { usePasswords } from '../hooks/usePasswords';
import { CATEGORIES } from '../types/password';
import PasswordForm from './PasswordForm';
import PasswordRow from './PasswordRow';
import Logo from './Logo';

interface ManagerProps {
  session: Session;
}

const Manager = ({ session }: ManagerProps) => {
  const [activeTab, setActiveTab] = useState<'add' | 'vault'>('vault');

  const {
    form,
    setForm,
    passwordArray,
    allPasswords,
    loading,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
    handleChange,
    savePassword,
    deletePassword,
    editPassword,
    copyToClipboard,
  } = usePasswords(session);

  const handleSavePassword = () => {
    savePassword();
    setActiveTab('vault');
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#020617] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-6xl w-full mx-auto min-h-[85vh] py-10 px-6 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <Logo size="large" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-lg text-slate-400 text-center mb-10'
        >
          Your own digital vault.
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Tab Headers */}
          <div className="flex border-b border-slate-700/50">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'add'
                ? 'text-white bg-slate-800/50 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Password
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'vault'
                ? 'text-white bg-slate-800/50 border-b-2 border-blue-500'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              My Vault
              {allPasswords.length > 0 && (
                <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                  {allPasswords.length}
                </span>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'vault' ? (
                <motion.div
                  key="vault"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Search and Filter */}
                  {allPasswords.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                      <div className="relative flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search by site or username..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                        />
                      </div>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/50 text-white focus:border-blue-500 outline-none transition-all text-sm"
                      >
                        <option value="All" className="bg-slate-800">All Categories</option>
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {loading ? (
                    <div className='text-slate-500 text-center py-16'>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className='inline-block w-8 h-8 border-2 border-slate-500 border-t-blue-500 rounded-full'
                      />
                    </div>
                  ) : passwordArray.length === 0 ? (
                    <div className='text-slate-500 text-center py-16'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                      {allPasswords.length === 0 ? (
                        <>
                          <p className="text-lg mb-2">Your vault is empty</p>
                          <p className="text-sm text-slate-600 mb-4">Add your first password to get started</p>
                          <button
                            onClick={() => setActiveTab('add')}
                            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            + Add Password
                          </button>
                        </>
                      ) : (
                        <p className="text-lg">No passwords match your search</p>
                      )}
                    </div>
                  ) : (
                    <div className='overflow-x-auto'>
                      <table className='w-full text-left'>
                        <thead className='text-slate-400 text-xs uppercase border-b border-slate-800'>
                          <tr>
                            <th className='py-3 px-4'>Site</th>
                            <th className='py-3 px-4'>Username</th>
                            <th className='py-3 px-4'>Password</th>
                            <th className='py-3 px-4'>Category</th>
                            <th className='py-3 px-4 text-right'>Actions</th>
                          </tr>
                        </thead>
                        <AnimatePresence mode='popLayout'>
                          <tbody>
                            {passwordArray.map((item, index) => (
                              <PasswordRow
                                key={item.id}
                                item={item}
                                index={index}
                                onEdit={editPassword}
                                onDelete={deletePassword}
                                onCopy={copyToClipboard}
                              />
                            ))}
                          </tbody>
                        </AnimatePresence>
                      </table>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="add"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md mx-auto"
                >
                  <PasswordForm
                    form={form}
                    handleChange={handleChange}
                    savePassword={handleSavePassword}
                    setForm={setForm}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Manager;
