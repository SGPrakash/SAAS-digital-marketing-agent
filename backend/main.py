from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import uvicorn, os, jwt, datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS configuration
origins = [os.getenv("FRONTEND_URL", "http://localhost:3000")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# In-memory stores (for demo purposes; replace with real database in production)
users_db = {}
contents_db = {}

JWT_SECRET = os.getenv("JWT_SECRET", "your_jwt_secret")

class User(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    token: str

class Content(BaseModel):
    businessName: str
    industry: str
    contentType: str

class ContentResponse(BaseModel):
    content: str

def create_token(user_email: str):
    payload = {
        "sub": user_email,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user_email = payload.get("sub")
        if user_email is None or user_email not in users_db:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user_email
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/auth/register")
def register(user: User):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    users_db[user.email] = user.password  # NOTE: Use proper password hashing in production
    return {"msg": "User registered successfully"}

@app.post("/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_password = users_db.get(form_data.username)
    if not user_password or user_password != form_data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_token(form_data.username)
    return {"token": token}

@app.post("/generate", response_model=ContentResponse)
def generate(content: Content, user_email: str = Depends(get_current_user)):
    # Simulate AI-generated content based on the provided input
    generated_text = f"Generated content for {content.businessName} in {content.industry} as a {content.contentType}."
    contents_db.setdefault(user_email, []).append(generated_text)
    return {"content": generated_text}

@app.get("/content")
def get_contents(user_email: str = Depends(get_current_user)):
    return {"contents": contents_db.get(user_email, [])}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)