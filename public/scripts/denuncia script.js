var loginPage = document.getElementById('login-page');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('exit-button');
var mainPage = document.getElementById('main-page');
var postButton = document.getElementById('send-button');
var stateEntry = document.getElementById('input-estado');
var municipalityEntry = document.getElementById('input-municipio');
var mpEntry = document.getElementById('input-ministerio');
var officialEntry = document.getElementById('input-funcionario');
var factsEntry = document.getElementById('input-denuncia');

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

    });

    firebase.auth().onAuthStateChanged(onAuthStateChanged);

    postButton.addEventListener('click', function(){
      writeNewPost(firebase.auth().currentUser, stateEntry.value, municipalityEntry.value,
                        mpEntry.value, officialEntry.value, factsEntry.value);
      stateEntry.value="";
      municipalityEntry.value="";
      mpEntry.value="";
      officialEntry.value="";
      factsEntry.value="";
    });
}, false);

function writeNewPost(user, state, municipality, mp, official, factsEntry) {
  if(factsEntry == ''){}else{
    var uid = user.uid;
    var username = user.displayName;
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    var date = today.getDate() + "-" + today.getMonth() + "-" + today.getFullYear();
    var dateNow = Date.now();

    var postData = {
    author: username,
    uid: uid,
    state: state,
    municipality: municipality,
    mp: mp,
    official: official,
    factsEntry: factsEntry,
    date: date + " " + time,
    dateNow: dateNow
    }
  };


  var newPostKey = firebase.database().ref().child('posts').push().key;

  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}