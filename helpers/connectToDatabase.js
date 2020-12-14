const MongoClient = require('mongodb').MongoClient
const { dburi } = require('../config.json')


module.exports = async function(client) {
    const uri = dburi
    dbclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
    let changeStream;
    dbclient.connect(err => {
        if(err) 
            throw err  
        Servers = dbclient.db("violet").collection("servers");	
        client.refreshServersCache()
        changeStream = Servers.watch()	

        changeStream.on("change", next => {
            client.refreshServersCache()
        });
        
    })   
}

process.on('SIGINT', function() {
	console.log('Closing database connection and shutting down...');
	dbclient.close();
	process.exit();
})

process.on('SIGTERM', function() {
	console.log('Closing database connection and shutting down...');
	dbclient.close();
	process.exit();
})

