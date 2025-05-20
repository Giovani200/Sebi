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
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed" style={{ 
      backgroundImage: 'url(/images/foret.jpg)',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="card animate-scaleIn">
        <h2 className="card-title animate-slideIn">Connexion</h2>
        <form onSubmit={handleSubmit} className="spacing-responsive">
          <div className="animate-fadeInUp animate-delay-100">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              className="form-input"
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
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary animate-fadeInUp animate-delay-300"
          >
            Se connecter
          </button>

          <div className="mt-6 text-center space-y-2">
            <Link 
              href="/register" 
              className="block text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-300 text-responsive"
            >
              Pas encore inscrit ? Créer un compte
            </Link>
            <Link 
              href="/forgot-password" 
              className="block text-blue-600 hover:text-blue-800 transition-colors animate-fadeInUp animate-delay-300 text-responsive"
            >
              Mot de passe oublié ? Réinitialiser
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 