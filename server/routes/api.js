/**
 * Created by Scott on 2/5/16.
 */

var express = require('express');
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/inventory_forecaster';

var router = express.Router();

router.get('/pullAllParts', function(request, response){

    var parts = [];

    pg.connect(connectionString, function(error, client){

        if(error){
            console.log(error);
        }

        var query = client.query("SELECT * FROM parts ORDER BY id ASC");

        query.on('row', function(row){
            parts.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(parts);
        });
    });
});

router.get('/pullOrder', function(request,response){

    var order = [];

    pg.connect(connectionString, function(error, client){

        if(error){
            console.log(error);
        }

        var query = client.query("SELECT parts.part_number, parts.manufacturer, parts.part_description, orders.quantity_required, parts.quantity_available FROM parts INNER JOIN orders ON parts.id = orders.part_id ORDER BY parts.id ASC");

        query.on('row', function(row){
            order.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(order);
        });
    });
});

module.exports = router;