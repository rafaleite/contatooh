angular.module('contatooh').controller('ContatosController', function($scope,$resource) {
	$scope.total = 0;	
	$scope.contatos = [];    
	$scope.filtro = '';
    $scope.mensagem = {texto: ""};
	
	var Contato = $resource('/contatos/:id');
	
	$scope.init = function() {
		buscaContatos();
	};
    
    function buscaContatos(){
    	Contato.query(
    		function(contatos){
    			$scope.contatos = contatos;
    			 $scope.mensagem = {}
    		},
    		function(erro){
    			$scope.mensagem = {texto: "Não foi possível obter a lista de contatos"};
    		}
    	);
    }

    $scope.remove = function(contato) {
    	Contato.delete({id: contato._id},
    			buscaContatos,
    			function(erro){
    			$scope.mensagem = {texto: "Não foi possível remover o contatos"};
    		});
    	
		console.log(contato);
	}
    
    $scope.init();
    
});