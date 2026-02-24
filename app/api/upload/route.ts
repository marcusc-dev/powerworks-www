import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const password = formData.get('password') as string | null;

    if (!password || password !== process.env.UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const apiKey = process.env.BUNNY_STORAGE_API_KEY;
    const hostname = process.env.BUNNY_STORAGE_HOSTNAME;
    const zone = process.env.BUNNY_STORAGE_ZONE;
    const cdnDomain = process.env.BUNNY_CDN_DOMAIN;

    if (!apiKey || !hostname || !zone || !cdnDomain) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
    }

    // Generate folder path: monyy format (e.g. feb26, mar26)
    const now = new Date();
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const folder = `${months[now.getMonth()]}${String(now.getFullYear()).slice(-2)}`;

    // Clean filename: lowercase, spaces to hyphens, strip special chars
    const rawName = file.name.toLowerCase().replace(/\s+/g, '-');
    const dotIdx = rawName.lastIndexOf('.');
    const ext = dotIdx > 0 ? rawName.slice(dotIdx) : '';
    const base = dotIdx > 0 ? rawName.slice(0, dotIdx) : rawName;
    const cleanBase = base.replace(/[^a-z0-9\-_]/g, '');
    const filename = cleanBase + ext;

    if (!filename || filename === ext) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    // Read file into buffer and upload to Bunny Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const bunnyUrl = `https://${hostname}/${zone}/${folder}/${filename}`;

    const bunnyRes = await fetch(bunnyUrl, {
      method: 'PUT',
      headers: {
        'AccessKey': apiKey,
        'Content-Type': 'application/octet-stream',
      },
      body: buffer,
    });

    if (!bunnyRes.ok) {
      const errorText = await bunnyRes.text();
      console.error('Bunny upload error:', bunnyRes.status, errorText);
      return NextResponse.json(
        { error: `Upload failed: ${bunnyRes.statusText}` },
        { status: 502 }
      );
    }

    const cdnUrl = `https://${cdnDomain}/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: cdnUrl,
      filename,
      folder,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
