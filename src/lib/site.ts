export const EMAIL = 'ovidiupescar@fishermanengineering.com';

export const mailto = (subject?: string) => (subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`);
