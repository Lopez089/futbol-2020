// goleadores

let express =  require("express");
let app = express();

// IMPORT

const request = require('request');
const cheerio = require('cheerio');

// LIGAS

const ligas = ['https://el.soccerway.com/national/netherlands/eredivisie/20192020/regular-season/r54058/']
let tabla = []
const apps = (ligas)=>{
    //console.log(ligas)
    ligas.map(async(l,i)=>{
        //console.log(l)
        await request(l, function (error, response, body){
            let $ = cheerio.load(body);
            querySelect = $('.content-column .playerstats tbody tr')

            let fila = querySelect.find(`.playerstats tbody tr`)
            

            //console.log(jornada)
            // para selecinar la jornada
            const parent = querys.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.team_rank .number.total.mp')
            
            querySelect.toArray().map((j)=>{
                console.log(j)
                const $jugador = $(j)
                let nombre = $jugador.find(`td a`).text()
                let primerGol= $jugador.find(`.first-goals`).text()
                let jornada = $jugador.find(`.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode .team_rank .number.total.mp`).text()

                

                let a ={
                    Jugador: nombre,
                    Primer_Gol: primerGol,
                    Jornada: jornada
                }
                tabla.push(a)
                console.log(tabla)
            })
        })
    })
}

apps(ligas)


app.set('views', './dev/layaut')
app.set("view engine", "pug")
app.use(express.static('./src'));
app.get("/", function(req,res){
        res.render('ind', {tabla: tabla });
console.log('servidor cargado')

});


app.set("port", process.env.PORT || 3030);
app.listen(app.get("port"), () =>{

});