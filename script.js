
window.onload = () => {
  document.body.style.opacity = 1;
  setup(1)
 };

let sortParams = {amount: 20}
let sortObj = [];


let switchState = {state: "stop"};

let options = [selectionSort, mergeSort, quickSort, heapSort];
let optionNames = ["Selection Sort", "Merge Sort", "Quick Sort", "Heap Sort"];

let currentSort = 1;

function setup(sorting){
  currentSort = sorting;

  sortObj = [];
  initSort();
  options[sorting](sortObj, switchState);
}

function dropDownChoice(sort){

  currentSort = sort;
  document.getElementById("dropdownDisplay").innerText = optionNames[currentSort];
  hideDropDown(true)
  restartButton();

}

function hideDropDown(priority=false){
  document.getElementById("myDropdown").classList.toggle("show");
}

function playButton(){

  if(switchState.state == "stop"){
    switchState.state = "play";
    document.getElementById("playButton").innerText = "Stop";
  }
  else if(switchState.state == "play"){
    switchState.state = "stop";
    document.getElementById("playButton").innerText = "Start";
  }
}

async function restartButton(){
  switchState.state = "kill";
  sleep(50);
  document.getElementById("sortingBox").innerHTML = '';
  document.getElementById("playButton").innerText = "Start";
  switchState.state = "stop";
  setup(currentSort);
}



async function initSort(){

  let sortingBox = document.getElementById("sortingBox");

  let elements = [];

  for(var i = 1; i <= sortParams.amount; i++){
    elements.push(i);
  }

  for(var i = 0; i < sortParams.amount * 100; i++){
    let i1 = Math.floor(Math.random() * sortParams.amount);
    let i2 = Math.floor(Math.random() * sortParams.amount);
    [elements[i1], elements[i2]] = [elements[i2], elements[i1]];
  }

  for(var i = 0; i < sortParams.amount; i++){

    let sortSquare = document.createElement("div");
    sortSquare.style.width = 100 / sortParams.amount + "%";
    sortSquare.style.height = elements[i] * 100 / sortParams.amount + "%";
    sortSquare.classList.add("sortSquare");
    sortSquare.style.left = i * (100 / sortParams.amount) + "%";
    sortSquare.style.opacity = 0;

    sortObj.push({element: sortSquare, value: elements[i]});

    sortingBox.appendChild(sortSquare);
  }

  console.log(sortObj.length);

  for(var i = 0; i < sortObj.length; i++){
    console.log("yaa");
    sortObj[i].element.style.opacity = 1;
  }

}

async function selectionSort(array, switchState){

  for(var i = 0; i < array.length-1; i++){

    let minIndex = i;
    //array[minIndex].element.classList.add("sortSquareCol1");
    array[i].element.classList.add("sortSquareCol3");

    for(var j = i+1; j < array.length; j++){

      console.log("iter");

      let ele = array[j].element;
      ele.classList.add("sortSquareCol2");

      if(array[j].value < array[minIndex].value){
        array[minIndex].element.classList.remove("sortSquareCol1");
        array[j].element.classList.add("sortSquareCol1");
        minIndex = j;
      }

      await sleep(300);
      if(checkKill()) return;

      array[j].element.classList.remove("sortSquareCol2");

    }

    [array[i], array[minIndex]] = [array[minIndex], array[i]];
    array[i].element.style.left = i * (100 / sortParams.amount) + "%";
    array[minIndex].element.style.left = minIndex * (100 / sortParams.amount) + "%";
    array[i].element.style.zIndex = "1";
    array[minIndex].element.style.zIndex = "1";

    await sleep(300);
    if(checkKill()) return;

    array[i].element.style.zIndex = "";
    array[minIndex].element.style.zIndex = "";

    array[minIndex].element.classList.remove("sortSquareCol3");
    array[i].element.classList.remove("sortSquareCol1");

  }

}

async function merge(array, switchState, l, m, r)
{
  var n1 = m - l + 1;
  var n2 = r - m;

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++)
      L[i] = array[l + i];
  for (var j = 0; j < n2; j++)
      R[j] = array[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var i = 0;

  L[i].element.classList.add("sortSquareCol3");

  // Initial index of second subarray
  var j = 0;

  R[j].element.classList.add("sortSquareCol2");

  // Initial index of merged subarray
  var k = l;

  while (i < n1 && j < n2) {

      if (L[i].value <= R[j].value) {

          console.log(L[i]);

          L[i].element.classList.remove("sortSquareCol3");
          array[k] = L[i];
          i++;
          if(i < n1) L[i].element.classList.add("sortSquareCol3");

      }
      else {

          console.log(R[j]);

          R[j].element.classList.remove("sortSquareCol2");
          array[k] = R[j];
          j++;
          if(j < n2) R[j].element.classList.add("sortSquareCol2");

      }
      k++;

      await sleep(300);
      if(checkKill()) return;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
      array[k] = L[i];
      i++;
      k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
      array[k] = R[j];
      j++;
      k++;
  }

  for(var i = l; i <= r; i++){

    array[i].element.style.left = i * (100 / sortParams.amount) + "%";
    array[i].element.classList.remove("sortSquareCol2");
    array[i].element.classList.remove("sortSquareCol3");
    array[i].element.classList.add("sortSquareCol1");

  }

  await sleep(300);
  if(checkKill()) return;

  for(var i = l; i <= r; i++){
    array[i].element.classList.remove("sortSquareCol1");
  }

}

async function mergeSort(array, switchState, l=-1, r=-1){

    if(l == -1) l = 0;
    if(r == -1) r = array.length-1;

    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    await mergeSort(array, switchState, l,m);
    if(checkKill()) return;
    await mergeSort(array, switchState, m+1,r);
    if(checkKill()) return;
    await merge(array, switchState, l,m,r);
    if(checkKill()) return;
}


async function partition(array, switchState, low, high) {

    let pivot = array[high].value;
    let i = low - 1;

    console.log(low, high, array);

    array[high].element.classList.add("sortSquareCol1");
    array[i+1].element.classList.add("sortSquareCol3");

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot

        array[j].element.classList.add("sortSquareCol2");

        await sleep(300);
        if(checkKill()) return;

        if (array[j].value < pivot) {
            // Increment index of smaller element
            i++;
            // Swap elements

            [array[i], array[j]] = [array[j], array[i]];
            array[i].element.style.left = i * (100 / sortParams.amount) + "%";
            array[j].element.style.left = j * (100 / sortParams.amount) + "%";
            array[i].element.style.zIndex = "1";
            array[j].element.style.zIndex = "1";

            if(i != j) await sleep(300);
            if(checkKill()) return;

            array[i].element.style.zIndex = "";
            array[j].element.style.zIndex = "";

            array[j].element.classList.remove("sortSquareCol3");
            array[i].element.classList.remove("sortSquareCol2");

            array[i+1].element.classList.add("sortSquareCol3");
            console.log(array[i+1]);
        }

        array[j].element.classList.remove("sortSquareCol2");
    }
    [array[i+1], array[high]] = [array[high], array[i+1]];
    array[i+1].element.style.left = (i+1) * (100 / sortParams.amount) + "%";
    array[high].element.style.left = high * (100 / sortParams.amount) + "%";
    array[i+1].element.style.zIndex = "1";
    array[high].element.style.zIndex = "1";
    await sleep(300);
    if(checkKill()) return;
    array[i+1].element.style.zIndex = "";
    array[high].element.style.zIndex = "";

    array[i+1].element.classList.remove("sortSquareCol1");
    array[high].element.classList.remove("sortSquareCol3");

    if(i+1 == high) console.log("BRUH");

    console.log("RET", i+1);

    return i + 1; // Return the partition index

}

async function quickSort(array, switchState, low=0, high=-1) {

  if(high == -1) high = array.length-1;

  if (low >= high) return;
  let pi = await partition(array, switchState, low, high);
  if(checkKill()) return;

  await quickSort(array, switchState, low, pi - 1);
  if(checkKill()) return;
  await quickSort(array, switchState, pi + 1, high);
  if(checkKill()) return;

  console.log("yes");

}

async function heapSort(array, switchState)
{
    var N = array.length;

    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
        await heapify(array, switchState, N, i);
        if(checkKill()) return;

    for (var i = N - 1; i > 0; i--) {

        [array[0], array[i]] = [array[i], array[0]];
        array[0].element.style.left = 0
        array[i].element.style.left = i * (100 / sortParams.amount) + "%";
        array[0].element.style.zIndex = "1";
        array[i].element.style.zIndex = "1";

        await sleep(300);
        if(checkKill()) return;

        array[0].element.style.zIndex = "";
        array[i].element.style.zIndex = "";


        await heapify(array, switchState, i, 0);
        if(checkKill()) return;

    }
}

function checkKill(){

  return switchState.state == "kill";

}

async function heapify(array, switchState, N, i)
{
    var largest = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;

    array[i].element.classList.add("sortSquareCol3");

    array[largest].element.classList.add("sortSquareCol1");

    if(l < N) array[l].element.classList.add("sortSquareCol2");

    await sleep(300);
    if(checkKill()) return;

    if (l < N && array[l].value > array[largest].value){
        array[largest].element.classList.remove("sortSquareCol1");
        array[l].element.classList.remove("sortSquareCol2");
        largest = l;
        array[largest].element.classList.add("sortSquareCol1");
    }

    if(r < N) array[r].element.classList.add("sortSquareCol2");

    await sleep(300);
    if(checkKill()) return;

    if (r < N && array[r].value > array[largest].value){

        array[largest].element.classList.remove("sortSquareCol1");
        array[r].element.classList.remove("sortSquareCol2");
        largest = r;
        array[largest].element.classList.add("sortSquareCol1");

      }

    if (largest != i) {

        [array[i], array[largest]] = [array[largest], array[i]];
        array[i].element.style.left = (i) * (100 / sortParams.amount) + "%";
        array[largest].element.style.left = largest * (100 / sortParams.amount) + "%";
        array[i].element.style.zIndex = "1";
        array[largest].element.style.zIndex = "1";
        await sleep(300);
        if(checkKill()) return;
        array[i].element.style.zIndex = "";
        array[largest].element.style.zIndex = "";

        array[i].element.classList.remove("sortSquareCol1");
        array[largest].element.classList.remove("sortSquareCol3");

        await heapify(array, switchState, N, largest);
        if(checkKill()) return;

    }
    else{
      array[i].element.classList.remove("sortSquareCol1")
      array[i].element.classList.remove("sortSquareCol3");
    }
}

async function sleep(n){



  let t = new Date().getTime();

  while(new Date().getTime() - t < n || switchState.state == "stop"){

    await true_sleep(5)

    if(checkKill()) return;
  }


}

function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function true_sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
