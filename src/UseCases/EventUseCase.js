class EventUseCase{
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    addEvent(event) {
        this.eventRepository.add(event);
    }
    
    getEvent(theme) {
      return this.eventRepository.getAll().find(event => event.theme === theme) || null;
    }

    getAllEvents() {
        return this.eventRepository.getAll();
      }
      

      getFutureEvents() {
        const currentDate = new Date();
        return this.eventRepository.getAll().filter(event => new Date(event.date) > currentDate);
      }
      
      getPastEvents() {
        const currentDate = new Date();
        return this.eventRepository.getAll().filter(event => new Date(event.date) < currentDate);
      }

      updateEventTheme(theme, newTheme) {
        const updatedEvent = this.eventRepository.getAll().find(event => event.theme == theme);
        if (updatedEvent) {
          updatedEvent.setTheme(newTheme);
          this.eventRepository.update(theme, updatedEvent);
        } else {
          throw new Error('Evento no encontrado');
        }
      }

    updateEventDescription(theme,newDescription){
        const updatedEvent= this.eventRepository.getAll().find(event => event.theme == theme);
        if (updatedEvent) {
          updatedEvent.setDescription(newDescription);
          this.eventRepository.update(theme, updatedEvent);
        } else {
          throw new Error('Evento no encontrado');
    }
    }

    updateEventDate(theme,newDate){
        const updatedEvent= this.eventRepository.getAll().find(event => event.theme == theme);
        if (updatedEvent) {
          updatedEvent.setDate(newDate);
          this.eventRepository.update(theme, updatedEvent);
          }else {
          throw new Error('Evento no encontrado');
    } 
    }
    
    updateEventLocation(theme,newLocation){
        const updatedEvent= this.eventRepository.getAll().find(event => event.theme == theme);
        if (updatedEvent) {
          updatedEvent.setLocation(newLocation);
          this.eventRepository.update(theme, updatedEvent);
          }else {
          throw new Error('Evento no encontrado');
    } 
    }

    deleteEvent(theme) {
        const event = this.eventRepository.getAll().find(event => event.theme === theme);
        if (event) {
          this.eventRepository.delete(theme);
          return true;
        }
        return false;
      }

}

module.exports = EventUseCase;