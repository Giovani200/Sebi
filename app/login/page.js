'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center animate-fadeInUp" style={{ backgroundImage: 'url(/images/foret.jpg)' }}>
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96 animate-scaleIn">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-slideIn">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="animate-fadeInUp animate-delay-100">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase transition-all duration-300"
              required
            />
          </div>

          <div className="animate-fadeInUp animate-delay-200">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="MOT DE PASSE"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-all duration-300 mt-6 animate-fadeInUp animate-delay-300"
          >
            Se connecter
          </button>

          <div className="mt-4 text-center space-y-2">
            <Link href="/register" className="block text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-300">
              Pas encore inscrit ? Créer un compte
            </Link>
            <Link href="/forgot-password" className="block text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-300">
              Mot de passe oublié ? Réinitialiser
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 