import ProdutoModel from "../model/produto/ProdutoModel";
import ProdutoClass from "../model/produto/ProdutoClass";

let divAlert = window.document.getElementById('alert');
let divProdutos = window.document.getElementById('produtos');
let form = window.document.getElementById('form');

let objActionsController;

class ActionsController{

    getProdutosTable(divProdutos){
        let promisse = new Promise(function(resolve, reject){
            let promisseFetch = ProdutoModel.getProdutos() 
            
            promisseFetch.then(response => {
                resolve(response);
            })
        });

        promisse.then(response => {
            let data = '';

            if(response.erro){
                this.showAlert(response.msg, 'danger');
            } else {
                data += `
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover table-sm">
                            <thead class="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Descricão</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>`;
                for(const service of response.data){
                    data += `
                    <tr>
                        <td>${service.id_produto}</td>
                        <td>${service.descricao}</td>
                        <td><button type="button" class="btn btn-primary btn-edit" data-id="${service.id_produto}">Editar</button></td>
                        <td><button type="button" class="btn btn-primary btn-delete" data-id="${service.id_produto}">Excluir</button></td>
                    </tr>
                    `;
                }
                data += `
                            </tbody>
                        </table>
                    </div>
                    `;
                
                divProdutos.innerHTML = data;

                let editButtons = document.querySelectorAll(".btn-edit");
                let deleteButtons = document.querySelectorAll(".btn-delete");

                editButtons.forEach(function(item){
                    item.addEventListener('click', event => {
                        objActionsController.clearAlert();
                        let id = event.target.getAttribute('data-id');
                        objActionsController.prepareEdit(id);
                    });
                });

                deleteButtons.forEach(function(item){
                    item.addEventListener('click', event => {
                        objActionsController.clearAlert();
                        let id = event.target.getAttribute('data-id');
                        objActionsController.prepareDelete(id);
                    });
                });
            }

        }).catch(response => {
            this.showAlert("Ocorreu um erro!", "danger");
            console.log('Erro catch:', response);
        });
    }
    
    hiddenElement(element){
        document.getElementById(element).style.display = "none";
    }

    showElement(element){
        document.getElementById(element).style.display = "block";
    }

    clearForm(form){
        form.id.value = "";
        form.descricao.value = "";
        form.detalhes.value = "";
    }

    showAlert(msg, status){
        let data = `
            <div class="alert alert-${status} alert-dismissible fade show" role="alert">
                <strong>${msg}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `;
        divAlert.innerHTML = data;
    }

    clearAlert(){
        divAlert.innerHTML = "";
    }

    eventRegister(){
        document.getElementById('btn-show-form').addEventListener("click", function(){
            objActionsController.clearForm(form);
            objActionsController.clearAlert();
            objActionsController.hiddenElement('listagem');
            objActionsController.showElement('formulario');
        });

        document.getElementById('btn-cadastrar-produto').addEventListener("click", function(){
            event.preventDefault();
            
            objActionsController.clearAlert();
            if(form.id.value){
                objActionsController.editProduct(form);
            } else {
                objActionsController.insertProduct(form);
            }
        });

        document.getElementById('btn-cancelar-action').addEventListener("click", function(){
            objActionsController.clearForm(form);
            objActionsController.clearAlert();
            objActionsController.hiddenElement('formulario');
            objActionsController.showElement('listagem');
        });
    }

    insertProduct(form){
        let descricao, detalhes;
        descricao = form.descricao.value;
        detalhes = form.detalhes.value;

        if(descricao && detalhes){
            let objProdutoClass = new ProdutoClass(null, descricao, detalhes);

            let promisse = new Promise(function(resolve, reject){
                let promisseFetch = ProdutoModel.addProduct(objProdutoClass) 
                
                promisseFetch.then(response => {
                    resolve(response);
                })
            });

            promisse.then(response => {
                if(response.erro){
                    this.showAlert(response.msg,'danger');
                } else {
                    objActionsController.getProdutosTable(divProdutos);
                    objActionsController.showAlert(response.msg,'success');
                    objActionsController.hiddenElement('formulario');
                    objActionsController.showElement('listagem');
                    objActionsController.clearForm(form);
                }
            }).catch(response => {
                this.showAlert("Ocorreu um erro!", "danger");
                console.log('Erro catch:', response)
            });

        } else {
            this.showAlert("Todos os campos são obrigatórios!", "danger");
        }
    }

    prepareEdit(id){
        let promisse = new Promise(function(resolve, reject){
            let promisseFetch = ProdutoModel.getProdutoById(id) 
            
            promisseFetch.then(response => {
                resolve(response);
            })
        });

        promisse.then(response => {
            if(response.erro){
                this.showAlert(response.msg,'danger');
            } else {

                let objProdutoClass = new ProdutoClass(
                    response.data[0].id_produto,
                    response.data[0].descricao,
                    response.data[0].detalhes,
                );

                form.id.value = objProdutoClass.id_produto;
                form.descricao.value = objProdutoClass.descricao;
                form.detalhes.value = objProdutoClass.detalhes;

                objActionsController.hiddenElement('listagem');
                objActionsController.showElement('formulario');
            }
        }).catch(response => {
            this.showAlert("Ocorreu um erro!", "danger");
            console.log('Erro catch:', response);
        });
    }

    editProduct(form){
        let id, descricao, detalhes;
        id = form.id.value;
        descricao = form.descricao.value;
        detalhes = form.detalhes.value;

        if(id && descricao && detalhes){
            let objProdutoClass = new ProdutoClass(id, descricao, detalhes);

            let promisse = new Promise(function(resolve, reject){
                let promisseFetch = ProdutoModel.editProduct(objProdutoClass);
                
                promisseFetch.then(response => {
                    resolve(response);
                })
            });

            promisse.then(response => {
                if(response.erro){
                    this.showAlert(response.msg,'danger');
                } else {
                    objActionsController.getProdutosTable(divProdutos);
                    objActionsController.showAlert(response.msg,'success');
                    objActionsController.hiddenElement('formulario');
                    objActionsController.showElement('listagem');
                    objActionsController.clearForm(form);
                }
            }).catch(response => {
                this.showAlert("Ocorreu um erro!", "danger");
                console.log('Erro catch:', response)
            });

        } else {
            this.showAlert("Todos os campos são obrigatórios!", "danger");
        }
    }

    prepareDelete(id){
        let promisse = new Promise(function(resolve, reject){
            let promisseFetch = ProdutoModel.deleteProduct(id) 
            
            promisseFetch.then(response => {
                resolve(response);
            })
        });

        promisse.then(response => {
            if(response.erro){
                this.showAlert(response.msg,'danger');
            } else {
                objActionsController.getProdutosTable(divProdutos);
                objActionsController.showAlert(response.msg,'success');
            }
        }).catch(response => {
            this.showAlert("Ocorreu um erro!", "danger");
            console.log('Erro catch:', response)
        });
    }
}

function main(){
    objActionsController = new ActionsController();
    objActionsController.hiddenElement('formulario');
    objActionsController.getProdutosTable(divProdutos);
    objActionsController.eventRegister();
}

window.onload = main;