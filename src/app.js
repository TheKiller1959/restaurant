//? Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const multer = require('multer');
//? Import files
const config = require('./config');
const userRouter = require('./users/users.routes').router
const authRouter = require('./auth/auth.routes').router
const customerRouter = require('./customers/customers.routes').router
const swaggerJson = require('./users/swagger.json');
const { transporter } = require('./tools/email');


//? Initial configuration
const app = express();

//* Enable incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//? Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
});

const upload = multer({ storage });

//? Morgan configuration
if (config.nodeEnv === 'development') {
  app.use(morgan("dev"))
} else {
  app.use(morgan("combined"))
};

//* Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/customers", customerRouter);
// app.get("/test", (req, res) => {
//   console.log(req.query)
//   res.status(200).json(req.query)
// })

//? Swagger configuration
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

//* Endpoint for testing email
app.get('/email', (req, res) => {
  transporter.sendMail({
    subject: 'Este es mi hola mundo',
    text: 'Hello world!',
    html: '<h1>Hello world!</h1> <img src="https://i.imgur.com/f33c3x9.jpeg" width=100/>',
    to: 'kami.cali9026@gmail.com',
    from: 'thekiller1959yt@gmail.com'
  })
  res.status(200).json({
    message: 'Email sent'
  })
});

//* Endpoint for testing upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.status(201).send(req.file)
  } catch (error) {
    res.status(400).json({ message: 'File not found' })
  }
});

app.get('/files/:name', (req, res) => {
  res.sendFile(__dirname + `/uploads/${req.params.name}`)
});

//? Server configuration
app.listen(config.port, () => {
  console.log(`Server started at port ${config.port}`)
});

module.exports = {
  app
};