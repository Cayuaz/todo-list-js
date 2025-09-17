//Variável que recebe o array armazenado no localStorage sempre que a página é carregada
const arrTasks = receiveLocalStorage();

//Busca e valida os itens do localStorage.
function receiveLocalStorage(){

    let arrLocalStorage = localStorage.getItem("items");

    if(!arrLocalStorage) return [];

    try {
        arrLocalStorage = JSON.parse(arrLocalStorage);
        //Se o dado armazenado for um array com pelo menos um item, retorna o array
        //Se não retorna um array vazio
        return Array.isArray(arrLocalStorage) && arrLocalStorage.length ? arrLocalStorage : [];
    } catch (error) {
        //Caso aconteça alguma coisa com o dado armazenado, também retorna um array vazio
        return [];
    } 

}

//Função que armazena o array no localStorage
function sendLocalStorage(){
    localStorage.setItem("items", JSON.stringify(arrTasks));
}

//Função que retorna um clone do array de tarefas
function getTasks(){
    return [...arrTasks];
}

//Função de alterar o check da tarefa
function completedTask(index){
                
    arrTasks[index].completed = !arrTasks[index].completed;


    //Salva o novo estado no localStorage 
    sendLocalStorage();           
}

//Função de remover a tarefa
function removeTask(index) {
    arrTasks.splice(index, 1);

    //Salva o novo estado no localStorage
    sendLocalStorage();
}

//Função de alterar o nome da tarefa
function updateNameTask(index, taskName){

    arrTasks[index].itemName = taskName;

    //Salva o novo estado no localStorage
    sendLocalStorage();
}

//Função de adicionar uma tarefa nova
function addTask(taskName) {
    arrTasks.push({
        itemName: taskName,
        createDate: Date.now(),
        completed: false
    })

    sendLocalStorage();
}

export {getTasks, completedTask, removeTask, updateNameTask, addTask};