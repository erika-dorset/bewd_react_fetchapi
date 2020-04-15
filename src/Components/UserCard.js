import React from 'react';
//PropTypes defines type and which props are required
import PropTypes from 'prop-types';

// define one single UserCard component
class UserCard extends React.Component {
    render() {
        return (
            <div className="column is-2" style={{ padding: "20px" }}>
                <div className="card" style={{ borderRadius: "20px" }}>
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img alt='Profile' src={this.props.image}></img>
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <span className="has-text-grey-light">{this.props.gender}</span>
                                <p className="title is-4 has-text-primary" style={{ fontFamily: 'Oswald, sans-serif' }}>{this.props.name.charAt(0).toUpperCase() + this.props.name.substring(1)}</p>
                                <p className="subtitle is-size-6">{this.props.location}</p>
                                <p className="subtitle">{this.props.phone}</p>
                                <hr />
                                <span className="has-text-grey-light">Nationality</span>
                                {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// specify the default values for props
UserCard.defaultProps = {
    name: 'randomuser',
    image: 'http://via.placeholder.com/400x400',
    gender: '',
    phone: '',
    nat: '',
    location: ''
};

// Check the correct type of props are supplied
UserCard.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    gender: PropTypes.string,
    nat: PropTypes.string,
    location: PropTypes.string
};

export default UserCard;