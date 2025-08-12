import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('imageUrl');

  if (!imageUrl) {
    return new NextResponse('Missing imageUrl parameter', { status: 400 });
  }

  try {
    // Fetch the original image
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      return new NextResponse('Failed to fetch image', { status: imageResponse.status });
    }
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer());

    // Get the watermark buffer
    const watermarkBuffer = await getWatermarkBuffer();

    // Apply the watermark using Sharp
    const watermarkedImageBuffer = await sharp(imageBuffer)
      .composite([
        {
          input: watermarkBuffer,
          gravity: 'southeast',
        },
      ])
      .toFormat('webp', { quality: 80 })
      .toBuffer();

    // ------------------------------------------------------------------
    // --- THE FINAL FIX: Create a Uint8Array from the Buffer ---
    // ------------------------------------------------------------------
    // This creates a standard JavaScript Uint8Array, which is a view
    // on the buffer's data. This type is 100% compatible with the
    // web-standard NextResponse constructor and resolves the type error.
    const finalImage = new Uint8Array(watermarkedImageBuffer);

    // Return the processed image
    return new NextResponse(finalImage, {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

  } catch (error) {
    console.error('Image processing error:', error);
    return new NextResponse('Error processing image', { status: 500 });
  }
}

// Helper function to create a dummy watermark buffer
async function getWatermarkBuffer() {
    const svg = `
        <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="50" fill="rgba(0,0,0,0.2)" />
            <text x="50" y="30" font-family="Arial" font-size="16" fill="white" text-anchor="middle">TunyDeal</text>
        </svg>
    `;
    return Buffer.from(svg);
}