document.write('<script src="js/jquery.min.js"></script>');
document.write('<script src="js/jquery.transit.js"></script>');
if ( window.innerWidth > 481) {
  document.write('<script src="js/main.js"></script>');
} else {
  document.write('<script src="js/smart.js"></script>');
}