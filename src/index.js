import {Todo, TodoList} from './classes/index.js';
import { crearHTML } from './js/componentes.js';
import './style.css';
export const todoList = new TodoList(); 
todoList.todos.forEach(crearHTML);