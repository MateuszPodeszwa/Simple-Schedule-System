import { db, dbHandler } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';

/**
 * GET handler for retrieving users
 * @param {Object} requestEvent - The request event object
 * @returns {Response} JSON response with users data
 */
export async function GET() {
    const [error, result] = await dbHandler(() => db.select().from(users));

    if (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return json(result);
}

/**
 * POST handler for creating a new user
 * @param {Object} requestEvent - The request event object
 * @returns {Response} JSON response with the created user
 */
export async function POST({ request }) {
    try {
        const userData = await request.json();

        // Validate required fields
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            return new Response(
                JSON.stringify({ error: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const [error, result] = await dbHandler(() =>
            db.insert(users).values({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password, // In a real app, you'd hash this
                role: userData.role || 'guest'
            }).returning()
        );

        if (error) {
            return new Response(
                JSON.stringify({ error: 'Failed to create user' }),
                { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
        }

        return json(result[0]);
    } catch (e) {
        return new Response(
            JSON.stringify({ error: 'Invalid request' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
}