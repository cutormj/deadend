import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise; // Connect to MongoDB
    const db = client.db('test-database'); // Replace with your database name
    const collections = await db.collections(); // Get collections in the database

    return NextResponse.json({
      success: true,
      message: 'Connected to MongoDB',
      collections: collections.map((col) => col.collectionName),
    });
  } catch (error) {
    // Safely access the error message using `instanceof Error`
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json({
      success: false,
      message: 'Failed to connect to MongoDB',
      error: errorMessage,
    });
  }
}