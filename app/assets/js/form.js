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
	var d = new Date();
	var data = {
		time: Math.floor(d.getTime() / 1000),
		year: d.getFullYear(),
		event: "cmp",
		fields: {
			stage: $("#stage").val(),
			match: $("#match_num").val(),
			team: {
				number: $("#team_num").val(),
				alliance: $("#team_alliance").val(),
			},
			autonomous: {
				defenses: $("#auto_defense").val() ? $("#auto_defense").val() : [],
				speed: $("#auto_speed").val(),
				highGoals: $("#auto_h_goals").val(),
				lowGoals: $("#auto_l_goals").val()
			},
			teleoperated: {
				defenses: $("#teleop_defense").val() ? $("#teleop_defense").val() : [],
				speed: $("#teleop_speed").val(),
				highGoals: $("#teleop_h_goals").val(),
				lowGoals: $("#teleop_l_goals").val()
			},
			endGame: {
				challenged: $("#end_challenge").val() == "1" ? true : false,
				scale: $("#end_scale").val() == "1" ? true : false
			},
			final: {
				allianceScore: $("#alliance_points").val(),
				contribution: $("#alliance_contribution").val() / 100
			}
		}
	};

	localdb.insert(data, function(err, newDoc) {
		if (err) {
			console.log(err);
		} else {
			location.reload();
		}
	});
}

setInterval(function() {
	var base = env.url ? env.url : "127.0.0.1";

	localdb.find({}, function(err, docs) {
		docs.forEach(function(doc) {
			var url = genURL(base, ["scout", doc.year, doc.event, doc.fields.stage, doc.fields.match]);

			$.ajax({
				type: "POST",
				url: url,
				data: doc.fields,
				success: function() {
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

function genURL(base, path) {
	if (!/^(f|ht)tps?:\/\//i.test(base)) {
		base = "http://" + base;
	}

	if (!/\/$/i.test(base)) {
		base = base + "/";
	}

	return base + path.join("/");
}

function _interopDefault (ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex;
}
