import React, {Component} from 'react';
import "./owners.css"
import dog from "./HuskyFace.png"
import { Link } from "react-router-dom";

class OwnerList extends Component {
    render() {
        return (
            <section className="owners">
            {
                this.props.owners.map(owner =>
                    <div key={owner.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">
                            <img src={dog} className="icon--dog" />
                                {owner.name}
                                <Link className="nav-link" to={`/owners/${owner.id}`}>Details</Link>
                            </h5>
                        </div>
                    </div>
                )
            }
            </section>
        )
    }
}

export default OwnerList
