import React from 'react';
import ReactDOM from 'react-dom';
// import the list of users
import UserList from './UserList'
// import stylesheet 
//MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// draw the UserList component
ReactDOM.render(
    <UserList />,
    document.getElementById('root')
);