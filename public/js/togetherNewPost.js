function backTogether(){
    window.location.href = "/together.html"
}

async function makePost(){
    const dateFormat = /^\d{4}\/\d{2}\/\d{2}$/;

    let title = document.getElementsByClassName('new-post-title')[0].value;
    let content = document.getElementsByClassName('post-content-input')[0].value;
    let place = document.getElementsByClassName('post-place')[0].value;
    let meet_date = document.getElementsByClassName('post-date')[0].value;
    let hire_personnal = document.getElementsByClassName('recruitment-input')[0].value;
    
    if(title === "") return alert('제목을 입력하세요')
    else if(content === "") return alert('글 내용을 입력하세요')
    else if(place === "") return alert('장소를 입력하세요');
    else if(meet_date === "") return alert('날짜를 입력하세요')
    else if(!(dateFormat.test(meet_date))) return alert('날짜를 다시 입력하세요')
    else if(hire_personnal === "") return alert('모집인원을 입력하세요')
    else if(isNaN(hire_personnal)) return alert('모집인원을 다시 입력하세요')

    const userNo = await getUserNo();

    const req = {
        user_no: userNo,
        title: title,
        content: content,
        place: place,
        meet_date: meet_date,
        Hire_personnel: hire_personnal
    }

    axios.post(`${BASE_URL}/together/post`, req)
    .then(Response => {
        console.log(Response.data);
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });
    window.location.href = "/together.html";
}
