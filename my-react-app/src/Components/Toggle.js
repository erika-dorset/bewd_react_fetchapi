import React from 'react';

//define the Toggle button component for light and dark modes
class ToggleButton extends React.Component {
    render() {
        return (
            <div className="field">
                <div className="field-label">
                    <div className="control">
                        {/*on button click set the attribute values for labelOn or labelOff depending on the button's true/false values*/}
                        <button className="button is-primary" name={this.props.name} onClick={this.props.handleClick}>{this.props.toggle ? this.props.labelOn : this.props.labelOff}</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default ToggleButton;