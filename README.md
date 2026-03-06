# Wordler

A modern Wordle-style web app built with vanilla HTML, CSS, and JavaScript.

## Features

- Single-page app, no framework required
- Difficulty modes:
  - Very Easy (3 letters)
  - Easy (4 letters)
  - Normal (5 letters)
  - Hard (6 letters)
  - Very Hard (7 letters)
- On-screen keyboard + physical keyboard support
- Wordle color logic (green/yellow/gray) with duplicate-letter handling
- Smooth animations (tile pop, flip reveal, shake, win effects)
- Theme selection (NYT Dark, Ocean, Sunset, Forest, Neon)
- Local stats in `localStorage`:
  - games played
  - win percentage
  - current streak
  - best streak
- Share button for emoji result grid
- Challenge mode by URL with synced puzzle
- Realtime multiplayer challenge flow (Ready + countdown + rematch + forfeit-on-mode-change) via Supabase Realtime

## Project Files

- `index.html` - app layout and modals
- `styles.css` - styling, animations, responsive behavior
- `script.js` - game logic, challenge flow, and realtime integration

## Run Locally

You can open `index.html` directly, but using a local server is recommended.

Example with Python:

```bash
python -m http.server 5500
```

Then open:

`http://localhost:5500`

## Realtime Challenge Setup (Supabase)

Wordler does not hardcode credentials. Realtime credentials are entered by users in-app and saved locally in the browser profile.

### 1) Create a Supabase project

1. Create/sign in at [Supabase](https://supabase.com)
2. Create a new project

### 2) Copy project API credentials

From **Project Settings -> API**, copy:

- Project URL (example: `https://your-project.supabase.co`)
- Publishable / anon key

Do not use the `service_role` key in this client app.

### 3) Configure in Wordler

1. Open Wordler
2. Click `Settings`
3. Paste the URL and publishable/anon key
4. Click `Save`
5. Click `Test Realtime` to confirm the connection

Credentials are stored only in browser localStorage:

- `wordlerSupabaseUrl`
- `wordlerSupabaseAnon`

## How Challenge Mode Works

1. Player A clicks `Challenge Link` and shares it.
2. Player B opens that URL.
3. Both join the same challenge room.
4. Both click `Ready`.
5. A synced 3-second countdown starts, then both games begin together.
6. If one player wins, the other is notified.
7. `Rematch` returns both players to lobby and requires ready-up again.

If a player changes mode during an active challenge, they are prompted to confirm forfeit. Confirming syncs mode and forfeits the round for fairness.

## License

MIT
