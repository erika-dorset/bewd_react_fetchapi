import React from 'react';
//import one User Card component
import UserCard from './Components/UserCard';
//import filter components
import InputLabels from './Components/InputLabels';
import RadioBtn from './Components/RadioBtn';
import DropDown from './Components/DropDown';
import Toggle from './Components/Toggle';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';

//Define the UserList component
class UserList extends React.Component {
    constructor() {
        super();
        //set the state keys and values
        this.state = {
            users: [],
            genderSelect: 'all',
            natSelect: 'all',
            natValues: [],
            sort: 'no',
            searchInput: '',
            contrastMode: false
        };
        //bind the "this" keyword to use for event
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        //get the users from the API and store their values in the state
        //you can change the API's URL result value to display more users
        axios.get('https://randomuser.me/api/?results=45')
            .then(response => {
                //map through the users data results in the API
                const users = response.data.results.map(user => {
                    return {
                        //return the API values and set to the state values
                        name: user.name.first,
                        image: user.picture.large,
                        gender: user.gender,
                        nationality: user.nat,
                        location: user.location.timezone.description,
                        phone: user.phone,
                    };
                });
                //change the state of the users
                this.setState({ users: users });

                // sort and remove duplicate nationalities
                // store the result in state to be used for the dropdown menu options
                const nat = users.map(user => {
                    return user.nationality;
                });
                const deduped = [...new Set(nat)];
                deduped.sort();
                this.setState({ natValues: deduped });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(event) {
        //handle <select> UI elements
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleClick(event) {
        // handle the toggle <button>
        const name = event.target.name;
        this.setState(prevState => ({
            [name]: !prevState[name]
        }));
    }

    render() {
        // if results are to be sorted, create a copy of the user data and sort it,
        // otherwise just use the original data from the state
        const data = this.state.sort === 'no' ? this.state.users : [].concat(this.state.users)
            .sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        /*
        generate a list of users for each unique user card
        each of the user cards needs a unique key
        check the input state and skip the cards not matching the required nationality/gender/search text 
        */
        let userList = data.map(user => {
            const genderMatch = (this.state.genderSelect === user.gender || this.state.genderSelect === 'all');
            const natMatch = (this.state.natSelect === user.nationality || this.state.natSelect === 'all');
            const nameMatch = user.name.startsWith(this.state.searchInput);
            return (genderMatch && natMatch && nameMatch) ? (
                <UserCard name={user.name} image={user.image} nat={user.nationality} key={user.name + user.image} gender={user.gender} location={user.location} phone={user.phone}/>
            ) : null;
        });
//console.log(userList);
        return (
            //add a containing element for all nested elements
            <div>
                <section className="is-fluid">
                    <nav className="navbar has-background-primary">
                        <h1 className="navbar-item title is-1 has-text-white" style={{fontFamily: 'Oswald, sans-serif'}}>List of Users</h1>
                    </nav>
                    <div className={this.state.contrastMode ? "columns has-background-black" : "columns"} style={{ borderRadius: 0, padding: "0px 40px" }}>
                        <hr />
                        {/*FILTER INPUTS*/}
                        <div className="column" style={{ padding: "50px" }}>
                            <DropDown options={['all', 'male', 'female']} name="genderSelect" handleChange={this.handleChange} label="Filter by gender" selected={this.state.genderSelect} />
                            <DropDown options={['all'].concat(this.state.natValues)} name="natSelect" handleChange={this.handleChange} label="Filter by nationality" selected={this.state.natSelect} />
                            <RadioBtn handleChange={this.handleChange} checked={this.state.sort} />
                            <InputLabels name="searchInput" label="Search by name" value={this.state.searchInput} handleChange={this.handleChange} placeholder={"e.g. Stewart"} />
                            <Toggle name="contrastMode" handleClick={this.handleClick} toggle={this.state.contrastMode} labelOn="Switch to White mode" labelOff="Switch to Black mode" />
                        </div>
                        {/*USER LIST*/}
                        <div className="column is-four-fifths">
                            <div className="columns is-multiline" style={{ paddingBottom: "50px", paddingTop: "50px" }}>
                                {/*Draw the userList defined in the render method above*/}
                                {userList}
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="footer has-background-primary">
                    <div className="content has-text-centered">
                        <p className="has-text-white-bis"><strong>Random User API</strong> styled with Bulma.</p>
                    </div>
                </footer>
            </div>
        );
    }
}

export default UserList;