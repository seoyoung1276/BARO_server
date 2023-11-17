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