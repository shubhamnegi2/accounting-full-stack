# Staff Dashboard & Client Management

## 1. Authentication & Routing

I started with the login page. First, I built the UI and implemented form validation. Then I integrated the login API: I showed proper error messages for failed login attempts, and when login succeeded, I stored the token, user ID, and email in local storage.

After that, I set up routing:

- Public routes for pages like login.
- Protected routes for the dashboard.
- I also implemented redirect logic so that if a logged-in user tries to access the login page again, they are redirected to the dashboard automatically.

## 2. Dashboard (Staff)

Once login was working, I moved to the dashboard:

- I created the UI for the dashboard and firm management.
- Implemented logout functionality to remove user details from local storage and state.
- Built a firm details form with all required fields and multi-select options.
- Used Formik and Yup for form validation.
- On form submission, I called the API to save the data in the database, linking it to the staff ID.
- I also displayed the saved details in a table on the dashboard, including the status of each record.

## 3. Client Page

After the dashboard, I created a client page:

- I reused the authentication token for the client.
- Built a form dynamically with fields based on the requested documents.
- Implemented validation and file upload functionality.
- Submitted data is saved and associated with the requesting staff member.

## 4. Additional Work
- Make real Api in PHP Mysql with the help of AI
- I ensured state management for login and dashboard data.
- Handled API errors gracefully on all pages.
- Made the dashboard table dynamic so it updates when new data is added.
- Ensured proper flow and protection of routes, preventing unauthorized access.

