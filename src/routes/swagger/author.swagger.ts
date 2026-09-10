/**
 * @swagger
 * /author/request:
 *   post:
 *     summary: Request to become an author
 *     description: Submit a request to become an author. Users can send one request at a time
 *     tags: [Author Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     status:
 *                       type: string
 *                       enum: [PENDING, APPROVED, REJECTED]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: User already owns a request or already has author role
 *       401:
 *         description: Unauthorized - No valid token or user already has author role
 *       403:
 *         description: User already has a pending request
 */

/**
 * @swagger
 * /author/get:
 *   get:
 *     summary: Get all author requests (ADMIN only)
 *     description: Retrieve all pending author requests. Only available to ADMIN users
 *     tags: [Author Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of requests per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         description: Filter by request status
 *     responses:
 *       200:
 *         description: Author requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     requests:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           userId:
 *                             type: integer
 *                           status:
 *                             type: string
 *                             enum: [PENDING, APPROVED, REJECTED]
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           user:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               username:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               role:
 *                                 type: string
 *                               createdAt:
 *                                 type: string
 *                                 format: date-time
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only ADMIN can access this endpoint
 */

/**
 * @swagger
 * /author/approve/{requestId}:
 *   post:
 *     summary: Approve author request (ADMIN only)
 *     description: Approve a user's request to become an author. Grants AUTHOR role to the user
 *     tags: [Author Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Request ID to approve
 *     responses:
 *       200:
 *         description: Request approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     requestId:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     status:
 *                       type: string
 *                       enum: [APPROVED]
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only ADMIN can approve requests
 *       404:
 *         description: Request not found
 */

/**
 * @swagger
 * /author/reject/{requestId}:
 *   post:
 *     summary: Reject author request (ADMIN only)
 *     description: Reject a user's request to become an author
 *     tags: [Author Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Request ID to reject
 *     responses:
 *       200:
 *         description: Request rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     requestId:
 *                       type: integer
 *                     userId:
 *                       type: integer
 *                     status:
 *                       type: string
 *                       enum: [REJECTED]
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only ADMIN can reject requests
 *       404:
 *         description: Request not found
 */