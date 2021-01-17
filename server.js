const express = require('express');
const cors = require('cors')

var app = express();
app.use(cors());
const PORT = 3000;
app.use(express.static(__dirname));

app.listen(PORT,function(){
    console.log("LISTENING ON PORT",PORT)
    console.log("URL: http://localhost:"+PORT)
})

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

app.post('/getDisease', function(req, res){
    console.log(req.body);
    const { imageFile } = req.body;
    try{
        console.log(imageFile);
    }catch(err){
        return res.json({success: false, error: err})
    }
})