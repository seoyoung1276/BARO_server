function clickEye(){
    isOpen = document.getElementsByClassName('input-icon')[0].classList.contains('open');

    if(isOpen){
        document.getElementsByClassName('pw-input')[0].type = "password";
        document.getElementsByClassName('icon-div')[0].innerHTML = `<iconify-icon icon="fluent:eye-28-regular" class="input-icon" onclick="clickEye()"></iconify-icon>`
        document.getElementsByClassName('input-icon')[0].classList.remove('open');
    }else{
        document.getElementsByClassName('pw-input')[0].type = "text";
        document.getElementsByClassName('icon-div')[0].innerHTML = `<iconify-icon icon="ph:eye-closed-light" class="input-icon" onclick="clickEye()"></iconify-icon>`
        document.getElementsByClassName('input-icon')[0].classList.add('open');
    }
}

function logIn(){
    idValue = document.getElementsByClassName('id-input')[0].value;
    pwValue = document.getElementsByClassName('pw-input')[0].value;
    if(idValue === ''){
        return alert('아이디를 입력해주세요!');
    }
    if(pwValue === ''){
        return alert('비밀번호를 입력해주세요!');
    }

    return window.location.href = '/main.html';
}