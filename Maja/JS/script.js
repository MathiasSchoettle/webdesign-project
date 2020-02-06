showWindowSize();

window.addEventListener("resize", showWindowSize);

var reviews = [{
    stars: 1,
    cite: "TRUST ME, THIS IS THE WORST MOVIE YOU WILL EVER SEE IN YOUR ENTIRE LIFE",
    name: "RCARSTAIRS, IMDB"
  },
  {
    stars: 0.5,
    cite: "THE ROOM IS SO UNFEASIBLY BAD IT HAS BECOME A CULT HIT",
    name: "STEVE ROSE, THE GUARDIAN"
  },
  {
    stars: 1,
    cite: "YOU REALLY CAN'T BELIEVE HOW TERRIBLE THE ROOM IS",
    name: "ALONSO DURALDE, IMDB"
  },
  {
    stars: 1.5,
    cite: "I DIDN'T THINK IT WAS POSSIBLE TO MAKE A FILM SO BAD",
    name: "KRISTINE, IMDB"
  }
];

typeWrite();

function showWindowSize() {
  let vh = window.innerHeight * 0.01;
  document.getElementById('reviewSection').style.height = (100 * vh - 110) + 'px';
}

function showStars(starNum) {
  var starDiv = document.getElementsByClassName('starRev')[0];
  while(starDiv.firstChild){
    starDiv.removeChild(starDiv.firstChild);
  }
  if (starNum % 1 === 0) {
    var wholeStars = starNum;
    var halfStars = 0;
  } else {
    var wholeStars = Math.floor(starNum);
    var halfStars = 1;
  }

  for (let i = 0; i < wholeStars; i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.innerHTML = "star";
    starDiv.appendChild(starElem);
  }

  for (let i = 0; i < halfStars; i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.innerHTML = "star_half";
    starDiv.appendChild(starElem);
  }

  for (let i = 0; i < 5 - (wholeStars + halfStars); i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.innerHTML = "star_border";
    starDiv.appendChild(starElem);
  }
}

function generateSpeed() {
  return Math.floor(Math.random() * 30) + 30;
}

function typeWrite(index = 0) {
  var cite = '\"' + reviews[index].cite + '\"';
  var name = '- ' + reviews[index].name;
  var i = 0;

  var starDiv = document.getElementsByClassName('starRev')[0];
  var citeElem = document.getElementsByClassName('cite')[0];
  var nameElem = document.getElementsByClassName('name')[0];


  var speed = generateSpeed()

  startWriting();

  function startWriting() {
    showStars(0);
    setTimeout(function() {
      showStars(reviews[index].stars);
      typeWriteCite();
    }, 1000);
  }

  function typeWriteCite() {
    if (i < cite.length) {
      citeElem.innerHTML += cite.charAt(i);
      i++;
      setTimeout(typeWriteCite, speed);
    } else {
      i = 0;
      setTimeout(typeWriteName, speed);
    }
  }

  function typeWriteName() {
    if (i < name.length) {
      nameElem.innerHTML += name.charAt(i);
      i++;
      setTimeout(typeWriteName, speed);
    } else {
      i = 0;
      speed /= 3;
      setTimeout(typeRemName, speed + 1000);
    }
  }

  function typeRemName() {
    if (i <= name.length) {
      nameElem.innerHTML = name.substring(0, name.length - i);
      i++;
      setTimeout(typeRemName, speed);
    } else {
      i = 0;
      setTimeout(typeRemCite, speed);
    }
  }

  function typeRemCite() {
    if (i <= cite.length) {
      citeElem.innerHTML = cite.substring(0, cite.length - i);
      i++;
      setTimeout(typeRemCite, speed);
    } else {
      i = 0;
      if (index >= reviews.length -1) {
        index = 0;
      } else {
        index++;
      }
      typeWrite(index)
    }
  }
}
