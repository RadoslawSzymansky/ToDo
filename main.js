const BTN_ADD = document.querySelector(".btnAdd");
const BTN_SEARCH = document.querySelector(".btnSearch");
const BTN_CLEAR = document.querySelector(".btnClear");
const UL = document.querySelector(".list");
const FORM = document.querySelector(".toDoForm");
const INPUT = document.querySelector(".toDoInput");
// toggler for searching
let searchToggler = false;
// Array with tasks
const list = ["zrób zakupy", "umyj gary", "wynieś śmieci", "czas na granie"];
// first showing the list from array list
updateList();
//
// function for updating showed list
function updateList(array = list) {
    // cleating html of UL
    UL.innerHTML = "";
    // creating new array for the worktime and creating <li with buttons, giving them data-key
    let currentArray = [...array];
    currentArray.forEach((e, index) => {
        e = e.charAt(0).toUpperCase() + e.slice(1);
        UL.innerHTML += `<li>${index +
            1}. ${e}<button data-key="${index}">Usuń</button></li>`;
    });
    // adding listener for buttons in Li
    const BTNS_REMOVE = UL.querySelectorAll("[data-key]");
    BTNS_REMOVE.forEach(e => {
        e.addEventListener("click", removeTask);
    });
}
// function for pushing new task to array list
const addToList = e => {
    e.preventDefault();
    let task = INPUT.value;
    if (!task || task.length < 5 || task.length > 40) {
        INPUT.value = "";
        return alert(
            "Zadanie musi sie skladac przynajmiej z 5 liter, i być nie dluzsze niz 40 liter"
        );
    }
    list.push(task);
    updateList();
    INPUT.value = "";
};
// function for removing task from Array list
function removeTask(e) {
    console.log(list);
    let index = e.target.dataset.key;
    list.splice(index, 1);
    console.log(list);
    updateList();
}
// function for clearing Array list
const clearList = e => {
    e.preventDefault();
    list.length = 0;
    updateList();
};
// function which is turned on while searching
function filterList(e) {
    console.log("szukam");
    e.preventDefault();
    if (INPUT.value > 0) return;
    let txt = INPUT.value.toLowerCase();
    let current = list
        .map(e => (e = e.toLowerCase()))
        .filter(e => e.includes(txt));
    return updateList(current);
}
// function for starting searching on list
function startFilterList(e) {
    e.preventDefault();
    if (!searchToggler) {
        INPUT.value = "";
        searchToggler = !searchToggler;
        BTN_SEARCH.textContent = "Zakończ szukanie";
        return INPUT.addEventListener("input", filterList);
    } else {
        INPUT.removeEventListener("input", filterList, false);
        BTN_SEARCH.textContent = "Zacznij szukanie";
        updateList();
        return (searchToggler = !searchToggler);
    }
}
// events
INPUT.addEventListener("submit", e => {
    e.preventDefault();
});
BTN_ADD.addEventListener("click", addToList);
BTN_CLEAR.addEventListener("click", clearList);
BTN_SEARCH.addEventListener("click", startFilterList);
