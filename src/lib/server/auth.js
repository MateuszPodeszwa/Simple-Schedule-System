import { randomBytes, pbkdf2Sync } from 'crypto';

/**
 * Hashes a password using PBKDF2 with a random salt
 * @param {string} password - The plain text password to hash
 * @returns {string} - The hashed password in format: salt:hash
 */
export function hashPassword(password) {
    // Generate a random salt
    const salt = randomBytes(16).toString('hex');

    // Hash the password using PBKDF2
    // 1000 iterations, 64 length, sha512 algorithm
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Return the salt and hash together
    return `${salt}:${hash}`;
}

/**
 * Verifies a password against a stored hash
 * @param {string} password - The plain text password to verify
 * @param {string} storedPassword - The stored password hash (salt:hash)
 * @returns {boolean} - Whether the password matches
 */
export function verifyPassword(password, storedPassword) {
    // Extract salt and hash from stored password
    const [salt, originalHash] = storedPassword.split(':');

    // Hash the provided password with the same salt
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    // Compare the hashes
    return hash === originalHash;
}