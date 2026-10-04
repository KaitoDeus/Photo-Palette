# Photo Palette

A modern full-stack Korean-style photobooth web application, RESTful backend API, and administrative content management system.

[![React](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21.2-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4.1-2D3748.svg)](https://www.prisma.io/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57.svg)](https://sqlite.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
  - [In-Browser Photobooth Experience](#in-browser-photobooth-experience)
  - [Frame Library](#frame-library)
  - [Branch Locator & Studio Booking](#branch-locator--studio-booking)
  - [Administrative Management System (CMS)](#administrative-management-system-cms)
  - [Backend REST API & Database](#backend-rest-api--database)
- [System Architecture](#system-architecture)
- [RESTful API Endpoints](#restful-api-endpoints)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Running the Application](#running-the-application)
  - [Database Operations](#database-operations)
  - [Production Build](#production-build)
- [Administrative Access](#administrative-access)
- [License](#license)

---

## Overview

Photo Palette is a full-stack platform designed to deliver the authentic self-service Korean photobooth experience directly in desktop and mobile web browsers. Users can capture photos via WebRTC, apply stylized frames and grid layouts, record session recap clips, and export high-resolution printable outputs.

The platform includes a dedicated Node.js and TypeScript Express API backed by Prisma ORM and SQLite (with seamless PostgreSQL compatibility for cloud production deployment). An administrative console (CMS) provides centralized management for studio branches, frame designs, reservation workflows, and real-time operational metrics.

---

## Key Features

### In-Browser Photobooth Experience

- **WebRTC Camera Stream**: Real-time camera integration with mirror preview support for natural framing.
- **Configurable Countdown Timer**: Selectable capture intervals (3s, 5s, 10s) before every shot.
- **Dual Capture Modes**:
  - *Automated Sequence*: Automatically captures all shots required by the chosen layout.
  - *Manual Shutter*: Manual control for taking individual shots at the user's pace.
- **Session Video Recap**: Real-time canvas recording via the `MediaRecorder` API to generate a backstage video clip.
- **High-Resolution Canvas Export**: Multi-frame merging and rendering engine scaling up to 2400px with cover-fit aspect ratio calculations to avoid image distortion.
- **Instant Frame Switching**: Swap frame designs on the result screen without losing captured photos.

### Frame Library

- Curated frame designs covering various themes (Love, Valentine, Tet / Lunar New Year, Birthday, Special Occasions).
- Multiple layout profiles: 1x4 vertical strip, 2x2 grid, and 1x1 portrait.
- Multi-criteria filtering by layout, category, and text search, supported by a full-screen interactive lightbox preview.

### Branch Locator & Studio Booking

- Comprehensive directory of 35 official studio branches across Vietnam (Hanoi, Ho Chi Minh City, Hai Phong, Binh Duong, Nghe An, Dong Nai, Hung Yen).
- Two-level geographic filtering by city and district.
- High-precision Google Maps integration with exact GPS coordinates.
- Online booking workflow allowing users to choose branch locations, time slots, and service packages, with instant booking code generation.

### Administrative Management System (CMS)

- **Protected Route Architecture**: Route guard protection with session persistence.
- **Live Server Status Indicator**: Real-time indicator displaying database synchronization and backend connectivity.
- **Analytics Dashboard**: Real-time metric cards (total frames, active branches, reservations, revenue) and distribution breakdown charts.
- **Visual Frame Studio**: Complete CRUD operations for frame models, custom dimensions, padding metrics, and live side-by-side preview.
- **Branch Management**: Centralized management of physical studio locations and coordinates, automatically synced with user-facing directories.
- **Reservation Oversight**: Comprehensive reservation tracking with status transitions (Pending, Confirmed, Completed, Cancelled).
- **Data Backup and Portability**: Full JSON export, import, and factory reset functionality.

### Backend REST API & Database

- **Express + TypeScript Engine**: Modular RESTful backend with CORS and input validation.
- **Prisma ORM**: Strongly-typed database client with auto-generated queries and schema migrations.
- **Zero-Config Local Database**: File-based SQLite storage for instant development without external database servers.
- **Production Ready**: One-line database driver switch to PostgreSQL or MySQL for cloud hosting (Render, Supabase, Neon, Railway).
- **Offline Resilient Client**: Frontend automatically falls back to local storage caching if the backend server is offline.

---

## System Architecture

```text
+---------------------------------------------------------------------------------+
|                                 USER INTERFACE                                  |
|   - Landing Page & Showcase Gallery      - In-Browser Photobooth Engine         |
|   - Frame Library Explorer               - Branch Directory & Reservation Form  |
+---------------------------------------------------------------------------------+
                                        |
                                        | HTTP / REST (Vite Proxy: /api)
                                        v
+---------------------------------------------------------------------------------+
|                            ADMINISTRATIVE CMS (/admin)                          |
|   - Metric Overview & Analytics          - Frame Metric Calibration             |
|   - Studio Branch Management             - Reservation Workflow Control         |
|   - JSON Backup & Portability Service    - Auth Guard & Access Control          |
+---------------------------------------------------------------------------------+
                                        |
                                        | HTTP / JSON API
                                        v
+---------------------------------------------------------------------------------+
|                       EXPRESS.JS BACKEND API (Port 5000)                        |
|   - /api/branches                        - /api/frames                          |
|   - /api/bookings                        - /api/stats                           |
|   - /api/health                          - /api/seed                            |
+---------------------------------------------------------------------------------+
                                        |
                                        | Prisma ORM
                                        v
+---------------------------------------------------------------------------------+
|                             PERSISTENCE DATABASE                                |
|   - SQLite (Local Dev: dev.db) / PostgreSQL (Cloud Deployment)                  |
+---------------------------------------------------------------------------------+
```

---

## RESTful API Endpoints

### Studio Branches

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/branches` | List all branches (supports `?city=`, `?area=`, `?search=`) |
| `GET` | `/api/branches/:id` | Retrieve single branch details and recent bookings |
| `POST` | `/api/branches` | Create a new studio branch |
| `PUT` | `/api/branches/:id` | Update an existing branch |
| `DELETE` | `/api/branches/:id` | Delete a studio branch |

### Photobooth Frames

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/frames` | List all frames (supports `?category=`, `?layout=`, `?search=`) |
| `GET` | `/api/frames/:id` | Retrieve single frame details |
| `POST` | `/api/frames` | Create a new frame |
| `PUT` | `/api/frames/:id` | Update an existing frame |
| `DELETE` | `/api/frames/:id` | Delete a frame |

### Reservations & Bookings

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | List bookings (supports `?branchId=`, `?status=`, `?date=`, `?search=`) |
| `GET` | `/api/bookings/:id` | Retrieve single booking details |
| `POST` | `/api/bookings` | Create a new customer booking |
| `PATCH` | `/api/bookings/:id/status` | Update booking status (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`) |
| `DELETE` | `/api/bookings/:id` | Delete a booking |

### System & Metrics

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/stats` | System overview analytics and metrics |
| `POST` | `/api/seed` | Seed default branches, frames, and sample bookings |

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6 |
| **Backend Framework** | Node.js, Express 4, TypeScript |
| **Database & ORM** | Prisma ORM, SQLite (Dev) / PostgreSQL (Prod) |
| **Routing & Client** | React Router v7, Native Fetch API Client |
| **Styling & UI** | Tailwind CSS, Lucide Icons |
| **Media & Graphics** | HTML5 Canvas 2D Context, WebRTC MediaStream, MediaRecorder API |
| **State & Persistence** | React Context API, Browser LocalStorage Fallback |
| **Quality & Tooling** | ESLint 9, Prettier, Concurrently, tsx |

---

## Project Directory Structure

```text
Photo-Palette/
├── public/                 # Static assets, logos, and favicon
├── server/                 # Full-stack backend application
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema models (Branch, Frame, Booking, AdminUser)
│   │   └── dev.db          # Local SQLite database (git-ignored)
│   ├── src/
│   │   ├── routes/         # Express router modules (branches, frames, bookings, stats, seed)
│   │   ├── index.ts        # Server entry point and middleware configuration
│   │   ├── prisma.ts       # Prisma Client singleton
│   │   └── seed.ts         # Database seed script
│   ├── package.json        # Backend dependencies and scripts
│   └── tsconfig.json       # Backend TypeScript configuration
├── src/
│   ├── assets/             # Frame overlays, model previews, and media
│   ├── components/         # Reusable UI primitives and landing sections
│   ├── data/
│   │   └── branches.ts     # Studio branch datasets with GPS coordinates
│   ├── features/
│   │   ├── admin/          # Administrative CMS module (Pages, Context, Types)
│   │   └── photobooth/     # Photobooth engine module (Views, Hooks, Utils)
│   ├── services/
│   │   └── api.ts          # Strongly-typed API client service
│   ├── pages/              # Primary route pages (Home, About, Frames, Gallery, Privacy)
│   ├── App.tsx             # Root router and layout boundary definition
│   └── index.tsx           # Application entry point
├── package.json            # Root manifest with full-stack scripts
├── vite.config.ts          # Vite bundler with API reverse-proxy configuration
└── LICENSE                 # MIT License statement
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) version 18.0.0 or higher
- [npm](https://www.npmjs.com/) version 9.0.0 or higher

### Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/KaitoDeus/Photo-Palette.git
   cd Photo-Palette
   ```

2. Install root and frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies and initialize the database:
   ```bash
   cd server
   npm install
   npx prisma db push
   npm run prisma:seed
   cd ..
   ```

### Running the Application

You can start both the frontend and backend servers together using a single command:

```bash
npm run dev:full
```

- **Frontend Application**: `http://localhost:5173`
- **Backend REST API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

Alternatively, you can run each service in separate terminals:
- Frontend: `npm run dev`
- Backend: `npm run server:dev`

### Database Operations

From the project root:
- Re-seed initial data (35 branches, default frames, sample bookings):
  ```bash
  npm run server:seed
  ```
- Rebuild backend TypeScript:
  ```bash
  npm run server:build
  ```

### Production Build

To build both frontend and backend for production:
```bash
npm run build
npm run server:build
```

---

## Administrative Access

The administration portal is available at `/admin`:

- **URL**: `http://localhost:5173/admin/login`
- **Username**: `admin`
- **Password**: `admin123` (or `123456`, `palette`)

A quick demo login button is provided on the login page for testing purposes.

---

## License

This project is licensed under the terms of the [MIT License](LICENSE).

```text
Copyright (c) 2026 Vo Anh Khai (KaitoDeus)
```
