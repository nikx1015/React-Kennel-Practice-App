const employeeAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/employees")
        .then(employees => employees.json())
    },
    deleteEmployee: id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
          method: "DELETE"
        })
          .then(() => fetch(`http://localhost:5002/employees`))
          .then(e => e.json());
      },
      postEmployee(newEmployee) {
        return fetch("http://localhost:5002/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newEmployee)
        }).then(data => data.json())
      }
}

export default employeeAPIManager;