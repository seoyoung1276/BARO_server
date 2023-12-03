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
        joinBtn.innerText = "모집 종료하기"
    
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
    }
    functionOpen();
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
        e.onclick = () => joinClose(e);
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
    window.location.href = `/togetherEditMyPost.html?id=${i}`;
}
function deleteMyPost(i){
    let post_no = AllPosts[i].id;
    axios.delete(`${BASE_URL}/together/post/${post_no}`)
    .then(Response => {
        console.log(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

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