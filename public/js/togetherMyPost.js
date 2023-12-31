getUserPosts();
let AllPosts;
async function getUserPosts(){
    const userno = await getUserNo();
    console.log(userno);
    axios.get(`${BASE_URL}/together/post/user/${userno}`)
    .then(Response => {
        AllPosts = Response.data;
        getUserInfo(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
function getUserInfo(posts){
    axios.get(`${BASE_URL}/auth/userinfo`, { withCredentials: true})
    .then(response => {
        getCommentsLength(posts, response.data.name);

    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function getCommentsLength(posts, userName){
    axios.get(`${BASE_URL}/together/comment/${posts.id}`)
    .then(Response => {
        console.log(Response.data);
        showMyPosts(posts, userName, Response.data.length);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showMyPosts(posts, userName, commentsLength){
    let container = document.getElementsByClassName('main')[0];
    
    for(let post of posts){
        console.log(post);
        let finalDiv = document.createElement('div');
        finalDiv.className = "together-div";
    
        let titleDiv = document.createElement('div');
        titleDiv.className = "post-title-div";
    
        let title = document.createElement('div');
        title.className = "post-title";
        title.innerText = post.title;
    
        let editDiv = document.createElement('div');
        editDiv.className = "edit-content edit-content-btn";
    
        let joinBtn = document.createElement('div');
        joinBtn.className = "join-btn";
        if(post.isfinish){
            joinBtn.innerText = "모집 종료됨"
            joinBtn.classList.add("join-close-btn")
        }
        else joinBtn.innerText = "모집 종료하기"
    
        editDiv.appendChild(joinBtn);
        editDiv.innerHTML += `<iconify-icon icon="iconamoon:menu-kebab-vertical-light" class="edit-content"></iconify-icon>`;
    
        titleDiv.appendChild(title)
        titleDiv.appendChild(editDiv)
    
        let contentDiv = document.createElement('div');
        contentDiv.className = "post-content";
        contentDiv.innerText = post.content;
    
        let infoDiv = document.createElement('div');
        infoDiv.className = "post-Info";
    
        let userDiv = document.createElement('div');
        userDiv.className = "post-user-info"
    
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
    
        let joinDiv = document.createElement('div');
        joinDiv.className = "post-join-info";
    
        let joinCnt = document.createElement('div');
        joinCnt.className = "join-cnt";
    
        let commentDiv = document.createElement('div');
        commentDiv.className = "comment-cnt-div";
    
        let commentCnt = document.createElement('div');
        commentCnt.className = "comment-cnt-num";
        commentCnt.innerText = commentsLength;
    
        commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;
        commentDiv.appendChild(commentCnt);
    
        joinDiv.innerHTML += `<iconify-icon icon="ic:sharp-person" class="person-icon"></iconify-icon>`;
        joinDiv.appendChild(joinCnt);
        joinDiv.appendChild(commentDiv);
    
        infoDiv.appendChild(userDiv);
        infoDiv.appendChild(joinDiv);
    
        finalDiv.appendChild(titleDiv);
        finalDiv.appendChild(contentDiv);
        finalDiv.appendChild(infoDiv);
    
        container.appendChild(finalDiv);

        getJoiner(post, joinCnt);
    }
    functionOpen();
    
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

let index = -1;
function functionOpen(){
    // 글 수정 및 삭제
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

    // 모집 종료
    let joinBtnArr = [...document.getElementsByClassName('join-btn')];
    joinBtnArr.forEach((e, i) => {
        e.onclick = () => joinClose(e, i);
    });

    let contentArr = [...document.getElementsByClassName('content-text')];
    contentArr.forEach((e, i) => {
        e.onclick = () => showContent(i);
    })

    let showCurrectPostArr = [...document.getElementsByClassName('post-content')];
    showCurrectPostArr.forEach((e, i) => {
        e.onclick = () => showCurrectPost(e, i);
    })
}

function showCurrectPost(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPosts[i]);
    AllPosts.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('post-content')[i].innerText);
        if(v.content == document.getElementsByClassName('post-content')[i].innerText && v.title == document.getElementsByClassName('post-title')[i].innerText) currId = v.id;
    })
    console.log(currId);
    window.location.href = `/togetherShowPost.html?id=${currId}`;
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
    editButton.onclick = () => editMyPost(e, i);
    deleteButton.onclick = () => deleteMyPost(e, i);
}
function editMyPost(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPosts[i]);
    AllPosts.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('post-content')[i].innerText);
        if(v.content == document.getElementsByClassName('post-content')[i].innerText && v.title == document.getElementsByClassName('post-title')[i].innerText) currId = v.id;
    })

    window.location.href = `/togetherEditMyPost.html?id=${currId}`;
}
function deleteMyPost(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPosts[i]);
    AllPosts.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('post-content')[i]);
        console.log(document.getElementsByClassName('post-content')[i].innerHTML);
        if(v.content.substr(0, 10) == document.getElementsByClassName('post-content')[i].innerText.substr(0, 10) && v.title == document.getElementsByClassName('post-title')[i].innerHTML) currId = v.id;
    })

    axios.delete(`${BASE_URL}/together/post/${currId}`)
    .then(Response => {
        console.log(Response.data);
        window.location.href = "/togetherMyPost.html"
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function joinClose(e, i){
    if(e.innerText === "모집 종료하기"){
        e.classList.add("join-close-btn");
        e.innerText = "모집 종료됨"

        const req = {
            isfinish: true
        }

        axios.patch(`${BASE_URL}/together/post/isfinish/${AllPosts[i].id}`, req)
        .then(Response => {
            console.log(Response.data);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });

    }else{
        e.classList.remove("join-close-btn");
        e.innerText = "모집 종료하기"

        const req = {
            isfinish: false
        }

        axios.patch(`${BASE_URL}/together/post/isfinish/${AllPosts[i].id}`, req)
        .then(Response => {
            console.log(Response.data);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
}

function backHome(){
    window.location.href = "/main.html"
}

function showContent(i){
    window.location.href = `/shareShowPost.html?id=${i}`;
}