const tableBody = document.getElementById("tableBody")

function ClearTable() {
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => row.remove());
}

async function getP() {
    try {
        const response = await fetch('http://localhost:3000/games');
        if (response.ok) {
            const data = await response.json(); 

            data.forEach(element => {

                tableRow = document.createElement("tr")
                tableBody.appendChild(tableRow)

                td1 = document.createElement("td")
                td1.textcontent = element.id
                let gn = document.createTextNode(td1.textcontent)
                tableRow.appendChild(td1)
                td1.appendChild(gn)

                td2 = document.createElement("td")
                td2.textcontent = element.title
                let cn = document.createTextNode(td2.textcontent)
                tableRow.appendChild(td2)
                td2.appendChild(cn)


                td3 = document.createElement("td")
                td3.textcontent = element.sold
                let rd = document.createTextNode(td3.textcontent)
                tableRow.appendChild(td3)
                td3.appendChild(rd)

                td4 = document.createElement("button")
                td4.textcontent = "Delete"
                let x = document.createTextNode(td4.textcontent)
                tableRow.appendChild(td4)
                td4.appendChild(x)

                td4.addEventListener("click", (event) => {
                    console.log("meow")
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
getP()
const submitFormButton = document.getElementById("formSubmit")
submitFormButton.addEventListener("click", (event) => {
    event.preventDefault()
    
    let Title = document.getElementById("gameNameInput").value
    let Sold = document.getElementById("copiesSoldInput").value

    info = {
        ["title"]: Title,
        ["sold"]: Sold

    }
    fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        //turns a table into json
        body: JSON.stringify(info)
    })
    ClearTable()
    getP()
})