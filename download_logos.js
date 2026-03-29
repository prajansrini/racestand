const fs = require('fs');
const https = require('https');
const path = require('path');

const logos = {
  mercedes: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg/320px-Mercedes_AMG_Petronas_F1_Logo.svg.png',
  redbull: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Red_Bull_Racing_logo.svg/320px-Red_Bull_Racing_logo.svg.png',
  ferrari: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/Scuderia_Ferrari_Logo.svg/200px-Scuderia_Ferrari_Logo.svg.png',
  mclaren: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/McLaren_Racing_logo.svg/320px-McLaren_Racing_logo.svg.png',
  astonmartin: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Aston_Martin_Aramco_Cognizant_F1_Team_logo.svg/320px-Aston_Martin_Aramco_Cognizant_F1_Team_logo.svg.png',
  alpine: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Alpine_F1_Team_Logo.svg/320px-Alpine_F1_Team_Logo.svg.png',
  williams: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Williams_Racing_2020_logo.svg/320px-Williams_Racing_2020_logo.svg.png',
  racingbulls: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Visa_Cash_App_RB_F1_Team_logo.svg/320px-Visa_Cash_App_RB_F1_Team_logo.svg.png',
  sauber: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Stake_F1_Team_Kick_Sauber_logo.svg/320px-Stake_F1_Team_Kick_Sauber_logo.svg.png',
  haas: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Uralkali_Haas_F1_Team_Logo.svg/320px-Uralkali_Haas_F1_Team_Logo.svg.png',
  audi: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/320px-Audi-Logo_2016.svg.png',
  cadillac: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cadillac_logo.svg/120px-Cadillac_logo.svg.png',
  // MotoGP
  ducati: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ducati_red_logo.svg/120px-Ducati_red_logo.svg.png',
  aprilia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Aprilia-logo.svg/120px-Aprilia-logo.svg.png',
  ktm: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/KTM-Logo.svg/120px-KTM-Logo.svg.png',
  yamaha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Yamaha_Motor_logo_%282%29.svg/120px-Yamaha_Motor_logo_%282%29.svg.png',
  honda: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/120px-Honda_Logo.svg.png'
};

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

const dir = path.join(__dirname, 'assets', 'logos');

Object.entries(logos).forEach(async ([name, url]) => {
  const file = fs.createWriteStream(path.join(dir, `${name}.png`));
  https.get(url, options, (res) => {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${name}.png`);
    });
  }).on('error', (err) => {
    fs.unlink(path.join(dir, `${name}.png`), () => {});
    console.error(`Error downloading ${name}: ${err.message}`);
  });
});
