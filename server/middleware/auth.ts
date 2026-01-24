import type { Request, Response, NextFunction } from "express";

/**
 * Admin authentication middleware
 * Protects admin routes with API key authentication
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const adminKey = req.headers['x-admin-key'];

    if (!process.env.ADMIN_SECRET_KEY) {
        console.warn("ADMIN_SECRET_KEY not configured - admin routes disabled");
        return res.status(503).json({
            error: 'Admin functionality not configured'
        });
    }

    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({
            error: 'Unauthorized - valid x-admin-key header required'
        });
    }

    next();
}
