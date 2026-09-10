/**
 * @swagger
 * /blog/me:
 *   get:
 *     summary: Get my blogs (AUTHOR & ADMIN only)
 *     description: Retrieve all blogs created by the authenticated user (AUTHOR role) or all blogs (ADMIN role)
 *     tags: [Blogs]
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
 *         description: Number of blogs per page
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
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
 *                     blogs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           content:
 *                             type: string
 *                           banner:
 *                             type: string
 *                           status:
 *                             type: string
 *                             enum: [DRAFT, PUBLISHED]
 *                           slug:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only AUTHOR and ADMIN can access this endpoint
 */

/**
 * @swagger
 * /blog/get:
 *   get:
 *     summary: Get all blogs (ADMIN only)
 *     description: Retrieve all blogs across all users. Only available to ADMIN users
 *     tags: [Blogs]
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
 *         description: Number of blogs per page
 *       - in: query
 *         name: author
 *         schema:
 *           type: integer
 *         description: Filter by author ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [DRAFT, PUBLISHED]
 *         description: Filter by blog status
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully
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
 *                     blogs:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           title:
 *                             type: string
 *                           content:
 *                             type: string
 *                           banner:
 *                             type: string
 *                           status:
 *                             type: string
 *                             enum: [DRAFT, PUBLISHED]
 *                           slug:
 *                             type: string
 *                           author:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                               username:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only ADMIN can access this endpoint
 */

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post with optional banner upload. Requires AUTHOR or ADMIN role
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: My First Blog Post
 *               content:
 *                 type: string
 *                 minLength: 10
 *                 example: This is the content of my first blog post. It should have at least 10 characters.
 *               banner:
 *                 type: string
 *                 format: URI
 *                 nullable: true
 *                 example: https://example.com/images/banner.jpg
 *       - in: formData
 *         name: banner
 *         type: file
 *         description: Blog banner image file
 *     responses:
 *       200:
 *         description: Blog created successfully
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
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     banner:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [DRAFT, PUBLISHED]
 *                     slug:
 *                       type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only AUTHOR and ADMIN can create blogs
 */

/**
 * @swagger
 * /blog/update/{blogId}:
 *   patch:
 *     summary: Update a blog post
 *     description: Update existing blog post. Requires AUTHOR or ADMIN role. Only accessible to own blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: Updated Blog Title
 *               content:
 *                 type: string
 *                 minLength: 10
 *                 example: Updated content with more details...
 *               banner:
 *                 type: string
 *                 format: URI
 *                 nullable: true
 *             required:
 *               - title
 *               - content
 *       - in: formData
 *         name: banner
 *         type: file
 *         description: New banner image file
 *     responses:
 *       200:
 *         description: Blog updated successfully
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
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     banner:
 *                       type: string
 *                     status:
 *                       type: string
 *                     slug:
 *                       type: string
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only AUTHOR and ADMIN can update blogs
 *       404:
 *         description: Blog not found or not owned by user
 */

/**
 * @swagger
 * /blog/delete/{blogId}:
 *   delete:
 *     summary: Delete a blog post
 *     description: Delete a blog post. Requires AUTHOR or ADMIN role. Only accessible to own blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Blog ID to delete
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized - No valid token
 *       403:
 *         description: Forbidden - Only AUTHOR and ADMIN can delete blogs
 *       404:
 *         description: Blog not found or not owned by user
 */