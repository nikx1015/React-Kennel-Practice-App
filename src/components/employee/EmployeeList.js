import React, {Component} from 'react';
import "./Employee.css"
import dog from "./DogFace.png"
import { Link } from "react-router-dom";

class EmployeeList extends Component {
    render() {
        return (
            <section className="employees">
            {
                this.props.employees.map(employee =>
                    <div key={employee.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                            <img src={dog} className="empicon--dog" />
                                {employee.name}
                                <Link className="nav-link" to={`/employees/${employee.id}`}>Details</Link>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
            // <section>
            //     <h1>Employee List</h1>
            //     {this.props.employees.map((singleEmployee)=> {
            //         return <div key={singleEmployee.id}>{singleEmployee.name}
            //         <a href="#"
            //                         onClick={() => this.props.deleteEmployee(employee.id)}
            //                         className="card-link">Delete</a>
            //     })}
            //     </div>
            // </section>
        );
    }
}

export default EmployeeList;