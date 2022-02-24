const log = require('loglevel');
const convertStringToUuid = require('uuid-by-string');

const {
  createDeviceConfiguration,
  DeviceConfiguration,
} = require('../models/DeviceConfiguration');

const deviceConfigurationPost = async function (req, res, next) {
  log.log('/device_configurations');
  try {
    await createDeviceConfiguration(DeviceConfiguration(req.body));
    log.log('/device_configurations done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

const LegacyDevicePost = async function (req, res, next) {
  log.log('/v1/device');
  try {
    const {
      device_identifier,
      app_version,
      app_build,
      manufacturer,
      brand,
      model,
      hardware,
      device,
      serial,
      androidRelease,
      androidSdkVersion,
    } = req.body;
    await createDeviceConfiguration(
      DeviceConfiguration({
        id: convertStringToUuid(device_identifier),
        device_identifier,
        app_version,
        app_build: `${app_build}`, // convert to string
        manufacturer,
        brand,
        model,
        hardware,
        device,
        serial,
        os_version: androidRelease,
        sdk_version: `${androidSdkVersion}`, // convert to string
      }),
    );
    log.log('/v1/device done');
    res.status(200).json();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  deviceConfigurationPost,
  LegacyDevicePost,
};
