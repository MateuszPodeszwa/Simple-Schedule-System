import { db, dbHandler } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { verifyPassword } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

/**
 * POST handler for authenticating a user
 * @param {Object} requestEvent - The request event object
 * @returns {Response} JSON response with user data or error
 */
export async function POST({ request }) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: 'Email and password are required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Find user by email
        const [error, result] = await dbHandler(() =>
            db.select().from(users).where(eq(users.email, email))
        );

        if (error || !result || result.length === 0) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const user = result[0];

        // Verify password
        if (!verifyPassword(password, user.password)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email or password' }),
                { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Don't return the password
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;

        // In a real application, you would set up a session or JWT token here
        return json({
            user: userWithoutPassword,
            message: 'Login successful'
        });
    } catch (e) {
        return new Response(
            JSON.stringify({ error: 'Invalid request' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
}