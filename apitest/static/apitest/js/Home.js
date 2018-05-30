function loadTop6() {
	for (var i = 0; i < 6; i++) {
		document.getElementById("topLegend" + (i+1)).innerHTML = 
		`<div class="col-sm-6 mw-100 mh-100 w-50">
			<img src="static/apitest/img/Portraits/` + rank1v1_json[i].best_legend + `.png">
		</div>
		<div class="col-xs-6 text-center w-50">
			<p class="font-weight-bold">` + rank1v1_json[i].name + `</p>
			<p>Rating: ` + rank1v1_json[i].rating + `</p>
			<p>` + rank1v1_json[i].region + `</p>
			<p>Wins: ` + rank1v1_json[i].wins + `</p>
			<p>Losses: ` + (rank1v1_json[i].games - rank1v1_json[i].wins) + `</p>
		</div>`;
	}

	$('.topLegendPanel').click(function(e) {
		var topNum = this.id[this.id.length-1]-1;
		location.href="/result/?ident=" + rank1v1_json[topNum].brawlhalla_id;
	})
}

function loadTwitch() {
	$.ajax({
		type: 'GET',
		url: "ajax/getTwitch",
		success: function(data) {
			data = JSON.parse(data);
			for(var i = 0; i < 3; i++) {
				document.getElementById(("twitchContainer")).innerHTML += 
				`
				<iframe
				    src="https://player.twitch.tv/?channel=` + data[i] + `&muted=true&autoplay=false"
				    height="300"
				    width="100%"
				    frameborder="no"
				    scrolling="no"
				    allowfullscreen="false">
				</iframe>
				`
			}
		}
	})
}

$(document).ready(function() {
	loadTop6();
	loadTwitch();
});