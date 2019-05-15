export default class ProdutoClass{
    constructor(id = null, descricao, detalhes){
        if(id!=null) this.id_produto = id;
        this.descricao = descricao;
        this.detalhes = detalhes;
    }
}