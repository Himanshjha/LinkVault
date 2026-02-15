# 🔗 LinkVault - Smart Bookmark Manager

LinkVault is a modern bookmark manager built using **Next.js + Firebase**.  
It allows users to securely save, search, sort, and manage their bookmarks with real-time syncing.

🚀 **Live Demo:** https://link-vault-omega-eight.vercel.app/  
📦 **GitHub Repo:** https://github.com/Himanshjha/LinkVault

---

## ✨ Features
- Google Authentication (Firebase Auth)
- Add bookmarks (Title + URL)
- Real-time sync (Firebase Realtime Database)
- Search bookmarks by title or URL
- Sort bookmarks (Latest / Oldest / A-Z)
- Delete bookmarks
- Responsive modern UI (Glassmorphism + Tailwind)

---

## 🛠 Tech Stack
- Next.js (App Router)
- Firebase Authentication
- Firebase Realtime Database
- Tailwind CSS
- Vercel (Deployment)

---

## ⚙️ Setup Instructions

### 1) Clone Repository
```bash
git clone https://github.com/Himanshjha/LinkVault.git
cd LinkVault
2) Install Dependencies
npm install
3) Add Environment Variables
Create a .env.local file in the root directory:

NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_DATABASE_URL=YOUR_FIREBASE_DATABASE_URL
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
4) Run the Project
npm run dev
Project will run at:
http://localhost:3000

🔒 Firebase Database Rules (Realtime Database)
{
  "rules": {
    "bookmarks": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
🚧 Challenges Faced & How I Solved Them
✅ 1. Supabase Session Issues in Next.js App Router
Initially, I planned to use Supabase for authentication and database.
However, I faced session persistence issues in Next.js App Router where authenticated users were sometimes redirected back to login unexpectedly, and session restoration was inconsistent.

Solution:
To ensure stability within the challenge timeline, I switched to Firebase Authentication, which provides predictable client-side session handling.

✅ 2. Firestore Billing Restriction
While setting up Firestore, the project required billing to be enabled.

Solution:
I used Firebase Realtime Database instead, which works without billing for this use-case and still provides real-time syncing.

✅ 3. Real-time Sync Implementation
The requirement was to ensure bookmarks update instantly without refresh.

Solution:
Implemented Firebase Realtime listeners using onValue() so bookmarks sync automatically across tabs/devices.

✅ 4. User Data Privacy
Bookmarks must remain private per user.

Solution:
Stored bookmarks in a user-based structure:

/bookmarks/{uid}/{bookmarkId}
and applied secure database rules to restrict access.

🌍 Deployment
The project is deployed on Vercel.

Live URL: https://link-vault-omega-eight.vercel.app/

Firebase Authentication authorized domains were configured for production deployment.

👨‍💻 Author
Himanshu Jha