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
    ResultadoFinal2: 2
  },
  {
    ResultadoFinal1: 7,
    ResultadoFinal2: 3
  }
]

GanadorFilter =  _.filter(equiposPorJugar , (o)=> {
  let r = o.ResultadoFinal1 - o.ResultadoFinal2
  console.log(r)
  console.log('resultado ')
  return r >=2 || r <= -2})

console.log(GanadorFilter)

// 1   >   2
// 1+2  >=  2  no es mayor
// 3 >= 2  falso
// otro
// 0 >= 2 
// 2 >= 2   true
// otro 
// 2  1 
// 






// 1 <= 2+2   es mayor