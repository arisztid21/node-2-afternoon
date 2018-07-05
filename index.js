const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const products_controller = require('./products_controller')

const app = express();
app.use(bodyParser.json());
massive(process.env.CONNECTION_STRING).then (dbInstance => {
    app.set('db', dbInstance)
}).catch(error => console.log('error', error))

app.post( '/api/product', products_controller.create );

app.get( '/api/products', products_controller.getAll );

app.get( '/api/product/:id', products_controller.getOne );

app.put( '/api/product/:id', products_controller.update );

app.delete( '/api/product/:id', products_controller.delete );

let port = 3000
app.listen(port,()=>{console.log(`this server listening on port ${port}`)});