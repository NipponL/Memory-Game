import images from "./images.js";

const get = (selec)=>{
    const el = document.querySelector(selec);

    if(el) return el;
    else console.error(`${selec} doesnt exist`);
}

const level1 = get('#level1');
const level2 = get('#level2');
const level3 = get('#level3');
const content = get('.content');

let prevCardFlipped = false;
let bothCardFlipped = false;
let prevCard = {};
let matchedCards = [];
let count = 0;
let matchedCount = 0;
let moves = 0;

const flipBack = (cards, img)=>{
            count = 0;
            bothCardFlipped = false;
            prevCardFlipped = false;
            img.forEach(item =>{
                item.classList.remove("flip");
            });
            cards.forEach(card =>{
            card.classList.remove("show");
            card.classList.add("hide");
            });
            prevCard = {};
    } 
const flip = (e, goal)=>{
             e.currentTarget.classList.remove("hide");
            if(count === 0 && !prevCardFlipped && !bothCardFlipped && !matchedCards.some(item => item === e.currentTarget)){
                count++;
                prevCardFlipped = true;
                prevCard= {id: e.currentTarget.dataset.id, card: e.currentTarget, img: e.target.children[0]};
                e.currentTarget.classList.add("show");
                e.currentTarget.children[0].classList.add("flip");
            }   
            else if (prevCardFlipped && count < 2 && !bothCardFlipped && e.currentTarget !== prevCard.card && !matchedCards.some(item => item === e.currentTarget)){
                bothCardFlipped = true;
                moves++;
                get('.num').textContent = `${moves}`;
                e.currentTarget.classList.add("show");
                e.currentTarget.children[0].classList.add("flip");
                if(prevCard.id !== e.currentTarget.dataset.id){
                    setTimeout(()=> {
                        flipBack([prevCard.card, e.target], [e.target.children[0], prevCard.img]);
                    }, 1000);
                } 
                else {
                    matchedCount++;
                    count = 0;
                    bothCardFlipped = false;
                    prevCardFlipped = false;
                    matchedCards.push(prevCard.card, e.currentTarget);
                    console.log(matchedCards);
                    if(matchedCount === goal){
                        setTimeout(()=>{
                            alert(`Great Job! You Won with ${moves} moves 🎊`);
                            window.location.reload();
                        }, 500);
                        
                    }
                }
            }
}
level1.addEventListener("click", ()=>{
    render(4);
});
level2.addEventListener("click", ()=>{
    render(16);
});
level3.addEventListener("click", ()=>{
    render(36);
});

const randomizeArr = (arr)=>{
 for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] =   [arr[j], arr[i]];
  }
}
const displayContent = (arr)=>{
     content.innerHTML = `
    <div class="cards col-${Math.sqrt(arr.length)}">
    ${arr.map(item =>{
        return `
            <div class="card" data-id="${item.id}">
             <img src="${item.img.url}" alt="${item.img.name}" class="front">
            </div>
        `
    }).join("")}
    </div>`;
}

const render = (amount)=>{
    if(amount % 2 === 0){
        moves = 0;
        get('.num').textContent = `${moves}`;
    const arr = [];
    randomizeArr(images);
    const tempImg = images.slice(0, amount / 2);
    for(let i = 0; i < amount/2; i++){
        arr.push({id: i+1, img: tempImg[i]});
        arr.push({id: i+1, img: tempImg[i]});
    }

    randomizeArr(arr);
    displayContent(arr);
    const cards = document.querySelectorAll(".card");
     cards.forEach(card=>{
            card.addEventListener("click", (e)=>{
                flip(e, amount/2);
            });
         
    });
}
}

window.addEventListener("load", ()=>{
    render(4);
});
