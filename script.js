import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase , ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appConfig = {
  databaseURL: "https://playground-27abb-default-rtdb.firebaseio.com/",
}

const app = initializeApp(appConfig);
const database = getDatabase(app);
const creamsInDb = ref(database,"creams");
const boughtItems = ref(database, "bought");

const shoppingListEl = document.querySelector(".shopping-list");
const boughtItemsEl = document.querySelector(".bought")
const input = document.querySelector('#input');

const submitBtn = document.querySelector('#submit');

onValue(creamsInDb, function(snapshot){

  if (snapshot.exists()) {
   let datas = Object.entries(snapshot.val());
    
      shoppingListEl.innerHTML = "";
      
  for (let i = 0; i < datas.length; i++) {

    let currentItem = datas[i];
    addToList(currentItem)
  
  }
      
  } else {
    shoppingListEl.innerHTML ="No item added yet";
  }
  
  
})

onValue(boughtItems, function(snapshot) {
  if (snapshot.exists()) {
  let items = Object.values(snapshot.val());
  
  boughtItemsEl.innerHTML = "";
  
  
  for (let i = 0; i < items.length; i++) {
    let currentItem = items[i];
    
    
    addToBought(currentItem)
   
  }
  
  } else {
    boughtItemsEl.innerHTML = "Nothing bought yet..."
  }
  
  

  
})
submitBtn.addEventListener('click', () => {
  let inputValue = input.value;
  if (inputValue === '' || 0) {
    return;
  } else {
    
  push(creamsInDb,inputValue);
  }
 

  clearInput()

});



function addToList(value) {
  
  let currentItemId = value[0]
  let currentItemValue = value[1]
  let newEl = document.createElement("li");
  newEl.textContent = currentItemValue;
    
  shoppingListEl.append(newEl);
  
  
  newEl.addEventListener('dblclick', () =>{
    push(boughtItems,currentItemValue)
  let exactLocation = ref(database,`creams/${currentItemId}`);
  remove(exactLocation);
  
  })
  
  
  
  /*newEl.addEventListener('click',() =>{
    //console.log(currentItemValue);
 let bought = currentItemValue += "√";
  // push(creamsInDb, bought);
    newEl.style.textDecoration = 'line-through';
    
  })*/
  //console.log(currentItemId);

}
function addToBought(item) {
 let newEl = document.createElement("li");
  newEl.textContent = item;
    
  boughtItemsEl.append(newEl);
}
function clearInput() {
  input.value = '';
}