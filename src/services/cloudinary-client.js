import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function CloudinaryService() {
  const CLOUDINARY_URL = 'http://api.cloudinary.com/v1_1/itchii/image/upload';
  const CLOUDINARY_FOLDER = 'images';
  const API_KEY = '818844929152828';
  const API_SECRET = 'r21vmQ3--IOkSUnHc_HNsibZQRQ';

  return {
    uploadImage(image, onProgress, onSuccess, onError) {
      const timestamp = ((Date.now() / 1000) | 0).toString();
      const public_id = timestamp;
      const hash_string = `folder=${CLOUDINARY_FOLDER}&public_id=${public_id}&timestamp=${timestamp}${API_SECRET}`;
      const signature = CryptoJS.SHA1(hash_string).toString();

      const formData = new FormData();
      formData.append('file', `data:image/jpg;base64,${image}`);
      formData.append('timestamp', timestamp);
      formData.append('api_key', API_KEY);
      formData.append('signature', signature);
      formData.append('public_id', public_id);
      formData.append('folder', CLOUDINARY_FOLDER);

      axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData,
        onUploadProgress: onProgress
      })
        .then(onSuccess)
        .catch(onError);
    }
  };
}