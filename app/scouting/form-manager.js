var Datastore = require('nedb');

var scoutingdb = new Datastore({ filename: __dirname + '/datastore/scouting.db', autoload: true });

function submitScout() {
	var data = {
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

	console.log("data", data);
}
