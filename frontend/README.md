# Frontend Project – Staff Dashboard & Client Management

## Overview
This project is a frontend application for staff and client management in a firm. It includes authentication, dynamic forms, dashboard management, and secure routing.

---

## Features

### 1. Authentication & Routing
- **Login Page**
  - Built UI with form validation using React and Formik.
  - Integrated login API with proper error handling.
  - On successful login, stored token, user ID, and email in local storage.
- **Routing**
  - Configured **public routes** (e.g., Login page).
  - Configured **protected routes** (e.g., Dashboard).
  - Implemented redirect logic for logged-in users accessing the login page.

---

### 2. Dashboard (Staff)
- **UI & Navigation**
  - Designed dashboard and firm management interface.
  - Implemented logout functionality to clear local storage and state.
- **Firm Details Form**
  - Form includes all required fields and multi-select options.
  - Validation handled via Formik and Yup.
  - API integration to save firm details linked to the staff ID.
- **Data Display**
  - Dynamic table showing saved firm details.
  - Real-time status updates for each record.

---

### 3. Client Page
- **Authentication**
  - Reused the authentication token for client API calls.
- **Dynamic Form**
  - Fields generated dynamically based on requested documents.
  - Validation and file upload functionality included.
  - Submitted data is associated with the requesting staff member.

---

### 4. Additional Features
- State management for login and dashboard data.
- Graceful API error handling across all pages.
- Dynamic dashboard table updates with new data.
- Route protection to prevent unauthorized access.

---

## Tech Stack
- React.js
- Formik & Yup
- JavaScript (ES6+)
- CSS/SCSS
- REST APIs
- Local Storage for session management
