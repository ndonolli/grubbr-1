const Nodal = require('nodal');
const _ = require('underscore');

const Ratings = Nodal.require('app/models/rating.js');

class V1RatedmenuController extends Nodal.Controller {

  get() {
    // this.respond({message: `GET request to ${this.constructor.name}`});
    const restaurantID = this.params.route.id;
    Ratings.query()
      .join('dish__restaurant')
      .join('dish__menuType')
      .where({ dish__restaurant__id: restaurantID })
      .end((err, models) => {
        if (err) { this.respond(err); }
        // make restaurant info.
        const restaurantName = models[0].joined('dish')
          .joined('restaurant').get('name');
        // compile menu with scores
        let menuItems = {};
        models.forEach((rating) => {
          // get dish id
          const dishID = rating.joined('dish').get('id');
          // if the food item is not made yet, create first time set up.
          if (menuItems[dishID] === undefined) {
            menuItems[dishID] = {};
            menuItems[dishID].dishID = dishID;
            menuItems[dishID].dishName = rating.joined('dish').get('name');
            menuItems[dishID].menuType = rating.joined('dish')
              .joined('menuType').get('memo');
            menuItems[dishID].menuTypeID = rating.joined('dish')
                .joined('menuType').get('id');
            menuItems[dishID].score = 0;
          }
          // update score based on rating;
          menuItems[dishID].score += rating.get('rating');
        });
        // move from object to array.
        menuItems = _.map(menuItems, item => item);
        // sort said array, first by menu position then score.
        menuItems = menuItems.sort((a, b) => {
          if (a.menuTypeID < b.menuTypeID) {
            return -1;
          }
          if (a.menuTypeID > b.menuTypeID) {
            return 1;
          }
          // they are the same menu type
          return b.score - a.score;
        });
        const response = {
          restaurantInfo: {
            name: restaurantName,
            id: restaurantID,
          },
          menuItems,
        };
        this.respond(response);
      });
  }

}

module.exports = V1RatedmenuController;