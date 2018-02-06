# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json
from django.http import HttpResponse

import sys
sys.path.insert(0, '/home/django/django_project')
from secret_keys import api_key

def index(request):
	top3_response = requests.get('https://api.brawlhalla.com/rankings/1v1/all/1?api_key=' + api_key)

	top3_data = top3_response.json()

	top3_json_string = json.dumps(top3_data)

	context = {'time_series_top3_json_string': top3_json_string}

	return render(request, 'apitest/Home.html', context)

def result(request):	
	if(request.method == 'POST'):
		try:
			usr_input = request.POST.get('ident')

			usr_input = requests.get('https://api.brawlhalla.com/rankings/1v1/all/1?api_key=' + api_key + '&name=' + str(usr_input))
			rankingsDict = usr_input.json()
			rankingsDict = next(iter(rankingsDict))
			usr_input = str(rankingsDict["brawlhalla_id"])

			player_response = requests.get('https://api.brawlhalla.com/player/' + str(usr_input) + '/stats?api_key=' + api_key)
			ranked_response = requests.get('https://api.brawlhalla.com/player/' + str(usr_input) + '/ranked?api_key=' + api_key)

			player_data = player_response.json()
			ranked_data = ranked_response.json()

			player_json_string = json.dumps(player_data)
			ranked_json_string = json.dumps(ranked_data)

			context = {'time_series_player_json_string': player_json_string, 'time_series_ranked_json_string': ranked_json_string}
			return render(request, 'apitest/Result.html', context)
			
		except:
			return HttpResponse("No such player")

	else:
		return HttpResponse("Requests wasn't POST")

def legends(request):

	#legend_response = requests.get('https://api.brawlhalla.com/legend/' + str(x) + '/?api_key=' + api_key)
	#legend_data = legend_response.json()
	#legend_json_string = json.dumps(legend_data)


	#context = {'time_series_legend_list': legend_list}

	legend_id = "Unassigned"

	if(request.method == 'POST'):
		#legend_id = request.POST.get('port')
		legend_id = "POST REQUEST"
		context = {'time_series_legend_id': legend_id}

	if(request.method == 'GET'):
		legend_id = 'Was a GET request...'
		context = {'time_series_legend_id': legend_id}

	return render(request, 'apitest/Legends.html', context)

def about(request):
	return render(request, 'apitest/About.html')