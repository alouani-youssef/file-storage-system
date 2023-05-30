const handlerService = require("./handler.service");
const DTOs = require("../../utils/dtos");
const RESPONSE_VERSION = "0.0.1";
const RESPONSE_MESSAGES = {
  BAD: "BAD REQUEST,CHECK MEDIA ID AND CHECK YOUR KEY",
};
const HTTP_CODES = {
  DONE: 200,
  EMPTY: 204,
  CREATED: 201,
  BAD: 400,
  NOT_AUTHORIZED: 401,
};
const DEFAULT_VALUES = {
  NOT_DEFINED: undefined,
  FALSE: "false",
  TRUE: "true",
};

/**
 * @function getFileById
 * @description
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.getFileById = async function (req, res, next) {
  try {
    if (!req.query.id) {
      throw new Error("NO QUERY IS PROVIDED");
    }
    const media = await handlerService.getFile(req.query.id, req.query.key);
    if (media) {
      res.status(HTTP_CODES.DONE);
      res.json({
        success: true,
        version: RESPONSE_VERSION,
        data: DTOs.getMediaDataDTO(media),
      });
    } else {
      throw new Error("Error while saving media to DB");
    }
  } catch (error) {
    console.error("error", error);
    res.status(HTTP_CODES.BAD);
    res.json({ error: RESPONSE_MESSAGES.BAD, version: RESPONSE_VERSION });
  }
};

exports.addFile = async function (req, res, next) {
  try {
    if (req.query.isPublic === DEFAULT_VALUES.NOT_DEFINED) {
      req.query.isPublic = true;
    }
    if (req.query.isPublic === DEFAULT_VALUES.FALSE) {
      req.query.isPublic = false;
    }
    if (req.query.isPublic === DEFAULT_VALUES.TRUE) {
      req.query.isPublic = true;
    }
    const isPublic = Boolean(req.query.isPublic);
    const media = await handlerService.addMedia(req.file.filename, isPublic);
    if (media) {
      res.status(HTTP_CODES.DONE);
      res.json({
        success: true,
        version: RESPONSE_VERSION,
        data: DTOs.getMediaDataDTO(media),
      });
    } else {
      throw new Error("Error while saving media to DB");
    }
  } catch (error) {
    res.status(HTTP_CODES.BAD);
    res.json({ error: RESPONSE_MESSAGES.BAD, version: RESPONSE_VERSION });
  }
};

exports.addFiles = async function (req, res, next) {
  try {
    const medias = Promise.all(
      req.files.map((file) => {
        return handlerService.addMedia(file.filename, false);
      })
    );
    if (medias) {
      res.status(HTTP_CODES.DONE);
      res.json({ success: true, version: RESPONSE_VERSION, data: medias });
    } else {
      throw new Error("Error while saving media to DB");
    }
  } catch (error) {
    res.status(HTTP_CODES.BAD);
    res.json({ error: RESPONSE_MESSAGES.BAD, version: RESPONSE_VERSION });
  }
};
exports.getMedia = async function (req, res, next) {
  try {
    const { id, key } = req.query;
    if (!id) {
      throw new Error("NO ID IS PROVIDED");
    }
    const media = await handlerService.getMediaLocation(id.toString(), key);
    if (media) {
      if (req.query && req.query.download) {
        res.download(media.fileLocation, media.fileName);
      } else {
        res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600') // one year of cache
        res.sendFile(media.fileLocation);
      }
    } else {
      res.status(HTTP_CODES.EMPTY);
      res.json({});
    }
  } catch (error) {
    res.status(HTTP_CODES.BAD);
    res.json({ error: RESPONSE_MESSAGES.BAD, version: RESPONSE_VERSION });
  }
};
