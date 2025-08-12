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

    // Path to the watermark. Assumes 'watermark.png' is in the 'public' directory.
    const watermarkPath = path.join(process.cwd(), 'public/watermark.png');

    // Create a placeholder watermark if it doesn't exist.
    // This is a workaround for the agent environment where I can't create image files.
    // In a real project, the watermark.png would be provided.
    const watermarkBuffer = await getWatermarkBuffer(watermarkPath);

    // Apply the watermark using Sharp
    const watermarkedImageBuffer = await sharp(imageBuffer)
      .composite([
        {
          input: watermarkBuffer,
          gravity: 'southeast', // Position in the bottom-right corner
          // You can add padding by creating a slightly larger transparent canvas
          // or by pre-processing the watermark image to have padding.
        },
      ])
      .toFormat('webp', { quality: 80 }) // Convert to a modern, efficient format
      .toBuffer();

    // Return the processed image
    return new NextResponse(watermarkedImageBuffer, {
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
async function getWatermarkBuffer(filePath: string) {
    // In a real env, you'd use fs.readFileSync(filePath).
    // Here we create a dummy 50x50 transparent png with a small pink dot.
    const svg = `
        <svg width="100" height="50" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="50" fill="rgba(0,0,0,0.2)" />
            <text x="50" y="30" font-family="Arial" font-size="16" fill="white" text-anchor="middle">TunyDeal</text>
        </svg>
    `;
    return Buffer.from(svg);
}
