/**
 * @openapi
 * /comment/get:
 *   get:
 *     tags: [Comments]
 *     summary: Get all comments
 *     description: Returns a paginated comment list for administrators and authors.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: limit
 *         in: query
 *         schema: { type: integer, minimum: 1, default: 10 }
 *       - name: offset
 *         in: query
 *         schema: { type: integer, minimum: 0, default: 0 }
 *     responses:
 *       '200': { description: Comments returned }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: User must have ADMIN or AUTHOR role }
 */

/**
 * @openapi
 * /comment/create/{blogId}:
 *   post:
 *     tags: [Comments]
 *     summary: Create a comment
 *     description: Adds a comment to an existing blog. Muted users cannot create comments.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: UUID of the blog receiving the comment
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content: { type: string, minLength: 10, example: This is a useful comment. }
 *     responses:
 *       '201': { description: Comment created }
 *       '400': { description: Comment must contain at least 10 characters }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Muted user cannot create comments }
 *       '404': { description: Blog not found }
 */

/**
 * @openapi
 * /comment/delete/{commentId}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment
 *     description: Deletes a comment when the current user owns it or is an administrator.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: commentId
 *         in: path
 *         required: true
 *         description: UUID of the comment to delete
 *         schema: { type: string, format: uuid }
 *     responses:
 *       '200': { description: Comment deleted }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: User does not own the comment and is not an administrator }
 *       '404': { description: Comment not found }
 */
export {};
