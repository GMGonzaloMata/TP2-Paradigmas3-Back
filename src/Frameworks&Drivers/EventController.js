const Event = require('../Entities/Event'); // Importa la clase Event

class EventController {
  constructor(eventUseCase) {
    this.eventUseCase = eventUseCase;
  }

  createEvent(theme, date, location, description) {
    const event = new Event(theme, date, location, description);
    this.eventUseCase.addEvent(event);
  }

  getEventByTheme(theme) {
    const event = this.eventUseCase.getEvent(theme);
    return event || null; // Asegúrate de devolver null si no existe el evento
  }

  getFutureEvents() {
    return this.eventUseCase.getFutureEvents();
  }

  getAllEvents() {
    return this.eventUseCase.getAllEvents();
  }
  

  getPastEvents() {
    return this.eventUseCase.getPastEvents();
  }

  updateEvent(type, typeP, theme) {
    switch (type) {
      case 'theme':
        this.eventUseCase.updateEventTheme(theme, typeP);
        break;
      case 'description':
        this.eventUseCase.updateEventDescription(theme, typeP);
        break;
      case 'date':
        this.eventUseCase.updateEventDate(theme, typeP);
        break;
      case 'location':
        this.eventUseCase.updateEventLocation(theme, typeP);
        break;
      default:
        throw new Error('Tipo de modificación no soportado');
    }
  }

  deleteEvent(theme) {
    return this.eventUseCase.deleteEvent(theme);
  }
}

module.exports = EventController;
