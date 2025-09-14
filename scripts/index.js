const form = document.getElementById("form")
const addInput = document.getElementById("add-input")
const list = document.getElementById("list")
const addBtn = document.getElementById("add-btn")


{/* <li>
                            <div class="container-check-btn">
                                <button type="button" class="check-btn">
                                <i class="fa-solid fa-check fa-sm"></i>
                                </button>

                                <p>Example: Item1</p>
                            </div>
                            
                            <div class="buttons-container">
                                <button type="button"><i class="fa-solid fa-pen-to-square"></i></button>
                                
                                <button type="button"><i class="fa-solid fa-trash"></i></button>
                            </div> */}

function createNewItem(inputText){

    //Variável com a li que vai conter o novo item da lista
    const listItem = document.createElement("li")

    //Container com o botão de check

    //Container com o botão de check
    const checkContainer = document.createElement("div")

    checkContainer.classList.add("container-check-btn")

    //Botão de check
    const checkBtn =  document.createElement("button")

    checkBtn.classList.add("check-btn")

    //Ícone de check
    const checkIcon = document.createElement("i")

    checkIcon.classList.add('fa-solid', 'fa-check', 'fa-sm')


    checkBtn.appendChild(checkIcon)
    checkContainer.appendChild(checkBtn)


    //Parágrafo com o nome do item
    const itemName = document.createElement("p")

    itemName.textContent = inputText

    //Adiciona o parágrafo ao check container
    checkContainer.appendChild(itemName)

    //Container com os botões de editar e excluir 

    //Container com os botões de editar e deletar
    const buttonsContainer = document.createElement("div")

    buttonsContainer.classList.add("buttons-container")

    //Botão de editar
    const editBtn =  document.createElement("button")

    //Ícone de ediatr
    const editIcon = document.createElement("i")

    editIcon.classList.add('fa-solid', 'fa-pen-to-square')
    editBtn.appendChild(editIcon)

    //Botão de excluir
    const deleteBtn =  document.createElement("button")

    //Ícone de deletar
    const deleteIcon = document.createElement("i")

    deleteIcon.classList.add('fa-solid', 'fa-trash')
    deleteBtn.appendChild(deleteIcon)

    //Adiciona os botões de editar e excluir ao container
    buttonsContainer.appendChild(editBtn)
    buttonsContainer.appendChild(deleteBtn)

    //Adiciona o container de check, o parágrafo com o nome do item e o container com os botões à li
    listItem.appendChild(checkContainer)
    listItem.appendChild(buttonsContainer)

    //Adiciona a nova li à lista
    list.appendChild(listItem)

}

const checkInput = input => {
    if(input.value){
        return true
    } else {
        throw new Error("O campo do formulário não pode estar vazio")
    }
}

function process(check, create) {

    try {
        check(addInput);
        create(addInput.value);
        addInput.value = "";
        addInput.focus();
    } catch (error) {
        console.log(error.message)
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    process(checkInput, createNewItem)

})


                        