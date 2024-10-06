class InMemorySculptorRepository {
    constructor() {
      this.sculptors = [];
    }
  
    add(sculptor) {
      this.sculptors.push(sculptor);
    }
  
    getAll() {
      return this.sculptors;
    }
  
    update(name, updatedSculptor) {
      const index = this.sculptors.findIndex(sculptor => sculptor.name === name);
      if (index !== -1) {
        this.sculptors[index] = updatedSculptor;
      }
    }
  
    delete(name) {
      this.sculptors = this.sculptors.filter(sculptor => sculptor.name !== name);
    }
}

module.exports = InMemorySculptorRepository;