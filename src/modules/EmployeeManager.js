const employeeAPIManager = {
    getAll: () => {
        return fetch("http://localhost:5002/employees")
        .then(employees => employees.json())
    }
}

export default employeeAPIManager;