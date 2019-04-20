import { Header, Grid, Form, Dropdown } from 'semantic-ui-react';
import React from 'react';


export default class FoodTags extends React.Component {
  render() {
    return this.renderPage();
  }

  renderPage() {
    return (
        <div className="center-padding">
          <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center" inverted>Edit Favorite Food Types</Header>
              <Form.Group>
                <Form.Field>
                  <label>Favorite Food Type 1</label>
                  <Form.Input
                      readOnly
                      value={this.props.FT1}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Favorite Food Type 2</label>
                  <Form.Input
                      readOnly
                      value={this.props.FT2}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Favorite Food Type 3</label>
                  <Form.Input
                      readOnly
                      value={this.props.FT3}
                  />
                </Form.Field>
              </Form.Group>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}