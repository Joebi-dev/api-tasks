"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
//variavez
const router = (0, express_1.Router)();
exports.router = router;
const categoriesPath = (0, path_1.join)(__dirname, 'routes');
const categories = (0, fs_1.readdirSync)(categoriesPath);
//functions
async function registerRoutes() {
    try {
        for (const categorie of categories) {
            const routerPath = (0, path_1.join)(categoriesPath, categorie);
            const routesFiles = (0, fs_1.readdirSync)(routerPath).filter(file => file.endsWith('.js'));
            for (const file of routesFiles) {
                const filePath = (0, path_1.join)(routerPath, file);
                let routes = await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
                router[routes.type](routes.endpoint, (req, res) => {
                    routes.run(req, res);
                });
                console.log(`http://localhost:8080${routes.endpoint}`);
            }
        }
        console.log('^^^^^endpoints^^^^^');
    }
    catch (e) {
        console.log('erro, routes 22');
    }
}
registerRoutes();
