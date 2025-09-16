const form = document.getElementById("form")
const addInput = document.getElementById("add-input")
const list = document.getElementById("list")
const addBtn = document.getElementById("add-btn")
let listsItem = list.getElementsByTagName("li")

//Variável que recebe o array armazenado no localStorage sempre que a página é carregada
const arrTasks = receiveLocalStorage()

//Busca e valida os itens do localStorage.
function receiveLocalStorage(){

    let arrLocalStorage = localStorage.getItem("items")

    if(!arrLocalStorage) return []

    try {
        arrLocalStorage = JSON.parse(arrLocalStorage)
        //Se o dado armazenado for um array com pelo menos um item, retorna o array
        //Se não retorna um array vazio
        return Array.isArray(arrLocalStorage) && arrLocalStorage.length ? arrLocalStorage : []
    } catch (error) {
        //Caso aconteça alguma coisa com o dado armazenado, também retorna um array vazio
        return []
    } 

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

    itemName.textContent = obj.itemName;

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


    //Adiciona o container de check, o parágrafo com o nome do item e o container com os botões, à li
    listItem.appendChild(checkContainer);
    listItem.appendChild(buttonsContainer);
    listItem.appendChild(editContainer);

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

//Função que executa uma determinada ação para cada botão
function clickListItems(listItem, dataAction, editContainer, inputEdit, index){

        //Objeto com as funções de cada botão
        const datas = {

            //Inverte o status 'completed' da tarefa no array de dados
            check: function(){
                
                arrTasks[index].completed = !arrTasks[index].completed


                //Salva o novo estado no localStorage e renderiza a lista novamente para refletir a mudança
                sendLocalStorage()
                displayNewItem(createNewItemObj)
                
            },

            //Função do botão que exibe o container de edição
            //Antes de tudo a função remove a classe que exibe os containers, de todos eles, para todos se fecharem quando um for aberto
            //Depois adiciona a classe que exibe o container, ao editContainer do elemento clicado
            edit: function(){

                console.log("edit");

                [...list.querySelectorAll(".edit-container")].forEach(container => {
                    container.classList.remove("visible-display")
                })

                editContainer.classList.add("visible-display")
            },

            //Função de deletar tarefa
            //Remove do arrTasks a li que contém o elemento que foi clicado
            //A lista é construída a partir de arrTasks então ambos funcionam com os mesmos índices
            delete: function(){
                console.log("delete")
                arrTasks.splice(index, 1)

                //Salva o novo estado no localStorage e renderiza a lista novamente para refletir a mudança
                displayNewItem(createNewItemObj)
                sendLocalStorage()
            },

            //Função de editar o nome da tarefa
            //Primeiro verifica se há algo digitado no input
            //Caso tenha algo digitado modifica o objeto com o nome da tarefa no arrTasks 
            //Depois atualiza a lista para imprimi-la na tela novamente
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

                //Salva o novo estado no localStorage e renderiza a lista novamente para refletir a mudança
                sendLocalStorage()
                displayNewItem(createNewItemObj)
            },

            //Função de cancelar edição
            //Remove do editContainer a classe que o exibe e atualiza o editInput 
            cancel: function(){
                console.log("cancel")
                editContainer.classList.remove("visible-display")
                inputEdit.value = arrTasks[index].itemName
            }

        }

        //Executa a função do objeto datas a partir do parâmetro (data action) recebido
        datas[dataAction]();
}

//Função que pega os índices das lis
function getIndex(arr, element){
    //Transforma o primeiro parâmetro em um array
   arr = Array.from(arr)
   //Retorna o índice do elemento dentro desse array
   return arr.indexOf(element)
}

function processClickItems(e) {
    
    //Variável com o botão mais próximo do elemento clicado
    const clickedElement = e.target.closest("button");

    //Se não existir um botão, já faz return
    if(!clickedElement) return

    //Variável com o atributo desse botão
    const dataAction = clickedElement.getAttribute("data-action");

    //Variável com a li do botão clicado
    const listItem = clickedElement.closest("li")

    //Variável com o editContainer do botão clicado
    const editContainer = listItem.querySelector(".edit-container");
    console.log(editContainer);

    //Variável com o input do botõa clicado
    const inputEdit = editContainer.querySelector("input")

    //Variável com o índice da li 
    //Chama a função getIndex e passa a lista de lis e a li da vez como argumentos
    const index = getIndex(listsItem, listItem)

    console.log(index);

    //Chama checkListItems com as variáveis criadas acima
    clickListItems(listItem, dataAction, editContainer, inputEdit, index)

}

//Evento de clique que dispara sempre que a lista é clicada
list.addEventListener("click", processClickItems);

displayNewItem(createNewItemObj);

                        