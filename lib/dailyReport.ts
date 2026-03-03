import { fetchDailyUsers, fetchTopPages, fetchEventCount } from './googleAnalytics';
import { fetchGscMetrics, type GscMetrics } from './googleSearchConsole';

export interface DailyReport {
  date: string; // YYYY-MM-DD
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
 * Generate the full daily analytics report.
 * @param date - optional Date object; defaults to yesterday (Dubai timezone).
 */
export async function generateDailyAnalyticsReport(
  date?: Date
): Promise<DailyReport> {
  const reportDate = date ?? getYesterday();
  const dateStr = formatDate(reportDate);

  // Fetch all data concurrently
  const [gsc, totalUsers, topPages, formSubmits, bookingExitClicks] =
    await Promise.all([
      fetchGscMetrics(dateStr),
      fetchDailyUsers(dateStr),
      fetchTopPages(dateStr, 10),
      fetchEventCount(dateStr, 'form_submit'),
      fetchEventCount(dateStr, 'booking_exit_click'),
    ]);

  return {
    date: dateStr,
    gsc,
    totalUsers,
    topPages,
    formSubmits,
    bookingExitClicks,
  };
}
