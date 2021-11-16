let addBtn = document.getElementById('add-btn');
let addTitle = document.getElementById('note-title');
let addTxt = document.getElementById('note-text');

showNotes();

addBtn.addEventListener('click',(e)=>{
    if(addTitle.value == "" || addTxt.value == ""){
        return alert("Please Add Note Title and Details");
    }

    let note = localStorage.getItem("note");
    if(note == null){
        noteObj = [];
    }
    else{
        noteObj = JSON.parse(note);
    }
    let myObj = {
        title:addTitle.value,
        text:addTxt.value
    }
    noteObj.push(myObj);
    localStorage.setItem("note", JSON.stringify(noteObj));
    addTitle.value = "";
    addTxt.value = "";

    showNotes();
})

// SHOW NOTES ON THE PAGE
function showNotes() {
    let note = localStorage.getItem("note");
    if(note == null){
        noteObj = [];
    }
    else{
        noteObj = JSON.parse(note);
    }

    let html = "";
    noteObj.forEach(function(element,index){
        html += `
        <div id="note">
        <p class="note-counter">Note ${index + 1}</p>
        <h3 class="note-title">${element.title}</h3>
        <p class="note-text">${element.text}</p>
        <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
        <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
    </div>
        `;
    });

    let noteElm = document.getElementById("notes");
    if(noteObj.length != 0){
        noteElm.innerHTML = html;
    }
    else{
        noteElm.innerHTML = "No Notes Yet! Add a note using the form above";
    }

}


//FUCTION TO DELETE

function deleteNote(index){
    let confirmDel = confirm("Do You Really Want to Delete this Note?");

    if(confirmDel == true){
        let note = localStorage.getItem("note");
        if(note == null){
            noteObj = [];
        }
        else{
            noteObj = JSON.parse(note);
        }

        noteObj.splice(index,1);
        localStorage.setItem("note", JSON.stringify(noteObj));
        showNotes();
    }
}

//FUNCTION TO EDIT NOTE

function editNote(index){
    let note = localStorage.getItem("note");
    if(addTitle.value != "" || addTxt.value != "" ){
        return alert("Please clear the form before editing a Note");
    }
    if(note == null){
        noteObj = [];
    }
    else{
        noteObj = JSON.parse(note);
    }
    noteObj.findIndex((element, index)=>{
        addTitle.value = element.title;
        addTxt.value = element.text;
    })
    noteObj.splice(index,1);
    localStorage.setItem("note",JSON.stringify(noteObj));
    showNotes();
}
