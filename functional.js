let elements = document.querySelectorAll('input[type="text"]');

function checkValidity() {};

for (let i=0; i<elements.length; i++) {
    (function(element) {
       let id = element.getAttribute('id');
        element.value = sessionStorage.getItem(id);
        element.oninput = function() {
            sessionStorage.setItem(id, element.value);
            checkValidity();
        };
    })(elements[i]);
}

window.addEventListener('storage', function(event) {
    console.log(event.key);
});

function myFun(){
    let randcol= "";
    let allchar="0123456789ABCDEF";
    for(let i=0; i<6; i++){
        randcol += allchar[Math.floor(Math.random()*16)];
    }
    document.body.style.backgroundColor= "#"+randcol;
}


///////////////////
let notesField = document.getElementById('notes');
let addNoteField = document.getElementById('add-note');
let addButton = document.getElementById('add-button');
let textarea = addNoteField.querySelector('textarea');
let notesArr = [];

if (localStorage.getItem('notes')){
    notesArr = JSON.parse(localStorage.getItem('notes'));
}

addButton.addEventListener('click', function(){
    addNewNote(textarea.value);
    textarea.value = '';
});
window.addEventListener('load', loadNotes);

function addNewNote(text){
    save(text);
    createNote(text);
}

function deleteNote(){
    let arr = Array.from(notesField.children);
    let i = arr.indexOf(this.parentElement);
    notesArr.splice(i,1);
    notesField.removeChild(this.parentElement);

    localStorage.setItem('notes', JSON.stringify(notesArr));
}

function save(text) {
    notesArr.push(text);
    localStorage.setItem('notes', JSON.stringify(notesArr));
}

function loadNotes() {
    if (notesArr.length){
        for (let i = 0; i < notesArr.length; i++){
            createNote(notesArr[i]);
        }
    }
}

function createNote(text){
    let div = document.createElement('div');
    let p = document.createElement('p');
    let a = document.createElement('a');

    div.classList.add('note');
    p.innerHTML = text;
    a.href = '#';
    a.innerHTML = 'x';
    a.classList.add('close');

    a.addEventListener('click', deleteNote);

    notesField.appendChild(div);
    div.appendChild(a);
    div.appendChild(p);
}
