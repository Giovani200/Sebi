'use client';

import { useState, useEffect } from 'react';
import UserTable from '@/app/components/admin/UserTable';
import UserForm from '@/app/components/admin/UserForm';

export default function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/users');

            if (!response.ok) {
                throw new Error('Erreur de chargement des utilisateurs');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsFormOpen(true);
    };

    const handleDelete = async (userId) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            try {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression');
                }

                fetchUsers();
            } catch (error) {
                console.error('Erreur lors de la suppression:', error);
                alert(`Erreur: ${error.message}`);
            }
        }
    };

    const handleFormSubmit = async (userData) => {
        try {
            let url = '/api/admin/users';
            let method = 'POST';

            if (currentUser) {
                url = `/api/admin/users/${currentUser._id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de l\'enregistrement');
            }

            setIsFormOpen(false);
            setCurrentUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            alert(`Erreur: ${error.message}`);
        }
    };

    if (isLoading && users.length === 0) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
                    <p className="mt-4 text-gray-600">Chargement des utilisateurs...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Erreur</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={() => fetchUsers()}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                        setCurrentUser(null);
                        setIsFormOpen(true);
                    }}
                >
                    Ajouter un utilisateur
                </button>
            </div>

            <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={isLoading}
            />

            {isFormOpen && (
                <UserForm
                    user={currentUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setIsFormOpen(false);
                        setCurrentUser(null);
                    }}
                />
            )}
        </div>
    );
}
