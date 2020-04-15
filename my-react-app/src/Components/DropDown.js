import React from 'react';

//define the dropdown component
class DropDown extends React.Component {
    //define your logic within the render method
    render() {
        //map through the list of options received frop the API
        const options = this.props.options.map(item => {
            return <option key={item} value={item}>{item}</option>;
        });
        return (
            <div className="field">
                <label className="label">{this.props.label}</label>
                <div className="control">
                    <div className="select is-fullwidth">
                        <select value={this.props.selected} name={this.props.name} onChange={this.props.handleChange}>
                            {options}
                        </select>
                    </div>
                </div>
            </div>

        );
    }
}

export default DropDown;