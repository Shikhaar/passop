import { useState, useEffect, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Password } from '../types/password';

export const usePasswords = (session: Session) => {
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState<Password[]>([]);
    const [loading, setLoading] = useState(true);

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
        } else {
            setPasswordArray(data || []);
        }
        setLoading(false);
    }, [session.user.id]);

    useEffect(() => {
        fetchPasswords();
    }, [fetchPasswords]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const savePassword = async () => {
        if (!form.site || !form.username || !form.password) {
            alert('Please fill all fields');
            return;
        }

        const { error } = await supabase.from('passwords').insert({
            user_id: session.user.id,
            site: form.site,
            username: form.username,
            password: form.password,
        });

        if (error) {
            alert('Error saving password: ' + error.message);
        } else {
            setForm({ site: '', username: '', password: '' });
            fetchPasswords();
        }
    };

    const deletePassword = async (id: string) => {
        const confirmed = confirm('Are you sure you want to delete this password?');
        if (confirmed) {
            const { error } = await supabase.from('passwords').delete().eq('id', id);
            if (error) {
                alert('Error deleting password: ' + error.message);
            } else {
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
            });
            // Delete from database (user will re-save with changes)
            const { error } = await supabase.from('passwords').delete().eq('id', id);
            if (error) {
                alert('Error editing password: ' + error.message);
            } else {
                fetchPasswords();
            }
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    return {
        form,
        passwordArray,
        loading,
        handleChange,
        savePassword,
        deletePassword,
        editPassword,
        copyToClipboard,
    };
};
