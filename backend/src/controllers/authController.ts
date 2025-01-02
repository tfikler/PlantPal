import { Request, Response, RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel, UserInput } from '../models/users';
import { AuthRequest } from '../middleware/auth';

export class AuthController {
    static register: RequestHandler = async (req, res) => {
        try {
            const { email, password, full_name, user_type } = req.body;

            if (!email || !password || !full_name || !user_type) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                res.status(400).json({ error: 'Email already registered' });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const userInput: UserInput = {
                email,
                password: hashedPassword,
                full_name,
                user_type
            };

            const user = await UserModel.create(userInput);

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    user_type: user.user_type
                },
                token
            });
        } catch (err) {
            console.error('Registration error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static login: RequestHandler = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ error: 'Missing email or password' });
                return;
            }

            const user = await UserModel.findByEmail(email);
            if (!user) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                res.status(401).json({ error: 'Invalid credentials' });
                return;
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET!,
                { expiresIn: '24h' }
            );

            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    full_name: user.full_name,
                    user_type: user.user_type
                },
                token
            });
        } catch (err) {
            console.error('Login error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static getProfile: RequestHandler = async (req: AuthRequest, res) => {
        try {
            res.json({ user: req.user });
        } catch (err) {
            console.error('Get profile error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };

    static updateProfile: RequestHandler = async (req: AuthRequest, res) => {
        try {
            const updates = req.body;
            const userId = req.userId!;

            const updatedUser = await UserModel.updateProfile(userId, updates);
            if (!updatedUser) {
                res.status(400).json({ error: 'Invalid updates' });
                return;
            }

            res.json({ user: updatedUser });
        } catch (err) {
            console.error('Update profile error:', err);
            res.status(500).json({ error: 'Server error' });
        }
    };
}