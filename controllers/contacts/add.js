const {Contact} = require('../../models/contact');
// const { schema } = require('../../models/contact');

const addContact = async (req, res) => {
  // const { _id: owner } = req.user;
  const result = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result,
    },
  });
};

module.exports = addContact;