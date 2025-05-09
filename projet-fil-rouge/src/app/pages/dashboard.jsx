// /pages/dashboard.js
import UserDashboard from '@/app/components/UserDashboard';

export default function Dashboard() {
  const userEmail = 'utilisateur@example.com'; // Récupère l'email de l'utilisateur (par exemple, via le contexte, les props, etc.)

  return (
    <div>
      <h1>Tableau de bord</h1>
      <UserDashboard userEmail={userEmail} />
    </div>
  );
}
