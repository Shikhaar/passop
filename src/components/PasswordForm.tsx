import { motion } from 'framer-motion';

interface PasswordFormProps {
    form: { site: string; username: string; password: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    savePassword: () => void;
}

const PasswordForm = ({ form, handleChange, savePassword }: PasswordFormProps) => {
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
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                    placeholder="••••••••"
                />
            </div>

            <motion.button
                onClick={savePassword}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl px-6 py-3 mt-2 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Save Password
            </motion.button>
        </div>
    );
};

export default PasswordForm;
