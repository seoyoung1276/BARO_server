const urlParams = new URL(location.href).searchParams;
const paramId = urlParams.get('id');
let contentInfo;
axios.get(`${BASE_URL}/learn/post`)
.then(Response => {

    console.log(Response.data);
    let currectPost;
    let currectIndex;

    Response.data.forEach((e, i) => {
        console.log(e);
        console.log(paramId);
        if(e.id == paramId){
            currectPost = e;
            currectIndex = i;
        } 
    })
    console.log(currectPost);
    console.log(currectIndex);

    contentInfo = Response.data[currectIndex];
    showData(Response.data[currectIndex]);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

function showData(data){
    document.getElementsByClassName('post-title')[0].value = data.title;
    document.getElementsByClassName('post-main')[0].value = data.content;
}
function backShare(){
    window.location.href = '/learnMyPost.html'
}

function editPost(){
    let title = document.getElementsByClassName('post-title')[0].value;
    let content = document.getElementsByClassName('post-main')[0].value;

    if(title === "") return alert('제목을 입력하세요')
    else if(content === "") return alert('내용을 입력하세요');

    const req = {
        title: title, 
        content: content
    }

    let post_no = contentInfo.id;
    axios.patch(`${BASE_URL}/learn/post/${post_no}`, req)
    .then(Response => {
        console.log(Response.data);
        window.location.href = '/learnMyPost.html'
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}






