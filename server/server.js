const dotenv = require("dotenv");
dotenv.config();
const cron = require("node-cron");
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const multipart = require("@fastify/multipart");
fastify.register(cors);
fastify.register(multipart);
fastify.register(require("@fastify/swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "GYM API",
      description: "This is a GYM CRM platform's API list!",
      version: "1.5.0",
    },
    tags: [
      { name: "API", description: "Test" },
      { name: "Admin", description: "Super Admin" },
      { name: "Member", description: "Member" },
      { name: "MemberShip", description: "Membership" },
    ],
  },
});

const mongoose = require("mongoose");

fastify.get("/", { schema: { tags: ["API"] } }, (req, res) => {
  res.send("Api is working");
});
fastify.register(require("./routes/adminRoutes"), {
  prefix: "/api",
});
fastify.register(require("./routes/memberRoutes"), {
  prefix: "/api/member",
});
fastify.register(require("./routes/memberShipRoutes"), {
  prefix: "/api/membership",
});

//* Database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Global db connected");
});

fastify.addHook("onClose", async () => {
  await mongoose.connection.close();
});

fastify.listen(process.env.PORT, "0.0.0.0", (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});
