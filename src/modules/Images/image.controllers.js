import cloudinary from 'cloudinary';
import * as uploadHelper from '../../helpers/upload.helper';

export const uploadImages = async (req, res, next) => {
  const links = await uploadHelper.uploadImages(req.files);
  console.log(links);
  // const images = [];
  // for (let index = 0; index < links.length; index++) {
  //   const link = links[index];
  //   const image = await Image.create({ thumb: link, origin: link });
  //   images.push(image);
  // }
  res.json(links);
};
