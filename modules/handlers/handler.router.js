const Router = require('express').Router;
const router = new Router();
const multerConfig = require('../../utils/index');
const { DEFAULT_LOCATIONS } = require('../../config')


const replicaStorageSystem = multerConfig(DEFAULT_LOCATIONS.REPLICATION);
const mainStorageSystem = multerConfig(DEFAULT_LOCATIONS.MAIN);
const handlerController = require('./handler.controller');

router.post('/multiple',mainStorageSystem.array('files'),replicaStorageSystem.array('files'),handlerController.addFiles);
router.post('/',mainStorageSystem.single('file'),replicaStorageSystem.single('file'),handlerController.addFile);
router.get('/file/',handlerController.getMedia);
router.get('/',handlerController.getFileById);

module.exports = router