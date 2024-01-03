import {
  findLastIndex,
  cloneDeep,
  remove,
  union,
  findKey,
  flatten,
  mapValues,
  mapKeys,
  uniqBy,
  groupBy,
  isEmpty,
  take,
  get,
  set,
  concat,
  range,
  isNil,
  isString,
  orderBy,
  debounce,
  pick,
  countBy,
  uniq,
  toNumber,
  find,
  intersection,
  intersectionBy,
  join,
  values,
  sortBy,
  isObject,
  isArray,
  unionBy,
  keyBy,
  template,
  isEqual,
  sortedUniqBy,
  sumBy,
  xor,
  omit,
  invert,
  every,
  partition,
  unset,
  difference,
  compact,
} from 'lodash';
export class LodashHelper {
  static get(...params: any) {
    return get(params[0], params[1], params[2]);
  }

  static set(...params: any) {
    return set(params[0], params[1], params[2]);
  }

  static isEmpty(...params: any) {
    return isEmpty(params[0]);
  }

  static isEqual(...params: any) {
    return isEqual(params[0], params[1]);
  }

  static isArray(...params: any) {
    return isArray(params[0]);
  }

  static concat(...params: any) {
    return concat(params);
  }

  static range(...params: any) {
    return range(params[0], params[1]);
  }

  static join(...params: any) {
    return join(params[0], params[1]);
  }

  static isNil(param: any) {
    return isNil(param);
  }

  static isString(param: any) {
    return isString(param);
  }

  static isObject(param: any) {
    return isObject(param);
  }

  static orderBy(...params: any) {
    return orderBy(params[0], params[1], params[2]);
  }

  static debounce(...params: any) {
    return debounce(params[0], params[1], params[2]);
  }

  static pick(...params: any) {
    return pick(params[0], params[1]);
  }

  static countBy(...params: any) {
    return countBy(params[0], params[1]);
  }

  static groupBy(...params: any) {
    return groupBy(params[0], params[1]);
  }

  static uniqBy(...params: any) {
    return uniqBy(params[0], params[1]);
  }

  static uniq(...params: any) {
    return uniq(params[0]);
  }

  static mapValues(...params: any) {
    return mapValues(params[0], params[1]);
  }

  static mapKeys(...params: any) {
    return mapKeys(params[0], params[1]);
  }

  static flatten(...params: any) {
    return flatten(params[0]);
  }

  static findKey(...params: any) {
    return findKey(params[0], params[1]);
  }

  static find(...params: any) {
    return find(params[0], params[1]);
  }

  static union(...params: any) {
    return union(...params);
  }

  static unionBy(...params: any) {
    return unionBy(params[0], params[1], params[2]);
  }

  static remove(...params: any) {
    return remove(params[0], params[1]);
  }

  static cloneDeep(...params: any) {
    return cloneDeep(params[0]);
  }

  static findLastIndex(...params: any) {
    return findLastIndex(params[0], params[1], params[2]);
  }

  static toNumber(param: any) {
    return toNumber(param);
  }

  static intersection(...params: any) {
    return intersection(...params);
  }

  static take(...params: any) {
    return take(params[0], params[1]);
  }

  static intersectionBy(...params: any) {
    return intersectionBy(params[0], params[1], params[2]);
  }

  static values(param: any) {
    return values(param);
  }

  static invert(param: any) {
    return invert(param);
  }

  static sortBy(...params: any) {
    return sortBy(params[0], params[1]);
  }

  static keyBy(...params: any) {
    return keyBy(params[0], params[1]);
  }

  static template(...params: any) {
    return template(params[0], params[1]);
  }

  static sortedUniqBy(...params: any) {
    return sortedUniqBy(params[0], params[1]);
  }

  static sumBy(...params: any) {
    return sumBy(params[0], params[1]);
  }

  static xor(...params: any) {
    return xor(params[0], params[1]);
  }

  static omit(...params: any) {
    return omit(params[0], params[1]);
  }

  static every(...params: any) {
    return every(params[0], params[1]);
  }

  static partition(...params: any) {
    return partition(params[0], params[1]);
  }

  static unset(...params: any) {
    return unset(params[0], params[1]);
  }

  static difference(...params: any) {
    return difference(params[0], params[1]);
  }

  static compact(...params: any) {
    return compact(params[0]);
  }
}
