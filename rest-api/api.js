const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const api = express();
const port = 3000;
const router = express.Router();

const produtoRouter = require('./router/produtoRouter');

api.use(cors());

api.use(bodyparser.urlencoded({ extended: true }));
api.use(bodyparser.json());

router.get("/", (req, res) => res.json({
    mensagem: 'API Online!'
}));

api.use('/', router);
api.use('/produto', produtoRouter);

api.listen(port);

console.log('Run API');