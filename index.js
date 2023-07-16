const express = require('express');
const app = express();
const port = 8000;

app.use('/', require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    else{
        console.log(`Running succeesfully on port: ${port}`);
    }
})