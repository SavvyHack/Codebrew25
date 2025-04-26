import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Use named import for DB connection
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, type } = body;

    // --- Basic Input Validation ---
    if (!email || !password || !type) {
      return NextResponse.json({ message: 'Missing required fields (email, password, type)' }, { status: 400 });
    }

    if (type !== 'customer' && type !== 'farmer') {
      return NextResponse.json({ message: 'Invalid user type. Must be \'customer\' or \'farmer\'.' }, { status: 400 });
    }

    // --- Check if user already exists --- 
    // Although DB has UNIQUE constraint, this gives a cleaner response
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((existingUsers as any[]).length > 0) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 }); // 409 Conflict
    }

    // --- Hash Password --- 
    const saltRounds = 10; // Recommended salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // --- Insert User into Database --- 
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)',
      [name || null, email, hashedPassword, type] // Use null if name is not provided
    );

    // --- Check if insert was successful ---
    const insertResult = result as any;
    if (insertResult.affectedRows !== 1) {
        throw new Error('Failed to insert user into database.');
    }

    const userId = insertResult.insertId;

    // --- Return Success Response ---
    // Avoid sending password back, even the hash
    return NextResponse.json({ message: 'User created successfully', userId: userId }, { status: 201 }); // 201 Created

  } catch (error: any) {
    console.error('Signup Error:', error);

    // Handle potential duplicate entry error from DB constraint if the check above fails for some reason
    if (error.code === 'ER_DUP_ENTRY') { 
        return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
    }

    // Generic error for other issues
    return NextResponse.json({ message: 'An error occurred during signup', error: error.message }, { status: 500 });
  }
}
