let AllPost;
axios.get(`${BASE_URL}/share/post`)
.then(Response => {
    AllPost = Response.data;
    console.log(Response.data);
    getUserName(Response.data);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

function getUserName(posts){
    for(let post of posts){
        axios.get(`${BASE_URL}/user/${post.user_no}`)
        .then(Response => {
            getCommentLength(post, Response.data.result.name)
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
}

function getCommentLength(post, userName){
    axios.get(`${BASE_URL}/share/comment/${post.id}`)
    .then(Response => {
        console.log(Response.data);
        showPosts(post, userName, Response.data.length);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showPosts(post, userName, commentLength){
    let finalDiv = document.createElement('div');
    finalDiv.className = "share-content-div";

    let titleDiv = document.createElement('div');
    titleDiv.className = "content-title-div";

    let stu_id = document.createElement('div');
    stu_id.className = "stu-id";
    stu_id.innerText = `${userName}`

    titleDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
    titleDiv.appendChild(stu_id);
    if(post.isfinish) titleDiv.innerHTML += `<iconify-icon icon="simple-line-icons:check" class="content-check"></iconify-icon>`;

    let hr = document.createElement('div');
    hr.className = "hr";

    let contentDiv = document.createElement('div');
    contentDiv.className = "content-text";
    contentDiv.innerText = `${post.content}`;

    let commentDiv = document.createElement('div');
    commentDiv.className = "comment-cnt-div";
    commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;

    let commentNum = document.createElement('comment-cnt-num');
    commentNum.className = "comment-cnt-num";
    commentNum.innerText = commentLength;
    commentDiv.appendChild(commentNum);

    finalDiv.appendChild(titleDiv);
    finalDiv.appendChild(titleDiv);
    finalDiv.appendChild(hr);
    finalDiv.appendChild(contentDiv);
    finalDiv.appendChild(commentDiv);

    document.body.appendChild(finalDiv);

    functionOpen();
}

function functionOpen(){
    let showPostArr = [...document.getElementsByClassName('share-content-div')];
    showPostArr.forEach((e, i) => {
        e.onclick = () => showCurrectPost(e, i);
    })
}

function backHome(){
    window.location.href = '/main.html';
}

function navChoose(ch, no){
    document.getElementsByClassName('nav-page')[ch].classList.add('choose-page');
    document.getElementsByClassName('nav-page')[ch].classList.remove('no-choose-page');

    document.getElementsByClassName('nav-page')[no].classList.add('no-choose-page');
    document.getElementsByClassName('nav-page')[no].classList.remove('choose-page');

    if(ch){
        window.location.href = '/shareMyPost.html'
    }else{
        window.location.href = '/share.html'
    }
}

function plusPost(){
    window.location.href = '/shareNewPost.html';
}
function showCurrectPost(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPost[i]);
    AllPost.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('content-text')[i]);
        if(v.content == document.getElementsByClassName('content-text')[i]) currId = v.id;
    })
    console.log(currId);
    // window.location.href = `/shareShowPost.html?id=${AllPost[i].id}`;
}

