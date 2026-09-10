/**
 * @openapi
 * /author/request:
 *   post:
 *     tags: [Author Requests]
 *     summary: Request author access
 *     description: Creates a pending author request. A user cannot have multiple pending requests.
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason: { type: string, example: I want to publish technical articles. }
 *     responses:
 *       '201': { description: Author request created }
 *       '401': { description: Authentication required or session expired }
 *       '409': { description: A pending request already exists }
 */

/**
 * @openapi
 * /author/get:
 *   get:
 *     tags: [Author Requests]
 *     summary: Get author requests
 *     description: Admin-only list of author requests ordered newest first.
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200': { description: Author requests returned }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can view requests }
 */

/**
 * @openapi
 * /author/approve/{requestId}:
 *   post:
 *     tags: [Author Requests]
 *     summary: Approve an author request
 *     description: Approves the request and changes the requesting user's role to AUTHOR in a transaction.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: requestId
 *         in: path
 *         required: true
 *         description: UUID of the author request
 *         schema: { type: string, format: uuid }
 *     responses:
 *       '200': { description: Request approved and user promoted to AUTHOR }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can approve requests }
 *       '404': { description: Request not found }
 */

/**
 * @openapi
 * /author/reject/{requestId}:
 *   post:
 *     tags: [Author Requests]
 *     summary: Reject an author request
 *     description: Marks an author request as rejected.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: requestId
 *         in: path
 *         required: true
 *         description: UUID of the author request
 *         schema: { type: string, format: uuid }
 *     responses:
 *       '200': { description: Request rejected }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can reject requests }
 *       '404': { description: Request not found }
 */
export {};
