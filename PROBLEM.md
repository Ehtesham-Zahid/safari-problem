# Safari login failure

## Run

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) and click **Sign in**.

| App | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Auth | http://localhost:3001 |

Safari URL-limit simulation is **on by default**. To turn it off:

```bash
SIMULATE_SAFARI_URL_LIMIT=false npm start
```

## Problem

Safari and WebKit are much stricter about **URL length** than Chrome or Firefox (often around **2 KB** on older Safari / iOS). Long query strings get truncated or dropped.

After sign-in, this app redirects to `/authenticated` with a large JWT in the query string (`?authToken=...`). That URL is too long for Safari, so the token is truncated and login fails even though auth succeeded on the server.

Your job is to **find and implement a fix** so login works reliably in Safari as well as in other browsers.
