import { fetchDailyUsers, fetchTopPages, fetchEventCount } from './googleAnalytics';
import { fetchGscMetrics, type GscMetrics } from './googleSearchConsole';

export interface DailyReport {
  date: string; // YYYY-MM-DD
  gscDate: string; // YYYY-MM-DD (2 days behind due to GSC lag)
  gsc: GscMetrics;
  totalUsers: number;
  topPages: { path: string; pageViews: number }[];
  formSubmits: number;
  bookingExitClicks: number;
}

/**
 * Format a Date to YYYY-MM-DD string.
 */
function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Return yesterday's date in the project timezone (Asia/Dubai = UTC+4).
 */
export function getYesterday(): Date {
  // Get current time in Dubai timezone
  const nowUtc = Date.now();
  const dubaiOffset = 4 * 60 * 60 * 1000; // UTC+4
  const dubaiNow = new Date(nowUtc + dubaiOffset);
  // Subtract one day
  dubaiNow.setUTCDate(dubaiNow.getUTCDate() - 1);
  // Return as a date-only value (midnight UTC, representing that Dubai date)
  return new Date(Date.UTC(dubaiNow.getUTCFullYear(), dubaiNow.getUTCMonth(), dubaiNow.getUTCDate()));
}

/**
 * Return the date N days before a given date.
 */
function daysAgo(from: Date, n: number): Date {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}

/**
 * Generate the full daily analytics report.
 * @param date - optional Date object; defaults to yesterday (Dubai timezone).
 *
 * GA4 data is available for yesterday, but GSC data has a 2–3 day lag,
 * so we query GSC for 2 days before the report date.
 */
export async function generateDailyAnalyticsReport(
  date?: Date
): Promise<DailyReport> {
  const reportDate = date ?? getYesterday();
  const dateStr = formatDate(reportDate);
  const gscDateStr = formatDate(daysAgo(reportDate, 2));

  // Fetch all data concurrently
  const [gsc, totalUsers, topPages, formSubmits, bookingExitClicks] =
    await Promise.all([
      fetchGscMetrics(gscDateStr),
      fetchDailyUsers(dateStr),
      fetchTopPages(dateStr, 10),
      fetchEventCount(dateStr, 'form_submit'),
      fetchEventCount(dateStr, 'booking_exit_click'),
    ]);

  return {
    date: dateStr,
    gscDate: gscDateStr,
    gsc,
    totalUsers,
    topPages,
    formSubmits,
    bookingExitClicks,
  };
}
