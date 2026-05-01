"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const view_router_1 = __importDefault(require("./routes/view.router"));
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const passport_middleware_1 = __importDefault(require("./middlewares/passport.middleware"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// process.cwd() returns the root folder where you run the 'node' command
const rootDir = process.cwd();
// Set views directory
app.set('views', path_1.default.join(rootDir, 'src/views'));
// Set static files directory
app.use(express_1.default.static(path_1.default.join(rootDir, 'public')));
app.use((0, cookie_parser_1.default)());
app.use(passport_middleware_1.default.initialize());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// app.set("views","/home/nilesh-kanjariya/Twitter/Twitter/src/views")
// app.use(express.static(path.join("/home/nilesh-kanjariya/Twitter/","public")))
app.use("/", view_router_1.default);
app.use("/auth", auth_router_1.default);
app.use("/user", passport_middleware_1.default.authenticate('jwt', { session: false }), user_router_1.default);
// app.use("/user",passport.authenticate('jwt',{session:false}),userRouter)
exports.default = app;
//# sourceMappingURL=app.js.map