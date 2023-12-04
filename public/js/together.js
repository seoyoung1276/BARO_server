
let allPosts;
axios.get(`${BASE_URL}/together/post`)
.then(Response => {
    allPosts = Response.data;
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
    axios.get(`${BASE_URL}/together/comment/${post.id}`)
    .then(Response => {
        console.log(Response.data);
        showPosts(post, userName, Response.data.length);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
let i = -1;
function showPosts(post, userName, commentsLength){
    i++;
    let container = document.getElementsByClassName('main')[0];

    let finalDiv = document.createElement('div');
    finalDiv.className = "together-div";

    let titleDiv = document.createElement('post-title-div');
    titleDiv.className = "post-title-div";

    let title = document.createElement('div');
    title.className = "post-title"
    title.innerText = post.title;

    let joinBtn = document.createElement('div');
    joinBtn.className = "join-btn";
    if(post.isfinish) joinBtn.innerText = "모집 종료됨";
    else joinBtn.innerText = "";

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
    let postDate = new Date(post.date);
    let Kdate = `${postDate.getFullYear()}-${String(postDate.getMonth()+1).padStart(2, 0)}-${String(postDate.getDate()).padStart(2, 0)}`;
    let Ktime =  `${String(postDate.getHours()).padStart(2, 0)}:${String(postDate.getMinutes()).padStart(2,0)}:${String(postDate.getSeconds()).padStart(2, 0)}`;
    date.innerText = `${Kdate} ${Ktime}`;

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
    commentCnt.innerText = commentsLength;

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
    getJoiner(post, joinCnt);
    
}

function getJoiner(post, joinCnt){
    axios.get(`${BASE_URL}/together/post/${post.id}/attend`)
        .then(Response => {
            console.log(Response.data);
            joinCnt.innerText = `${Response.data.length}/${post.Hire_personnel}`;
            // getIsJoin(post, index);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
}
// async function getIsJoin(postInfo, index){
//     const userno = await getUserNo();

//     axios.get(`${BASE_URL}/together/post/${postInfo.id}/isattend/${userno}`)
//     .then(Response => {
//         console.log(Response.data);
//         console.log(index);
//         if(Response.data) document.getElementsByClassName('join-btn')[index].innerText = "참여함"
//         else document.getElementsByClassName('join-btn')[index].innerText = "참여하기"
//     })
//     .catch(error => {
//         console.error('There has been a problem with your axios request:', error);
//     });
// }



function functionOpen(){
    let joinArr = [...document.getElementsByClassName('join-btn')];
    joinArr.forEach((e, i) => {
        e.onclick = () => togetherJoin(e, i);
    });

    let showCurrectPostArr = [...document.getElementsByClassName('post-content')];
    showCurrectPostArr.forEach((e, i) => {
        e.onclick = () => showContent(e, i);
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

    if(!ch){
        window.location.href = '/together.html'
    }else{
        window.location.href = '/togetherMyPost.html'
    }
}

// async function togetherJoin(e, i){
//     if(e.innerHTML ===  "참여하기"){
//         e.innerHTML = "참여함"

//         const userno = await getUserNo();
       
//         const req = {
//             user_no: userno
//         }

//         axios.post(`${BASE_URL}/together/post/${allPosts[i].id}/attend`, req)
//         .then(Response => {
//             console.log(Response.data);
//             getJoiner(allPosts[i], i);
//         })
//         .catch(error => {
//             console.error('There has been a problem with your axios request:', error);
//         });
        
//     }else {
//         e.innerHTML = "참여하기"

//         const userno = await getUserNo();
        
//         axios.delete(`${BASE_URL}/together/post/${allPosts[i].id}/attend/${userno}`)
//         .then(Response => {
//             console.log(Response.data);
//             getJoiner(allPosts[i], i);
//         })
//         .catch(error => {
//             console.error('There has been a problem with your axios request:', error);
//         });
//     }    
// }

function plusPost(){
    window.location.href = '/togetherNewPost.html';
}

function showContent(e, i){
    let currId;

    console.log(e, i);
    console.log(allPosts[i]);
    allPosts.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('post-content')[i].innerText);
        if(v.content == document.getElementsByClassName('post-content')[i].innerText && v.title == document.getElementsByClassName('post-title')[i].innerText) currId = v.id;
    })
    console.log(currId);
    window.location.href = `/togetherShowPost.html?id=${currId}`;
}
