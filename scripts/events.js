import {getTasks, completedTask, removeTask, updateNameTask, addTask} from "./state.js"
import {render, displayErrorMsg, inputFocus} from "./ui.js"

const form = document.getElementById("form")
const addInput = document.getElementById("add-input")
const list = document.getElementById("list")
const listItems = list.getElementsByTagName("li")

//Função que controla os eventos de adicionar tarefa e dos botões de check, edit, delete e cancel
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
        addTask(addInput.value);
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
        const editContainer = listItem.querySelector(".edit-container");
        const editInput = editContainer.querySelector(".edit-input");
        //Variável com o índice da li 
        const index = Array.from(listItems).indexOf(listItem);

        //Executa uma função com base no valor do atributo data-action de btnDataAction
        switch(dataAction){
            case "check": 
                completedTask(index);
                render(getTasks(), list)
                break;

            case "edit": 
                [...list.getElementsByClassName("edit-container")].forEach(container => {
                    container.classList.remove("visible-display");
                })

                editContainer.classList.add("visible-display");
                break;

            case "delete": 
                removeTask(index);
                render(getTasks(), list)
                break;

            case "confirmEdit": 
                updateNameTask(index, editInput.value);
                render(getTasks(), list)
                break;


            case "cancel": 
                const tasksClone = getTasks()
                editContainer.classList.remove("visible-display");
                editInput.value = tasksClone[index].itemName;
                break;

            default: 
                break;
        }

    })
}

export {setEventsListeners, list};
