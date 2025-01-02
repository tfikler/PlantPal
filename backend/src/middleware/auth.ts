import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/users';

export interface AuthRequest extends Request {
    userId?: string;
    user?: any;
}

export const authenticate: RequestHandler = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({ error: 'Please authenticate' });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        const user = await UserModel.findById(decoded.userId);

        if (!user) {
            res.status(401).json({ error: 'Please authenticate' });
            return;
        }

        req.userId = decoded.userId;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Please authenticate' });
        return;
    }
};