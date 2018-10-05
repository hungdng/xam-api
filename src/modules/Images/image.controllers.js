import * as uploadHelper from '../../helpers/upload.helper';

export const uploadImages = async (req, res) => {
  const { files } = req;

  try {
    if (files.length > 0) {
      const response = await uploadHelper.UploadStorageCloudinary(files);
      return res.status(200).send(response);
    }

    return res.status(400).send({
      status: 'File required',
    });
  } catch (error) {
    return res.status(400).send({
      status: error.error.message,
    });
  }
};
