import { formatDistanceToNow, format } from 'date-fns';
import { faIR } from 'date-fns/locale';

// Date Utilities
export const formatDate = (date: Date | string, pattern = 'dd MMMM yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, pattern, { locale: faIR });
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: faIR });
};

// String Utilities
export const truncate = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

// Number Utilities
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num);
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} دقیقه`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} ساعت و ${mins} دقیقه` : `${hours} ساعت`;
};

// Read Time Calculator
export const calculateReadTime = (text: string, wordsPerMinute = 200): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Validation Utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Array Utilities
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const unique = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

// Storage Utilities (Browser Only)
export const storage = {
  get: (key: string): any => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: any): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  },
};

// Debounce
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Class Names Helper
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
