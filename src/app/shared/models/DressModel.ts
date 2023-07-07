import { ColorEnum } from '../enums/ColorEnum';
import { SeasonEnum } from '../enums/SeasonEnum';
import { DressTypeEnum } from '../enums/DressTypeEnum';
import { ClothesTypeEnum } from '../enums/ClothesTypeEnum';

export interface DressModel {
  id?: string;
  name?: string;
  color?: ColorEnum[];
  season?: SeasonEnum;
  dressType?: DressTypeEnum;
  clothesType?: ClothesTypeEnum;
  img?: string;
}
