/*jshint globalstrict: true, devel: true, esversion: 6 */
'use strict';

String.prototype.nbsp = function() {
	return this.replace(/(\s[aiouwz])\s/g, function(p1) {
		return p1 + '&nbsp;';
	});
};

var tekst = 'Ala i As poszli w las';
console.log(tekst.nbsp());
