function backShare(){
    window.location.href = "/learn.html";
}

async function editPost(){
    let titleC = document.getElementsByClassName("post-title")[0].value;
    let contentC = document.getElementsByClassName('post-main')[0].value;

    if(titleC === "") return alert('제목을 입력하세요')
    else if(contentC === "") return alert('내용을 입력하세요');

    const userNo = await getUserNo();
    
    const req = {
        user_no: userNo,
        title: titleC,
        content: contentC
    }
    await axios.post(`${BASE_URL}/learn/post`, req)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
    backShare()
}