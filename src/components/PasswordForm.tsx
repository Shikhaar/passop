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
        <div className='flex flex-col gap-6'>
            <div className='relative w-full group'>
                <label className='text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2 block group-focus-within:text-indigo-400 transition-colors'>Website URL</label>
                <input
                    className='w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-300 backdrop-blur-md shadow-inner'
                    type="text"
                    name="site"
                    value={form.site}
                    onChange={handleChange}
                    placeholder="e.g. google.com"
                />
            </div>

            <div className='relative w-full group'>
                <label className='text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2 block group-focus-within:text-indigo-400 transition-colors'>Username / Email</label>
                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className='w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-300 backdrop-blur-md shadow-inner'
                    placeholder="e.g. john@email.com"
                />
            </div>

            <div className='relative w-full group'>
                <label className='text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2 block group-focus-within:text-indigo-400 transition-colors'>Password</label>
                <div className="flex gap-3">
                    <input
                        type={showGenerator ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className='flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 text-white placeholder-zinc-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-300 font-mono backdrop-blur-md shadow-inner'
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowGenerator(!showGenerator)}
                        className={`px-5 py-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-center ${showGenerator ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400' : 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white'}`}
                        title="Generate password"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>
                <div className="mt-3">
                    <PasswordStrength password={form.password} />
                </div>

                {/* Generator Options */}
                <AnimatePresence>
                    {showGenerator && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: 'auto', y: 0 }}
                            exit={{ opacity: 0, height: 0, y: -10 }}
                            className="mt-4 p-5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl overflow-hidden"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-zinc-300">Length: <span className="text-indigo-400 ml-1">{genOptions.length}</span></span>
                                    <input
                                        type="range"
                                        min="8"
                                        max="32"
                                        value={genOptions.length}
                                        onChange={(e) => setGenOptions({ ...genOptions, length: parseInt(e.target.value) })}
                                        className="w-32 accent-indigo-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { key: 'includeUppercase', label: 'ABC' },
                                        { key: 'includeLowercase', label: 'abc' },
                                        { key: 'includeNumbers', label: '123' },
                                        { key: 'includeSymbols', label: '#$%' },
                                    ].map((opt) => (
                                        <label key={opt.key} className="flex items-center gap-3 text-sm font-medium text-zinc-400 cursor-pointer hover:text-white transition-colors">
                                            <input
                                                type="checkbox"
                                                checked={genOptions[opt.key as keyof typeof genOptions] as boolean}
                                                onChange={(e) => setGenOptions({ ...genOptions, [opt.key]: e.target.checked })}
                                                className="w-4 h-4 rounded border-white/20 bg-black/50 text-indigo-500 focus:ring-indigo-500/50 focus:ring-offset-0 focus:ring-2 transition-all"
                                            />
                                            {opt.label}
                                        </label>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={handleGenerate}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
                                >
                                    Generate New Password
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className='relative w-full group'>
                <label className='text-zinc-400 text-xs uppercase tracking-wider font-semibold mb-2 block group-focus-within:text-indigo-400 transition-colors'>Category</label>
                <div className="relative">
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className='w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3.5 pr-10 text-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all duration-300 appearance-none cursor-pointer backdrop-blur-md shadow-inner'
                    >
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                        ))}
                    </select>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-focus-within:text-indigo-400 transition-colors">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            <div className="flex gap-4 mt-4">
                {isEditing && onCancelEdit && (
                    <motion.button
                        onClick={onCancelEdit}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='flex-1 flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-2xl px-6 py-4 transition-all duration-300'
                    >
                        Cancel
                    </motion.button>
                )}
                <motion.button
                    onClick={savePassword}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex-[2] flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl px-6 py-4 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]'
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
