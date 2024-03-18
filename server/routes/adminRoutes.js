const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const auth = require("../middlewares/auth");

function adminRoutes(fastify, options, done) {
  //* Register admin
  fastify.post("/register", {
    schema: {
      tags: ["Admin"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        201: {
          type: "object",
          description: "Successful response",
          properties: {
            message: { type: "string" },
            token: { type: "string" },
          },
        }
      }
    },
    handler: registerAdmin,
  });

  //* Login admin
  fastify.post("/login", {
    schema: {
      tags: ["Admin"],
      body: {
        type: "object",
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          description: "Successful response",
          properties: {
            message: { type: "string" },
            token: { type: "string" },
          },
        }
      }
    },
    handler: loginAdmin,
  });

  done();
}

module.exports = adminRoutes;
