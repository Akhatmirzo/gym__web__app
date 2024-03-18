const {
  createMember,
  getAllMembers,
  getMember,
  deleteMember,
  editMember,
} = require("../controllers/memberController");

const auth = require("../middlewares/auth");

function MemberRoutes(fastify, options, done) {
  //* Register Member
  fastify.post("", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["Member"],
      body: {
        type: "object",
        properties: {
          fullname: {
            type: "string",
          },
          birthdate: {
            type: "string",
          },
          address: {
            type: "string",
          },
          gender: {
            type: "string",
          },
          admin_id: {
            type: "string",
          },
          phone_number: {
            type: "string",
          },
        },
      },
      headers: {
        type: "object",
        required: ["authorization"],
        properties: {
          authorization: {
            type: "string",
            description: "Admin token",
          },
        },
      },
      response: {
        201: {
          type: "object",
          description: "Successful response",
          properties: {
            message: {
              type: "string",
            },
          },
        }
      }
    },
    handler: createMember,
  });

  //* Get all Members
  fastify.get("/", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["Member"],
    },
    handler: getAllMembers,
  });

  //* Get one Member
  fastify.get("/:id", {
    preHandler: [auth(["admin", "Member"])],
    schema: {
      tags: ["Member"],
    },
    handler: getMember,
  });

  //* Delete an Member
  fastify.delete("/:id", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["Member"],
    },
    handler: deleteMember,
  });

  //* Update Member's fullname vs phone number
  fastify.put("/:id", {
    preHandler: [auth(["admin", "Member"])],
    schema: {
      tags: ["Member"],
    },
    handler: editMember,
  });

  done();
}

module.exports = MemberRoutes;
