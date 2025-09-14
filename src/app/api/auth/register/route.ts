import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/database/connection';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role, organizationName } = await request.json();

    // Validate input
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { message: passwordValidation.errors.join('. ') },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUsers = await executeQuery<any>(
      'SELECT UserID FROM Users WHERE Email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user and organization in transaction
    let organizationId = null;
    
    if (organizationName) {
      // For now, we'll use a simple approach - in production, this would be more sophisticated
      organizationId = Date.now(); // Temporary ID generation
    }

    const queries = [
      {
        query: 'INSERT INTO Users (Name, Email, PasswordHash, Role, OrganizationID, IsActive, CreatedAt) VALUES (?, ?, ?, ?, ?, TRUE, NOW())',
        params: [name, email, hashedPassword, role, organizationId]
      }
    ];

    // Execute transaction
    await executeTransaction(queries);

    // Log the registration (without sensitive data)
    await executeQuery(
      'INSERT INTO AuditLog (Action, TableName, NewValues, CreatedAt) VALUES (?, ?, ?, NOW())',
      ['USER_REGISTRATION', 'Users', JSON.stringify({ email, role, organizationName })]
    );

    return NextResponse.json({
      message: 'User registered successfully',
      data: {
        email,
        name,
        role
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Check for specific database errors
    if (error instanceof Error && error.message.includes('Duplicate entry')) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}