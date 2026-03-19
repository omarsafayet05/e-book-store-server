const Book = require("./book.model");
const uploadBuffer = require("../utils/cloudUpload");
const cloudinary = require("../utils/cloudinary");

const postABook = async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      description,
      author,
      category,
      trending,
      recommended,
      oldPrice,
      newPrice,
      pdf,
    } = req.body;
    console.log(req.body);
    let coverImageUrl = null;

    //upload image to cloudinary
    if (req.files && req.files.coverImage) {
      const imageBuffer = req.files.coverImage[0].buffer;
      coverImageUrl = await uploadBuffer(imageBuffer, "book_images", "image");
    }

    const newBook = await Book.create({
      ...req.body,
      coverImg: {
        url: coverImageUrl.secure_url,
        public_id: coverImageUrl.public_id,
      },
    });

    res
      .status(200)
      .send({ message: "succesfully create a book", book: newBook });
  } catch (error) {
    console.error("Failed creating a book", error);
    res.status(500).send({ message: "Failed to create a book" });
  }
};

//Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).send(books);
  } catch (error) {
    console.error("Error fetching all books", error);
    res.status(500).send({ message: "Failed to fetch all books" });
  }
};

//Get single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    console.log(book);
    if (!book) {
      res.status(404).send({ message: "Book is not found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching book", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

//update a book
const updateABook = async (req, res) => {
  try {
    const { id } = req.params;

    const bookEdit = await Book.findById(id);

    if (!bookEdit) {
      res.status(404).send({ message: "Book is not found!" });
    }
    //Extract text fields for formdata
    const {
      title,
      description,
      author,
      category,
      trending,
      recommended,
      oldPrice,
      newPrice,
      pdf,
    } = req.body;

    let coverImageUrl = null;

    //if new cover-image upload, first delete old one then new file will upload.
    if (req.files?.coverImage?.length > 0) {
      if (bookEdit.coverImg?.public_id) {
        await cloudinary.uploader.destroy(bookEdit.coverImg.public_id);
      }
    }
    // New upload image to cloudinary
    if (req.files && req.files.coverImage) {
      const imageBuffer = req.files.coverImage[0].buffer;
      coverImageUrl = await uploadBuffer(imageBuffer, "book_images", "image");
    }

    //update fields
    // If title comes from client (form-data), then update it.

    // If title is NOT sent (undefined), keep the old one from the database.

    // So title ?? existing.title means:

    // If title is not null or undefined, use title.

    // Otherwise, keep existing.title.
    // console.log(coverImageUrl.secure_url, pdfFileUrl.secure_url);
    console.log(coverImageUrl.secure_url);

    bookEdit.title = title ?? bookEdit.title;
    bookEdit.description = description ?? bookEdit.description;
    bookEdit.author = author ?? bookEdit.author;
    bookEdit.category = category ?? bookEdit.category;
    bookEdit.trending = trending ?? bookEdit.trending;
    bookEdit.recommended = recommended ?? bookEdit.recommended;
    bookEdit.oldPrice = oldPrice ?? bookEdit.oldPrice;
    bookEdit.newPrice = newPrice ?? bookEdit.newPrice;
    bookEdit.pdf = pdf ?? bookEdit.pdf;

    if (coverImageUrl) {
      bookEdit.coverImg = {
        url: coverImageUrl.secure_url,
        public_id: coverImageUrl.public_id,
      };
    }

    //save changes
    await bookEdit.save();
    res
      .status(200)
      .send({ message: "book updated succesfully", book: bookEdit });
  } catch (error) {
    console.error("Error update book", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

//Delete a book
const deleteABook = async (req, res) => {
  try {
    const { id } = req.params;
    const bookDelete = await Book.findByIdAndDelete(id);
    //const bookDelete = await Book.findById(id);
    if (!bookDelete) {
      res.status(404).send({ message: "Book is not found!" });
    }

    //Delete image from cloudinary
    if (bookDelete.coverImg && bookDelete.coverImg.public_id) {
      await cloudinary.uploader.destroy(bookDelete.coverImg.public_id);
    }

    res
      .status(200)
      .send({ message: "book deleted succesfully", book: bookDelete });
  } catch (error) {
    console.error("Error delete book", error);
    res.status(500).send({ message: "Failed to delete a book" });
  }
};
module.exports = {
  postABook,
  getAllBooks,
  getSingleBook,
  updateABook,
  deleteABook,
};
