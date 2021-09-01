showNotes();
function validation() {   
    alert("You must agree before publish your Blog");
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let addDate = document.getElementById("addDate");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        name: addName.value,
        date: addDate.value,
        Title: addTitle.value,
        text: addTxt.value,
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addName.value = "";
    addTxt.value = "";
    addTitle.value = "";
    addDate.value = "";
    showNotes();
};
// Function to show element from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {        
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card col-12 d-flax  style="width: 18rem;">
        <div class="card-body">
        <h2 class="card-Title"> ${index + 1}. ${element.Title}</h2>
        <h4 class="card-Title">${element.name} </h4>
        <p class="card-text"> ${element.date} :- ${element.text} ${element.span}</p>
        </div>
        </div>`;
    });
    let noteElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteElm.innerHTML = html;
    }
    else {
        noteElm.innerHTML = `Nothing to show! Use "Post Blog" section above to Post Blog.`
    }
}
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log("input event fired!", inputVal);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none"
        }

    })
});