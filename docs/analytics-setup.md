# Powerbox Garage – Analytics & Daily Report Setup

This document covers the complete analytics pipeline: how GA4 and GTM are configured, how to set up the Google API service account, how to configure GTM tags/triggers in the web UI, and how the automated daily email report works.

---

## 1. Current Analytics Setup

### Google Tag Manager (GTM)

- **Container ID:** `GTM-KH2CHZ9M`
- **Loaded in:** `app/layout.tsx` (root layout) — hardcoded script in `<head>` with `<noscript>` iframe fallback in `<body>`
- **GA4 is configured inside this GTM container** — there is no separate gtag.js script.

### Vercel Analytics

- `@vercel/analytics` is also enabled via `<Analytics />` in the root layout. This is separate from GA4 and runs independently.

### Existing Event Tracking

Before this setup, there was **no custom event tracking** for form submissions or outbound booking clicks. The code changes in this PR add `dataLayer.push()` calls for:

| Event Name            | Trigger                                                   | Component                     |
| --------------------- | --------------------------------------------------------- | ----------------------------- |
| `form_submit`         | Contact/enquiry form submitted successfully               | `components/ContactForm.tsx`  |
| `booking_exit_click`  | User clicks a booking CTA that opens the external booking site | `components/BookingButton.tsx` |

---

## 2. GTM Configuration (Manual Steps in GTM Web UI)

You need to create tags and triggers inside the GTM container `GTM-KH2CHZ9M` so that the dataLayer events flow through to GA4.

### 2.1 Find your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Admin → Data Streams → Web**
3. Note your **Measurement ID** (e.g. `G-XXXXXXXXXX`)

If you don't already have a GA4 Configuration tag in GTM, create one first:

1. In GTM → **Tags → New**
2. Tag type: **Google Tag** (formerly GA4 Configuration)
3. Tag ID: your `G-XXXXXXXXXX`
4. Trigger: **All Pages**
5. Save

### 2.2 Create Trigger: `form_submit`

1. Go to **Triggers → New**
2. Trigger type: **Custom Event**
3. Event name: `form_submit`
4. This trigger fires on: **All Custom Events**
5. Name it: `CE – form_submit`
6. Save

### 2.3 Create Trigger: `booking_exit_click`

1. Go to **Triggers → New**
2. Trigger type: **Custom Event**
3. Event name: `booking_exit_click`
4. This trigger fires on: **All Custom Events**
5. Name it: `CE – booking_exit_click`
6. Save

### 2.4 Create Data Layer Variables (for event parameters)

Create these **User-Defined Variables** so you can pass parameters to GA4:

| Variable Name        | Variable Type               | Data Layer Variable Name |
| -------------------- | --------------------------- | ------------------------ |
| `dlv – form_name`   | Data Layer Variable         | `form_name`              |
| `dlv – page_path`   | Data Layer Variable         | `page_path`              |
| `dlv – link_url`    | Data Layer Variable         | `link_url`               |

For each:
1. Go to **Variables → User-Defined Variables → New**
2. Variable type: **Data Layer Variable**
3. Data Layer Variable Name: (as listed above)
4. Save

### 2.5 Create GA4 Event Tag: `form_submit`

1. Go to **Tags → New**
2. Tag type: **Google Analytics: GA4 Event**
3. **Measurement ID:** your `G-XXXXXXXXXX` (or select your Google Tag)
4. **Event Name:** `form_submit`
5. **Event Parameters:**
   | Parameter Name | Value                  |
   | -------------- | ---------------------- |
   | `form_name`    | `{{dlv – form_name}}`  |
   | `page_path`    | `{{dlv – page_path}}`  |
6. **Trigger:** `CE – form_submit`
7. Save

### 2.6 Create GA4 Event Tag: `booking_exit_click`

1. Go to **Tags → New**
2. Tag type: **Google Analytics: GA4 Event**
3. **Measurement ID:** your `G-XXXXXXXXXX`
4. **Event Name:** `booking_exit_click`
5. **Event Parameters:**
   | Parameter Name | Value                  |
   | -------------- | ---------------------- |
   | `link_url`     | `{{dlv – link_url}}`   |
   | `page_path`    | `{{dlv – page_path}}`  |
6. **Trigger:** `CE – booking_exit_click`
7. Save

### 2.7 Test & Publish

1. Click **Preview** in GTM to open Tag Assistant
2. Go to your live site and:
   - Submit the contact form → verify `form_submit` tag fires
   - Click a "Book Now" button → verify `booking_exit_click` tag fires
3. Check GA4 **Realtime → Events** to confirm events appear
4. Once satisfied, go back to GTM and click **Submit** → **Publish**

---

## 3. Google Cloud Service Account Setup

The daily report API route queries GA4 and Search Console server-side using a service account.

### 3.1 Create the Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select or create a project (e.g. "Powerworks Analytics")
3. Navigate to **IAM & Admin → Service Accounts**
4. Click **Create Service Account**
   - Name: `powerworks-analytics`
   - Description: "Read-only access to GA4 and Search Console for daily reports"
5. Click **Create and Continue**
6. Skip the optional role assignment (access is granted at the property level)
7. Click **Done**
8. Click the new service account → **Keys → Add Key → Create New Key → JSON**
9. Download the JSON file. You'll need `client_email` and `private_key` from it.

### 3.2 Enable APIs

In the same Google Cloud project, enable these APIs:

1. Go to **APIs & Services → Library**
2. Search and enable: **Google Analytics Data API**
3. Search and enable: **Google Search Console API** (also called "Search Console API")

### 3.3 Grant GA4 Access

1. Go to [Google Analytics](https://analytics.google.com/)
2. Navigate to **Admin → Property → Property Access Management**
3. Click **+ (Add users)**
4. Enter the service account email (e.g. `powerworks-analytics@your-project.iam.gserviceaccount.com`)
5. Role: **Viewer** (read-only is sufficient)
6. Save

### 3.4 Find your GA4 Property ID

1. In GA4, go to **Admin → Property Settings**
2. Note the **Property ID** (a number like `123456789`)

### 3.5 Grant Search Console Access

1. Go to [Google Search Console](https://search.google.com/search-console/)
2. Select the property `powerworksgarage.com`
3. Go to **Settings → Users and permissions**
4. Click **Add user**
5. Enter the service account email
6. Permission: **Restricted** (read-only)
7. Save

### 3.6 Set Environment Variables in Vercel

Go to your Vercel project → **Settings → Environment Variables** and add:

| Variable                       | Value                                                                 |
| ------------------------------ | --------------------------------------------------------------------- |
| `GA4_PROPERTY_ID`             | Your GA4 property ID number (e.g. `123456789`)                        |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL`| The `client_email` from the JSON key file                             |
| `GOOGLE_SERVICE_ACCOUNT_KEY`  | The `private_key` from the JSON key file (including `-----BEGIN...`)  |
| `GSC_SITE_URL`                | `sc-domain:powerworksgarage.com` (or your verified property URL)      |
| `CRON_SECRET`                 | A random string to protect the cron endpoint (optional but recommended) |
| `REPORT_FROM_EMAIL`           | `Powerworks Reports <reports@powerworksgarage.com>` (optional — default is used if omitted) |

**Important:** The `GOOGLE_SERVICE_ACCOUNT_KEY` is a multi-line PEM key. When pasting into Vercel, paste the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`. The code handles `\n` conversion automatically.

For **local development**, add the same variables to `.env.local`.

---

## 4. Daily Report Architecture

### Files

| File                                   | Purpose                                        |
| -------------------------------------- | ---------------------------------------------- |
| `lib/googleAnalytics.ts`              | GA4 Data API queries (users, pages, events)    |
| `lib/googleSearchConsole.ts`          | GSC API query (impressions, clicks)            |
| `lib/dailyReport.ts`                  | Aggregates all data into a single report object |
| `lib/sendDailyReportEmail.ts`         | Renders HTML email and sends via Resend        |
| `app/api/daily-report/route.ts`       | Cron endpoint — generates report + sends email |
| `app/api/daily-report-test/route.ts`  | Test endpoint — returns JSON, no email sent    |

### Data Flow

```
Vercel Cron (06:00 Dubai / 02:00 UTC daily)
  → GET /api/daily-report
    → generateDailyAnalyticsReport(yesterday)
      → fetchGscMetrics(date)          // GSC API
      → fetchDailyUsers(date)          // GA4 Data API
      → fetchTopPages(date, 10)        // GA4 Data API
      → fetchEventCount(date, 'form_submit')        // GA4 Data API
      → fetchEventCount(date, 'booking_exit_click') // GA4 Data API
    → sendDailyReportEmail(report, date)
      → Resend API → marcus@..., glenn@...
```

### Email Content

The daily email includes:

1. **Google Search** — impressions and clicks from GSC
2. **Website Traffic** — total active users from GA4
3. **Top 10 Pages** — page path + view count table
4. **Conversions** — form_submit count and booking_exit_click count

### Recipients

Emails are sent to (configured in `lib/sendDailyReportEmail.ts`):

- `marcus@powerworksgarage.com`
- `glenn@powerworksgarage.com`

---

## 5. Vercel Cron Configuration

The cron is defined in `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/daily-report",
      "schedule": "0 2 * * *"
    }
  ]
}
```

- **Schedule:** `0 2 * * *` = daily at 02:00 UTC = **06:00 Dubai time (UTC+4)**
- **Path:** `/api/daily-report`

### Cron Security

If you set the `CRON_SECRET` environment variable, Vercel automatically sends it as `Authorization: Bearer <CRON_SECRET>` with cron requests. The route checks this header and rejects unauthorized requests.

### Vercel Pro Plan Note

Vercel Cron Jobs require the **Pro plan** or higher. On the Hobby plan, cron jobs run once per day maximum and may have limitations. Check your Vercel plan to ensure cron support.

---

## 6. Testing

### Local Test

```bash
# Set env vars in .env.local, then:
npm run dev

# Test report generation (no email sent):
curl http://localhost:3000/api/daily-report-test

# Test with a specific date:
curl http://localhost:3000/api/daily-report-test?date=2025-06-15
```

### Deployed Test

```bash
# Returns JSON report without sending email:
curl https://powerworksgarage.com/api/daily-report-test

# Trigger the full report + email (if no CRON_SECRET set):
curl https://powerworksgarage.com/api/daily-report

# If CRON_SECRET is set:
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://powerworksgarage.com/api/daily-report
```

### Verifying GA4 Events

After deploying and configuring GTM:

1. Open the site in Chrome
2. Open GTM **Preview** mode
3. Submit the contact form → look for `form_submit` in the Tag Assistant
4. Click a "Book Now" button → look for `booking_exit_click`
5. In GA4 → **Realtime → Events** — confirm both events appear
6. Wait 24 hours, then check `/api/daily-report-test` to see event counts

---

## 7. Troubleshooting

| Problem                              | Solution                                                              |
| ------------------------------------ | --------------------------------------------------------------------- |
| `Missing GA4_PROPERTY_ID`            | Add the env var in Vercel and redeploy                                |
| `Missing GOOGLE_SERVICE_ACCOUNT_*`   | Add both email and key env vars                                       |
| GSC returns 0 impressions            | Verify the service account has access to the GSC property             |
| GA4 events return 0                  | Events may take 24-48 hours to appear in the Data API                 |
| Email not received                   | Check `RESEND_API_KEY` is set; verify the FROM domain in Resend       |
| Cron not running                     | Check Vercel dashboard → Cron Jobs; ensure Pro plan                   |
| Private key format error             | Ensure `\n` in the key are literal newlines or escaped `\\n`          |
