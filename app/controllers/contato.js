module.exports = function() {
  var controller = {};
  
  //ATE UTILIZAR O MONGODB
  var ID_CONTATO_INC = 3;
  var contatos = [
    {_id: 1, nome: 'Rafael Leite', email: 'cont1@empresa.com.br'},
    {_id: 2, nome: 'José Raimundo', email: 'cont2@empresa.com.br'},
    {_id: 3, nome: 'Vanessa Bomfim', email: 'cont3@empresa.com.br'}
  ];
  
  //listar todos os contatos
  controller.listaContatos = function(req, res) {
    res.json(contatos);
  };
  
  //retorna um contato especifico
  controller.obtemContato = function(req, res) {
    var idContato = req.params.id;

    var contato = contatos.filter(function(contato){
      return contato._id == idContato;
    })[0];

    contato ? res.json(contato) : res.status(404).send('Contato não encontrado');
  };
  
  //remove um contato
  controller.removeContato = function(req, res) { 
	  var idContato = req.params.id;
    console.log(req.params);
	  console.log('removendo contato ' + idContato);
	  
	  contatos = contatos.filter(function(contato){
	      return contato._id != idContato;
	  });
	  
	  res.sendStatus(204).end();
  };
  
  //salvar o contato
  controller.salvaContato = function(req, res) { 
    console.log(req.body);
    var contato = req.body;
    contato = contato._id ?
        atualiza(contato) : 
        adiciona(contato);

    res.json(contato);
	  //res.sendStatus(204).end();
  };
  

function adiciona(contatoNovo) {
  contatoNovo._id = ++ID_CONTATO_INC;;
  contatos.push(contatoNovo);
  return contatoNovo;
}

function atualiza(contatoAlterar) {
  
  contatos = contatos.map(function(contato) {
    if(contato._id == contatoAlterar._id) {
      contato = contatoAlterar;
    }
    return contato;
  });

  return contatoAlterar;
}

  return controller;
}
