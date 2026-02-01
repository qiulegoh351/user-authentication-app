import { Buffer } from 'buffer';
import { toLower, trim } from 'lodash';

export const sanitizeEmail = (email: string): string => toLower(trim(email));
export const now = () => Date.now();
export const uid = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const generateBearerToken = (email: string): string => {
  const payload = {
    acc: email,
    created_at: now(),
  };

  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64');

  return `Bearer ${encoded}`;
};
