const tableBody = document.getElementById("tableBody")

//Above gets tableBody element from html as a constant variable.
//Below creates a function that removes all of the <tr> elements from the html.

function ClearTable() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => row.remove());
}

//creates an asynchronus function
async function getP() {
    try {
        //This tries to await for a response from the fetch command trying to get a response from the database
        //A "try" block produces an issue then the code won't crash as a result of said issue
        //If it can't get the needed response, it'll catch and then print the error
        const response = await fetch('http://localhost:3000/games');
        if (response.ok) {
            //This creates a constant variable that asks the server for the data and won't run any further code until it receives said data.
            const data = await response.json(); 

            //This is a for loop that runs the below code for each entry of the database.
            data.forEach(element => {

                //This creates a variable storing a <tr> html element
                tableRow = document.createElement("tr")
                //This appends the element stored in the tableRow variable to the <tbody> element
                tableBody.appendChild(tableRow)

                //This functionally does the same as the above code except it stores the text content of the database element called "id". It also creates a <td> instead of a <tr> element
                td1 = document.createElement("td")
                td1.textContent = element.id
                tableRow.appendChild(td1)

                td2 = document.createElement("td")
                td2.textContent = element.title
                tableRow.appendChild(td2)


                td3 = document.createElement("td")
                td3.textContent = element.sold
                tableRow.appendChild(td3)

                //This creates a button with the text content of "delete" and appends it to the table row.
                td4 = document.createElement("button")
                td4.textContent = "Delete"
                tableRow.appendChild(td4)

                //This waits for the button assigned to the td4 variable to be clicked.
                //Afterwards it fetches the id of the element the delete button was assigned to.
                //Then it deletes the entry from the database, clears the table, and reloads the database entries onto the table.
                td4.addEventListener("click", (event) => {
                    fetch(`http://localhost:3000/games/${element.id}`, {
                        method: 'DELETE'
                    })
                    ClearTable()

                    getP()
                })

            });


        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}
//this runs the getP() function
getP()
//this creates a constant variable with the html element id for the submit form button
const submitFormButton = document.getElementById("formSubmit")
//this waits for the submit form button to be clicked
submitFormButton.addEventListener("click", (event) => {
    //this prevents the page from refreshing when clicked
    event.preventDefault()
    
    //this creates let variables with the values of the form input boxes
    let Title = document.getElementById("gameNameInput").value
    let Sold = document.getElementById("copiesSoldInput").value

    //this sends the data stored in the variables declared above to the database.
    info = {
        ["title"]: Title,
        ["sold"]: Sold

    }
    //fetches the server, post sends the data to the server.
    fetch('http://localhost:3000/games', {
        method: 'POST',
        //
        headers: {
            //this tells the server that it is being sent json
            'Content-Type': 'application/json'
        },
        //turns a table into json
        body: JSON.stringify(info)
    })
    //this clears the table
    ClearTable()
    //this loads the database and displays it on the table
    getP()
})