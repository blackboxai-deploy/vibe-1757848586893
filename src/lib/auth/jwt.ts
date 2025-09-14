import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// JWT Token interface
export interface JWTPayload {
  userId: number;
  email: string;
  role: 'Admin' | 'Supplier' | 'Pharmacist' | 'Clinic' | 'Health_Staff';
  organizationId?: number;
}

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate JWT token
 */
export const generateToken = (payload: JWTPayload): string => {
  try {
    return jwt.sign(payload as any, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    } as any);
  } catch (error) {
    console.error('JWT generation error:', error);
    throw new Error('Failed to generate token');
  }
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as JWTPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};

/**
 * Hash password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare password
 */
export const comparePassword = async (
  password: string, 
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader: string | null | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7); // Remove 'Bearer ' prefix
};

/**
 * Generate random secure string
 */
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return result;
};

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate session ID
 */
export const generateSessionId = (): string => {
  return `sess_${Date.now()}_${generateSecureToken(24)}`;
};

/**
 * Check if user has required role
 */
export const hasRole = (
  userRole: string, 
  requiredRoles: string[]
): boolean => {
  return requiredRoles.includes(userRole);
};

/**
 * Check if user has permission for organization
 */
export const hasOrganizationAccess = (
  userOrgId: number | undefined,
  requiredOrgId: number,
  userRole: string
): boolean => {
  // Admin has access to all organizations
  if (userRole === 'Admin') {
    return true;
  }
  
  // User must belong to the same organization
  return userOrgId === requiredOrgId;
};