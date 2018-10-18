import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

const MenuSchema = new Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, 'Product name is required'],
      minlength: [3, 'Product name need to be longer!'],
      unique: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      required: [true, 'Short Description is reuired'],
    },
    fullDescription: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    price: {
      type: Number,
      default: 0,
    },
    imageThumbnail: {
      type: String,
      trim: true,
    },
  }, { timestamps: true }
);
MenuSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken',
});

MenuSchema.pre('validate', function (next) {
  this._slugify();
  next();
});

MenuSchema.methods = {

  toJSON() {
    return {
      _id: this._id,
      productName: this.productName,
      price: this.price,
      slug: this.slug,
      category: this.category,
      createdAt: this.createdAt,
      shortDescription: this.shortDescription,
      fullDescription: this.fullDescription,
      imageThumbnail: this.imageThumbnail,
    };
  },
};

MenuSchema.statics = {
  createProduct(args) {
    return this.create({
      ...args,
    });
  },
  list() {
    return this.find();
  },
};

export default mongoose.model('Menu', MenuSchema);
