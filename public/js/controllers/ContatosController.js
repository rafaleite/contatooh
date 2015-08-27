angular.module('contatooh').controller('ContatosController', function($scope,Contato) {
	$scope.total = 0;	
	$scope.contatos = [];    
	$scope.filtro = '';
    $scope.mensagem = {texto: ""};
		
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