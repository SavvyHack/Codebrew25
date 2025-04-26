import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // Assuming your DB connection is here

interface ProductParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: ProductParams) {
  const { id } = params;

  if (!id || isNaN(parseInt(id))) {
    return NextResponse.json({ message: 'Invalid product ID' }, { status: 400 });
  }

  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [parseInt(id)]);
    const products = rows as any[];

    if (products.length === 0) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const product = products[0];

    // Format the product similar to the list endpoint
    const formattedProduct = {
      ...product,
      delivery: Boolean(product.delivery),
      pickup: Boolean(product.pickup),
      price: parseFloat(product.price),
      image_link: `/product-pic-list/${product.image_link}`, // Use the correct prefix
      // TODO: Potentially fetch related data like farmer details if needed
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
