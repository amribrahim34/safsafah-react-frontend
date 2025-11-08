// Common types used across the application

export type Language = 'ar' | 'en';

export type Direction = 'rtl' | 'ltr';

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message: string;
  status: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Address {
  firstName: string;
  lastName?: string;
  phone: string;
  email?: string;
  city: string;
  district: string;
  street: string;
  building?: string;
  floor?: string;
  apt?: string;
  landmark?: string;
  notes?: string;
}

export interface ContactInfo {
  whatsapp: string;
  mobile: string;
  email: string;
  hoursEN: string;
  hoursAR: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FileUpload {
  file: File;
  name: string;
  size: number;
  type: string;
  url?: string;
}
