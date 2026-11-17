import PollModel from '../models/poll.mjs';

const Polls = class Polls {
  constructor(app, connect) {
    this.app = app;
    this.PollModel = connect.model('Poll', PollModel);

    this.run();
  }

  create() {
    this.app.post('/polls', async (req, res) => {
      try {
        if (!req.body.questions || req.body.questions.length === 0) {
          return res.status(400).json({
            message: 'A poll must contain at least one question'
          });
        }

        const poll = await this.PollModel.create(req.body);

        res.status(201).json(poll);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/polls', async (req, res) => {
      try {
        const polls = await this.PollModel.find()
          .populate('event')
          .populate('organiser')
          .populate('questions.responses.participant');

        res.status(200).json(polls);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findById(req.params.id)
          .populate('event')
          .populate('organiser')
          .populate('questions.responses.participant');

        if (!poll) {
          return res.status(404).json({
            message: 'Poll not found'
          });
        }

        res.status(200).json(poll);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid poll ID'
        });
      }
    });
  }

  update() {
    this.app.put('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );

        if (!poll) {
          return res.status(404).json({
            message: 'Poll not found'
          });
        }

        res.status(200).json(poll);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/polls/:id', async (req, res) => {
      try {
        const poll = await this.PollModel.findByIdAndDelete(
          req.params.id
        );

        if (!poll) {
          return res.status(404).json({
            message: 'Poll not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid poll ID'
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

export default Polls;
