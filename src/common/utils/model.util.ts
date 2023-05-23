import { Modeler } from 'naming-conventions-modeler';
import { toPlain } from './tool.util';

export const Model = <T = any>(data: any) => Modeler.build<T>(data, 'snake_case');

export const PlainModel = <T = any>(data: any): T => Model<T>(toPlain<T>(data));

export const ConvertModel = <T = any>(data: any) => Modeler.convert<T>(data ? PlainModel(data) : null);
