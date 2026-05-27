import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  titleSize?: 'base' | 'xl';
  viewAllHref?: string;
  viewAllText?: string;
  viewAllColor?: string;
}

export default function SectionHeader({ title, titleSize = 'xl', viewAllHref, viewAllText, viewAllColor }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className={`${titleSize === 'base' ? 'text-base' : 'text-xl'} md:text-2xl font-extrabold`}>
        {title}
      </h2>
      {viewAllHref && viewAllText && (
        <Link href={viewAllHref} className="font-semibold" style={viewAllColor ? { color: viewAllColor } : undefined}>
          {viewAllText}
        </Link>
      )}
    </div>
  );
}
