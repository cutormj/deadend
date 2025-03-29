import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('test-database'); // Replace with your database name
    const collection = db.collection('browserInfo'); // Replace with your collection name
    const data = await collection.find({}).toArray(); // Fetch all documents from the collection

    return NextResponse.json({
      success: true,
      data, // Return the data to the client
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch data from MongoDB',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}