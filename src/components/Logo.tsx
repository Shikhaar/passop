import { motion } from 'framer-motion';

const Logo = ({ size = 'large' }: { size?: 'small' | 'large' }) => {
    const isSmall = size === 'small';

    return (
        <motion.div
            className="flex items-center gap-3 cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            {/* Shield Icon */}
            <div className={`relative ${isSmall ? 'w-8 h-8' : 'w-12 h-12'}`}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full"
                >
                    {/* Shield gradient background */}
                    <defs>
                        <linearGradient id={`shieldGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="50%" stopColor="#8b5cf6" />
                            <stop offset="100%" stopColor="#e11d48" />
                        </linearGradient>
                        <filter id={`glow-${size}`}>
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Shield shape */}
                    <path
                        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                        fill={`url(#shieldGradient-${size})`}
                        filter={`url(#glow-${size})`}
                        opacity="0.9"
                    />

                    {/* Lock icon inside shield */}
                    <path
                        d="M12 7a2 2 0 0 0-2 2v1h4V9a2 2 0 0 0-2-2z"
                        fill="white"
                        opacity="0.9"
                    />
                    <rect
                        x="9"
                        y="10"
                        width="6"
                        height="5"
                        rx="1"
                        fill="white"
                        opacity="0.9"
                    />
                    <circle
                        cx="12"
                        cy="12.5"
                        r="1"
                        fill="#4f46e5"
                    />
                </svg>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-indigo-500/30 blur-xl rounded-full -z-10" />
            </div>

            {/* Text */}
            <div className={`font-bold tracking-tight ${isSmall ? 'text-xl' : 'text-4xl'}`}>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                    Pass
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                    OP
                </span>
            </div>
        </motion.div>
    );
};

export default Logo;
