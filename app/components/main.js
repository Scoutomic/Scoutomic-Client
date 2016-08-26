(function () {
	var electron = require('electron');
	var os = require('os');

	var remote = electron.remote;
	var BrowserWindow = electron.BrowserWindow;

	function initTitleBar() {
		$("#title-bar-btns").show();
		$("#title").show();

		$("#min-btn").click(function() {
			var window = remote.getCurrentWindow();
			window.minimize();
		});

		$("#max-btn").click(function() {
			var window = remote.getCurrentWindow();
			window.maximize();
		});

		$("#close-btn").click(function() {
			var window = remote.getCurrentWindow();
			window.close();
		});
	}


	$(document).ready(function() {
		if (!(os.platform() === 'darwin' && os.release().split('.')[0] >= 10)) {
			initTitleBar();
		}
	});
})();
