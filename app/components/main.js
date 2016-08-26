(function () {
	var electron = require('electron');
	var os = require('os');
	
	var remote = electron.remote;
	var BrowserWindow = electron.BrowserWindow;

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
	}

	document.onreadystatechange = function () {
		var yosemite = false;

		if (os.platform() === 'darwin' && os.release().split('.')[0] >= 10) {
			yosemite = true;
		}

		if (document.readyState == "complete" && !yosemite) {
			init();
		}
	};
})();
