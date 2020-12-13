var loginPage = document.getElementById('login-page');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('exit-button');
var mainPage = document.getElementById('main-page');

var currentUID;

function onAuthStateChanged(user) {
  if (user && currentUID === user.uid) {
    return;
  }
  if (user) {
    currentUID = user.uid;
    loginPage.style.display = 'none';
    mainPage.style.display  = '';
  } else {
    currentUID = null;
    loginPage.style.display = '';
  }
}

window.addEventListener('load', function() {
    signInButton.addEventListener('click', function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    });
  
    signOutButton.addEventListener('click', function() {
        firebase.auth().signOut();
        mainPage.style.display = 'none';
        console.log("prueba");
    });

    firebase.auth().onAuthStateChanged(onAuthStateChanged);
    
}, false);