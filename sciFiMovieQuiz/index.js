
window.GitpleConfig = {
  "appCode":"vaw9ykQri9VNyL8FUEqmwO28rW4mn3",
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



function goToGitpleChat() {
  const url =  "https://gitple.io/?utm_source=SCIFIQUIZ&utm_medium=homepage_link&utm_campaign=Inside&utm_content=220704_scifiquiz&utm_term=";
  window.open(url);
}



Gitple('onMessage', (message) => {
  if (message.type === "resetResult") { // reset point
    resultPoint = Number(message.data.point);
  } else if (message.type === "add") {  // add point
    showSnackbar(Number(message.data.point));
    resultPoint += Number(message.data.point);
  } else if (message.type === "getTestResult") {
    const testResult = getTestResult(resultPoint);
    showResult(testResult);
    // window.location = window.location.origin + '/static/sci-fi-movie-quiz/' + testResult;
  }

  console.log("[sci-fi-movie-quiz]", "resultPoint:", resultPoint, message);
})

function showResult(testResult) {
  this.setOpenGraph(testResult);

  const startBlock = document.querySelector('.bad-customer-start');
  if (startBlock) {
    startBlock.style.display = 'none';
  }

  const resultContainer = document.querySelector('.result-container'),
        resultImage = document.querySelector('.result-image > img');

  resultImage.setAttribute('src', window.location.origin + '/static/img/test_result_' + testResult + '.png');
  resultContainer.classList.add('show');

  const resultText = document.querySelector('.result-' + testResult);
  resultText.classList.add('show');

  Gitple('close');
}

function showSnackbar(point) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV

  x.className = "show";

  if (point > 0) {
    x.innerText = "정답(O)입니다!"
  } else {
    x.innerText = "오답(X)입니다."
  }

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
}
