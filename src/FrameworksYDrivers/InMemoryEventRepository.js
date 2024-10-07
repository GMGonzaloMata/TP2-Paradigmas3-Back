class InMemoryEventRepository {
    constructor() {
      this.events = [];
    }
  
    add(event) {
      this.events.push(event);
    }
  
    getAll() {
      return this.events;
    }
  
    update(theme, updatedEvent) {
      const index = this.events.findIndex(event => event.theme === theme);
      if (index !== -1) {
        this.events[index] = updatedEvent;
      }
    }
  
    delete(theme) {
      this.events = this.events.filter(event => event.theme !== theme);
    }
  }

  module.exports = InMemoryEventRepository;