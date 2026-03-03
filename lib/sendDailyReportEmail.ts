import * as tls from 'tls';
import type { DailyReport } from './dailyReport';

const RECIPIENTS = [
  { email: 'marcus@powerworksgarage.com', name: 'Marcus' },
  { email: 'glenn@powerworksgarage.com', name: 'Glenn' },
];

function renderReportHtml(report: DailyReport): string {
  const topPagesRows = report.topPages
    .map(
      (p, i) =>
        `<tr style="border-bottom:1px solid #eee;">
          <td style="padding:8px 12px;color:#666;">${i + 1}</td>
          <td style="padding:8px 12px;font-family:monospace;font-size:13px;">${p.path}</td>
          <td style="padding:8px 12px;text-align:right;font-weight:600;">${p.pageViews.toLocaleString()}</td>
        </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;color:#333;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;">

    <!-- Header -->
    <div style="background:#1a1a2e;padding:28px 24px;text-align:center;">
      <img src="https://powerworksgarage.com/full_logo.png" alt="Powerworks Garage" width="160" style="max-width:160px;" />
      <h1 style="color:#ffffff;font-size:20px;margin:16px 0 4px;font-weight:700;">Daily Performance Report</h1>
      <p style="color:#aaa;font-size:14px;margin:0;">${report.date}</p>
    </div>

    <!-- Search (GSC) -->
    <div style="padding:24px;">
      <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e63946;padding-bottom:8px;margin-top:0;">
        Google Search
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;">
            <span style="font-size:28px;font-weight:700;color:#1a1a2e;">${report.gsc.impressions.toLocaleString()}</span>
            <br/><span style="font-size:13px;color:#888;">Search Impressions</span>
          </td>
          <td style="padding:12px 0;text-align:right;">
            <span style="font-size:28px;font-weight:700;color:#1a1a2e;">${report.gsc.clicks.toLocaleString()}</span>
            <br/><span style="font-size:13px;color:#888;">Search Clicks</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Traffic (GA4) -->
    <div style="padding:0 24px 24px;">
      <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e63946;padding-bottom:8px;margin-top:0;">
        Website Traffic (GA4)
      </h2>
      <p style="margin:12px 0;">
        <span style="font-size:28px;font-weight:700;color:#1a1a2e;">${report.totalUsers.toLocaleString()}</span>
        <br/><span style="font-size:13px;color:#888;">Active Users</span>
      </p>
    </div>

    <!-- Top 10 Pages -->
    <div style="padding:0 24px 24px;">
      <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e63946;padding-bottom:8px;margin-top:0;">
        Top 10 Pages by Views
      </h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f9f9f9;">
            <th style="padding:8px 12px;text-align:left;color:#888;font-weight:600;">#</th>
            <th style="padding:8px 12px;text-align:left;color:#888;font-weight:600;">Page</th>
            <th style="padding:8px 12px;text-align:right;color:#888;font-weight:600;">Views</th>
          </tr>
        </thead>
        <tbody>
          ${topPagesRows || '<tr><td colspan="3" style="padding:12px;color:#888;">No page data available</td></tr>'}
        </tbody>
      </table>
    </div>

    <!-- Conversions -->
    <div style="padding:0 24px 32px;">
      <h2 style="font-size:16px;color:#1a1a2e;border-bottom:2px solid #e63946;padding-bottom:8px;margin-top:0;">
        Conversions
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;">
            <span style="font-size:28px;font-weight:700;color:#27ae60;">${report.formSubmits}</span>
            <br/><span style="font-size:13px;color:#888;">Form Submissions</span>
          </td>
          <td style="padding:12px 0;text-align:right;">
            <span style="font-size:28px;font-weight:700;color:#2980b9;">${report.bookingExitClicks}</span>
            <br/><span style="font-size:13px;color:#888;">Booking Exit Clicks</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background:#f9f9f9;padding:16px 24px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;">
      Automated daily report from powerworksgarage.com
    </div>

  </div>
</body>
</html>`;
}

/**
 * Send a command to the SMTP server and wait for a response.
 */
function smtpCommand(
  socket: tls.TLSSocket,
  command: string | null
): Promise<string> {
  return new Promise((resolve, reject) => {
    const onData = (data: Buffer) => {
      socket.removeListener('data', onData);
      resolve(data.toString());
    };
    socket.on('data', onData);
    socket.on('error', reject);
    if (command) socket.write(command + '\r\n');
  });
}

/**
 * Send the daily report email via Brevo SMTP (bypasses API IP restrictions).
 */
export async function sendDailyReportEmail(
  report: DailyReport,
  date: Date
): Promise<{ success: boolean; id?: string; error?: string }> {
  const smtpLogin = process.env.BREVO_SMTP_LOGIN;
  const smtpPassword = process.env.BREVO_SMTP_PASSWORD;
  if (!smtpLogin || !smtpPassword) {
    throw new Error('Missing BREVO_SMTP_LOGIN or BREVO_SMTP_PASSWORD env vars');
  }

  const dateStr = date.toISOString().slice(0, 10);
  const from = 'noreply@powerworksgaragedubai.com';
  const fromName = 'Powerworks Reports';
  const subject = `Powerworks Garage \u2013 Daily Performance Report (${dateStr})`;
  const html = renderReportHtml(report);

  const toAddresses = RECIPIENTS.map((r) => r.email);
  const toHeader = RECIPIENTS.map((r) => `"${r.name}" <${r.email}>`).join(', ');

  // Build MIME message
  const boundary = `----=_Part_${Date.now()}`;
  const message = [
    `From: "${fromName}" <${from}>`,
    `To: ${toHeader}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    html,
    ``,
    `--${boundary}--`,
  ].join('\r\n');

  return new Promise((resolve) => {
    const socket = tls.connect(465, 'smtp-relay.brevo.com', {}, async () => {
      try {
        // Read greeting
        await smtpCommand(socket, null);
        // EHLO
        await smtpCommand(socket, 'EHLO powerworksgarage.com');
        // AUTH LOGIN
        await smtpCommand(socket, 'AUTH LOGIN');
        await smtpCommand(socket, Buffer.from(smtpLogin).toString('base64'));
        const authReply = await smtpCommand(
          socket,
          Buffer.from(smtpPassword).toString('base64')
        );
        if (!authReply.startsWith('235')) {
          socket.end();
          resolve({ success: false, error: `SMTP auth failed: ${authReply.trim()}` });
          return;
        }
        // MAIL FROM
        await smtpCommand(socket, `MAIL FROM:<${from}>`);
        // RCPT TO for each recipient
        for (const addr of toAddresses) {
          await smtpCommand(socket, `RCPT TO:<${addr}>`);
        }
        // DATA
        await smtpCommand(socket, 'DATA');
        const sendReply = await smtpCommand(socket, message + '\r\n.');
        // QUIT
        socket.write('QUIT\r\n');
        socket.end();

        const match = sendReply.match(/queued as (.+)/i);
        const messageId = match?.[1]?.trim();
        console.log('Daily report email sent via SMTP:', messageId ?? sendReply.trim());
        resolve({ success: true, id: messageId });
      } catch (err) {
        socket.end();
        const errMsg = err instanceof Error ? err.message : 'SMTP error';
        console.error('SMTP send error:', errMsg);
        resolve({ success: false, error: errMsg });
      }
    });

    socket.on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
  });
}
