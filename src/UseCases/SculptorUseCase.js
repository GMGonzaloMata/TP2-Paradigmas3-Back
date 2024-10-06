class SculptorUseCase {
    constructor(sculptorRepository) {
      this.sculptorRepository = sculptorRepository;
    }
  
    addSculptor(sculptor) {
      this.sculptorRepository.add(sculptor);
    }
  
    getSculptor(name) {
      return this.sculptorRepository.getAll().filter(sculptor => sculptor.name == name);
    }
  
    getAllSculptors() {
      return this.sculptorRepository.getAll();
    }
  
    updateSculptorName(name, newName) {
      const updatedSculptor = this.getSculptor(name)[0];
      updatedSculptor.setName(newName);
      this.sculptorRepository.update(name, updatedSculptor);
    }
  
    updateSculptorBiography(name, newBiography) {
      const updatedSculptor = this.getSculptor(name)[0];
      updatedSculptor.setBiography(newBiography);
      this.sculptorRepository.update(name, updatedSculptor);
    }
  
    updateSculptorContact(name, newContact) {
      const updatedSculptor = this.getSculptor(name)[0];
      updatedSculptor.setContact(newContact);
      this.sculptorRepository.update(name, updatedSculptor);
    }
  
    updateSculptorWorks(name, newWorks) { // Cambia esto
      const updatedSculptor = this.getSculptor(name)[0];
      updatedSculptor.setWorks(newWorks);
      this.sculptorRepository.update(name, updatedSculptor);
    }
  
    deleteSculptor(name) {
      this.sculptorRepository.delete(name);
    }
  }
  
  module.exports = SculptorUseCase;
  