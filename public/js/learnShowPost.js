function backBtn(){
    window.location.href = "/learn.html";
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