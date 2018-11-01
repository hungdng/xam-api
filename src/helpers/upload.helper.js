import cloudinary from 'cloudinary';

export const UploadStorageCloudinary = (files) => new Promise((resolve, reject) => {
  const arrayFile = [];

  if (files.length <= 0) { reject('Not file'); }

  files.map((file, index) => {
    const nameFile = `${Date.now()}${index}`;

    const resourceType = file.mimetype
      .includes('image') ? 'image' : 'video';

    cloudinary.v2.uploader.upload_stream({ resourceType: 'raw' },
      (error, result) => {
        if (error) { console.log(result); reject(result); }

        const ver ="v" + result.version;
        const url = result.secure_url;
        const thumb = url.replace(ver, "w_200")
        arrayFile.push({
          _id: nameFile.toString(),
          url,
          thumb,
          type: file.mimetype,
        });

        if (arrayFile.length === (files.length)) { resolve(arrayFile); }
      }, { resourceType }
    ).end(file.buffer);
  });
});
