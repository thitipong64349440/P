const express = require('express');
const {Image} = require('../models');
const multer = require('multer');

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedFileTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type');
    error.code = 'INCORRECT_FILE_TYPES';
    return cb(error, false);
  }
  cb(null, true);
}

module.exports = {
  async uploadImage(req, res) {
    const file = req.file;

    try {
      const image = await Image.create({
        files: file,
        name: file.originalname,
        data: file.buffer
      });
      const result = await image.save();
      return res.status(201).json({message: 'Image uploaded successfully'});
    }
    catch (err) {
      console.log(err);
    }
  }
}