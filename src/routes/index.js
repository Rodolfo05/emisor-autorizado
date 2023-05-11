const { Router } = require('express');
const router = Router();

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

router.get('/', (req, res) => res.json({
    message: 'API Ejecutandose Correctamente.'
}))

router.get('/:rut', async (req, res) => {

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