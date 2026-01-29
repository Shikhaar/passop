import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../types/password';
import { generatePassword, defaultGeneratorOptions } from '../utils/passwordGenerator';
import PasswordStrength from './PasswordStrength';

interface PasswordFormProps {
    form: { site: string; username: string; password: string; category: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    savePassword: () => void;
    setForm: (form: { site: string; username: string; password: string; category: string }) => void;
    isEditing?: boolean;
    onCancelEdit?: () => void;
}

const PasswordForm = ({ form, handleChange, savePassword, setForm, isEditing, onCancelEdit }: PasswordFormProps) => {
    const [showGenerator, setShowGenerator] = useState(false);
    const [genOptions, setGenOptions] = useState(defaultGeneratorOptions);

    const handleGenerate = () => {
        const newPassword = generatePassword(genOptions);
        setForm({ ...form, password: newPassword });
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className='relative w-full'>
                <label className='text-slate-400 text-sm mb-2 block'>Website URL</label>
                <input
                    className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                    type="text"
                    name="site"
                    value={form.site}
                    onChange={handleChange}
                    placeholder="e.g. google.com"
                />
            </div>

            <div className='relative w-full'>
                <label className='text-slate-400 text-sm mb-2 block'>Username / Email</label>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                    placeholder="e.g. john@email.com"
                />
            </div>

            <div className='relative w-full'>
                <label className='text-slate-400 text-sm mb-2 block'>Password</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className='flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 font-mono'
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowGenerator(!showGenerator)}
                        className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                        title="Generate password"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>
                <PasswordStrength password={form.password} />

                {/* Generator Options */}
                <AnimatePresence>
                    {showGenerator && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-slate-300">Length: {genOptions.length}</span>
                                <input
                                    type="range"
                                    min="8"
                                    max="32"
                                    value={genOptions.length}
                                    onChange={(e) => setGenOptions({ ...genOptions, length: parseInt(e.target.value) })}
                                    className="w-32 accent-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-4">
                                {[
                                    { key: 'includeUppercase', label: 'ABC' },
                                    { key: 'includeLowercase', label: 'abc' },
                                    { key: 'includeNumbers', label: '123' },
                                    { key: 'includeSymbols', label: '#$%' },
                                ].map((opt) => (
                                    <label key={opt.key} className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={genOptions[opt.key as keyof typeof genOptions] as boolean}
                                            onChange={(e) => setGenOptions({ ...genOptions, [opt.key]: e.target.checked })}
                                            className="accent-blue-500"
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={handleGenerate}
                                className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all"
                            >
                                Generate
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='relative w-full'>
                <label className='text-slate-400 text-sm mb-2 block'>Category</label>
                <div className="relative">
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 pr-10 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 appearance-none cursor-pointer'
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                        ))}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                {isEditing && onCancelEdit && (
                    <motion.button
                        onClick={onCancelEdit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex-1 flex justify-center items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300'
                    >
                        Cancel
                    </motion.button>
                )}
                <motion.button
                    onClick={savePassword}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex-1 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                >
                    {isEditing ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Update Password
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Save Password
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
};

export default PasswordForm;
