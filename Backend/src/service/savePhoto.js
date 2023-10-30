const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const uuid = require("uuid");

const savePhoto = async (dataPhoto, dir) => {
  const img = sharp(dataPhoto.data);

  img.resize({ width: 500, withoutEnlargement: false });

  const photoNameUniq = `${uuid.v4()}_${dataPhoto.name}`;

  await img.toFile(
    path.join(__dirname, process.env.UPLOADS_DIRECTORY + dir, photoNameUniq)
  );

  return photoNameUniq;
};

module.exports = savePhoto;
