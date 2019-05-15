import ConfigClass from "../../ConfigClass";

const path = `${ConfigClass.getUrlApi().toString()}/produto`

export default class ProdutoModel{
    constructor(){

    }

    static getProdutos(){
        return fetch(path).then(response => {
            if(response.status > 400){
                throw new Error('Server error!');
            }

            return response.json();
        })
    }

    static getProdutoById(id){
        return fetch(`${path}/${id}`).then(response => {
            if(response.status > 400){
                throw new Error('Server error!');
            }

            return response.json();
        })
    }

    static addProduct(objProdutoClass){
        return fetch(path,
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(objProdutoClass)
            }
            
            ).then(response => {
            if(response.status > 400){
                throw new Error('Server error!');
            }

            return response.json();
        })
    }

    static editProduct(objProdutoClass){
        return fetch(path,
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "PUT",
                body: JSON.stringify(objProdutoClass)
            }
            
            ).then(response => {
            if(response.status > 400){
                throw new Error('Server error!');
            }

            return response.json();
        })
    }

    static deleteProduct(id){
        return fetch(`${path}/${id}`,
            {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: "DELETE"
            }
            
            ).then(response => {
            if(response.status > 400){
                throw new Error('Server error!');
            }

            return response.json();
        })
    }
}