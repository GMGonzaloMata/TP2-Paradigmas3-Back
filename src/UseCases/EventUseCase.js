class EventUseCase{
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    addEvent(event) {
        this.eventRepository.add(event);
    }
    
    getEvent(theme) {
        return this.eventRepository.getAll().filter(event => event.theme == theme);
    }

    getAllEvents() {
        return this.eventRepository.getAll();
      }
      

    getFutureEvents() {
        const currentDate = new Date();
        return this.eventRepository.getAll().filter(event => event.date > currentDate);
    }


    getPastEvents() {
        const currentDate = new Date();
        return this.eventRepository.getAll().filter(event => event.date < currentDate);
    }

    updateEventTheme(theme,newTheme){
        updatedEvent= this.eventRepository.getAll(event=>event.theme==theme);
        updatedEvent.setTheme(newTheme);
        this.eventRepository.update(theme, updatedEvent);
    }

    updateEventDescription(theme,newDescription){
        updatedEvent= this.eventRepository.getAll(event=>event.theme==theme);
        updatedEvent.setDescription(newDescription);
        this.eventRepository.update(theme, updatedEvent);
    }

    updateEventDate(theme,newDate){
        updatedEvent= this.eventRepository.getAll(event=>event.theme==theme);
        updatedEvent.setDate(newDate);
        this.eventRepository.update(theme, updatedEvent);
    }
    
    updateEventLocation(theme,newLocation){
        updatedEvent= this.eventRepository.getAll(event=>event.theme==theme);
        updatedEvent.setLocation(newLocation);
        this.eventRepository.update(theme, updatedEvent);
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