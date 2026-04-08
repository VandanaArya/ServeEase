# ServeEase Project Setup Guide

## Prerequisites
- Node.js LTS (18 or 20) - Download from [nodejs.org](https://nodejs.org/)
- Git (optional, for cloning) - Download from [git-scm.com](https://git-scm.com/)

## Project Setup

### 1. Download the Project
If using Git:
```bash
git clone <your-repo-url>
cd MinorProject
```

Or copy the project folder to your machine.

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Run the Application

Open two terminals:

#### Terminal 1: Backend
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Terminal 2: Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### 4. Open in Browser
Navigate to: http://localhost:5173

## Important Notes

- **Database**: If MongoDB is not installed locally, the backend will use an in-memory database fallback. Data will reset on restart.
- **Persistent Data (Optional)**: 
  - Install/start MongoDB locally, or use MongoDB Atlas.
  - Create `backend/.env` file:
    ```
    MONGODB_URI=mongodb://localhost:27017/serveease
    JWT_SECRET=your_secret_key
    ```
  - Restart backend: `npm run dev`
- **Port Conflicts**:
  - If 5173 is busy, frontend will auto-use next port (e.g., 5174)
  - If 5000 is busy, set `PORT=5001` in `backend/.env`

## Troubleshooting
- Ensure Node.js and npm are installed: `node -v` and `npm -v`
- If npm commands fail, try running PowerShell as Administrator or set execution policy: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`</content>
<parameter name="filePath">c:\Users\intel\Downloads\MinorProject (1)\MinorProject\MinorProject\README.md
