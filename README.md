# Photo Palette

A modern in-browser Korean-style photobooth web application and administrative content management system.

[![React](https://img.shields.io/badge/React-19.2.4-blue.svg)](https://react.dev/)
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
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Administrative Access](#administrative-access)
- [License](#license)

---

## Overview

Photo Palette is a web application designed to bring the traditional self-service photo booth experience directly to modern desktop and mobile browsers. Without installing external drivers or software, users can capture candid photos via webcam, apply Korean-style photo strips and grid layouts, record session recap videos, and export print-ready high-resolution files.

The system also features an integrated administrative console (CMS) enabling operators to calibrate frame metrics, manage branch listings, oversee studio reservations, and maintain system backups.

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

- Over 30 curated frame designs covering various themes (Love, Valentine, Lunar New Year, Birthday, Special Occasions).
- Multiple layout profiles: 1x4 vertical strip, 2x2 grid, and 1x1 portrait.
- Multi-criteria filtering by layout, category, and text search, supported by a full-screen interactive lightbox preview.

### Branch Locator & Studio Booking

- Comprehensive directory of 24 studio branches across Vietnam (Hanoi, Ho Chi Minh City, Hai Phong, Binh Duong, Nghe An, Dong Nai, Hung Yen).
- Two-level geographic filtering by city and district.
- Online booking workflow allowing users to choose branch locations, time slots, and service packages, with instant voucher generation.

### Administrative Management System (CMS)

- **Protected Route Architecture**: Route guard protection with session persistence.
- **Analytics Dashboard**: Real-time metric cards (total frames, active branches, reservations, revenue) and distribution breakdown charts.
- **Visual Frame Studio**: Complete CRUD operations for frame models, including custom dimensions, padding metrics, slot calibration, overlay image uploading, and live side-by-side preview.
- **Branch Management**: Centralized management of physical studio locations and addresses, automatically synced with user-facing directories.
- **Reservation Oversight**: Comprehensive reservation tracking with status transitions (Pending, Confirmed, Completed, Cancelled) and counter walk-in booking support.
- **Data Backup and Portability**: Full JSON export, import, and factory reset functionality.

---

## System Architecture

```text
+---------------------------------------------------------------------------------+
|                                 USER INTERFACE                                  |
|   - Landing Page & Showcase Gallery      - In-Browser Photobooth Engine         |
|   - Frame Library Explorer               - Branch Directory & Reservation Form  |
+---------------------------------------------------------------------------------+
                                        |
                                        | Real-time Reactive Sync
                                        v
+---------------------------------------------------------------------------------+
|                            ADMINISTRATIVE CMS (/admin)                          |
|   - Metric Overview & Analytics          - Visual Frame Metric Calibration      |
|   - Studio Branch Management             - Reservation Workflow Control         |
|   - JSON Backup & Portability Service    - Auth Guard & Access Control          |
+---------------------------------------------------------------------------------+
                                        |
                                        | Browser Storage & Memory Layer
                                        v
+---------------------------------------------------------------------------------+
|                              CORE ENGINE MODULES                                |
|   - HTML5 Canvas 2D Merge Pipeline       - WebRTC MediaStream Shutter           |
|   - MediaRecorder Video Capture Loop     - LocalStorage Reactive Data Store     |
+---------------------------------------------------------------------------------+
```

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6 |
| **Routing** | React Router v7 |
| **Styling & UI** | Tailwind CSS, Lucide Icons |
| **Media & Graphics** | HTML5 Canvas 2D Context, WebRTC MediaStream, MediaRecorder API |
| **State & Persistence** | React Context API, Browser LocalStorage |
| **Quality & Tooling** | ESLint 9, Prettier |

---

## Project Directory Structure

```text
Photo-Palette/
├── public/                 # Static assets, logos, and favicon
├── src/
│   ├── assets/             # Frame overlays, model previews, and illustration media
│   ├── components/
│   │   ├── common/         # Reusable UI primitives (Button, Modal)
│   │   ├── landing/        # Hero, Gallery, Pricing, Stats, Testimonials
│   │   └── layout/         # Navbar, Footer, Background3D
│   ├── data/
│   │   └── branches.ts     # Default studio branch datasets
│   ├── features/
│   │   ├── admin/          # Administrative CMS module
│   │   │   ├── components/ # AdminLayout, AdminRouteGuard
│   │   │   ├── context/    # AdminContext (Reactive data store)
│   │   │   ├── data/       # Mock reservation data
│   │   │   ├── pages/      # Dashboard, Frames, Branches, Bookings, Settings
│   │   │   └── types.ts    # Admin domain interfaces
│   │   └── photobooth/     # Photobooth engine module
│   │       ├── components/ # DesktopView, MobileView, FrameStrip, CustomerBookingModal
│   │       ├── data/       # Built-in frame definitions
│   │       ├── hooks/      # usePhotoBooth state machine hook
│   │       ├── utils/      # imageExport canvas rendering utility
│   │       └── types.ts    # Photobooth domain interfaces
│   ├── pages/              # Primary route pages (Home, About, Frames, Gallery, Privacy)
│   ├── App.tsx             # Root router and layout boundary definition
│   ├── index.css           # Global typography and base CSS
│   └── index.tsx           # Application entry point
├── index.html              # HTML entry template
├── package.json            # Manifest and script commands
├── tsconfig.json           # TypeScript compiler configuration
├── vite.config.ts          # Vite bundler configuration
└── LICENSE                 # MIT License statement
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) version 18.0.0 or higher
- [npm](https://www.npmjs.com/) version 9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KaitoDeus/Photo-Palette.git
   cd Photo-Palette
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:
```bash
npm run dev
```

Navigate to `http://localhost:5173` in your browser.

### Production Build

To build the project for production deployment:
```bash
npm run build
```

To preview the built production bundle locally:
```bash
npm run preview
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
