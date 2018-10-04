import cloudinary from 'cloudinary';

export const uploadImages = images => new Promise((resolve, reject) => {
  let imageCount = images.length,
    links = [];
  for (let index = 0; index < imageCount; index++) {
    const image = images[index];
    cloudinary.v2.uploader
      .upload_stream({ resource_type: 'raw' }, (error, result) => {
        if (result) {
          links.push(result.url);
          console.log(links);
          links.length === imageCount && resolve(links);
        } else if (error) {
          reject(error);
        }
      })
      .end(image.buffer);
  }
});
