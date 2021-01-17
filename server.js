const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//quitar en producción
app.use(logger('dev'));

app.use(cors());
const PORT = process.env.PORT || 8008

app.use(express.static(__dirname));

app.listen(PORT,function(){
    console.log("LISTENING ON PORT",PORT)
    console.log("URL: http://localhost:"+PORT)
})

app.get('/', function(req, res) {
    res.sendFile('index.html    ', { root: __dirname });
});

app.put('/get-disease', function(req, res){
    console.log(req)
    const { imageFile } = req.body;
    try{
        console.log(imageFile);
        return res.json({success: true})
    }catch(err){
        return res.json({success: false, error: err})
    }
})