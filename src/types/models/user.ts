// User and account related types based on actual usage
import { Address, AddressResponse } from './common';

export type UserTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string | null;
  tier: UserTier;
  points?: number;
  nextTierAt?: number;
  addresses?: AddressResponse[];
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface UserPreferences {
  language?: string;
  currency?: string;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  pushNotifications?: boolean;
  interests?: string[];
  skinType?: string;
  skinConcerns?: string[];
  skinTone?: string;
}

export interface UserRewards {
  points: number;
  totalEarned: number;
  totalSpent: number;
  tier: UserTier;
  nextTierPoints: number;
  history?: any[];
}

export interface UserWallet {
  balance: number;
  currency: string;
  transactions?: any[];
  isActive: boolean;
}

export interface UserAddress {
  id: string;
  userId: string;
  type: string;
  label: string;
  isDefault: boolean;
  address: Address;
  createdAt: string;
  updatedAt: string;
}

export interface UserPaymentMethod {
  id: string;
  userId: string;
  type: string;
  provider: string;
  lastFour?: string;
  expiryMonth?: string;
  expiryYear?: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface UserBeautyProfile {
  id: string;
  userId: string;
  skinType: string;
  skinConcerns: string[];
  skinTone: string;
  ageRange?: string;
  allergies?: string[];
  currentProducts?: string[];
  routine?: string;
  goals?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing?: boolean;
}

export interface UserLogin {
  identifier: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserProfileUpdate {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
