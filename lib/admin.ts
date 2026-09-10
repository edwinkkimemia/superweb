"use client";

export const ADMIN_TOKEN_KEY = "sw_admin_token";
export const ADMIN_SETTINGS_KEY = "sw_admin_settings";

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

export function getAdminToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
}

export function setAdminToken(t: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, t);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function adminHeaders(token: string): Record<string, string> {
  return token ? { "x-admin-token": token } : {};
}

export function withTokenQuery(url: string, token: string): string {
  if (!token) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}token=${encodeURIComponent(token)}`;
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
