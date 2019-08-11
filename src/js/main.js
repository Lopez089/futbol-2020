const request = require('request');
const cheerio = require('cheerio');

const ligas = [
	"https://es.soccerway.com/national/england/premier-league/20182019/regular-season/r48730/matches/?ICID=PL_3N_02",//0
	"https://es.soccerway.com/national/germany/bundesliga/20182019/regular-season/r47657/matches/?ICID=PL_3N_02",//1
	"https://es.soccerway.com/national/italy/serie-a/20182019/regular-season/r48235/matches/?ICID=PL_3N_02",//2
	"https://es.soccerway.com/national/spain/primera-division/20182019/regular-season/r47983/matches/?ICID=PL_3N_02",//3
	"https://es.soccerway.com/national/france/ligue-1/20182019/regular-season/r48044/matches/?ICID=PL_3N_02",//4
	"https://es.soccerway.com/national/netherlands/eredivisie/20182019/regular-season/r47971/matches/?ICID=PL_3N_02",//5
	"https://es.soccerway.com/national/turkey/super-lig/20182019/regular-season/r48404/matches/?ICID=PL_3N_02",//6
	"https://es.soccerway.com/national/russia/premier-league/20182019/regular-season/r47835/matches/?ICID=PL_3N_02",//7
	"https://es.soccerway.com/national/portugal/portuguese-liga-/20182019/regular-season/r47741/matches/?ICID=PL_3N_02",//8
	"https://es.soccerway.com/national/scotland/premier-league/20182019/1st-phase/r47730/matches/?ICID=PL_3N_02",//9
	"https://es.soccerway.com/national/belgium/pro-league/20182019/regular-season/r48492/matches/?ICID=PL_3N_02",//10
	"https://es.soccerway.com/national/spain/segunda-division/20182019/regular-season/r49197/?ICID=SN_01_02"//11
	]

const direcionBase = "https://es.soccerway.com"


request(ligas, function (error, response, body) {
	console.log(ligas)
	console.log(error)
	let $ = cheerio.load(body);
	let equipos = $(`.matches .match`).toArray()
	.map(equipo => {
		const $equipo = $(equipo)
   		//var partidosPorJugar = $equipo.find("tr .score-time ")
		return {
			Partidos: $equipo.find(".team-a a").attr("title") + " VS " + $equipo.find(".team-b a").attr("title"),
			url: direcionBase+$equipo.find(".score-time a").attr("href")
			}
	})
});
// debugger;
// 		for (var i = 0; i< equipos.length; i++) {
// 			//console.log("url " + [i+1] + " : " + equipos[i].url);
// 			//console.log(equipos[i].url);
// 			// 1 de las direciones que tengo tengo que ectraer la direcion de comparativa
// 			request(equipos[i].url, function (error, response, body) {
  			     	
//   			    let $ = cheerio.load(body);
			 
// 			  	equiposCompara = $(`.yui-t6`).toArray() 
// 			   	.map(equipoComp => {
// 			   		const $equipoComp = $(equipoComp)

// 			   		return {
// 						url: direcionBase + $equipoComp.find("a").attr("href"),
// 						dia: $equipoComp.find(".details, dd").eq("2").text(),
// 						hora: $equipoComp.find(".details, dd").eq("4").text(),
// 						}
					
// 			   })
// 			   debugger;	
// 					for (var a = 0; a<equiposCompara.length; a++) {
// 						var d = new Date();
// 						var horarios = new Date(equiposCompara[a].dia + equiposCompara[a].hora)
// 							//console.log(horarios);
// 							//console.log(d);
// 							//console.log(horarios.slice(0,-1));
// 							//console.log(equiposCompara[a].url);
// 						var urlCompComple =(equiposCompara[a].url + "head2head/");
						 
// 						 //calcular los resultados
// 						if (d <= horarios) {
// 							request(urlCompComple, function (error, response, body) {
							  
// 							    let $ = cheerio.load(body);
							  	
// 							  	equipos = $(`#bd`).toArray()
// 							   	.map(equipo => {
// 							   		const $equipo = $(equipo)
// 								   		return {
// 											Partidos: $equipo.find("#subheading h1").text(),
// 											Horario: $equipo.find("div.details, dl").text(),
// 											E1MarcadoGenera: $equipo.find("td.team_a_col.total").eq("16").text(),
// 											E2EncajadGenera: $equipo.find("td.team_b_col.total").eq("17").text(),
// 											E2MarcadoGenera: $equipo.find("td.team_b_col.total").eq("16").text(),
// 											E1EncajadGenera: $equipo.find("td.team_a_col.total").eq("17").text(),
// 											E1MarcadoCasa: $equipo.find("td.team_a_col.home").eq("9").text(),
// 											E2EncajadoVisita: $equipo.find("td.team_b_col.away").eq("10").text(),
// 											E2MarcadosVisita: $equipo.find("td.team_b_col.away").eq("9").text(),
// 											E1EncajadoCasa: $equipo.find("td.team_a_col.home").eq("10").text()

// 											}
										

// 							   })

// 							//console.log(equipos[0].Partidos);
// 										// lo de carcular dos datos

// 										var GeneralResultado1 =  Math.min(equipos[0].E1MarcadoGenera, equipos[0].E2EncajadGenera);
// 										var GeneralResultado2 =  Math.min(equipos[0].E2MarcadoGenera, equipos[0].E1EncajadGenera);
// 										var GeneralLocal =  Math.min(equipos[0].E1MarcadoCasa, equipos[0].E2EncajadoVisita);
// 										var Generalvisitante =  Math.min(equipos[0].E2MarcadosVisita, equipos[0].E1EncajadoCasa);

// 										var ResultadoFinal1 = /*Math.floor*/(Math.min(GeneralResultado1, GeneralLocal));
// 										var ResultadoFinal2 = /*Math.floor*/(Math.min(GeneralResultado2, Generalvisitante));
										
// 									//console.log( equipos[0].Partidos +"  " + " || "+ horarios)
// 									   //console.log(GeneralResultado1)
// 									   //console.log(GeneralResultado2)
// 									   //console.log(ResultadoFinal1)
// 									   //console.log(ResultadoFinal2)
// 								//if (ResultadoFinal1 != "0" ||  ResultadoFinal2 != "0") {
											
// 										console.log("__________________________________________________________________________");
// 										console.log( equipos[0].Partidos +"  " + " || "+ horarios)
// 										console.log(ResultadoFinal1)
// 										console.log(ResultadoFinal2)	
// 										console.log('                                 ');

// 								//}


// 							});//reques 1
// 						}// if
// 					}//for
// 			});//request

// 		}//for

//};





