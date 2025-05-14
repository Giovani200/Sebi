'use client';
import { useState } from 'react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
      <div className="bg-orange-50 p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="PRENOM"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase"
              required
            />
          </div>
          
          <div>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="NOM"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase"
              required
            />
          </div>

          <div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="AGE"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase"
              required
              min="4"
              max="120"
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="PASSWORD"
              className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase"
              required
            />
          </div>

          {showParentEmail && (
            <div>
              <input
                type="email"
                name="emailParent"
                value={formData.emailParent}
                onChange={handleChange}
                placeholder="EMAIL PARENT"
                className="w-full text-gray-600 p-2 border-b-2 border-gray-600 bg-transparent focus:outline-none focus:border-orange-500 uppercase"
                required
              />
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-200 text-gray-700 py-2 rounded hover:bg-green-300 transition-colors"
            >
              Valider
            </button>
            <button
              type="button"
              className="flex-1 bg-blue-200 text-gray-700 py-2 rounded hover:bg-blue-300 transition-colors"
            >
              Connection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 