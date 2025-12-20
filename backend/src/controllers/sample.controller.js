const Sample = require('../models/sample.model');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const httpStatus = require('../constants/httpStatus');

const getSamples = async (req, res, next) => {
  try {
    const samples = await Sample.find();
    return res
      .status(httpStatus.OK)
      .json(new ApiResponse(httpStatus.OK, samples, 'Samples fetched successfully'));
  } catch (error) {
    return next(error);
  }
};

const createSample = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'Name is required'));
    }

    const sample = await Sample.create({ name });

    return res
      .status(httpStatus.CREATED)
      .json(new ApiResponse(httpStatus.CREATED, sample, 'Sample created successfully'));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getSamples,
  createSample,
};

