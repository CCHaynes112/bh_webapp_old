function createWinLossChart(elementId, legend) {
	var ctx = document.getElementById(elementId).getContext('2d');
	var loss = (legend.games - legend.wins);
	var chart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: ["Win", "Loss"],
	        datasets: [{
	            label: 'Win-Loss',
	            data: [legend.wins, loss],
	            backgroundColor: [
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 99, 132, 0.2)'
	            ],
	            borderColor: [
	                'rgba(54, 162, 235, 1)',
	                'rgba(255,99,132,1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	title: {
	    		display: true,
	    		text: Math.round((legend.wins / (legend.wins+loss)) * 100) + '%'
	    	},
	    	tooltips: {
	    		titleFontSize: 12,
	    		bodyFontSize:  12
	    	},
	    	legend: {
	    		display: false
	    	}
	    }
	});
}

function createDamageChart1(elementId, legend) {
	var ctx = document.getElementById(elementId).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Damage Given", "Damage Taken"],
	        datasets: [{
	            label: 'Damage',
	            data: [legend.damagedealt, legend.damagetaken],
	            backgroundColor: [
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 99, 132, 0.2)'
	            ],
	            borderColor: [
	                'rgba(54, 162, 235, 1)',
	                'rgba(255,99,132,1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	tooltips: {
	    		titleFontSize: 12,
	    		bodyFontSize:  12
	    	},
	    	legend: {
	    		display: false
	    	},
	    	scales: {
	    		xAxes: [{
	    			display: false
	    		}]
	    	}
	    }
	});
}

function createDamageChart2(elementId, legend) {
	var ctx = document.getElementById(elementId).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'pie',
	    data: {
	        labels: [legendWeapons[legend.legend_id][0], legendWeapons[legend.legend_id][1], "Unarmed", "Gadget", "Thrown"],
	        datasets: [{
	            label: 'Damage by Item',
	            data: [legend.damageweaponone, legend.damageweapontwo, legend.damageunarmed, legend.damagegadgets, legend.damagethrownitem],
	            backgroundColor: [
	                'rgba(54, 162, 235, 0.2)',
	                'rgba(255, 99, 132, 0.2)',
	                'rgba(93, 75, 116, 0.2)',
	                'rgb(242, 160, 11, 0.2)',
	                'rgba(158, 205, 94, 0.2)'

	            ],
	            borderColor: [
	                'rgba(54, 162, 235, 1)',
	                'rgba(255,99,132,1)',
	                'rgba(93, 75, 116, 1)',
	                'rgb(242, 160, 11, 1)',
	                'rgba(158, 205, 94, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	tooltips: {
	    		titleFontSize: 12,
	    		bodyFontSize:  12
	    	},
	    	legend: {
	    		display: false
	    	}
	    }
	});
}