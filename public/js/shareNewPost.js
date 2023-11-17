function backShare(){
    window.location.href = '/share.html'
}

async function makePost(){
    let titleC = document.getElementsByClassName("post-title")[0].value;
    let contentC = document.getElementsByClassName('post-main')[0].value;

    const userNo = await getUserNo();
    
    const req = {
        user_no: userNo,
        title: titleC,
        content: contentC
    }
    await axios.post(`${BASE_URL}/share/post`, req)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
    backShare()
}