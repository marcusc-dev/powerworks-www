import { NextRequest, NextResponse } from 'next/server';

interface BunnyEntry {
  ObjectName: string;
  IsDirectory: boolean;
  Length: number;
  LastChanged: string;
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password || password !== process.env.UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.BUNNY_STORAGE_API_KEY;
    const hostname = process.env.BUNNY_STORAGE_HOSTNAME;
    const zone = process.env.BUNNY_STORAGE_ZONE;

    if (!apiKey || !hostname || !zone) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
    }

    // List root directory of storage zone
    const res = await fetch(`https://${hostname}/${zone}/`, {
      method: 'GET',
      headers: { 'AccessKey': apiKey },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to list folders' }, { status: 502 });
    }

    const entries: BunnyEntry[] = await res.json();

    const folders = entries
      .filter((e) => e.IsDirectory)
      .map((e) => ({
        name: e.ObjectName.replace(/\/$/, ''),
        lastModified: e.LastChanged,
      }))
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return NextResponse.json({ folders });
  } catch {
    return NextResponse.json({ error: 'Failed to list folders' }, { status: 500 });
  }
}
