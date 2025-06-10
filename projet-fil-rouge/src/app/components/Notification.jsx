'use client';
import { useState, useEffect } from 'react';

export default function Notification() {
    const [notification, setNotification] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleNotification = (e) => {
            setNotification(e.detail);
            setVisible(true);

            // Masquer après 3 secondes
            setTimeout(() => {
                setVisible(false);
                setTimeout(() => setNotification(null), 500); // Attendre la fin de l'animation
            }, 3000);
        };

        window.addEventListener('showNotification', handleNotification);
        return () => window.removeEventListener('showNotification', handleNotification);
    }, []);

    if (!notification) return null;

    return (
        <div 
            className={`fixed top-20 right-0 bg-white shadow-lg rounded-l-lg p-4 transition-transform duration-500 transform ${
                visible ? 'translate-x-0' : 'translate-x-full'
            } ${notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
        >
            <p className={notification.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {notification.message}
            </p>
        </div>
    );
}