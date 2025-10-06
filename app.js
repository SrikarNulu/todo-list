
let todoList =[];


let input = document.getElementById("input");
let addButton = document.getElementById("addButton");
let listContainer = document.getElementById("listContainer");
let saveBtn = document.getElementById("saveBtn");


function getTodoItems(){
    let items = localStorage.getItem("todoList");
    let itemObj = JSON.parse(items);

    if (!itemObj) {   
        return [];
    }

    for (let item of itemObj){
        createListItem(item);
    }

   // console.log(itemObj);
    return itemObj;
};

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let index = todoList.findIndex(function(eachItem) {
        eachItem = "todo" + eachItem.counter;
        if (eachItem === todoId) {
            return true;
        } else {
            return false;
        }

    });

    let clickedObject = todoList[index];

    if (clickedObject.isChecked === true) {
        clickedObject.isChecked = false;
    } else {
        clickedObject.isChecked = true;
    }



}



todoList = getTodoItems();

saveBtn.onclick = function(){
    let todo = JSON.stringify(todoList);
    localStorage.setItem("todoList",todo);
};


function  deleteTodoItem(listItem,todoId){
      listContainer.removeChild(listItem);
      
      let index = todoList.findIndex(function(item){
          item = "todo"+item.counter;
        if(item===todoId){
            return true;
        }
       else {return false;}
        
      });
    
     todoList.splice(index,1);
};

function createListItem(todo){
    
     let todoId = "todo"+todo.counter;
     let checkboxId = "checkboxId"+todo.counter;
     let labelId = "labelId"+todo.counter;
    

    let listItem = document.createElement("li");
    listContainer.appendChild(listItem);
    listItem.classList.add("list-item-container", "d-flex", "flex-row");

    let checkBox = document.createElement("input");
    checkBox.classList.add("mr-3");
    checkBox.type = 'checkbox';
    checkBox.id = checkboxId;
    listItem.appendChild(checkBox);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container" ,"d-flex", "flex-row");
    let label = document.createElement("label");
    
    label.classList.add("label");
    label.id = labelId;
    label.setAttribute("for",checkboxId);
    label.textContent = todo.text;
    listItem.appendChild(labelContainer);
    labelContainer.appendChild(label);

     if (todo.isChecked === true) {
        label.classList.add("checked");
          checkBox.checked = true;
    }

   
    // checkBox.onclick = function(){
    //     label.classList.toggle("checked");
    // };


       checkBox.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };


    let binContainer = document.createElement("div"); 
    listItem.appendChild(binContainer);
     binContainer.classList.add("d-flex", "flex-column","justify-content-center",'mr-1');
    let deleteIcon = document.createElement("i");
    
    deleteIcon.classList.add("bi", "bi-trash","icon","delete-icon");
    binContainer.appendChild(deleteIcon);

    deleteIcon.onclick=function(){
        deleteTodoItem(listItem,todoId);
    };


    console.log(todoList);
}

let c = 0;
function addListItem(value){
    c++;
     let newTodo = {
        text : value,
        counter : c,
        isChecked : false
     }
     
     todoList.push(newTodo);

     createListItem(newTodo);
}


addButton.onclick = function(){
    if(input.value === ""){
        alert("Please enter a task..")
    }else{
        addListItem(input.value);
        input.value="";
    }
};





