function createWinLossChart(elementId, wins, loss) {
	var ctx = document.getElementById(elementId).getContext('2d');
	var chart = new Chart(ctx, {
	    type: 'doughnut',
	    data: {
	        labels: ["Win", "Loss"],
	        datasets: [{
	            label: 'Win-Loss',
	            data: [wins, loss],
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
	    		text: Math.round((wins / (wins+loss)) * 100) + '%'
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

function createDamageChart1(elementId, dmgGiven, dmgTaken) {
	var ctx = document.getElementById(elementId).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Damage Given", "Damage Taken"],
	        datasets: [{
	            label: 'Damage',
	            data: [dmgGiven, dmgTaken],
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

function createDamageChart2(elementId, primary, secondary, unarmed, gadget, thrown) {
	var ctx = document.getElementById(elementId).getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'pie',
	    data: {
	        labels: ["Primary", "Secondary", "Unarmed", "Gadget", "Thrown"],
	        datasets: [{
	            label: 'Damage by Item',
	            data: [primary, secondary, unarmed, gadget, thrown],
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