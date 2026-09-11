"use client";

export const ADMIN_SETTINGS_KEY = "sw_admin_settings";
export const ADMIN_EMAIL_KEY = "sw_admin_email";

export interface AdminSettings {
  businessName: string;
  notifyEmail: string;
  phone: string;
  leadsPerPage: number;
  emailAlerts: boolean;
  autoReply: boolean;
}

export const DEFAULT_SETTINGS: AdminSettings = {
  businessName: "SuperWeb",
  notifyEmail: "info@superweb.co.ke",
  phone: "0715135141",
  leadsPerPage: 50,
  emailAlerts: true,
  autoReply: false,
};

export function getAdminEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_EMAIL_KEY) ?? "";
}

export function setAdminEmail(e: string) {
  localStorage.setItem(ADMIN_EMAIL_KEY, e);
}

export function clearAdminEmail() {
  localStorage.removeItem(ADMIN_EMAIL_KEY);
}

export function getAdminSettings(): AdminSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(ADMIN_SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<AdminSettings>) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(s: AdminSettings) {
  localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(s));
}
