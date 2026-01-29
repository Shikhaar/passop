export interface Password {
    id: string;
    site: string;
    username: string;
    password: string;
    category: string;
}

export const CATEGORIES = [
    'Social',
    'Banking',
    'Work',
    'Shopping',
    'Entertainment',
    'Other',
] as const;

export type Category = typeof CATEGORIES[number];
