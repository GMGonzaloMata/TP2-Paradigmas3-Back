const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const EventController = require('../InterfaceAdapters/EventController');
const SculptorController = require('../InterfaceAdapters/SculptorController');
const EventUseCase = require('../UseCases/EventUseCase');
const SculptorUseCase = require('../UseCases/SculptorUseCase');
const InMemoryEventRepository = require('./InMemoryEventRepository');
const InMemorySculptorRepository = require('./InMemorySculptorRepository');

const app = express();
const port = process.env.PORT || 3000;

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
  const { theme, date, location, description } = req.body;

  // Verificar si ya existe un evento con el mismo tema
  const existingEvent = eventController.getEventByTheme(theme); // Implementar este método en el controlador
  if (existingEvent) {
    return res.status(400).send('Ya existe un evento con esta temática');
  }

  // Si no existe, crear el evento
  eventController.createEvent(theme, date, location, description);
  res.status(201).send('Evento creado con éxito');
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

app.put('/events', (req, res) => {
  const { theme, type, typeP } = req.body; // Desestructurar la temática y los nuevos valores

  // Verificar que el tema del evento y el tipo de actualización estén presentes
  if (!theme || !type) {
    return res.status(400).send('Debe proporcionar el tema y el tipo de actualización del evento');
  }

  // Llamar a la función updateEvent del controlador, pasando el tema, el tipo de cambio y el nuevo valor
  eventController.updateEvent(type, typeP, theme);

  res.status(200).send('Evento actualizado con éxito');
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
  const { name } = req.body;
  // Verificar si ya existe un escultor con el mismo nombre
  const existingSculptor = sculptorController.getSculptorByName(name);
  if (existingSculptor) {
    return res.status(400).send('Ya existe un escultor con este nombre');
  }
  // Si no existe, crear el escultor
  sculptorController.createSculptor(req);
  res.status(201).send('Escultor creado con éxito');
});

app.put('/sculptors', (req, res) => {
  const { name, type, newValue } = req.body; // Desestructurar el nombre y los nuevos valores

  // Verificar que el nombre del escultor y el tipo de actualización estén presentes
  if (!name || !type) {
    return res.status(400).send('Debe proporcionar el nombre del escultor y el tipo de actualización');
  }

    sculptorController.updateSculptor(name, type, newValue); // Pasar los parámetros directamente al controlador
    
    res.status(200).send('Escultor actualizado con éxito');
});

app.delete('/sculptors/delete', (req, res) => {
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
