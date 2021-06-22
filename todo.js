//? variables
const input = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoArchivados = document.querySelector(".todo-archivados");

//? eventos
todoButton.addEventListener(`click`, agregarTarea);
todoList.addEventListener(`click`, botonesItem);
todoArchivados.addEventListener(`click`, recuperarItem);
document.addEventListener("DOMContentLoaded", getTodos);


//? funciones
//En el submit agrega una nueva tarea a la lista
function agregarTarea(e) {
    //previene que recargue la página en el submit
    e.preventDefault();

    //chequear si el input esta vacio
    if (input.value != "") {



        //pasar el valor del input y crear la tarea
        createNewTodo(input.value);
        // Guardamos
        saveLocal(input.value);
        //borrar el valor del input
        input.value = "";



    } else {
        //Cambiar texto del placeholder
        input.placeholder = "Ingresa una nueva tarea..."
            //hacer foco en el input
        input.focus();
    }


}

//Borra o archiva la tarea
function botonesItem(e) {
    const item = e.target;

    //borrar el item
    if (item.classList[0] === "delete-btn") {
        const parent = item.parentElement;
        //agregar clase para animar
        parent.classList.add("delete-item");
        removeLocalTodos(parent);
        //agregamos un evento para que espere la animación
        parent.addEventListener("transitionend", function() {
            //quitar el parent
            parent.remove();
        });
    }

    //archivar el item
    if (item.classList[0] === "complete-btn") {
        const parent = item.parentElement;
        //sacar de la lista
        parent.remove();
        //agrgar clase de item archivado
        parent.classList.add("item-archivado");
        //borramos el botón de archivar
        parent.removeChild(parent.children[1]);
        //Agregar al archivo
        todoArchivados.appendChild(parent);
        //borro de la lista de tareas
        removeLocalTodos(parent);
        //agregar a la lista de archivados
        saveLocalArchive(parent.children[0].innerText);
        console.log(parent.children[0].innerText);
    }

}

//envia los items archivados a la lista de tareas
function recuperarItem(e) {
    const item = e.target;

    //recupera el item
    if (item.classList[0] === "delete-btn") {
        const parent = item.parentElement;
        //guardo el botón borrar
        const deleteButton = parent.children[1];
        //borro el botón actual
        parent.removeChild(parent.children[1]);
        //sacar del archivo
        parent.remove();
        //Crear botón de completo
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        //sacar la clase archivado
        parent.classList.remove("item-archivado");
        //Agregar el botón de archivar y borrar en orden
        parent.appendChild(completedButton);
        parent.appendChild(deleteButton);

        //Agregar al listado
        todoList.appendChild(parent);

        //sacar de la lista de archivados
        removeLocalArchive(parent);

        //agregar a la lista de tareas
        saveLocal(parent.children[0].innerText);
    }

}

//recupera la información guardada localmente
function getLocalData() {
    let todos;
    //chequear si tengo datos
    if (localStorage.getItem("todos") === null) {
        //Creo un array vacio
        return todos = []
    } else {
        //recupero lo guardado
        return todos = JSON.parse(localStorage.getItem("todos"));
    }

}

//Guarda localmente la nueva tarea agregada
function saveLocal(todo) {
    //buscar las tareas guardadas
    let todos = getLocalData();
    //agregar nuevo item
    todos.push(todo);
    //guardar en local
    localStorage.setItem("todos", JSON.stringify(todos));
}

//recupera las tareas guardadas localmente
function getTodos() {
    //buscar las tareas guardadas
    let todos = getLocalData();
    //iterar entre todos los elementos
    todos.forEach(function(todo) {
        createNewTodo(todo);

    });
}


//Crea la estructura de la nueva tarea ingresada
function createNewTodo(inputText) {
    //crear el div contenedor
    const todoDiv = document.createElement("div");
    //agregamos la clase contenedora de la tarea
    todoDiv.classList.add("todo");
    //crear la lista interna
    const newTodo = document.createElement("li");
    newTodo.innerText = inputText;
    //agregamos la clase al item de la tarea
    newTodo.classList.add("todo-item");
    //Crear botón de completo
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    //Crear botón de borrar
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    deleteButton.classList.add("delete-btn");

    //Agregamos el item y los botones al contenedor
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(deleteButton);

    //agregarmos el bloque contenedor a la lista
    todoList.appendChild(todoDiv);
}

//recupera las tareas archivadas localmente
function getArchive() {
    //buscar las tareas guardadas
    let todos = getLocalDataArchive();
    //iterar entre todos los elementos
    todos.forEach(function(todo) {
        createNewTodo(todo);

    });
}

//Borra la tarea de la lista local
function removeLocalTodos(todo) {

    let todos = getLocalData();
    //En que index esta el item a borrar
    const todoText = todo.children[0].innerText;
    //sacar del array el item eliminado
    todos.splice(todos.indexOf(todoText), 1);
    //guardar en local el nuevo array
    localStorage.setItem("todos", JSON.stringify(todos));

}

//Guarda localmente la nueva tarea agregada
function saveLocalArchive(todo) {
    //buscar las tareas guardadas
    let todosArchive = getLocalDataArchive();
    //agregar nuevo item
    todosArchive.push(todo);
    //guardar en local
    localStorage.setItem("archive", JSON.stringify(todosArchive));
}

//recupera la información guardada localmente de los archivados 
function getLocalDataArchive() {
    let todosArchive;
    //chequear si tengo datos
    if (localStorage.getItem("archive") === null) {
        //Creo un array vacio
        return todosArchive = []
    } else {
        //recupero lo guardado
        return todosArchive = JSON.parse(localStorage.getItem("archive"));
    }

}

//Borra la tarea de la lista de archivos
function removeLocalArchive(todo) {

    let todosArchive = getLocalDataArchive();
    //En que index esta el item a borrar
    const todoText = todo.children[0].innerText;
    //sacar del array el item eliminado
    todosArchive.splice(todosArchive.indexOf(todoText), 1);
    //guardar en local el nuevo array
    localStorage.setItem("archive", JSON.stringify(todosArchive));

}



//? Clases