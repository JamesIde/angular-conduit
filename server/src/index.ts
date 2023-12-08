import app from "./app";
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server started...");
  console.log(`Listening: port ${port} 🚀`);
  console.log(`Environment: ${process.env.NODE_ENV} 🐸`);
});
