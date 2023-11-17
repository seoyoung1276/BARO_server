const urlParams = new URL(location.href).searchParams;
const id = urlParams.get('id');
// console.log(id);
axios.get(`${BASE_URL}/share/post`)
.then(Response => {
    getUserInfo(Response.data[id]);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});
function getUserInfo(post){
    axios.get(`${BASE_URL}/user/${post.user_no}`)
    .then(Response => {
        // console.log(Response.data.result.name)
        showCurrectPost(post, Response.data.result.name);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
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
    console.log(sendCommentInput.value);

    const userno = await getUserNo();

    axios.post(`${BASE_URL}/share/comment/${userno}`)
    .then(Response => {
        console.log(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function showCurrectPost(postInfo, userInfo){
    console.log(postInfo, userInfo);
    document.getElementsByClassName('post-user')[0].innerText = userInfo;
    document.getElementsByClassName('post-date')[0].innerText = postInfo.date
    document.getElementsByClassName('post-detail')[0].innerText = postInfo.content;
}