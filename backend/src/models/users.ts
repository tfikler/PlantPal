import { pool } from '../config/database';
import bcrypt from "bcrypt";

export interface User {
    id: string;
    email: string;
    password_hash: string;
    full_name: string;
    user_type: 'owner' | 'expert';
    location_lat?: number;
    location_lng?: number;
}

export interface UserInput {
    email: string;
    password: string;
    full_name: string;
    user_type: 'owner' | 'expert';
}

export class UserModel {
    static async create(userInput: UserInput): Promise<User> {
        const { email, password, full_name, user_type } = userInput;

        const password_hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, password_hash, full_name, user_type)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email, password_hash, full_name, user_type`,
            [email, password, full_name, user_type]
        );

        return result.rows[0];
    }

    static async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query(
            'SELECT id, email, password_hash, full_name, user_type FROM users WHERE email = $1',
            [email]
        );

        return result.rows[0] || null;
    }

    static async findById(id: string): Promise<User | null> {
        const result = await pool.query(
            'SELECT id, email, full_name, user_type FROM users WHERE id = $1',
            [id]
        );

        return result.rows[0] || null;
    }

    static async updateProfile(id: string, updates: Partial<User>): Promise<User | null> {
        const allowedUpdates = ['full_name', 'location_lat', 'location_lng'];
        const updateEntries = Object.entries(updates)
            .filter(([key]) => allowedUpdates.includes(key));

        if (updateEntries.length === 0) return null;

        const setClause = updateEntries
            .map((_, index) => `${updateEntries[index][0]} = $${index + 2}`)
            .join(', ');

        const values = updateEntries.map(([, value]) => value);

        const result = await pool.query(
            `UPDATE users 
             SET ${setClause}
             WHERE id = $1
             RETURNING id, email, full_name, password_hash, user_type, location_lat, location_lng`,
            [id, ...values]
        );

        return result.rows[0] || null;
    }
}