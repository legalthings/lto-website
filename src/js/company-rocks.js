let shownCompanies = [];

function addRandomCompanyBubbles() {
  const companies = [
    '/assets/partners-clients/floating rock - signrequest.png',
    '/assets/partners-clients/floating rock - certik.png',
    '/assets/partners-clients/floating rock - generali.png',
    '/assets/partners-clients/floating rock - docker.png',
    '/assets/partners-clients/floating rock - xurux.png',
    '/assets/partners-clients/floating rock - axveco.png',
    '/assets/partners-clients/floating rock - stena.png',
    '/assets/partners-clients/floating rock - bcg.png',
    '/assets/partners-clients/floating rock - indaver.png',
    '/assets/partners-clients/floating rock - firm24.png',
    '/assets/partners-clients/floating rock - inatba.png',
    '/assets/partners-clients/floating rock - v-id.png',
    '/assets/partners-clients/floating rock - unchain.png',
    '/assets/partners-clients/floating rock - capptions.png',
    '/assets/partners-clients/floating rock - ibm.png',
    '/assets/partners-clients/floating rock - moonwhale.png',
    '/assets/partners-clients/floating rock - dbc.png',
    '/assets/partners-clients/floating rock - hh.png',
    '/assets/partners-clients/floating rock - techdata.png',
    '/assets/partners-clients/floating rock - tictag.png'
  ];

  const alwaysVisibleCompanies = [
    '/assets/partners-clients/floating rock - cms.png',
    '/assets/partners-clients/floating rock - rijksoverheid.png',
    '/assets/partners-clients/floating rock - nen.png'
  ];

  let companiesString = '';

  const container = document.getElementsByClassName('company-container')[0];
  container.innerHTML = '';

  const minImageWidth = 64;
  const maxImageWidth = minImageWidth * 2;

  for (let i = 0; i < 5; i++) {
    const randomSize = Math.floor(Math.random() * maxImageWidth) + minImageWidth;
    const randomCompany = getRandomCompany(companies, true);
    shownCompanies.push(randomCompany);

    companiesString += `<img class="company-rocks" style="width:${randomSize}px;height:${randomSize}px;margin-left:${randomSize / 2 + (i * 0.5)}px" src="${companies[randomCompany]}">`;
  }

  for (let i = 0; i < alwaysVisibleCompanies.length; i++) {
    const randomSize = Math.floor(Math.random() * maxImageWidth) + minImageWidth;
    companiesString += `<img class="company-rocks" style="width:${randomSize}px;height:${randomSize}px;margin-left:${randomSize / 2 + (i * 0.5)}px" src="${alwaysVisibleCompanies[i]}">`;
  }

  container.innerHTML = companiesString;
}

function getRandomCompany(companies, ignoreDuplicates) {
  let random = Math.floor(Math.random() * companies.length - 1) + 1;
  if (shownCompanies.indexOf(random) > -1 && ignoreDuplicates) return getRandomCompany(companies);
  return random;
}