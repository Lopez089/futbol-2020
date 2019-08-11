/*const request = require('request');
const cheerio = require('cheerio');

// PRUEBAS


const data =[ { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/arsenal-fc/burnley-fc/3029083/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' },
 { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/aston-villa-football-club/afc-bournemouth/3029084/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' },
 { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/brighton--hove-albion-fc/west-ham-united-fc/3029085/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' },
 { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/everton-football-club/watford-football-club/3029087/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' },
 { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/norwich-city-fc/newcastle-united-football-club/3029089/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' },
 { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/southampton-fc/liverpool-fc/3029091/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' },
 { url:
    'https://es.soccerway.com/matches/2019/08/17/england/premier-league/manchester-city-football-club/tottenham-hotspur-football-club/3029088/head2head/',
   fecha: true,
   fechaDijitos: '2019/08/17' } ]



const datos = (data)=>{
    //console.log(data)
    let dtos= []
    data.map((p,i)=>{
        //console.log(p.url)
        request(p.url, function (error, res, body){
            //console.log(body)
            let $ = cheerio.load(body);
            //console.log($)
                equiposT = $(`#bd`);
                //console.log(equiposT)
              a={
                        Eq1:equiposT.find("#subheading h1").text(),
                        Eq2:equiposT.find("#subheading h1").text(),
                    }
                  //console.log(todos)
            dtos.push(... a)
             
        
    })
return 'hola'
})
}

console.log(datos(data))*/


// hora

/*const hora=(hora)=>{

let d = new Date();
let horas = d.getUTCHours()+2
let minuto = d.getMinutes()

horas<10? horas = '0'+horas : horas
minuto<10? minuto = '0'+minuto : minuto

const horaActual = horas + ' : '+ minuto
console.log(hora)
console.log(horaActual)

return hora >= horaActual ? true : false
}

console.log(hora('18 : 00'))*/

const _ = require('lodash');

const equiposPorJugar = [
  {
    ResultadoFinal1: 1,
    ResultadoFinal2: 3
  },
  {
    ResultadoFinal1: 3,
    ResultadoFinal2: 1
  }
]

GanadorFilter =  _.filter(equiposPorJugar , (o)=> {
  let r = o.ResultadoFinal1 - o.ResultadoFinal2
  console.log(r)
  console.log('resultado ')
  return r >=2 || r <= -2})

//console.log(GanadorFilter)

AmbosFilter =  _.filter(equiposPorJugar , (o)=> {
  return o.ResultadoFinal1 > 0 && o.ResultadoFinal2 > 0
})

//console.log(AmbosFilter)

masDosFilter =  _.filter(equiposPorJugar , (o)=> {
  let s = o.ResultadoFinal1 + o.ResultadoFinal2 
  return s >= 3
})

//console.log(masDosFilter)


GanadorMasDosFilter =  _.filter(equiposPorJugar , (o)=> {
  let r = o.ResultadoFinal1 - o.ResultadoFinal2
  let s = o.ResultadoFinal1 + o.ResultadoFinal2
  console.log(r)
  console.log('resultado ')
  return r >=2 || r <= -2 && s >= 3
})

//console.log(GanadorMasDosFilter)

AmbosMasDosFilter =  _.filter(equiposPorJugar , (o)=> {
  let r = o.ResultadoFinal1 > 0 && o.ResultadoFinal2 > 0
  let s = o.ResultadoFinal1 + o.ResultadoFinal2
  console.log(r)
  console.log('resultado ')
  return o.ResultadoFinal1 > 0 && o.ResultadoFinal2 > 0 && s >= 3
})

console.log(AmbosMasDosFilter)