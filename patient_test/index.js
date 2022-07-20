
const TEST_RESULTS = ['1', '2', '3', '4', '5'];
let isShared = false;
let resultPoint = 0;
let testResult = null; // Number(1 ~ 5)




// if (window.addEventListener) {
//   window.addEventListener('load', windowLoaded, false);
// } else if (window.attachEvent){
//   window.attachEvent('onload', windowLoaded);
// } else {
//   window.onload = windowLoaded;
// }

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

function getUrlParam(key) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(key);
}

// function windowLoaded() {

	// isShared = getUrlParam('type') === 'share';
  // testResult = getUrlParam('result');


  // if (isShared && testResult) {
  //   setOpenGraphContents();
  // }
  // if (testResult) {
  //   showResult(testResult);
  // }

// }


function getTestResult(result) {
  let testResult;

  switch (true) {
    case (result <= 7):
      testResult = '1';
      break;
    case (result <= 10):
      testResult = '2';
      break;
    case (result <= 13):
      testResult = '3';
      break;
    case (result <= 17):
      testResult = '4';
      break;
    case (result >= 18 ):
      testResult = '5';
      break;
    default:
      testResult = '5';
  }

  return testResult;
}

Gitple('onMessage', (message) => {
  if (message.type === "resetResult") { // reset point
    resultPoint = Number(message.data.point);
  } else if (message.type === "add") {  // add point
    resultPoint += Number(message.data.point);
  } else if (message.type === "getTestResult") {
    testResult = getTestResult(resultPoint);
    showResult(testResult);
  }
})

function showResult(testResult) {
  let origin =  window.location.origin;
  if (origin === 'file://') { // If run in local html file
    const urlArr = window.location.pathname.split('/');
    origin = urlArr.slice(0, urlArr.length - 2).join('/');
    window.location.href = origin + '/patient-test/results/' + testResult + '/index.html';
  } else {
    window.location.href = origin + '/patient-test/results/' + testResult;
  }

  Gitple('close');
}

