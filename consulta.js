var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var idContato = new ObjectID("55df97b06a06259775941ae7");

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh',
	function(erro, db) {
		if(erro) throw err;

		db.collection('contatos').findOne({_id: idContato},
			function(erro, contato){
				if(erro) throw err;
				console.log(contato);
			}
		);
	}
);