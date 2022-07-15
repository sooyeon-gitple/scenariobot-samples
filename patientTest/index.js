
const TEST_RESULTS = ['1', '2', '3', '4', '5'];
let type =  'start'//'<%= type %>';

let resultPoint = 0;



if (type !== 'start' && !TEST_RESULTS.includes(type)) {

	window.location = './index.html';
  // window.location.href =  window.location.origin + '/static/patient_test';
}

if (window.addEventListener) {
  window.addEventListener('load', windowLoaded, false);
} else if (window.attachEvent){
  window.attachEvent('onload', windowLoaded);
} else {
  window.onload = windowLoaded;
}

function getUrlParam(key) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(key);
}

function windowLoaded() {
	type = getUrlParam('type') || 'start';
	console.log('>>>type :', type);

  if (type !== 'start') {
    showResult(type);
  }
}

window.GitpleConfig = {
  "appCode":"DIYpe1lmPEtG5fXf25Z5oBt49e4i63",
  enableCookie: false
};
!function(){function e(){function e(){var e=t.contentDocument,a=e.createElement("script");a.type="text/javascript",a.async=!0,a.src=window[n]&&window[n].url?window[n].url+"/inapp-web/gitple-loader.js":"https://app.gitple.io/inapp-web/gitple-loader.js",a.charset="UTF-8",e.head&&e.head.appendChild(a)}var t=document.getElementById(a);t||((t=document.createElement("iframe")).id=a,t.style.display="none",t.style.width="0",t.style.height="0",t.addEventListener?t.addEventListener("load",e,!1):t.attachEvent?t.attachEvent("onload",e):t.onload=e,document.body.appendChild(t))}var t=window,n="GitpleConfig",a="gitple-loader-frame";if(!window.Gitple){document;var i=function(){i.ex&&i.ex(arguments)};i.q=[],i.ex=function(e){i.processApi?i.processApi.apply(void 0,e):i.q&&i.q.push(e)},window.Gitple=i,t.attachEvent?t.attachEvent("onload",e):t.addEventListener("load",e,!1)}}();
function openGitple() {
  const startBtn = document.querySelector('.start-btn');

  if (startBtn.className.includes('go-start')) {
    startBtn.classList.remove('go-start');
    if (window.Gitple) {
      window.Gitple('boot');
      window.Gitple('hide');
      window.Gitple('open');
    }

    setTimeout(() => {
      startBtn.innerHTML = "다시 시작하기";
    }, 500);
  } else {
    if (window.Gitple) {
      window.Gitple('shutdown');
      window.Gitple('boot');
      window.Gitple('open');
    }
  }
}

function getTestResult(result) {
  let testResult;

  switch (true) {
    case (result <= 7):
      testResult = '5';
      break;
    case (result <= 10):
      testResult = '4';
      break;
    case (result <= 13):
      testResult = '3';
      break;
    case (result <= 17):
      testResult = '2';
      break;
    case (result >= 18 ):
      testResult = '1';
      break;
    default:
      testResult = '1';
  }

  return testResult;
}

function copyPageUrl() {
  const tempInput = document.createElement('input'),
        text = window.location.href + '?type=share';

  document.body.appendChild(tempInput);

  tempInput.value = text;
  tempInput.select();

  document.execCommand('copy');
  document.body.removeChild(tempInput);

  alert('URL이 복사되었습니다!');
}

function goToMain() {
	window.location = './index.html';
  // const url = window.location.origin + '/static/patient_test';
  // window.location = url;
}

function goToGitpleChat() {
  const url =  "http://gitple.io/?utm_source=PATIENTTEST&utm_medium=homepage_link&utm_campaign=Inside&utm_content=220624_patienttest&utm_term=";
  window.open(url);
}

function setOpenGraphText(title, description) {
  const ogTitle = document.querySelector('meta[property="og:title"]'),
        ogDesc = document.querySelector('meta[property="og:description"]');

  ogTitle.setAttribute('content', title);
  ogDesc.setAttribute('content', description);
}

function setOpenGraphImg(testResult) {
  const ogImg = document.querySelector('meta[property="og:title"]');
  ogImg.setAttribute('src', window.location.origin + '/static/img/og_' + testResult + '.png');
}

function setOpenGraph(testResult){
  switch(testResult) {
    case '1':
      setOpenGraphText('당신의 인내력: 세살아기 등급', '이러한 인내력으로는 세상을 살아갈 수 없어요!');
      break;
    case '2':
      setOpenGraphText('당신의 인내력: 만년다이어터 등급', '이정도면… 유리멘탈…');
      break;
    case '3':
      setOpenGraphText('당신의 인내력: 어린이 등급', '이 험난한 사회, 어떻게 버티시려구요?');
      break;
    case '4':
      setOpenGraphText('당신의 인내력: 회사원 등급', '사회생활하는데 문제는 없겠는걸요?');
      break;
    case '5':
      setOpenGraphText('당신의 인내력: 부처상 등급', '당신은 그 어떤 진상도 버텨낼 수 있으리!');
      break;
  }

  setOpenGraphImg(testResult);
}

Gitple('onMessage', (message) => {
  if (message.type === "resetResult") { // reset point
    resultPoint = Number(message.data.point);
  } else if (message.type === "add") {  // add point
    resultPoint += Number(message.data.point);
  } else if (message.type === "getTestResult") {
    const testResult = getTestResult(resultPoint);
    showResult(testResult);
    // window.location = './results/' + testResult + '.html';
    // window.location = window.location.origin + '/static/patient_test/' + testResult;
  }
})

function showResult(testResult) {
  this.setOpenGraph(testResult);

  const startBlock = document.querySelector('.bad-customer-start');
  if (startBlock) {
    startBlock.style.display = 'none';
  }

  const resultContainer = document.querySelector('.result-container'),
	resultImage = document.querySelector('.result-image > img');
	console.log('here',  testResult )
	resultImage.setAttribute('src', './results/images/test_result_' + testResult + '.png');
	//   resultImage.setAttribute('src', window.location.origin + '/static/img/test_result_' + testResult + '.png');
  resultContainer.classList.add('show');

  const resultText = document.querySelector('.result-' + testResult);
  resultText && resultText.classList.add('show');

  Gitple('close');
}
