class Task {

    constructor(Name, id = null, createdAt = new Date(), updatedAt = null, completed = false){
        this.taskName = Name
        this.id = id !== null ? id : ++idCounter;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.completed = completed;      
    }

    //Função de alterar o nome da tarefa
    updatedName(newName){
        if(newName){
            this.taskName = newName;
            this.updatedAt = new Date();
        } 
    }

    //Função de alterar o check da tarefa
    completedTask(){
        this.completed = !this.completed;
    }

}

let idCounter = 0;
//Variável que recebe o array armazenado no localStorage sempre que a página é carregada
const arrTasks = receiveLocalStorage();

//Busca e valida os itens do localStorage.
function receiveLocalStorage(){

    let arrLocalStorage = localStorage.getItem("items");
    console.log(arrLocalStorage)

    if(!arrLocalStorage) return [];

    try {
        arrLocalStorage = JSON.parse(arrLocalStorage);
        //Se o dado armazenado for um array com pelo menos um item, retorna o array
        //Se não retorna um array vazio
        // return  && arrLocalStorage.length ?  : [];

        console.log(arrLocalStorage)

        if(Array.isArray(arrLocalStorage)){

            let maxId = 0
            const newArrTask = arrLocalStorage.map(oldTask => {

              if(oldTask.id > maxId){
                maxId = oldTask.id
              }

              return new Task(
                    oldTask.taskName,
                    oldTask.id,            
                    new Date(oldTask.createdAt),
                    new Date(oldTask.updatedAt) || null,
                    oldTask.completed
                )
                                 
            })

        idCounter = maxId || 0
        return newArrTask

        } else {
            return []
        }
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
    console.log(arrTasks)
    return [...arrTasks];
}


//Função de adicionar uma tarefa nova
function addTaskArr(taskName){
    arrTasks.push(new Task(taskName));
    sendLocalStorage();
}

function actionManager(id, action, newTaskName){
    id = parseInt(id)
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
            task.updatedName(newTaskName);
            sendLocalStorage();
            break;
        default:
            break;      
    }
           
}

export {getTasks, actionManager, addTaskArr};