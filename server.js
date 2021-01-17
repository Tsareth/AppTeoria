const express = require('express');
const cors = require('cors')

var app = express();
app.use(cors());
const PORT = process.env.PORT || 8008
app.use(express.static(__dirname));

app.listen(PORT,function(){
    console.log("LISTENING ON PORT",PORT)
    console.log("URL: http://localhost:"+PORT)
})

app.all('*', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});