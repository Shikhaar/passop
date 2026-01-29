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
            <motion.div
                className={`relative ${isSmall ? 'w-8 h-8' : 'w-12 h-12'}`}
                initial={{ rotate: -10, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-full h-full"
                >
                    {/* Shield gradient background */}
                    <defs>
                        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="50%" stopColor="#6366f1" />
                            <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Shield shape */}
                    <path
                        d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"
                        fill="url(#shieldGradient)"
                        filter="url(#glow)"
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
                        fill="#3b82f6"
                    />
                </svg>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full -z-10" />
            </motion.div>

            {/* Text */}
            <div className={`font-bold tracking-tight ${isSmall ? 'text-xl' : 'text-4xl'}`}>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Pass
                </span>
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    OP
                </span>
            </div>
        </motion.div>
    );
};

export default Logo;
