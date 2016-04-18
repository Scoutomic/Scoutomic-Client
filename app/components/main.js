(function () {
	var remote = require('remote');
	var os = require('os');
	var BrowserWindow = remote.require('browser-window');

	function init() {
		$("#title-bar").show();

		document.getElementById("min-btn").addEventListener("click", function (e) {
			var window = BrowserWindow.getFocusedWindow();
			window.minimize();
		});

		document.getElementById("max-btn").addEventListener("click", function (e) {
			var window = BrowserWindow.getFocusedWindow();
			window.maximize();
		});

		document.getElementById("close-btn").addEventListener("click", function (e) {
			var window = BrowserWindow.getFocusedWindow();
			window.close();
		});
	};

	document.onreadystatechange = function () {
		var yosemite = false;

		if (os.platform() === 'darwin' && os.release().split('.')[0] >= 10) {
			yosemite = true;
		}

		if (document.readyState == "complete" && !yosemite) {
			init();
		}
	}
})();
