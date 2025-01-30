import { z } from 'zod';

const urlIdSchema = z
  .string()
  .min(4, 'URL too short')
  .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid character(s)');

const validateUrlId = (urlId) => {
  try {
    urlIdSchema.parse(urlId);
    return null;
  } catch (e) {
    return e.errors[0].message;
  }
};

export { validateUrlId };
