/**
 * @openapi
 * /blog/me:
 *   get:
 *     tags: [Blogs]
 *     summary: Get my blogs
 *     description: Returns blogs owned by the authenticated administrator or author.
 *     security: [{ cookieAuth: [] }]
 *     responses:
 *       '200': { description: Owned blogs returned }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: User must have ADMIN or AUTHOR role }
 */

/**
 * @openapi
 * /blog/get:
 *   get:
 *     tags: [Blogs]
 *     summary: Get all blogs
 *     description: Admin-only paginated list of blogs.
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
 *       '200': { description: Blogs returned }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: Only administrators can list all blogs }
 */

/**
 * @openapi
 * /blog/create:
 *   post:
 *     tags: [Blogs]
 *     summary: Create a blog
 *     description: Creates a blog and optionally stores one uploaded banner file.
 *     security: [{ cookieAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string, minLength: 3, maxLength: 100, example: My first blog }
 *               content: { type: string, minLength: 10, example: This is the content of my blog post. }
 *               banner: { type: string, format: binary, description: Optional banner upload }
 *               status: { type: string, enum: [DRAFT, PUBLISHED], default: DRAFT }
 *     responses:
 *       '201': { description: Blog created }
 *       '400': { description: Invalid title, content, status, or upload }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: User lacks ADMIN or AUTHOR role, or is muted }
 */

/**
 * @openapi
 * /blog/update/{blogId}:
 *   patch:
 *     tags: [Blogs]
 *     summary: Update a blog
 *     description: Updates a blog owned by the current user. Administrators can update any blog.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: UUID of the blog to update
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, minLength: 3, maxLength: 100, example: Updated title }
 *               content: { type: string, minLength: 10, example: Updated blog content. }
 *               banner: { type: string, format: binary, description: Optional replacement banner }
 *               status: { type: string, enum: [DRAFT, PUBLISHED] }
 *     responses:
 *       '200': { description: Blog updated }
 *       '400': { description: Invalid update data }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: User is not allowed to update this blog }
 *       '404': { description: Blog not found }
 */

/**
 * @openapi
 * /blog/delete/{blogId}:
 *   delete:
 *     tags: [Blogs]
 *     summary: Delete a blog
 *     description: Deletes a blog and removes its stored banner file.
 *     security: [{ cookieAuth: [] }]
 *     parameters:
 *       - name: blogId
 *         in: path
 *         required: true
 *         description: UUID of the blog to delete
 *         schema: { type: string, format: uuid }
 *     responses:
 *       '200': { description: Blog deleted }
 *       '401': { description: Authentication required or session expired }
 *       '403': { description: User is not allowed to delete this blog }
 *       '404': { description: Blog not found }
 */
export {};
