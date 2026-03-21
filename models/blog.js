import pool from "../db/connect.js";
import calculateReadingTime from "../utils/readingTime.js";

class BlogModel {
  // CREATE
  static async createPost(postData) {
    const { user_id, title, description, tag, body, reading_time } = postData;

    const query = `
      INSERT INTO posts (user_id, title, description, tag, body, reading_time)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
    `;

    const values = [user_id, title, description, tag, body, reading_time];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  // READ ALL
  static async getAllPosts() {
    const result = await pool.query(
      "SELECT * FROM posts ORDER BY created_at DESC",
    );

    return result.rows;
  }

  // READ ONE
  static async getPostById(id) {
    const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

    return result.rows[0];
  }

  // UPDATE
  static async updatePost(id, data) {
    // 1. Fetch existing post
    const existing = await BlogModel.getPostById(id);
    if (!existing) return null;

    // 2. Merge — keep existing values for anything not sent
    const title = data.title ?? existing.title;
    const description = data.description ?? existing.description;
    const tag = data.tag ?? existing.tag;
    const body = data.body ?? existing.body;
    const state = data.state ?? existing.state;
    const reading_time = data.body
      ? calculateReadingTime(data.body) // recalculate only if body changed
      : existing.reading_time;

    const query = `
    UPDATE posts
    SET title=$1, description=$2, tag=$3, body=$4, state=$5, reading_time=$6
    WHERE id=$7
    RETURNING *
  `;

    const values = [title, description, tag, body, state, reading_time, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // DELETE
  static async deletePost(id) {
    const result = await pool.query(
      "DELETE FROM posts WHERE id=$1 RETURNING *",
      [id],
    );

    return result.rows[0];
  }

  //increment
  static async incrementReadCount(postId) {
    const query = `
    UPDATE posts
    SET read_count = read_count + 1
    WHERE id = $1
    RETURNING *
  `;
    const result = await pool.query(query, [postId]);
    return result.rows[0];
  }
}

export default BlogModel;
