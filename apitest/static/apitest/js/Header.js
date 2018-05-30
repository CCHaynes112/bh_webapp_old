function getPlayerInfo() {
	var form = $('.searchPlayerForm');

	$(form).submit(function(event) {
		event.preventDefault();
		
		switch(this.id) {
			case "search1":
				var formData = $(form[0]).serialize();
				break;
			case "search2":
				var formData = $(form[1]).serialize();
				break;
		}

		$.ajax({
			type: 'get',
			url: $(form).attr('action'),
			data: formData,

			success: function(data) {
				if(data == 'error') {
					document.getElementById("playerModalbody").innerHTML = `<h2>Player not found :(</h2>`;
				}

				else {
					data = JSON.parse(data);
					document.getElementById("playerModalbody").innerHTML ="";

					if(data.name != undefined)
						data = [data];

					for(var i = 0; i < Object.keys(data).length; i++) {
						document.getElementById("playerModalbody").innerHTML +=
						`<form class="form-inline" method="get" action="/result/">

							<h4 class="text-left">` + (i+1) + `.) ` + data[i].region + `:  ` + data[i].name + `</h4>
							
							<input id="playerFormSend` + i + `" type="hidden" name="ident" />

							<button class="btn btn-outline-warning w-100 float-right" type="submit" data-toggle="modal"><i class="fas fa-search"></i></button>
						</form><br><hr>`;
						document.getElementById('playerFormSend' + i).value = data[i].brawlhalla_id;
					}
				}
			}
		})
	})
}

$(document).ready(function() {
	getPlayerInfo();
});