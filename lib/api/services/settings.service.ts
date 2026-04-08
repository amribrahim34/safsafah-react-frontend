import { get } from '../client';

export interface SiteSettings {
  facebook: string | null;
  instagram: string | null;
  tiktok: string | null;
  whatsapp: string | null;
  email: string | null;
  mobile: string | null;
}

export const settingsService = {
  async getSettings(): Promise<SiteSettings> {
    const response = await get<SiteSettings>('/settings');
    return response.data;
  },
};
