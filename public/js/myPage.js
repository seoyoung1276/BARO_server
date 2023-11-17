
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



function shareMyPost(){
    window.location.href = "/shareMyPost.html";
}

function goMyAccount(){
    window.location.href = "/myAccount.html";
}

function goMyLevel(){
    window.location.href = "/myLevel.html";
}