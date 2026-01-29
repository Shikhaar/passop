import { useState, useEffect, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { Password } from '../types/password';

export const usePasswords = (session: Session) => {
    const [form, setForm] = useState({ site: '', username: '', password: '', category: 'Other' });
    const [passwordArray, setPasswordArray] = useState<Password[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('All');

    // Fetch passwords from Supabase
    const fetchPasswords = useCallback(async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('passwords')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching passwords:', error);
            toast.error('Failed to load passwords');
        } else {
            setPasswordArray(data || []);
        }
        setLoading(false);
    }, [session.user.id]);

    useEffect(() => {
        fetchPasswords();
    }, [fetchPasswords]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = async () => {
        if (!form.site || !form.username || !form.password) {
            toast.error('Please fill all fields');
            return;
        }

        const { error } = await supabase.from('passwords').insert({
            user_id: session.user.id,
            site: form.site,
            username: form.username,
            password: form.password,
            category: form.category,
        });

        if (error) {
            toast.error('Error saving password: ' + error.message);
        } else {
            toast.success('Password saved!');
            setForm({ site: '', username: '', password: '', category: 'Other' });
            fetchPasswords();
        }
    };

    const deletePassword = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this password?');
        if (confirmed) {
            const { error } = await supabase.from('passwords').delete().eq('id', id);
            if (error) {
                toast.error('Error deleting password');
            } else {
                toast.success('Password deleted');
                fetchPasswords();
            }
        }
    };

    const editPassword = async (id: string) => {
        const passwordToEdit = passwordArray.find((item) => item.id === id);
        if (passwordToEdit) {
            setForm({
                site: passwordToEdit.site,
                username: passwordToEdit.username,
                password: passwordToEdit.password,
                category: passwordToEdit.category || 'Other',
            });
            // Delete from database (user will re-save with changes)
            const { error } = await supabase.from('passwords').delete().eq('id', id);
            if (error) {
                toast.error('Error editing password');
            } else {
                fetchPasswords();
            }
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    // Filtered passwords based on search and category
    const filteredPasswords = passwordArray.filter((item) => {
        const matchesSearch =
            item.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.username.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return {
        form,
        setForm,
        passwordArray: filteredPasswords,
        allPasswords: passwordArray,
        loading,
        searchQuery,
        setSearchQuery,
        filterCategory,
        setFilterCategory,
        handleChange,
        savePassword,
        deletePassword,
        editPassword,
        copyToClipboard,
    };
};
