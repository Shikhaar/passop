# PassOP - Your Digital Vault

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)

PassOP is a highly aesthetic, secure, and interactive Password Manager built with React, Vite, Tailwind CSS, and Supabase. It features a premium custom-built UI with glassmorphism elements, dynamic particle backgrounds, and smooth spring animations.

## ✨ Features

- **Secure Authentication**: Email and password-based login powered by Supabase Auth.
- **Password Vault**: Store, copy, search, categorize, and delete your passwords securely across different sites.
- **Aesthetic UI**: Stunning, dynamic, and fluid user interface.
- **Interactive Background**: Beautiful floating gradient orbs and a custom mouse-tracking glow follower (using `framer-motion` springs).
- **Responsive Design**: Works perfectly across mobile, tablet, and desktop devices.
- **Real-time Toasts**: Instant success/error feedback loops via `react-hot-toast`.

## 🚀 How to Run Locally

Follow these steps if you want to fork, clone, and run PassOP on your local machine.

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A free [Supabase](https://supabase.com/) project

### 1. Clone the repository
```bash
git clone https://github.com/Shikhaar/passop.git
cd passop
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Supabase
1. Create a new project in [Supabase](https://supabase.com/).
2. In the Supabase SQL editor, create the `passwords` table:
   ```sql
   create table passwords (
     id uuid default uuid_generate_v4() primary key,
     user_id uuid references auth.users not null,
     site text not null,
     username text not null,
     password text not null,
     category text default 'Other',
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```
3. Enable Row Level Security (RLS) policies so users can only access their own data.

### 4. Configure Environment Variables
Rename the `.env.example` file to `.env.local` (or create a new `.env.local` file) in the root of the project and add your Supabase connection details:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Start the Development Server
```bash
npm run dev
```

The app should now be running locally at `http://localhost:5173/`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check [issues page](https://github.com/Shikhaar/passop/issues).

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
