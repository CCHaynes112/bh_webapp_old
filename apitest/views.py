# -*- coding: utf-8 -*-

from django.shortcuts import render
import requests, json
from django.http import HttpResponse

import sys
import re
sys.path.insert(0, '/home/django/django_project')
from secret_keys import api_key
from secret_keys import twitch_client_id

def index(request):
	rank1v1_response = requests.get('https://api.brawlhalla.com/rankings/1v1/all/1?api_key=' + api_key)
	rank1v1_data = rank1v1_response.json()
	rank1v1_json_string = json.dumps(rank1v1_data)

	context = {'rank1v1_json_string': rank1v1_json_string}
	return render(request, 'apitest/Home.html', context)

def result(request):	
	try:
		usr_input = request.GET.get('ident')

		player_data = requests.get('https://api.brawlhalla.com/player/' + str(usr_input) + '/stats?api_key=' + api_key)
		ranked_data = requests.get('https://api.brawlhalla.com/player/' + str(usr_input) + '/ranked?api_key=' + api_key)

		player_data = player_data.json()
		ranked_data = ranked_data.json()

		player_json_string = json.dumps(player_data)
		ranked_json_string = json.dumps(ranked_data)

		context = {'player_json_string': player_json_string, 'ranked_json_string': ranked_json_string}
		return render(request, 'apitest/Result.html', context)
		
	except:
		return HttpResponse("No such player")

def clans(request):
	return render(request, 'apitest/Clans.html')

def getTwitch(request):
	twitch_response = requests.get("https://api.twitch.tv/helix/streams?game_id=460316&first=3", headers={"Client-ID":twitch_client_id})
	twitch_data = twitch_response.json()
	
	usrIDs = []
	usrNames = []
	for i in range(0, 3):
		usrIDs.append(twitch_data['data'][i]['user_id'])

	for i in range(0, 3):
		twitch_response = requests.get("https://api.twitch.tv/helix/users?id=" + usrIDs[i], headers={"Client-ID":twitch_client_id})
		twitch_data = twitch_response.json()
		usrNames.append(twitch_data['data'][0]['display_name'])

	usrNames = json.dumps(usrNames)

	return HttpResponse(usrNames)

def getPlayer(request):
	usr_input = request.GET.get('ident')

	if re.search('[a-zA-Z]', usr_input):
		#There are letters, can't be an id
		try:
			#Find by name
			data_response = requests.get('https://api.brawlhalla.com/rankings/1v1/all/1?api_key=' + api_key + '&name=' + str(usr_input))
			playerData = data_response.json()
			if not playerData:
				raise Exception()
			playerData = json.dumps(playerData)
			return HttpResponse(playerData)

		except:
			return HttpResponse('error')
		
	else:
		#Input is only numbers
		try:
			#Try to get a player by ID
			data_response = requests.get('https://api.brawlhalla.com/player/' + str(usr_input) + '/stats?api_key=' + api_key)

			playerData = data_response.json()
			if not playerData:
				raise Exception()
			playerData = json.dumps(playerData)
			return HttpResponse(playerData)
		except:
			#No ID by that input
			try:
				#Try to get a Steam ID
				data_response = requests.get('https://api.brawlhalla.com/search?steamid=' + usr_input + '&api_key=' + api_key)
				playerData = data_response.json()
				if not playerData:
					raise Exception()
				playerData = json.dumps(playerData)
				return HttpResponse(playerData)
			except:
				#No SteamID by that input
				pass
			return HttpResponse('error')