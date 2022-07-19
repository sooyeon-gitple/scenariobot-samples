let isShared = false;

window.onload = windowLoaded;


function getUrlParam(key) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(key);
}

function windowLoaded() {
	isShared = getUrlParam('type') === 'share';

    const testButton = document.getElementById('tryTestButton');
  if (isShared) {
    testButton.innerText = ' 나도 테스트 해보기'
    const shareButton = document.getElementById('shareTestButton');
    shareButton.style.display = 'none';
  } else {
    testButton.innerText = '다시 테스트 하기'
  }
}


function copyPageUrl() {
  const tempInput = document.createElement('input'),
        text = window.location.href + '?type=share' ;

  document.body.appendChild(tempInput);

  tempInput.value = text;
  tempInput.select();

  document.execCommand('copy');
  document.body.removeChild(tempInput);

  alert('URL이 복사되었습니다!');
}

function goToMain() {
  window.location = '../../index.html';
}

function goToGitpleChat() {
  const url =  "http://gitple.io/?utm_source=PATIENTTEST&utm_medium=homepage_link&utm_campaign=Inside&utm_content=220624_patienttest&utm_term=";
  window.open(url);
}
