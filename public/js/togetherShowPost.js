function backBtn(){
    window.location.href = "/together.html";
}

let sendCommentInput = document.getElementsByClassName('input-comment')[0];

sendCommentInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        sendComment();
    }
});

function sendComment(){
    console.log(sendCommentInput.value);
}

document.addEventListener('click', (e) => {
    let showPanel = document.getElementsByClassName('show-join-people')[0];
    if(e.target.className != "join-profile"){
        showPanel.style.visibility = "hidden";
    }
    
});

function showJoinPeople(){
    let joinProfile = document.getElementsByClassName('join-profile')[0];
    let showPanel = document.getElementsByClassName('show-join-people')[0];

    let people = 3;
    for(let i = 0; i<people; i++){
        let joinPersen = document.createElement('div');
        joinPersen.className ="join-peoeple";
        joinPersen.innerText = "2314_조서현"
        showPanel.appendChild(joinPersen);
    }
    let height = 40 + (45 * people);
    
    let buttonRect = joinProfile.getBoundingClientRect();
    let buttonX = buttonRect.left + window.pageXOffset;
    let buttonY = buttonRect.top + window.pageYOffset;
    
    showPanel.style.visibility = "visible";
    showPanel.style.top = `${buttonY}px`;
    showPanel.style.left =`${buttonX - 150}px`;
    showPanel.style.height = `${height}px`;
}

function getJoin(e){
    if(e.target.innerText === "참여하기") e.target.innerText = "참여함"
    else e.target.innerText = "참여하기"
}