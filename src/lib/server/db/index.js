import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = neon(env.DATABASE_URL);
export const db = drizzle(client, { schema });

/**
 * Helper function to handle database errors
 * @param {Function} dbOperation - Database operation to execute
 * @returns {Promise<[Error, null] | [null, any]>} - [error, result] tuple
 */
export async function dbHandler(dbOperation) {
    try {
        const result = await dbOperation();
        return [null, result];
    } catch (error) {
        console.error('Database operation failed:', error);
        return [error, null];
    }
}