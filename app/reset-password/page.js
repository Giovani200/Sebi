'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    // Ici vous pouvez ajouter la logique pour réinitialiser le mot de passe
    console.log(formData);
    router.push('/reset-success');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center animate-fadeInUp" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96 animate-scaleIn">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-slideIn">Réinitialiser le mot de passe</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-fadeInUp animate-delay-100">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="NOUVEAU MOT DE PASSE"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase transition-all duration-300"
              required
            />
          </div>

          <div className="animate-fadeInUp animate-delay-200">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="CONFIRMEZ LE MOT DE PASSE"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase transition-all duration-300"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center animate-fadeInUp">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-all duration-300 mt-6 animate-fadeInUp animate-delay-300"
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
} 