import { playSound } from './discord.js';
import express from 'express';
import { isWeaponActive } from './helpers.js';

const app = express();
const port = 3002;

app.use(express.json());

let lastPlayerState = {};

app.post('/', (req, res) => {
    const state = req.body.player?.state;
    const weapons = req.body.player?.weapons;

    if(state?.round_killhs > lastPlayerState?.round_killhs && isWeaponActive(weapons, 'weapon_deagle')) {
        playSound('queota');
    }

    const activeWeapon = Object.values(weapons).find(weapon => weapon.state === 'active');
    if(state?.health === 0 && activeWeapon && activeWeapon.ammo_clip === 0) {
        playSound('remember');
    }

    if(state?.round_kills === 5) {
        playSound('ace');
    }

    if(state?.health === 0 && state?.burning > 0) {
        playSound('ta-pegando-fogo');
    }

    res.send('ok!');
 
    lastPlayerState = state;
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});