class Event {
  constructor(theme, date, location, description) {
    this.theme = theme;
    this.date = new Date(date); // Convierte la fecha en un objeto Date
    this.location = location;
    this.description = description;
  }

  // Métodos setters
  setTheme(theme) {
    this.theme = theme;
  }

  setDate(date) {
    this.date = new Date(date);
  }

  setLocation(location) {
    this.location = location;
  }

  setDescription(description) {
    this.description = description;
  }
}

module.exports = Event;
