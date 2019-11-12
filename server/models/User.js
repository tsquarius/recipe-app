const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  facebookId: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "recipes"
    }
  ]
});

UserSchema.statics.isAuthor = async (userId, recipeId) => {
  const Recipe = mongoose.model("recipes");
  let hasAccess = false;
  const recipe = await Recipe.findById(recipeId);

  if (recipe.user._id.toString() === userId.toString()) {
    hasAccess = true;
  }
  return { hasAccess };
};

module.exports = mongoose.model("users", UserSchema);
