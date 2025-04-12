# Backend for SAAS Digital Marketing Agent

This is the FastAPI backend service.

## Setup Instructions

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
2. Run the server:
   ```
   uvicorn main:app --reload
   ```

## Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Login and receive a JWT token.
- **POST /generate**: Generate digital marketing content.
- **GET /content**: Retrieve generated content for the logged-in user.