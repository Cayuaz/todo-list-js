let idCounter = 0;

//Molde para criação de novas tarefas
class Task {

    //O constructor pode receber parâmetros, mas caso não os receba, já possui valores pré-definidos, exceto Name, que é obrigatório
    constructor(Name, id = null, createdAt = Date.now(), updatedAt = null, completed = false){
        this.taskName = Name
        this.id = id !== null ? id : ++idCounter;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.completed = completed;      
    }

    //Método de alterar o nome da tarefa
    set updatedName(newName){
        if(newName){
            this.taskName = newName;
            this.updatedAt = Date.now();
        } 
    }

    //Método de alterar o check da tarefa
    completedTask(){
        this.completed = !this.completed;
    }

}

//Variável que recebe o array armazenado no localStorage sempre que a página é carregada, e os objetos criados com Task
const arrTasks = receiveLocalStorage();

//Busca e valida os itens do localStorage
//Para qualquer valor que não passar na validação, ele retorna um array vazio, que é o valor padrão
function receiveLocalStorage(){

    let arrLocalStorage = localStorage.getItem("items");

    if(!arrLocalStorage) return [];

    try {
        arrLocalStorage = JSON.parse(arrLocalStorage);

        //Verifica se é um array e se ele não está vazio
        if(Array.isArray(arrLocalStorage) && arrLocalStorage.length){

            //maxId serve como uma referência do maior id já existente, para atualizar o idCounter
            let maxId = 0

            //newArrTask retorna um novo array a partir do array recuperado do localStorage
            //Este array contém os mesmos objetos, mas com os seus métodos, que não foram recuperados
            //Para cada objeto ele cria uma nova task com os valores da task antiga
            const newArrTask = arrLocalStorage.map(oldTask => {

              if(oldTask.id > maxId){
                maxId = oldTask.id
              }

              return new Task(
                    oldTask.taskName,
                    oldTask.id,            
                    oldTask.createdAt,
                    oldTask.updatedAt,
                    oldTask.completed
                )
                                 
            })

        idCounter = maxId || 0
        return newArrTask

        } else {
            return []
        }
    } catch (error) {
        
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


//Função de adicionar uma tarefa nova
function addTaskArr(taskName){
    arrTasks.push(new Task(taskName));
    sendLocalStorage();
}

//Função que gerencia as ações de check, edit e delete
function actionManager(id, action, newTaskName){

    //Busca dentro de arrTasks o primeiro objeto que tiver o id correspondente
    const task = arrTasks.find(task => task.id === id);

    switch(action){

        case "check": 
            task.completedTask();
            sendLocalStorage();
            break;
                               
        case "delete":
            const indexTask = arrTasks.indexOf(task);
            arrTasks.splice(indexTask, 1);
            sendLocalStorage();
            break;
                
        case "confirmEdit":
            task.updatedName = newTaskName;
            sendLocalStorage();
            break;
        default:
            break;      
    }
           
}

export {getTasks, actionManager, addTaskArr};