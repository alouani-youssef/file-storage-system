const Router = require('express').Router;
const router = new Router();
const path = require('path');
const fs = require('fs');
const multerConfig = require('../utils/index');
const DEFAULT_LOCATIONS = {
    MAIN:path.join(__dirname,'..', 'media'),
    REPLICATION:path.join(__dirname,'..', 'replica'),
}
const mainStorageSystem = multerConfig(DEFAULT_LOCATIONS.MAIN);
const replicaStorageSystem = multerConfig(DEFAULT_LOCATIONS.REPLICATION);
const handlerController = require('./handler.controller');

router.post('/',mainStorageSystem.single('file'),replicaStorageSystem.single('file'),handlerController.addFile);
router.post('/multiple',mainStorageSystem.array('files'),replicaStorageSystem.array('files'),handlerController.addFiles);
router.get('/file/:id',handlerController.getMedia);
router.get('/:id',handlerController.getFileById);
module.exports = router