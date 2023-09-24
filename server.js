const Hapi = require("@hapi/hapi");
const router = require("./routes");

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: "8080",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(router);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
