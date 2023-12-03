getUserPosts();
let AllPosts;
async function getUserPosts(){
    const userno = await getUserNo();
    console.log(userno);
    axios.get(`${BASE_URL}/learn/post/user/${userno}`)
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
    axios.get(`${BASE_URL}/learn/comment/${posts.id}`)
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
        finalDiv.className = "learn-div";

        let infoDiv = document.createElement('div');
        infoDiv.className = "post-info";

        let userDiv = document.createElement('div');
        userDiv.className = "post-user-info";

        let name = document.createElement('div');
        name.className = "user-nickname";
        name.innerText = userName;

        let date =document.createElement('div');
        date.className = "post-date";
        let postDate = new Date(post.date);
        let Kdate = `${postDate.getFullYear()}-${String(postDate.getMonth()+1).padStart(2, 0)}-${String(postDate.getDate()).padStart(2, 0)}`;
        let Ktime =  `${String(postDate.getHours()).padStart(2, 0)}:${String(postDate.getMinutes()).padStart(2,0)}:${String(postDate.getSeconds()).padStart(2, 0)}`;
        date.innerText = `${Kdate} ${Ktime}`;

        userDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
        userDiv.appendChild(name)
        userDiv.appendChild(date)

        let editDiv = document.createElement('div');
        editDiv.className = "edit-my-post";

        let joinBtn = document.createElement('div');
        joinBtn.className = "join-btn";
        if(post.isfinish){
            joinBtn.innerText = "답변완료";
            joinBtn.classList.add("success-answer-btn");
        }else{
            joinBtn.innerText = "답변완료하기";
        }
        

        editDiv.appendChild(joinBtn)
        editDiv.innerHTML += `<iconify-icon icon="iconamoon:menu-kebab-vertical-light" class="edit-content"></iconify-icon>`;

        infoDiv.appendChild(userDiv);
        infoDiv.appendChild(editDiv);

        let contentDiv = document.createElement('div');
        contentDiv.className = "post-content";
        contentDiv.innerText = post.content;

        let commentDiv = document.createElement('div');
        commentDiv.className = "comment-cnt-div";

        let commentCnt = document.createElement('div');
        commentCnt.className = "comment-cnt-num";
        commentCnt.innerText = commentsLength;

        commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;
        commentDiv.appendChild(commentCnt);

        finalDiv.appendChild(infoDiv);
        finalDiv.appendChild(contentDiv);
        finalDiv.appendChild(commentDiv);

        container.appendChild(finalDiv);
    }
    functionOpen();
}

function functionOpen(){
    let answerBtnArr = [...document.getElementsByClassName('join-btn')];
    answerBtnArr.forEach(e => {
        e.onclick = () => changeAnswer(e);
    })

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



function changeAnswer(e){
    if(e.innerText === "답변완료하기"){
        e.classList.add("success-answer-btn");
        e.innerText = "답변완료"

        const req = {
            isfinish: true
        }

        axios.patch(`${BASE_URL}/learn/post/isfinish/${AllPosts[i].id}`, req)
        .then(Response => {
            console.log(Response.data);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });

    }else{
        e.classList.remove("success-answer-btn");
        e.innerText = "답변완료하기"

        const req = {
            isfinish: false
        }

        axios.patch(`${BASE_URL}/laern/post/isfinish/${AllPosts[i].id}`, req)
        .then(Response => {
            console.log(Response.data);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
}
function showContent(){
    window.location.href = "/learnShowPost.html";
}
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
    window.location.href = `/learnEditMyPost.html?id=${i}`;
}
function deleteMyPost(i){

}