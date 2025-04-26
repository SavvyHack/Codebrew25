import { NextResponse, NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming JSON data from the request
    const { customer_id, delivery_date, status, items, totalPrice } = await req.json();

    // Basic validation: ensure required fields are present
    if (!customer_id || !items || !totalPrice) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Validate the status (it should be one of 'pending', 'dispatched', 'delivered', 'canceled')
    const validStatuses = ['pending', 'dispatched', 'delivered', 'canceled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid order status' }, { status: 400 });
    }

    // If no status is provided, default to 'pending'
    const orderStatus = status || 'pending';

    // Insert the new order into the database (no need for `id` as it's auto-incremented)
    const [result] = await db.query(
      'INSERT INTO orders (customer_id, order_date, delivery_date, status, items, total_price) VALUES (?, NOW(), ?, ?, ?, ?)',
      [customer_id, delivery_date, orderStatus, JSON.stringify(items), totalPrice]
    );

    // Return a success response
    return NextResponse.json({ message: 'Order created successfully' }, { status: 201 });

  } catch (error: any) {
    console.error('Order Creation Error:', error);
    // Handle specific DB errors
    return NextResponse.json({ message: 'Failed to create order', error: error.message }, { status: 500 });
  }
}
