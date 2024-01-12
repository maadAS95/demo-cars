const fs = require("fs");
const path = require("path");
const createQueryParams = (param) => {
  try {
    const { brand, model, year, price } = param;
    const query = {};
    if (brand) {
      query.brand = new RegExp(brand, "i");
    }
    if (model) {
      query.model = new RegExp(model, "i");
    }
    if (year) {
      query.year = parseInt(year);
    }

    if (price) {
      query.price = parseInt(price);
    }

    return query;
  } catch (error) {
    console.error(error, "errorCreateQuery..");
    return {};
  }
};

const handleResponse = (status) => {
  const responseCode = {
    errorCode: status != 200 ? -1 : 0,
    status: status != 200 ? 400 : 201,
  };
  return responseCode;
};

const checkFileDirectory = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + "/" + file;
    });
  } else fs.mkdirSync(path, { recursive: true });
};

const handleUploadFiles = async (file) => {
  try {
    const upload_folder = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      "images"
    );
    await checkFileDirectory(upload_folder);
    let fileName = await file.name;
    const [finalName, extension] = fileName.split(".");
    fileName = finalName + "_" + new Date().getTime() + "." + extension;
    const FileURL = path.join(upload_folder, fileName);
    fs.writeFileSync(FileURL, file.data);
    return FileURL.split("uploads")[1];
  } catch (error) {
    console.error(error, "errorsave...");
    return null;
  }
};

const deleteFile = async (filePath) => {
  try {
    const upload_folder = path.join(__dirname, "..", "public", "uploads");
    console.log(upload_folder + filePath);
    fs.unlinkSync(upload_folder + filePath);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
    return;
  }
};

module.exports = {
  createQueryParams,
  handleResponse,
  handleUploadFiles,
  deleteFile,
};
