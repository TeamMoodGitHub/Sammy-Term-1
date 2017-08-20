var btn = document.getElementById("btn");
var champions =[];
var finalChamp = [];
var champArray;
champLoad();
function champLoad(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET',"https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=RGAPI-e4fa6043-d167-464a-bbb0-d5a79c5d3938");
	xhr.send();
	xhr.onload = function(){
		var	xhrData=JSON.parse(xhr.responseText);
		champArray =xhrData;
	}
}
btn.addEventListener("click",function(){
    var summon = document.getElementById("summonerName").value;
	var xhr = new XMLHttpRequest();
	xhr.open('GET',"https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"+summon+"?api_key=RGAPI-e4fa6043-d167-464a-bbb0-d5a79c5d3938" );
	xhr.onload = function(){
		var	xhrData=JSON.parse(xhr.responseText);
		document.getElementById("summonerID").innerHTML = xhrData.id;
		furtherLoad(xhrData.id);
	};
	xhr.send();
})
function furtherLoad(summonId){
	var xhr = new XMLHttpRequest();
	xhr.open('GET',"https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/"+summonId+"?api_key=RGAPI-e4fa6043-d167-464a-bbb0-d5a79c5d3938" );
	xhr.onload = function(){
		var	xhrData=JSON.parse(xhr.responseText);
		sorting(xhrData);
	};
	xhr.send();
}
function sorting(champs){
	champs.sort(compare);
	champions = champs.slice(0,3);
	var xhr2 = new XMLHttpRequest();
	xhr2.open('GET',"http://api.champion.gg/v2/champions/?api_key=43f2528e7f880354877f1bd80651c6ae" );
	xhr2.onload = function(){
		var	xhrData2=JSON.parse(xhr2.responseText);
			for(var x = 0; x<champions.length; x++){
				callChampion(champions[x], xhrData2, x);
			}
	};
	xhr2.send();
}
function callChampion(call, index, x){
			var xhr2 = new XMLHttpRequest();
			xhr2.open('GET',"http://api.champion.gg/v2/champions/"+call.championId+"?api_key=43f2528e7f880354877f1bd80651c6ae" );
			xhr2.onload = function(){
				var	xhrData2=JSON.parse(xhr2.responseText);
					for(var c in champArray.data){
		               if(champArray.data[c].id === call.championId){
							finalChamp[champArray.data[c].name] = xhrData2;
							document.getElementById("champ"+(x+1)).innerHTML = champArray.data[c].name;
							break;
					   }
					}
			};
			xhr2.send();
}
function compare(a,b) {
  if (a.championPoints < b.championPoints)
    return 1;
  if (a.championPoints > b.championPoints)
    return -1;
  return 0;
}
//https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/Skyzlimitz
//'http://api.champion.gg/v2/champions/1?api_key=43f2528e7f880354877f1bd80651c6ae'