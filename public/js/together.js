axios.get(`${BASE_URL}/together/post`)
.then(Response => {
    getUserName(Response.data);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

function getUserName(posts){
    for(let post of posts){
        axios.get(`${BASE_URL}/user/${post.user_no}`)
        .then(Response => {
            showPosts(post, Response.data.result.name)
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
    
}

function showPosts(post, userName){
    let container = document.getElementsByClassName('main')[0];

    let finalDiv = document.createElement('div');
    finalDiv.onclick = () => showContent();
    finalDiv.className = "together-div";

    let titleDiv = document.createElement('post-title-div');
    titleDiv.className = "post-title-div";

    let title = document.createElement('div');
    title.className = "post-title"
    title.innerText = post.title;

    let joinBtn = document.createElement('div');
    joinBtn.className = "join-btn";
    joinBtn.innerText = "참여하기";

    titleDiv.appendChild(title);
    titleDiv.appendChild(joinBtn);

    let contentDiv = document.createElement('div');
    contentDiv.className = "post-content";
    contentDiv.innerText = post.content;

    let infoDiv = document.createElement('div');
    infoDiv.className = "post-Info";

    let userDiv = document.createElement('div');
    userDiv.className = "post-user-info";

    let username = document.createElement('div');
    username.className = "user-nickname"
    username.innerText = userName;

    let date = document.createElement('div');
    date.className = "post-date";
    date.innerText = post.date;

    userDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
    userDiv.appendChild(username);
    userDiv.appendChild(date);
    
    let joinDiv = document.createElement('div');
    joinDiv.className = 'post-join-info';

    let joinCnt = document.createElement('div');
    joinCnt.className = "join-cnt";

    let commentDiv = document.createElement('div');
    commentDiv.className = "comment-cnt-div";

    let commentCnt = document.createElement('div');
    commentCnt.className = "comment-cnt-num";

    commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;
    commentDiv.appendChild(commentCnt);

    joinDiv.innerHTML += `<iconify-icon icon="ic:sharp-person" class="person-icon"></iconify-icon>`
    joinDiv.appendChild(joinCnt);
    joinDiv.appendChild(commentDiv);

    infoDiv.appendChild(userDiv);
    infoDiv.appendChild(joinDiv);

    finalDiv.appendChild(titleDiv);
    finalDiv.appendChild(contentDiv);
    finalDiv.appendChild(infoDiv);

    container.appendChild(finalDiv);
    functionOpen();
}

function functionOpen(){
    let joinArr = [...document.getElementsByClassName('join-btn')];
    joinArr.forEach((e) => {
        e.onclick = () => togetherJoin(e);
    });
}
function backHome(){
    window.location.href = '/main.html';
}

function navChoose(ch, no){
    document.getElementsByClassName('nav-page')[ch].classList.add('choose-page');
    document.getElementsByClassName('nav-page')[ch].classList.remove('no-choose-page');

    document.getElementsByClassName('nav-page')[no].classList.add('no-choose-page');
    document.getElementsByClassName('nav-page')[no].classList.remove('choose-page');

    if(!ch){
        window.location.href = '/together.html'
    }else{
        window.location.href = '/togetherMyPost.html'
    }
}

function togetherJoin(e){
    if(e.innerHTML ===  "참여하기"){
        e.innerHTML = "참여함"
    }else e.innerHTML = "참여하기"
}

function plusPost(){
    window.location.href = '/togetherNewPost.html';
}

function showContent(){
    window.location.href = '/togetherShowPost.html';
}
