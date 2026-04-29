'use client';

import { useRef, useState } from 'react';
import { Send, Upload } from 'lucide-react';
import { BRAND } from '@/content/brand';
import type { SiteSettings } from '@/lib/api/services';

interface FormFieldTranslation {
  label: string;
  placeholder: string;
}

interface AttachmentsTranslation {
  label: string;
  dropHint: string;
  chooseFiles: string;
  hint: string;
}

interface FormErrorTranslations {
  name: string;
  phone: string;
  message: string;
  fileSize: string;
  fileCount: string;
}

export interface ContactFormTranslations {
  name: FormFieldTranslation;
  phone: FormFieldTranslation;
  message: FormFieldTranslation;
  attachments: AttachmentsTranslation;
  submit: string;
  errors: FormErrorTranslations;
  success: string;
  mailtoFallback: string;
}

interface ContactFormProps {
  brand: typeof BRAND;
  t: ContactFormTranslations;
  siteSettings: SiteSettings | null;
  lang: 'ar' | 'en';
}

interface FormFields {
  name: string;
  phone: string;
  message: string;
}

type FormStatusType = 'idle' | 'error' | 'success';

interface FormStatus {
  type: FormStatusType;
  msg: string;
}

export default function ContactForm({ brand, t, siteSettings, lang }: ContactFormProps) {
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  const [form, setForm] = useState<FormFields>({ name: '', phone: '', message: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', msg: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const tooBig = selected.find((f) => f.size > 10 * 1024 * 1024);
    if (tooBig) {
      setStatus({ type: 'error', msg: t.errors.fileSize });
      return;
    }
    if (selected.length > 5) {
      setStatus({ type: 'error', msg: t.errors.fileCount });
      return;
    }
    setStatus({ type: 'idle', msg: '' });
    setFiles(selected);
  };

  const validate = (): string[] => {
    const errors: string[] = [];
    if (!form.name || form.name.trim().length < 2) errors.push(t.errors.name);
    const egMobile = /^(010|011|012|015)\d{8}$/;
    if (!egMobile.test(form.phone.replace(/\D/g, ''))) errors.push(t.errors.phone);
    if (!form.message || form.message.trim().length < 10) errors.push(t.errors.message);
    return errors;
  };

  const resetForm = () => {
    setForm({ name: '', phone: '', message: '' });
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'idle', msg: '' });
    const errors = validate();
    if (errors.length) {
      setStatus({ type: 'error', msg: errors.join(' • ') });
      return;
    }

    const fd = new FormData();
    fd.set('name', form.name);
    fd.set('phone', form.phone);
    fd.set('message', form.message);
    files.forEach((f) => fd.append('attachments', f, f.name));

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Bad status');
      setStatus({ type: 'success', msg: t.success });
      resetForm();
    } catch (_) {
      const email = siteSettings?.email ?? '';
      const subject = encodeURIComponent(
        (lang === 'ar' ? 'رسالة من الموقع' : 'Website Message') + ` — ${form.name}`
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nMobile: ${form.phone}\n\nMessage (EN):\n${form.message}\n\n` +
          `الاسم: ${form.name}\nالموبايل: ${form.phone}\n\nالرسالة (AR):\n${form.message}`
      );
      // window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      void email;
      void subject;
      void body;
      setStatus({ type: 'success', msg: t.mailtoFallback });
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-neutral-200 p-5 md:p-6 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold mb-1">
            {t.name.label}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={onChange}
            placeholder={t.name.placeholder}
            className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
            style={{ outlineColor: brand.primary }}
            dir={dir}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-bold mb-1">
            {t.phone.label}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={onChange}
            placeholder={t.phone.placeholder}
            className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
            style={{ outlineColor: brand.primary }}
            dir={dir}
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="block text-sm font-bold mb-1">
          {t.message.label}
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={form.message}
          onChange={onChange}
          placeholder={t.message.placeholder}
          className="w-full rounded-2xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2"
          style={{ outlineColor: brand.primary }}
          dir={dir}
          required
        />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-bold mb-2" htmlFor="attachments">
          {t.attachments.label}
        </label>
        <div className="rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-neutral-600">{t.attachments.dropHint}</div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-sm font-semibold"
            >
              <Upload className="w-4 h-4" /> {t.attachments.chooseFiles}
            </button>
          </div>
          <input
            id="attachments"
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,application/pdf"
            onChange={onFiles}
            className="hidden"
          />
          {files.length > 0 && (
            <ul className="mt-3 text-sm text-neutral-700 space-y-1">
              {files.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>{f.name}</span>
                  <span className="text-neutral-500">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-xs text-neutral-500 mt-2">{t.attachments.hint}</p>
      </div>

      {status.type !== 'idle' && (
        <div
          className={`mt-3 text-sm rounded-2xl px-3 py-2 border ${
            status.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}
          role={status.type === 'error' ? 'alert' : 'status'}
        >
          {status.msg}
        </div>
      )}

      <div className="mt-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold rounded-2xl shadow-sm"
          style={{ background: brand.primary }}
        >
          <Send className="w-4 h-4" /> {t.submit}
        </button>
      </div>
    </form>
  );
}
