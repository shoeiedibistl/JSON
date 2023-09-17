let myRequestURL = "https://reqres.in/api/users";
let request = new XMLHttpRequest();
let moreBtn = document.querySelector(".more");
let myArray

function  getDataJSON(requestURL, startId) {
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {

    let persons = request.response;

    if (typeof(JSON.stringify(persons)) != "string") {

        return 

    } else {

    myArray = [];

    for (let i = 0; i < persons.data.length; i++) {
        myArray.push([persons.data[i].first_name, persons.data[i].id, persons.data[i].email, persons.data[i].last_name, persons.data[i].avatar]);
    }

    myArray.sort();

    for (let i = 0; i < persons.data.length; i++) {
        addPerson(i, startId)
    }
}
};

function addPerson (id, startId) {
    const personAvatar = document.querySelector(`.person${id + startId} .person__avatar img`);
    const personFirstName = document.querySelector(`.person${id + startId} .first-name`);
    const personLastName = document.querySelector(`.person${id + startId} .last-name`);
    const personEmail = document.querySelector(`.person${id + startId} .person__email`);

    personAvatar.setAttribute("src", myArray[id][4])
    personFirstName.innerHTML = myArray[id][0];
    personLastName.innerHTML = myArray[id][3];
    personEmail.setAttribute("href", `mailto:${myArray[id][2]}`);
    personEmail.innerHTML = myArray[id][2];
}
}

 getDataJSON (myRequestURL, 0);

moreBtn.addEventListener("click", () => {

    let num = 6;
    let parent = document.querySelector('.person-cards');
    let elem = parent.querySelector('.person');

    while (num < 12) {
        let clone = elem.cloneNode(true);

        parent.appendChild(clone);
        clone.classList.remove ("person0");
        clone.classList.add ("person" + num);

        num += 1

        myRequestURL = "https://reqres.in/api/users?page=2";
         getDataJSON (myRequestURL, 6);
    }

    moreBtn.style.display = "none";
})