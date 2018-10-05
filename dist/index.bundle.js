module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("cloudinary");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://hungtran:Abc123456@ds119663.mlab.com:19663/shopdb',
  JWT_SECRET: 'abcxyz'
};

const testConfig = {
  // MONGO_URL: 'mongodb://localhost/shopdb',
};

const prodConfig = {
  // MONGO_URL: 'mongodb://localhost/shopdb',
};

const defaultConfig = {
  PORT: process.env.PORT || 9000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.getProductByCategoryId = getProductByCategoryId;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _product = __webpack_require__(21);

var _product2 = _interopRequireDefault(_product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createProduct(req, res) {
  try {
    const product = await _product2.default.createProduct(req.body);
    return res.status(_httpStatus2.default.CREATED).json(product);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function getProducts(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const posts = await _product2.default.list({ limit, skip });
    return res.status(_httpStatus2.default.OK).json(posts);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function getProductById(req, res) {
  try {
    const product = await _product2.default.findById(req.params.id);
    return res.status(_httpStatus2.default.OK).json(product);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function getProductByCategoryId(req, res) {
  try {
    const param = {
      category: req.params.id
    };
    const product = await _product2.default.find(param);
    return res.status(_httpStatus2.default.OK).json(product);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function updateProduct(req, res) {
  try {
    const product = await _product2.default.findById(req.params.id);
    if (!product) {
      return res.sendStatus(_httpStatus2.default.NOT_FOUND);
    }

    Object.keys(req.body).forEach(key => {
      product[key] = req.body[key];
    });

    return res.status(_httpStatus2.default.OK).json((await product.save()));
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await _product2.default.findById(req.params.id);

    if (!product) {
      return res.sendStatus(_httpStatus2.default.NOT_FOUND);
    }

    await product.remove();
    return res.sendStatus(_httpStatus2.default.OK);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const cloudinaryName = exports.cloudinaryName = 'hungta';
const cloudinaryApiKey = exports.cloudinaryApiKey = '321179781998973';
const cloudinaryApiSecret = exports.cloudinaryApiSecret = '2tsFFm1vaHIEDPBxvoiyWjyV99I';

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Remove the warning with Promise
/* eslint-disable no-console */
_mongoose2.default.Promise = global.Promise;

// Connect the db with the url provider
try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (error) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => console.log('Mongo DB Running')).on('error', e => {
  throw e;
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(28);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(24);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(25);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(26);

var _helmet2 = _interopRequireDefault(_helmet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }

  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _category = __webpack_require__(19);

var _category2 = _interopRequireDefault(_category);

var _product = __webpack_require__(22);

var _product2 = _interopRequireDefault(_product);

var _image = __webpack_require__(16);

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/categories', _category2.default);
  app.use('/api/v1/products', _product2.default);
  app.use('/api/v1/images', _image2.default);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadStorageCloudinary = undefined;

var _cloudinary = __webpack_require__(1);

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UploadStorageCloudinary = exports.UploadStorageCloudinary = files => new Promise((resolve, reject) => {
  const arrayFile = [];

  if (files.length <= 0) {
    reject('Not file');
  }

  files.map((file, index) => {
    const nameFile = `${Date.now()}${index}`;

    const resourceType = file.mimetype.includes('image') ? 'image' : 'video';

    _cloudinary2.default.v2.uploader.upload_stream({ resourceType: 'raw' }, (error, result) => {
      if (error) {
        reject(result);
      }

      const url = result.secure_url;
      arrayFile.push({
        _id: nameFile.toString(),
        url,
        type: file.mimetype
      });

      if (arrayFile.length === files.length) {
        resolve(arrayFile);
      }
    }, { resourceType }).end(file.buffer);
  });
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(3);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(10);

var _middlewares = __webpack_require__(11);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(12);

var _modules2 = _interopRequireDefault(_modules);

var _cloudinary = __webpack_require__(1);

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _cloudinary3 = __webpack_require__(9);

var cloudinaryConfig = _interopRequireWildcard(_cloudinary3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); /* eslint-disable no-console */

(0, _middlewares2.default)(app);

// configure cloudinary
_cloudinary2.default.config({
  cloud_name: cloudinaryConfig.cloudinaryName,
  api_key: cloudinaryConfig.cloudinaryApiKey,
  api_secret: cloudinaryConfig.cloudinaryApiSecret
});

app.get('/', (req, res) => {
  res.send('Hello HungTA.');
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
            Server running on port: ${_constants2.default.PORT}
            ------------
            Running on ${process.env.NODE_ENV}
            ------------
            Make something great !
        `);
  }
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadImages = undefined;

var _upload = __webpack_require__(13);

var uploadHelper = _interopRequireWildcard(_upload);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const uploadImages = exports.uploadImages = async (req, res) => {
  const { files } = req;

  try {
    if (files.length > 0) {
      const response = await uploadHelper.UploadStorageCloudinary(files);
      return res.status(200).send(response);
    }

    return res.status(400).send({
      status: 'File required'
    });
  } catch (error) {
    return res.status(400).send({
      status: error.error.message
    });
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _image = __webpack_require__(15);

var imagesController = _interopRequireWildcard(_image);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const multer = __webpack_require__(29);

const storage = multer.memoryStorage();
const parser = multer({ storage });

const routes = new _express.Router();
routes.post('/', parser.array('images', 10), imagesController.uploadImages);

exports.default = routes;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.getById = getById;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;

var _httpStatus = __webpack_require__(6);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _category = __webpack_require__(18);

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
async function createCategory(req, res) {
  try {
    const category = await _category2.default.createCategory(req.body);
    return res.status(_httpStatus2.default.CREATED).json(category);
  } catch (error) {
    console.log(error);
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function getCategories(req, res) {
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);

  try {
    const categories = await _category2.default.getList({ limit, skip });
    return res.status(_httpStatus2.default.OK).json(categories);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function getById(req, res) {
  try {
    const category = await _category2.default.findById(req.params.id);
    return res.status(_httpStatus2.default.OK).json(category);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function updateCategory(req, res) {
  try {
    const category = await _category2.default.findById(req.params.id);
    if (!category) {
      return res.sendStatus(_httpStatus2.default.NOT_FOUND);
    }
    Object.keys(req.body).forEach(key => {
      category[key] = req.body[key];
    });
    return res.status(_httpStatus2.default.OK).json((await category.save()));
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

async function deleteCategory(req, res) {
  try {
    const category = await _category2.default.findById(req.params.id);
    if (!category) {
      return res.sendStatus(_httpStatus2.default.NOT_FOUND);
    }

    await category.remove();
    return res.sendStatus(_httpStatus2.default.OK);
  } catch (error) {
    return res.status(_httpStatus2.default.BAD_REQUEST).json(error);
  }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _slug = __webpack_require__(8);

var _slug2 = _interopRequireDefault(_slug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CategoriesSchema = new _mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    required: [true, 'category name is required'],
    minlength: [2, 'category name need to be longer!'],
    unique: true
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  }
}, { timestamps: true });

CategoriesSchema.pre('validate', function (next) {
  this._slugify();
  next();
});

CategoriesSchema.methods = {
  _slugify() {
    this.slug = (0, _slug2.default)(this.categoryName);
  }
};

CategoriesSchema.statics = {
  createCategory(args) {
    return this.create(Object.assign({}, args));
  },
  getList({ skip = 0, limit = 100 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  }
};
exports.default = _mongoose2.default.model('Category', CategoriesSchema);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(5);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _category = __webpack_require__(17);

var categoriesController = _interopRequireWildcard(_category);

var _product = __webpack_require__(4);

var productsController = _interopRequireWildcard(_product);

var _category2 = __webpack_require__(20);

var _category3 = _interopRequireDefault(_category2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();
routes.post('/', (0, _expressValidation2.default)(_category3.default.createCategories), categoriesController.createCategory);
routes.get('/', categoriesController.getCategories);
routes.get('/:id', categoriesController.getById);
routes.get('/:id/products', productsController.getProductByCategoryId);
routes.patch('/:id', (0, _expressValidation2.default)(_category3.default.updateCategories), categoriesController.updateCategory);
routes.delete('/:id', categoriesController.deleteCategory);

exports.default = routes;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(7);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createCategories: {
    body: {
      categoryName: _joi2.default.string().min(2).required()
    }
  },
  updateCategories: {
    body: {
      categoryName: _joi2.default.string().min(2).required()
    }
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _slug = __webpack_require__(8);

var _slug2 = _interopRequireDefault(_slug);

var _mongooseUniqueValidator = __webpack_require__(27);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ProductSchema = new _mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: [true, 'Product name is required'],
    minlength: [3, 'Product name need to be longer!'],
    unique: true
  },
  shortDescription: {
    type: String,
    trim: true,
    required: [true, 'Short Description is reuired']
  },
  fullDescription: {
    type: String,
    trim: true
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  },
  category: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  price: {
    type: Number,
    default: 0
  },
  imageThumbnail: {
    type: String,
    trim: true
  }
}, { timestamps: true });
ProductSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} already taken'
});

ProductSchema.pre('validate', function (next) {
  this._slugify();
  next();
});

ProductSchema.methods = {
  _slugify() {
    this.slug = (0, _slug2.default)(this.productName);
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
      imageThumbnail: this.imageThumbnail
    };
  }
};

ProductSchema.statics = {
  createProduct(args) {
    return this.create(Object.assign({}, args));
  },
  list({ skip = 0, limit = 5 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category');
  }
};

exports.default = _mongoose2.default.model('Product', ProductSchema);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _expressValidation = __webpack_require__(5);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _product = __webpack_require__(4);

var productsController = _interopRequireWildcard(_product);

var _product2 = __webpack_require__(23);

var _product3 = _interopRequireDefault(_product2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express.Router();
routes.post('/', (0, _expressValidation2.default)(_product3.default.createProduct), productsController.createProduct);
routes.get('/', productsController.getProducts);
routes.get('/:id', productsController.getProductById);
routes.put('/:id', productsController.updateProduct);
routes.delete('/:id', productsController.deleteProduct);

exports.default = routes;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(7);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createProduct: {
    body: {
      productName: _joi2.default.string().min(3).required(),
      shortDescription: _joi2.default.string().required(),
      fullDescription: _joi2.default.string()
    }
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("multer");

/***/ })
/******/ ]);