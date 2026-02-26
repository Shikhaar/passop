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
    cancelEdit,
    editingId,
    copyToClipboard,
    exportToCSV,
  } = usePasswords(session);

  const handleSavePassword = () => {
    savePassword();
    setActiveTab('vault');
  };

  const handleEditPassword = (id: string) => {
    editPassword(id);
    setActiveTab('add');
  };

  const handleCancelEdit = () => {
    cancelEdit();
    setActiveTab('vault');
  };

  return (
    <>
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
          className='text-lg text-slate-600 dark:text-zinc-400 text-center mb-10 tracking-wide'
        >
          Your own digital vault.
        </motion.p>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full bg-white/60 dark:bg-black/40 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 rounded-3xl shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/50 overflow-hidden"
        >
          {/* Tab Headers */}
          <div className="flex p-2 gap-2 border-b border-slate-200/50 dark:border-white/5 bg-slate-100/50 dark:bg-white/5">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 py-3 px-6 text-sm font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'add'
                ? 'text-white bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Password
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`flex-1 py-3 px-6 text-sm font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'vault'
                ? 'text-white bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              My Vault
              {allPasswords.length > 0 && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full ${activeTab === 'vault' ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-zinc-300'}`}>
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
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                      <div className="relative flex-1 group">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search by site or username..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-sm backdrop-blur-md shadow-inner"
                        />
                      </div>
                      <div className="relative group">
                        <select
                          value={filterCategory}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="w-full sm:w-48 pl-4 pr-10 py-3.5 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-800 dark:text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-300 text-sm backdrop-blur-md shadow-inner appearance-none cursor-pointer"
                        >
                          <option value="All" className="bg-white dark:bg-zinc-900">All Categories</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-white dark:bg-zinc-900">{cat}</option>
                          ))}
                        </select>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </div>
                      <button
                        onClick={exportToCSV}
                        title="Export Passwords to CSV"
                        className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl border border-slate-200/50 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-inner backdrop-blur-md whitespace-nowrap"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span className="hidden sm:inline">Export</span>
                      </button>
                    </div>
                  )}

                  {loading ? (
                    <div className='text-slate-400 dark:text-zinc-500 text-center py-20'>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className='inline-block w-10 h-10 border-2 border-slate-200 dark:border-zinc-700 border-t-indigo-500 dark:border-t-indigo-500 rounded-full'
                      />
                    </div>
                  ) : passwordArray.length === 0 ? (
                    <div className='text-zinc-500 text-center py-20 flex flex-col items-center'>
                      <div className="w-24 h-24 mb-6 rounded-full bg-white/50 dark:bg-white/5 flex items-center justify-center border border-slate-200/50 dark:border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.02)] dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-slate-400 dark:text-zinc-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                      </div>
                      {allPasswords.length === 0 ? (
                        <>
                          <p className="text-xl text-slate-800 dark:text-white font-medium mb-2">Your vault is empty</p>
                          <p className="text-sm text-slate-500 dark:text-zinc-400 mb-6 max-w-sm">Securely store your passwords here. Get started by adding your first entry.</p>
                          <button
                            onClick={() => setActiveTab('add')}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300 hover:scale-105"
                          >
                            Add Password
                          </button>
                        </>
                      ) : (
                        <p className="text-lg text-white font-medium">No passwords match your search</p>
                      )}
                    </div>
                  ) : (
                    <div className='overflow-x-auto'>
                      <table className='w-full text-left'>
                        <thead className='text-zinc-500 text-xs font-semibold uppercase tracking-wider border-b border-white/5'>
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
                                onEdit={handleEditPassword}
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
                    isEditing={!!editingId}
                    onCancelEdit={handleCancelEdit}
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
