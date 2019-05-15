var express = require('express');
var router = express.Router();
var ProdutoModel = require('../model/produto/ProdutoModel');
var ResponseClass = require('../model/produto/ResponseClass');

var prepareResponse = function(res, erro, retorno, action){
    let response = new ResponseClass();

    if(erro){ 
        response.erro = true;
        response.msg = 'Ocorreu um erro!'
        console.log('erro: ', erro);
    } else { 
        if(action == 'Consultar'){
            response.data = retorno;
        } else {
            if(retorno.affectedRows > 0){
                response.msg = `Operação ${action} realizada com sucesso!`;
            } else {
                response.erro = true;
                response.msg = `Não foi possível realizar a operação ${action}`;
            }
        }
    }
    return res.json(response);
}

router.get("/", function(req, res, next){

    ProdutoModel.getProdutos(function(erro, retorno){
        return prepareResponse(res, erro, retorno, 'Consultar');
    });

});

router.get("/:id?", function(req, res, next){

    ProdutoModel.getProdutoById(req.params.id ,function(erro, retorno){
        return prepareResponse(res, erro, retorno, 'Consultar');
    });

});

router.post("/?", function(req, res, next){
    
    ProdutoModel.addProduto(req.body, function(erro, retorno){
        return prepareResponse(res, erro, retorno, 'Cadastrar');
    });

});

router.delete("/:id", function(req, res, next){
    
    ProdutoModel.deleteProduto(req.params.id, function(erro, retorno){
        return prepareResponse(res, erro, retorno, 'Excluir');
    });

});

router.put("/", function(req, res, next){
    
    ProdutoModel.editProduto(req.body, function(erro, retorno){
        return prepareResponse(res, erro, retorno, 'Editar');
    });

});

module.exports = router;