# Auth redirect interview

Dummy login for a take-home / live interview. There is no real Google OAuth and no login form.

`npm start` runs two servers:

| App | URL |
| --- | --- |
| Frontend | [http://localhost:3000](http://localhost:3000) |
| Login / auth | [http://localhost:3001](http://localhost:3001) |

## Run

```bash
npm install
npm start
```

Open the frontend at [http://localhost:3000](http://localhost:3000) and click **Sign in**.

## What this app does today

1. Frontend **Sign in** is a GET to the backend login endpoint: `http://localhost:3001/login`
2. Backend `GET /login` creates a large session JWT for a dummy user.
3. Backend **redirects to the frontend authenticated page** with the JWT in the query string:

   `http://localhost:3000/authenticated?authToken=<jwt>`

4. `/authenticated` reads `authToken` from the URL, stores it, then goes to `/dashboard`.
5. `/api/me` on the auth server expects `Authorization: Bearer <jwt>`.

Safari URL-limit simulation is **on by default**. The login → authenticated redirect is truncated if the `Location` URL is longer than 2048 characters. Run with `SIMULATE_SAFARI_URL_LIMIT=false npm start` to see Chrome-like behavior.

## Task

See [PROBLEM.md](./PROBLEM.md).
