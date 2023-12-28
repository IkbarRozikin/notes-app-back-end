class NotesHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  async postNoteHandler(req, h) {
    try {
      this._validator.validateNotePayload(req.payload)
      const {title = `Untitled`, body, tags} = req.payload

      const noteId = await this._service.addNote({title, body, tags})
  
  
      const response = h.response({
        status: "success",
        message: "Note was added successfully",
        data: {
          noteId
        }
      })
      response.code(201)
  
      return response  
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      })
      response.code(400)

      return response
    }
  }

  async getNotesHandler() {
    const notes = await this._service.getNotes()

    return {
      status: "success",
      data: {
        notes
      }
    }
  }

  async getNoteByIdHandler(req, h) {
    try {
      const { id } = req.params
  
      const note = await this._service.getNoteById(id)
  
      const response = h.response({
        status: "success",
        data: {
          note
        }
      })
      response.code(200)
  
      return response
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      })
      response.code(400)
  
      return response
    }
  }

  async putNoteByIdHandler(req, h) {
    try {
      this._validator.validateNotePayload(req.payload)

      const { id } = req.params

      await this._service.editNoteById(id, req.payload)

      const response = h.response({
        status: "success",
        message: "Note updated successfully",
      })
      response.code(200)

      return response
    } catch (error) {
        const response = h.response({
          status: "fail",
          message: error.message
        })
        response.code(404)

      return response
    }
  }

  async deleteNoteByIdHandler(req, h) {
    try {
      const { id } = req.params

      await this._service.deleteNoteById(id)

      const response = h.response({
        status: "success",
        message: "Note deleted successfully"
      })
      response.code(200)

      return response
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message
      })
      response.code(404)

      return response
    }
  }
}

module.exports = NotesHandler