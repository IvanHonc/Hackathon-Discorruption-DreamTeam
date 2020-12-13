var loginPage = document.getElementById('login-page');
var signInButton = document.getElementById('sign-in-button');
var signOutButton = document.getElementById('exit-button');
var mainPage = document.getElementById('main-page');
var entryState = document.getElementById('Estado');
var entryMunicipality = document.getElementById('municipio');
var entryPersons = document.getElementById('Denuncia');
var displayButton = document.getElementById('B1');

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

    displayButton.addEventListener('click', function(){
      if(entryPersons.value=="Todas"){
        displayPost();
      }else{
        displayPostCU(currentUID);
      }
    });
    
}, false);

function displayPost(){
  var result = document.getElementById("table-results");
  result.innerHTML = "";
  firebase.database().ref('posts').limitToLast(200).on('child_added', function(data) {
    if((data.val().state==entryState.value && data.val().municipality==entryMunicipality.value) || (entryState.value=="")){
      var tr=document.createElement("tr");

      var td1=document.createElement("td");
      td1.className="tdID1";
      var p0=document.createElement("p");
      p0.className="Paragraph0";
      p0.appendChild(document.createTextNode("Filtros"));
      var p1=document.createElement("p");
      p1.className="Paragraph1";
      p1.appendChild(document.createTextNode(data.val().state));
      var p2=document.createElement("p");
      p2.className="Paragraph1";
      p2.appendChild(document.createTextNode(data.val().municipality));
      var div0=document.createElement("div");
      div0.className="button-container";
      var a0=document.createElement("a");
      a0.href="conectate.html";
      var b0=document.createElement("button");
      b0.id="Button8";
      b0.appendChild(document.createTextNode("Modificar Filtros"));
      a0.appendChild(b0);
      div0.appendChild(a0);
      td1.appendChild(p0);
      td1.appendChild(p1);
      td1.appendChild(p2);
      td1.appendChild(div0);
  
      var td2=document.createElement("td");
      td2.className="tdID2";
      var p3=document.createElement("p");
      p3.className="Paragraph2";
      p3.appendChild(document.createTextNode(data.val().mp));
      var p4=document.createElement("p");
      p4.className="Paragraph3";
      p4.appendChild(document.createTextNode(data.val().official));
      var p5=document.createElement("p");
      p5.className="Paragraph4";
      p5.appendChild(document.createTextNode(data.val().factsEntry));
      var p6=document.createElement("p");
      p6.className="Paragraph5";
      p6.appendChild(document.createTextNode("Publicado el: " + data.val().date));
      var div1=document.createElement("div");
      div1.className="button-table-container";
      var a1=document.createElement("a");
      a1.href="conectate.html";
      var b1=document.createElement("button");
      b1.id="Button7";
      b1.className="connect-button";
      b1.setAttribute("data-hover", "PRÓXIMAMENTE");
      var s0=document.createElement("span");
      s0.appendChild(document.createTextNode("CONECTAR"));
      b1.appendChild(s0);
      a1.appendChild(b1);
      var br=document.createElement("br");
      div1.appendChild(a1);
      td2.appendChild(p3);
      td2.appendChild(p4);
      td2.appendChild(p5);
      td2.appendChild(p6);
      td2.appendChild(div1);
      td2.appendChild(br);
      td2.appendChild(br);
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      result.appendChild(tr);
    }
  });
}

function displayPostCU(currentUID){
  var result = document.getElementById("table-results");
  result.innerHTML = "";
  firebase.database().ref('user-posts/'+ currentUID).limitToLast(200).on('child_added', function(data) {
    if((data.val().state==entryState.value && data.val().municipality==entryMunicipality.value) || (entryState.value=="")){
      var tr=document.createElement("tr");

      var td1=document.createElement("td");
      td1.className="tdID1";
      var p0=document.createElement("p");
      p0.className="Paragraph0";
      p0.appendChild(document.createTextNode("Filtros"));
      var p1=document.createElement("p");
      p1.className="Paragraph1";
      p1.appendChild(document.createTextNode(data.val().state));
      var p2=document.createElement("p");
      p2.className="Paragraph1";
      p2.appendChild(document.createTextNode(data.val().municipality));
      var div0=document.createElement("div");
      div0.className="button-container";
      var a0=document.createElement("a");
      a0.href="conectate.html";
      var b0=document.createElement("button");
      b0.id="Button8";
      b0.appendChild(document.createTextNode("Modificar Filtros"));
      a0.appendChild(b0);
      div0.appendChild(a0);
      td1.appendChild(p0);
      td1.appendChild(p1);
      td1.appendChild(p2);
      td1.appendChild(div0);
  
      var td2=document.createElement("td");
      td2.className="tdID2";
      var p3=document.createElement("p");
      p3.className="Paragraph2";
      p3.appendChild(document.createTextNode(data.val().mp));
      var p4=document.createElement("p");
      p4.className="Paragraph3";
      p4.appendChild(document.createTextNode(data.val().official));
      var p5=document.createElement("p");
      p5.className="Paragraph4";
      p5.appendChild(document.createTextNode(data.val().factsEntry));
      var p6=document.createElement("p");
      p6.className="Paragraph5";
      p6.appendChild(document.createTextNode("Publicado el: " + data.val().date));
      var div1=document.createElement("div");
      div1.className="button-table-container";
      var a1=document.createElement("a");
      a1.href="conectate.html";
      var b1=document.createElement("button");
      b1.id="Button7";
      b1.className="connect-button";
      b1.setAttribute("data-hover", "PRÓXIMAMENTE");
      var s0=document.createElement("span");
      s0.appendChild(document.createTextNode("CONECTAR"));
      b1.appendChild(s0);
      a1.appendChild(b1);
      var br=document.createElement("br");
      div1.appendChild(a1);
      td2.appendChild(p3);
      td2.appendChild(p4);
      td2.appendChild(p5);
      td2.appendChild(p6);
      td2.appendChild(div1);
      td2.appendChild(br);
      td2.appendChild(br);
  
      tr.appendChild(td1);
      tr.appendChild(td2);
      result.appendChild(tr);
    }
  });
}