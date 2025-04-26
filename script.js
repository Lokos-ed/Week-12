async function getP() {
    try {
        const response = await fetch('http://localhost:3000/games');
        if (response.ok) {
            const data = await response.json(); 

            data.forEach(element => {
                id = data["id"]
                title = data["title"]
                sold = data["sold"]

                console.log(element.id)
                console.log(element.title)
                console.log(element.sold)
            });


        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error:', error); 
    }
}
getP()