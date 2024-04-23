import { playSound } from './discord.js';
import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

let lastPlayerState = {};

app.post('/', (req, res) => {
    const state = req.body.player.state;

    if(state?.round_killhs > lastPlayerState?.round_killhs) {
        playSound('queota');
    }

    res.send('ok!');
 
    lastPlayerState = state;
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});