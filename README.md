# Beginners Luck Tackle and Supply Kids Fishing Derby Registration

This is a simple online registration platform built with Next.js, Tailwind CSS, and Supabase.

It includes:

- A public registration page with a shareable URL
- A mobile-friendly branded design
- A thank-you confirmation page
- Supabase-backed registration storage
- A password-protected admin dashboard
- Search and CSV export for registrations
- Setup steps for local use and deployment on Vercel or Netlify

## 1. What this project does

Families can open the public page, fill out the derby registration form, and submit it online. Each registration is saved into a Supabase table. Administrators can sign in to `/admin`, search registrations, and export the visible results as a CSV file.

## 2. Tech stack

- Next.js App Router
- Tailwind CSS
- Supabase
- React
- TypeScript

## 3. Project structure

```text
app/
  admin/page.tsx                  Admin dashboard
  api/admin/login/route.ts        Admin login route
  api/admin/logout/route.ts       Admin logout route
  api/registrations/route.ts      Public registration submit route
  api/registrations/export/route.ts CSV export route
  thank-you/page.tsx              Confirmation page
  page.tsx                        Public registration page
components/
  registration-form.tsx
lib/
  auth.ts
  csv.ts
  registrations.ts
  supabase.ts
  validation.ts
supabase/
  schema.sql
```

## 4. Step-by-step local setup

### Step 1: Create a Supabase project

1. Go to [Supabase](https://supabase.com/).
2. Create a new project.
3. Wait for the database to finish provisioning.

### Step 2: Create the registrations table

1. Open your Supabase project dashboard.
2. Go to the SQL Editor.
3. Open [`supabase/schema.sql`](C:\Users\B&L Tack Supply\Documents\Codex\2026-06-12-build-me-a-simple-online-registration\supabase\schema.sql).
4. Copy the SQL into the Supabase SQL Editor.
5. Run it.

### Step 3: Add environment variables

1. Copy `.env.example` to `.env.local`.
2. Fill in these values:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_ACCESS_KEY=choose-a-strong-admin-password
```

Where to find them:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase API settings
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase API settings
- `ADMIN_ACCESS_KEY`: any secure password you want for the admin page

### Step 4: Install dependencies

From the project folder:

```bash
npm install
```

### Step 5: Start the app locally

```bash
npm run dev
```

Then open:

- Public registration page: `http://localhost:3000`
- Admin page: `http://localhost:3000/admin`

## 5. How the admin page works

The admin dashboard is protected with a simple password gate using `ADMIN_ACCESS_KEY`.

1. Open `/admin`
2. Enter the admin access code
3. Search registrations if needed
4. Click `Export CSV` to download the current filtered results

## 6. Deployment on Vercel

### Step 1: Push this project to GitHub

Create a new GitHub repository and push the code.

### Step 2: Import into Vercel

1. Go to [Vercel](https://vercel.com/).
2. Click `Add New Project`.
3. Import the GitHub repository.

### Step 3: Add environment variables in Vercel

Add all four environment variables from `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ACCESS_KEY`

### Step 4: Deploy

1. Click `Deploy`.
2. After deployment, Vercel will give you a shareable public URL.
3. Share the homepage URL with families for registration.
4. Keep `/admin` private for staff use only.

## 7. Deployment on Netlify

### Step 1: Push this project to GitHub

Create a new GitHub repository and push the code.

### Step 2: Import into Netlify

1. Go to [Netlify](https://www.netlify.com/).
2. Click `Add new site`.
3. Choose `Import an existing project`.
4. Connect your GitHub repository.

### Step 3: Configure build settings

Netlify's current Next.js support is zero-configuration for modern Next.js apps, so you can usually leave the detected settings alone after connecting the repository. If Netlify asks you to confirm commands, use:

- Build command: `npm run build`
- Start command for local verification only: `npm run start`

### Step 4: Add environment variables

In Netlify site settings, add:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ACCESS_KEY`

### Step 5: Deploy

1. Trigger the first deployment.
2. After the site is live, use the homepage as the shareable registration link.
3. Use `/admin` privately for viewing registrations.

## 8. Shareable links after deployment

- Public registration page: `https://your-site-url.com/`
- Admin page: `https://your-site-url.com/admin`

## 9. Notes about security

- Public visitors do not write directly to Supabase from the browser.
- Form submissions go through a server route first.
- The admin page uses an HTTP-only cookie after successful login.
- The Supabase service role key must only be stored in server-side environment variables.

## 10. Recommended next improvements

- Add email confirmations
- Limit duplicate registrations
- Add event capacity tracking
- Add printable check-in sheets
- Add stronger admin authentication with Supabase Auth
