const app = require("./src/app");

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});