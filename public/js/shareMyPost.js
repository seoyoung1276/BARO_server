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
        showMyPosts(posts, response.data.name);

    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showMyPosts(posts, userName){
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
        profileDiv.innerHTML += `<iconify-icon icon="simple-line-icons:check" class="content-check"></iconify-icon>`;

        let editDiv = document.createElement('div');
        editDiv.className = 'edit-content edit-content-btn';

        let editBtn = document.createElement('div');
        editBtn.className = "edit-success";
        editBtn.innerText = "완료하기";

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
        e.onclick = () => showContent(i);
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
    successBtnArr.forEach((e) => {
        e.onclick = () => editSuccess(e);
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
    editButton.onclick = () => editMyPost(i);
    deleteButton.onclick = () => deleteMyPost(i);
}

function editMyPost(i){
    window.location.href = `/shareEditMyPost.html?id=${i}`;
}

function deleteMyPost(i){
    let post_no = AllPosts[i].id;
    axios.delete(`${BASE_URL}/share/post/${post_no}`)
    .then(Response => {
        console.log(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function editSuccess(e){
    if(e.innerHTML === "완료하기") e.innerHTML = "완료함"
    else e.innerHTML = "완료하기"
}

function showContent(i){
    window.location.href = `/shareShowPost.html?id=${i}`;
}