import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Approve() {
  const router = useRouter();
  const { userId } = router.query;  // On récupère l'ID utilisateur de l'URL
  const [approvalStatus, setApprovalStatus] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const approveUser = async () => {
      const res = await fetch(`/api/auth/approveUser?userId=${userId}`, { method: 'GET' });
      const data = await res.json();

      if (res.ok) {
        setApprovalStatus('Votre enfant a été validé avec succès ! 🎉');
      } else {
        setApprovalStatus(data.message || 'Une erreur est survenue.');
      }
    };

    approveUser();
  }, [userId]);

  return (
    <div>
      <h1>Validation de l'approbation</h1>
      {approvalStatus ? (
        <p>{approvalStatus}</p>
      ) : (
        <p>Chargement de la validation...</p>
      )}
    </div>
  );
}
