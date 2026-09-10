/**
 * @openapi
 * /user/me:
 *   get:
 *     tags: [Users]
 *     summary: Get the current user
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200':
 *         description: Current user without password
 *         content:
 *           application/json:
 *             example: { statusCode: 200, data: { username: ali, email: ali@example.com, role: AUTHOR, status: VERIFIED, isActive: ACTIVE }, message: get user successfully, success: true }
 *       '401': { description: Authentication required or session expired }
 */

/**
 * @openapi
 * /user/get:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: Admin-only paginated user list.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of records to return
 *         schema: { type: integer, minimum: 1, default: 10 }
 *       - name: offset
 *         in: query
 *         description: Number of records to skip
 *         schema: { type: integer, minimum: 0, default: 0 }
 *     responses:
 *       '200': { description: Users returned }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can list users }
 */

/**
 * @openapi
 * /user/update:
 *   patch:
 *     tags: [Users]
 *     summary: Update the current profile
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email]
 *             properties:
 *               username: { type: string, minLength: 3, maxLength: 30, example: new-ali }
 *               email: { type: string, format: email, example: new@example.com }
 *     responses:
 *       '200': { description: Profile updated }
 *       '400': { description: Invalid username or email }
 *       '401': { description: Authentication required or session expired }
 *       '409': { description: Email or username is already in use }
 */

/**
 * @openapi
 * /user/password:
 *   patch:
 *     tags: [Users]
 *     summary: Change the current password
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword: { type: string, format: password, minLength: 4, example: oldpass123 }
 *               newPassword: { type: string, format: password, minLength: 4, example: newpass123 }
 *     responses:
 *       '200': { description: Password updated }
 *       '400': { description: Invalid password or current password is incorrect }
 *       '401': { description: Authentication required or session expired }
 */

/**
 * @openapi
 * /user/delete:
 *   delete:
 *     tags: [Users]
 *     summary: Delete the current account
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200': { description: Account deleted successfully }
 *       '401': { description: Authentication required or session expired }
 */

/**
 * @openapi
 * /user/ban/{userId}:
 *   patch:
 *     tags: [Users]
 *     summary: Ban a user
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: UUID of the user to ban
 *         schema: { type: string, format: uuid }
 *     responses:
 *       '200': { description: User banned }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can ban users }
 *       '404': { description: User not found }
 */

/**
 * @openapi
 * /user/mute/{userId}:
 *   patch:
 *     tags: [Users]
 *     summary: Mute a user
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: UUID of the user to mute
 *         schema: { type: string, format: uuid }
 *     responses:
 *       '200': { description: User muted }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can mute users }
 *       '404': { description: User not found }
 */
export {};
