const db = require('../../banco/dbConfig');

module.exports = class ProdutoModel{
    
    static getProdutos(callback){
        return db.query("SELECT * FROM produto", callback);
    }

    static getProdutoById(id, callback){
        return db.query("SELECT * FROM produto WHERE id_produto = ? ", [id], callback);
    }

    static addProduto(produto, callback){
        return db.query("INSERT INTO produto (descricao, detalhes) VALUES (?, ?)", [produto.descricao, produto.detalhes], callback);
    }

    static deleteProduto(id, callback){
        return db.query("DELETE FROM produto WHERE id_produto = ? ", [id], callback);
    }

    static editProduto(produto, callback){
        return db.query("UPDATE produto SET descricao = ?, detalhes = ? WHERE id_produto = ?", [produto.descricao, produto.detalhes, produto.id_produto], callback);
    }
};