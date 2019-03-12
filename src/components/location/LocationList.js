import React, {Component} from 'react';

class LocationList extends Component {
    render() {
        return (
            <div>
                <h2>Location List</h2>
                {this.props.locations.map((singleLocation)=> {
                    return <p key={singleLocation.id}>{singleLocation.name} {singleLocation.address}</p>
                })}
                </div>
        )
    }
}

export default LocationList;