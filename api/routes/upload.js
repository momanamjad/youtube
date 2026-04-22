const router = require("express").Router();
const { upload, cloudinary } = require("../cloudinary");

router.post("/", upload.single("file"), async (req, res) => {
  try {
    console.log("req.file:", req.file);
    if (!req.file) {
      return res.status(400).json("No file received");
    }
    // multer-storage-cloudinary stores URL in req.file.path
    const url = req.file.path || req.file.secure_url;
    console.log("Cloudinary URL:", url);
    return res.status(200).json({ url: url });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    return res.status(500).json("Upload failed: " + error.message);
  }
});

module.exports = router;