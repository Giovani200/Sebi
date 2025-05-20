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
        <h2 className="card-title animate-slideIn">Réinitialiser le mot de passe</h2>
        <form onSubmit={handleSubmit} className="spacing-responsive">
          <div className="animate-fadeInUp animate-delay-100">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="NOUVEAU MOT DE PASSE"
              className="form-input"
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
              className="form-input"
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
            className="btn-primary animate-fadeInUp animate-delay-300"
          >
            Réinitialiser
          </button>
        </form>
      </div>
    </div>
  );
} 