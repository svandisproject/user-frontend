const filesystem = require('fs');
const f = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
filesystem.readFile(f, 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	var result = data.replace(/node: false/g, 'node: {crypto: true, stream: true}');
	filesystem.writeFile(f, result, 'utf8', function (err) {
		if (err) return console.log(err);
	});
});