import nodemailer from 'nodemailer';

export const sendApprovalEmail = async (parentEmail, userName, userId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: parentEmail,
    subject: 'Approbation parentale requise',
   text: `Bonjour,

Votre enfant ${userName} s'est inscrit sur notre plateforme. Pour valider son inscription, veuillez cliquer sur le lien suivant :

${process.env.NEXT_PUBLIC_BASE_URL}/api/parent-approve?userId=${userId}

Merci et à bientôt sur notre plateforme !`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé à :', parentEmail);
  } catch (error) {
    console.error('Erreur d\'envoi d\'email :', error);
    throw new Error("Échec de l'envoi du mail.");
  }
};
