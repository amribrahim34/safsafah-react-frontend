'use client';

import { useState } from 'react';
import type { User } from '@/types/models/user';
import type { BrandConfig, SettingsTranslations } from './_types';

interface SettingsPanelProps {
  brand: BrandConfig;
  lang: 'ar' | 'en';
  user: User | null;
  t: SettingsTranslations;
}

interface NotifState {
  sms: boolean;
  email: boolean;
  whatsapp: boolean;
}

interface RowProps {
  label: string;
  children: React.ReactNode;
}

function Row({ label, children }: RowProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-3 bg-neutral-50">
      <div className="text-sm font-semibold mb-2">{label}</div>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

export default function SettingsPanel({ brand, t }: SettingsPanelProps) {
  const [notif, setNotif] = useState<NotifState>({ sms: true, email: true, whatsapp: false });

  return (
    <section className="rounded-3xl border border-neutral-200 p-4 bg-white">
      <div className="text-lg font-extrabold mb-2">{t.title}</div>

      <div className="grid gap-3">
        <Row label={t.notifications}>
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={notif.sms}
              onChange={(e) => setNotif({ ...notif, sms: e.target.checked })}
            />
            SMS
          </label>
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={notif.email}
              onChange={(e) => setNotif({ ...notif, email: e.target.checked })}
            />
            Email
          </label>
          <label className="text-sm flex items-center gap-2">
            <input
              type="checkbox"
              checked={notif.whatsapp}
              onChange={(e) => setNotif({ ...notif, whatsapp: e.target.checked })}
            />
            WhatsApp
          </label>
        </Row>

        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-xl border text-sm">{t.editInfo}</button>
          <a
            href="/logout"
            className="px-3 py-2 rounded-xl text-white text-sm"
            style={{ background: brand.primary }}
          >
            {t.logout}
          </a>
        </div>
      </div>
    </section>
  );
}
