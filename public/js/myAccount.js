let stuName = document.getElementsByClassName('my-name')[0];
let stuMajor = document.getElementsByClassName('my_major')[0];
let stuClass = document.getElementsByClassName('my_class')[0];
let stuEmail = document.getElementsByClassName('my-account')[0];

function backMyPage(){
    window.location.href = "/myPage.html";
}

axios.get(`${BASE_URL}/auth/userinfo`, { withCredentials: true})
    .then(response => {
        console.log('User info:', response.data);
        let grade_info = response.data.name.substring(0, 1);
        let class_info = response.data.name.substring(1, 2);
        let id_info = response.data.name.substring(2, 4);
        stuName.innerText = response.data.name;
        stuMajor.innerText = response.data.major;
        stuClass.innerText = `${grade_info}학년 ${class_info}반 ${id_info}번`;
        stuEmail.innerText = response.data.email;
    })
    .catch(error => {
        console.error('There has been a problem with your axios request:', error);
    });

async function logout(){
    try{
    await axios.post(`${BASE_URL}/auth/logout`);
        window.location.href = "index.html";
    }catch(error){
        console.error('There has been a problem with your axios request:', error);
    }
}