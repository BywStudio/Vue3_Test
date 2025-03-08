const express = require("express");
const routerInit = require("./config/router");
const app = express();
const port = 9000;

const mongoose = require("mongoose");

// 验证 token
const { verifyJwt } = require("./utils/jwt");

// cors、body-parser
const cors = require("cors");
const bodyParser = require("body-parser");

// 要在 cors 之前使用
app.use(bodyParser.json());
app.use(cors());

// 验证 token 中间件
app.use(
  verifyJwt().unless({
    oath: ["/users/create", "/users/login"],
  })
);

// 使用 mongoDB
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

// 挂载路由
routerInit(app);

// 统一错误处理
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
  let err400 = ["ValidationError", "CastError", "BSONError", "MulterError"];
  let code = err400.includes(err.name) ? 400 : err.status || 500;
  if (err.name == "BSONError") {
    err.message = "ID错误";
  }
  res.status(code).send({
    name: err.name,
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`API 启动, 监听 http://localhost:9000 端口`);
});
