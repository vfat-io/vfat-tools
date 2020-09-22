// From https://webbjocke.com/javascript-check-data-types/

export function isBoolean(value) {
  return typeof value === 'boolean'
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

export function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

export function isFunction(value) {
  return typeof value === 'function'
}

export function isObject(value) {
  return Boolean(value) && typeof value === 'object' && value.constructor === Object
}

export function isNull(value) {
  return value === null
}

export function isUndefined(value) {
  return typeof value === 'undefined'
}

export function isRegExp(value) {
  return Boolean(value) && typeof value === 'object' && value.constructor === RegExp
}

export default {
  isBoolean,
  isString,
  isNumber,
  isArray,
  isFunction,
  isObject,
  isNull,
  isUndefined,
  isRegExp
}
