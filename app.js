
var boxElm = document.getElementsByClassName('box')[0];

function ListData(itemValue) {
  this.listText = itemValue;
  this.id = Math.floor((Math.random() * 1000 + Number((new Date().getTime().toString()).slice(-4)))) // generating id for obj
}

function saveData(data) {
  localStorage.setItem('todo_items', JSON.stringify(data))
  boxElm.innerHTML = ''  // to empty the UI
  renderListItems(); // render updated data in UI
}

function readData() {
  return JSON.parse(localStorage.getItem('todo_items'));
}
var todoData = (readData()) ? [...readData()] : []; //  save previous data.
// var booleanVar = false ;
function submitInput(e) {

  e.preventDefault();
  var inpValue = document.getElementById('input-text');

  console.log("inputValue 1", inpValue.value);

  if (inpValue.value === "") {
    alert("plz enter some text");
    return;
  } else {
    console.log("inputValue 2", inpValue.value);
    var obj = new ListData(inpValue.value);
    todoData = [...todoData, obj]
    console.log(todoData);
    console.log("inputValue 3", inpValue.value);
    inpValue.value = "";
    // inpValue = "jaoy"; 
    console.log("inputValue4", inpValue.value);

    saveData(todoData)
    console.log("else is running");
  }

  // var obj = new ListData(inpValue);
  // todoData = [...todoData, obj]
  // console.log(todoData);
  // saveData(todoData)
  // inpValue = ""; // to update the local storage with new data
  // console.log("else is running");
}

function renderListItems() {
  for (let i = 0; i < todoData.length; i++) {
    boxElm.innerHTML += `<div style='display:flex; gap : 15px'>
      <input type='text' style="visibility : hidden" value='${todoData[i].listText}' />
      <p>${todoData[i].listText}</p>
      <button onClick='editItem(event,${todoData[i].id})'>edit</button>
      <button onClick='deleteItem(event,${todoData[i].id})'>delete</button>
      </div></br>`
  }
}
renderListItems();

function editItem(e, id) {
  //   e.target.previousElementSibling.style.display ='none'
  e.target.previousElementSibling.style.visibility = 'hidden';
  // e.target.previousElementSibling.previousElementSibling.style.display ='block'
  e.target.previousElementSibling.previousElementSibling.removeAttribute("style");
  // var check = e.target.previousElementSibling.previousElementSibling.hasAttribute("style") ;
  // console.log( "HII",check )
  e.target.innerText = 'save'

  var editInpValue = e.target.previousElementSibling.previousElementSibling.value;
  console.log(editInpValue)
  e.target.setAttribute('onClick', `updatedItem(event,${id}, '${editInpValue}')`)
  console.log(e.target);


}

function updatedItem(e, ID, inptValue) {
  for (let i = 0; i < todoData.length; i++) {
    if (todoData[i].id === ID) {
      inptValue = e.target.previousElementSibling.previousElementSibling.value
      console.log(ID, inptValue);
      todoData[i] = { ...todoData[i], listText: inptValue }
      console.log(todoData[i]);
      console.log("hellow")
      console.log("hellow2")

      e.target.previousElementSibling.removeAttribute("style");
      e.target.previousElementSibling.innerText = e.target.previousElementSibling.previousElementSibling.value
      e.target.previousElementSibling.previousElementSibling.style.visibility = "hidden";
      e.target.innerHTML = "edit"
      saveData(todoData)
      return;

    }
  }

}

function deleteItem(e,ID) {
  // localStorage.removeItem(`listItem${e.target.parentElement.id}`)
  // console.log(e.target.parentElement.id)
  
  for( let i = 0; i < todoData.length; i++){
    
    if(todoData[i].id === ID){
      console.log( e.target.previousElementSibling.previousElementSibling.id)
      todoData.splice( e.target.previousElementSibling.previousElementSibling.id , 1 );
      
      
    }
  }
  console.log(e.target.parentElement);
  console.log(e.target.parentElement.remove())
}