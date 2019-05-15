var express = require('express');
var router = express.Router();
var ProdutoModel = require('../model/produto/ProdutoModel');
var ResponseClass = require('../model/produto/ResponseClass');

router.get("/", function(req, res, next){

    ProdutoModel.getProdutos(function(erro, retorno){
        let response = new ResponseClass();

        if(erro){
            response.erro = true;
            response.msg = 'Ocorreu um erro!'
            console.log('erro: ', erro);
        } else {
            response.data = retorno;
        }

        res.json(response);
    });

});

router.get("/:id?", function(req, res, next){

    ProdutoModel.getId(req.params.id ,function(erro, retorno){
        let response = new ResponseClass();

        if(erro){
            response.erro = true;
            response.msg = 'Ocorreu um erro!'
            console.log('erro: ', erro);
        } else {
            response.data = retorno;
        }

        res.json(response);
    });

});

router.post("/?", function(req, res, next){
    
    ProdutoModel.add(req.body, function(erro, retorno){
        let response = new ResponseClass();

        if(erro){ 
            response.erro = true;
            response.msg = 'Ocorreu um erro!'
            console.log('erro: ', erro);
        } else { 
            if(retorno.affectedRows > 0){
                response.msg = "Produto cadastrado com sucesso!";
            } else {
                response.erro = true;
                response.msg = 'Não foi possível cadastrar este produto!';
            }
        }
        console.log(response);
        res.json(response);
    });

});

router.delete("/:id", function(req, res, next){
    
    ProdutoModel.delete(req.params.id, function(erro, retorno){
        let response = new ResponseClass();

        if(erro){ 
            response.erro = true;
            response.msg = 'Ocorreu um erro!'
            console.log('erro: ', erro);
        } else { 
            if(retorno.affectedRows > 0){
                response.msg = "Produto excluído com sucesso!";
            } else {
                response.erro = true;
                response.msg = 'Não foi possível excluír este produto!';
            }
        }
        console.log(response);
        res.json(response);
    });

});

router.put("/", function(req, res, next){
    
    ProdutoModel.edit(req.body, function(erro, retorno){
        let response = new ResponseClass();

        if(erro){ 
            response.erro = true;
            response.msg = 'Ocorreu um erro!'
            console.log('erro: ', erro);
        } else { 
            if(retorno.affectedRows > 0){
                response.msg = "Produto alterado com sucesso!";
            } else {
                response.erro = true;
                response.msg = 'Não foi possível realizar as alterações!';
            }
        }
        console.log(response);
        res.json(response);
    });

});

module.exports = router;