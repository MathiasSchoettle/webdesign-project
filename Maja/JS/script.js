showWindowSize();

window.addEventListener("resize", showWindowSize);

var db = firebase.firestore();
var reviews = [];

// get review list from database
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

  // generate final strings, which occur on screen
  var cite = '\"' + reviews[index].cite + '\"';
  var name = '- ' + reviews[index].name + ' ';

  // typing index
  var i = 0;

  // elements to be manipulated
  var starDiv = document.getElementsByClassName('starRev')[0];
  var citeElem = document.getElementsByClassName('cite')[0];
  var nameElem = document.getElementsByClassName('name')[0];

  // speed variables
  var cursorSpeed = 400;
  var delSpeed = 15;

  // cursor only occurs in desktop version, because it looks bad in mobile version
  // due to text-align:center

  if (window.innerWidth > 800) {
    var desktop = true;
    citeElem.textContent = '|';
  } else {
    var desktop = false
  }

  // begin typing animation
  showStars(0);
  startWriting();

  // begin with empty cursor animation
  function startWriting() {
    setTimeout(function() {
      showStars(reviews[index].stars);
    }, 1000);
    setTimeout(cursorAnimation, 0, citeElem, 4, 0)
  }

  // // subfunctions called in loop with setTimeout()

  // function for writing the cite and the name
  // (called recursive in loop with setTimeout())
  function typeWriteLetter(elem, text) {
    if (i < text.length) {

      // get text from previous step
      var temp = "";
      if (i > 0) {
        temp = elem.textContent.substring(0, i);
      }

      // add one letter and a cursor if it is in desktop-version
      if (desktop) {
        elem.textContent = temp + text.charAt(i) + "|";
      } else {
        elem.textContent = temp + text.charAt(i);
      }
      i++;

      // call again as long as the text is complete
      setTimeout(typeWriteLetter, generateSpeed(), elem, text);
    } else {
      if (elem.classList.contains('cite')) {
        // cursor animation between cite and name writing
        i = 0;
        setTimeout(cursorAnimation, 0, elem, 1, 0);
      } else {
        // call remove function
        i = 0;
        setTimeout(cursorAnimation, cursorSpeed / 2, nameElem, 3, 0);
      }
    }
  }

  // function for animated deletion of cite and name
  function typeRem(elem, text) {
    if (text != undefined & i <= text.length) {

      // remove one letter per step
      if (desktop) {
        elem.textContent = text.substring(0, text.length - i) + "|";
      } else {
        elem.textContent = text.substring(0, text.length - i);
      }
      i++;

      // call until text is removed
      setTimeout(typeRem, delSpeed, elem, text);
    } else {
      if (desktop) {
        elem.textContent = text.substring(0, text.length - i);
      }
      i = 0;
      if (elem.classList.contains('name')) {
        // if name is done delete cite
        setTimeout(typeRem, delSpeed, citeElem, cite);
      } else {
        // start writing new cite
        if (index >= reviews.length - 1) {
          index = 0;
        } else {
          index++;
        }
        typeWrite(index);
      }
    }
  }

  // function that hides curser and controls the curser animaton through
  // calling showCurser function
  // in mobile version it is responsible for timing between writing and removng text
  function cursorAnimation(elem, cursorIdle, i) {
    var textWithCursor = elem.textContent;
    var textWithoutCursor = textWithCursor.substring(0, textWithCursor.length - 1)

    if (i < cursorIdle) {
      // cursor animation only in desktop-version
      if (desktop) {
        elem.textContent = textWithoutCursor;
        setTimeout(cursorVisible, cursorSpeed, elem, textWithCursor, textWithoutCursor, cursorIdle, ++i);
      } else {
        setTimeout(cursorAnimation, cursorSpeed * 2, elem, cursorIdle, ++i);
      }
    }
    // call next steps depending on when the curson animation takes place
    else if (elem.classList.contains('name')) {
      setTimeout(typeRem, 0, nameElem, name, 0);
    } else if (cursorIdle > 1) {
      setTimeout(typeWriteLetter, 0, citeElem, cite)
    } else {
      if (desktop) {
        elem.textContent = textWithoutCursor
      }
      setTimeout(typeWriteLetter, 0, nameElem, name);
    }
  }

  // show cursor
  function cursorVisible(elem, textWithCursor, textWithoutCursor, cursorIdle, i) {
    elem.textContent = textWithCursor;
    setTimeout(cursorAnimation, cursorSpeed, elem, cursorIdle, i);
  }

}

// // // utils

// generate random typing speed for every letter to make typing look more natural
function generateSpeed() {
  return Math.floor(Math.random() * 20) + 40;
}

// shuffles list of reviews for random order
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

// // display utils

// calculate font_size of review and height of reviewSection page to fit window width and height
function showWindowSize() {
  let vh = window.innerHeight * 0.01;
  let vw = window.innerWidth * 0.01;

  header_height = 60;

  // adapt font size
  if (window.innerWidth > 800) {
    document.getElementsByClassName('cite')[0].style.fontSize = (2.8 * vw) + 'px';
    document.getElementsByClassName('name')[0].style.fontSize = (1.5 * vw) + 'px';
    header_height = 110;
  }

  // adapt front page height
  document.getElementById('reviewSection').style.height = (100 * vh - header_height) + 'px';
}

// show the stars belonging to current review
function showStars(starNum) {
  var starDiv = document.getElementsByClassName('starRev')[0];

  // reset stars
  while (starDiv.firstChild) {
    starDiv.removeChild(starDiv.firstChild);
  }

  var wholeStars = 0;
  var halfStars = 0;

  //calculate how many stars are needed for the current review
  if (starNum > 5) {
    wholeStars = 5;
    halfStars = 0;
  } else {
    wholeStars = Math.floor(starNum);
    if (starNum - wholeStars > 0.8) {
      wholeStars++;
      halfStars = 0;
    } else if (starNum - wholeStars < 0.2) {
      halfStars = 0;
    } else {
      halfStars = 1;
    }
  }

  // create star elements and attach them to container
  for (let i = 0; i < wholeStars; i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.textContent = "star";
    starDiv.appendChild(starElem);
  }

  // create half star elements and attach them to container
  for (let i = 0; i < halfStars; i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.textContent = "star_half";
    starDiv.appendChild(starElem);
  }

  // create empty star elements and attach them to container
  for (let i = 0; i < 5 - (wholeStars + halfStars); i++) {
    var starElem = document.createElement('i');
    starElem.classList.add('material-icons');
    starElem.textContent = "star_border";
    starDiv.appendChild(starElem);
  }
}
