import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    // Parse the JSON body from the request
    const browserInfo = await req.json();

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('test-database'); // Replace with your database name
    const collection = db.collection('browserInfo'); // Replace with your collection name

    // Insert the browser information into the database
    const result = await collection.insertOne(browserInfo);

    return NextResponse.json({
      success: true,
      message: 'Browser information successfully saved to MongoDB!',
      insertedId: result.insertedId,
    });
  } catch (error) {
    // Handle error safely by checking if it's an instance of Error
    console.error('Error saving browser information:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, message: 'Failed to save browser information', error: errorMessage },
      { status: 500 }
    );
  }
}