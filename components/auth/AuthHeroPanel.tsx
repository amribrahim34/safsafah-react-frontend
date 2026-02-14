'use client';

interface AuthHeroPanelProps {
  imageSrc: string;
  subtitle: string;
}

export default function AuthHeroPanel({ imageSrc, subtitle }: AuthHeroPanelProps) {
  return (
    <aside className="relative hidden md:block">
      <img
        src={imageSrc}
        alt="Skincare visual"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <div className="text-3xl font-black tracking-tight">SAFSAFAH</div>
        <p className="mt-1 text-sm opacity-90">{subtitle}</p>
      </div>
    </aside>
  );
}
