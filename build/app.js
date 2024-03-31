"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const routes_1 = require("./src/routes");
const express_1 = tslib_1.__importDefault(require("express"));
//variaves
const porta = 8080;
const app = (0, express_1.default)();
app.get('/api-docs', (req, res) => {
    res.redirect('https://www.youtube.com/watch?v=aQwCwVViAik&t=248s');
});
app.use(express_1.default.json());
app.use(routes_1.router);
app.listen(porta, () => {
    console.log(`localhost:${porta}`);
});
