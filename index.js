let express =  require("express");
let app = express();

// IMPORT

const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
var equiposTT = []
var equiposTs
let equiposPorJugar
// DATOS

const ligas = [
    "https://es.soccerway.com/national/england/premier-league/20192020/regular-season/r53145/matches/?ICID=PL_3N_02",//0
    "https://es.soccerway.com/national/germany/bundesliga/20192020/regular-season/r53499/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/italy/serie-a/20192020/regular-season/r54890/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/spain/primera-division/20192020/regular-season/r53502/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/france/ligue-1/20192020/regular-season/r53638/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/netherlands/eredivisie/20192020/regular-season/r54058/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/turkey/super-lig/20192020/regular-season/r53866/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/portugal/portuguese-liga-/20192020/regular-season/r53517/matches/?ICID=PL_3N_02",
    "https://es.soccerway.com/national/belgium/pro-league/20192020/regular-season/r53516/?ICID=HP_POP_11",    
    "https://es.soccerway.com/national/turkey/super-lig/20192020/regular-season/r53866/?ICID=HP_POP_07"
]

const direcionBase = "https://es.soccerway.com"

// variables locales
let GanadorFilter
// comparar las fechas
const fecha = (fecha)=>{
//console.log(fecha)
// fecha de hoy
const hoy = new Date()
let dia = hoy.getDate();
let mes = hoy.getMonth()+1;
const ano = hoy.getFullYear();
dia = dia<10? dia = '0'+dia : dia
mes = mes<10? mes = '0'+mes : mes
const fechaActual = String(ano+"/"+mes+"/"+dia);

//console.log(fechaActual)
return fecha === fechaActual ?  true : false;
}

// horas

const hora=(hora)=>{

    let d = new Date();
    let horas = d.getUTCHours()+2
    let minuto = d.getMinutes()

    horas<10? horas = '0'+horas : horas
    minuto<10? minuto = '0'+minuto : minuto
    
    const horaActual = horas + ' : '+ minuto
    //console.log(horaActual)
    //console.log(hora)
    return hora >= horaActual ? true : false
    }

// 22:00    11:00

let datoss = []
const datos = (equiposHoy)=>{
    
    equiposHoy.map(async(p,i)=>{
    
        await request(p.url, p.hora, function (error, response, body){
               // console.log(p.url)
            let $ = cheerio.load(body);
            equiposT = $(`#bd`)
                let partido = equiposT.find("#subheading h1").text()
                let E1MarcadoGenera = equiposT.find("td.team_a_col.total").eq("16").text()
                let E2EncajadGenera = equiposT.find("td.team_b_col.total").eq("17").text()
                let E2MarcadoGenera = equiposT.find("td.team_b_col.total").eq("16").text()
                let E1EncajadGenera = equiposT.find("td.team_a_col.total").eq("17").text()
                let E1MarcadoCasa = equiposT.find("td.team_a_col.home").eq("9").text().slice(0, -7)
                let E2EncajadoVisita = equiposT.find("td.team_b_col.away").eq("10").text()
                let E2MarcadosVisita = equiposT.find("td.team_b_col.away").eq("9").text()
                let E1EncajadoCasa =equiposT.find("td.team_a_col.home").eq("10").text().slice(0, -7)
            
                var GeneralResultado1 =  Math.min(E1MarcadoGenera, E2EncajadGenera);
                let GeneralResultado2 =  Math.min(E2MarcadoGenera, E1EncajadGenera);
                let GeneralLocal =  Math.min(E1MarcadoCasa, E2EncajadoVisita);
                let Generalvisitante =  Math.min(E2MarcadosVisita, E1EncajadoCasa);
    
                //console.log(partido + Generalvisitante)
            
                    a={
                        eq1:equiposT.find(`.logo-wrapper.left a`).text(),
                        eq2:equiposT.find(`.logo-wrapper.right a`).text(),
                        liga: equiposT.find(`.block_competition_left_tree-wrapper h2`).text(),
                        logo1:equiposT.find(`.logo-wrapper.left .logo a img`).attr("src"),
                        logo2:equiposT.find(`.logo-wrapper.right .logo a img`).attr("src"),
                        Partidos: equiposT.find("#subheading h1").text(),
                        Horario: p.fechaDijitos,
                        ResultadoFinal1: Math.floor(Math.min(GeneralResultado1, GeneralLocal)),
                        ResultadoFinal2: Math.floor(Math.min(GeneralResultado2, Generalvisitante)),
                        hora: p.hora,
                        horaPasa: hora(p.hora),
                        jornada: Math.floor(equiposT.find('.block_h2h_general_statistics .compare .first.even .team_a_col.total').eq('1').text() )+ 1
                        
                    }
            datoss.push(a)
            datossOrd =  _.orderBy(datoss, ['hora'], ['asc']);
            //console.log(datossOrd)
            equiposPorJugar = datossOrd.filter(hora => hora.horaPasa === true)
            console.log(equiposPorJugar)

                // FILTRAR POR GANADOR
                GanadorFilter =  _.filter(equiposPorJugar , (o)=> {
                    let r = o.ResultadoFinal1 - o.ResultadoFinal2
                    //console.log(r)
                    //console.log('resultado ')
                    return r >=2 || r <= -2})

                // FILTRAR AMBOS EQUIPOS MARCAN
                AmbosFilter =  _.filter(equiposPorJugar , (o)=> {
                    return o.ResultadoFinal1 > 0 && o.ResultadoFinal2 > 0
                })

                // FILTRAR +2,5
                masDosFilter =  _.filter(equiposPorJugar , (o)=> {
                    let s = o.ResultadoFinal1 + o.ResultadoFinal2 
                    return s >= 3
                })

                // FILTRAR GANADOR +2,5
                GanadorMasDosFilter =  _.filter(equiposPorJugar , (o)=> {
                    let r = o.ResultadoFinal1 - o.ResultadoFinal2
                    let s = o.ResultadoFinal1 + o.ResultadoFinal2
                    //console.log(r)
                    //console.log('resultado ')
                    return r >=2 || r <= -2 && s >= 3
                })

                // FILTRAR AMBOS MARCAN +2,5
                AmbosMasDosFilter =  _.filter(equiposPorJugar , (o)=> {
                    let r = o.ResultadoFinal1 > 0 && o.ResultadoFinal2 > 0
                    let s = o.ResultadoFinal1 + o.ResultadoFinal2
                    //console.log(r)
                    //console.log('resultado ')
                    return o.ResultadoFinal1 > 0 && o.ResultadoFinal2 > 0 && s >= 3
                })
    })
})
}

// EXTRAER URL PARTIDO
const url = ()=>{
    ligas.map( async (l, i) => {
        await request (l, (error, response, body) => {
            let $ = cheerio.load(body);

            equipos = $(`.matches .match`).toArray().map( equipo => {
                const $equipo = $(equipo)
                return{
                    url: direcionBase+$equipo.find(".score-time a").attr("href").slice(0, -15)+/head2head/,
                    fecha: fecha($equipo.find(".score-time a").attr("href").substr(9,10)),
                    fechaDijitos: $equipo.find(".score-time a").attr("href").substr(9,10),
                    hora: $equipo.find(".score-time.status a").text().slice(34, -32)
                };
            })

            const equiposJueganHoy = equipos.filter(fecha => fecha.fecha=== true)

            datos(equiposJueganHoy)
        })
    })
}
url()


// TODO:
// crear la hora actual 
// compara si es la hora actual







//MOSTRAR TODAS LA URL PARTIDOS

const mostrarUrlPartido = ()=>{
    equipos.map(async url=> console.log(url.url))
    console.log('ya esta todas la url extraidas')
}

// EXTRAER URL COMPARACION

const urlsCompara = ()=>{

    equipos.map( (l,i)=>{
        request(l.url, function (error, response, body) {
            let $ = cheerio.load(body);
            urlCompara = $(`#submenu`).toArray().map( async equipoComp => {
                const $equipoComp = $(equipoComp)
                return {
                    url: direcionBase + $equipoComp.find("a").attr("href") + '/head2head/',
                }
            })
            //console.log( urlCompara)
        })
    })
}

//


app.set('views', './dev/layaut')
app.set("view engine", "pug")
app.use(express.static('./src'));
app.get("/", function(req,res){
    let titulo = 'Ganador'
    res.render('indexPrueba', {equipos: GanadorFilter, titulo });
    console.log('servidor cargado')

});

app.get("/2,5", function(req,res){
    let titulo = '+2,5'
    res.render('indexPrueba', {equipos: masDosFilter, titulo  })
})

app.get("/G-2,5", function(req,res){
    let titulo = 'Ganador / +2,5'
    res.render('indexPrueba', {equipos: GanadorMasDosFilter , titulo })
})

app.get("/ambos", function(req,res){
    let titulo = 'Ambos Equipos Marcan'
    res.render('indexPrueba', {equipos: AmbosFilter, titulo })
})

app.get("/2,5-ambos", function(req,res){
    let titulo = 'Ambos Marcan / 2,5'
    res.render('indexPrueba', {equipos: AmbosMasDosFilter, titulo })
})

app.get("/Pruevas", function(req,res){
    let titulo = 'Pruevas'
    res.render('indexPrueba', {equipos: AmbosFilter, titulo })
})

app.set("port", process.env.PORT || 3030);
app.listen(app.get("port"), () =>{

});