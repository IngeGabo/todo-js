//Importaciones
import { Todo } from "../classes";
import { todoList } from "../index.js";
//Refenrecias em HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const aborrar       = document.querySelector('.clear-selector');
const ulfil         = document.querySelector('.filters');
const fil           = document.querySelectorAll('.filtro');


export const crearHTML = (todo)=>{
    const htmlTodo = 
    `<li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked': ''}>
        <label>${todo.tarea}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}


//Eventos
txtInput.addEventListener('keyup', (event) =>{
    if (event.keyCode === 13 && txtInput.value.length > 0) {//incompleto
        const nuevoTodo = new Todo(txtInput.value)
        todoList.nuevoTodo(nuevoTodo);
        crearHTML(nuevoTodo);
        txtInput.value = '';
    }
});
divTodoList.addEventListener('click', (event)=>{
    const nombreElemento    = event.target.localName;
    const todoElemento      = event.target.parentElement.parentElement;
    const todoId            = todoElemento.getAttribute('data-id');
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    }else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);        
    }
    
})
aborrar.addEventListener('click',(event)=>{
    
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
        
    }       
})
//filtros
ulfil.addEventListener('click', (event) =>{
    const unfil = event.target.text;
    console.log(event.target.text);
    if (!unfil) {return;}
    fil.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');
    for( const elemento of divTodoList.children ) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    switch (unfil) {
        case 'Pendientes':
            if (completado) {
                elemento.classList.add('hidden');
                
            }
            break;
    
        case 'Completados':
            if (!completado) {
                elemento.classList.add('hidden');
                
            }
            break;
        // case 
    }
    }
});