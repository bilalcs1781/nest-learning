import { v2 } from 'cloudinary';
import { CLOUDINARY } from '../constant';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): void => {
    v2.config({
      cloud_name: 'dmlhsdtwp',
      api_key: '134136877365189',
      api_secret: 'k5PP6X3mxxZtRqe99Xy-MCZ-rsU',
    });
  },
};
