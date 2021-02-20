let tarefaLocal = localStorage.getItem("tarefa");
let tarefas = tarefaLocal ? JSON.parse(tarefaLocal) : [];
atualizar();

function adicionar(){
    let descTarefa = document.querySelector('#novaTarefa').value;
    if(descTarefa != ""){
        let tarefa = {
            id: gerarId(),
            descricao: descTarefa,
            check:""      
        };
        tarefas.push(tarefa);
        localStorage.setItem("tarefa", JSON.stringify (tarefas));
        
        atualizar();
    }
}
function atualizar(){
    let list = "";
    if(tarefas){
        tarefas.forEach(tarefa => {
            list += `<div class="custom-control custom-checkbox"> 
             <input type="checkbox" ${tarefa.check} class="custom-control-input" id="${tarefa.id}">
            <label class="custom-control-label" for="${tarefa.id}"> - ${tarefa.descricao}</label> 
            </div><hr>`          
        });  
    }     
    document.querySelector('#lista').innerHTML = list;
    document.querySelector('#novaTarefa').value = "";     
}
let click = document.getElementById("lista");
click.addEventListener("input",checar);
function checar(){
    for(let i = 0; i < click.length; i++){
        if(click[i].checked === true){
            tarefas[i].check = "checked";
        } else{
            tarefas[i].check = ""; 
        }
    }
    localStorage.setItem("tarefa", JSON.stringify (tarefas));
}
function limpar(){    
    for(let cont = tarefas.length-1; cont >= 0; cont--){
        if (tarefas[cont].check === "checked"){
            tarefas.splice(cont,1); 
        }      
    }
    localStorage.setItem("tarefa", JSON.stringify (tarefas));
    atualizar();
}
function limparTudo(){ 
    if(confirm("Deseja excluir todas as tarefas?")){
        localStorage.clear();
        window.location.reload();
    }   
}
function gerarId(){
    let time = new Date();
    let id = 
        time.getHours().toString() +
        time.getMinutes().toString() +
        time.getSeconds().toString() +
        time.getMilliseconds().toString();   
    return id;             
}