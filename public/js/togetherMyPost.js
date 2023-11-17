getUserPosts();
async function getUserPosts(){
    const userno = await getUserNo();
    console.log(userno);
    axios.get(`${BASE_URL}/together/post/user/${userno}`)
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

// nav바
function navChoose(ch, no){
    document.getElementsByClassName('nav-page')[ch].classList.add('choose-page');
    document.getElementsByClassName('nav-page')[ch].classList.remove('no-choose-page');

    document.getElementsByClassName('nav-page')[no].classList.add('no-choose-page');
    document.getElementsByClassName('nav-page')[no].classList.remove('choose-page');

    if(ch){
        window.location.href = '/together.html'
    }else{
        window.location.href = '/togetherMyPost.html'
    }
}

// 글 수정 및 삭제
let index = -1;
document.addEventListener('click', (e) => {
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(e.target.className != "edit-content"){
        editDiv.style.visibility = "hidden";
    }
    
});
let editArr = [...document.getElementsByClassName("edit-content-btn")];
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
        editDiv.style.left =`${buttonX - 50}px`;
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
    window.location.href = "/togetherEditMyPost.html"
}
function deleteMyPost(i){

}

// 모집 종료
let joinBtnArr = [...document.getElementsByClassName('join-btn')];
joinBtnArr.forEach((e, i) => {
    e.onclick = () => joinClose(e);
});

function joinClose(e){
    if(e.innerHTML === "모집 종료하기") {
        e.innerHTML = "모집 종료됨"
        e.classList.add("join-close-btn")
    }else{
        e.innerHTML = "모집 종료하기"
        e.classList.remove("join-close-btn")
    }
}

function backHome(){
    window.location.href = "/main.html"
}

function showContent(){
    window.location.href = "/togetherShowPost.html";
}