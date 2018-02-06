function createWinLossPie(wins, loss, id, isHidden)
{
	google.charts.setOnLoadCallback(drawChart);

	function drawChart()
	{
		var data = google.visualization.arrayToDataTable([
		['WL Ratio', 'Number'],
		['Wins', wins],
		['Loss', loss],
		]);

		var options = {
			'backgroundColor': '#222222',
			'chartArea': { width: "100%", height: "100%"},
			'colors': ['#008080', '#800000'],
			'is3D': 'true',
			'legend': {position: 'none'}
		};

		var container = document.getElementById(id);
		
		container.style.display = 'block';
		var chart = new google.visualization.PieChart(container);
		if(isHidden)
		{
			google.visualization.events.addListener(chart, 'ready', function () {
		    	container.style.display = 'none';
			});
		}
		
		chart.draw(data, options);
	}
}

function createDamageBar(dmgTake, dmgRec, id, isHidden)
{
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() 
	{
		var data = google.visualization.arrayToDataTable([
		['Damage Ratio', '', {role: 'style'}],
		['Damage Done', dmgTake, '#008080'],
		['Damage Taken', dmgRec, '#800000']
		]);

		var options = {
			title: 'Damage Analysis',
			titleTextStyle: {
				color: '#8c8c8c',
			},
			backgroundColor: '#222222',
			chartArea: {width: '50x%',}, 
			legend: {position: 'none'},
			fontSize: 13,
			vAxis: {
				minValue: 0,
			},
		};

		var container = document.getElementById(id);
		container.style.display = 'block';
		var chart = new google.visualization.ColumnChart(container);
		if(isHidden)
		{
			google.visualization.events.addListener(chart, 'ready', function () {
		    	container.style.display = 'none';
			});
		}

		chart.draw(data, options);
	}
}

function createDamageDonut(dmgUn, dmgPri, dmgSec, dmgThr, dmgGad, id, isHidden)
{
	google.charts.setOnLoadCallback(drawChartDamageType1);

	function drawChartDamageType1()
	{
		var data = google.visualization.arrayToDataTable([
		['Type', 		'Number'],
		['Unarmed', 	dmgUn],
		['Primary', 	dmgPri],
		['Secondary', 	dmgSec],
		['Thrown', 		dmgThr],
		['Gadget', 		dmgGad],
		]);

		var options = {	
			pieHole: 0.4,
			pieSliceBorderColor: '#111111',
			'backgroundColor': '#222222',
			'chartArea': {height: "100%", width: "100%"},
			'colors': ['#5D4777', '#008080', '#800000', '#A4D65E', '#FFA300'],
			'legend': {position: 'none'}
		};

		var container = document.getElementById(id);
		container.style.display = 'block';
		var chart = new google.visualization.PieChart(container);
		if(isHidden)
		{
			google.visualization.events.addListener(chart, 'ready', function () {
		    	container.style.display = 'none';
			});
		}
		
		chart.draw(data, options);
	}
}