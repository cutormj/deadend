import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'app', 'browser-info.json'); // Path to the JSON file

export async function GET() {
  try {
    const data = readFileSync(filePath, 'utf-8'); // Read the JSON file
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData); // Return JSON response
  } catch (error) {
    console.error('Error reading browser-info.json:', error);
    return NextResponse.json(
      { error: 'Failed to load browser-info.json' },
      { status: 500 }
    );
  }
}