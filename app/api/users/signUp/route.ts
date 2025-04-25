import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST handler for user sign-up
export async function POST(req: NextRequest) {
  try {
    const { email, password, type } = await req.json();

    // Basic validation
    if (!email || !password || !type) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate type
    if (type !== 'customer' && type !== 'farmer') {
        return NextResponse.json({ message: 'Invalid user type' }, { status: 400 });
    }

    // Check if user already exists (optional but recommended)
    // Note: Adjust table name if different, and handle potential DB errors
    // const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    // if (existingUsers.length > 0) {
    //    return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
    // }

    // Hash the password
    const saltRounds = 10; // Standard practice
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    // Ensure the table name 'users' and columns 'email', 'password', 'type' match your schema
    const [result] = await db.query(
      'INSERT INTO users (email, password, type) VALUES (?, ?, ?)',
      [email, hashedPassword, type]
    );

    // Basic check if insert was successful (depends on DB driver response)
    // This example assumes a successful insert returns an object with insertId
    // You might need to adjust based on what your db.query returns for INSERT
    // if (!result || !result.insertId) {
    //   throw new Error('Failed to create user');
    // }

    // Return success response (don't send back sensitive info)
    // You might want to return the created user ID or just a success message
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });

  } catch (error: any) {
    console.error('Signup Error:', error);
    // Handle specific DB errors, e.g., duplicate entry for email if UNIQUE constraint is present
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('Duplicate entry')) {
        return NextResponse.json({ message: 'Email already in use' }, { status: 409 });
    }

    return NextResponse.json({ message: 'Failed to create user', error: error.message }, { status: 500 });
  }
}