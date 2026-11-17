
import GroupModel from '../models/group.mjs';

const Groups = class Groups {
  constructor(app, connect) {
    this.app = app;
    this.GroupModel = connect.model('Group', GroupModel);

    this.run();
  }

  create() {
    this.app.post('/groups', async (req, res) => {
      try {
        const group = await this.GroupModel.create(req.body);

        res.status(201).json(group);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/groups', async (req, res) => {
      try {
        const groups = await this.GroupModel.find()
          .populate('members')
          .populate('administrators');

        res.status(200).json(groups);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findById(req.params.id)
          .populate('members')
          .populate('administrators');

        if (!group) {
          return res.status(404).json({
            message: 'Group not found'
          });
        }

        res.status(200).json(group);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid group ID'
        });
      }
    });
  }

  update() {
    this.app.put('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );

        if (!group) {
          return res.status(404).json({
            message: 'Group not found'
          });
        }

        res.status(200).json(group);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/groups/:id', async (req, res) => {
      try {
        const group = await this.GroupModel.findByIdAndDelete(
          req.params.id
        );

        if (!group) {
          return res.status(404).json({
            message: 'Group not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid group ID'
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

export default Groups;
