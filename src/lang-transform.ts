import { Transform } from 'class-transformer';
import { getRepository } from 'typeorm';

// export function TransformLang() {
//   return Transform((f) => {});
// }

export const hashPass = async (dto) => {
  return await getRepository('Language').findOne({
    id: dto['langId'],
  });
};
