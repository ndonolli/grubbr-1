'use strict';

const Nodal = require('nodal');
const Dish = Nodal.require('app/models/dish.js');

class V1DishesController extends Nodal.Controller {

  index() {

    Dish.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Dish.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Dish.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Dish.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Dish.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1DishesController;
