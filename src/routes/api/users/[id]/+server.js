import { db, dbHandler } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function DELETE({ params }) {
    const userId = params.id;

    if (!userId) {
        return new Response(
            JSON.stringify({ error: 'User ID is required' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    const [error, result] = await dbHandler(() =>
        db.delete(users)
            .where(eq(users.id, parseInt(userId)))
            .returning()
    );

    if (error) {
        console.error('Error deleting user:', error);
        return new Response(
            JSON.stringify({ error: 'Failed to delete user' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    if (!result || result.length === 0) {
        return new Response(
            JSON.stringify({ error: 'User not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({ success: true, message: 'User deleted successfully' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
}