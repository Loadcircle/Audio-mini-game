import {audio} from './base64.js';
import {audioDataETL} from './helpers/audioDataETL.js';
const json = [

]

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let audioSource;
let analyser;

container.addEventListener('click', ()=>{
    const audio1 = document.getElementById('audio1');

    const audioPath = './assets/spell.ogg';
    audio1.src = audioPath;
    // audio1.src = `data:audio/ogg;base64,${audio}`;
    const audioCtx = new AudioContext();

    audio1.play();

    audioSource = audioCtx.createMediaElementSource(audio1);
    analyser = audioCtx.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);

    //default is 2048, is the number of audio sampers, grows as x2 starting in 32
    analyser.fftSize = 32;

    //this return ftsize/2
    const bufferLength = analyser.frequencyBinCount;
    
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = canvas.width/bufferLength;
    let barHeigth;
    let x;
    let animationFrameID;

    function animate(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        const audioData = {
            time: audio1.currentTime,
            buffer:[]
        }

        for(let i = 0; i < bufferLength; i++){
            barHeigth = dataArray[i];
            ctx.fillStyle='white';
            ctx.fillRect(x, canvas.height - barHeigth, barWidth, barHeigth);  
            x += barWidth;  
            audioData.buffer.push(barHeigth);
        }
        json.push(audioData);  

        animationFrameID = requestAnimationFrame(animate);
    }
    animate();

    audio1.addEventListener('ended', ()=>{
        console.log('ended');
        console.log(cancelAnimationFrame(animationFrameID));
        sendData(json);
    });
});

const sendData = (json, name = 'example')=>{
    const data = {
        fileName: name,
        data: audioDataETL(json),
    }
    console.log(data);

    fetch('/api/saveJson/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
    .then(resp=>resp.json())
    .then(console.log)
    .catch(console.log);
}