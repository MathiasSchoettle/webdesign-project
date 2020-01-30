function openOrCloseMenu() {
  var dropdownMenu = document.getElementById('mainMenuDropDownItems');

  if(dropdownMenu.style.visibility == 'hidden' || dropdownMenu.style.visibility == 0){
    dropdownMenu.style.visibility = 'visible'
    dropdownMenu.style.height = "200px";
  }
  else {
    dropdownMenu.style.visibility = 'hidden';
    dropdownMenu.style.height = "0px";
  }
}
