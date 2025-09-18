const addInput = document.getElementById("add-input");

//Função de focus 
const inputFocus = (input) => input.focus();

//Função que exibe a mensagem de erro
function displayErrorMsg(error) {

    const errorContainer = document.querySelector(".error-container");
    const paragraphError = errorContainer.querySelector("p");
    const closeBtn = errorContainer.querySelector("button");

    errorContainer.classList.add("visible-display");
    paragraphError.textContent = error;

    inputFocus(closeBtn)

    function removeErrorMsg () {
        errorContainer.classList.remove("visible-display");
        inputFocus(addInput)
        closeBtn.removeEventListener("click", removeErrorMsg);
        closeBtn.removeEventListener("keyup", removeErrorKey);
    }

    function removeErrorKey(e) {
        if(e.key === "Escape"){
            removeErrorMsg();
        }
    }

    closeBtn.addEventListener("click", removeErrorMsg);
    closeBtn.addEventListener("keyup", removeErrorKey);
         
}

//Função que retorna uma nova li com uma nova tarefa 
function createNewItemObj(obj) {

    //Variável com a li que vai conter o novo item da lista
    const listItem = document.createElement("li");
    listItem.setAttribute("data-id", obj.id)

    //Bloco de criação do botão de check e seu contêiner
    const checkContainer = document.createElement("div");

    checkContainer.classList.add("container-check-btn");

    //Botão de check
    const checkBtn =  document.createElement("button");
    //Atributo data check
    checkBtn.setAttribute("data-action", "check");

    checkBtn.classList.add("check-btn");

    //Ícone de check
    const checkIcon = document.createElement("i");

    //Se completed for true, já renderiza o ícone de check na tela, se não o esconde
    checkIcon.classList.add('fa-solid', 'fa-check', 'fa-sm', `${obj.completed ? "visible" : "invisible"}`);


    checkBtn.appendChild(checkIcon);
    checkContainer.appendChild(checkBtn);


    //Bloco do parágrafo que vai conter o nome da tarefa
    const itemName = document.createElement("p");

    itemName.textContent = obj.taskName;

    //Adiciona o parágrafo ao check container
    checkContainer.appendChild(itemName);

    //Container com os botões de editar e excluir 

    //Bloco de criação do botões de editar e excluir, e seu contêiner
    const buttonsContainer = document.createElement("div");

    buttonsContainer.classList.add("buttons-container");
    const editBtn =  document.createElement("button");
    //Atributo data edit
    editBtn.setAttribute("data-action", "edit");
    
    const editIcon = document.createElement("i") ;

    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    editBtn.appendChild(editIcon);

    const deleteBtn =  document.createElement("button");
    //Atributo data delete
    deleteBtn.setAttribute("data-action", "delete");

    const deleteIcon = document.createElement("i");

    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteBtn.appendChild(deleteIcon);

    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);


    //Bloco de criação do container de edição 
    const editContainer = document.createElement("div");
    editContainer.classList.add("edit-container");

    const editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.setAttribute("name", "edit");
    editInput.classList.add("edit-input");

    //O editInput começa sempre com o nome da tarefa atual
    editInput.value = obj.taskName;

    const btnConfirmEdit = document.createElement("button");
    btnConfirmEdit.classList.add("edit-btn");

    //Atributo data confirmEdit
    btnConfirmEdit.setAttribute("data-action", "confirmEdit");
    btnConfirmEdit.textContent = "Edit";

    const btnCancel = document.createElement("button");
    btnCancel.classList.add("cancel-btn");

    //Atributo data cancel
    btnCancel.setAttribute("data-action", "cancel");
    btnCancel.textContent = "Cancel"

    editContainer.appendChild(editInput);
    editContainer.appendChild(btnConfirmEdit);
    editContainer.appendChild(btnCancel);


    //Adiciona o container de check, o parágrafo com o nome do item e o container com os botões, à li
    listItem.appendChild(checkContainer);
    listItem.appendChild(buttonsContainer);
    listItem.appendChild(editContainer);

    return listItem

}

//Função que adiciona a li retornada pela função createNewItemObj, à lista de tarefas
function render(tasks, list) {

    if(!tasks){
        return;
    }

    //Limpa antes para não exibir tarefas repetidas, já que percorre todos os objetos do array de tarefas
    list.innerHTML = "";
    tasks.forEach((task) => {
        list.appendChild(createNewItemObj(task));
    })
        
}

export {render, displayErrorMsg, inputFocus};




