var $ = require('jquery');
var _ = {
	forEach: require('lodash.foreach')
};

$(function () {
  var a = ['raz', 'dwa', 'trzy'];
  _.forEach(a, function (el) {
    $('body').append('<p>' + el + '</p>');
  });
});