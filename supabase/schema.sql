-- Create users table
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    email varchar(255) NOT NULL UNIQUE,
    hashed_password varchar(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);

-- Create contents table
CREATE TABLE contents (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid REFERENCES users(id),
    content_type varchar(50) NOT NULL,
    input_summary text,
    generated_text text NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);