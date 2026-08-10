'use server';

import { db } from '@/lib/db';
import { productsTable } from '@/lib/schema';

export async function addPotatoFlakesProduct() {
  try {
    const result = await db.insert(productsTable).values({
      name: 'Potato Flakes',
      slug: 'potato-flakes',
      category: 'Dehydrated Products',
      description: 'Premium quality potato flakes made from 100% natural potatoes. Perfect for instant mashed potatoes, soups, and culinary applications. Lightweight, easy to store, and with a long shelf life.',
      specifications: {
        'Ingredients': '100% Dehydrated Potatoes',
        'Moisture Content': '≤ 8%',
        'Protein Content': '8-10%',
        'Shelf Life': '24 months',
        'Packaging': 'Available in 25kg bags',
        'Storage': 'Cool, dry place'
      },
      imageUrl: null,
      brochureUrl: null,
    });

    return {
      success: true,
      message: 'Potato Flakes product added successfully!',
      data: result
    };
  } catch (error) {
    console.error('[v0] Error adding product:', error);
    return {
      success: false,
      message: 'Failed to add Potato Flakes product',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
