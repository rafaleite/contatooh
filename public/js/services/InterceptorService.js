angular.module('contatooh').factory('appInterceptor', function($q, $location) {  

    var appInterceptor = {
    	responseError: function(resposta) {
    		if (resposta.status == 401) {
    		  $location.path('/auth');
    		}
            return $q.reject(resposta);
    	}
    }

    return appInterceptor;
});