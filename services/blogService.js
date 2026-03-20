import BlogModel from "../models/blogModel.js";
import calculateReadingTime from "../utils/readingTime.js";
import AppError from "../utils/appError.js";

class BlogService {
  static async createPost(data) {
    const reading_time = calculateReadingTime(data.body);

    const postData = {
      ...data,
      reading_time,
    };

    return await BlogModel.createPost(postData);
  }

  static async getPosts() {
    return await BlogModel.getAllPosts();
  }
  static async getPostById(id) {
    // First confirm the post exists
    const post = await BlogModel.getPostById(id);
    if (!post) throw new AppError("Post not found", 404);

    // Then increment
    await BlogModel.incrementReadCount(id);

    return post;
  }
  static async updatePost(id, data) {
    const post = await BlogModel.updatePost(id, data);
    if (!post) throw new AppError("Post not found", 404);
    return post;
  }

  static async deletePost(id) {
    const post = await BlogModel.deletePost(id);
    if (!post) throw new AppError("Post not found", 404);
    return { message: "Post deleted successfully" };
  }
}

export default BlogService;
