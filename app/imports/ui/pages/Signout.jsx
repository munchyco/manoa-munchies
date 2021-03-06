import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
        <div className="signout-format">
          <Header as="h1" textAlign="center" inverted>
            <p className="consistent-font">You are signed out.</p>
          </Header>
        </div>
    );
  }
}
