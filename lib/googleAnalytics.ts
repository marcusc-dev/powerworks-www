import { BetaAnalyticsDataClient } from '@google-analytics/data';

function getAnalyticsClient(): BetaAnalyticsDataClient {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !rawKey) {
    throw new Error(
      'Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars'
    );
  }

  // Handle multi-line private key (Vercel stores \n literally)
  const privateKey = rawKey.replace(/\\n/g, '\n');

  return new BetaAnalyticsDataClient({
    credentials: { client_email: email, private_key: privateKey },
  });
}

const propertyId = () => {
  const id = process.env.GA4_PROPERTY_ID;
  if (!id) throw new Error('Missing GA4_PROPERTY_ID env var');
  return id;
};

/**
 * Fetch total active users for a single day.
 */
export async function fetchDailyUsers(date: string): Promise<number> {
  const client = getAnalyticsClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId()}`,
    dateRanges: [{ startDate: date, endDate: date }],
    metrics: [{ name: 'activeUsers' }],
  });

  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

/**
 * Fetch top pages by screenPageViews, limited to `limit` rows.
 */
export async function fetchTopPages(
  date: string,
  limit = 10
): Promise<{ path: string; pageViews: number }[]> {
  const client = getAnalyticsClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId()}`,
    dateRanges: [{ startDate: date, endDate: date }],
    dimensions: [{ name: 'pagePath' }],
    metrics: [{ name: 'screenPageViews' }],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit,
  });

  return (response.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? '(unknown)',
    pageViews: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

/**
 * Fetch the event count for a specific GA4 event name on a given day.
 */
export async function fetchEventCount(
  date: string,
  eventName: string
): Promise<number> {
  const client = getAnalyticsClient();
  const [response] = await client.runReport({
    property: `properties/${propertyId()}`,
    dateRanges: [{ startDate: date, endDate: date }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: { matchType: 'EXACT', value: eventName },
      },
    },
  });

  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}
