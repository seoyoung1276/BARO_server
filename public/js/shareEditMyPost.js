const urlParams = new URL(location.href).searchParams;
const id = urlParams.get('id');
let contentInfo;
axios.get(`${BASE_URL}/share/post`)
.then(Response => {
    contentInfo = Response.data[id];
    showData(Response.data[id]);
})
.catch(error => {
    console.error('There has been a problem with your axios request:', error);
});

function showData(data){
    document.getElementsByClassName('post-title')[0].value = data.title;
    document.getElementsByClassName('post-main')[0].value = data.content;
}

function backShare(){
    window.location.href = '/shareMyPost.html'
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
    axios.patch(`${BASE_URL}/share/post/${post_no}`, req)
    .then(Response => {
        console.log(Response.data);
        window.location.href = '/shareMyPost.html'
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
}