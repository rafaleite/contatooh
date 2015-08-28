module.exports = function() {

	var Contato = app.models.contato;

	var controller = {};

	// listar todos os contatos
	controller.listaTodos = function(req, res) {

		Contato.find().exec()
		.then(
			function(contatos) {
				res.json(contatos);
			},
			function(erro){
				console.error(erro);
				res.status(500).json(erro);
			}
		);

	};

	// retorna um contato especifico
	controller.obtemContato = function(req, res) {
		var _id = req.params.id;

		Contato.findById(_id).exec()
		.then(
			function(contato) {
				if(!contato) throw new Error("Contato não encontrado");
				res.json(contato);

			},
			function(erro) {
				console.log(erro);
				res.status(404).json(erro);
			}
		);
	};

	// remove um contato
	controller.removeContato = function(req, res) {
		var _id = req.params.id;

		Contato.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.end();
			},
			function(erro) {
				return console.error(erro);
			}
		);

	};

	// salvar o contato
	controller.salvaContato = function(req, res) {
		

		//res.json(contato);
	};


	return controller;
}
