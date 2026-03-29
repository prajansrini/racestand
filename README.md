# F1MOTO — F1 & MotoGP 2026

F1 and MotoGP 2026 Season Calendar, Session Times, and Championship Standings.

## How to Run

### Option 1: Direct File Opening (Simplest)
1. Navigate to the project folder.
2. Right-click `index.html` and select **Open with...** -> **Google Chrome** (or your preferred browser).
3. Alternatively, double-click `index.html` to open it in your default browser.

### Option 2: Using VS Code "Live Server" (Recommended for Development)
If you use VS Code, this is the most professional way to run the app:
1. Open the project folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Click the **"Go Live"** button in the bottom-right status bar of VS Code.
4. Your browser will automatically open at `http://127.0.0.1:5500`.

### Option 3: Using a Static Web Server (Terminal)
If you have Node.js installed, you can run a temporary server:
```bash
npx serve .
```

If you have Python installed:
```bash
python -m http.server
```

## Project Structure
- `index.html`: Main HTML structure.
- `styles.css`: Visual styling and animations.
- `app.js`: Application logic (navigation, modals, countdowns).
- `data.js`: 2026 season data (race calendars and standings).
- `resources/`: Images and logos.
