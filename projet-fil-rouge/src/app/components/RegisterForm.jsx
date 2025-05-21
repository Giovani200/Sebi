'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    parentEmail: '',  // Ajout du champ parentEmail
    password: '',  // Le mot de passe pour l'inscription
  })

  const [errorMessage, setErrorMessage] = useState('')

  // Validation du formulaire
  function validateForm({ firstName, lastName, email, age, parentEmail, password }) {
    if (!firstName || !lastName || !email || !password || !age) {
      return "Tous les champs sont requis."
    }
    if (!email.includes('@')) {
      return "Adresse email invalide."
    }
    if (isNaN(age) || age < 4 || age > 120) {
      return "Âge non valide."
    }
    if (age < 13 && !parentEmail) {
      return "L'email du parent est requis pour les enfants de moins de 13 ans."
    }
    if (age < 13 && !parentEmail.includes('@')) {
      return "L'email du parent est invalide."
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = validateForm(formData)
    if (error) {
      setErrorMessage(error)
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (!res.ok) {
        setErrorMessage(result.message || "Une erreur est survenue.")
      } else {
        // Inscription réussie
        alert("Inscription réussie !")
      }
    } catch (error) {
      setErrorMessage("Erreur réseau. Réessaie.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Prénom"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Nom"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="number"
        placeholder="Âge"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />

      {/* Champ parentEmail visible si l'âge est inférieur à 13 */}
      {parseInt(formData.age) < 13 && (
        <input
          type="email"
          placeholder="Email du parent"
          value={formData.parentEmail}
          onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
        />
      )}

      <input
        type="password"
        placeholder="Mot de passe"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">S'inscrire</button>

      <div className="text-sm mt-2">
        <p>Déjà inscrit ? <Link href="/login" className="text-blue-500 underline">Se connecter</Link></p>
      </div>

    </form>
  )
}
