var Datastore = require('nedb');

var scoutingdb = new Datastore({ filename: __dirname + '/datastore/scouting.db', autoload: true });

function submitScout() {
	var stage = $("#stage").val();
	var matchNum = $("#match_num").val();

	var teamNum = $("#team_num").val();
	var teamAlliance = $("#team_alliance").val();

	var autoDefense = $("#auto_defense").val();
	var autoSpeed = $("#auto_speed").val();
	var autoHGoals = $("#auto_h_goals").val();
	var autoLGoals = $("#auto_l_goals").val();

	var teleopDefense = $("#teleop_defense").val();
	var teleopSpeed = $("#teleop_speed").val();
	var teleopHGoals = $("#teleop_h_goals").val();
	var teleopLGoals = $("#teleop_l_goals").val();

	console.log("stage", stage);
	console.log("match_num", matchNum);

	console.log("team_num", teamNum);
	console.log("team_alliance", teamAlliance);

	console.log("auto_defense", autoDefense);
	console.log("auto_speed", autoSpeed);
	console.log("auto_h_goals", autoHGoals);
	console.log("auto_l_goals", autoLGoals);

	console.log("teleop_defense", teleopDefense);
	console.log("teleop_speed", teleopSpeed);
	console.log("teleop_h_goals", teleopHGoals);
	console.log("teleop_l_goals", teleopLGoals);
}
