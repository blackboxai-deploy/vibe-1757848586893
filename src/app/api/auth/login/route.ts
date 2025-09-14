import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/database/connection';
import { comparePassword, generateToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const users = await executeQuery<any>(
      'SELECT * FROM Users WHERE Email = ? AND IsActive = TRUE',
      [email]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await comparePassword(password, user.PasswordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Update last login
    await executeQuery(
      'UPDATE Users SET LastLogin = NOW() WHERE UserID = ?',
      [user.UserID]
    );

    // Generate JWT token
    const token = generateToken({
      userId: user.UserID,
      email: user.Email,
      role: user.Role,
      organizationId: user.OrganizationID
    });

    // Return user data and token
    const userData = {
      id: user.UserID,
      email: user.Email,
      name: user.Name,
      role: user.Role,
      organizationId: user.OrganizationID
    };

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}