import { motion } from 'framer-motion';

interface PasswordFormProps {
    form: { site: string; username: string; password: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    savePassword: () => void;
}

const PasswordForm = ({ form, handleChange, savePassword }: PasswordFormProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col gap-8'
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className='relative w-full'
            >
                <input
                    className='w-full rounded-2xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                    type="text"
                    name="site"
                    value={form.site}
                    onChange={handleChange}
                    placeholder="Website URL"
                />
            </motion.div>

            <div className="flex gap-6 w-full">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className='relative w-full'
                >
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                        placeholder="Username"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className='relative w-full'
                >
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className='w-full rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300'
                        placeholder="Password"
                    />
                </motion.div>
            </div>

            <motion.button
                onClick={savePassword}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className='flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-8 py-3 w-fit mx-auto transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
            >
                <span>Add Password</span>
            </motion.button>
        </motion.div>
    );
};

export default PasswordForm;
