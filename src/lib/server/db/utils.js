import { db, dbHandler } from '$lib/server/db';
import { users, approvedEmails } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Checks if an email is pre-approved for registration
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} - Whether the email is approved
 */
export async function isEmailApproved(email) {
    const [error, result] = await dbHandler(() =>
        db.select().from(approvedEmails).where(eq(approvedEmails.email, email))
    );

    if (error || !result) return false;
    return result.length > 0;
}

/**
 * Gets a user by email
 * @param {string} email - User's email
 * @returns {Promise<Object|null>} - User object or null if not found
 */
export async function getUserByEmail(email) {
    const [error, result] = await dbHandler(() =>
        db.select().from(users).where(eq(users.email, email))
    );

    if (error || !result || result.length === 0) return null;
    return result[0];
}

/**
 * Gets a user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object|null>} - User object or null if not found
 */
export async function getUserById(id) {
    const [error, result] = await dbHandler(() =>
        db.select().from(users).where(eq(users.id, id))
    );

    if (error || !result || result.length === 0) return null;
    return result[0];
}