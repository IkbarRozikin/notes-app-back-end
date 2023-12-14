const { nanoid } = require('nanoid')

class NotesService {
  constructor() {
    this._notes = []
  }

  addNote(title, body, tags) {
    const id = nanoid(16)
    const createdAt = new Date().toISOString
    const updatedAt = createdAt

    const newNote = {
      title, body, tags, id, createdAt, updatedAt
    }

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0

    if (!isSuccess) {
      throw new Error('Catatan gagal ditambahkan');
    }
    return id
  }

  getNotes() {
    return this._notes
  }

  getNoteById(id) {
    const note = this._notes.find((note) => note.id === id)[0];
    if (!note) {
      throw new Error('Id not found');
    }
    return note
  }

  editNoteById(id, {title, tags, body}) {
    const index = this._notes.findIndex((note) => note.id === id)

    if (index === -1) {
      throw new Error(`Cannot edit note. Id not found`)
    }

    const updatedAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index], title, tags, body, updatedAt
    }
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id)

    if (index === -1) {
      throw new Error(`Note cannot be deleted, Id not found`)
    }

    this._notes.splice(index, 1)
  }
  
}


module.exports = NotesService
