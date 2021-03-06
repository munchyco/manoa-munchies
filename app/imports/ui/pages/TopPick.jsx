import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Foods } from '/imports/api/food/food';
import { Users } from '/imports/api/user/user';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import '/client/style.css';
import 'semantic-ui-css/semantic.min.css';
import { filter } from 'underscore';
import Food from '../components/Food';


const textStyle = {
  fontSize: '40px',
  fontFamily: 'Quicksand',
};


/** Renders a table containing all of the Food documents. */
class TopPick extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready && this.props.ready2) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="toppicks-format" style={{ border: 'none' }}>
          <Container>
            <Header as="h2" textAlign="center" style={textStyle} inverted>
              Top Picks Based On Your Preferences!
            </Header>
            <Card.Group style={{ border: 'none' }}>
              {this.props.foods.map((food, index) => <Food key={index}
                                                           food={food}/>)}
            </Card.Group>
          </Container>
        </div>
    );
  }
}

function shuffleArray(inputArray) {
  for (let i = inputArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
  }
  return inputArray;
}


/** Require an array of Food documents in the props. */
TopPick.propTypes = {
  foods: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  ready2: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('AllFoods');
  const foodsArray = Foods.find({}).fetch();
  const subscription2 = Meteor.subscribe('Users');
  const userProfile = Users.findOne();
  console.log(Users.findOne());
  return {
    /** filters based on User preferences and shuffles */
    foods: shuffleArray(filter(foodsArray, function (food) {
      if (((food.vegan === userProfile.vegan) || (userProfile.vegan === false)) &&
          ((food.glutenFree === userProfile.glutenFree) || (userProfile.glutenFree === false)) &&
          (food.location === userProfile.location) &&
          (food.foodTypeOne === userProfile.foodTypeOne || food.foodTypeTwo === userProfile.foodTypeOne ||
              food.foodTypeThree === userProfile.foodTypeOne || food.foodTypeOne === userProfile.foodTypeTwo ||
              food.foodTypeTwo === userProfile.foodTypeTwo || food.foodTypeThree === userProfile.foodTypeTwo ||
              food.foodTypeOne === userProfile.foodTypeThree || food.foodTypeTwo === userProfile.foodTypeThree ||
              food.foodTypeThree === userProfile.foodTypeThree) &&
          ((userProfile.restaurantPrice1 === true && food.foodPrice === '$') ||
              (userProfile.restaurantPrice2 === true && food.foodPrice === '$$') ||
              (userProfile.restaurantPrice3 === true && food.foodPrice === '$$$')) &&
          ((userProfile.ToGo === true && food.foodType === 'to go') ||
              (userProfile.FoodTruck === true && food.foodType === 'food truck') ||
              (userProfile.MadeToOrder === true && food.foodType === 'made to order') ||
              (userProfile.Buffet === true && food.foodType === 'buffet'))) {
        return true;
      }
      return false;
    })).slice(0, 6),
    ready: subscription.ready(),
    ready2: subscription2.ready(),
  };
})(TopPick);
