"use client";
// Import sans extension de fichier
import GameCanvas from "../../components/GameCanvas";

export default function GamePage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-700 via-green-900 to-emerald-800">
      <GameCanvas />
    </div>
  );
}
