import { IEntity } from './model';

export function arrayToMap<T extends IEntity>(array: T[]): Map<string, T> {
  return Array.isArray(array)
    ? array.reduce((map: Map<string, T>, element: T) => {
      map.set(element.id.toString(), element);
      return map;
    }, new Map<string, T>())
    : new Map<string, T>();
}
