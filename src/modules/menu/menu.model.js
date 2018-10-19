import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

const MenuSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
    },

    icon: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    uri: {
      type: String,
      trim: true,
    },
  }, { timestamps: true }
);
MenuSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken',
});

MenuSchema.pre(function (next) {
  this._slugify();
  next();
});

MenuSchema.methods = {
  _slugify() {
    this.slug = slug(this.productName);
  },
  toJSON() {
    return {
      _id: this._id,
      name: this.name,
      icon: this.icon,
      slug: this.slug,
      uri: this.uri,
    };
  },
};

MenuSchema.statics = {
  createMenu(args) {
    return this.create({
      ...args,
    });
  },
  list() {
    return this.find();
  },
};

export default mongoose.model('Menu', MenuSchema);
