import { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useTheme } from './ThemeContext';

const AnimatedBackground = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    // Use springs for smooth mouse following
    const mouseX = useSpring(0, { stiffness: 400, damping: 30, mass: 0.1 });
    const mouseY = useSpring(0, { stiffness: 400, damping: 30, mass: 0.1 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Subtract half the width/height of the follower (400px / 2 = 200) to center it
            mouseX.set(e.clientX - 200);
            mouseY.set(e.clientY - 200);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className={`fixed inset-0 -z-50 h-full w-full overflow-hidden pointer-events-none transition-colors duration-500 ${isDark ? 'bg-[#030712]' : 'bg-slate-50'}`}>
            {/* Base Grid */}
            <div className={`absolute top-0 -z-10 h-full w-full bg-[size:32px_32px] ${isDark ? 'bg-[radial-gradient(#ffffff15_1px,#030712_1px)]' : 'bg-[radial-gradient(#00000010_1px,#f8fafc_1px)]'}`}></div>

            {/* Animated Gradient Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: isDark ? [0.3, 0.5, 0.3] : [0.4, 0.7, 0.4],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-0 right-0 -m-32 h-[500px] w-[500px] rounded-full blur-[120px] mix-blend-screen ${isDark ? 'bg-indigo-600/20' : 'bg-indigo-400/40 mix-blend-multiply'}`}
            />

            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: isDark ? [0.3, 0.6, 0.3] : [0.4, 0.7, 0.4],
                    x: [0, -100, 0],
                    y: [0, 100, 0],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute bottom-0 left-0 -m-32 h-[500px] w-[500px] rounded-full blur-[120px] mix-blend-screen ${isDark ? 'bg-rose-600/20' : 'bg-rose-400/40 mix-blend-multiply'}`}
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: isDark ? [0.2, 0.4, 0.2] : [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[150px] mix-blend-screen ${isDark ? 'bg-blue-600/10' : 'bg-blue-300/40 mix-blend-multiply'}`}
            />

            {/* Mouse Follower */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                className={`absolute top-0 left-0 h-[400px] w-[400px] rounded-full blur-[100px] mix-blend-screen ${isDark ? 'bg-cyan-500/20' : 'bg-cyan-400/40 mix-blend-multiply'}`}
            />
        </div>
    );
};

export default AnimatedBackground;
