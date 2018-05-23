function populateTitle() {
	var fragment = document.createDocumentFragment();
	var elem = document.createElement('h1');
	elem.innerText = playerJson.name;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText ="ID: " + playerJson.brawlhalla_id;
	fragment.appendChild(elem);

	document.getElementById("playerHeader").appendChild(fragment);
}

function populateOverview() {
	document.getElementById('playerLevel').innerHTML = "Level: " + playerJson.level

	createWinLossChart('overviewWinLoss', playerJson.wins, (playerJson.games - playerJson.wins));
}

function populateMostPlayed() {
	//Sorts legends matchtime
	playerJson.legends.sort(function(a, b) {
		return b.matchtime - a.matchtime;
	});

	mpLegend1 = playerJson.legends[0];
	mpLegend2 = playerJson.legends[1];
	
	//Create elements for Most Played 1
	createLegendInfo(0, 'mp1', 'w-50');

	var fragment = document.createDocumentFragment();
	var elem = document.createElement('h6');
	elem.innerText = "Win-Loss";
	fragment.appendChild(elem);

	elem = document.createElement('canvas');
	elem.id = "mp1WL";
	fragment.appendChild(elem);

	elem = document.createElement('br');
	fragment.appendChild(elem);

	elem = document.createElement('h6');
	elem.innerText = "Damage Breakdown";
	fragment.appendChild(elem);

	elem = document.createElement('canvas');
	elem.id = "mp1DB1";
	fragment.appendChild(elem);

	elem = document.createElement('br');
	fragment.appendChild(elem);

	elem = document.createElement('canvas');
	elem.id = "mp1DB2"
	fragment.appendChild(elem);

	document.getElementById('mp1').appendChild(fragment);

	createWinLossChart('mp1WL', mpLegend1.wins, (mpLegend1.games - mpLegend1.wins));

	createDamageChart1('mp1DB1', mpLegend1.damagedealt, mpLegend1.damagetaken);

	createDamageChart2('mp1DB2', mpLegend1.damageweaponone, mpLegend1.damageweapontwo, mpLegend1.damageunarmed, mpLegend1.damagegadgets, mpLegend1.damagethrown);


	//Create elements for Most Played 1
	createLegendInfo(1, 'mp2', 'w-50');

	var fragment = document.createDocumentFragment();
	var elem = document.createElement('h6');
	elem.innerText = "Win-Loss";
	fragment.appendChild(elem);

	elem = document.createElement('canvas');
	elem.id = "mp2WL";
	fragment.appendChild(elem);

	elem = document.createElement('br');
	fragment.appendChild(elem);

	elem = document.createElement('h6');
	elem.innerText = "Damage Breakdown";
	fragment.appendChild(elem);

	elem = document.createElement('canvas');
	elem.id = "mp2DB1";
	fragment.appendChild(elem);

	elem = document.createElement('br');
	fragment.appendChild(elem);

	elem = document.createElement('canvas');
	elem.id = "mp2DB2"
	fragment.appendChild(elem);

	document.getElementById('mp2').appendChild(fragment);

	createWinLossChart('mp2WL', mpLegend2.wins, (mpLegend2.games - mpLegend2.wins));

	createDamageChart1('mp2DB1', mpLegend2.damagedealt, mpLegend2.damagetaken);

	createDamageChart2('mp2DB2', mpLegend2.damageweaponone, mpLegend2.damageweapontwo, mpLegend2.damageunarmed, mpLegend2.damagegadgets, mpLegend2.damagethrown);
}

function populateRanked() {
	var fragment = document.createDocumentFragment();
	var elem = document.createElement('img');
	var tier = rankedJson.tier.split(" ")[0];
	
	elem.src = "/static/apitest/img/Rankings/" + tier + ".png";
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Region: " + rankedJson.region;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = rankedJson.tier;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Peak Rating: " + rankedJson.peak_rating;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Current Rating: " + rankedJson.current_rating;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Games: " + rankedJson.games;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Wins: " + rankedJson.wins;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Losses: " + (rankedJson.games - rankedJson.wins);
	fragment.appendChild(elem);

	document.getElementById('rankedOverview1v1').appendChild(fragment);


	var teams2v2 = rankedJson['2v2'];

	for(var i in teams2v2) {
		tier = teams2v2[i].tier.split(" ")[0];
		document.getElementById('rankedOverview2v2').innerHTML +=
		`
		<h6>` + teams2v2[i].teamname + `</h6>
		<div class="row py-3">
			<div class="col-sm-6">
				<img src="/static/apitest/img/Rankings/` + tier + `.png">
			</div>
			<div class="col-sm-6">
				<p>` + teams2v2[i].tier + `</p>
				<p>Peak Rating: ` + teams2v2[i].peak_rating + `</p>
				<p>Current Rating: ` + teams2v2[i].rating + `</p>
				<p>Games: ` + teams2v2[i].games + `</p>
				<p>Wins: ` + teams2v2[i].wins + `</p>
				<p>Losses: ` + (teams2v2[i].games - teams2v2[i].wins) + `</p>
			</div>
		</div>
		`
	}
}

function populateAllLegends() {
	for(var i in playerJson.legends) {
		document.getElementById('legendDropDownMenu').innerHTML += 
		`
		<a class="dropdown-item legendDropdownItem">` + playerJson.legends[i].legend_name_key + `</a>
		`
	}

	$('.legendDropdownItem').click(function() {
		var legend = this.text;

		for(i in playerJson.legends) {
			if(legend == playerJson.legends[i].legend_name_key) {
				document.getElementById('legendsBox').innerHTML = "";
				createLegendInfo(i, 'legendsBox', 'w-25');

				document.getElementById('legendsBox').innerHTML +=
				`
				<div class="row py-3">
					<div class="col-sm-4">
						<h6>Win-Loss</h6>
						<canvas id="legendBoxWL"></canvas>
					</div>
					<div class="col-sm-4">
						<h6>Damage Given/Taken</h6>
						<canvas id="legendBoxD1"></canvas>
					</div>
					<div class="col-sm-4">
						<h6>Damage Type</h6>
						<canvas id="legendBoxD2"></canvas>
					</div>
				</div>
				`

				createWinLossChart('legendBoxWL', playerJson.legends[i].wins, (playerJson.legends[i].games - playerJson.legends[i].wins));

				createDamageChart1('legendBoxD1', playerJson.legends[i].damagedealt, playerJson.legends[i].damagetaken);

				createDamageChart2('legendBoxD2', playerJson.legends[i].damageweaponone, playerJson.legends[i].damageweapontwo, playerJson.legends[i].damageunarmed, playerJson.legends[i].damagegadgets, playerJson.legends[i].damagethrown);
				break;
			}
		}
	});

	createLegendInfo(2, 'legendsBox', 'w-25', true);

	createWinLossChart('legendBoxWL', playerJson.legends[2].wins, (playerJson.legends[2].games - playerJson.legends[2].wins));

	createDamageChart1('legendBoxD1', playerJson.legends[2].damagedealt, playerJson.legends[2].damagetaken);

	createDamageChart2('legendBoxD2', playerJson.legends[2].damageweaponone, playerJson.legends[2].damageweapontwo, playerJson.legends[2].damageunarmed, playerJson.legends[2].damagegadgets, playerJson.legends[2].damagethrown);
}


$(document).ready(function() {
	populateTitle();
	populateOverview();
	populateMostPlayed();
	populateRanked();
	populateAllLegends();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Support Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createLegendInfo(legendNum, elementId, addClass, prepend) {
	var fragment = document.createDocumentFragment();
	var elem = document.createElement('h5');
	elem.innerText = playerJson.legends[legendNum].legend_name_key;
	fragment.appendChild(elem);

	elem = document.createElement('img');
	elem.className = addClass;
	elem.src = "/static/apitest/img/Portraits/" + playerJson.legends[legendNum].legend_id + ".png";
	fragment.appendChild(elem);

	elem = document.createElement('br');
	fragment.appendChild(elem);
	elem = document.createElement('br');
	fragment.appendChild(elem);

	elem = document.createElement('h6');
	elem.innerText = "Level: " + playerJson.legends[legendNum].level;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	//3600 to convert seconds to hours
	elem.innerText = "PlayTime: " + Math.round(playerJson.legends[legendNum].matchtime / 3660) + "h";
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Total Games: " + playerJson.legends[legendNum].games;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Games Won: " + playerJson.legends[legendNum].wins;
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Games Lost: " + (playerJson.legends[legendNum].games - playerJson.legends[legendNum].wins);
	fragment.appendChild(elem);

	elem = document.createElement('p');
	elem.innerText = "Suicides: " + playerJson.legends[legendNum].suicides;
	fragment.appendChild(elem);

	elem = document.createElement('br');
	fragment.appendChild(elem);

	if(prepend) {
		$('#' + elementId).prepend(fragment);
		return;
	}

	document.getElementById(elementId).appendChild(fragment);
}