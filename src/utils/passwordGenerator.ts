// Password Generator Utility

interface GeneratorOptions {
    length: number;
    includeUppercase: boolean;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export const generatePassword = (options: GeneratorOptions): string => {
    let chars = '';
    let password = '';

    if (options.includeLowercase) chars += LOWERCASE;
    if (options.includeUppercase) chars += UPPERCASE;
    if (options.includeNumbers) chars += NUMBERS;
    if (options.includeSymbols) chars += SYMBOLS;

    if (chars.length === 0) chars = LOWERCASE + NUMBERS;

    // Ensure at least one of each selected type
    if (options.includeLowercase) password += LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)];
    if (options.includeUppercase) password += UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)];
    if (options.includeNumbers) password += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    if (options.includeSymbols) password += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

    // Fill remaining length
    for (let i = password.length; i < options.length; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle the password
    return password.split('').sort(() => Math.random() - 0.5).join('');
};

export const getPasswordStrength = (password: string): { level: 'weak' | 'medium' | 'strong'; score: number } => {
    if (!password) return { level: 'weak', score: 0 };

    let score = 0;

    // Length
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character variety
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    // Deduct for common patterns
    if (/^[a-zA-Z]+$/.test(password)) score -= 1;
    if (/^[0-9]+$/.test(password)) score -= 2;
    if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters

    const level = score <= 3 ? 'weak' : score <= 5 ? 'medium' : 'strong';
    return { level, score: Math.min(Math.max(score, 0), 7) };
};

export const defaultGeneratorOptions: GeneratorOptions = {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
};
