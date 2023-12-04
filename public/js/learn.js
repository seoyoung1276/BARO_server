let AllPost;

axios.get(`${BASE_URL}/learn/post`)
.then(Response => {
    AllPost = Response.data;
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
            getCommentLength(post, Response.data.result.name)
            console.log(post, Response.data.result.name)
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
}

function getCommentLength(post, userName){
    axios.get(`${BASE_URL}/learn/comment/${post.id}`)
    .then(Response => {
        console.log(Response.data);
        showPosts(post, userName, Response.data.length);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showPosts(post, userName, commentsLength){
    let container = document.getElementsByClassName('main')[0];

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
    let postDate = new Date(post.date);
    let Kdate = `${postDate.getFullYear()}-${String(postDate.getMonth()+1).padStart(2, 0)}-${String(postDate.getDate()).padStart(2, 0)}`;
    let Ktime =  `${String(postDate.getHours()).padStart(2, 0)}:${String(postDate.getMinutes()).padStart(2,0)}:${String(postDate.getSeconds()).padStart(2, 0)}`;
    date.innerText = `${Kdate} ${Ktime}`;

    userDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
    userDiv.appendChild(nickname)
    userDiv.appendChild(date)

    let joinBtn = document.createElement('div');
    joinBtn.className = 'join-btn';
    console.log(post);
    if(post.isfinish) joinBtn.innerText = "답변완료"

    infoDiv.appendChild(userDiv)
    infoDiv.appendChild(joinBtn)

    let contentDiv = document.createElement('div');
    contentDiv.className = "post-content";
    contentDiv.innerText = post.content;

    let commentDiv = document.createElement('div');
    commentDiv.className = "comment-cnt-div";

    let commentNum = document.createElement('div');
    commentNum.className = "comment-cnt-num";
    commentNum.innerText = commentsLength;

    commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;
    commentDiv.appendChild(commentNum);

    finalDiv.appendChild(infoDiv)
    finalDiv.appendChild(contentDiv)
    finalDiv.appendChild(commentDiv)

    container.appendChild(finalDiv);

    functionOpen();
}

function functionOpen(){
    // let joinBtnArr = [...document.getElementsByClassName('join-btn')];
    // joinBtnArr.forEach((e, i) => {
    //     e.onclick = () => clickJoinBtn(e);
    // })

    let showCurrectPostArr = [...document.getElementsByClassName('post-content')];
    showCurrectPostArr.forEach((e, i)=> {
        e.onclick = () => showCurrectPost(e, i);
    })
}

function showCurrectPost(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPost[i]);
    AllPost.forEach((v) => {
        console.log(v.content.substr(0, 10));
        console.log(document.getElementsByClassName('post-content')[i].innerText.substr(0, 10));
        if(v.content.substr(0, 10) == document.getElementsByClassName('post-content')[i].innerText.substr(0, 10)) currId = v.id;
    })
    console.log(currId);
    window.location.href = `/learnShowPost.html?id=${currId}`;
}

// function clickJoinBtn(e){
//     if(e.innerText === "참여하기") e.innerText = "참여함"
//     else e.innerText = "참여하기"
// }

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

function plusPost(){
    window.location.href = "/learnNewPost.html"
}

function backHome(){
    window.location.href = "/main.html";
}