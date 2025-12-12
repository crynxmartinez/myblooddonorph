import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const BLOOD_TYPES = ["A", "B", "AB", "O"] as const;
export const RH_FACTORS = ["positive", "negative"] as const;

export function getFullBloodType(bloodType: string, rhFactor: string): string {
  const rhSymbol = rhFactor === "positive" ? "+" : "-";
  return `${bloodType}${rhSymbol}`;
}

export function normalizeCity(city: string): string {
  // Normalize city to Title Case: "zamboanga" or "ZAMBOANGA" -> "Zamboanga"
  if (!city) return "";
  return city
    .trim()
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const PHILIPPINE_CITIES = [
  "Manila",
  "Quezon City",
  "Caloocan",
  "Davao City",
  "Cebu City",
  "Zamboanga City",
  "Taguig",
  "Antipolo",
  "Pasig",
  "Cagayan de Oro",
  "Parañaque",
  "Dasmariñas",
  "Valenzuela",
  "Bacoor",
  "General Santos",
  "Las Piñas",
  "Makati",
  "San Jose del Monte",
  "Bacolod",
  "Muntinlupa",
  "Calamba",
  "Lapu-Lapu",
  "Imus",
  "Angeles",
  "Iloilo City",
  "Marikina",
  "Pasay",
  "Malabon",
  "Santa Rosa",
  "Biñan",
  "Mandaluyong",
  "San Pedro",
  "Navotas",
  "Other",
] as const;
