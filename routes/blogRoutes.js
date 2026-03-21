// routes/blogRouter.js
import express from "express";
import {createPost, getPosts, getPostById, updatePost, deletePost} from '../controllers/blogController.js';

const blogRouter = express.Router();

/**
 * @swagger
 * /api/blogs/create:
 *   post:
 *     summary: Create a blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - body
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Blog Post
 *               description:
 *                 type: string
 *                 example: A short summary of the post
 *               tag:
 *                 type: string
 *                 example: technology
 *               body:
 *                 type: string
 *                 example: This is the full content of the blog post...
 *               state:
 *                 type: string
 *                 enum: [draft, published]
 *                 example: draft
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
blogRouter.post('/create', createPost);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Retrieve all blog posts
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of blog posts
 *       401:
 *         description: Unauthorized
 */
blogRouter.get('/', getPosts);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: A single blog post
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
blogRouter.get('/:id', getPostById);

/**
 * @swagger
 * /api/blogs/update/{id}:
 *   patch:
 *     summary: Update a single blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: A single blog post
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
blogRouter.patch('/update/:id', updatePost);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a single blog post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The blog post ID
 *     responses:
 *       200:
 *         description: A single blog post
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */
blogRouter.delete('/:id', deletePost);

export default blogRouter;