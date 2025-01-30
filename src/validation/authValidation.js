import { z } from 'zod';

const stringField = (requiredError, minLength, maxLength, regex, regexError) => {
  let schema = z.string({ required_error: requiredError });
  if (minLength) schema = schema.min(minLength, `Must be at least ${minLength} characters long`);
  if (maxLength) schema = schema.max(maxLength, `Must be at most ${maxLength} characters long`);
  if (regex) schema = schema.regex(regex, regexError);
  return schema;
};

const registerSchema = z.object({
  username: stringField('Username is required', 3, 20),
  email: stringField('Email is required').email('Invalid email address'),
  password: stringField('Password is required', 6, null, /\d/, 'Password must contain a number'),
});

const loginSchema = z.object({
  email: stringField('Email is required').email('Invalid email address'),
  password: stringField('Password is required').nonempty('Password is required'),
});

const validateInput = (schema, data) => {
  const result = schema.safeParse(data);
  return result.success
    ? null
    : result.error.errors.map((error) => ({ field: error.path[0], message: error.message }));
};

const validateRegisterInput = (data) => validateInput(registerSchema, data);
const validateLoginInput = (data) => validateInput(loginSchema, data);

export { validateRegisterInput, validateLoginInput };
