import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getDatauri = (file) => {
    // path.extname extracts '.pdf', '.jpg', etc., so the buffer parses perfectly
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
};

export default getDatauri;