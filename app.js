// ===== COUNTRY CODE MAPPING (for flag images) =====
const countryToCode = {
  'Australia': 'au', 'China': 'cn', 'Japan': 'jp', 'Bahrain': 'bh', 'Saudi Arabia': 'sa',
  'USA': 'us', 'Monaco': 'mc', 'Spain': 'es', 'Canada': 'ca', 'Austria': 'at',
  'Great Britain': 'gb', 'Belgium': 'be', 'Hungary': 'hu', 'Netherlands': 'nl',
  'Italy': 'it', 'Azerbaijan': 'az', 'Singapore': 'sg', 'Mexico': 'mx', 'Brazil': 'br',
  'Qatar': 'qa', 'UAE': 'ae', 'Thailand': 'th', 'Argentina': 'ar', 'France': 'fr',
  'Germany': 'de', 'Czech Republic': 'cz', 'Indonesia': 'id', 'Malaysia': 'my',
  'Portugal': 'pt', 'South Africa': 'za'
};

// ===== // ===== CIRCUIT LAYOUT IMAGE URLs (from julesr0y/f1-circuits-svg) =====
const circuitImageMap = {
  // F1 circuits
  'Albert Park Circuit': 'melbourne-2',
  'Shanghai International Circuit': 'shanghai-1',
  'Suzuka International Racing Course': 'suzuka-2',
  'Bahrain International Circuit': 'bahrain-2',
  'Jeddah Corniche Circuit': 'jeddah-1',
  'Miami International Autodrome': 'miami-1',
  'Circuit Gilles Villeneuve': 'montreal-6',
  'Circuit de Monaco': 'monaco-6',
  'Circuit de Barcelona-Catalunya': 'catalunya-6',
  'Red Bull Ring': 'spielberg-3',
  'Silverstone Circuit': 'silverstone-8',
  'Circuit de Spa-Francorchamps': 'spa-francorchamps-4',
  'Hungaroring': 'hungaroring-3',
  'Circuit Zandvoort': 'zandvoort-5',
  'Autodromo Nazionale Monza': 'monza-7',
  'IFEMA Madrid Circuit': 'madring-1',
  'Baku City Circuit': 'baku-1',
  'Marina Bay Street Circuit': 'marina-bay-4',
  'Circuit of The Americas': 'austin-1',
  'Autódromo Hermanos Rodríguez': 'mexico-city-3',
  'Autódromo José Carlos Pace': 'interlagos-2',
  'Las Vegas Street Circuit': 'las-vegas-1',
  'Lusail International Circuit': 'lusail-1',
  'Yas Marina Circuit': 'yas-marina-2',
  // MotoGP circuits (since they are not fully in the F1 repo, we map avoiding wrong tracks)
  'Chang International Circuit': '',
  'Autódromo Intl. Ayrton Senna': '',
  'Circuito de Jerez': 'jerez-2', // Hosted F1 (1986-1997)
  'Le Mans': '',
  'Autodromo del Mugello': 'mugello-1', // Hosted F1 (2020)
  'Balaton Park Circuit': '',
  'Automotodrom Brno': '',
  'TT Circuit Assen': '',
  'Sachsenring': '',
  'Misano World Circuit': '',
  'Twin Ring Motegi': '',
  'Pertamina Mandalika Circuit': '',
  'Phillip Island Circuit': '',
  'Sepang International Circuit': 'sepang-1', // Hosted F1 (1999-2017)
  'Autódromo Internacional do Algarve': 'portimao-1', // Hosted F1 (2020-2021)
  'Circuit Ricardo Tormo': ''
};
const CIRCUIT_SVG_BASE = 'https://raw.githubusercontent.com/julesr0y/f1-circuits-svg/main/circuits/white-outline/';

// ===== MOTORSPORT HUB APP =====
const app = {
  currentSeries: null,
  history: [],
  currentF1Season: '2026', // Specifically targeting 2026 as per user requirement
  timingMode: 'local', // 'local' or 'track'
  currentRound: null,
  calendarScrollPos: 0,

  trackOffsets: {
    'Melbourne': 11, 'Shanghai': 8, 'Suzuka': 9, 'Sakhir': 3, 'Jeddah': 3,
    'Miami': -4, 'Imola': 2, 'Monte Carlo': 2, 'Barcelona': 2, 'Spielberg': 2,
    'Silverstone': 1, 'Budapest': 2, 'Spa': 2, 'Zandvoort': 2, 'Monza': 2,
    'Madrid': 2, 'Baku': 4, 'Singapore': 8, 'Austin': -5, 'Mexico City': -6,
    'Interlagos': -3, 'Las Vegas': -7, 'Lusail': 3, 'Abu Dhabi': 4,
    'Buriram': 7, 'Termas': -3, 'Jerez': 2, 'Le Mans': 2, 'Mugello': 2,
    'Sachsenring': 2, 'Assen': 2, 'Kolkata': 5.5, 'Phillip Island': 11, 'Lombok': 8, 'Sepang': 8, 'Portimão': 1, 'Valencia': 1
  },

  sanitizeDriverName(name) {
    if (!name) return '';
    // Consistently shorten full names for better UI display (like Kimi Antonelli)
    return name.replace('Andrea Kimi Antonelli', 'Kimi Antonelli').trim();
  },

  // ----- Navigation -----
  showView(viewId, scrollToTop = true) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const view = document.getElementById(viewId);
    if (view) {
      view.classList.add('active');
      if (scrollToTop) {
        view.scrollTop = 0;
        window.scrollTo(0, 0);
      }
    }
  },
  goBack() {
    if (this.history.length > 0) {
      const prevView = this.history.pop();
      if (prevView === 'landing-view') {
        this.currentSeries = null;
        this.resetSeriesSelection();
      }
      const isReturningToCalendar = prevView === 'calendar-view';
      this.showView(prevView, !isReturningToCalendar);

      // Immediately update timer visibility
      this.updateTimerVisibility();

      if (isReturningToCalendar) {
        console.log("Restoring scroll position to:", this.calendarScrollPos);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo(0, this.calendarScrollPos);
            document.documentElement.scrollTop = this.calendarScrollPos;
            const view = document.getElementById(prevView);
            if (view) view.scrollTop = this.calendarScrollPos;
          });
        });
      }
    } else {
      this.currentSeries = null;
      this.resetSeriesSelection();
      this.showView('landing-view');
      this.updateTimerVisibility();
    }
  },
  pushHistory(viewId) {
    this.history.push(viewId);
  },

  // ----- Menu Switcher -----
  toggleMenu(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('view-switcher-menu');
    const isActive = menu.classList.contains('active');

    if (!isActive) {
      menu.classList.add('active');
      // Highlight current view
      const activeView = document.querySelector('.view.active').id;
      document.getElementById('menu-item-races').classList.toggle('current', activeView === 'calendar-view');
      document.getElementById('menu-item-standings').classList.toggle('current', activeView === 'standings-view');

      // The menu is position: fixed with top: 80px; right: 20px; in CSS
      // This is generally stable for the sticky header.
    } else {
      this.closeAllMenus();
    }
  },
  closeAllMenus() {
    const menu = document.getElementById('view-switcher-menu');
    if (menu) menu.classList.remove('active');
  },
  switchFromMenu(target) {
    this.closeAllMenus();
    // Prevent switching to the same view
    const activeView = document.querySelector('.view.active').id;
    if (target === 'races' && activeView === 'calendar-view') return;
    if (target === 'standings' && activeView === 'standings-view') return;

    // Skip history pushing when switching laterally via the menu
    if (target === 'races') this.showRaces(true);
    else if (target === 'standings') this.showStandings(true);
  },

  init() {
    console.log("App initializing...");
    try {
      this.loadLiveF1Standings();
      this.loadLiveMotoGPData();

      // Auto-refresh data every 5 minutes
      this.refreshInterval = setInterval(() => {
        console.log("Auto-refreshing data...");
        if (this.currentSeries === 'f1') {
          this.loadLiveF1Standings();
        } else if (this.currentSeries === 'motogp') {
          this.loadLiveMotoGPData();
        }
      }, 300000);

      window.addEventListener('click', () => {
        this.closeAllMenus();
        this.resetSeriesSelection();
      });

      // Start the floating countdown timers
      this.startCountdownTimers();

      console.log("App initialized successfully with auto-refresh.");
    } catch (e) {
      console.error("App init failed:", e);
    }
  },

  // Helper to update logos in both headers
  updateHeaderLogos() {
    const series = this.currentSeries;
    const logoHtml = series === 'f1'
      ? `<img src="resources/f1logo.png" alt="F1" class="header-logo">`
      : `<img src="resources/motogplogo.png" alt="MotoGP" class="header-logo" style="filter: brightness(0) invert(1)">`;

    const calLogo = document.getElementById('cal-header-logo');
    const stdLogo = document.getElementById('standings-header-logo');
    const detLogo = document.getElementById('detail-header-logo');
    if (calLogo) calLogo.innerHTML = logoHtml;
    if (stdLogo) stdLogo.innerHTML = logoHtml;
    if (detLogo) detLogo.innerHTML = logoHtml;
  },

  resetSeriesSelection() {
    const container = document.querySelector('.series-cards');
    if (container) {
      container.classList.remove('f1-selected', 'motogp-selected');
    }
    document.querySelectorAll('.series-card').forEach(c => c.classList.remove('active'));
  },

  // ----- Series Selection -----
  selectSeries(series, e) {
    if (e) e.stopPropagation();
    const container = document.querySelector('.series-cards');
    const cards = document.querySelectorAll('.series-card');
    const isAlreadyActive = cards[series === 'f1' ? 0 : 1].classList.contains('active');

    this.resetSeriesSelection();

    if (!isAlreadyActive) {
      container.classList.add(`${series}-selected`);
      cards[series === 'f1' ? 0 : 1].classList.add('active');
      this.setAccentColor(series);
    }
  },

  startSeries(series, view, e) {
    if (e) e.stopPropagation();
    this.currentSeries = series;
    this.pushHistory('landing-view');
    this.setAccentColor(series);

    // Update headers first
    this.updateHeaderLogos();

    // Immediately show the correct timer
    this.updateTimerVisibility();

    // Navigate (skip history as we already pushed landing-view)
    if (view === 'races') this.showRaces(true);
    else if (view === 'standings') this.showStandings(true);

    if (series === 'f1' && !this.liveF1ResultsData) {
      this.loadLiveF1Standings();
    }
  },

  toggleTimingMode() {
    this.timingMode = this.timingMode === 'local' ? 'track' : 'local';

    // Update labels
    // Update all session times and dates without full re-render to avoid flicker
    const tz = this.getTimezoneAbbr();
    const race = (this.currentSeries === 'f1' ? f1Races : motogpRaces).find(r => r.round === this.currentRound);
    if (!race) return;

    document.querySelectorAll('.session-item').forEach(el => {
      const utc = el.getAttribute('data-utc');
      const timeValSpan = el.querySelector('.time-val');
      const timeSuffixSpan = el.querySelector('.time-label-suffix');
      const dateInfoDiv = el.querySelector('.session-card-info');

      if (utc && timeValSpan && timeSuffixSpan && dateInfoDiv) {
        // Calculate new time
        const timeVal = this.timingMode === 'local'
          ? this.formatLocalTime(utc)
          : this.getTrackTime(utc, race.location);

        const label = this.timingMode === 'local' ? tz : 'TRACK';

        timeValSpan.textContent = timeVal;
        timeSuffixSpan.textContent = label;

        // Calculate new date
        const d = new Date(utc);
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let dayName, monthName, dayNum;

        if (this.timingMode === 'local') {
          dayName = weekDays[d.getDay()];
          monthName = months[d.getMonth()];
          dayNum = d.getDate();
        } else {
          const offset = this.trackOffsets[race.location] || 0;
          const trackDate = new Date(d.getTime() + (offset * 60 * 60 * 1000));
          dayName = weekDays[trackDate.getUTCDay()];
          monthName = months[trackDate.getUTCMonth()];
          dayNum = trackDate.getUTCDate();
        }
        dateInfoDiv.textContent = `${dayName}, ${monthName} ${dayNum}`;
      }
    });

    // Update labels in toggle header
    document.querySelectorAll('.timing-label').forEach(el => {
      if (el.textContent.toLowerCase() === this.timingMode) el.classList.add('active');
      else el.classList.remove('active');
    });
  },
  setAccentColor(series) {
    const root = document.documentElement;
    if (series === 'f1') {
      root.style.setProperty('--accent', 'var(--f1-red)');
      root.style.setProperty('--accent-glow', 'var(--f1-red-glow)');
    } else {
      root.style.setProperty('--accent', 'var(--motogp-orange)');
      root.style.setProperty('--accent-glow', 'var(--motogp-orange-glow)');
    }
  },

  // ----- Date Helpers -----
  getRaceEndDate(dateRange) {
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const parts = dateRange.split(/[–-]/);
    const startParts = parts[0].trim().split(' ');
    const startMonth = startParts[0];
    let endMonth = startMonth, endDay;
    const endStr = parts[1].trim();
    if (endStr.includes(' ')) {
      const ep = endStr.split(' ');
      endMonth = ep[0]; endDay = parseInt(ep[1]);
    } else {
      endDay = parseInt(endStr);
    }
    return new Date(2026, months[endMonth], endDay, 23, 59);
  },
  getRaceStartDate(dateRange) {
    const months = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    const parts = dateRange.split(/[–-]/);
    const sp = parts[0].trim().split(' ');
    return new Date(2026, months[sp[0]], parseInt(sp[1]));
  },
  getRaceStatus(race) {
    const today = new Date();
    
    // Priority 1: Check live completion data from F1 API — this is the "End of Race" trigger!
    if (this.currentSeries === 'f1' && this.liveF1RacesCompleted && 
        this.liveF1RacesCompleted.includes(race.name.replace(' Grand Prix', ''))) {
      return 'completed';
    }

    // Priority 2: If we have podium data (manual entry), it's definitely finished!
    if (race.podium && race.podium.length >= 3) return 'completed';
    
    // Accurate status based on actual session UTC times
    if (race.sessions && race.sessions.length > 0) {
      const lastSession = race.sessions[race.sessions.length - 1];
      if (lastSession.utc) {
        const raceTime = new Date(lastSession.utc);
        // Mark as completed 2 hours after the race starts
        const completedTime = new Date(raceTime.getTime() + 2 * 60 * 60 * 1000);
        
        const firstSession = race.sessions[0];
        const startTime = firstSession.utc ? new Date(firstSession.utc) : this.getRaceStartDate(race.dateRange);
        
        if (today > completedTime) return 'completed';
        if (today >= startTime) return 'live';
        return 'upcoming';
      }
    }

    // Fallback to day-based logic if sessions are missing (legacy or backup)
    const start = this.getRaceStartDate(race.dateRange);
    const end = this.getRaceEndDate(race.dateRange);
    if (today > end) return 'completed';
    if (today >= start && today <= end) return 'live';
    return 'upcoming';
  },
  formatLocalTime(utcString) {
    if (!utcString) return '--:--';
    const d = new Date(utcString);
    if (isNaN(d.getTime())) return '--:--';
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  },

  getTrackTime(utc, location) {
    if (!utc) return '--:--';
    const offset = this.trackOffsets[location] || 0;
    const d = new Date(utc);
    if (isNaN(d.getTime())) return '--:--';

    const trackDate = new Date(d.getTime() + (offset * 60 * 60 * 1000));
    const h = String(trackDate.getUTCHours()).padStart(2, '0');
    const m = String(trackDate.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
  },
  getTimezoneAbbr() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Map common IST names to abbreviated label
      if (tz === 'Asia/Calcutta' || tz === 'Asia/Kolkata') return 'IST';
      // Return the city/region name cleaned up
      return tz.split('/').pop().replace('_', ' ');
    } catch (e) {
      return 'Local Time';
    }
  },
  getNextRound(races) {
    for (const r of races) {
      const s = this.getRaceStatus(r);
      if (s === 'upcoming' || s === 'live') return r.round;
    }
    return null;
  },

  // ----- Flag URL -----
  getFlagUrl(country) {
    const code = countryToCode[country] || 'un';
    return `https://flagcdn.com/w80/${code}.png`;
  },
  getNatFlagUrl(code) {
    if (!code) return '';
    return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  },

  // ----- Track Image -----
  getTrackSvg(circuit, color) {
    const slug = circuitImageMap[circuit];
    if (!slug) return '';
    const url = CIRCUIT_SVG_BASE + slug + '.svg';
    return `<div class="track-svg-wrap"><img src="${url}" alt="Track" style="width:80px;height:55px;object-fit:contain;opacity:0.7" loading="lazy"></div>`;
  },

  // ----- Races -----
  showRaces(skipHistory = false) {
    console.log("showRaces called, series:", this.currentSeries);
    try {
      if (!skipHistory) this.pushHistory('landing-view');
      const races = this.currentSeries === 'f1' ? f1Races : motogpRaces;
      const title = this.currentSeries === 'f1' ? '2026 RACES' : '2026 RACES';
      document.getElementById('calendar-title').textContent = title;
      this.renderRaceGrid(races);
      this.showView('calendar-view');
      console.log("showRaces completed successfully.");
    } catch (e) {
      console.error("showRaces failed:", e);
    }
  },

  renderRaceGrid(races) {
    const grid = document.getElementById('race-grid');
    const accentColor = this.currentSeries === 'f1' ? '#e10600' : '#ff6a00';
    const gradient = this.currentSeries === 'f1' ? 'var(--f1-gradient)' : 'var(--motogp-gradient)';
    const nextRound = this.getNextRound(races);

    grid.innerHTML = races.map((race, i) => {
      const status = this.getRaceStatus(race);
      const isNext = race.round === nextRound;
      const statusClass = status === 'completed' ? 'completed-race' : (isNext ? 'next-race' : '');
      const cancelClass = race.isCancelled ? 'cancelled-race' : '';

      const trackSvg = this.getTrackSvg(race.circuit, accentColor);
      const sprintLabel = (race.isSprint && this.currentSeries === 'f1') ? ' &middot; <span style="color:var(--accent);font-weight:600">SPRINT WEEKEND</span>' : '';

      let podiumHtml = '';
      if (status === 'completed' && race.podium && race.podium.length === 3) {
        podiumHtml = `
          <div class="race-podium">
            <span class="podium-pos">1</span> ${race.podium[0]} &nbsp;&nbsp; 
            <span class="podium-pos">2</span> ${race.podium[1]} &nbsp;&nbsp; 
            <span class="podium-pos">3</span> ${race.podium[2]}
          </div>`;
      }

      return `
        <div class="race-card ${statusClass} ${cancelClass}" onclick="app.showRaceDetail(${race.round})" style="animation-delay:${i * 0.04}s;position:relative" id="race-card-${race.round}">
          <div class="race-card-header">
            <div>
              <div class="race-round">Round ${race.round}${sprintLabel}${race.isCancelled ? ' · <span style="color:#ff3232;font-weight:700">CANCELLED</span>' : ''}</div>
              <div class="race-name">${race.name}</div>
              <div class="race-circuit">${race.circuit}</div>
            </div>
            <div style="text-align:center">
              <img class="flag-img" src="${this.getFlagUrl(race.country)}" alt="${race.country}" loading="lazy">
            </div>
          </div>
          <div class="race-date">${race.dateRange}</div>
          ${podiumHtml}
          ${trackSvg}
          <div class="race-card-accent" style="background:${gradient}"></div>
        </div>`;
    }).join('');
  },

  // ----- Race Detail -----
  showRaceDetail(round) {
    // Save current scroll position before leaving the calendar
    this.calendarScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    this.pushHistory('calendar-view');
    this.currentRound = round;
    const races = this.currentSeries === 'f1' ? f1Races : motogpRaces;
    const race = races.find(r => r.round === round);
    if (!race) return;

    // document.getElementById('detail-title').textContent = race.name.toUpperCase();
    this.updateHeaderLogos();
    const glowColor = this.currentSeries === 'f1' ? 'var(--f1-red)' : 'var(--motogp-orange)';
    const accentColor = this.currentSeries === 'f1' ? '#e10600' : '#ff6a00';
    const badgeClass = this.currentSeries === 'f1' ? 'f1-sprint-badge' : 'motogp-sprint-badge';

    // Remove day groups logic as per user request to flatten layout
    const trackSlug = circuitImageMap[race.circuit];
    const trackHtml = trackSlug ? `<div style="margin-top:16px;opacity:0.4"><img src="${CIRCUIT_SVG_BASE}${trackSlug}.svg" alt="Track" style="width:200px;height:80px;object-fit:contain" loading="lazy"></div>` : '';

    const headerHtml = `
      <div class="header">
        <div class="header-inner">
          <div class="header-left">
            <button class="back-btn" onclick="app.goBack()">
              <img src="resources/arrow.png" class="back-icon" alt="Back">
            </button>
          </div>
          <div class="header-center">
            <div id="detail-header-logo"></div>
            <h1 class="view-title">${race.name.toUpperCase()}</h1>
          </div>
          <div class="header-right">
            <button class="menu-btn" onclick="app.toggleMenu(event)">⋮</button>
          </div>
        </div>
      </div>`;

    let html = `
      <div class="detail-hero" data-location="${race.location}">
        <div class="detail-hero-glow" style="background:${glowColor}"></div>
        <div class="detail-top-nav">
            <img class="flag-img" src="${this.getFlagUrl(race.country)}" alt="${race.country}" style="width:50px;height:35px">
            <div class="timing-toggle-container">
                <span class="timing-label ${this.timingMode === 'local' ? 'active' : ''}">Local</span>
                <label class="switch">
                    <input type="checkbox" ${this.timingMode === 'track' ? 'checked' : ''} onchange="app.toggleTimingMode()">
                    <span class="slider round"></span>
                </label>
                <span class="timing-label ${this.timingMode === 'track' ? 'active' : ''}">Track</span>
            </div>
        </div>
        <h2 style="text-transform:none; color:white;">${race.name}</h2>
        <p>${race.circuit} · ${race.location}</p>
        <p style="margin-top:8px;color:var(--text-muted)">Round ${race.round} · ${race.dateRange}${race.isCancelled ? ' · <span style="color:#ff3232;font-weight:700">CANCELLED</span>' : ''}</p>
        ${trackHtml}
      </div>
      <div class="session-flattened-list">`;

    race.sessions.forEach(s => {
      const d = new Date(s.utc);
      const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      let dayName, monthName, dayNum;
      if (this.timingMode === 'local') {
        dayName = weekDays[d.getDay()];
        monthName = months[d.getMonth()];
        dayNum = d.getDate();
      } else {
        const offset = this.trackOffsets[race.location] || 0;
        const trackDate = new Date(d.getTime() + (offset * 60 * 60 * 1000));
        dayName = weekDays[trackDate.getUTCDay()];
        monthName = months[trackDate.getUTCMonth()];
        dayNum = trackDate.getUTCDate();
      }
      const formattedDate = `${dayName}, ${monthName} ${dayNum}`;
      const nameLower = s.name.toLowerCase();
      const isRace = nameLower.includes('race') && !nameLower.includes('sprint');
      const isQuali = nameLower.includes('qualif');
      const isSprint = nameLower.includes('sprint');
      const isPractice = nameLower.includes('practice') || nameLower.includes('fp');

      let dotColor = accentColor + '40';
      if (isRace) dotColor = accentColor;
      else if (isQuali) dotColor = '#ffd700';
      else if (isSprint) dotColor = '#ff44ff';
      else if (isPractice) dotColor = '#3498db';

      // Check if this individual session has already happened
      // months mapping moved to outer loop scope
      const dateParts = s.date.split(' ');
      const sMonth = months[dateParts[0]];
      const sDay = parseInt(dateParts[1]);
      let sHour = 0, sMin = 0;
      // No AM/PM parsing needed anymore since we use UTC methods

      // Check if this individual session has already happened using UTC
      // Updated logic: Qualy/Sprint results appear after 1 hour, Race after 2 hours
      const sessionDate = s.utc ? new Date(s.utc) : null;
      const bufferMs = (isQuali || isSprint) ? 60 * 60 * 1000 : 2 * 60 * 60 * 1000;
      const sessionEnd = sessionDate ? new Date(sessionDate.getTime() + bufferMs) : null;
      const sessionHappened = sessionEnd ? new Date() > sessionEnd : false;

      // Result identification for modal — only for completed non-practice sessions
      let resultsBtn = '';
      // Force results to show for MotoGP 2026 if data exists, otherwise use standard clock logic
      if (this.currentSeries === 'f1' && sessionHappened && !isPractice) {
        const type = isRace ? 'race' : (isSprint ? (nameLower.includes('qual') ? 'sprint_qual' : 'sprint') : (isQuali ? 'qualifying' : ''));
        if (type) {
          resultsBtn = `<div style="display:flex;gap:6px;align-items:center">`;
          resultsBtn += `<button class="results-btn" onclick="event.stopPropagation(); app.showSessionResults(${race.round}, '${type}', '${s.name}')">Results</button>`;
          if (type === 'qualifying' || type === 'sprint_qual') {
            resultsBtn += `<button class="results-btn grid-btn" onclick="event.stopPropagation(); app.showGridOrder(${race.round}, '${type}', '${s.name}')">Grid</button>`;
          }
          resultsBtn += `</div>`;
        }
      }

      const localTime = this.formatLocalTime(s.utc);
      const tz = this.getTimezoneAbbr();

      const displayTime = this.timingMode === 'local' ? localTime : this.getTrackTime(s.utc, race.location);

      html += `
          <div class="session-item" data-utc="${s.utc}">
            <div class="session-item-left">
              <div class="session-dot" style="background:${dotColor}"></div>
              <div class="session-info-content">
                <div class="session-name ${isRace ? 'race-session' : ''}">${s.name}</div>
                <div class="session-card-info">${formattedDate}</div>
                <div class="session-time">
                    <span class="time-val">${displayTime}</span> 
                    <span class="time-label-suffix">${this.timingMode === 'local' ? tz : 'TRACK'}</span>
                </div>
              </div>
            </div>
            ${resultsBtn}
          </div>`;
    });
    html += '</div>';

    document.getElementById('race-detail-view').innerHTML = headerHtml + `<div id="race-detail-content" class="detail-content">${html}</div>`;
    this.showView('race-detail-view');
    this.updateHeaderLogos();
  },

  // ----- Standings -----
  showStandings(skipHistory = false) {
    if (!skipHistory) this.pushHistory('landing-view'); // Standard back is now landing-view
    const title = this.currentSeries === 'f1' ? '2026 STANDINGS' : '2026 STANDINGS';
    document.getElementById('standings-title').textContent = title;
    this.renderStandingsTabs();
    this.showView('standings-view');

    if (this.currentSeries === 'f1' && !this.liveF1DriverStandings) {
      this.loadLiveF1Standings();
    }
  },
  renderStandingsTabs() {
    const tabsEl = document.getElementById('standings-tabs');
    let tabs;
    if (this.currentSeries === 'f1') {
      tabs = [
        { id: 'drivers', label: 'Drivers' },
        { id: 'master-drivers', label: 'Master Drivers' },
        { id: 'teams', label: 'Constructors' },
        { id: 'master-teams', label: 'Master Const.' }
      ];
    } else {
      tabs = [
        { id: 'riders', label: 'Riders' },
        { id: 'master-riders', label: 'Master Riders' },
        { id: 'teams', label: 'Teams' },
        { id: 'constructors', label: 'Constructors' }
      ];
    }
    tabsEl.innerHTML = tabs.map((t, i) =>
      `<button class="standings-tab ${i === 0 ? 'active' : ''}" onclick="app.switchStandingsTab('${t.id}',this)" id="tab-${t.id}">${t.label}</button>`
    ).join('');
    this.switchStandingsTab(tabs[0].id, tabsEl.querySelector('.standings-tab'));
  },
  switchStandingsTab(tabId, btnEl) {
    document.querySelectorAll('.standings-tab').forEach(t => t.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.renderStandingsTable(tabId);
  },
  // ----- Team Logo URLs -----
  getTeamLogoUrl(teamName) {
    const teamLogos = {
      // F1 Teams
      'Mercedes': 'https://logo.clearbit.com/mercedesamgf1.com',
      'Red Bull Racing': 'https://logo.clearbit.com/redbullracing.com',
      'Ferrari': 'https://logo.clearbit.com/ferrari.com',
      'McLaren': 'https://logo.clearbit.com/mclaren.com',
      'Aston Martin': 'https://logo.clearbit.com/astonmartinf1.com',
      'Alpine': 'https://logo.clearbit.com/alpinecars.com',
      'Williams': 'https://logo.clearbit.com/williamsf1.com',
      'Racing Bulls': 'https://logo.clearbit.com/visacashapprb.com',
      'Sauber': 'https://logo.clearbit.com/sauber-group.com',
      'Haas': 'https://logo.clearbit.com/haasf1team.com',
      'Audi': 'https://logo.clearbit.com/audi.com',
      'Cadillac': 'https://logo.clearbit.com/cadillac.com',
      // MotoGP Teams/Constructors
      'Ducati': 'https://logo.clearbit.com/ducati.com',
      'Aprilia': 'https://logo.clearbit.com/aprilia.com',
      'KTM': 'https://logo.clearbit.com/ktm.com',
      'Yamaha': 'https://logo.clearbit.com/yamaha-motor.com',
      'Honda': 'https://logo.clearbit.com/honda.com',
    };
    // Try exact match first, then partial
    if (teamLogos[teamName]) return teamLogos[teamName];
    const key = Object.keys(teamLogos).find(k => teamName.toLowerCase().includes(k.toLowerCase()));
    return key ? teamLogos[key] : null;
  },

  renderStandingsTable(tabId) {
    const content = document.getElementById('standings-content');
    let data, isTeam = false, isMaster = false, masterType = '';
    if (this.currentSeries === 'f1') {
      if (tabId === 'drivers') { data = this.liveF1DriverStandings || f1DriverStandings; }
      else if (tabId === 'master-drivers') { data = this.liveF1DriverStandings || f1DriverStandings; isMaster = true; masterType = 'driver'; }
      else if (tabId === 'master-teams') { data = this.liveF1TeamStandings || f1TeamStandings; isMaster = true; isTeam = true; masterType = 'team'; }
      else { data = this.liveF1TeamStandings || f1TeamStandings; isTeam = true; }
    } else {
      // ChatGPT logic for MotoGP tabs
      if (tabId === 'riders') {
        data = this.liveMotoGPRiderStandings || motogpRiderStandings;
      } else if (tabId === 'master-riders') {
        data = this.liveMotoGPRiderStandings || motogpRiderStandings;
        isMaster = true;
        masterType = 'rider';
      } else if (tabId === 'teams') {
        data = this.liveMotoGPTeamStandings || motogpTeamStandings;
        isTeam = true;
      } else {
        data = this.liveMotoGPConstructorStandings || motogpConstructorStandings;
        isTeam = true;
      }
    }
    const maxPts = Math.max(1, ...(data.map(d => d.points)));
    const accentColor = this.currentSeries === 'f1' ? '#e10600' : '#ff6a00';

    if (isMaster) {
      // ===== MASTER MATRIX STANDINGS =====
      const allSeriesRaces = this.currentSeries === 'f1' ? f1Races : motogpRaces;
      const racesCompleted = allSeriesRaces.filter(r => (r.podium && r.podium.length > 0) || r.isCancelled).length;
      const activeRaces = allSeriesRaces; // Render full season grid but with completed data

      const cMatrix = this.currentSeries === 'f1'
        ? (masterType === 'team' ? this.liveF1TeamMaster : this.liveF1DriverMaster)
        : null;

      const isMotoGP = this.currentSeries === 'motogp';
      let html = `<div class="matrix-container ${isMotoGP ? 'motogp-matrix' : ''}"><div class="matrix-header-row">
        <div class="mc-fixed">
          <span style="display:inline-block;width:32px;text-align:center">#</span>
          <span style="display:inline-block;width:38px"></span>
          <span>${isTeam ? 'TEAM' : 'DRIVER'}</span>
        </div>
        <div class="mc-pts">PTS</div>`;

      // Dynamic Headers (Race abbreviations)
      const raceAbbrevMap = {
        'Australian': 'AUS', 'Chinese': 'CHN', 'Japanese': 'JPN', 'Bahrain': 'BRN',
        'Saudi Arabian': 'SAU', 'Miami': 'MIA', 'Emilia Romagna': 'EMI', 'Canadian': 'CAN',
        'Monaco': 'MON', 'Spanish': 'ESP', 'Austrian': 'AUT', 'British': 'GBR',
        'Belgian': 'BEL', 'Hungarian': 'HUN', 'Dutch': 'NED', 'Dutch TT': 'NED',
        'Italian': 'ITA', 'Azerbaijan': 'AZB', 'Singapore': 'SIN', 'United States': 'USA',
        'Mexico City': 'MEX', 'São Paulo': 'BRA', 'Las Vegas': 'LAS', 'Qatar': 'QAT',
        'Abu Dhabi': 'ARE', 'Thailand': 'THA', 'Grand Prix of Brazil': 'BRA', 'Americas': 'AME',
        'Argentine': 'ARG', 'French': 'FRA', 'Catalan': 'CAT', 'Kazakhstan': 'KAZ',
        'German': 'GER', 'Aragon': 'ARA', 'San Marino': 'SMR', 'Indonesian': 'INA',
        'Malaysian': 'MAL', 'Portuguese': 'POR', 'Valencia': 'VAL'
      };

      html += activeRaces.map(r => {
        const cleanName = r.name.replace(' Grand Prix', '').trim();
        const short = raceAbbrevMap[cleanName] || cleanName.substring(0, 3).toUpperCase();
        const cancelClass = r.isCancelled ? 'mc-header-cancelled' : '';
        const title = r.isCancelled ? `${r.name} (CANCELLED)` : r.name;
        return `<div class="mc-race-header ${cancelClass}" title="${title}">${short}</div>`;
      }).join('');
      html += `</div>`; // end header row

      data.forEach(entry => {
        let entryNat = entry.nat;
        if (!entryNat && this.currentSeries === 'motogp') {
          // Lookup nationality from the base data.js standings for live API entries
          // We normalize names (removing accents) for better matching
          const normalize = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
          const targetName = normalize(entry.name);
          const refRider = motogpRiderStandings.find(r => {
            const rName = normalize(r.name);
            return rName === targetName || targetName.includes(rName) || rName.includes(targetName);
          });
          if (refRider) entryNat = refRider.nat;
        }

        const flagOrLogoHtml = isTeam
          ? `<img src="${this.getTeamLogoUrl(entry.name) || ''}" style="height:18px;max-width:30px;object-fit:contain;filter:brightness(0) invert(1)" onerror="this.style.display='none'">`
          : `<img src="${this.getNatFlagUrl(entryNat)}" alt="" style="width:24px;height:16px;object-fit:cover;border-radius:2px">`;

        let tColor = entry.color || accentColor;
        if (!isTeam && entry.team) {
          const teamCol = this.currentSeries === 'f1' ? f1TeamStandings : motogpTeamStandings;
          const tData = teamCol.find(t => t.name === entry.team || entry.team.includes(t.name) || t.name.includes(entry.team));
          if (tData && tData.color) tColor = tData.color;
        }

        const posNum = parseInt(entry.pos);
        const posColor = posNum === 1 ? '#FFD700' : (posNum === 2 ? '#C0C0C0' : (posNum === 3 ? '#CD7F32' : 'var(--text-muted)'));

        html += `<div class="matrix-row" style="--team-color:${tColor}">
          <div class="mc-fixed" style="border-left:3px solid var(--team-color)">
            <span style="font-weight:800;color:${posColor};width:32px;text-align:center">${entry.pos}</span>
            <span style="margin-right:8px;display:flex;align-items:center;width:30px;justify-content:center">${flagOrLogoHtml}</span>
            <span style="font-weight:700;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${entry.name}</span>
          </div>
          <div class="mc-pts">${entry.points}</div>`;

        let ptsArr = [];
        if (this.currentSeries === 'motogp') {
          // Build actual points sequence for MotoGP from stored event results
          ptsArr = activeRaces.map(race => {
            const results = this.liveMotoGPEventResults[`${race.round}_race`];
            if (results) {
              const riderRes = results.find(r => r.name === entry.name || entry.name.includes(r.name) || r.name.includes(entry.name));
              return riderRes ? (riderRes.points || '0') : '0';
            }
            return '-'; // Not happened yet
          });
        } else {
          // generate mock points if no matrix is available (Fallback/F1 legacy)
          ptsArr = new Array(activeRaces.length).fill('0');
          let ptsLeft = entry.points;
          // Distribute points among first few races (completed)
          const numCompleted = racesCompleted || 5;
          for (let i = 0; i < numCompleted; i++) {
            if (i === numCompleted - 1) { ptsArr[i] = ptsLeft.toString(); break; }
            const slice = Math.floor(Math.random() * (ptsLeft / (numCompleted - i)) * 1.5);
            ptsArr[i] = slice.toString();
            ptsLeft -= slice;
          }
          // The rest stay '0'
        }

        ptsArr.forEach(p => {
          const isZero = p === '0' || p === '-';
          html += `<div class="mc-race ${isZero ? 'zero' : ''}">${p}</div>`;
        });
        html += `</div>`; // end row
      });
      html += `</div>`; // end container
      content.innerHTML = html;
    } else if (isTeam) {
      // ===== TEAM/CONSTRUCTOR STANDINGS (like reference image) =====
      let html = `<div class="standings-header-row">
        <span class="sh-pos">#</span><span class="sh-team">TEAM</span>
        <span class="sh-drivers">DRIVERS</span><span class="sh-pts">POINTS</span>
      </div>`;

      data.forEach(entry => {
        const logoUrl = this.getTeamLogoUrl(entry.name);
        const logoHtml = `<span style="display:inline-block;width:30px;text-align:center;margin-right:8px;vertical-align:middle">${logoUrl ? `<img src="${logoUrl}" alt="" style="height:22px;max-width:100%;object-fit:contain;filter:brightness(0) invert(1)" onerror="this.style.display='none'">` : ''}</span>`;
        const barWidth = maxPts > 0 ? Math.round((entry.points / maxPts) * 100) : 0;
        const drivers = entry.drivers || [];
        const posNum = parseInt(entry.pos);
        const posClass = posNum === 1 ? 'pos-1' : (posNum === 2 ? 'pos-2' : (posNum === 3 ? 'pos-3' : ''));

        // Lookup color for teams if missing (live data)
        let tColor = entry.color || accentColor;
        if (!entry.color && this.currentSeries === 'motogp') {
          const name = entry.name.toLowerCase();
          if (name.includes('ducati')) tColor = '#cc0000';
          else if (name.includes('yamaha')) tColor = '#0000ab';
          else if (name.includes('aprilia')) tColor = '#333';
          else if (name.includes('ktm') || name.includes('gasgas')) tColor = '#ff6600';
          else if (name.includes('honda')) tColor = '#ffcf00';
          else if (name.includes('vr46')) tColor = '#dafe05';
          else if (name.includes('pramac')) tColor = '#800080';
          else if (name.includes('gresini')) tColor = '#8ba8e0';
        }

        html += `<div class="standings-row ${posClass}" style="border-left:3px solid ${tColor}">
          <div class="sr-pos">${entry.pos}</div>
          <div class="sr-team">${logoHtml}<span>${entry.name}</span></div>
          <div class="sr-drivers">
            ${drivers.map(d => `<div class="sr-driver-name">${d}</div>`).join('')}
          </div>
          <div class="sr-pts">
            <span class="sr-pts-num">${entry.points}</span>
            <div class="sr-pts-bar" style="width:${barWidth}%;background:${tColor}"></div>
          </div>
        </div>`;
      });
      content.innerHTML = html;
    } else {
      // ===== DRIVER/RIDER STANDINGS =====
      let html = `<div class="standings-header-row">
        <span class="sh-pos">#</span><span class="sh-driver">DRIVER</span>
        <span class="sh-team2">TEAM</span><span class="sh-pts">POINTS</span>
      </div>`;

      data.forEach(entry => {
        const logoUrl = this.getTeamLogoUrl(entry.team);
        const logoHtml = `<span style="display:inline-block;width:26px;text-align:center;margin-right:6px;vertical-align:middle">${logoUrl ? `<img src="${logoUrl}" alt="" style="height:18px;max-width:100%;object-fit:contain;filter:brightness(0) invert(1)" onerror="this.style.display='none'">` : ''}</span>`;
        const barWidth = maxPts > 0 ? Math.round((entry.points / maxPts) * 100) : 0;
        const posNum = parseInt(entry.pos);
        const posClass = posNum <= 3 ? `top3 pos-${posNum}` : '';

        // Find team color
        let tColor = accentColor;
        const teamCol = this.currentSeries === 'f1' ? f1TeamStandings : motogpTeamStandings;
        const tData = teamCol.find(t => t.name === entry.team || entry.team.includes(t.name) || t.name.includes(entry.team));
        if (tData && tData.color) tColor = tData.color;

        const natFlagUrl = this.getNatFlagUrl(entry.nat);
        const natHtml = natFlagUrl ? `<img src="${natFlagUrl}" alt="${entry.nat}" style="width:20px;height:14px;border-radius:2px;margin-right:6px;vertical-align:middle">` : '';

        html += `<div class="standings-row ${posClass}" style="border-left:3px solid ${tColor}">
          <div class="sr-pos">${entry.pos}</div>
          <div class="sr-driver-main">
            ${natHtml}
            <span class="sr-name">${entry.name ? entry.name.replace(' ', '<br>') : ''}</span>
          </div>
          <div class="sr-team2">${logoHtml}<span>${entry.team}</span></div>
          <div class="sr-pts">
            <span class="sr-pts-num">${entry.points}</span>
            <div class="sr-pts-bar" style="width:${barWidth}%;background:${tColor}"></div>
          </div>
        </div>`;
      });
      content.innerHTML = html;
    }
  },

  // ----- Live API Integration -----
  liveF1DriverStandings: null,
  liveF1TeamStandings: null,
  liveMotoGPRiderStandings: null,
  liveMotoGPTeamStandings: null,
  liveMotoGPConstructorStandings: null,
  liveMotoGPEventResults: {},

  async loadLiveMotoGPData() {
    try {
      const seasonUuid = 'e88b4e43-2209-47aa-8e83-0e0b1cedde6e';
      const categoryUuid = 'e8c110ad-64aa-4e8e-8a86-f2f152f6a942';

      // 1. Rider Standings
      const res = await fetch(`https://api.pulselive.motogp.com/motogp/v2/results/world-standings?type=rider&season=${seasonUuid}&category=${categoryUuid}`);
      if (res.ok) {
        const data = await res.json();
        if (data.classification && data.classification.rider) {
          this.liveMotoGPRiderStandings = data.classification.rider.map(r => ({
            pos: r.position,
            name: r.rider.full_name,
            team: r.team_name,
            points: r.points,
            nat: r.rider.country ? r.rider.country.iso.toLowerCase() : 'un',
            wins: r.race_wins,
            podiums: r.podiums
          }));
        }
      }

      // 2. Team Standings
      const teamRes = await fetch(`https://api.pulselive.motogp.com/motogp/v2/results/world-standings?type=team&season=${seasonUuid}&category=${categoryUuid}`);
      if (teamRes.ok) {
        const tData = await teamRes.json();
        if (tData.classification && tData.classification.team) {
          this.liveMotoGPTeamStandings = tData.classification.team.map(r => ({
            pos: r.position,
            name: r.team.name,
            points: r.points
          }));
        }
      }

      // 3. Constructor Standings
      const consRes = await fetch(`https://api.pulselive.motogp.com/motogp/v2/results/world-standings?type=constructor&season=${seasonUuid}&category=${categoryUuid}`);
      if (consRes.ok) {
        const cData = await consRes.json();
        if (cData.classification && cData.classification.constructor) {
          this.liveMotoGPConstructorStandings = cData.classification.constructor.map(r => ({
            pos: r.position,
            name: r.constructor.name,
            points: r.points
          }));
        }
      }

      // 4. Results Matrix (THA, BRA)
      const sessionMap = {
        '1_race': '656efa33-5c39-4d93-b8ef-8b669fdbec05',
        '1_sprint race': 'd3e62405-3f19-40db-99f7-a8c943032512',
        '2_race': '59d15875-e818-47a4-996b-f15506292542',
        '2_sprint race': '15a6238d-5d02-4e90-9215-7d5c01d102e3'
      };

      for (const [key, uuid] of Object.entries(sessionMap)) {
        try {
          const sRes = await fetch(`https://api.pulselive.motogp.com/motogp/v2/results/classifications?session=${uuid}&test=false`);
          if (sRes.ok) {
            const sData = await sRes.json();
            if (sData && sData.classification) {
              this.liveMotoGPEventResults[key] = sData.classification.map(r => ({
                pos: r.position,
                name: r.rider.full_name,
                team: r.team_name,
                points: r.points || '0'
              }));
            }
          }
        } catch (err) { console.warn(`Results fetch failed for ${uuid}`); }
      }

      console.log("MotoGP Official Live Data Loaded.");
      const stView = document.getElementById('standings-view');
      if (stView && stView.classList.contains('active') && this.currentSeries === 'motogp') {
        const activeTab = document.querySelector('.standing-tab.active');
        if (activeTab) this.renderStandingsTable(activeTab.dataset.tab);
      }
    } catch (e) {
      console.warn("Could not load official MotoGP data", e);
    }
  },

  parseMotoGPResultTable(str) {
    // Extract the top part of the result string (before the dashes)
    const topPart = str.split(/[-]{10,}/)[0];
    const rows = topPart.split(/\r?\n/).filter(r => /^\d+/.test(r.trim()));
    return rows.map(r => {
      const cols = r.split(/\t+|\s{2,}/).map(c => c.replace(/\//g, '').trim());
      return {
        pos: cols[0],
        name: cols[1],
        team: cols[2],
        time: cols[3],
        points: cols[4] || ''
      };
    });
  },

  parseMotoGPStandings(str) {
    // Find the header then take rows after it
    const lines = str.split(/\r?\n/);
    const rows = lines.filter(r => /^\d+/.test(r.trim()));
    return rows.map(r => {
      const cols = r.split(/\t+|\s{2,}/).map(c => c.replace(/\//g, '').trim());
      return {
        pos: parseInt(cols[0]),
        name: cols[1],
        team: cols[2],
        points: parseFloat(cols[3])
      };
    });
  },

  async loadLiveF1Standings() {
    try {
      const dRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/driverStandings.json?t=${Date.now()}`);
      const tRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/constructorStandings.json?t=${Date.now()}`);
      if (!dRes.ok || !tRes.ok) return;
      const dData = await dRes.json();
      const tData = await tRes.json();

      const dList = dData.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      const tList = tData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

      const ergastNat = {
        'British': 'gb', 'Italian': 'it', 'Monegasque': 'mc', 'French': 'fr',
        'Dutch': 'nl', 'New Zealander': 'nz', 'Australian': 'au', 'Spanish': 'es',
        'Brazilian': 'br', 'Argentine': 'ar', 'German': 'de', 'Thai': 'th',
        'Canadian': 'ca', 'Finnish': 'fi', 'Mexican': 'mx', 'Chinese': 'cn',
        'American': 'us', 'Japanese': 'jp', 'Danish': 'dk'
      };

      let liveDrivers = dList.map(d => {
        let team = d.Constructors[0] ? d.Constructors[0].name : 'Unknown';
        if (team === 'RB F1 Team' || team === 'RB') team = 'Racing Bulls';
        if (team === 'Kick Sauber') team = 'Sauber';
        if (team === 'Alpine F1 Team') team = 'Alpine';
        return {
          pos: parseInt(d.position),
          name: this.sanitizeDriverName(`${d.Driver.givenName} ${d.Driver.familyName}`),
          team: team,
          points: parseFloat(d.points),
          nat: ergastNat[d.Driver.nationality] || 'un'
        };
      });

      let liveTeams = tList.map(t => {
        let teamName = t.Constructor.name;
        if (teamName === 'RB F1 Team' || teamName === 'RB') teamName = 'Racing Bulls';
        if (teamName === 'Kick Sauber') teamName = 'Sauber';
        if (teamName === 'Alpine F1 Team') teamName = 'Alpine';

        const drivers = liveDrivers.filter(d => d.team === teamName).map(d => d.name);
        // Find color from fallback data
        const standings = typeof f1TeamStandings !== 'undefined' ? f1TeamStandings : [];
        const fallbackTeam = standings.find(ft => ft.name === teamName || ft.name.includes(teamName) || teamName.includes(ft.name));
        const color = fallbackTeam ? fallbackTeam.color : '#ffffff';

        return {
          pos: parseInt(t.position),
          name: teamName,
          points: parseFloat(t.points),
          color: color,
          drivers: drivers
        };
      });

      this.liveF1DriverStandings = liveDrivers;
      this.liveF1TeamStandings = liveTeams;

      try {
        const rRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/results.json?limit=1000&t=${Date.now()}`);
        const sRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/sprint.json?limit=1000&t=${Date.now()}`);

        if (rRes.ok) {
          const rData = await rRes.json();
          const races = (rData.MRData && rData.MRData.RaceTable && rData.MRData.RaceTable.Races) ? rData.MRData.RaceTable.Races : [];

          let sprints = [];
          if (sRes.ok) {
            const sData = await sRes.json();
            sprints = (sData.MRData && sData.MRData.RaceTable && sData.MRData.RaceTable.Races) ? sData.MRData.RaceTable.Races : [];
          }

          const driverMatrix = {};
          const teamMatrix = {};

          const totalF1Races = f1Races.length;
          liveDrivers.forEach(d => driverMatrix[d.name] = new Array(totalF1Races).fill('-'));
          liveTeams.forEach(t => teamMatrix[t.name] = new Array(totalF1Races).fill('-'));

          races.forEach((r, idx) => {
            const roundNum = parseInt(r.round);
            const f1RaceIndex = f1Races.findIndex(x => x.round === roundNum || x.name === r.raceName);
            const targetIdx = f1RaceIndex !== -1 ? f1RaceIndex : idx;
            const f1Race = f1RaceIndex !== -1 ? f1Races[f1RaceIndex] : null;

            // Podiums
            if (f1Race && r.Results && r.Results.length >= 3) {
              const top3 = r.Results.slice(0, 3).map(res => res.Driver.code || res.Driver.familyName.substring(0, 3).toUpperCase());
              f1Race.podium = top3;
            }

            // Points
            const teamRacePts = {};
            if (r.Results) {
              r.Results.forEach(res => {
                const driverName = this.sanitizeDriverName(`${res.Driver.givenName} ${res.Driver.familyName}`);
                let tName = res.Constructor.name;
                if (tName === 'RB F1 Team' || tName === 'RB') tName = 'Racing Bulls';
                if (tName === 'Kick Sauber') tName = 'Sauber';
                if (tName === 'Alpine F1 Team') tName = 'Alpine';

                let pts = parseFloat(res.points);

                // Add sprint round points if they exist
                const sRace = sprints.find(sr => sr.round === r.round);
                if (sRace && sRace.SprintResults) {
                  const sResDriver = sRace.SprintResults.find(srd => `${srd.Driver.givenName} ${srd.Driver.familyName}` === driverName);
                  if (sResDriver) pts += parseFloat(sResDriver.points);
                }

                if (driverMatrix[driverName]) {
                  driverMatrix[driverName][targetIdx] = pts > 0 ? pts.toString() : '0';
                }

                teamRacePts[tName] = (teamRacePts[tName] || 0) + pts;
              });

              Object.keys(teamRacePts).forEach(tName => {
                if (teamMatrix[tName]) teamMatrix[tName][targetIdx] = teamRacePts[tName] > 0 ? teamRacePts[tName].toString() : '0';
              });
            }
          });

          this.liveF1DriverMaster = driverMatrix;
          this.liveF1TeamMaster = teamMatrix;
          this.liveF1RacesCompleted = Array.isArray(races) ? races.map(r => r.raceName.replace(' Grand Prix', '')) : [];
          this.liveF1ResultsData = races; // Store raw results
          this.liveF1SprintData = sprints; // Store raw sprints

          // Re-render calendar if active
          const calView = document.getElementById('calendar-view');
          if (calView && calView.classList.contains('active') && this.currentSeries === 'f1') {
            this.renderRaceGrid();
          }
        }
      } catch (err) {
        console.warn('Could not fetch F1 race results', err);
      }

      // Re-render standings if active
      const standingsView = document.getElementById('standings-view');
      if (standingsView && standingsView.classList.contains('active') && this.currentSeries === 'f1') {
        const activeTab = document.querySelector('.standings-tab.active');
        if (activeTab) this.renderStandingsTable(activeTab.id.replace('tab-', ''));
      }
    } catch (e) {
      console.warn('Could not fetch live F1 standings. Using local fallback.', e);
    }
  },

  // ----- Session Results Modal -----
  async showSessionResults(round, type, sessionName) {
    const modal = document.getElementById('results-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;width:100%">
        <span>${sessionName} RESULTS</span>
        <button class="refresh-btn" onclick="app.showSessionResults(${round}, '${type}', '${sessionName}')" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.6rem;padding:4px;transition:0.2s" title="Refresh Live Data">↻</button>
      </div>`;
    body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Loading results...</div>';
    modal.classList.add('active');

    try {
      // If live data hasn't loaded yet, try fetching it first
      if (!this.liveF1ResultsData) {
        await this.loadLiveF1Standings();
      }
      let results = [];

      if (this.currentSeries === 'motogp') {
        const key = `${round}_${sessionName.toLowerCase()}`;
        const motoResults = this.liveMotoGPEventResults[key];
        if (motoResults && motoResults.length > 0) {
          results = motoResults.map(r => ({
            pos: r.pos,
            number: '',
            name: r.name,
            team: r.team,
            laps: '',
            time: r.time,
            points: r.points || '',
            isRaceResult: true
          }));
        } else {
          // Fallback: Show the raw text result from the API if no table rows were parsed
          const rawData = this.liveMotoGPRawResults[`${round}_${type}`];
          if (rawData) {
            body.innerHTML = `
                      <div class="motogp-text-result">
                          <h3 style="margin-bottom:15px;color:var(--accent)">Session Summary</h3>
                          <div style="line-height:1.6;font-size:0.95rem;color:var(--text-main)">${rawData.replace(/\n/g, '<br>')}</div>
                      </div>`;
            return;
          }

          body.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted)">Results not yet available for this session.</div>`;
          return;
        }
      } else if (type === 'practice') {
        body.innerHTML = `
          <div style="text-align:center;padding:40px">
            <div style="font-size:2rem;margin-bottom:15px">ℹ️</div>
            <div style="color:var(--text-main);font-weight:700;margin-bottom:8px">PRACTICE DATA UNAVAILABLE</div>
            <div style="color:var(--text-muted);font-size:0.9rem;line-height:1.5">
              F1 Practice results (FP1/FP2/FP3) are not historically tracked by the Ergast/Jolpi API.<br><br>
              Full classification results are available for <b>Qualifying</b> and <b>Race</b> sessions.
            </div>
          </div>`;
        return;
      }

      if (type === 'race') {
        const race = this.liveF1ResultsData ? this.liveF1ResultsData.find(r => parseInt(r.round) === round) : null;
        if (race && race.Results) results = race.Results.map(r => {
          let teamName = r.Constructor ? r.Constructor.name : '';
          if (teamName === 'RB F1 Team' || teamName === 'RB') teamName = 'Racing Bulls';
          if (teamName === 'Kick Sauber') teamName = 'Sauber';
          if (teamName === 'Alpine F1 Team') teamName = 'Alpine';
          return {
            pos: r.position,
            number: r.number || r.Driver.permanentNumber || '',
            name: this.sanitizeDriverName(`${r.Driver.givenName} ${r.Driver.familyName}`),
            team: teamName,
            laps: r.laps || '',
            time: r.Time ? r.Time.time : r.status,
            points: r.points || '0',
            isRaceResult: true
          };
        });
      } else if (type === 'sprint') {
        const sprint = this.liveF1SprintData ? this.liveF1SprintData.find(s => parseInt(s.round) === round) : null;
        if (sprint && sprint.SprintResults) results = sprint.SprintResults.map(r => {
          let teamName = r.Constructor ? r.Constructor.name : '';
          if (teamName === 'RB F1 Team' || teamName === 'RB') teamName = 'Racing Bulls';
          if (teamName === 'Kick Sauber') teamName = 'Sauber';
          if (teamName === 'Alpine F1 Team') teamName = 'Alpine';
          return {
            pos: r.position,
            number: r.number || r.Driver.permanentNumber || '',
            name: this.sanitizeDriverName(`${r.Driver.givenName} ${r.Driver.familyName}`),
            team: teamName,
            laps: r.laps || '',
            time: r.Time ? r.Time.time : r.status,
            points: r.points || '0',
            isRaceResult: true
          };
        });
      } else if (type === 'qualifying' || type === 'sprint_qual') {
        const endpoint = type === 'qualifying' ? 'qualifying.json' : 'sprint.json';
        const qRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/${round}/${endpoint}?t=${Date.now()}`);
        const qData = await qRes.json();
        const qRace = qData.MRData.RaceTable.Races[0];

        if (type === 'qualifying') {
          if (qRace && qRace.QualifyingResults) results = qRace.QualifyingResults.map(r => ({
            pos: r.position,
            number: r.number || (r.Driver ? r.Driver.permanentNumber : ''),
            name: this.sanitizeDriverName(`${r.Driver.givenName} ${r.Driver.familyName}`),
            q1: r.Q1 || r.q1 || '—',
            q2: r.Q2 || r.q2 || '—',
            q3: r.Q3 || r.q3 || '—',
            isQualifying: true
          }));
        } else {
          // Sprint Qualifying — try to get SQ1/SQ2/SQ3 from sprint qualifying endpoint
          const sqRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/${round}/qualifying.json`);
          if (sqRes.ok) {
            const sqData = await sqRes.json();
            const sqRace = sqData.MRData.RaceTable.Races[0];
            if (sqRace && sqRace.QualifyingResults) {
              results = sqRace.QualifyingResults.map(r => ({
                pos: r.position,
                number: r.number,
                name: this.sanitizeDriverName(`${r.Driver.givenName} ${r.Driver.familyName}`),
                q1: r.Q1 || r.q1 || '—',
                q2: r.Q2 || r.q2 || '—',
                q3: r.Q3 || r.q3 || '—',
                isQualifying: true,
                isSprint: true
              }));
            }
          }
          // Fallback to sprint results if no qualifying data
          if (results.length === 0 && qRace && qRace.SprintResults) {
            results = qRace.SprintResults.map(r => ({
              pos: r.position,
              name: `${r.Driver.givenName} ${r.Driver.familyName}`,
              time: r.Time ? r.Time.time : r.status
            }));
          }
        }
      }

      if (results.length === 0) {
        body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">No live results available yet for this session.</div>';
        return;
      }

      let html = '';
      const isQualifying = results.length > 0 && results[0].isQualifying;

      if (isQualifying) {
        const allDashes = results.length > 0 && results[0].q1 === '—';
        if (allDashes) {
          html += `
            <div class="status-notice" style="text-align:center;padding:12px;margin:0 0 15px 0;background:rgba(255,215,0,0.1);border:1px solid rgba(255,215,0,0.2);border-radius:8px;color:#ffd700;font-size:0.85rem;font-weight:600">
                ⚠ QUALIFYING TIMINGS PENDING (Session just ended)<br>
                <span style="font-size:0.75rem;font-weight:400;opacity:0.8">Database usually updates within 2-4 hours of session end.</span>
            </div>`;
        }
        html += `
          <div class="modal-row modal-row-quali-header">
            <div class="mr-pos">#</div>
            <div class="mr-num">NO.</div>
            <div class="mr-name">DRIVER</div>
            <div class="mr-q">Q1</div>
            <div class="mr-q">Q2</div>
            <div class="mr-q">Q3</div>
          </div>`;
        results.forEach(r => {
          const posNum = parseInt(r.pos);
          const posClass = posNum === 1 ? 'pos-1' : (posNum === 2 ? 'pos-2' : (posNum === 3 ? 'pos-3' : ''));
          html += `
            <div class="modal-row modal-row-quali ${posClass}">
              <div class="mr-pos">${r.pos}</div>
              <div class="mr-num">${r.number || ''}</div>
              <div class="mr-name">${r.name ? r.name.replace(/ /g, '<br>') : ''}</div>
              <div class="mr-q">${r.q1}</div>
              <div class="mr-q">${r.q2}</div>
              <div class="mr-q">${r.q3}</div>
            </div>`;
        });
      } else if (results.length > 0 && results[0].isRaceResult) {
        html += `
          <div class="modal-row modal-row-race-header">
            <div class="mr-pos">POS</div>
            <div class="mr-num">NO.</div>
            <div class="mr-name">DRIVER</div>
            <div class="mr-team">TEAM</div>
            <div class="mr-laps">LAPS</div>
            <div class="mr-time">TIME/GAP</div>
            <div class="mr-pts">PTS</div>
          </div>`;
        results.forEach(r => {
          const posNum = parseInt(r.pos);
          const posClass = posNum === 1 ? 'pos-1' : (posNum === 2 ? 'pos-2' : (posNum === 3 ? 'pos-3' : ''));
          html += `
            <div class="modal-row modal-row-race ${posClass}">
              <div class="mr-pos">${r.pos}</div>
              <div class="mr-num">${r.number}</div>
              <div class="mr-name">${r.name ? r.name.replace(/ /g, '<br>') : ''}</div>
              <div class="mr-team">${r.team}</div>
              <div class="mr-laps">${r.laps}</div>
              <div class="mr-time">${r.time}</div>
              <div class="mr-pts">${r.points}</div>
            </div>`;
        });
      } else {
        results.forEach(r => {
          const posNum = parseInt(r.pos);
          const posClass = posNum === 1 ? 'pos-1' : (posNum === 2 ? 'pos-2' : (posNum === 3 ? 'pos-3' : ''));
          html += `
            <div class="modal-row ${posClass}">
              <div class="mr-pos">${r.pos}</div>
              <div class="mr-name">${r.name ? r.name.replace(/ /g, '<br>') : ''}</div>
              <div class="mr-time">${r.time}</div>
            </div>`;
        });
      }
      body.innerHTML = html;
    } catch (err) {
      body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--f1-red)">Could not load results.</div>';
    }
  },

  // ----- Grid Order Modal -----
  async showGridOrder(round, type, sessionName) {
    const modal = document.getElementById('results-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.textContent = `${sessionName} — Starting Grid`;
    body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Loading grid...</div>';
    modal.classList.add('active');

    try {
      const endpoint = 'qualifying.json';
      const qRes = await fetch(`https://api.jolpi.ca/ergast/f1/${this.currentF1Season}/${round}/${endpoint}?t=${Date.now()}`);
      const qData = await qRes.json();
      const qRace = qData.MRData.RaceTable.Races[0];
      let gridData = [];

      if (qRace && qRace.QualifyingResults) {
        gridData = qRace.QualifyingResults.map(r => ({
          pos: r.position,
          name: this.sanitizeDriverName(`${r.Driver.givenName} ${r.Driver.familyName}`),
          team: r.Constructor ? r.Constructor.name : '',
          bestTime: r.Q3 || r.q3 || r.Q2 || r.q2 || r.Q1 || r.q1 || '—'
        }));
      }

      if (gridData.length === 0) {
        body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">No grid data available yet.</div>';
        return;
      }

      let html = `
        <div class="modal-row modal-row-grid-header">
          <div class="mr-pos">P</div>
          <div class="mr-name">DRIVER</div>
          <div class="mr-team">TEAM</div>
          <div class="mr-time">BEST TIME</div>
        </div>`;

      gridData.forEach(r => {
        let teamName = r.team;
        if (teamName === 'RB F1 Team' || teamName === 'RB') teamName = 'Racing Bulls';
        if (teamName === 'Kick Sauber') teamName = 'Sauber';
        if (teamName === 'Alpine F1 Team') teamName = 'Alpine';

        const standings = typeof f1TeamStandings !== 'undefined' ? f1TeamStandings : [];
        const teamCol = standings.find(t => t.name === teamName || t.name.includes(teamName) || teamName.includes(t.name));
        const tColor = teamCol ? teamCol.color : '#888';
        const posNum = parseInt(r.pos);
        const posClass = posNum === 1 ? 'pos-1' : (posNum === 2 ? 'pos-2' : (posNum === 3 ? 'pos-3' : ''));

        html += `
          <div class="modal-row modal-row-grid ${posClass}">
            <div class="mr-pos">${r.pos}</div>
            <div class="mr-name">${r.name ? r.name.replace(/ /g, '<br>') : ''}</div>
            <div class="mr-team">${teamName}</div>
            <div class="mr-time">${r.bestTime}</div>
          </div>`;
      });

      body.innerHTML = html;
    } catch (err) {
      body.innerHTML = '<div style="text-align:center;padding:40px;color:var(--f1-red)">Could not load grid data.</div>';
    }
  },

  getNatFlagUrl(nat) {
    if (!nat) return 'https://flagcdn.com/24x18/un.png';
    const code = nat.toLowerCase() === 'uk' ? 'gb' : nat.toLowerCase();
    return `https://flagcdn.com/24x18/${code}.png`;
  },

  getTeamLogoUrl(teamName) {
    if (!teamName) return '';
    const name = teamName.toLowerCase();
    if (name.includes('red bull')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/red-bull-racing-logo.png.transform/2col-retina/image.png';
    if (name.includes('mercedes')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/mercedes-logo.png.transform/2col-retina/image.png';
    if (name.includes('ferrari')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/ferrari-logo.png.transform/2col-retina/image.png';
    if (name.includes('mclaren')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/mclaren-logo.png.transform/2col-retina/image.png';
    if (name.includes('aston martin')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/aston-martin-logo.png.transform/2col-retina/image.png';
    if (name.includes('alpine')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/alpine-logo.png.transform/2col-retina/image.png';
    if (name.includes('williams')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/williams-logo.png.transform/2col-retina/image.png';
    if (name.includes('rb')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/rb-logo.png.transform/2col-retina/image.png';
    if (name.includes('sauber')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/sauber-logo.png.transform/2col-retina/image.png';
    if (name.includes('haas')) return 'https://media.formula1.com/content/dam/fom-website/teams/2026/haas-f1-team-logo.png.transform/2col-retina/image.png';
    if (name.includes('ducati')) return 'https://logos-world.net/wp-content/uploads/2020/11/Ducati-Logo.png';
    return '';
  },

  closeModal(e) {
    document.getElementById('results-modal').classList.remove('active');
  },

  // ===== FLOATING COUNTDOWN TIMER =====
  countdownInterval: null,
  countdownBarCollapsed: false,

  toggleCountdownBar() {
    const bar = document.getElementById('countdown-bar');
    const btn = document.getElementById('countdown-toggle-btn');
    this.countdownBarCollapsed = !this.countdownBarCollapsed;
    bar.classList.toggle('collapsed', this.countdownBarCollapsed);
    if (btn) btn.classList.toggle('flipped', this.countdownBarCollapsed);
  },

  updateTimerVisibility() {
    const f1Timer = document.getElementById('f1-countdown-timer');
    const mgTimer = document.getElementById('motogp-countdown-timer');
    const bar = document.getElementById('countdown-bar');
    const btn = document.getElementById('countdown-toggle-btn');
    if (!f1Timer || !mgTimer || !bar) return;

    if (!this.currentSeries) {
      // Landing page: hide all timers
      bar.style.display = 'none';
      if (btn) btn.style.display = 'none';
    } else {
      bar.style.display = '';
      if (btn) btn.style.display = '';
      if (this.currentSeries === 'f1') {
        f1Timer.classList.remove('hidden-timer');
        mgTimer.classList.add('hidden-timer');
      } else {
        f1Timer.classList.add('hidden-timer');
        mgTimer.classList.remove('hidden-timer');
      }
    }
  },

  findNextSession(races) {
    const now = new Date();
    let nearest = null;
    let nearestRace = null;

    for (const race of races) {
      if (race.isCancelled) continue;
      for (const session of race.sessions) {
        if (!session.utc) continue;
        const sessionDate = new Date(session.utc);
        if (sessionDate > now) {
          if (!nearest || sessionDate < nearest) {
            nearest = sessionDate;
            nearestRace = { race, session, sessionDate };
          }
          break;
        }
      }
    }
    return nearestRace;
  },

  formatCountdownDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  },

  formatCountdownTime(date) {
    const h = String(date.getHours()).padStart(2, '0');
    const m = String(date.getMinutes()).padStart(2, '0');
    const tz = this.getTimezoneAbbr();
    return `${h}:${m} ${tz}`;
  },

  updateCountdownTimers() {
    const now = new Date();

    // F1 countdown
    const f1Next = this.findNextSession(f1Races);
    if (f1Next) {
      const diff = f1Next.sessionDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('f1-days').textContent = String(days).padStart(2, '0');
      document.getElementById('f1-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('f1-mins').textContent = String(mins).padStart(2, '0');
      document.getElementById('f1-secs').textContent = String(secs).padStart(2, '0');
      document.getElementById('f1-location').textContent = f1Next.race.location;
      document.getElementById('f1-circuit').textContent = f1Next.race.circuit;
      document.getElementById('f1-session-type').textContent = f1Next.session.name;
      document.getElementById('f1-session-date').textContent = this.formatCountdownDate(f1Next.sessionDate);
      document.getElementById('f1-session-time').textContent = this.formatCountdownTime(f1Next.sessionDate);
    }

    // MotoGP countdown
    const mgNext = this.findNextSession(motogpRaces);
    if (mgNext) {
      const diff = mgNext.sessionDate - now;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('motogp-days').textContent = String(days).padStart(2, '0');
      document.getElementById('motogp-hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('motogp-mins').textContent = String(mins).padStart(2, '0');
      document.getElementById('motogp-secs').textContent = String(secs).padStart(2, '0');
      document.getElementById('motogp-location').textContent = mgNext.race.location;
      document.getElementById('motogp-circuit').textContent = mgNext.race.circuit;
      document.getElementById('motogp-session-type').textContent = mgNext.session.name;
      document.getElementById('motogp-session-date').textContent = this.formatCountdownDate(mgNext.sessionDate);
      document.getElementById('motogp-session-time').textContent = this.formatCountdownTime(mgNext.sessionDate);
    }

    // Update visibility based on current context
    this.updateTimerVisibility();
  },

  startCountdownTimers() {
    this.updateCountdownTimers();
    this.countdownInterval = setInterval(() => {
      this.updateCountdownTimers();
    }, 1000);
  }
};

// Initialize app on load
window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
