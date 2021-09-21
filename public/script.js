/* eslint-disable no-alert */
const firstDiv = document.querySelector('.firstDiv');
const outerFormDiv = document.querySelector('.formDiv');
const featureDiv = document.querySelector('.featureDiv');
const sortButton = document.querySelector('.toggle');
const checkBlankInput = (value) => value === '';

let sortedBy = 'date';
const loadBugs = () => {
  firstDiv.innerHTML = '';
  const bugButton = document.createElement('button');
  bugButton.innerHTML = '🐛';
  outerFormDiv.appendChild(bugButton);
  bugButton.addEventListener('click', () => {
    const formDiv = document.createElement('div');
    const formArray = ['problem', 'errorText', 'commit'];
    formArray.forEach((form) => {
      const label = document.createElement('label');
      label.innerHTML = `<h1>${form}</h1>`;
      const formInput = document.createElement('input');
      formInput.name = form;
      formDiv.appendChild(label);
      formDiv.appendChild(formInput);
    });
    outerFormDiv.appendChild(formDiv);
    const submitButton = document.createElement('button');
    submitButton.innerHTML = '💀';
    outerFormDiv.appendChild(submitButton);
    submitButton.addEventListener('click', () => {
      if (document.querySelector('.button-selected') === null) {
        alert('Please select a Feature!');
        return;
      }
      const getData = [...document.querySelectorAll('input')];
      const featureSelected = document.querySelector('.button-selected').value;
      const formData = getData.map((x) => x.value);
      if (formData.some(checkBlankInput)) {
        alert('Please fill out all fields!');
        return;
      }
      const data = {
        problem: formData[0],
        errorText: formData[1],
        commit: formData[2],
        featureID: featureSelected,
      };
      axios
        .post('/', data)
        .then((response) => {
          alert(response);
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        })
        .catch((error) => { console.log(error); });
    });
  });
  const featureButton = document.createElement('button');
  featureButton.innerHTML = '💣';
  featureDiv.appendChild(featureButton);
  featureButton.addEventListener('click', () => {
    const featureTitle = document.createElement('h2');
    featureTitle.innerHTML = 'Feature name:';
    const featureName = document.createElement('input');
    const featureSubmit = document.createElement('button');
    featureSubmit.innerHTML = 'Submit';
    featureDiv.appendChild(featureTitle);
    featureDiv.appendChild(featureName);
    featureDiv.appendChild(featureSubmit);
    featureSubmit.addEventListener('click', () => {
      console.log(featureName.value);
      const featureData = {
        name: featureName.value,
      };
      axios
        .post('/feature/submit', featureData)
        .then((response) => {
          alert('Feature submitted!');
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);
        });
    });
  });
  sortButton.addEventListener('click', () => {
    const bugDiv = document.querySelectorAll('.bugDiv');
    const bugList = document.querySelector('.bugList');
    if (sortedBy === 'date') {
      const bugFeaturesSelect = document.querySelectorAll('.featureName');
      const bugFeaturesArray = [...bugFeaturesSelect].map((i) => i.innerHTML);
      bugDiv.forEach((bug, i) => {
        bug.feature = bugFeaturesArray[i];
      });
      const divArrFeature = [].slice.call(bugDiv).sort((a, b) => (a.feature > b.feature ? 1 : -1));
      divArrFeature.forEach((div) => {
        bugList.appendChild(div);
      });
      sortedBy = 'feature';
    }
    else {
      const bugDatesSelect = document.querySelectorAll('.dateCreated');
      const bugDatesArray = [...bugDatesSelect].map((i) => i.innerHTML);
      bugDiv.forEach((bug, i) => {
        bug.date = bugDatesArray[i];
      });
      const divArrDate = [].slice.call(bugDiv).sort((a, b) => (b.date > a.date ? 1 : -1));
      divArrDate.forEach((div) => {
        bugList.appendChild(div);
      });
      sortedBy = 'date';
    }
  });
};
const loadLogin = () => {
  // registration
  const registrationDiv = document.createElement('div');
  const registrationLabel = document.createElement('h1');
  registrationLabel.innerHTML = 'Registration';
  const registrationEmailLabel = document.createElement('h2');
  registrationEmailLabel.innerHTML = 'Email';
  const registrationEmail = document.createElement('input');
  const registrationPassword = document.createElement('input');
  registrationEmail.classList.add('registration');
  registrationPassword.classList.add('registration');
  const registrationPasswordLabel = document.createElement('h2');
  registrationPasswordLabel.innerHTML = 'Password';
  const registrationButton = document.createElement('button');
  registrationButton.innerHTML = 'Submit';
  registrationDiv.appendChild(registrationLabel);
  registrationDiv.appendChild(registrationEmailLabel);
  registrationDiv.appendChild(registrationEmail);
  registrationDiv.appendChild(registrationPasswordLabel);
  registrationDiv.appendChild(registrationPassword);
  registrationDiv.appendChild(registrationButton);
  firstDiv.appendChild(registrationDiv);
  // login
  const loginDiv = document.createElement('div');
  const loginLabel = document.createElement('h1');
  loginLabel.innerHTML = 'Login';
  const loginEmailLabel = document.createElement('h2');
  loginEmailLabel.innerHTML = 'Email';
  const loginEmail = document.createElement('input');
  const loginPassword = document.createElement('input');
  loginEmail.classList.add('login');
  loginPassword.classList.add('login');
  const loginPasswordLabel = document.createElement('h2');
  loginPasswordLabel.innerHTML = 'Password';
  const loginButton = document.createElement('button');
  loginButton.innerHTML = 'Submit';
  loginDiv.appendChild(loginLabel);
  loginDiv.appendChild(loginEmailLabel);
  loginDiv.appendChild(loginEmail);
  loginDiv.appendChild(loginPasswordLabel);
  loginDiv.appendChild(loginPassword);
  loginDiv.appendChild(loginButton);
  firstDiv.appendChild(loginDiv);

  registrationButton.addEventListener('click', () => {
    const getData = [...document.querySelectorAll('.registration')];
    const formData = getData.map((x) => x.value);
    if (formData.some(checkBlankInput)) {
      alert('Please fill out all fields!');
      return;
    }
    const data = {
      email: formData[0],
      password: formData[1],
    };
    axios
      .post('/register', data)
      .then((response) => {
        if (response.data === 'emailExists') {
          alert('That email already exists!');
        }
        else if (response.data === 'userCreated') {
          firstDiv.remove();
          loadBugs();
        }
      });
  });
  loginButton.addEventListener('click', () => {
    const getData = [...document.querySelectorAll('.login')];
    const formData = getData.map((x) => x.value);
    if (formData.some(checkBlankInput)) {
      alert('Please fill out all fields!');
      return;
    }
    const data = {
      email: formData[0],
      password: formData[1],
    };
    axios
      .get('/login', data)
      .then((response) => {
        if (response.data === 'invalidLogin') {
          alert('Please check your details!');
        }
        else if (response.data === 'loggedIn') {
          firstDiv.remove();
          loadBugs();
        }
      });
  });
};

window.onload = () => {
  axios
    .get('/checkCookies')
    .then((response) => {
      if (response.data === 'renderLogin') {
        loadLogin();
      }
      else if (response.data === 'renderBugs') {
        loadBugs();
      }
    });
};
