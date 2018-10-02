import mongoose, { Schema } from 'mongoose';
import slug from 'slug';
import uniqueValidator from 'mongoose-unique-validator';

const ProductSchema = new Schema(
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
ProductSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken',
});

ProductSchema.pre('validate', function (next) {
  this._slugify();
  next();
});

ProductSchema.methods = {
  _slugify() {
    this.slug = slug(this.productName);
  },
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

ProductSchema.statics = {
  createProduct(args) {
    return this.create({
      ...args,
    });
  },
  list({ skip = 0, limit = 5 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('category');
  },
};

export default mongoose.model('Product', ProductSchema);
