import { NextResponse } from 'next/server'; // Removed NextRequest for GET as unused
import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'browser-info.json'); // Path for saving data

// Handle GET requests (Removed req parameter)
export async function GET() {
  console.log('GET request received at /api/browser-info');

  const htmlResponse = `
    <html>
      <head>
        <title>Browser Information API</title>
      </head>
      <body>
        <h1>Welcome to the Browser Information API</h1>
        <p>This endpoint accepts JSON data and saves it to a file.</p>
        <p>To save data, send a POST request with JSON body to this endpoint.</p>
      </body>
    </html>
  `;

  return new NextResponse(htmlResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}

// Handle POST requests
export async function POST(req: Request) {
  console.log('POST request received at /api/main');

  let jsonData;
  try {
    jsonData = await req.json(); // Parse incoming JSON data
    console.log('Received JSON data:', jsonData);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({
      success: false,
      message: 'Invalid JSON data.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  let fileData = [];
  if (existsSync(filePath)) {
    try {
      const existingData = readFileSync(filePath, 'utf-8');
      fileData = JSON.parse(existingData);

      if (!Array.isArray(fileData)) {
        fileData = [];
      }
    } catch (error) {
      console.error('Error reading existing file:', error);
      return NextResponse.json({
        success: false,
        message: 'Failed to read existing data.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  fileData.push(jsonData);

  try {
    writeFileSync(filePath, JSON.stringify(fileData, null, 2));
    console.log('Data successfully saved to file.');
  } catch (error) {
    console.error('Error writing to file:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to save data to file.',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Data successfully saved.',
    filePath: `/browser-info.json`,
  });
}