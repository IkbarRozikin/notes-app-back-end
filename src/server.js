const Hapi = require("@hapi/hapi");
const notes = require("./api/notes")
const NotesService = require("./service/inMemory/NotesService")
const NotesValidator = require("./validator/notes")

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    host: "localhost",
    port: "8080",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator
    }
  })

  await server.start();
  console.log(`Server running in port ${server.info.uri}`);
};

init();
