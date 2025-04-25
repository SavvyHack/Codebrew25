import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

interface UserData extends RowDataPacket {
  id: number;
  email: string;
  password: string;
  type: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    // Ensure 'users' table and 'email', 'password', 'id', 'type' columns exist
    const [users] = await db.query<UserData[]>(
      'SELECT id, email, password, type FROM users WHERE email = ?',
      [email]
    );

    // Check if user exists
    if (users.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); // User not found
    }

    const user = users[0];

    // Compare submitted password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 }); // Incorrect password
    }

    // --- Successful Login --- 
    // TODO: Implement session handling (e.g., JWT generation, next-auth session creation, cookie setting)
    console.log(`User ${user.email} logged in successfully.`);

    // Return success response (excluding sensitive info like password hash)
    // You might return user info or a token depending on your session strategy
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        type: user.type,
      }
      // token: generatedToken // If using JWT
    }, { status: 200 });

  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
