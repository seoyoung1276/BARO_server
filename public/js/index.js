const loginButton = document.getElementsByClassName('logIn')[0];

function handleGoogleLogin() {
    window.location.href = 'http://ec2-13-125-87-160.ap-northeast-2.compute.amazonaws.com:3000/auth/google/';
}

axios.get('auth/login-failed')
.then(response =>{
    alert('회원가입은 미림 학교 계정으로만 가능합니다.');
})
.catch(error =>{
    console.error('There has been a problem with your axios request:', error);
});