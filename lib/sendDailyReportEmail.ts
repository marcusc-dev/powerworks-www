import type { DailyReport } from './dailyReport';

const RECIPIENTS = [
  { email: 'marcus@powerworksgarage.com', name: 'Marcus' },
  { email: 'glenn@powerworksgarage.com', name: 'Glenn' },
];

function renderReportHtml(report: DailyReport): string {
  const topPagesRows = report.topPages
    .map(
      (p, i) =>
        `<tr>
          <td style="padding:10px 16px;color:#999;font-size:13px;">${i + 1}</td>
          <td style="padding:10px 16px;font-size:13px;color:#333;">${p.path}</td>
          <td style="padding:10px 16px;text-align:right;font-weight:600;color:#111;">${p.pageViews.toLocaleString()}</td>
        </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#333;">
  <div style="max-width:600px;margin:24px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="padding:32px 32px 24px;border-bottom:1px solid #eee;">
      <img src="https://powerworksgarage.com/full_logo.png" alt="Powerworks Garage" width="140" style="max-width:140px;display:block;" />
      <h1 style="color:#111;font-size:18px;margin:20px 0 4px;font-weight:600;letter-spacing:-0.3px;">Daily Performance Report</h1>
      <p style="color:#999;font-size:13px;margin:0;">${report.date}</p>
    </div>

    <!-- Metrics Grid -->
    <div style="padding:24px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:16px;background:#fafafa;border-radius:6px;width:50%;">
            <span style="font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Active Users</span>
            <br/><span style="font-size:32px;font-weight:700;color:#111;line-height:1.4;">${report.totalUsers.toLocaleString()}</span>
          </td>
          <td style="width:12px;"></td>
          <td style="padding:16px;background:#fafafa;border-radius:6px;width:50%;">
            <span style="font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Search Clicks</span>
            <br/><span style="font-size:32px;font-weight:700;color:#111;line-height:1.4;">${report.gsc.clicks.toLocaleString()}</span>
            <br/><span style="font-size:11px;color:#bbb;">${report.gscDate}</span>
          </td>
        </tr>
        <tr><td colspan="3" style="height:12px;"></td></tr>
        <tr>
          <td style="padding:16px;background:#fafafa;border-radius:6px;">
            <span style="font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Impressions</span>
            <br/><span style="font-size:32px;font-weight:700;color:#111;line-height:1.4;">${report.gsc.impressions.toLocaleString()}</span>
            <br/><span style="font-size:11px;color:#bbb;">${report.gscDate}</span>
          </td>
          <td style="width:12px;"></td>
          <td style="padding:16px;background:#fafafa;border-radius:6px;">
            <span style="font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Form Submissions</span>
            <br/><span style="font-size:32px;font-weight:700;color:#111;line-height:1.4;">${report.formSubmits}</span>
          </td>
        </tr>
        <tr><td colspan="3" style="height:12px;"></td></tr>
        <tr>
          <td colspan="3" style="padding:16px;background:#fafafa;border-radius:6px;">
            <span style="font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;">Booking Exit Clicks</span>
            <br/><span style="font-size:32px;font-weight:700;color:#111;line-height:1.4;">${report.bookingExitClicks}</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Top Pages -->
    <div style="padding:0 32px 32px;">
      <h2 style="font-size:14px;color:#888;text-transform:uppercase;letter-spacing:0.5px;font-weight:500;margin:0 0 12px;">Top Pages</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fafafa;border-radius:6px;overflow:hidden;">
        <thead>
          <tr>
            <th style="padding:10px 16px;text-align:left;color:#aaa;font-weight:500;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">#</th>
            <th style="padding:10px 16px;text-align:left;color:#aaa;font-weight:500;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Page</th>
            <th style="padding:10px 16px;text-align:right;color:#aaa;font-weight:500;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">Views</th>
          </tr>
        </thead>
        <tbody>
          ${topPagesRows || '<tr><td colspan="3" style="padding:16px;color:#999;text-align:center;">No page data available</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;text-align:center;font-size:12px;color:#bbb;border-top:1px solid #f0f0f0;">
      powerworksgarage.com
    </div>

  </div>
</body>
</html>`;
}

/**
 * Send the daily report email via Brevo REST API.
 */
export async function sendDailyReportEmail(
  report: DailyReport,
  date: Date
): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error('Missing BREVO_API_KEY env var');
  }

  const dateStr = date.toISOString().slice(0, 10);
  const subject = `Powerworks Garage \u2013 Daily Performance Report (${dateStr})`;
  const html = renderReportHtml(report);

  const body = {
    sender: { name: 'Powerworks Reports', email: 'marcus@powerworksgarage.com' },
    to: RECIPIENTS.map((r) => ({ email: r.email, name: r.name })),
    subject,
    htmlContent: html,
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Brevo API error:', res.status, text);
    return { success: false, error: `Brevo API ${res.status}: ${text}` };
  }

  const data = await res.json();
  console.log('Daily report email sent via Brevo API:', data.messageId);
  return { success: true, id: data.messageId };
}
