import {getTasks, actionManager, addTaskArr} from "./state.js";
import {render, displayErrorMsg, inputFocus} from "./ui.js";

const form = document.getElementById("form")
const addInput = document.getElementById("add-input")
const list = document.getElementById("list")

//Função que controla os eventos de adicionar tarefa e os dos botões de check, edit, delete e cancel
function setEventsListeners() {

    //Evento do formulário
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //Se o input estiver vazio, chama a função de exibir a mensagem de erro
        if(!addInput.value){
            displayErrorMsg("O campo do formulário não pode estar vazio")
            return
        }
        //Se não estiver vazio, ele chama a função de adicionar
        addTaskArr(addInput.value);
        //renderiza a lista novamente para refletir a mudança
        render(getTasks(), list)
        addInput.value = "";
        inputFocus(addInput);
    })

    //Função que controla os eventos de click dos botões da lista
    list.addEventListener("click", (e) => {

        //Variável com o botão mais próximo do elemento clicado
        const btnDataAction = e.target.closest("button");

        //Se não extistir um botão, já retorna e não executa o código restante
        if(!btnDataAction) return;

        //Elementos relacionados a li do elemento clicado
        const dataAction = btnDataAction.getAttribute("data-action");
        const listItem = btnDataAction.closest("li");
        const dataId = parseInt(listItem.getAttribute("data-id"))
        const editContainer = listItem.querySelector(".edit-container");
        const editInput = editContainer.querySelector(".edit-input");


        //Executa uma ação ou chama a função actionManager com base no valor do atributo data-action de btnDataAction
        switch(dataAction){
            case "check": 
                actionManager(dataId, dataAction)
                render(getTasks(), list)
                break;

            case "edit": 
                [...list.getElementsByClassName("edit-container")].forEach(container => {
                    container.classList.remove("visible-display");
                })

                editContainer.classList.add("visible-display");
                break;

            case "delete": 
                actionManager(dataId, dataAction)
                render(getTasks(), list)
                break;

            case "confirmEdit": 
                actionManager(dataId, dataAction, editInput.value)
                render(getTasks(), list)
                break;


            case "cancel": 
                const tasksClone = getTasks()        
                const task = tasksClone.find(task => task.id === dataId);
                editContainer.classList.remove("visible-display");
                editInput.value = task.taskName
                break;

            default: 
                break;
        }

    })
}

export {setEventsListeners};
