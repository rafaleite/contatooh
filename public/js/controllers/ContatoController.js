angular.module('contatooh').controller('ContatoController', 
	function($scope, $routeParams, $resource) {

		var Contato = $resource('/contatos/:id');

		//carrega o contato se for passado o ID
		if(!$routeParams.contatoId){
			$scope.contato = new Contato();
		}else{
			Contato.get({id: $routeParams.contatoId},
			function(contato) {
				$scope.contato = contato;
			},
			function(erro) {
				$scope.mensagem = {texto: erro.data};
				console.log(erro);
			});
		}
		

		$scope.salva = function() {
			$scope.contato.$save()
				.then(function() {
					$scope.mensagem = {texto: 'Salvo com sucesso'}
					$scope.contato = new Contato();
				})
				.catch(function(erro) {
					$scope.mensagem = {texto: 'Não foi possível salvar'}
				});
		}


	});