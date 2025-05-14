import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
    <Image
      src="/images/foret.jpg"
      alt="Forêt background"
      fill
      className="object-cover z-[-1]"
      quality={100}
      priority
    />
    <div className="relative z-10">
      <h1 className="text-blue-600">Hello World</h1>
    </div>
  </div>
  );
}
