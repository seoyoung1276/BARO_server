const levelContent = [
    {
        title: "Lv.1 거북이",
        content: "0번 이상 도움을 줬을 경우"
    },
    {
        title: "Lv.2 양",
        content: "5번 이상 도움을 줬을 경우"
    },
    {
        title: "Lv.3 강아지",
        content: "15번 이상 도움을 줬을 경우"
    },
    {
        title: "Lv.4 타조",
        content: "30번 이상 도움을 줬을 경우"
    },
    {
        title: "Lv.5 치타",
        content: "50번 이상 도움을 줬을 경우"
    }

]

let commentSum = 0;

getInfo();
async function getInfo(){
    const userno = await getUserNo();
    // router.get('/:userno', getUserComments)
    axios.get(`${BASE_URL}/together/comment/user/${userno}`)
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
    axios.get(`${BASE_URL}/share/comment/user/${userno}`)
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
    axios.get(`${BASE_URL}/learn/comment/user/${userno}`)
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
    let icon = document.getElementsByClassName('my-level-stemp')[0];
    let name = document.getElementsByClassName('my-level')[0];
    
    let remain = 0;
    if(sum < 5) {
        icon.src = "/img/Lv1_stemp.png";
        name.innerText = "현재 등급은 Lv.1 거북이입니다"
        remain = 5 - sum;
    }else if(sum < 15){
        icon.src = "/img/Lv2_stemp.png";
        name.innerText = "현재 등급은 Lv.2 양입니다"
        remain = 15 - sum;
    }else if(sum < 30) {
        icon.src = "/img/Lv3_stemp.png";
        name.innerText = "현재 등급은 Lv.3 강아지입니다"
        remain = 30 - sum;
    }else if(sum < 50) {
        icon.src = "/img/Lv4_stemp.png";
        name.innerText = "현재 등급은 Lv.4 타조입니다"
        remain = 50 - sum;
    }else {
        icon.src = "/img/Lv5_stemp.png";
        name.innerText = "현재 등급은 Lv.5 치타입니다"
    }
    if(sum < 50) document.getElementsByClassName('to-next-level')[0].innerText = `다음 등급까지 ${remain}도움 남았습니다`;
    else document.getElementsByClassName('to-next-level')[0].innerText = `당신은 멋진 사람입니다!`;
}

function backMyPage(){
    window.location.href = "/myPage.html";
}

function showStempExplanation(event){
    let clickedElement = event.target;
    let parentElement = document.getElementsByClassName('level-standard-stemp-container')[0];
    let title = document.getElementsByClassName('level-standard-explanation-title')[0];
    let content = document.getElementsByClassName('level-standard-explanation-content')[0];
    let children = Array.from(parentElement.children);
    let index = children.indexOf(clickedElement);

    title.innerHTML = levelContent[index].title;
    content.innerHTML = levelContent[index].content;
}