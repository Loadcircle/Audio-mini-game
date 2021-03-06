const getJsonFile = async()=>{
    const request = await fetch('http://localhost:8080/api/saveJson/');
    return await request.json();
};
const audioPath = './assets/sound.ogg';
// const audioPath = './assets/dakiti.mp3';

const gccol1 = document.getElementById('gccol1'),
    gccol2 = document.getElementById('gccol2'),
    gccol3 = document.getElementById('gccol3'),
    gccol4 = document.getElementById('gccol4');

const audio = document.getElementById('audio');

const main = async ()=>{
    const file = await getJsonFile();
    audio.src = audioPath;

    let started = false;
    audio.addEventListener('play', ()=>{
        if(!started){
            startGame(file);
            audio.pause();
            setTimeout(()=>{
                audio.play();
            }, 3000);
            started = true;
        }
    });

};
main();
const startGame = (data)=>{
    data.forEach(e => {
        const box = document.createElement('div');
        box.classList = 'music_btn set';
        box.setAttribute('data-time', e.time);
        
        
        const delay = ((e.time*1000));
        
        setTimeout(()=>{
            switch (e.position) {
                case 0:
                    gccol1.appendChild(box);
                    break;

                case 1:
                    gccol2.appendChild(box);                
                    break;

                case 2:
                    gccol3.appendChild(box);                
                    break;

                case 3:
                    gccol4.appendChild(box);                
                    break;
            
                default:
                    break;
            }

            setTimeout(()=>{
                box.remove();
            }, 3000)
        }, delay);
    });

}

window.addEventListener('keypress', (e)=>{
    if(e.key == 'a'){
        const btn = document.querySelector('#gccol1 .music_btn.set');
        clickMusicBtn(btn);
    }
    if(e.key == 's'){
        const btn = document.querySelector('#gccol2 .music_btn.set');
        clickMusicBtn(btn);
    }
    if(e.key == 'k'){
        const btn = document.querySelector('#gccol3 .music_btn.set');
        clickMusicBtn(btn);
    }
    if(e.key == 'l'){
        const btn = document.querySelector('#gccol4 .music_btn.set');
        clickMusicBtn(btn);
    }
});

const clickMusicBtn = (btn)=>{
    btn.classList.remove('set');
    btn.classList.add('active');

    const btnTime = Number(btn.dataset.time);
    let score = '';

    const calc = btnTime - audio.currentTime;
    console.log(calc)
    if(calc < 0.55){
        score='perfect';
    }
    else if(calc > 0.55 && calc < 0.9){
        score='medium';
    }
    else{
        score='fail';

    }
    btn.classList.add(score);

    setTimeout(() => {
        btn.classList.remove('active');        
        btn.style.opacity = 0;
    }, 300);
};