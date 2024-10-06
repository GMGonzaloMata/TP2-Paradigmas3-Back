const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventController = require('./Frameworks&Drivers/EventController');
const SculptorController = require('./Frameworks&Drivers/SculptorController');
const EventUseCase = require('./UseCases/EventUseCase');
const SculptorUseCase = require('./UseCases/SculptorUseCase');
const InMemoryEventRepository = require('./InterfaceAdapters/InMemoryEventRepository');
const InMemorySculptorRepository = require('./InterfaceAdapters/InMemorySculptorRepository');

const app = express();
const port = 3000;

// Middleware para procesar solicitudes en formato JSON
app.use(bodyParser.json());
app.use(cors());

// Instanciando los repositorios
const eventRepository = new InMemoryEventRepository();
const sculptorRepository = new InMemorySculptorRepository();

// Instanciando los casos de uso
const eventUseCase = new EventUseCase(eventRepository);
const sculptorUseCase = new SculptorUseCase(sculptorRepository);

// Instanciando los controladores
const eventController = new EventController(eventUseCase);
const sculptorController = new SculptorController(sculptorUseCase);

// Rutas HTTP para eventos
app.post('/events', (req, res) => {
  const { theme, date, location, description } = req.body;//Arreglo   
  eventController.createEvent(theme, date, location, description);
  res.status(201).send('Evento creado');
});

app.delete('/events', (req, res) => {
  const { theme } = req.body;  // Asegúrate de que está leyendo el tema del body
  console.log('Tema recibido para eliminar:', theme);

  if (!theme) {
    return res.status(400).send('Debe proporcionar el tema del evento');
  }

  const deleted = eventController.deleteEvent(theme);
  if (deleted) {
    res.status(200).send('Evento eliminado con éxito');
  } else {
    res.status(404).send('Evento no encontrado');
  }
});

app.get('/events/future', (req, res) => {
  const futureEvents = eventController.getFutureEvents();
  res.status(200).json(futureEvents);
});

app.get('/events/past', (req, res) => {
  const pastEvents = eventController.getPastEvents();
  res.status(200).json(pastEvents);
});

app.get('/events/all', (req, res) => {
  const allEvents = eventController.getAllEvents();
  res.status(200).json(allEvents);
});

// Rutas HTTP para escultores
app.post('/sculptors', (req, res) => {
  sculptorController.createSculptor(req);
  res.status(201).send('Escultor creado');
});

app.delete('/sculptors', (req, res) => {
  const { name} = req.body;  // Asegúrate de que está leyendo el tema del body
  console.log('Nombre recibido para eliminar:', name);

  if (!name) {
    return res.status(400).send('Debe proporcionar el nombre del escultor');
  }

  const deleted = sculptorController.deleteSculptor(name);
  if (deleted) {
    res.status(200).send('Escultor eliminado con éxito');
  } else {
    res.status(404).send('Escultor no encontrado');
  }
});

app.get('/sculptors', (req, res) => {
  const allSculptors = sculptorController.getAllSculptors();
  res.status(200).json(allSculptors);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
