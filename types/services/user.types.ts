/**
 * User Service Types
 *
 * Type definitions for user service requests and responses.
 */

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  skinType?: string;
  skinConcerns?: string[];
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface NotificationPreferences {
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  orderUpdates?: boolean;
  promotionalEmails?: boolean;
  newsletter?: boolean;
}

export interface DeactivateAccountRequest {
  reason?: string;
}
