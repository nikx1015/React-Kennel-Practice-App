const animalAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/animals")
        .then(animals => animals.json())
    },
    postAnimal(newAnimal) {
        return fetch("http://localhost:5002/animals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newAnimal)
        }).then(data => data.json())
      },

}

export default animalAPIManager;