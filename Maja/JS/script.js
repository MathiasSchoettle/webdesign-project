showWindowSize();

window.addEventListener("resize", showWindowSize);
function showWindowSize() {
  let vh = window.innerHeight * 0.01;
  document.getElementById('reviewSection').style.height = (100 * vh - 110) + 'px';
}
