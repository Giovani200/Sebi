'use client';

import { useEffect, useRef } from 'react';

export default function UserRegistrationChart({ data = [] }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0 || !canvasRef.current) {
            return;
        }

        const ctx = canvasRef.current.getContext('2d');

        // Préparer les données
        const dates = data.map(item => new Date(item._id));
        const counts = data.map(item => item.count);

        // Trier les dates chronologiquement
        const sortedData = data
            .map(item => ({ date: new Date(item._id), count: item.count }))
            .sort((a, b) => a.date - b.date);

        // Formatage des dates pour l'affichage
        const labels = sortedData.map(item => {
            const date = item.date;
            return `${date.getDate()}/${date.getMonth() + 1}`;
        });

        const values = sortedData.map(item => item.count);

        // Dimensions
        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const padding = 40;
        const chartWidth = width - 2 * padding;
        const chartHeight = height - 2 * padding;

        // Effacer le canvas
        ctx.clearRect(0, 0, width, height);

        // Trouver la valeur maximale pour l'échelle
        const maxValue = Math.max(...values, 5);

        // Dessiner l'axe des Y
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();

        // Dessiner l'axe des X
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();

        // Dessiner des lignes horizontales de grille
        const ySteps = 5;
        for (let i = 0; i <= ySteps; i++) {
            const y = padding + (chartHeight / ySteps) * i;

            // Dessiner la ligne
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
            ctx.stroke();

            // Afficher la valeur
            const value = Math.round(maxValue - (maxValue / ySteps) * i);
            ctx.fillStyle = '#666';
            ctx.font = '10px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(value, padding - 5, y + 3);
        }

        // Dessiner les points et relier les points
        if (values.length > 0) {
            // Tracer la ligne
            ctx.beginPath();
            ctx.moveTo(
                padding,
                height - padding - (values[0] / maxValue) * chartHeight
            );

            for (let i = 0; i < values.length; i++) {
                const x = padding + (i / (values.length - 1 || 1)) * chartWidth;
                const y = height - padding - (values[i] / maxValue) * chartHeight;

                ctx.lineTo(x, y);
            }

            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Remplir sous la courbe
            ctx.lineTo(padding + chartWidth, height - padding);
            ctx.lineTo(padding, height - padding);
            ctx.closePath();
            ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.fill();

            // Dessiner les points
            for (let i = 0; i < values.length; i++) {
                const x = padding + (i / (values.length - 1 || 1)) * chartWidth;
                const y = height - padding - (values[i] / maxValue) * chartHeight;

                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#3b82f6';
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.stroke();

                // Afficher la date
                ctx.fillStyle = '#666';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(labels[i], x, height - padding + 15);

                // Afficher la valeur au-dessus du point
                ctx.fillStyle = '#3b82f6';
                ctx.font = '10px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(values[i], x, y - 10);
            }
        }

    }, [data]);

    if (!data || data.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Inscriptions des 30 derniers jours</h2>
                <div className="text-gray-500 text-center py-8">
                    Aucune donnée disponible
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Inscriptions des 30 derniers jours</h2>
            <div className="h-64 w-full">
                <canvas ref={canvasRef} width="500" height="250" className="w-full h-full"></canvas>
            </div>
        </div>
    );
}
