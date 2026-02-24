import { NextRequest, NextResponse } from 'next/server';

interface BunnyFile {
  ObjectName: string;
  Length: number;
  LastChanged: string;
  IsDirectory: boolean;
  DateCreated: string;
}

export async function POST(request: NextRequest) {
  try {
    const { password, folder } = await request.json();

    if (!password || password !== process.env.UPLOAD_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.BUNNY_STORAGE_API_KEY;
    const hostname = process.env.BUNNY_STORAGE_HOSTNAME;
    const zone = process.env.BUNNY_STORAGE_ZONE;
    const cdnDomain = process.env.BUNNY_CDN_DOMAIN;

    if (!apiKey || !hostname || !zone || !cdnDomain) {
      return NextResponse.json({ error: 'Storage not configured' }, { status: 500 });
    }

    const targetFolder = folder || (() => {
      const now = new Date();
      const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
      return `${months[now.getMonth()]}${String(now.getFullYear()).slice(-2)}`;
    })();

    const bunnyUrl = `https://${hostname}/${zone}/${targetFolder}/`;

    const res = await fetch(bunnyUrl, {
      method: 'GET',
      headers: { 'AccessKey': apiKey },
    });

    if (!res.ok) {
      // 404 means the folder doesn't exist yet — return empty list
      if (res.status === 404) {
        return NextResponse.json({ files: [], folder: targetFolder });
      }
      return NextResponse.json({ error: 'Failed to list files' }, { status: 502 });
    }

    const bunnyFiles: BunnyFile[] = await res.json();

    const files = bunnyFiles
      .filter((f) => !f.IsDirectory)
      .map((f) => ({
        name: f.ObjectName,
        size: f.Length,
        url: `https://${cdnDomain}/${targetFolder}/${f.ObjectName}`,
        lastModified: f.LastChanged,
      }))
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    return NextResponse.json({ files, folder: targetFolder });
  } catch {
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}
