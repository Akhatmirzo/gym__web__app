const MemberShip = require("../models/MemberShip");

// Create a new MemberShip
exports.createMemberShip = async (req, res) => {
  const { fullname, from, to, price, member_id } = req.body;

  // Create a new MemberShip
  const newMemberShip = new MemberShip({
    fullname,
    from,
    to,
    price,
    member_id,
  });

  // Save MemberShip in the database
  newMemberShip
    .save()
    .then((data) => {
      res.status(201).send({
        message: "MemberShip was created successfully!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while creating the MemberShip.",
        description: err,
      });
    });
};

// Get all MemberShips
exports.getAllMemberships = async (req, res) => {
  const memberships = await MemberShip.find({ member_id: req.headers.member_id }).exec();
  if (!memberships) {
    return res.status(400).send({
      message: "Memberships were not found",
    });
  } else if (memberships.length === 0) {
    return res.status(200).send({ message: "There are no MemberShips" });
  } else {
    return res.status(200).send({
      message: "Memberships were found",
      data: memberships,
    });
  }
};

// Get a single MemberShip by id
exports.getMembershipById = async (req, res) => {
  const membership = await MemberShip.findById(req.params.id).exec();
  if (!membership) {
    return res.status(400).send({
      message: "Membership was not found",
    });
  } else {
    return res.status(200).send({
      message: "Membership was found",
      data: membership,
    });
  }
};

// Update a MemberShip by the id in the request

exports.updateMembershipById = async (req, res) => {
  const updatedMembership = {
    fullname: req.body.fullname,
    from: req.body.from,
    to: req.body.to,
    price: req.body.price,
  };

  const membership = await MemberShip.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: updatedMembership,
    }
  );

  if (!membership) {
    return res.status(400).send({
      message: "Membership was not found",
    });
  }

  membership
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Membership was updated successfully!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while updating the membership.",
        description: err,
      });
    });
};

// Delete a MemberShip with the specified id in the request

exports.deleteMembershipById = async (req, res) => {
  const membership = await MemberShip.findOneAndDelete({
    _id: req.params.id,
  });

  if (!membership) {
    return res.status(400).send({
      message: "Membership was not found",
    });
  }

  membership
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Membership was deleted successfully!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while deleting the membership.",
        description: err,
      });
    });
};
