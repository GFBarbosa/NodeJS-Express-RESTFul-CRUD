import ProdutoModel from "../model/produto/ProdutoModel";

let divProdutos = window.document.getElementById("div-produtos")
let objIndexController;

class IndexController{

    getProdutosIndex(divProdutos){
        let promisse = new Promise(function(resolve, reject){
            let promisseFetch = ProdutoModel.getProdutos() 
            
            promisseFetch.then(response => {
                resolve(response);
            })
        });

        promisse.then(response => {
            let data = '';

            for(const service of response.data){
                data += `
                <div class="card text-white bg-primary">
                    <div class="card-header">
                        <h5 class="card-title">${service.descricao}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${service.detalhes}</p>
                    </div>
                </div>
                <br>
              `;
            }

            divProdutos.innerHTML = data;

        }).catch(response => {
            console.log('Erro catch:', response)
        });
    }
}

function main() {
    objIndexController = new IndexController();
    objIndexController.getProdutosIndex(divProdutos);
}

window.onload = main;