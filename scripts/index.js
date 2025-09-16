const form = document.getElementById("form")
const addInput = document.getElementById("add-input")
const list = document.getElementById("list")
const addBtn = document.getElementById("add-btn")
let listsItem = list.getElementsByTagName("li")

//Array quue recebe os objetos que representam cada tarefa a partir do localStorage
//Esse array também pode receber objetos da função addTask
const arrTasks = receiveLocalStorage()

//Função que retorna o array armazenado no localStorage
function receiveLocalStorage(){

    let arrLocalStorage = localStorage.getItem("items")
    arrLocalStorage = JSON.parse(arrLocalStorage)
        
    //se arrLocalStorage for false, no caso nulo ou 
    return arrLocalStorage && arrLocalStorage.length ? arrLocalStorage : []

}

//Função que armazena o array no localStorage
function sendLocalStorage(){
    localStorage.setItem("items", JSON.stringify(arrTasks))
}

//Função de focus no input
const inputFocus = () => addInput.focus();

//Função que exibe a mensagem de erro
function displayErrorMsg(error) {

    const errorContainer = document.querySelector(".error-container");
    const paragraphError = errorContainer.querySelector("p");
    const closeBtn = errorContainer.querySelector("button");

    errorContainer.classList.add("visible-display");
    paragraphError.textContent = error;

    closeBtn.focus();

    function removeErrorMsg () {
        errorContainer.classList.remove("visible-display");
        inputFocus();
        closeBtn.removeEventListener("click", removeErrorMsg);
        closeBtn.removeEventListener("keypress", removeErrorKey);
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
function createNewItemObj(obj){

    //Variável com a li que vai conter o novo item da lista
    const listItem = document.createElement("li");

    //Container com o botão de check
    const checkContainer = document.createElement("div");

    checkContainer.classList.add("container-check-btn");

    //Botão de check
    const checkBtn =  document.createElement("button");
    //Atributo data check
    checkBtn.setAttribute("data-action", "check");

    checkBtn.classList.add("check-btn");

    //Ícone de check
    const checkIcon = document.createElement("i");

    checkIcon.classList.add('fa-solid', 'fa-check', 'fa-sm', `${obj.completed ? "visible" : "invisible"}`);


    checkBtn.appendChild(checkIcon);
    checkContainer.appendChild(checkBtn);


    //Parágrafo com o nome do item
    const itemName = document.createElement("p");

    itemName.textContent = obj.itemName;

    //Adiciona o parágrafo ao check container
    checkContainer.appendChild(itemName);

    //Container com os botões de editar e excluir 

    //Container com os botões de editar e deletar
    const buttonsContainer = document.createElement("div");

    buttonsContainer.classList.add("buttons-container");

    //Botão de editar
    const editBtn =  document.createElement("button");
    //Atributo data edit
    editBtn.setAttribute("data-action", "edit");
    
    //Ícone de editar
    const editIcon = document.createElement("i") ;

    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    editBtn.appendChild(editIcon);

    //Botão de excluir
    const deleteBtn =  document.createElement("button");
    //Atributo data delete
    deleteBtn.setAttribute("data-action", "delete");

    //Ícone de deletar
    const deleteIcon = document.createElement("i");

    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteBtn.appendChild(deleteIcon);

    //Adiciona os botões de editar e excluir ao container
    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);


    //Container de edição
    const editContainer = document.createElement("div");
    editContainer.classList.add("edit-container");

    const editInput = document.createElement("input");
    editInput.setAttribute("type", "text");
    editInput.classList.add("edit-input");
    editInput.value = obj.itemName

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


    //Adiciona o container de check, o parágrafo com o nome do item e o container com os botões à li
    listItem.appendChild(checkContainer);
    listItem.appendChild(buttonsContainer);
    listItem.appendChild(editContainer);

    //Adiciona a nova li à lista
    // list.appendChild(listItem)

    return listItem

}

//Função que adiciona a li retornada pela função createNewItemObj, à lista de tarefas
function displayNewItem(create) {

    //Limpa antes para não exibir tarefas repetidas, já que percorre todos os objetos do array de tarefas
    list.innerHTML = "";
    if(arrTasks.length){
        arrTasks.forEach((task) => {
        list.appendChild(create(task));
        })
    }
}

//Adiciona uma nova tarefa/objeto ao array de tarefas
function addTask(taskName) {
    arrTasks.push({
        itemName: taskName,
        createDate: Date.now(),
        completed: false
    })

    sendLocalStorage()
}

//Função que faz a verifica se o input não está vazio
const checkInput = input => {
    if(input.value){
        return true;
    } else {
        throw new Error("O campo do formulário não pode estar vazio");
    }
}

//Função com a lógica principal, que executa todas as outras funções
function process(check, add, displayItem, create, displayError) {

    try {
        check(addInput);
        add(addInput.value);
        displayItem(create);
        addInput.value = "";
        inputFocus();
    } catch (error) {
        displayError(error.message);
    }
}

//Evento de submit, que chama a função process e passa as outras funções como argumento
form.addEventListener("submit", (e) => {
    e.preventDefault();
    process(checkInput, addTask, displayNewItem, createNewItemObj, displayErrorMsg);

})

function getIndex(arr, element){
   arr = Array.from(arr)
   return arr.indexOf(element)
}

function clickListItems(e){

    // console.log(e.target)
    const clickedElement = e.target.closest("button");
    if(!clickedElement) return
    const dataAction = clickedElement.getAttribute("data-action");

    const listItem = clickedElement.closest("li")
    
    const editContainer = listItem.querySelector(".edit-container");
    console.log(editContainer);

    const inputEdit = editContainer.querySelector("input")

    const index = getIndex(listsItem, listItem)
    console.log(index);

        const datas = {

            check: function(){
                console.log("check");
                const checkIconClick = listItem.querySelector(".fa-check")
                arrTasks[index].completed = !arrTasks[index].completed

                if(arrTasks[index].completed){
                    checkIconClick.classList.add("visible")
                } else {
                    checkIconClick.classList.remove("visible")
                }

                sendLocalStorage()
                displayNewItem(createNewItemObj)
                
            },

            edit: function(){

                console.log("edit");

                [...list.querySelectorAll(".edit-container")].forEach(container => {
                    container.classList.remove("visible-display")
                })

                editContainer.classList.add("visible-display")
            },

            delete: function(){
                console.log("delete")
                arrTasks.splice(index, 1)
                displayNewItem(createNewItemObj)
                sendLocalStorage()
            },

            confirmEdit: function(){

                console.log("confirmEdit")
                console.log(inputEdit)
        
                try {
                    checkInput(inputEdit)
                } catch (error) {
                    displayErrorMsg(error.message)
                    return
                }
                arrTasks[index].itemName = inputEdit.value
                sendLocalStorage()
                displayNewItem(createNewItemObj)
            },

            cancel: function(){
                console.log("cancel")
                editContainer.classList.remove("visible-display")
                inputEdit.value = arrTasks[index].itemName
            }

        }

        datas[dataAction]();
}

list.addEventListener("click", clickListItems);

displayNewItem(createNewItemObj);

                        