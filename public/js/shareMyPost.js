getUserPosts();
let AllPosts;
async function getUserPosts(){
    const userno = await getUserNo();
    axios.get(`${BASE_URL}/share/post/user/${userno}`)
    .then(Response => {
        getUserInfo(Response.data);
        AllPosts = Response.data;
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
    axios.get(`${BASE_URL}/share/comment/${posts.id}`)
    .then(Response => {
        console.log(Response.data);
        showMyPosts(posts, userName, Response.data.length);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showMyPosts(posts, userName, commentLength){
    for(let post of posts){
        let finalDiv = document.createElement('div');
        finalDiv.className = "share-content-div";

        let titleDiv = document.createElement('div');
        titleDiv.className = "content-title-div";

        let profileDiv = document.createElement('div');
        profileDiv.className = "content-profile";

        let stuId = document.createElement('div');
        stuId.className = "stu-id";
        stuId.innerText = userName;

        profileDiv.innerHTML += `<iconify-icon icon="healthicons:ui-user-profile" class="user-profile"></iconify-icon>`;
        profileDiv.appendChild(stuId);
        if(post.isfinish) profileDiv.innerHTML += `<iconify-icon icon="simple-line-icons:check" class="content-check"></iconify-icon>`;

        let editDiv = document.createElement('div');
        editDiv.className = 'edit-content edit-content-btn';

        let editBtn = document.createElement('div');
        editBtn.className = "edit-success";
        if(post.isfinish) editBtn.innerText = "완료함";
        else editBtn.innerText = "완료하기";

        editDiv.appendChild(editBtn);
        editDiv.innerHTML += `<iconify-icon icon="iconamoon:menu-kebab-vertical-light" class="edit-content"></iconify-icon>`

        titleDiv.appendChild(profileDiv);
        titleDiv.appendChild(editDiv);

        let hr = document.createElement('div');
        hr.className = "hr";

        let contentDiv = document.createElement('div');
        contentDiv.className = "content-text";
        contentDiv.innerText = `${post.content}`;

        let commentDiv = document.createElement('div');
        commentDiv.className = "comment-cnt-div";

        let commentCnt = document.createElement('div');
        commentCnt.className = "comment-cnt-num";
        commentCnt.innerText = commentLength;

        commentDiv.innerHTML += `<img src="/img/comment-cnt.png" class="comment-cnt-img">`;
        commentDiv.appendChild(commentCnt);

        finalDiv.appendChild(titleDiv);
        finalDiv.appendChild(hr);
        finalDiv.appendChild(contentDiv);
        finalDiv.appendChild(commentDiv);

        document.body.appendChild(finalDiv);
    }
    functionOpen();
}
function functionOpen(){
    let contentArr = [...document.getElementsByClassName('content-text')];
    contentArr.forEach((e, i) => {
        e.onclick = () => showContent(e, i);
    })
    
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
    
    let successBtnArr = [...document.getElementsByClassName('edit-success')];
    successBtnArr.forEach((e, i) => {
        e.onclick = () => editSuccess(e, i);
    })
}
let index = -1;
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

function backHome(){
    window.location.href = "/main.html";
}
function showEditDiv(e, i){
    let editDiv = document.getElementsByClassName('edit-post-div')[0];
    if(index != i){
        let buttonRect = e.getBoundingClientRect();
        let buttonX = buttonRect.left + window.pageXOffset;
        let buttonY = buttonRect.top + window.pageYOffset;
        editDiv.style.visibility = "visible";
        editDiv.style.top = `${buttonY}px`;
        editDiv.style.left =`${buttonX - 80}px`;
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
        console.log(document.getElementsByClassName('content-text')[i].innerText);
        if(v.content == document.getElementsByClassName('content-text')[i].innerText) currId = v.id;
    })

    window.location.href = `/shareEditMyPost.html?id=${currId}`;
}

function deleteMyPost(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPosts[i]);
    AllPosts.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('content-text')[i].innerText);
        if(v.content == document.getElementsByClassName('content-text')[i].innerText) currId = v.id;
    })


    axios.delete(`${BASE_URL}/share/post/${currId}`)
    .then(Response => {
        console.log(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function editSuccess(e, i){
    if(e.innerHTML === "완료하기") {
        e.innerHTML = "완료함"

        document.getElementsByClassName('content-profile')[i].innerHTML += `<iconify-icon icon="simple-line-icons:check" class="content-check"></iconify-icon>`;

        const req = {
            isfinish: true
        }

        axios.patch(`${BASE_URL}/share/post/isfinish/${AllPosts[i].id}`, req)
        .then(Response => {
            console.log(Response.data);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });

    }else {
        e.innerHTML = "완료하기"

        document.getElementsByClassName('content-profile')[i].removeChild(document.getElementsByClassName('content-profile')[i].lastElementChild);

        const req = {
            isfinish: false
        }

        axios.patch(`${BASE_URL}/share/post/isfinish/${AllPosts[i].id}`, req)
        .then(Response => {
            console.log(Response.data);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }
}

function showContent(e, i){
    let currId;

    console.log(e, i);
    console.log(AllPosts[i]);
    AllPosts.forEach((v) => {
        console.log(v.content);
        console.log(document.getElementsByClassName('content-text')[i].innerText);
        if(v.content == document.getElementsByClassName('content-text')[i].innerText) currId = v.id;
    })
    console.log(currId);
    window.location.href = `/shareShowPost.html?id=${currId}`;
}