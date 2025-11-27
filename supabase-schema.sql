-- Coders Constellation Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    github_repo VARCHAR(500),
    owner_name VARCHAR(255) NOT NULL,
    owner_avatar VARCHAR(500) NOT NULL,
    owner_github_username VARCHAR(255) NOT NULL,
    owner_country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    github_username VARCHAR(255) UNIQUE NOT NULL,
    avatar VARCHAR(500) NOT NULL,
    country VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    skills TEXT[] NOT NULL DEFAULT '{}',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    projects_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_projects_owner_country ON projects(owner_country);
CREATE INDEX idx_projects_tech_stack ON projects USING GIN(tech_stack);

CREATE INDEX idx_users_country ON users(country);
CREATE INDEX idx_users_skills ON users USING GIN(skills);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_github_username ON users(github_username);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access on users" ON users
    FOR SELECT USING (true);

-- Create policies for authenticated users to insert/update their own data
CREATE POLICY "Allow authenticated users to insert projects" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own projects" ON projects
    FOR UPDATE USING (auth.uid()::text = owner_github_username);

CREATE POLICY "Allow authenticated users to insert users" ON users
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own profile" ON users
    FOR UPDATE USING (auth.uid()::text = github_username);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for projects table
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (your existing mock data)
-- This will populate your database with the current mock projects and users

-- Sample Projects
INSERT INTO projects (title, description, tech_stack, github_repo, owner_name, owner_avatar, owner_github_username, owner_country, created_at) VALUES
('AI-Powered Agriculture Platform', 'Building a mobile app that uses machine learning to help African farmers detect crop diseases early and get real-time farming advice.', ARRAY['React Native', 'TensorFlow', 'Python', 'Firebase'], 'https://github.com/tensorflow/tensorflow', 'Amara Okafor', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara', 'amaraokafor', 'Nigeria', '2024-11-20T10:30:00Z'),
('Pan-African E-Learning Platform', 'Creating an accessible online learning platform with courses in multiple African languages. Looking for frontend and backend developers.', ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'], 'https://github.com/vercel/next.js', 'Kwame Mensah', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame', 'kwamemensah', 'Ghana', '2024-11-19T14:20:00Z'),
('Mobile Money Integration API', 'Open-source API to simplify mobile money integrations across Africa. Need developers familiar with payment systems.', ARRAY['Node.js', 'Express', 'MongoDB', 'Docker'], 'https://github.com/nodejs/node', 'Fatima Hassan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', 'fatimahassan', 'Kenya', '2024-11-18T09:15:00Z'),
('Community Health Tracker', 'Web app for tracking community health metrics and connecting patients with nearby clinics. Healthcare tech for Africa.', ARRAY['Vue.js', 'Django', 'PostgreSQL', 'Mapbox'], 'https://github.com/vuejs/vue', 'Thabo Ndlovu', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thabo', 'thabon', 'South Africa', '2024-11-17T16:45:00Z'),
('Decentralized Identity System', 'Blockchain-based digital identity solution for Africans without traditional IDs. Looking for blockchain and smart contract developers.', ARRAY['Solidity', 'Ethereum', 'React', 'Web3.js'], 'https://github.com/ethereum/go-ethereum', 'Zainab Diallo', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab', 'zainabdiallo', 'Senegal', '2024-11-16T11:00:00Z');

-- Sample Users
INSERT INTO users (name, email, github_username, avatar, country, bio, skills, joined_at, projects_count, is_active) VALUES
('Amara Okafor', 'amara.okafor@gmail.com', 'amaraokafor', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amara', 'Nigeria', 'Full-stack developer passionate about AI and agriculture tech. Building solutions for African farmers.', ARRAY['React Native', 'TensorFlow', 'Python', 'Firebase', 'Machine Learning'], '2024-01-15T10:30:00Z', 3, true),
('Kwame Mensah', 'kwame.mensah@outlook.com', 'kwamemensah', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame', 'Ghana', 'Frontend developer and UI/UX designer. Love creating beautiful, accessible web experiences.', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Figma', 'React'], '2024-02-20T14:20:00Z', 2, true),
('Fatima Hassan', 'fatima.hassan@yahoo.com', 'fatimahassan', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima', 'Kenya', 'Backend engineer specializing in payment systems and fintech solutions for Africa.', ARRAY['Node.js', 'Express', 'MongoDB', 'Docker', 'AWS'], '2024-01-08T09:15:00Z', 4, true),
('Thabo Ndlovu', 'thabo.ndlovu@gmail.com', 'thabon', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thabo', 'South Africa', 'Healthcare tech developer. Building digital solutions to improve healthcare access in rural areas.', ARRAY['Vue.js', 'Django', 'PostgreSQL', 'Mapbox', 'Python'], '2024-03-10T16:45:00Z', 2, false),
('Zainab Diallo', 'zainab.diallo@protonmail.com', 'zainabdiallo', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab', 'Senegal', 'Blockchain developer working on decentralized identity solutions for Africa.', ARRAY['Solidity', 'Ethereum', 'React', 'Web3.js', 'Smart Contracts'], '2024-02-05T11:00:00Z', 1, true);