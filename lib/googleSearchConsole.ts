import { google } from 'googleapis';

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !rawKey) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars'
    );
  }

  const privateKey = rawKey.replace(/\\n/g, '\n');

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });
}

const siteUrl = () => {
  // GSC property URL — typically "sc-domain:powerworksgarage.com" or "https://powerworksgarage.com/"
  const url = process.env.GSC_SITE_URL ?? 'sc-domain:powerworksgarage.com';
  return url;
};

export interface GscMetrics {
  impressions: number;
  clicks: number;
}

/**
 * Fetch total impressions and clicks from Google Search Console for a single day.
 */
export async function fetchGscMetrics(date: string): Promise<GscMetrics> {
  const auth = getAuth();
  const searchconsole = google.searchconsole({ version: 'v1', auth });

  const response = await searchconsole.searchanalytics.query({
    siteUrl: siteUrl(),
    requestBody: {
      startDate: date,
      endDate: date,
      dimensions: [], // no dimensions = aggregate totals
    },
  });

  const row = response.data.rows?.[0];

  return {
    impressions: row?.impressions ?? 0,
    clicks: row?.clicks ?? 0,
  };
}
