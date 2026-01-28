import wheel from './wheel-sections.json' with { type: 'json' };

let spinnerEl=document.querySelector('.fortune-wheel__body');
let stopBtn=document.querySelector('.fortune-wheel__btn');
let sectionsCount = wheel.length;
let sector = 360 / sectionsCount;

wheel.forEach((section, index) => {
    let spinnerItem = document.createElement('div');
    let spinnerTextEl = document.createElement('div');
    let spinnerTextContent = document.createElement('span');
    let skew = sector - 90;
    
    spinnerItem.classList.add('fortune-wheel__item');
    spinnerTextEl.classList.add('fortune-wheel__text');

    spinnerTextContent.innerHTML = section.text;
    spinnerTextEl.appendChild(spinnerTextContent);

    spinnerTextEl.style.transform = `rotate(${sector * index }deg )` ;
    spinnerItem.style.background = section.color;
    
    spinnerItem.style.transform = `rotate(${sector * index + skew - sector / 2}deg) skewX(${skew}deg )` ;
    spinnerEl.append(spinnerTextEl);
    spinnerEl.appendChild(spinnerItem);
    spinnerItem.style.setProperty('--i', index);
});
spinnerEl.style.setProperty('--count', sectionsCount);

function spinCounter(){
    let count = 0;
    return function(){
        return count+=1
    }
}
const getSpinNumber = spinCounter();
stopBtn.addEventListener('click', function(){
    stopBtn.disabled = true;
    stopBtn.classList.add('btn--disabled');
    const currentSpin = getSpinNumber();
    const style = window.getComputedStyle(spinnerEl);
    const matrix = style.transform;
    spinnerEl.style.transform = matrix; 
    spinnerEl.classList.remove('spinning');

     requestAnimationFrame(() => {
        
        if (currentSpin === 1) {
            
            const failAngle = 1800 + (360 / sectionsCount * 1); 
            
            spinnerEl.style.transition = 'transform 2s cubic-bezier(0.15, 0, 0.15, 1)';
            spinnerEl.style.transform = `rotate(${failAngle}deg)`;

            setTimeout(() => {
                showModal("Упс, попробуйте еще раз!");
            }, 2000); 
        }
        if (currentSpin === 2) {
            
            const failAngle = 1800 + (360 / sectionsCount * 4); 
            
            spinnerEl.style.transition = 'transform 2s cubic-bezier(0.15, 0, 0.15, 1)';
            spinnerEl.style.transform = `rotate(${failAngle}deg)`;

            setTimeout(() => {
                showModal("<a class='modal__link' href='https://totalshop.by/prada_paradox/' target='_blank'>ЗАБРАТЬ СКИДКУ</a>", true);
                
            }, 2000); 
        }
    }
)})
function showModal(text, isFinal = false) {
    const modal = document.createElement('div');
    modal.classList.add('modal-alert');
    if(isFinal){
        modal.innerHTML = `<p>${text}</p>`;
        const link = modal.querySelector('.modal__link');
        if (link) {
            link.addEventListener('click', () => {
                modal.remove(); 
            });
        }
    }if(isFinal == false){
        modal.innerHTML = `<p>${text}</p><button class="btn modal-btn" onclick="this.parentElement.remove()">OK</button>`;
    }
    
    document.body.appendChild(modal);
    modal.querySelector('.modal-btn').addEventListener('click', function(){
        stopBtn.disabled = false;
        stopBtn.classList.remove('btn--disabled');
        spinnerEl.style.transition = 'none';
        spinnerEl.classList.add('spinning');
})
}
