const express = require('express');
const { Router } = require('express');
const router = Router();


const app = express();

//Configuraciones
app.set('port', 3000);

console.log("PUERTO: "+3000);

//CORS
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

var https = require('follow-redirects').https;

var body = "";
var options = "";



async function traeDatosEmisorAutorizado(){

    let p = new Promise((resolve, reject) => {
        var req = https.request(options, function (res) {
            var chunks = [];
    
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
    
            res.on("end", function (chunk) {
                body = Buffer.concat(chunks);
                body = body.toString() //console.log(body.toString());
                resolve("Ok");
            });
    
            res.on("error", function (error) {
                console.error(error);
            });
        });
    
    
    
        req.end();
    });

    return await p;
}

app.get('/', (req, res) => res.json({
     message: 'Funcionando Bien'
 }))

 app.get('/hola', (req, res) => res.json({
     message: 'Funcionando hola'
 }))


router.get('/hola', (req, res) => res.json({
    message: 'API Ejecutandose Correctamente.'
}))

app.get('/:rut', async (req, res) => {

    let rutEmisor = req.params.rut;

    options = {
        'method': 'GET',
        'hostname': 'api2.financiae.cl',
        'path': '/v1/emisorautorizado/' + rutEmisor,
        'headers': {
            'x-api-key': 'WQfcgXYUD88BwBh2Un0u25uVkjVuCDAG7hF60ZTs'
        },
        'maxRedirects': 20
    };

    await traeDatosEmisorAutorizado();

    req.end
    res.send(body);
    
})


module.exports = router;


app.listen(3000);

