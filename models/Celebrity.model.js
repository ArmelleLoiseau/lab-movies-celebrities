//  Add your code here
const { model, Schema } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: String,
  catchPhrase: String,
});

const celebrityModel = model("celebrities", celebritySchema);

module.exports = celebrityModel;
