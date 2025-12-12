# MyBloodDonorPH

A blood donor registry web application connecting blood donors with those in need across the Philippines.

## Features

- **Blood Donor Registry**: Register as a blood donor with your blood type and location
- **Donor Search**: Search for donors by city and blood type
- **Privacy-First**: Consent-based information sharing with audit logging
- **Rate Limiting**: 24-hour cooldown per IP for donor info requests
- **Admin Dashboard**: Manage donors, view requests, and analytics
- **API Integration**: Syncs with MyPatientProfilePH for patient data

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: TailwindCSS
- **Authentication**: JWT with bcrypt password hashing
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Prisma Accelerate)

### Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="your_postgres_connection_string"
JWT_SECRET="your-secret-key"
MYPATIENTPH_API_URL="https://mypatientprofileph.vercel.app/api"
MYPATIENTPH_API_KEY="your_api_key"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Installation

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### Deployment

This project is configured for Vercel deployment:

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Admin Access

Default admin credentials:
- Email: `admin@admin.com`
- Password: `admin123`

**Important**: Change these credentials in production!

## API Endpoints

### Public
- `GET /api/donors` - List available donors (filtered by city/blood type)
- `POST /api/donors/request` - Request donor contact info

### Authentication
- `POST /api/auth/register` - Register new donor
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - Logout
- `POST /api/admin/login` - Admin login

### Admin
- `GET /api/admin/stats` - Dashboard statistics

## Legal Compliance

This application follows:
- Philippine Data Privacy Act of 2012 (RA 10173)
- HIPAA-inspired health information protection principles
- Consent-based data sharing with audit trails

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (home, donors, about, etc.)
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
├── components/
│   ├── layout/            # Header, Footer
│   └── ui/                # Reusable UI components
└── lib/
    ├── auth.ts            # Authentication utilities
    ├── prisma.ts          # Database client
    ├── patient-api.ts     # MyPatientProfilePH API client
    ├── rate-limit.ts      # Rate limiting logic
    └── utils.ts           # Utility functions
```

## License

© 2024 MyBloodDonorPH. All rights reserved.
