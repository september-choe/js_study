const form = document.getElementById('js-toDoForm');
const input = document.getElementById('js-toDoInput');
const list = document.querySelector('.js-toDoList');


const TODOS_LS = 'toDos'; // define Key in localStorage

let toDos = [];

function deleteToDo(event){
    console.log(event.target);
    const btn = event.target;
    const li = btn.parentNode;
    list.removeChild(li);

    const cleanToDos = toDos.filter(function(v){
        console.log("v: " + v.id);
        console.log("li.id: " + li.id);
        return v.id !== parseInt(li.id);
    });

    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // You can only store Strings in localStorage
}

function paintToDo(text){
    const li = document.createElement("li");

    const span = document.createElement('span');
    span.innerHTML = text;

    const delBtn = document.createElement('button');
    delBtn.value = 'delete';
    delBtn.addEventListener('click', deleteToDo);

    const newId = toDos.length + 1;
    console.log('newID: ' + newId);

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId; // <-- add id to li tag
    list.appendChild(li);

    const toDoObj = { // <-- add id to obj which will be stored in localStorage
        text: text,
        id: newId,
    };

    toDos.push(toDoObj);

    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    // The event.preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value='';
}

function loadToDos(){ 
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(v){
            paintToDo(v.text);
        })
    } else {
        console.log("loadedToDos가 없다");
    }
}

function init(){
    loadToDos();
    form.addEventListener('submit', handleSubmit);
}

init();