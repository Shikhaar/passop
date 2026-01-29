import { motion } from 'framer-motion';
import { getPasswordStrength } from '../utils/passwordGenerator';

interface PasswordStrengthProps {
    password: string;
}

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
    const { level, score } = getPasswordStrength(password);

    if (!password) return null;

    const colors = {
        weak: 'bg-red-500',
        medium: 'bg-yellow-500',
        strong: 'bg-green-500',
    };

    const labels = {
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong',
    };

    const widths = {
        weak: '33%',
        medium: '66%',
        strong: '100%',
    };

    return (
        <div className="mt-2">
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: widths[level] }}
                    transition={{ duration: 0.3 }}
                    className={`h-full ${colors[level]} rounded-full`}
                />
            </div>
            <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${level === 'weak' ? 'text-red-400' : level === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {labels[level]} password
                </span>
                <span className="text-xs text-slate-500">{score}/7</span>
            </div>
        </div>
    );
};

export default PasswordStrength;
