import blocks from "./block.js ";

// window.addEventListener("load",()=>{
const playground = document.querySelector(".playground > ul")

// setting
let gameRow = 20;
let gameCol = 10;

let score = 0;
let dropSpeed = 500;
let downInterval;
let tempMovingItem;

// const blocks ={
//     // 우리가 알고있는 ㅗ 모양(욕아님)
//     // ㅗ 이모양은 총 위,아래,좌,우 방향키를 누를때마다 모양이 다 다르므로 tree라는 배열에 4공간 배열을 만들어준다.

//     tree:[
//         [[2,1],[0,1],[1,0],[1,1]],
//         [[2,1],[1,2],[1,0],[1,1]],
//         [[1,2],[0,1],[2,1],[1,1]],
//         [[1,2],[0,1],[1,0],[1,1]],
//     ]

// }


const movingItem = {
    type :"tree",
    // 블럭 돌리기
    direction:0,
    // 위아래 좌표
    top:0,
    // 좌 우 좌표
    left:3
};


init();

// 초기화
function init(){
    tempMovingItem = {...movingItem};
    // board 그리기 row = 20, col = 10;
for(let i = 0; i<gameRow; i++){
    prependNewLine();
}
rendering()
}


// audio

function musicAudio(){
// 오디오 추가 
let audio = document.getElementById("audio");
// 자동재생
audio.autoplay = true;
// 무한재생
audio.loop = true;
}

// 라인 그려주기 
function prependNewLine(){
    let li = document.createElement("li")
    let ul = document.createElement("ul")
    for(let j = 0; j<gameCol; j++){
        let matrix = document.createElement("li")
        // prepend = node요소 제일 첫번째에 삽입
        // append = node요소 제일 끝에 삽입
        ul.prepend(matrix)
    }
    li.append(ul)
    playground.prepend(li)
}


function rendering(moveType){
    // Destructuring
    let {type,direction,top,left} = tempMovingItem;
    let moving = document.querySelectorAll(".moving")
    for (let move of moving) {
        move.classList.remove(type,"moving")
        console.log(move)
    }
    blocks[type][direction].some(element => {
        let x = element[0] + left
        let y = element[1] + top
        // console.log(playground.childNodes)
        //삼항연산자 =  조건 ? 참일경우 : 거짓일경우
        let target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        let isAvailable = checkEmpty(target)
        if(isAvailable){
            target.classList.add(type,"moving");
        }else{
            tempMovingItem = {...movingItem}
        // console.log(target)
        setTimeout(()=>{
            rendering();
            if(moveType === "top"){
                seize();
            }
        },0)
        return true;
        } 
    });
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;   
}

function checkEmpty(target){
    if(!target || target.classList.contains("seized"))
        return false;
    else return true;
}

function seize(){
    let moving = document.querySelectorAll(".moving");
    for (let move of moving) {
        move.classList.remove("moving");
        move.classList.add("seized");
    }
    generateNew();
}
// 블록이 닿으면 새로운 블록 생성하기.
function generateNew(){
    // 랜덤 블록 생성
    // 오브젝트 entrie을 통해서 오브젝트를 숫자로 변경
    // 왜냐 ? length 길이만큼 랜덤하게 돌리면서 블록을 불러오고싶기떄문.
    let blockArray = Object.entries(blocks);
    console.log(blockArray)
    let random = Math.floor(Math.random()*blockArray.length)
    movingItem.type= blockArray[random][0]

    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem}
    rendering();
}

function move(moveType,amount){
    tempMovingItem[moveType] += amount;
    rendering(moveType);

}
function chageDirection(){
    // 블록 돌리기 
   tempMovingItem.direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
   console.log(tempMovingItem.direction)
   rendering();
}

document.addEventListener("keydown",(e) =>{
    switch(e.keyCode){
        // 왼쪽 키코드 = 37
        case 37:move("left",-1);
            break;
        // 오른쪽 키코드 = 39
        case 39:move("left",1);
            break;
        case 38 :chageDirection(); 
        break;
        // 아래
        case 40: move("top", 1);
            break;
        default: break;
    }
})


// })