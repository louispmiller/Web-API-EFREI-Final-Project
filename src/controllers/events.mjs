import EventModel from '../models/event.mjs';

const Events = class Events {
  constructor(app, connect) {
    this.app = app;
    this.EventModel = connect.model('Event', EventModel);

    this.run();
  }

  create() {
    this.app.post('/events', async (req, res) => {
      try {
        const event = await this.EventModel.create(req.body);

        res.status(201).json(event);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request',
          error: err.message
        });
      }
    });
  }

  showAll() {
    this.app.get('/events', async (req, res) => {
      try {
        const events = await this.EventModel.find()
          .populate('organisers')
          .populate('participants');

        res.status(200).json(events);
      } catch (err) {
        res.status(500).json({
          message: 'Internal server error'
        });
      }
    });
  }

  showById() {
    this.app.get('/events/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findById(req.params.id)
          .populate('organisers')
          .populate('participants');

        if (!event) {
          return res.status(404).json({
            message: 'Event not found'
          });
        }

        res.status(200).json(event);
      } catch (err) {
        res.status(400).json({
          message: 'Invalid event ID'
        });
      }
    });
  }

  update() {
    this.app.put('/events/:id', async (req, res) => {
      try {
        if (req.body.startDate && req.body.endDate &&
            new Date(req.body.endDate) <= new Date(req.body.startDate)) {
          return res.status(400).json({
            message: 'End date must be after start date'
          });
        }

        const event = await this.EventModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true }
        );

        if (!event) {
          return res.status(404).json({
            message: 'Event not found'
          });
        }

        res.status(200).json(event);
      } catch (err) {
        res.status(400).json({
          message: 'Bad request'
        });
      }
    });
  }

  deleteById() {
    this.app.delete('/events/:id', async (req, res) => {
      try {
        const event = await this.EventModel.findByIdAndDelete(
          req.params.id
        );

        if (!event) {
          return res.status(404).json({
            message: 'Event not found'
          });
        }

        res.status(204).send();
      } catch (err) {
        res.status(400).json({
          message: 'Invalid event ID'
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

export default Events;
