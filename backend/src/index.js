const express = require('express');
const routes = require('./routes');
const app = express();
const cors  = require('cors');  

app.use(cors());
app.use(express.json());
app.use(routes);


app.get('/',(req,res)=>{
    res.send('Home Page');
});


app.listen(3000,()=>{
    console.log("Conectado porta padrão 3000");
});