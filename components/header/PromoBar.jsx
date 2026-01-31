export default function PromoBar({ text, lang, onToggleLang, brand }) {
  return (
    <div className="w-full text-white text-sm" style={{ background: brand.dark }}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <span className="opacity-95">{text}</span>
        <button onClick={onToggleLang} className="hover:opacity-90">{lang==="ar"?"English":"العربية"}</button>
      </div>
    </div>
  );
}
