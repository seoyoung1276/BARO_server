const loginButton = document.getElementsByClassName('logIn')[0];

function handleGoogleLogin() {
    window.location.href = 'http://ec2-13-125-87-160.ap-northeast-2.compute.amazonaws.com:3000/auth/google/';
}

