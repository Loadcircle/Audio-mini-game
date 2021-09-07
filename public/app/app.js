import {audio} from './base64.js';
import { playGraph } from './helpers/generateAudioGraph.js';

container.addEventListener('click', (sendData = false)=>{
    const audio1 = document.getElementById('audio1');
    const audioPath = './assets/sound.ogg';
    audio1.src = audioPath;
    // audio1.src = `data:audio/ogg;base64,${audio}`;
    
    playGraph(audio1, true);
});
