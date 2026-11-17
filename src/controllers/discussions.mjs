
import DiscussionModel from '../models/discussion.mjs';

const Discussions = class Discussions {
  constructor(app, connect) {
    this.app = app;
    this.DiscussionModel = connect.model(
      'Discussion',
      DiscussionModel
    );

    this.run();
  }

  create() {
    this.app.post('/discussions', async (req, res) => {
      try {
        const hasGroup = !!req.body.group;
        const hasEvent = !!req.body.event;

        if (hasGroup === hasEvent) {
          return res.status(400).json({
            message: 'A discussion must belong to either a group or an event'
          });
        }

        const discussion = await this.DiscussionModel.create(req.body);

        res.status(201).json(discussion);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/discussions', async (req, res) => {
      try {
        const discussions = await this.DiscussionModel.find()
          .populate('group')
          .populate('event')
          .populate('messages.author')
          .populate('messages.comments.author');

        res.status(200).json(discussions);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/discussions/:id', async (req, res) => {
      try {
        const discussion = await this.DiscussionModel.findById(
          req.params.id
        )
          .populate('group')
          .populate('event')
          .populate('messages.author')
          .populate('messages.comments.author');

        if (!discussion) {
          return res.status(404).json({
            message: 'Discussion not found'
          });
        }

        res.status(200).json(discussion);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid discussion ID'
        });
      }
    });
  }

  update() {
    this.app.put('/discussions/:id', async (req, res) => {
      try {
        const discussion = await this.DiscussionModel.findById(
          req.params.id
        );

        if (!discussion) {
          return res.status(404).json({
            message: 'Discussion not found'
          });
        }

        const group = req.body.group !== undefined
          ? req.body.group
          : discussion.group;

        const event = req.body.event !== undefined
          ? req.body.event
          : discussion.event;

        if (!!group === !!event) {
          return res.status(400).json({
            message: 'A discussion must belong to either a group or an event'
          });
        }

        Object.assign(discussion, req.body);

        await discussion.save();

        res.status(200).json(discussion);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/discussions/:id', async (req, res) => {
      try {
        const discussion = await this.DiscussionModel.findByIdAndDelete(
          req.params.id
        );

        if (!discussion) {
          return res.status(404).json({
            message: 'Discussion not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid discussion ID'
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

export default Discussions;
