# SAAS Digital Marketing Agent

A full-stack SaaS application to help clients automate their digital marketing using AI-generated content.

## Project Structure

- **frontend/**: React / Next.js application with Tailwind CSS.
- **backend/**: FastAPI backend with endpoints for authentication, content generation, and user content retrieval.
- **supabase/**: SQL schema for Supabase database setup.

## Setup Instructions

### Environment
1. Duplicate `.env.example` to `.env` in the root directory and add your credentials.
2. Setup your Supabase database using the schema in `supabase/schema.sql`.

### Frontend
1. Navigate to the `frontend/` folder and install dependencies:
   ```
   npm install
   ```
2. Run the development server:
   ```
   npm run dev
   ```

### Backend
1. Navigate to the `backend/` folder and install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run the server:
   ```
   uvicorn main:app --reload