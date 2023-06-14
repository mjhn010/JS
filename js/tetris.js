const playground = document.querySelector(".playground > ul")
// setting
let gameRow = 20;
let gameCol = 10;

let score = 0;
let dropSpeed = 500;
let downInterval;
let tempMovingItem;

const blocks ={
    // 우리가 알고있는 ㅗ 모양(욕아님)
    // ㅗ 이모양은 총 위,아래,좌,우 방향키를 누를때마다 모양이 다 다르므로 tree라는 배열에 4공간 배열을 만들어준다.

    tree:[
        [[2,1],[0,1],[1,0],[1,1]],
        [],
        [],
        [],
    ]

}


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


function rendering(){
    // Destructuring
    let {type,direction,top,left} = tempMovingItem;
    // console.log(type,direction)
    // console.log(blocks[type][direction])
    let moving = document.querySelectorAll(".moving")
    for (let move of moving) {
        move.classList.remove(type,"moving")
        console.log(move)
    }
    blocks[type][direction].forEach(element => {
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
        })
        } 
            
    });
}

function checkEmpty(target){
    if(!target)
        return false;
    else return true;
}


function move(moveType,amount){
    tempMovingItem[moveType] += amount;
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
        // 하지만 테트리스에서는 위로 올라갈수없다 그래서 아래는 위 이동키는 구현xx !
        // case 38 :move("top",-1);
        // break;
        // 아래
        case 40: move("top", 1);
            break;
    }
})