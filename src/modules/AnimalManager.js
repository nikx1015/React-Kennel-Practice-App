const animalAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/animals")
        .then(animals => animals.json())
    },

    get: (id) =>
    fetch(`http://localhost:5002/animals/${id}`).then(animal => animal.json()),

    deleteAnimal: id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
          method: "DELETE"
        })
          .then(() => fetch(`http://localhost:5002/animals`))
          .then(e => e.json());
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
      put(editedAnimal) {
        return fetch(`http://localhost:5002/animals/${editedAnimal.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedAnimal)
        }).then(data => data.json());
      }

}

export default animalAPIManager;