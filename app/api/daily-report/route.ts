import { NextRequest, NextResponse } from 'next/server';
import {
  generateDailyAnalyticsReport,
  getYesterday,
} from '@/lib/dailyReport';
import { sendDailyReportEmail } from '@/lib/sendDailyReportEmail';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Optional: verify the request is from Vercel Cron via shared secret
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  try {
    const yesterday = getYesterday();
    const report = await generateDailyAnalyticsReport(yesterday);
    const emailResult = await sendDailyReportEmail(report, yesterday);

    return NextResponse.json({
      ok: true,
      date: report.date,
      report,
      email: emailResult,
    });
  } catch (err) {
    console.error('Daily report error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
