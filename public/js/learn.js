axios.get(`${BASE_URL}/learn/post`)
.then(Response => {
    getUserName(Response.data);
    console.log(Response.data);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

function getUserName(posts){
    for(let post of posts){
        axios.get(`${BASE_URL}/user/${post.user_no}`)
        .then(Response => {
            showPosts(post, Response.data.result.name)
            console.log(post, Response.data.result.name)
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
    
}
function showPosts(post, userName){
    let container = document.getElementsByClassName('main')[0];
//     <div class="learn-div" onclick="showContent()">
//         <div class="post-Info">
//             <div class="post-user-info">
//                 <iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>
//                 <div class="user-nickname">2314_조서현</div>
//                 <div class="post-date">2023-09-14 12:01</div>
//             </div>
//             <div class="join-btn">참여하기</div>
//         </div>
//         <div class="post-content">
//             스택에 같이 나갈 프론트 1명, 백 2명, 디자인 1명을 구해요!
//             프론트는 react 사용 가능해야함. 백은 node.js 사용 가능해야함.sdfnksfdsdfnksfdsdfnksfdsdfnksfdsdfnks
//             fdsdfnksfdsdfnksfdsdfnksfdsdfnk
//             sdkhfsdf sdhfkhsfdkkdfhkdfksdfksdbfdbfk
//         </div>
//         <div class="comment-cnt-div">
//             <img src="/img/comment-cnt.png" class="comment-cnt-img">
//             <div class="comment-cnt-num">13</div>
//         </div>
//     </div>

    let finalDiv = document.createElement('div');
    finalDiv.className  = "learn-div";

    let infoDiv = document.createElement('div');
    infoDiv.className = "post-info";

    let userDiv = document.createElement('div');
    userDiv.className = "post-user-info";

    let nickname = document.createElement('div');
    nickname.className = "user-nickname";
    nickname.innerText = userName;

    let date = document.createElement('div');
    date.className = "post-date";
    date.innerText = post.date.substring(0, 10);

    userDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
    userDiv.appendChild(nickname)
    userDiv.appendChild(date)

    let joinBtn = document.createElement('div');
    joinBtn.className = 'join-btn';
    joinBtn.innerText = "참여하기"

    infoDiv.appendChild(userDiv)
    infoDiv.appendChild(joinBtn)

    let contentDiv = document.createElement('div');
    contentDiv.className = "post-content";
    contentDiv.innerText = post.content;

    let commentDiv = document.createElement('div');
    commentDiv.className = "comment-cnt-div";

    let commentNum = document.createElement('div');
    commentNum.className = "comment-cnt-num";

    commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;
    commentDiv.appendChild(commentNum);

    finalDiv.appendChild(infoDiv)
    finalDiv.appendChild(contentDiv)
    finalDiv.appendChild(commentDiv)

    container.appendChild(finalDiv);
}

function navChoose(ch, no){
    document.getElementsByClassName('nav-page')[ch].classList.add('choose-page');
    document.getElementsByClassName('nav-page')[ch].classList.remove('no-choose-page');

    document.getElementsByClassName('nav-page')[no].classList.add('no-choose-page');
    document.getElementsByClassName('nav-page')[no].classList.remove('choose-page');

    if(ch){
        window.location.href = '/learnMyPost.html'
    }else{
        window.location.href = '/learn.html'
    }
}

function showContent(){
    window.location.href = "/learnShowPost.html";
}

function plusPost(){
    window.location.href = "/learnNewPost.html"
}

function backHome(){
    window.location.href = "/main.html";
}