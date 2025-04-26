import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // --- Basic Input Validation ---
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    // --- Find User by Email ---
    const [users] = await db.query('SELECT id, name, email, type, password FROM users WHERE email = ?', [email]);
    const userRows = users as any[];

    if (userRows.length === 0) {
      // User not found - Return a generic error to avoid revealing which emails exist
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 }); // 401 Unauthorized
    }

    const user = userRows[0];

    // --- Compare Passwords ---
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Password doesn't match - Return the same generic error
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 }); // 401 Unauthorized
    }

    // --- Successful Login --- 
    // Don't send the password hash back to the client
    const { password: _, ...userWithoutPassword } = user; 

    // TODO: Implement session/token generation here if needed

    return NextResponse.json({ 
      message: 'Login successful', 
      user: userWithoutPassword 
    });

  } catch (error: any) {
    console.error('Signin Error:', error);
    return NextResponse.json({ message: 'An error occurred during signin', error: error.message }, { status: 500 });
  }
}
