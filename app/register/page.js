'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    age: '',
    password: '',
    emailParent: ''
  });

  const [showParentEmail, setShowParentEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'age') {
      setShowParentEmail(parseInt(value) < 14);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer les données à votre backend
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
        <h2 className="card-title animate-slideIn">Inscription</h2>
        <form onSubmit={handleSubmit} className="spacing-responsive">
          <div className="form-grid">
            <div className="animate-fadeInUp animate-delay-100">
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                placeholder="PRÉNOM"
                className="form-input"
                required
              />
            </div>
            
            <div className="animate-fadeInUp animate-delay-100">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="NOM"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="animate-fadeInUp animate-delay-200">
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

          <div className="form-grid">
            <div className="animate-fadeInUp animate-delay-200">
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="ÂGE"
                className="form-input"
                required
                min="4"
                max="120"
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
          </div>

          {showParentEmail && (
            <div className="animate-fadeInUp">
              <input
                type="email"
                name="emailParent"
                value={formData.emailParent}
                onChange={handleChange}
                placeholder="EMAIL PARENT"
                className="form-input"
                required
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="btn-primary animate-fadeInUp animate-delay-300"
            >
              Valider
            </button>
            <Link
              href="/login"
              className="btn-secondary animate-fadeInUp animate-delay-300 text-center"
            >
              Connexion
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}