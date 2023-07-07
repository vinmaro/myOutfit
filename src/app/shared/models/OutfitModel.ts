import { DressModel } from './DressModel';

export interface OutfitModel {
  id?: string;
  name: string;
  img: string;
  dressIds?: string[];
  dresses?: DressModel[];
}
