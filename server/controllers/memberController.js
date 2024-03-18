const Member = require("../models/Member");
const MemberShip = require("../models/MemberShip");

//* POST => Register Member
exports.createMember = async (req, res) => {
  const { fullname, phone_number, birthdate, address, gender } = req.body;

  // Validate phone number format
  const phoneNumberRegEx = /^(\+998)\d{2}\d{3}\d{2}\d{2}$/;
  if (!phone_number || !phoneNumberRegEx.test(phone_number)) {
    return res.status(400).send({
      error:
        "Invalid or missing phone number. Please provide a valid phone number.",
    });
  }

  try {
    // Mavjud a'zolarni tekshirish
    const foundUser = await Member.findOne({ phone_number }).exec();
    if (foundUser) {
      return res.status(400).send({
        error: "This Member has already registered!",
      });
    }

    function calculateAge(year, month, day) {
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth() + 1;
      let currentDay = currentDate.getDate();

      let age = currentYear - year;

      // Check if the birthday has occurred this year
      if (
        currentMonth < month ||
        (currentMonth === month && currentDay < day)
      ) {
        age--;
      }

      return age;
    }

    const [year, month, day] = birthdate.split("-");
    const age = calculateAge(year, month, day);

    //? Creating new Member
    const newMember = new Member({
      fullname,
      phone_number,
      admin_id: req.adminId,
      age,
      address,
      gender,
      birthdate,
    });

    await newMember.save();

    res.status(201).send({
      message: "Member created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      error: "An error occurred while creating the Member",
      description: error,
    });
  }
};

//* GET => Get all Members
exports.getAllMembers = async (req, res) => {
  try {
    const Members = await Member.find().exec();

    if (Members.length > 0) {
      return res
        .code(200)
        .send({ message: "Employees were found", Members: [...Members] });
    }

    return res.code(200).send({ message: "There are no Members" });
  } catch (error) {
    return res.code(500).send({ message: error });
  }
};

//* GET => Get one Member
exports.getMember = async (req, res) => {
  const id = req.params.id;

  try {
    const MemberModel = await Member.findOne({ _id: id }).exec();

    if (!MemberModel) {
      return res.status(400).send({
        message: "Member was not found",
      });
    } else {
      return res.status(200).send({
        message: "Member was found",
        data: MemberModel,
      });
    }
  } catch (err) {
    return res.status(500).send({
      error: err,
    });
  }
};

//* DELETE => Delete an Member
exports.deleteMember = async (req, res) => {
  const id = req.params.id;

  try {
    const delMember = await Member.findOneAndDelete({ _id: id });
    const delMemberShip = await MemberShip.findOneAndDelete({member_id: id});

    if (!delMember) {
      return res.status(400).send({
        message: "Member was not found",
      });
    } else {
      return res.status(200).send({
        message: "Member successfully deleted",
        delMember,
      });
    }
  } catch (err) {
    return res.status(400).send({
      error: "Error while deleting an Member",
      description: err,
    });
  }
};

//* PUT => Update Member's fullname vs phone number
exports.editMember = async (req, res) => {
  const id = req.params.id;
  const { fullname, phone_number, birthdate, address, gender } = req.body;

  // Validate phone number format
  const phoneNumberRegEx = /^(\+998)\d{2}\d{3}\d{2}\d{2}$/;

  if (!phoneNumberRegEx.test(phone_number)) {
    return res.status(400).send({
      message: "Invalid phone number format",
    });
  }

  const editOpts = {
    fullname,
    phone_number,
    birthdate,
    address,
    gender,
  };

  try {
    const EditMember = await Member.findOneAndUpdate(
      { _id: id },
      {
        $set: editOpts,
      }
    );

    if (!EditMember) {
      return res.status(400).send({
        message: "Member was not found",
      });
    } else {
      return res.status(200).send({
        message: "Member successfully updated",
        EditMember,
      });
    }
  } catch (err) {
    return res.status(400).send({
      error: "Error while updating an Member",
      description: err,
    });
  }
};
