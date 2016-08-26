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


	/**
	 * Enable some Bootstrap/Flat-UI features
	 */

	// Custom Selects
	if ($('[data-toggle="select"]').length) {
		$('[data-toggle="select"]').select2();
	}

	// Checkboxes and Radio buttons
	$('[data-toggle="checkbox"]').radiocheck();
	$('[data-toggle="radio"]').radiocheck();

	// Tooltips
	$('[data-toggle=tooltip]').tooltip('show');

	// Switches
	if ($('[data-toggle="switch"]').length) {
		$('[data-toggle="switch"]').bootstrapSwitch();
	}
})();
