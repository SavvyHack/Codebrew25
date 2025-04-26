import { NextResponse } from 'next/server';
import { db } from '@/lib/db'

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    // Cast rows to an array of objects with expected properties
    const products = rows as any[];

    // Format the products to convert DB boolean (0/1) to true/false
    const formattedProducts = products.map(product => ({
      ...product,
      // Ensure conversion handles potential null/undefined if necessary
      delivery: Boolean(product.delivery),
      pickup: Boolean(product.pickup),
      price: parseFloat(product.price), // Convert price string to number
      image_link: `/product-pic-list/${product.image_link}`, // Prepend base path
      // Add other necessary transformations if needed
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('API Error fetching products:', error); // Log the actual error
    return NextResponse.json(
      { message: 'Failed to fetch products', error: (error as Error).message }, // Provide more context
      { status: 500 }
    );
  }
}