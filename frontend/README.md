# SAAS Digital Marketing Agent - Frontend

This is the Next.js frontend application for the SAAS Digital Marketing Agent MVP.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run dev
   ```
3. Ensure your <code>.env</code> file is configured based on <code>.env.example</code> with the following variable:
   - <code>NEXT_PUBLIC_API_BASE_URL</code>: URL for the backend API (e.g., http://localhost:8000)

## Features

- **User Login/Signup:** Authentication via a dedicated page.
- **Dashboard:**
  - Input form to provide business name, niche, and goals.
  - Option to generate AI marketing content by selecting between a blog post or a social post.
  - Display generated content with options for editing or downloading.
- **Styling:** Uses Tailwind CSS for modern and responsive design.
- **Notifications:** Uses react-hot-toast for user feedback.
- **SEO:** Pre-configured meta tags for improved search engine indexing.

## Deployment

- **Frontend:** Ready for deployment on Vercel.
- **Environment:** Ensure all environment variables are set properly in your deployment environment.

## Notes

- This project is part of an MVP for automating digital marketing tasks using AI.
- For production, update endpoints and security configurations as necessary.