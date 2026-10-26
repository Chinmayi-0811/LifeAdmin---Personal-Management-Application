# LifeAdmin

LifeAdmin is a personal life-management web app. It lets you track bills, tasks,
documents, appointments, subscriptions, and reminders from one dashboard, with
your own account protected by JWT authentication.

- **Backend:** Java 17, Spring Boot 3, Spring Web, Spring Data JPA, Spring
  Security, JWT (JJWT), BCrypt, MySQL, Maven
- **Frontend:** React 18, Vite, JavaScript/JSX, plain CSS, Axios, React Router
- **Ports:** backend `8086`, frontend `5173`

```
LifeAdmin/
├── backend/     Spring Boot API (run in Eclipse)
├── frontend/    React + Vite app (run in VS Code)
├── database/    MySQL schema script
├── postman/     Postman collection for testing the API
└── README.md
```

---

## 1. Prerequisites

- **Java 17** (JDK 17) installed and set as the project JDK in Eclipse
- **Maven** (Eclipse's bundled Maven is fine — no separate install needed)
- **Node.js 18+** and npm (for the frontend, run from VS Code's terminal)
- **MySQL Server** running locally (MySQL 8.x recommended)

---

## 2. Set up the database

1. Open a MySQL client (MySQL Workbench, `mysql` CLI, or similar).
2. Run the script at `database/lifeadmin.sql`. It creates the `lifeadmin`
   database and the `users` and `life_items` tables.
   ```
   mysql -u root -p < database/lifeadmin.sql
   ```
   You don't strictly have to run this yourself — the backend is configured
   with `createDatabaseIfNotExist=true` and `spring.jpa.hibernate.ddl-auto=update`,
   so it will create the database/tables automatically on first run. Running
   the script yourself is optional but useful if you want to inspect the
   schema up front.
3. Open `backend/src/main/resources/application.properties` and update these
   two lines with **your own MySQL username and password**:
   ```
   spring.datasource.username=root
   spring.datasource.password=root
   ```

---

## 3. Run the backend (Eclipse)

1. In Eclipse: **File → Import → Maven → Existing Maven Projects**, and select
   the `backend` folder.
2. Wait for Eclipse to download dependencies (first import can take a minute).
3. Open `LifeAdminApplication.java` (`src/main/java/com/lifeadmin/`) and run it
   as **Run As → Java Application** (or **Spring Boot App** if you have the
   Spring plugin).
4. Confirm it started successfully — you should see Spring Boot's startup log
   ending with something like:
   ```
   Tomcat started on port 8086 (http) ...
   Started LifeAdminApplication in ... seconds
   ```
5. The API is now available at `http://localhost:8086/api`.

**Troubleshooting:**
- `Communications link failure` / connection refused → MySQL isn't running, or
  the username/password in `application.properties` is wrong.
- `Unknown database 'lifeadmin'` → the auto-create didn't run; execute
  `database/lifeadmin.sql` manually.
- Port `8086` already in use → stop whatever else is using that port, or
  change `server.port` in `application.properties` (and update the frontend's
  `API_BASE_URL` in `frontend/src/api/api.js` to match).

---

## 4. Run the frontend (VS Code)

1. Open the `frontend` folder in VS Code.
2. Open a terminal (``Ctrl+` ``) and install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Vite will print a local URL — open `http://localhost:5173` in your browser.
5. Make sure the backend (step 3) is already running, since the frontend
   calls `http://localhost:8086/api` directly.

---

## 5. Using the app

1. Go to `http://localhost:5173/register` and create an account (name,
   email, password, confirm password).
2. You're automatically logged in and redirected to the dashboard.
3. From the dashboard you can:
   - See stats: total items, pending, completed, and items due within 7 days.
   - Search items by title/description, and filter by category, status, and
     priority.
   - Create, edit, mark-complete, and delete items.
4. Log out from the top-right of the navbar. Your session (JWT) is stored in
   the browser's `localStorage` and is sent as a `Bearer` token on every
   request; it's cleared automatically if the token expires or is rejected.

---

## 6. API summary

All endpoints are prefixed with `/api`. Endpoints other than `/api/auth/**`
require a header: `Authorization: Bearer <token>`.

| Method | Endpoint             | Description                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/auth/register`      | Create an account, returns a JWT     |
| POST   | `/auth/login`         | Log in, returns a JWT                |
| GET    | `/items`               | List your items (supports `keyword`, `category`, `status`, `priority` query params) |
| GET    | `/items/{id}`          | Get one of your items                |
| POST   | `/items`               | Create an item                       |
| PUT    | `/items/{id}`          | Update an item                       |
| DELETE | `/items/{id}`          | Delete an item                       |
| GET    | `/dashboard`           | Get totals: total/pending/completed/upcoming items |

A ready-to-import Postman collection is at
`postman/LifeAdmin.postman_collection.json` — running "Register" or "Login"
in it automatically stores the JWT for the other requests.

### Item fields

- `title` (required), `description`
- `category`: `BILL`, `TASK`, `DOCUMENT`, `APPOINTMENT`, `SUBSCRIPTION`, `REMINDER`, `OTHER`
- `status`: `PENDING`, `COMPLETED`, `CANCELLED`
- `priority`: `LOW`, `MEDIUM`, `HIGH`
- `dueDate` (ISO date, e.g. `2026-09-05`), `amount` (decimal), `recurring` (boolean)

Items are always scoped to the logged-in user — one user can never read,
edit, or delete another user's items (enforced server-side, not just hidden
in the UI).

---

## 7. Notes

- JWTs expire after 24 hours by default (`app.jwt.expiration-ms` in
  `application.properties`). Expired/invalid tokens return `401` and the
  frontend automatically redirects to `/login`.
- Passwords are hashed with BCrypt before being stored — plaintext passwords
  are never saved.
- CORS is pre-configured to allow `http://localhost:5173` to call the
  backend. If you change the frontend's port, update
  `backend/src/main/java/com/lifeadmin/config/CorsConfig.java` to match.
