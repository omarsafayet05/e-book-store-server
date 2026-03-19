const Newsletter = require("./newsletter.model");

const postANewsletter = async (req, res) => {
  try {
    const newNewsletter = await Newsletter(req.body);
    const savedNewsletter = await newNewsletter.save();
    res.status(200).json("Create a newsletter successfully!", savedNewsletter);
  } catch (error) {
    console.error("Error creating newsletter", error);
    res.status(500).send({ message: "Failed to create a newsletter" });
  }
};

const getAllNewsletter = async (req, res) => {
  try {
    const newsletter = await Newsletter.find().sort({ createdAt: -1 });
    res.status(200).send(newsletter);
  } catch (error) {
    console.error("Error get all Newsletters", error);
    res.status(500).send({ message: "Error to fetch all newsletters" });
  }
};

const deleteANewsletter = async (req, res) => {
  try {
    const { id } = req.params;
    const newsletterDelete = await Newsletter.findByIdAndDelete(id);
    if (!newsletterDelete) {
      res.status(404).send({ message: "Newsletter is not found!" });
    }

    res.status(200).send({
      message: "Newsletter deleted succesfully",
      banner: newsletterDelete,
    });
  } catch (error) {
    console.error("Error delete Newsletter", error);
    res.status(500).send({ message: "Failed to delete a Newsletter" });
  }
};

module.exports = { postANewsletter, getAllNewsletter, deleteANewsletter };
