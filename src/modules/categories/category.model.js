import mongoose, { Schema } from 'mongoose';
import slug from 'slug';

const CategoriesSchema = new Schema({
  categoryName: {
    type: String,
    trim: true,
    required: [true, 'category name is required'],
    minlength: [2, 'category name need to be longer!'],
    unique: true,
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true,
  },
}, { timestamps: true });

CategoriesSchema.pre('validate', function (next) {
  this._slugify();
  next();
});

CategoriesSchema.methods = {
  _slugify() {
    this.slug = slug(this.categoryName);
  },
};

CategoriesSchema.statics = {
  createCategory(args) {
    return this.create({
      ...args,
    });
  },
  getList({ skip = 0, limit = 100 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  },
};
export default mongoose.model('Category', CategoriesSchema);
