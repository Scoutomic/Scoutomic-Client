var Datastore = require('nedb');

var localdb = new Datastore({ filename: __dirname + '/datastore/local.db', autoload: true });

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
	}

	console.log("data", data);

	localdb.insert(data, function(err, newDoc) {
		if (err) {
			console.log(err);
		} else {
			location.reload();
		}
	});
}
