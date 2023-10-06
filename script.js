/* function to fetch the data for the current date from the NASA API and display it in the UI. This function runs when the page loads. */

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    // console.log(currentDate)
    const apiKey = "2xri9JEqN7WcdncjB3JcaG4yvQ5PVSXEazqZ2Sg3";

    // Now to fetch image of the day from nasa
    fetch(`https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=${apiKey}`).then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        renderCurrentData(data);
        showHistory();
    }).catch((error) => {
        console.log(error)
    })
}
getCurrentImageOfTheDay();


// Function to render data on the screen
function renderCurrentData(data) {
    const currentImageContainer = document.getElementById("current-image-container");

    currentImageContainer.innerHTML = "";
    currentImageContainer.innerHTML = `<h1>NASA Picture of the Day</h1>
    <img src="${data.url}" alt="">
    <p class="title">${data.title}</p>
    <p class="description">${data.explanation}</p>`
}

// Function to fetch data of image of the day on specified date
function getImageOfTheDay(enteredDate) {
    const apiKey = "2xri9JEqN7WcdncjB3JcaG4yvQ5PVSXEazqZ2Sg3";

    // Now to fetch image of the day from nasa
    fetch(`https://api.nasa.gov/planetary/apod?date=${enteredDate}&api_key=${apiKey}`).then((response) => {
        return response.json();
    }).then((data) => {
        // console.log(data);
        renderData(data);
        saveSearch(enteredDate);
        addSearchToHistory(enteredDate)
    }).catch((error) => {
        console.log(error)
    })
}

// Function to render data on specific date
function renderData(data) {
    const currentImageContainer = document.getElementById("current-image-container");

    currentImageContainer.innerHTML = "";
    currentImageContainer.innerHTML = `<h1>Picture on ${data.date}</h1>
    <img src="${data.url}" alt="">
    <p class="title">${data.title}</p>
    <p class="description">${data.explanation}</p>`
}


// Function to save search date in localStorage
function saveSearch(enteredDate) {
    const searchData = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchData.push(enteredDate);
    localStorage.setItem("searchHistory", JSON.stringify(searchData));
}

// Function to show history from localStorage
function showHistory() {
    const history = JSON.parse(localStorage.getItem("searchHistory"));
    const searchHistoryContainer = document.getElementById("search-history");
    if (history) {
        history.forEach((item) => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.innerHTML = item;

            li.appendChild(a);
            searchHistoryContainer.appendChild(li);

            a.addEventListener("click", () => {
                getImageOfTheDay(item);
            })
        })
    }
}

// Function to add search history in unordered list
function addSearchToHistory(enteredDate) {
    const searchHistoryContainer = document.getElementById("search-history");

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerHTML = enteredDate;

    li.appendChild(a);
    searchHistoryContainer.appendChild(li);

    a.addEventListener("click", () => {
        getImageOfTheDay(enteredDate);
    })
}

// Event listener for form submission
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    // console.log(searchInput.value)
    const searchValue = searchInput.value;
    getImageOfTheDay(searchValue);
});
