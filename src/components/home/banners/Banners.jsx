import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { buildUrlWithParams, getCtaFilters } from "../../../lib/navigation";

export default function Banners({ imgWide, imgTall, brand, lang }) {
  const { t } = useTranslation('home');

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Link
        to={buildUrlWithParams('/catalog', { tags: ['starter-kit', 'bundle'] })}
        className="group relative rounded-2xl overflow-hidden border border-neutral-200 md:col-span-2"
      >
        <img src={imgWide} alt="promo" className="w-full h-64 md:h-80 object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="text-sm" style={{ color: brand.light }}>{t('banners.barrierKit.badge')}</div>
          <div className="text-2xl md:text-4xl font-black leading-tight">{t('banners.barrierKit.title')}</div>
          <p className="opacity-90">{t('banners.barrierKit.desc')}</p>
        </div>
      </Link>

      <Link
        to={buildUrlWithParams('/catalog', { category: 'Serums', onSale: 'true' })}
        className="group relative rounded-2xl overflow-hidden border border-neutral-200"
      >
        <img src={imgTall} alt="promo" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 p-6 text-white">
          <div className="text-sm" style={{ color: brand.light }}>{t('banners.weeklyOffer.badge')}</div>
          <div className="text-2xl font-black">{t('banners.weeklyOffer.title')}</div>
        </div>
      </Link>
    </div>
  );
}
