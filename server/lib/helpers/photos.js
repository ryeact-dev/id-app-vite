const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function uploadedPhoto(file, photoUrl, desc, isESig) {
  // delete the current photo if the user uploaded a new photo file
  if (photoUrl) await deleteUserPhoto(photoUrl);

  if (!file) return null;

  const { dir, name, ext } = path.parse(file.path);
  const { path: filePath } = file;

  let newPath;
  if (isESig) {
    newPath = path.join(
      dir.replace('uploads\\img\\dummy', 'uploads\\img\\esign'),
      `${desc}${ext}.webp`
    );
  } else {
    newPath = path.join(
      dir.replace('uploads\\img\\dummy', 'uploads\\img\\photo'),
      `${desc}${ext}.webp`
    );
  }

  // Use sharp to resize and compress the image
  await sharp(filePath)
    .resize({ width: 800 })
    .webp({ quality: 50 })
    .toFile(newPath);

  // Check if the file exists before attempting to delete it
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error(`Error deleting file ${filePath}: ${err}`);
    }
  }

  // Store the new file path to the database
  let pathName = newPath.replace('uploads/img/photo', '');
  if (isESig) {
    pathName = newPath.replace('uploads/img/esign', '');
  }

  return pathName;
}

async function deleteUserPhoto(photoUrl) {
  fs.unlink(path.join(__dirname, '../', photoUrl), (err) => {
    if (err) {
      console.error(`Failed to delete image at ${photoUrl}: ${err.stack}`);
    }
  });
}

exports.uploadedPhoto = uploadedPhoto;
exports.deleteUserPhoto = deleteUserPhoto;
