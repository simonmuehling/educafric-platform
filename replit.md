# Educafric - African Educational Technology Platform

## Overview

Educafric is a comprehensive African educational technology platform designed to provide a complete digital learning ecosystem for schools, teachers, parents, and students. It aims to address critical educational needs in Africa by offering a robust, bilingual (French/English), mobile-first solution. Key capabilities include integrated academic management, communication tools, and financial features tailored for the African market, such as SMS/WhatsApp communication and localized payment options. The project envisions significant market potential by offering substantial cost savings for schools (up to 73%), high ROI for all stakeholders, and improved educational outcomes, aligning with UN Sustainable Development Goals for education.

## User Preferences

Preferred communication style: Simple, everyday language.

**CRITICAL USER PREFERENCES:**
- ALWAYS consolidate ALL dashboards (Teacher, Student, Parent, Freelancer, Commercial, SiteAdmin) when making changes
- NEVER make partial updates to only some dashboards
- ALWAYS preserve button functionality when making changes - buttons must remain functional
- User does not want to repeat instructions about button functionality preservation

## Recent Project Status (Updated February 2025)

**React Native Mobile App Created (February 2nd, 2025):**
- ✅ MAJOR MILESTONE: Separate React Native project created (`educafric-mobile/`)
- ✅ Complete mobile app architecture with TypeScript and professional structure
- ✅ API service layer connecting to existing Express.js backend endpoints
- ✅ Authentication system using existing `/api/auth/*` endpoints with session management
- ✅ Professional mobile login screen with EDUCAFRIC branding and demo access
- ✅ Role-based dashboard screens (Student, Teacher, Parent, etc.) with quick actions
- ✅ Android build configuration ready with Java 21 compatibility
- ✅ Zero impact on existing web application - completely separate codebase
- ✅ Shared backend infrastructure - mobile app uses same APIs and database

**APK Build Fully Operational (February 1st, 2025):**
- ✅ MAJOR BREAKTHROUGH: Upgraded to Java 21 to resolve Capacitor module compatibility
- ✅ Fixed Firebase Google Services configuration for Android debug builds
- ✅ Resolved duplicate resource conflicts between styles.xml and themes.xml
- ✅ APK successfully generated (8.99 MB) at android/app/build/outputs/apk/debug/app-debug.apk
- ✅ Build time: 38 seconds with 100% success rate
- ✅ All Capacitor modules (geolocation, camera, push-notifications) now compatible
- ✅ EDUCAFRIC v4.2.3 branding fully preserved in Android themes
- ✅ GitHub Actions workflow ready for automated APK generation with Java 21

**Premium System Fully Operational (February 1st, 2025):**
- Corrected all premium pricing to match official EDUCAFRIC documents
- Parents: 1,000-1,500 CFA/month (was incorrectly 2,500 CFA)
- Freelancers: 25,000 CFA/year or 12,500 CFA/semester (was incorrectly 5,000 CFA/month)
- Schools: 50,000-75,000 CFA/year (was incorrectly 15,000 CFA/month)
- All premium buttons functional with correct redirections to /subscribe
- Premium overlays and locked modules working across all dashboards
- Sandbox environment updated with full premium access for demonstrations

## Previous Project Status (Updated January 2025)

**GitHub Repository Successfully Created:**
- Repository: https://github.com/simonmuehling/educafric-platform
- Complete EDUCAFRIC platform uploaded (2,892 lines of code)
- Android configuration v4.2.3-branded with complete EDUCAFRIC branding
- All large backup files removed for GitHub compatibility
- Clean Git history established
- Production-ready codebase available for collaboration and deployment

**Build Issues Resolved (January 2025):**
- Fixed all logo import errors causing build failures
- Resolved missing demo video import from attached_assets directory
- Updated all asset references to use public directory paths
- Applied complete EDUCAFRIC branding to Android icons and splash screens
- Build now compiles successfully without errors
- Ready for GitHub Actions APK generation

**Domain Configuration Updated (January 2025):**
- Updated all external domain references from www.educafric.com to educafric.com
- Fixed Firebase configuration syntax errors and proper environment variable usage
- Updated WhatsApp notification templates with correct domain URLs
- Enhanced Firebase domain helper for proper setup guidance
- Maintained Firebase auth domain as smartwatch-tracker-e061f.firebaseapp.com for development

**Capacitor Sync Issue Resolved (January 2025):**
- Fixed webDir configuration mismatch in capacitor.config.ts
- Updated from 'dist' to 'dist/public' to match Vite build output structure
- Capacitor sync now completes successfully in under 2 seconds
- Android build process fully functional and validated

**Logo Visibility Issues Fixed (January 2025):**
- Resolved conflicting logo import references across login, password reset, and navbar
- Fixed logoImage variable conflicts causing TypeScript errors and runtime failures
- Updated all logo references to use consistent direct image paths
- Fixed static file serving issue by copying logos to client/public for Vite development server
- EDUCAFRIC logos now display properly across all authentication and navigation interfaces

**GitHub Actions Ready:**
- CI/CD workflows configured (simple-android-build.yml)
- Enhanced with build verification steps and debugging information
- JDK version updated from 11 to 17 for Android SDK compatibility
- All build blocking issues resolved
- EDUCAFRIC v4.2.3-branded ready for automated APK generation
- Professional Android app with complete branding available

## System Architecture

### Frontend Architecture
- **React 19.1.0** with TypeScript for type-safe component development.
- **Tailwind CSS** for responsive, mobile-first styling with a custom African-themed color palette, emphasizing a modern, vibrant, and 3D-inspired visual redesign.
- **Wouter** for lightweight client-side routing.
- **TanStack Query v5** for server state management and caching.
- **Radix UI + Shadcn/UI** for accessible, production-ready component primitives.
- **Progressive Web App (PWA)** capabilities for mobile optimization, including offline functionality.
- **Unified UI/UX**: All dashboards utilize a consistent modern design system with colorful gradients, rounded cards, animated interactions, and the Nunito font.
- **Component Standardization**: Standardized reusable components like `ModuleContainer`, `StatCard`, `ModernCard`, `ModernDashboardLayout`, and `ModernTabNavigation` are used across the platform.
- **Mobile Optimization**: Features like `MobileActionsOverlay`, compact mobile navigation, and intelligent superposition elements are designed for an optimal smartphone experience.

### Backend Architecture
- **Express.js 4.21.2** server with RESTful API design.
- **Drizzle ORM** with PostgreSQL for type-safe database operations.
- **Session-based authentication** using `express-session` and `Passport.js`.
- **Role-based access control** supporting 8 distinct user roles (SiteAdmin, Admin, Director, Teacher, Parent, Student, Freelancer, Commercial).
- **BCrypt** for secure password hashing.
- **Consolidated Error Handling**: Implemented a unified error recognition and automated repair system for various runtime, compilation, and database issues.
- **Security Hardening**: Includes `helmet`, `cors`, `express-rate-limit`, `Two-Factor Authentication (2FA)`, and an `Intrusion Detection System (IDS)` with attack pattern recognition and automated alerting, optimized for African contexts.

### Database Design
- **PostgreSQL** as the primary database, hosted on **Neon Serverless**.
- **Multi-tenant architecture** supporting multiple schools on a single platform.
- **Comprehensive schema** covering users, schools, classes, grades, attendance, homework, payments, communication logs, and geolocation data.
- **Academic year/term structure** for proper educational data organization.

### Key Features and System Design Choices
- **Authentication & Authorization**: Secure local and Firebase Google OAuth authentication with comprehensive session management and granular permissions for 8 user roles. Includes an intelligent multi-role detection system during registration.
- **Educational Management System**: Features include robust grade management with African-style report cards, real-time attendance tracking, homework assignment and submission, and flexible timetable management with 5-minute precision and African cultural adaptations (e.g., climatic breaks, Saturday inclusion).
- **Communication System**: Integrated multi-channel notification system (SMS via Vonage, WhatsApp Business API, Email via Hostinger SMTP, and PWA push notifications) with bilingual, contextual templates optimized for African networks.
- **Payment & Subscription Management**: Stripe integration for international payments, alongside local African payment methods (Orange Money, MTN Mobile Money, Afriland First Bank). Supports multiple subscription tiers for parents, schools, and freelancers, with automatic activation and renewal.
- **Geolocation Services**: Comprehensive GPS tracking for tablets, smartwatches, and phones, featuring geofencing, safe zone management, real-time device monitoring, and emergency alerts, optimized for African connectivity.
- **Document Management System**: Centralized system for managing commercial, administrative, and legal documents (contracts, brochures, financial projections) with digital signatures, PDF generation, and controlled access.
- **Bilingual Support**: Dynamic French/English language switching with complete localization of UI, educational content, and documentation, including context-aware translations specific to African educational terminology and payment methods.
- **Sandbox Environment**: A dedicated, fully unlocked sandbox environment with realistic African demo data and comprehensive developer tools for testing and demonstration.

## External Dependencies

### Core Services
- **Neon Database**: Serverless PostgreSQL hosting.
- **Stripe**: Payment processing for African markets.
- **Firebase**: Authentication (Google OAuth) and real-time features.
- **Vonage**: SMS and WhatsApp messaging APIs.
- **Hostinger**: SMTP services for email communication.

### Development Tools
- **Vite**: Fast development server and build tool.
- **Drizzle Kit**: Database migrations and schema management.
- **ESBuild**: Server-side TypeScript compilation.

### UI/UX Libraries
- **Radix UI**: Headless component primitives.
- **Tailwind CSS**: Utility-first styling framework.
- **React Hook Form + Zod**: Form validation and management.
- **Lucide Icons**: Icon library for consistent UI elements.
- **jsPDF**: Client-side PDF generation.