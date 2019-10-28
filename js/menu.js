
$(document).ready(function () {
  var firstName = localStorage.getItem('firstName');
  var lastName = localStorage.getItem('lastName');
  $("#user").text(firstName + " " + lastName);
});
