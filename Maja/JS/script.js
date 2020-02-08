showWindowSize();

window.addEventListener("resize", showWindowSize);

var db = firebase.firestore();
var reviews = [];

db.collection("reviewSection").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    var name = doc.data().name;
    var cite = doc.data().text;
    var stars = doc.data().stars;
    reviews.push({
      cite: cite,
      name: name,
      stars: stars
    });
  });
  reviews = randomize(reviews);
  typeWrite()
});

// type writing animation
function typeWrite(index = 0) {
  var cite = '\"' + reviews[index].cite + '\"';
  var name = '- ' + reviews[index].name + ' ';
  var i = 0;

  var starDiv = document.getElementsByClassName('starRev')[0];
  var citeElem = document.getElementsByClassName('cite')[0];
  var nameElem = document.getElementsByClassName('name')[0];

  var cursorSpeed = 400;
  var delSpeed = 15;

  if (window.innerWidth > 800) {
    citeElem.textContent = '|';
  }
  showStars(0);
  startWriting();

  function startWriting() {
    setTimeout(function() {
      showStars(reviews[index].stars);
    }, 1000);
    setTimeout(cursorAnimation, 0, citeElem, 4, 0)
  }

  function typeWriteLetter(elem, text) {
    if (i < text.length) {
      var temp = "";
      if (i > 0) {
        temp = elem.textContent.substring(0, i);
      }
      if (window.innerWidth > 800) {
        elem.textContent = temp + text.charAt(i) + "|";
      } else {
        elem.textContent = temp + text.charAt(i);
      }
      i++;
      setTimeout(typeWriteLetter, generateSpeed(), elem, text);
    } else {
      if (elem.classList.contains('cite')) {
        i = 0;
        setTimeout(cursorAnimation, 0, elem, 1, 0);
      } else {
        i = 0;
        setTimeout(cursorAnimation, cursorSpeed / 2, nameElem, 3, 0);
      }
    }
  }

  function typeRem(elem, text) {
    if (text != undefined & i <= text.length) {
      if (window.innerWidth > 800) {
        elem.textContent = text.substring(0, text.length - i) + "|";
      } else {
        elem.textContent = text.substring(0, text.length - i);
      }
      i++;
      setTimeout(typeRem, delSpeed, elem, text);
    } else {
      if (window.innerWidth > 800) {
        elem.textContent = text.substring(0, text.length - i);
      }
      i = 0;
      if (elem.classList.contains('name')) {
        setTimeout(typeRem, delSpeed, citeElem, cite);
      } else {
        if (index >= reviews.length - 1) {
          index = 0;
        } else {
          index++;
        }
        typeWrite(index);
      }
    }
  }

  function cursorAnimation(elem, cursorIdle, i) {
    var textWithCursor = elem.textContent;
    var textWithoutCursor = textWithCursor.substring(0, textWithCursor.length - 1)
    if (i < cursorIdle) {
      if (window.innerWidth > 800) {
        elem.textContent = textWithoutCursor;
        setTimeout(cursorVisible, cursorSpeed, elem, textWithCursor, textWithoutCursor, cursorIdle, ++i);
      } else {
        setTimeout(cursorAnimation, cursorSpeed * 2, elem, cursorIdle, ++i);
      }
    } else if (elem.classList.contains('name')) {
      setTimeout(typeRem, 0, nameElem, name, 0);
    } else if (cursorIdle > 1) {
      setTimeout(typeWriteLetter, 0, citeElem, cite)
    } else {
      if (window.innerWidth > 800) {
        elem.textContent = textWithoutCursor
      }
      setTimeout(typeWriteLetter, 0, nameElem, name);
    }
  }

  function cursorVisible(elem, textWithCursor, textWithoutCursor, cursorIdle, i) {
    elem.textContent = textWithCursor;
    setTimeout(cursorAnimation, cursorSpeed, elem, cursorIdle, i);
  }

}

// utils

function generateSpeed() {
  return Math.floor(Math.random() * 20) + 40;
}

function randomize(list) {
  var i = list.length;
  var temp;
  var j;

  while (0 !== i) {

    j = Math.floor(Math.random() * i);
    i -= 1;

    temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  return list;
}

// display utils

function showWindowSize() {
  let vh = window.innerHeight * 0.01;
  document.getElementById('reviewSection').style.height = (100 * vh - 110) + 'px';
}

function showStars(starNum) {
  var starDiv = document.getElementsByClassName('starRev')[0];
  while (starDiv.firstChild) {
    starDiv.removeChild(starDiv.firstChild);
  }
  if (starNum > 5) {
    var wholeStars = 5;
    var halfStars = 0;
  } else if (starNum % 1 === 0) {
    var wholeStars = starNum;
    var halfStars = 0;
  } else {
    var wholeStars = Math.floor(starNum);
    if (starNum - wholeStars > 0.8) {
      wholeStars++;
      var halfStars = 0;
    } else if (starNum - wholeStars < 0.2) {
      var halfStars = 0;
    } else {
      var halfStars = 1;
    }
  }

  for (let i = 0; i < wholeStars; i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.textContent = "star";
    starDiv.appendChild(starElem);
  }

  for (let i = 0; i < halfStars; i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.textContent = "star_half";
    starDiv.appendChild(starElem);
  }

  for (let i = 0; i < 5 - (wholeStars + halfStars); i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.textContent = "star_border";
    starDiv.appendChild(starElem);
  }
}
