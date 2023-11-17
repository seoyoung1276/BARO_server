getUserPosts();
async function getUserPosts(){
    const userno = await getUserNo();
    axios.get(`${BASE_URL}/learn/post/user/${userno}`)
    .then(Response => {
        getUserInfo(Response.data);
        console.log(Response.data)
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
function getUserInfo(posts){
    axios.get(`${BASE_URL}/auth/userinfo`, { withCredentials: true})
    .then(response => {
        showMyPosts(posts, response.data.name);

    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function navChoose(ch, no){
    if(ch){
        window.location.href = '/learn.html'
    }else{
        window.location.href = '/learnMyPost.html'
    }
}

function backHome(){
    window.location.href = "/main.html";
}

let answerBtnArr = [...document.getElementsByClassName('join-btn')];
answerBtnArr.forEach(e => {
    e.onclick = () => changeAnswer(e);
})

function changeAnswer(e){
    if(e.innerText === "답변완료하기"){
        e.classList.add("success-answer-btn");
        e.innerText = "답변완료"
    }else{
        e.classList.remove("success-answer-btn");
        e.innerText = "답변완료하기"
    }
}
function showContent(){
    window.location.href = "/learnShowPost.html";
}

let index = -1;
document.addEventListener('click', (e) => {
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(e.target.className != "edit-content"){
        editDiv.style.visibility = "hidden";
    }
    
});
let editArr = [...document.getElementsByClassName("edit-content")];
editArr.forEach((e, i) => {
    e.onclick = () => showEditDiv(e, i);
});

function showEditDiv(e, i){
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(index != i){
        let buttonRect = e.getBoundingClientRect();
        let buttonX = buttonRect.left + window.pageXOffset;
        let buttonY = buttonRect.top + window.pageYOffset;
        editDiv.style.visibility = "visible";
        editDiv.style.top = `${buttonY}px`;
        editDiv.style.left =`${buttonX - 130}px`;
        index = i;
    }else{
        editDiv.style.visibility = "hidden";
        index = -1;
    }

    let editButton = document.getElementsByClassName('edit-post')[0];
    let deleteButton = document.getElementsByClassName('delete-post')[0];
    editButton.onclick = () => editMyPost(i);
    deleteButton.onclick = () => deleteMyPost(i);
}
function editMyPost(i){
    window.location.href = "/learnEditMyPost.html"
}
function deleteMyPost(i){

}