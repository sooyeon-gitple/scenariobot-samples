
const TEST_RESULTS = ['1', '2', '3', '4', '5'];
let isShared = false;
let resultPoint = 0;
let testResult = null; // Number(1 ~ 5)




if (window.addEventListener) {
  window.addEventListener('load', windowLoaded, false);
} else if (window.attachEvent){
  window.attachEvent('onload', windowLoaded);
} else {
  window.onload = windowLoaded;
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

function getUrlParam(key) {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(key);
}

function windowLoaded() {

	// isShared = getUrlParam('type') === 'share';
  // testResult = getUrlParam('result');


  // if (isShared && testResult) {
  //   setOpenGraphContents();
  // }
  // if (testResult) {
  //   showResult(testResult);
  // }

}


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

// function copyPageUrl() {
//   const tempInput = document.createElement('input'),
//         text = window.location.pathname + '?type=share' + '&result='+ testResult;

//   document.body.appendChild(tempInput);

//   tempInput.value = text;
//   tempInput.select();

//   document.execCommand('copy');
//   document.body.removeChild(tempInput);

//   alert('URL이 복사되었습니다!');
// }

// function goToMain() {
//   window.location = './index.html';
// }

// function goToGitpleChat() {
//   const url =  "http://gitple.io/?utm_source=PATIENTTEST&utm_medium=homepage_link&utm_campaign=Inside&utm_content=220624_patienttest&utm_term=";
//   window.open(url);
// }


// function setOpenGraphContents() {
//   const { ogUrl, ogTitle, ogImg, ogDesc } = getOpenGraphText(testResult);


//   const head = document.querySelector('head');

//   const metaUrl = document.createElement('meta')
//   metaUrl.setAttribute('property', 'og:url')
//   metaUrl.setAttribute('content', ogUrl);

//   const metaTitle = document.createElement('meta')
//   metaTitle.setAttribute('property', 'og:title')
//   metaTitle.setAttribute('content', ogTitle);

//   const metaImage = document.createElement('meta')
//   metaImage.setAttribute('property', 'og:image')
//   metaImage.setAttribute('content', ogImg);

//   const metaDescription = document.createElement('meta')
//   metaDescription.setAttribute('property', 'og:description')
//   metaDescription.setAttribute('content', ogDesc);

//   // head.appendChild(metaUrl);
//   // head.appendChild(metaTitle);
//   // head.appendChild(metaImage);
//   // head.appendChild(metaDescription);
//   head.insertBefore(metaUrl, head.children[0]);
//   head.insertBefore(metaTitle, head.children[0]);
//   head.insertBefore(metaImage, head.children[0]);
//   head.insertBefore(metaDescription, head.children[0]);
// }

// function setOpenGraphText(title, description) {
//   // const ogTitle = document.querySelector('meta[property="og:title"]'),
//   //       ogDesc = document.querySelector('meta[property="og:description"]');

//   // ogTitle.setAttribute('content', title);
//   // ogDesc.setAttribute('content', description);
// }

// function setOpenGraphImg(testResult) {
//   // const ogImg = document.querySelector('meta[property="og:title"]');
//   // ogImg.setAttribute('src','./results/images/og_' + testResult + '.png');
// }


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

  // Check local
  const origin = window.location.origin === 'file://' ?  window.location.pathname : window.location.origin
//TODO: pathname without last file name
  window.location.href = origin + '/patienttest/results/' + testResult;

  // this.setOpenGraph(testResult);

  // const startBlock = document.querySelector('.bad-customer-start');
  // if (startBlock) {
  //   startBlock.style.display = 'none';
  // }

  // const resultContainer = document.querySelector('.result-container'),
	// resultImage = document.querySelector('.result-image > img');
	// resultImage.setAttribute('src', './results/images/test_result_' + testResult + '.png');
	// //   resultImage.setAttribute('src', window.location.origin + '/static/img/test_result_' + testResult + '.png');
  // resultContainer.classList.add('show');

  // const resultText = document.querySelector('.result-' + testResult);
  // resultText && resultText.classList.add('show');

  // const testButton = document.getElementById('tryTestButton');
  // if (isShared) {
  //   testButton.innerText = ' 나도 테스트 해보기'
  //   const shareButton = document.getElementById('shareTestButton');
  //   shareButton.style.display = 'none';
  // } else {
  //   testButton.innerText = '다시 테스트 하기'
  // }

  Gitple('close');
}

// function setOpenGraph(testResult){
//   console.log(3333, testResult)

//   switch(testResult) {
//     case '1':
//       setOpenGraphText('당신의 인내력: 세살아기 등급', '이러한 인내력으로는 세상을 살아갈 수 없어요!');
//       break;
//     case '2':
//       setOpenGraphText('당신의 인내력: 만년다이어터 등급', '이정도면… 유리멘탈…');
//       break;
//     case '3':
//       setOpenGraphText('당신의 인내력: 어린이 등급', '이 험난한 사회, 어떻게 버티시려구요?');
//       break;
//     case '4':
//       setOpenGraphText('당신의 인내력: 회사원 등급', '사회생활하는데 문제는 없겠는걸요?');
//       break;
//     case '5':
//       setOpenGraphText('당신의 인내력: 부처상 등급', '당신은 그 어떤 진상도 버텨낼 수 있으리!');
//       break;
//   }

//   setOpenGraphImg(testResult);
// }


// const getOpenGraphText = (id /*: string = ''*/) => {

//   const baseSrc =  window.location.origin + window.location.pathname + 'results/images';//'https://api-sample.gitple.io/static/img',
//         baseUrl =  window.location.origin + window.location.pathname; //'./results';//'https://api-sample.gitple.io/static/patient_test';

//   switch(id) {
//     case '1':
//       return {
//         ogTitle: '당신의 인내력: 세살아기 등급',
//         ogDesc: '이러한 인내력으로는 세상을 살아갈 수 없어요!',
//         ogImg: `${baseSrc}/og_${id}.png`,
//         ogUrl: `${baseUrl}?result=1`
//       };
//     case '2':
//       return {
//         ogTitle: '당신의 인내력: 만년다이어터 등급',
//         ogDesc: '이정도면… 유리멘탈…',
//         ogImg: `${baseSrc}/og_${id}.png`,
//         ogUrl: `${baseUrl}?result=2`
//       };
//     case '3':
//       return {
//         ogTitle: '당신의 인내력: 어린이 등급',
//         ogDesc: '이 험난한 사회, 어떻게 버티시려구요?',
//         ogImg: `${baseSrc}/og_${id}.png`,
//         ogUrl: `${baseUrl}/${id}`
//       };
//     case '4':
//       return {
//         ogTitle: '당신의 인내력: 회사원 등급',
//         ogDesc: '사회생활하는데 문제는 없겠는걸요?',
//         ogImg: `${baseSrc}/og_${id}.png`,
//         ogUrl: `${baseUrl}/${id}`
//       };
//     case '5':
//       return {
//         ogTitle: '당신의 인내력: 부처상 등급',
//         ogDesc: '당신은 그 어떤 진상도 버텨낼 수 있으리!',
//         ogImg: `${baseSrc}/og_${id}.png`,
//         ogUrl: `${baseUrl}/${id}`
//       };
//     default:
//       return {
//         ogTitle: '인내력 테스트: 나의 인내력은 어느 수준일까?',
//         ogDesc: '진상 고객과 대화, 어디까지 버틸 수 있니?',
//         ogImg: `${baseSrc}/og_main.png`,
//         ogUrl: `${baseUrl}`
//       };
//   }
// }
