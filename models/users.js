import pool from "../config/db.js";
import bcrypt from "bcrypt";
import validator from "validator";

class UserModel {

  static async createUser(userData) {
    const { first_name, last_name, email, password, country, profilePicture } = userData;

    // validate email
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }

    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (first_name, last_name, email, password, country, profile_picture)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING id, first_name, last_name, email, country, profile_picture
    `;

    const values = [
      first_name,
      last_name,
      email,
      hashedPassword,
      country,
      profilePicture
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    return result.rows[0];
  }

  static async isValidPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

}

export default UserModel;