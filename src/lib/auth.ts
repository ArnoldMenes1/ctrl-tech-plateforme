import { createAuthClient } from '@neon/auth';

const authUrl = import.meta.env.VITE_NEON_AUTH_URL;

export const authClient = authUrl ? createAuthClient(authUrl) : null;
