/*jshint globalstrict: true, devel: true, esversion: 6 */

String.prototype.nbsp = function() {
	return this.replace(/(\s[aiouwz])\s/g, function(match, p1, offset, string) {
		return p1 + '&nbsp;';
	});
};

var tekst = 'Ala i As poszli w las';
console.log(tekst.nbsp());