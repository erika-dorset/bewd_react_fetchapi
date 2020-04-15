import React from 'react';

//define the radio button component
class SortRadioButton extends React.Component {
    render() {
        return (
            <div className="field">
                <label className="label">Sort alphabetically by name?</label>
                <div className="control">
                    <label className="radio">
                        <input type="radio" name="sort" value="yes" checked={this.props.checked === 'yes'} onChange={this.props.handleChange} />
                        yes
                   </label>
                    <label className="radio">
                        <input type="radio" name="sort" value="no" checked={this.props.checked === 'no'} onChange={this.props.handleChange} />
                        no
                    </label>
                </div>
            </div>
        )
    }
}

export default SortRadioButton;