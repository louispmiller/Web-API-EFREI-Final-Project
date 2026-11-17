import ShoppingListModel from '../models/shoppingList.mjs';

const ShoppingLists = class ShoppingLists {
  constructor(app, connect) {
    this.app = app;
    this.ShoppingListModel = connect.model(
      'ShoppingList',
      ShoppingListModel
    );

    this.run();
  }

  create() {
    this.app.post('/shopping-lists', async (req, res) => {
      try {
        const shoppingList = await this.ShoppingListModel.create(
          req.body
        );

        res.status(201).json(shoppingList);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/shopping-lists', async (req, res) => {
      try {
        const shoppingLists = await this.ShoppingListModel.find()
          .populate('event')
          .populate('items.user');

        res.status(200).json(shoppingLists);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/shopping-lists/:id', async (req, res) => {
      try {
        const shoppingList = await this.ShoppingListModel.findById(
          req.params.id
        )
          .populate('event')
          .populate('items.user');

        if (!shoppingList) {
          return res.status(404).json({
            message: 'Shopping list not found'
          });
        }

        res.status(200).json(shoppingList);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid shopping list ID'
        });
      }
    });
  }

  update() {
    this.app.put('/shopping-lists/:id', async (req, res) => {
      try {
        const shoppingList = await this.ShoppingListModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );

        if (!shoppingList) {
          return res.status(404).json({
            message: 'Shopping list not found'
          });
        }

        res.status(200).json(shoppingList);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/shopping-lists/:id', async (req, res) => {
      try {
        const shoppingList = await this.ShoppingListModel.findByIdAndDelete(
          req.params.id
        );

        if (!shoppingList) {
          return res.status(404).json({
            message: 'Shopping list not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid shopping list ID'
        });
      }
    });
  }

  run() {
    this.create();
    this.showAll();
    this.showById();
    this.update();
    this.deleteById();
  }
};

export default ShoppingLists;
