"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db initialization
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
/// db and models setup
const dbHost = process.env.DB_HOST, dbName = process.env.DB_NAME, dbUser = process.env.DB_USER, dbPass = process.env.DB_PASS;
class MongoDB {
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            const dbHost = process.env.DB_HOST, dbName = process.env.DB_NAME, dbUser = process.env.DB_USER, dbPass = process.env.DB_PASS;
            (() => __awaiter(this, void 0, void 0, function* () {
                const db = yield mongoose_1.default.connect(dbHost + '/' + dbName, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user: dbUser,
                    pass: dbPass
                });
                this.instance = db.connection;
            }))();
        }
        return this.instance;
    }
}
exports.default = MongoDB;
//db.createUser({ user: 'ru', pwd: 'NJT61wJvjrGtTT1H', roles: [{ role: 'readWrite', db: 'portfolio' }] });
