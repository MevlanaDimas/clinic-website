# Clinic Website

## Project Description

This project is a modern clinic website built with **Next.js**, designed to bridge the gap between patients and healthcare providers. It serves as a central hub for clinic updates, offering patients real-time access to news articles categorized by medical relevance and evidence levels, as well as exclusive promotions.

Key functionalities include a dynamic doctor scheduling system, enabling patients to view availability and book appointments seamlessly via WhatsApp integration. The platform also facilitates direct communication through email and messaging services.

On the backend, the system is powered by a robust architecture using **Neon DB (PostgreSQL)** and **Prisma** for efficient data handling. It incorporates **Clerk** for secure staff authentication and management, **Google Cloud Storage** for media assets, and **Resend** for transactional emails. Additionally, the database schema supports queue management features, ensuring a scalable foundation for future clinic operations.

## Features

- **News & Promotions**: Patients can view the latest news and promotions released by the clinic.
- **Doctor Schedules**: View doctor practice schedules to plan visits.
- **Appointments**: Make appointments directly via WhatsApp integration.
- **Contact**: Send messages to clinic staff via email (powered by Resend) and WhatsApp.

## Tech Stack

- **Framework**: Next.js
- **Database**: Neon DB (PostgreSQL)
- **ORM**: Prisma
- **Authentication & User Management**: Clerk (Used for fetching doctor avatar data)
- **Storage**: Google Cloud Storage (For news and promotion images)
- **Email**: Resend

## Database Schema

The project uses a relational database defined in `ERD.svg` with the following models:

### Core Models

- **News**: Stores news articles with title, content, summary, and metadata.
  - Relations: Belongs to a `Category`, has an author (`Staff`), optional reviewer (`Staff`), and multiple `NewsImages`.
  - Enums: `Status` (DRAFT, PUBLISHED, etc.), `Audience`, `EvidenceLevel`.
- **Promo**: Stores promotion information like code, headline, and validity.
  - Relations: Has multiple `PromoImages`.
- **Staff**: Represents clinic staff members (Doctors, Admins, Staff).
  - Relations: Can author/review `News`, has `DoctorPracticeSchedule`s, and can make `RoleRequest`s.
  - Enums: `StaffTitle`.
- **Category**: Categories for news articles.
- **DoctorPracticeSchedule**: Stores availability schedules for doctors.
- **QueueTicket**: Manages queue tokens for the clinic.
  - Enums: `QueueStatus`, `CounterNumber`.
- **RoleRequest**: Handles staff role change requests.
  - Enums: `RequestStatus`.

### Enums

- **Status**: DRAFT, PENDING_REVIEW, PUBLISHED, ARCHIVED
- **Audience**: PATIENT, GENERAL_PUBLIC, MEDICAL_PROFESSIONAL, INTERNAL_STAFF
- **EvidenceLevel**: META_ANALYSIS, RANDOMIZED_CONTROL, OBSERVATIONAL, EXPERT_OPINION
- **StaffTitle**: Staff, Doctor, Admin
- **QueueStatus**: WAITING, CALLING, DONE
- **CounterNumber**: ONE, TWO
- **RequestStatus**: PENDING, ACCEPTED, REJECTED

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Neon DB project.
- A Clerk account.
- A Google Cloud Platform project with Storage enabled.
- A Resend account.

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Set up environment variables in a `.env` file (Database URL, Clerk keys, GCS credentials, Resend API key).

3. Run database migrations:

```bash
npx prisma migrate dev
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
