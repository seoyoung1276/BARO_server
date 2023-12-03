const urlParams = new URL(location.href).searchParams;
const id = urlParams.get('id');

let commentId;
let comments;
axios.get(`${BASE_URL}/share/post`)
.then(Response => {
    console.log(Response.data);
    getUserInfo(Response.data[id]);
    commentId = Response.data[id].id;
    console.log(commentId);
    getComment(commentId);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});
function getUserInfo(post){
    axios.get(`${BASE_URL}/user/${post.user_no}`)
    .then(Response => {
        showCurrectPost(post, Response.data.result.name);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function getComment(commentid){
    axios.get(`${BASE_URL}/share/comment/${commentid}`)
    .then(Response => {
        console.log(Response.data);
        comments = Response.data;
        showComments(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showComments(comments){
    console.log(comments);

    let subComments = [];
    let notSubComments = comments.filter(e => {
        console.log(e);
        if(e.responseto == null || e.responseto == undefined) return e;
        else subComments.push(e);
    });

    console.log(notSubComments);
    console.log(subComments);

    for(let comment of notSubComments){
        console.log(comment);
        getUserName(comment);
        
    }

    let sortSubComments = subComments.sort((one, two) => {
        if(one.responseto > two.responseto) return 1;
        else if(one.responseto == two.responseto) return 0;
        else return -1;
    });

    sortSubComments.sort((one, two) => {
        if(one.responseto === two.responseto && one.id < two.id) return 1;
        else if(one.responseto === two.responseto && one.id === two.id) return 0;
        else return -1;
    })

    setTimeout(() => {
        for(let comment of sortSubComments){
            let commentIndex;
            notSubComments.forEach((e, i) => {
                if(e.id === comment.responseto) commentIndex = i;
            });
            console.log(commentIndex);
    
            getSubUserName(comment, commentIndex);
        }
    }, 1000);
    
}

let subIndex;
function SharefunctionOpen(){
    let subComment = [...document.getElementsByClassName('add-comment')];
    console.log(subComment);
    subComment.forEach((e, i) => {
        e.onclick = () => {
            subIndex = i;
            addSubComment(i);
            console.log(i);
        }
    })
}

function addSubComment(index){
    console.log(index);
    let comment = document.getElementsByClassName('comment-username')[index];
    document.getElementsByClassName('input-comment')[0].placeholder = `${comment.innerText}님 에게`;
    console.log(comment);
    console.log(comment.innerText);
}

function getUserName(comment){
    console.log(comment);
    axios.get(`${BASE_URL}/user/${comment.user_no}`)
    .then(Response => {
        console.log(Response.data.result.name)
        userName = Response.data.result.name;
        makeComments(comment, Response.data.result.name);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function getSubUserName(comment, commentIndex){
    console.log(comment);
    axios.get(`${BASE_URL}/user/${comment.user_no}`)
    .then(Response => {
        console.log(Response.data.result.name)
        userName = Response.data.result.name;
        makeSubComments(comment, Response.data.result.name, commentIndex);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function makeSubComments(comments, userName, commentIndex){
    let finalDiv = document.createElement('div');
        finalDiv.className = "sub-comments";
    
        let commentDetailDiv = document.createElement('div');
        commentDetailDiv.className = "comment-detail"
    
        let commentProfileDiv = document.createElement('div');
        commentProfileDiv.className = "comment-profile";
    
        let commentUsername = document.createElement('div');
        commentUsername.className = "comment-username";
        commentUsername.innerHTML = userName;
    
        commentProfileDiv.innerHTML = `<iconify-icon icon="healthicons:ui-user-profile" class="user-comment-profile-img"></iconify-icon>`;
        commentProfileDiv.appendChild(commentUsername);
    
        let commetContentDiv = document.createElement('div');
        commetContentDiv.className = "comment-content";
        commetContentDiv.innerHTML = comments.comment;
    
        let commentInfoDiv = document.createElement('div');
        commentInfoDiv.className = "sub-comment-info";
    
        let commentDate = document.createElement('div');
        commentDate.className = "comment-date";
        let postDate = new Date(comments.date);
        let Kdate = `${postDate.getFullYear()}-${String(postDate.getMonth()+1).padStart(2, 0)}-${String(postDate.getDate()).padStart(2, 0)}`;
        let Ktime =  `${String(postDate.getHours()).padStart(2, 0)}:${String(postDate.getMinutes()).padStart(2,0)}:${String(postDate.getSeconds()).padStart(2, 0)}`;
        commentDate.innerHTML = `${Kdate} ${Ktime}`;
    
        commentInfoDiv.appendChild(commentDate);
        // commentInfoDiv.innerHTML += `<iconify-icon icon="ic:baseline-comment" class="add-comment"></iconify-icon>`;
    
        commentDetailDiv.appendChild(commentProfileDiv);
        commentDetailDiv.appendChild(commetContentDiv);
        commentDetailDiv.appendChild(commentInfoDiv);
    
        finalDiv.innerHTML = `<iconify-icon icon="tdesign:enter" class="sub-comment-enter"></iconify-icon>`;
        finalDiv.appendChild(commentDetailDiv);

        console.log(document.getElementsByClassName('comments')[commentIndex]);
        document.getElementsByClassName('comments')[commentIndex].after(finalDiv);
        
}

function makeComments(comment, userName){
    let parentDiv = document.getElementsByClassName('comment-area')[0];
        
    let finalDiv = document.createElement('div');
    finalDiv.className = "comments";

    let profileDiv = document.createElement('div');
    profileDiv.className = "comment-profile";

    let commentUsername = document.createElement('div');
    commentUsername.className = "comment-username";
    commentUsername.innerHTML = userName;

    profileDiv.innerHTML = `<iconify-icon icon="healthicons:ui-user-profile" class="user-comment-profile-img"></iconify-icon>`;

    profileDiv.appendChild(commentUsername);

    let commentContentDiv = document.createElement('div');
    commentContentDiv.className = "comment-content";
    commentContentDiv.innerHTML = comment.content;

    let commentInfoDiv = document.createElement('div');
    commentInfoDiv.className = "comment-info";

    let commentDate = document.createElement('div');
    commentDate.className = "comment-date";
    let postDate = new Date(comment.date);
    let Kdate = `${postDate.getFullYear()}-${String(postDate.getMonth()+1).padStart(2, 0)}-${String(postDate.getDate()).padStart(2, 0)}`;
    let Ktime =  `${String(postDate.getHours()).padStart(2, 0)}:${String(postDate.getMinutes()).padStart(2,0)}:${String(postDate.getSeconds()).padStart(2, 0)}`;
    commentDate.innerHTML = `${Kdate} ${Ktime}`;

    commentInfoDiv.appendChild(commentDate);
    commentInfoDiv.innerHTML += `<iconify-icon icon="ic:baseline-comment" class="add-comment"></iconify-icon>`;

    finalDiv.appendChild(profileDiv);
    finalDiv.appendChild(commentContentDiv);
    finalDiv.appendChild(commentInfoDiv);

    parentDiv.appendChild(finalDiv);

    console.log("comment");
    SharefunctionOpen();
}

function backBtn(){
    window.location.href = "/share.html";
}

let sendCommentInput = document.getElementsByClassName('input-comment')[0];

sendCommentInput.addEventListener("keyup", function(event){
    if(event.keyCode === 13){
        sendComment();
    }
});

async function sendComment(){
    const userno = await getUserNo();
    notSubComments = comments.filter(e => e.responseto == null || e.responseto == undefined);
    console.log(notSubComments);

    if(sendCommentInput.placeholder === "댓글 추가"){
        const req = {
            user_no: userno,
            content: sendCommentInput.value
        }
    
        axios.post(`${BASE_URL}/share/comment/${commentId}`, req)
        .then(Response => {
            console.log(Response.data);
            document.getElementsByClassName('comment-area')[0].replaceChildren();
            sendCommentInput.value = "";
            getComment(commentId);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });
    }else{
        console.log(subIndex);
        console.log(notSubComments[subIndex].id);
        const req = {
            user_no: userno,
            content: sendCommentInput.value,
            responseTo: notSubComments[subIndex].id
        }
    
        console.log(req);

        axios.post(`${BASE_URL}/share/comment/${commentId}`, req)
        .then(Response => {
            console.log(Response.data);
            document.getElementsByClassName('comment-area')[0].replaceChildren();
            sendCommentInput.value = "";
            sendCommentInput.placeholder = "댓글 추가"
            getComment(commentId);
        })
        .catch(error => {
            console.error('There has been a problem with your axios request:', error);
        });

    }
}

function showCurrectPost(postInfo, userInfo){
    console.log(postInfo, userInfo);

    let postDate = new Date(postInfo.date);
    let Kdate = `${postDate.getFullYear()}-${String(postDate.getMonth()+1).padStart(2, 0)}-${String(postDate.getDate()).padStart(2, 0)}`;
    let Ktime =  `${String(postDate.getHours()).padStart(2, 0)}:${String(postDate.getMinutes()).padStart(2,0)}:${String(postDate.getSeconds()).padStart(2, 0)}`;

    document.getElementsByClassName('post-user')[0].innerText = userInfo;
    document.getElementsByClassName('post-date')[0].innerText = `${Kdate} ${Ktime}`;
    document.getElementsByClassName('post-detail')[0].innerText = postInfo.content;
}