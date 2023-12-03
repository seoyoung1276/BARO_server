
let nickname = document.getElementsByClassName("student-id")[0];
let major = document.getElementsByClassName("major")[0];
let level = document.getElementsByClassName("level-name")[0];

function backHome(){
    window.location.href = "/main.html"
}

// 세션에서 로그인한 사용자 정보 불러오는거 
axios.get(`${BASE_URL}/auth/userinfo`, { withCredentials: true})
    .then(response => {
        console.log('User info:', response.data);
        nickname.innerText = response.data.name;
        major.innerText = response.data.major;
        // level.innerText
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });

let commentSum = 0;

getInfo();
async function getInfo(){
    const userno = await getUserNo();
    // router.get('/:userno', getUserComments)
    axios.get(`${BASE_URL}/together/comment/${userno}`)
    .then(Response => {
        console.log(Response.data);
        commentSum += Response.data.length;
        getShareCommentLength(userno);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}

function getShareCommentLength(userno){
    axios.get(`${BASE_URL}/share/comment/${userno}`)
    .then(Response => {
        console.log(Response.data);
        commentSum += Response.data.length;
        getLearnCommentLength(userno);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
function getLearnCommentLength(userno){
    axios.get(`${BASE_URL}/learn/comment/${userno}`)
    .then(Response => {
        console.log(Response.data);
        commentSum += Response.data.length;
        getCurrectLevel(commentSum);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}
function getCurrectLevel(sum){
    let icon = document.getElementsByClassName('level-icon')[0];
    let name = document.getElementsByClassName('level-name')[0];
    console.log(sum);
    if(sum < 5) {
        icon.innerHTML = `<img src="/img/Lv1_stemp.png" class="stemps">`;
        name.innerText = "Lv1.거북이"
    }else if(sum < 15){
        icon.innerHTML = `<img src="/img/Lv2_stemp.png" class="stemps">`
        name.innerText = "Lv2.양"
    }else if(sum < 30) {
        icon.innerHTML = `<img src="/img/Lv3_stemp.png" class="stemps">`
        name.innerText = "Lv3.강아지"
    }else if(sum < 50) {
        icon.innerHTML = `<img src="/img/Lv4_stemp.png" class="stemps">`
        name.innerText = "Lv4.타조"
    }else {
        icon.innerHTML = `<img src="/img/Lv5_stemp.png" class="stemps">`
        name.innerText = "Lv5.치타"
    }
    document.getElementsByClassName('help-cnt')[0].innerText = sum;
}

axios.get(`${BASE_URL}/together/post/user/${userno}`)
.then(Response => {
    console.log(Response.data);
    document.getElementsByClassName('post-cnt')[1].innerText = Response.data.length;
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

axios.get(`${BASE_URL}/share/post/user/${userno}`)
.then(Response => {
    console.log(Response.data);
    document.getElementsByClassName('post-cnt')[0].innerText = Response.data.length;
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

axios.get(`${BASE_URL}/learn/post/user/${userno}`)
.then(Response => {
    console.log(Response.data);
    document.getElementsByClassName('post-cnt')[2].innerText = Response.data.length;
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});


function shareMyPost(){
    window.location.href = "/shareMyPost.html";
}

function goMyAccount(){
    window.location.href = "/myAccount.html";
}

function goMyLevel(){
    window.location.href = "/myLevel.html";
}