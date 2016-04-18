var Datastore = require('nedb');
var jetpack = _interopDefault(require('fs-jetpack'));

var localdb = new Datastore({ filename: __dirname + '/datastore/local.db', autoload: true });

var app$1;
if (process.type === 'renderer') {
	app$1 = require('electron').remote.app;
} else {
	app$1 = require('electron').app;
}
var appDir = jetpack.cwd(app$1.getAppPath());
var manifest = appDir.read('package.json', 'json');
var env = manifest.env;

function submitScout() {
	var data = {
		time: Math.floor(Date.now() / 1000),
		year: 2016,
		fields: {
			stage: $("#stage").val(),
			matchNum: $("#match_num").val(),
			teamNum: $("#team_num").val(),
			teamAlliance: $("#team_alliance").val(),
			autoDefense: $("#auto_defense").val(),
			autoSpeed: $("#auto_speed").val(),
			autoHGoals: $("#auto_h_goals").val(),
			autoLGoals: $("#auto_l_goals").val(),
			teleopDefense: $("#teleop_defense").val(),
			teleopSpeed: $("#teleop_speed").val(),
			teleopHGoals: $("#teleop_h_goals").val(),
			teleopLGoals: $("#teleop_l_goals").val()
		}
	};

	console.log("data", data);

	localdb.insert(data, function(err, newDoc) {
		if (err) {
			console.log(err);
		} else {
			location.reload();
		}
	});
}

setInterval(function() {
	var url = env.url ? env.url : "http://127.0.0.1";

	localdb.find({}, function(err, docs) {
		docs.forEach(function(doc) {
			$.ajax({
				type: "POST",
				url: url,
				data: doc,
				success: function() {
					console.log("successful request to", url);

					localdb.remove({ _id: doc._id }, {}, function(err) {
						if (err) {
							console.log(err);
						}
					});
				}
			});
		});
	});
}, 5000);

function _interopDefault (ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex;
}
