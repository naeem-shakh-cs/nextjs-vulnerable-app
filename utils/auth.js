import { getSession } from 'next-auth/react';

export const isAuthenticated = async (context) => {
    const session = await getSession(context);
    return !!session;
};