import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, DeckSwiper, Title, Header, Icon, Button, View, Card, CardItem, Thumbnail, Text } from 'native-base';

import { openDrawer } from './actions/drawer';
import { replaceRoute, popRoute, pushNewRoute } from './actions/route';
import { setIndex } from './actions/list';
import { setCurrentDish } from './actions/search';

const dishes = [
  {
    name: 'Dish One',
    restaurant: "Antoine's",
    image: require('./img/food_one.png'),
    hearts: '12',
    upvotes: '43',
    downvotes: '9',
  },
  {
    name: 'Dish Two',
    restaurant: 'Lelio',
    image: require('./img/food_two.png'),
    hearts: '45',
    upvotes: '23',
    downvotes: '8',
  },
  {
    name: 'Dish Three',
    restaurant: 'Bistro',
    image: require('./img/food_three.png'),
    hearts: '32',
    upvotes: '100',
    downvotes: '67',
  },
];

class Tender extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceRoute: React.PropTypes.func,
    pushNewRoute: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setIndex: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dishes: [],
    };
  }

  // componentWillMount() {
  //   fetch('https://grubbr-api.herokuapp.com/v1/score/5')
  //     .then(response => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         dishes: responseJson,
  //         loading: false,
  //       });
  //     });
  // }

  replaceRoute(route) {
    this.props.replaceRoute(route);
  }

  pushNewRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushNewRoute(route);
  }

  popRoute() {
    this.props.popRoute();
  }

  // fetch() {
  //   this.setState({
  //     loading: true,
  //   });
  //
  //   return fetch('https://grubbr-api.herokuapp.com/v1/score/5')
  //     .then(response => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         dishes: responseJson,
  //       });
  //     });
  // }

  render() {
    console.log(this)
    return (
      <Container>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Grubbr</Title>

          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content>
          <View>
            <Title>Tender</Title>
            <DeckSwiper
              dataSource={dishes}
              renderItem={dish =>
                <Card
                  button
                  onPress={() => {
                    console.log('DISH', dish);
                    this.setCurrentDish(dish);
                    this.pushNewRoute('foodProfile');
                  }}
                >
                  <CardItem>
                    <Thumbnail size={80} source={{ uri: dish.image }} />
                    <Text>{dish.name}</Text>
                    <Text note>{dish.restaurant}</Text>
                  </CardItem>
                  <CardItem>
                    <Image size={80} source={{ uri: dish.image }} />
                  </CardItem>
                  <CardItem>
                    <Icon name="ios-thumbs-up" />
                    <Text>{dish.upvotes}</Text>
                    <Icon name="ios-thumbs-down" />
                    <Text>{dish.downvotes}</Text>
                  </CardItem>
                </Card>
              }
            />
          </View>
        </Content>

      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setIndex: index => dispatch(setIndex(index)),
    popRoute: () => dispatch(popRoute()),
    setCurrentDish: dish => dispatch(setCurrentDish(dish)),
  };
}

function mapStateToProps(state) {
  return {
    name: state.user.name,
    list: state.list.list,
    results: state.search,
  };
}

export default connect(mapStateToProps, bindAction)(Tender);
