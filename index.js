const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.use(expressLayout);

// set up the layout for script and style so that it will automatically set in the head and body respectively
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router

app.use('/', require('./routes'))
// set up the view engine

app.set('view engine', 'ejs');
app.set('views' , './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    else{
        console.log(`Running succeesfully on port: ${port}`);
    }
})