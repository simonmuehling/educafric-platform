import { Request, Response, NextFunction } from 'express';
import { ValidationError, NotFoundError, UnauthorizedError, ConflictError, ForbiddenError, AuthenticatedUser } from '@shared/types';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.path}:`, error);

  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }

  if (error instanceof ConflictError) {
    return res.status(409).json({
      success: false,
      message: error.message
    });
  }

  if (error instanceof ForbiddenError) {
    return res.status(403).json({
      success: false,
      message: error.message
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    throw new UnauthorizedError('Authentication required');
  }
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      throw new UnauthorizedError('Authentication required');
    }
    
    const user = req.user as AuthenticatedUser;
    const hasRole = roles.includes(user.role) || 
                   user.secondaryRoles?.some((r) => roles.includes(r));
    
    if (!hasRole) {
      throw new ForbiddenError('Insufficient permissions for this resource');
    }
    
    next();
  };
}