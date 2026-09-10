/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     description: Creates a user. Emails in the admin whitelist receive the ADMIN role; all other users receive USER.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string, minLength: 3, maxLength: 30, example: ali }
 *               email: { type: string, format: email, example: ali@example.com }
 *               password: { type: string, format: password, minLength: 4, example: secret123 }
 *           example: { username: ali, email: ali@example.com, password: secret123 }
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example: { statusCode: 201, data: { username: ali, email: ali@example.com, role: USER }, message: user register successfully, success: true }
 *       '400': { description: Invalid username, email, or password }
 *       '409': { description: Email is already registered }
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Log in and create a session
 *     description: Verifies credentials and sets the HTTP-only session_id cookie backed by Redis.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email, example: ali@example.com }
 *               password: { type: string, format: password, minLength: 4, example: secret123 }
 *           example: { email: ali@example.com, password: secret123 }
 *     responses:
 *       '200':
 *         description: Login successful
 *         headers:
 *           Set-Cookie: { description: HTTP-only session_id cookie, schema: { type: string } }
 *         content:
 *           application/json:
 *             example: { statusCode: 200, data: { username: ali, email: ali@example.com, role: USER }, message: login successfully, success: true }
 *       '400': { description: Invalid request body }
 *       '401': { description: Email or password is incorrect }
 *       '403': { description: User is banned or not verified }
 */

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Log out
 *     description: Deletes the Redis session and clears the session_id cookie.
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200': { description: Logout successful }
 *       '401': { description: Missing, invalid, or expired session cookie }
 */
export {};
