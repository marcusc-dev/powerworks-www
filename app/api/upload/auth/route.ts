import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password !== process.env.UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const now = new Date();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const folder = `${months[now.getMonth()]}${String(now.getFullYear()).slice(-2)}`;

    return NextResponse.json({
      success: true,
      folder,
      cdnDomain: process.env.BUNNY_CDN_DOMAIN,
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
