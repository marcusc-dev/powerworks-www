import { NextResponse } from 'next/server';
import {
  generateDailyAnalyticsReport,
  getYesterday,
} from '@/lib/dailyReport';

export const dynamic = 'force-dynamic';

/**
 * Test endpoint — returns the report JSON without sending an email.
 * Use this to verify that the Google APIs are returning data correctly.
 *
 * GET /api/daily-report-test
 * GET /api/daily-report-test?date=2025-06-15
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    const reportDate = dateParam ? new Date(`${dateParam}T00:00:00Z`) : getYesterday();

    const report = await generateDailyAnalyticsReport(reportDate);

    return NextResponse.json({ ok: true, report });
  } catch (err) {
    console.error('Daily report test error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
