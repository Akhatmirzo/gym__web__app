const {
  createMemberShip,
  getAllMemberships,
  getMembershipById,
  updateMembershipById,
  deleteMembershipById,
} = require("../controllers/memberShipController");

const auth = require("../middlewares/auth");

function MemberShipRoutes(fastify, options, done) {
  //* Create Membership
  fastify.post("", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["MemberShip"],
    },
    handler: createMemberShip,
  });

  //* Get All Memberships
  fastify.get("", { schema: { tags: ["MemberShip"] } }, (req, res) => {
    getAllMemberships(req, res);
  });

  //* Get one Membership
  fastify.get("/:id", { schema: { tags: ["MemberShip"] } }, (req, res) => {
    getMembershipById(req, res);
  });

  //* Update one Membership
  fastify.put("/:id", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["MemberShip"],
    },
    handler: updateMembershipById,
  });

  //* Delete one Membership
  fastify.delete("/:id", {
    preHandler: [auth(["admin"])],
    schema: {
      tags: ["MemberShip"],
    },
    handler: deleteMembershipById,
  });

  done();
}

module.exports = MemberShipRoutes;
