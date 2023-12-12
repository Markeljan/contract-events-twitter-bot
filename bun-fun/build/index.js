var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = (id) => {
  return import.meta.require(id);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/abitype/dist/esm/regex.js
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
var init_regex = __esm(() => {
});

// node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js
function formatAbiParameter(abiParameter) {
  let type = abiParameter.type;
  if (tupleRegex.test(abiParameter.type) && "components" in abiParameter) {
    type = "(";
    const length = abiParameter.components.length;
    for (let i = 0;i < length; i++) {
      const component = abiParameter.components[i];
      type += formatAbiParameter(component);
      if (i < length - 1)
        type += ", ";
    }
    const result = execTyped(tupleRegex, abiParameter.type);
    type += `)${result?.array ?? ""}`;
    return formatAbiParameter({
      ...abiParameter,
      type
    });
  }
  if ("indexed" in abiParameter && abiParameter.indexed)
    type = `${type} indexed`;
  if (abiParameter.name)
    return `${type} ${abiParameter.name}`;
  return type;
}
var tupleRegex;
var init_formatAbiParameter = __esm(() => {
  init_regex();
  tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
});

// node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js
function formatAbiParameters(abiParameters) {
  let params = "";
  const length = abiParameters.length;
  for (let i = 0;i < length; i++) {
    const abiParameter = abiParameters[i];
    params += formatAbiParameter(abiParameter);
    if (i !== length - 1)
      params += ", ";
  }
  return params;
}
var init_formatAbiParameters = __esm(() => {
  init_formatAbiParameter();
});

// node_modules/abitype/dist/esm/human-readable/formatAbiItem.js
function formatAbiItem(abiItem) {
  if (abiItem.type === "function")
    return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
  else if (abiItem.type === "event")
    return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  else if (abiItem.type === "error")
    return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  else if (abiItem.type === "constructor")
    return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  else if (abiItem.type === "fallback")
    return "fallback()";
  return "receive() external payable";
}
var init_formatAbiItem = __esm(() => {
  init_formatAbiParameters();
});

// node_modules/abitype/dist/esm/index.js
var init_esm = __esm(() => {
  init_formatAbiItem();
});

// node_modules/viem/_esm/utils/abi/formatAbiItem.js
function formatAbiItem2(abiItem, { includeName = false } = {}) {
  if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
    throw new InvalidDefinitionTypeError(abiItem.type);
  return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
}
function formatAbiParams(params, { includeName = false } = {}) {
  if (!params)
    return "";
  return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
}
var formatAbiParam;
var init_formatAbiItem2 = __esm(() => {
  init_abi();
  formatAbiParam = function(param, { includeName }) {
    if (param.type.startsWith("tuple")) {
      return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
    }
    return param.type + (includeName && param.name ? ` ${param.name}` : "");
  };
});

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm(() => {
});

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm(() => {
  init_isHex();
});

// node_modules/viem/_esm/errors/version.js
var version;
var init_version = __esm(() => {
  version = "1.19.10";
});

// node_modules/viem/_esm/errors/utils.js
var getContractAddress, getUrl, getVersion;
var init_utils = __esm(() => {
  init_version();
  getContractAddress = (address) => address;
  getUrl = (url) => url;
  getVersion = () => `viem@${version}`;
});

// node_modules/viem/_esm/errors/base.js
class BaseError extends Error {
  constructor(shortMessage, args = {}) {
    super();
    Object.defineProperty(this, "details", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "docsPath", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "metaMessages", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "shortMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ViemError"
    });
    Object.defineProperty(this, "version", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: getVersion()
    });
    const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
    const docsPath = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
    this.message = [
      shortMessage || "An error occurred.",
      "",
      ...args.metaMessages ? [...args.metaMessages, ""] : [],
      ...docsPath ? [
        `Docs: https://viem.sh${docsPath}.html${args.docsSlug ? `#${args.docsSlug}` : ""}`
      ] : [],
      ...details ? [`Details: ${details}`] : [],
      `Version: ${this.version}`
    ].join("\n");
    if (args.cause)
      this.cause = args.cause;
    this.details = details;
    this.docsPath = docsPath;
    this.metaMessages = args.metaMessages;
    this.shortMessage = shortMessage;
  }
  walk(fn) {
    return walk(this, fn);
  }
}
var walk;
var init_base = __esm(() => {
  init_utils();
  walk = function(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err)
      return walk(err.cause, fn);
    return fn ? null : err;
  };
});

// node_modules/viem/_esm/errors/abi.js
class AbiConstructorNotFoundError extends BaseError {
  constructor({ docsPath }) {
    super([
      "A constructor was not found on the ABI.",
      "Make sure you are using the correct ABI and that the constructor exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiConstructorNotFoundError"
    });
  }
}

class AbiConstructorParamsNotFoundError extends BaseError {
  constructor({ docsPath }) {
    super([
      "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
      "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiConstructorParamsNotFoundError"
    });
  }
}

class AbiDecodingDataSizeTooSmallError extends BaseError {
  constructor({ data, params, size: size3 }) {
    super([`Data size of ${size3} bytes is too small for given parameters.`].join("\n"), {
      metaMessages: [
        `Params: (${formatAbiParams(params, { includeName: true })})`,
        `Data:   ${data} (${size3} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiDecodingDataSizeTooSmallError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "params", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "size", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = data;
    this.params = params;
    this.size = size3;
  }
}

class AbiDecodingZeroDataError extends BaseError {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.');
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiDecodingZeroDataError"
    });
  }
}

class AbiEncodingArrayLengthMismatchError extends BaseError {
  constructor({ expectedLength, givenLength, type }) {
    super([
      `ABI encoding array length mismatch for type ${type}.`,
      `Expected length: ${expectedLength}`,
      `Given length: ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEncodingArrayLengthMismatchError"
    });
  }
}

class AbiEncodingBytesSizeMismatchError extends BaseError {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEncodingBytesSizeMismatchError"
    });
  }
}

class AbiEncodingLengthMismatchError extends BaseError {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding params/values length mismatch.",
      `Expected length (params): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEncodingLengthMismatchError"
    });
  }
}

class AbiErrorSignatureNotFoundError extends BaseError {
  constructor(signature, { docsPath }) {
    super([
      `Encoded error signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the error exists on it.",
      `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiErrorSignatureNotFoundError"
    });
    Object.defineProperty(this, "signature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.signature = signature;
  }
}

class AbiEventSignatureEmptyTopicsError extends BaseError {
  constructor({ docsPath }) {
    super("Cannot extract event signature from empty topics.", {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEventSignatureEmptyTopicsError"
    });
  }
}

class AbiEventSignatureNotFoundError extends BaseError {
  constructor(signature, { docsPath }) {
    super([
      `Encoded event signature "${signature}" not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it.",
      `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEventSignatureNotFoundError"
    });
  }
}

class AbiEventNotFoundError extends BaseError {
  constructor(eventName, { docsPath } = {}) {
    super([
      `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the event exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiEventNotFoundError"
    });
  }
}

class AbiFunctionNotFoundError extends BaseError {
  constructor(functionName, { docsPath } = {}) {
    super([
      `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiFunctionNotFoundError"
    });
  }
}

class AbiFunctionOutputsNotFoundError extends BaseError {
  constructor(functionName, { docsPath }) {
    super([
      `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
      "Cannot decode function result without knowing what the parameter types are.",
      "Make sure you are using the correct ABI and that the function exists on it."
    ].join("\n"), {
      docsPath
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiFunctionOutputsNotFoundError"
    });
  }
}

class BytesSizeMismatchError extends BaseError {
  constructor({ expectedSize, givenSize }) {
    super(`Expected bytes${expectedSize}, got bytes${givenSize}.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BytesSizeMismatchError"
    });
  }
}

class DecodeLogDataMismatch extends BaseError {
  constructor({ abiItem, data, params, size: size3 }) {
    super([
      `Data size of ${size3} bytes is too small for non-indexed event parameters.`
    ].join("\n"), {
      metaMessages: [
        `Params: (${formatAbiParams(params, { includeName: true })})`,
        `Data:   ${data} (${size3} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "DecodeLogDataMismatch"
    });
    Object.defineProperty(this, "abiItem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "params", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "size", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.abiItem = abiItem;
    this.data = data;
    this.params = params;
    this.size = size3;
  }
}

class DecodeLogTopicsMismatch extends BaseError {
  constructor({ abiItem, param }) {
    super([
      `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem2(abiItem, { includeName: true })}".`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "DecodeLogTopicsMismatch"
    });
    Object.defineProperty(this, "abiItem", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.abiItem = abiItem;
  }
}

class InvalidAbiEncodingTypeError extends BaseError {
  constructor(type, { docsPath }) {
    super([
      `Type "${type}" is not a valid encoding type.`,
      "Please provide a valid ABI type."
    ].join("\n"), { docsPath });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiEncodingType"
    });
  }
}

class InvalidAbiDecodingTypeError extends BaseError {
  constructor(type, { docsPath }) {
    super([
      `Type "${type}" is not a valid decoding type.`,
      "Please provide a valid ABI type."
    ].join("\n"), { docsPath });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAbiDecodingType"
    });
  }
}

class InvalidArrayError extends BaseError {
  constructor(value) {
    super([`Value "${value}" is not a valid array.`].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidArrayError"
    });
  }
}

class InvalidDefinitionTypeError extends BaseError {
  constructor(type) {
    super([
      `"${type}" is not a valid definition type.`,
      'Valid types: "function", "event", "error"'
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidDefinitionTypeError"
    });
  }
}
var init_abi = __esm(() => {
  init_formatAbiItem2();
  init_size();
  init_base();
});

// node_modules/viem/_esm/errors/data.js
class SliceOffsetOutOfBoundsError extends BaseError {
  constructor({ offset, position, size: size3 }) {
    super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size3}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SliceOffsetOutOfBoundsError"
    });
  }
}

class SizeExceedsPaddingSizeError extends BaseError {
  constructor({ size: size3, targetSize, type }) {
    super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size3}) exceeds padding size (${targetSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SizeExceedsPaddingSizeError"
    });
  }
}
var init_data = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size3 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size3 });
  return padBytes(hexOrBytes, { dir, size: size3 });
}
function padHex(hex_, { dir, size: size3 = 32 } = {}) {
  if (size3 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size3 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size3,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size3 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size3 = 32 } = {}) {
  if (size3 === null)
    return bytes;
  if (bytes.length > size3)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size3,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size3);
  for (let i = 0;i < size3; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size3 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm(() => {
  init_data();
});

// node_modules/viem/_esm/errors/encoding.js
class IntegerOutOfRangeError extends BaseError {
  constructor({ max, min, signed, size: size3, value }) {
    super(`Number "${value}" is not in safe ${size3 ? `${size3 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "IntegerOutOfRangeError"
    });
  }
}

class InvalidHexBooleanError extends BaseError {
  constructor(hex) {
    super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidHexBooleanError"
    });
  }
}

class SizeOverflowError extends BaseError {
  constructor({ givenSize, maxSize }) {
    super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SizeOverflowError"
    });
  }
}
var init_encoding = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/data/trim.js
function trim(hexOrBytes, { dir = "left" } = {}) {
  let data2 = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0;i < data2.length - 1; i++) {
    if (data2[dir === "left" ? i : data2.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data2 = dir === "left" ? data2.slice(sliceLength) : data2.slice(0, data2.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data2.length === 1 && dir === "right")
      data2 = `${data2}0`;
    return `0x${data2.length % 2 === 1 ? `0${data2}` : data2}`;
  }
  return data2;
}
var init_trim = __esm(() => {
});

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size4 }) {
  if (size(hexOrBytes) > size4)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size4
    });
}
function fromHex(hex, toOrOpts) {
  const opts = typeof toOrOpts === "string" ? { to: toOrOpts } : toOrOpts;
  const to = opts.to;
  if (to === "number")
    return hexToNumber(hex, opts);
  if (to === "bigint")
    return hexToBigInt(hex, opts);
  if (to === "string")
    return hexToString(hex, opts);
  if (to === "boolean")
    return hexToBool(hex, opts);
  return hexToBytes(hex, opts);
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size4 = (hex.length - 2) / 2;
  const max = (1n << BigInt(size4) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size4 * 2, "f")}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = trim(hex);
  }
  if (trim(hex) === "0x00")
    return false;
  if (trim(hex) === "0x01")
    return true;
  throw new InvalidHexBooleanError(hex);
}
function hexToNumber(hex, opts = {}) {
  return Number(hexToBigInt(hex, opts));
}
function hexToString(hex, opts = {}) {
  let bytes = hexToBytes(hex);
  if (opts.size) {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes, { dir: "right" });
  }
  return new TextDecoder().decode(bytes);
}
var init_fromHex = __esm(() => {
  init_encoding();
  init_size();
  init_trim();
  init_toBytes();
});

// node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0;i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size4 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size4) {
    if (signed)
      maxValue = (1n << BigInt(size4) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size4) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : undefined,
      min: `${minValue}${suffix}`,
      signed,
      size: size4,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size4 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size4)
    return pad(hex, { size: size4 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm(() => {
  init_encoding();
  init_pad();
  init_fromHex();
  hexes = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
  encoder = new TextEncoder;
});

// node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes2(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index = 0, j = 0;index < length; index++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === undefined || nibbleRight === undefined) {
      throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
var charCodeToBase16, encoder2, charCodeMap;
var init_toBytes = __esm(() => {
  init_base();
  init_isHex();
  init_pad();
  init_fromHex();
  init_toHex();
  charCodeToBase16 = function(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
      return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
      return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
      return char - (charCodeMap.a - 10);
    return;
  };
  encoder2 = new TextEncoder;
  charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
  };
});

// node_modules/viem/_esm/utils/hash/normalizeSignature.js
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0;i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError("Unable to normalize signature.");
  return result;
}
var init_normalizeSignature = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/hash/getFunctionSignature.js
var getFunctionSignature;
var init_getFunctionSignature = __esm(() => {
  init_esm();
  init_normalizeSignature();
  getFunctionSignature = (fn_) => {
    const fn = (() => {
      if (typeof fn_ === "string")
        return fn_;
      return formatAbiItem(fn_);
    })();
    return normalizeSignature(fn);
  };
});

// node_modules/viem/_esm/utils/hash/getEventSignature.js
var getEventSignature;
var init_getEventSignature = __esm(() => {
  init_getFunctionSignature();
  getEventSignature = (fn) => {
    return getFunctionSignature(fn);
  };
});

// node_modules/@noble/hashes/esm/_assert.js
var number, bytes, exists, output;
var init__assert = __esm(() => {
  number = function(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error(`Wrong positive integer: ${n}`);
  };
  bytes = function(b, ...lengths) {
    if (!(b instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
  };
  exists = function(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  };
  output = function(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
  };
});

// node_modules/@noble/hashes/esm/_u64.js
var fromBig, split, U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
var init__u64 = __esm(() => {
  fromBig = function(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  };
  split = function(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for (let i = 0;i < lst.length; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  };
  U32_MASK64 = BigInt(2 ** 32 - 1);
  _32n = BigInt(32);
  rotlSH = (h, l, s) => h << s | l >>> 32 - s;
  rotlSL = (h, l, s) => l << s | h >>> 32 - s;
  rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
  rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
});

// node_modules/@noble/hashes/esm/utils.js
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes3(data2) {
  if (typeof data2 === "string")
    data2 = utf8ToBytes(data2);
  if (!u8a(data2))
    throw new Error(`expected Uint8Array, got ${typeof data2}`);
  return data2;
}
function wrapConstructor(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes3(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
  const hashC = (msg, opts) => hashCons(opts).update(toBytes3(msg)).digest();
  const tmp = hashCons({});
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = (opts) => hashCons(opts);
  return hashC;
}

class Hash {
  clone() {
    return this._cloneInto();
  }
}
var u8a, u32, isLE, toStr;
var init_utils2 = __esm(() => {
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  u8a = (a) => a instanceof Uint8Array;
  u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
  if (!isLE)
    throw new Error("Non little-endian hardware is not supported");
  toStr = {}.toString;
});

// node_modules/@noble/hashes/esm/sha3.js
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds;round < 24; round++) {
    for (let x = 0;x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0;x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0;y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0;t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0;y < 50; y += 10) {
      for (let x = 0;x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0;x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  B.fill(0);
}

class Keccak extends Hash {
  constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
    super();
    this.blockLen = blockLen;
    this.suffix = suffix;
    this.outputLen = outputLen;
    this.enableXOF = enableXOF;
    this.rounds = rounds;
    this.pos = 0;
    this.posOut = 0;
    this.finished = false;
    this.destroyed = false;
    number(outputLen);
    if (0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200);
    this.state32 = u32(this.state);
  }
  keccak() {
    keccakP(this.state32, this.rounds);
    this.posOut = 0;
    this.pos = 0;
  }
  update(data2) {
    exists(this);
    const { blockLen, state } = this;
    data2 = toBytes3(data2);
    const len = data2.length;
    for (let pos = 0;pos < len; ) {
      const take = Math.min(blockLen - this.pos, len - pos);
      for (let i = 0;i < take; i++)
        state[this.pos++] ^= data2[pos++];
      if (this.pos === blockLen)
        this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = true;
    const { state, suffix, pos, blockLen } = this;
    state[pos] ^= suffix;
    if ((suffix & 128) !== 0 && pos === blockLen - 1)
      this.keccak();
    state[blockLen - 1] ^= 128;
    this.keccak();
  }
  writeInto(out) {
    exists(this, false);
    bytes(out);
    this.finish();
    const bufferOut = this.state;
    const { blockLen } = this;
    for (let pos = 0, len = out.length;pos < len; ) {
      if (this.posOut >= blockLen)
        this.keccak();
      const take = Math.min(blockLen - this.posOut, len - pos);
      out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
      this.posOut += take;
      pos += take;
    }
    return out;
  }
  xofInto(out) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(out);
  }
  xof(bytes2) {
    number(bytes2);
    return this.xofInto(new Uint8Array(bytes2));
  }
  digestInto(out) {
    output(out, this);
    if (this.finished)
      throw new Error("digest() was already called");
    this.writeInto(out);
    this.destroy();
    return out;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = true;
    this.state.fill(0);
  }
  _cloneInto(to) {
    const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
    to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
    to.state32.set(this.state32);
    to.pos = this.pos;
    to.posOut = this.posOut;
    to.finished = this.finished;
    to.rounds = rounds;
    to.suffix = suffix;
    to.outputLen = outputLen;
    to.enableXOF = enableXOF;
    to.destroyed = this.destroyed;
    return to;
  }
}
var SHA3_PI, SHA3_ROTL, _SHA3_IOTA, _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, gen, sha3_224, sha3_256, sha3_384, sha3_512, keccak_224, keccak_256, keccak_384, keccak_512, genShake, shake128, shake256;
var init_sha3 = __esm(() => {
  init__assert();
  init__u64();
  init_utils2();
  [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
  _0n = BigInt(0);
  _1n = BigInt(1);
  _2n = BigInt(2);
  _7n = BigInt(7);
  _256n = BigInt(256);
  _0x71n = BigInt(113);
  for (let round = 0, R = _1n, x = 1, y = 0;round < 24; round++) {
    [x, y] = [y, (2 * x + 3 * y) % 5];
    SHA3_PI.push(2 * (5 * y + x));
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    let t = _0n;
    for (let j = 0;j < 7; j++) {
      R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
      if (R & _2n)
        t ^= _1n << (_1n << BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
  }
  [SHA3_IOTA_H, SHA3_IOTA_L] = split(_SHA3_IOTA, true);
  rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
  rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
  gen = (suffix, blockLen, outputLen) => wrapConstructor(() => new Keccak(blockLen, suffix, outputLen));
  sha3_224 = gen(6, 144, 224 / 8);
  sha3_256 = gen(6, 136, 256 / 8);
  sha3_384 = gen(6, 104, 384 / 8);
  sha3_512 = gen(6, 72, 512 / 8);
  keccak_224 = gen(1, 144, 224 / 8);
  keccak_256 = gen(1, 136, 256 / 8);
  keccak_384 = gen(1, 104, 384 / 8);
  keccak_512 = gen(1, 72, 512 / 8);
  genShake = (suffix, blockLen, outputLen) => wrapXOFConstructorWithOpts((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
  shake128 = genShake(31, 168, 128 / 8);
  shake256 = genShake(31, 136, 256 / 8);
});

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes2 = keccak_256(isHex(value, { strict: false }) ? toBytes2(value) : value);
  if (to === "bytes")
    return bytes2;
  return toHex(bytes2);
}
var init_keccak256 = __esm(() => {
  init_sha3();
  init_isHex();
  init_toBytes();
  init_toHex();
});

// node_modules/viem/_esm/utils/hash/getEventSelector.js
var hash, getEventSelector;
var init_getEventSelector = __esm(() => {
  init_toBytes();
  init_getEventSignature();
  init_keccak256();
  hash = (value) => keccak256(toBytes2(value));
  getEventSelector = (fn) => hash(getEventSignature(fn));
});

// node_modules/viem/_esm/errors/address.js
class InvalidAddressError extends BaseError {
  constructor({ address }) {
    super(`Address "${address}" is invalid.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidAddressError"
    });
  }
}
var init_address = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/address/isAddress.js
function isAddress(address) {
  return addressRegex.test(address);
}
var addressRegex;
var init_isAddress = __esm(() => {
  addressRegex = /^0x[a-fA-F0-9]{40}$/;
});

// node_modules/viem/_esm/utils/data/concat.js
function concat(values) {
  if (typeof values[0] === "string")
    return concatHex(values);
  return concatBytes(values);
}
function concatBytes(values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const arr of values) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
var init_concat = __esm(() => {
});

// node_modules/viem/_esm/utils/data/slice.js
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
var assertStartOffset, assertEndOffset;
var init_slice = __esm(() => {
  init_data();
  init_isHex();
  init_size();
  assertStartOffset = function(value, start) {
    if (typeof start === "number" && start > 0 && start > size(value) - 1)
      throw new SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: size(value)
      });
  };
  assertEndOffset = function(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: size(value)
      });
    }
  };
});

// node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
function encodeAbiParameters(params, values) {
  if (params.length !== values.length)
    throw new AbiEncodingLengthMismatchError({
      expectedLength: params.length,
      givenLength: values.length
    });
  const preparedParams = prepareParams({
    params,
    values
  });
  const data3 = encodeParams(preparedParams);
  if (data3.length === 0)
    return "0x";
  return data3;
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : undefined;
}
var prepareParams, prepareParam, encodeParams, encodeAddress, encodeArray, encodeBytes, encodeBool, encodeNumber, encodeString, encodeTuple;
var init_encodeAbiParameters = __esm(() => {
  init_abi();
  init_address();
  init_isAddress();
  init_concat();
  init_pad();
  init_size();
  init_slice();
  init_toHex();
  prepareParams = function({ params, values }) {
    const preparedParams = [];
    for (let i = 0;i < params.length; i++) {
      preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
    }
    return preparedParams;
  };
  prepareParam = function({ param, value }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return encodeArray(value, { length, param: { ...param, type } });
    }
    if (param.type === "tuple") {
      return encodeTuple(value, {
        param
      });
    }
    if (param.type === "address") {
      return encodeAddress(value);
    }
    if (param.type === "bool") {
      return encodeBool(value);
    }
    if (param.type.startsWith("uint") || param.type.startsWith("int")) {
      const signed = param.type.startsWith("int");
      return encodeNumber(value, { signed });
    }
    if (param.type.startsWith("bytes")) {
      return encodeBytes(value, { param });
    }
    if (param.type === "string") {
      return encodeString(value);
    }
    throw new InvalidAbiEncodingTypeError(param.type, {
      docsPath: "/docs/contract/encodeAbiParameters"
    });
  };
  encodeParams = function(preparedParams) {
    let staticSize = 0;
    for (let i = 0;i < preparedParams.length; i++) {
      const { dynamic, encoded } = preparedParams[i];
      if (dynamic)
        staticSize += 32;
      else
        staticSize += size(encoded);
    }
    const staticParams = [];
    const dynamicParams = [];
    let dynamicSize = 0;
    for (let i = 0;i < preparedParams.length; i++) {
      const { dynamic, encoded } = preparedParams[i];
      if (dynamic) {
        staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }));
        dynamicParams.push(encoded);
        dynamicSize += size(encoded);
      } else {
        staticParams.push(encoded);
      }
    }
    return concat([...staticParams, ...dynamicParams]);
  };
  encodeAddress = function(value) {
    if (!isAddress(value))
      throw new InvalidAddressError({ address: value });
    return { dynamic: false, encoded: padHex(value.toLowerCase()) };
  };
  encodeArray = function(value, { length, param }) {
    const dynamic = length === null;
    if (!Array.isArray(value))
      throw new InvalidArrayError(value);
    if (!dynamic && value.length !== length)
      throw new AbiEncodingArrayLengthMismatchError({
        expectedLength: length,
        givenLength: value.length,
        type: `${param.type}[${length}]`
      });
    let dynamicChild = false;
    const preparedParams = [];
    for (let i = 0;i < value.length; i++) {
      const preparedParam = prepareParam({ param, value: value[i] });
      if (preparedParam.dynamic)
        dynamicChild = true;
      preparedParams.push(preparedParam);
    }
    if (dynamic || dynamicChild) {
      const data3 = encodeParams(preparedParams);
      if (dynamic) {
        const length2 = numberToHex(preparedParams.length, { size: 32 });
        return {
          dynamic: true,
          encoded: preparedParams.length > 0 ? concat([length2, data3]) : length2
        };
      }
      if (dynamicChild)
        return { dynamic: true, encoded: data3 };
    }
    return {
      dynamic: false,
      encoded: concat(preparedParams.map(({ encoded }) => encoded))
    };
  };
  encodeBytes = function(value, { param }) {
    const [, paramSize] = param.type.split("bytes");
    const bytesSize = size(value);
    if (!paramSize) {
      let value_ = value;
      if (bytesSize % 32 !== 0)
        value_ = padHex(value_, {
          dir: "right",
          size: Math.ceil((value.length - 2) / 2 / 32) * 32
        });
      return {
        dynamic: true,
        encoded: concat([padHex(numberToHex(bytesSize, { size: 32 })), value_])
      };
    }
    if (bytesSize !== parseInt(paramSize))
      throw new AbiEncodingBytesSizeMismatchError({
        expectedSize: parseInt(paramSize),
        value
      });
    return { dynamic: false, encoded: padHex(value, { dir: "right" }) };
  };
  encodeBool = function(value) {
    return { dynamic: false, encoded: padHex(boolToHex(value)) };
  };
  encodeNumber = function(value, { signed }) {
    return {
      dynamic: false,
      encoded: numberToHex(value, {
        size: 32,
        signed
      })
    };
  };
  encodeString = function(value) {
    const hexValue = stringToHex(value);
    const partsLength = Math.ceil(size(hexValue) / 32);
    const parts = [];
    for (let i = 0;i < partsLength; i++) {
      parts.push(padHex(slice(hexValue, i * 32, (i + 1) * 32), {
        dir: "right"
      }));
    }
    return {
      dynamic: true,
      encoded: concat([
        padHex(numberToHex(size(hexValue), { size: 32 })),
        ...parts
      ])
    };
  };
  encodeTuple = function(value, { param }) {
    let dynamic = false;
    const preparedParams = [];
    for (let i = 0;i < param.components.length; i++) {
      const param_ = param.components[i];
      const index = Array.isArray(value) ? i : param_.name;
      const preparedParam = prepareParam({
        param: param_,
        value: value[index]
      });
      preparedParams.push(preparedParam);
      if (preparedParam.dynamic)
        dynamic = true;
    }
    return {
      dynamic,
      encoded: dynamic ? encodeParams(preparedParams) : concat(preparedParams.map(({ encoded }) => encoded))
    };
  };
});

// node_modules/viem/_esm/utils/hash/getFunctionSelector.js
var hash2, getFunctionSelector;
var init_getFunctionSelector = __esm(() => {
  init_slice();
  init_toBytes();
  init_getFunctionSignature();
  init_keccak256();
  hash2 = (value) => keccak256(toBytes2(value));
  getFunctionSelector = (fn) => slice(hash2(getFunctionSignature(fn)), 0, 4);
});

// node_modules/viem/_esm/utils/abi/getAbiItem.js
function getAbiItem({ abi: abi3, args = [], name }) {
  const isSelector = isHex(name, { strict: false });
  const abiItems = abi3.filter((abiItem) => {
    if (isSelector) {
      if (abiItem.type === "function")
        return getFunctionSelector(abiItem) === name;
      if (abiItem.type === "event")
        return getEventSelector(abiItem) === name;
      return false;
    }
    return "name" in abiItem && abiItem.name === name;
  });
  if (abiItems.length === 0)
    return;
  if (abiItems.length === 1)
    return abiItems[0];
  for (const abiItem of abiItems) {
    if (!("inputs" in abiItem))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem.inputs || abiItem.inputs.length === 0)
        return abiItem;
      continue;
    }
    if (!abiItem.inputs)
      continue;
    if (abiItem.inputs.length === 0)
      continue;
    if (abiItem.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index) => {
      const abiParameter = "inputs" in abiItem && abiItem.inputs[index];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched)
      return abiItem;
  }
  return abiItems[0];
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return isAddress(arg);
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index) => {
          return isArgOfType(Object.values(arg)[index], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
var init_getAbiItem = __esm(() => {
  init_isHex();
  init_getEventSelector();
  init_getFunctionSelector();
  init_isAddress();
});

// node_modules/viem/_esm/accounts/utils/parseAccount.js
function parseAccount(account) {
  if (typeof account === "string")
    return { address: account, type: "json-rpc" };
  return account;
}
var init_parseAccount = __esm(() => {
});

// node_modules/viem/_esm/utils/abi/encodeFunctionData.js
function encodeFunctionData({ abi: abi5, args, functionName }) {
  let abiItem = abi5[0];
  if (functionName) {
    abiItem = getAbiItem({
      abi: abi5,
      args,
      name: functionName
    });
    if (!abiItem)
      throw new AbiFunctionNotFoundError(functionName, {
        docsPath: "/docs/contract/encodeFunctionData"
      });
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(undefined, {
      docsPath: "/docs/contract/encodeFunctionData"
    });
  const definition = formatAbiItem2(abiItem);
  const signature = getFunctionSelector(definition);
  const data3 = "inputs" in abiItem && abiItem.inputs ? encodeAbiParameters(abiItem.inputs, args ?? []) : undefined;
  return concatHex([signature, data3 ?? "0x"]);
}
var init_encodeFunctionData = __esm(() => {
  init_abi();
  init_concat();
  init_getFunctionSelector();
  init_encodeAbiParameters();
  init_formatAbiItem2();
  init_getAbiItem();
});

// node_modules/viem/_esm/constants/solidity.js
var panicReasons, solidityError, solidityPanic;
var init_solidity = __esm(() => {
  panicReasons = {
    1: "An `assert` condition failed.",
    17: "Arithmic operation resulted in underflow or overflow.",
    18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
    33: "Attempted to convert to an invalid type.",
    34: "Attempted to access a storage byte array that is incorrectly encoded.",
    49: "Performed `.pop()` on an empty array",
    50: "Array index is out of bounds.",
    65: "Allocated too much memory or created an array which is too large.",
    81: "Attempted to call a zero-initialized variable of internal function type."
  };
  solidityError = {
    inputs: [
      {
        name: "message",
        type: "string"
      }
    ],
    name: "Error",
    type: "error"
  };
  solidityPanic = {
    inputs: [
      {
        name: "reason",
        type: "uint256"
      }
    ],
    name: "Panic",
    type: "error"
  };
});

// node_modules/viem/_esm/utils/address/getAddress.js
function checksumAddress(address_, chainId) {
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash3 = keccak256(stringToBytes(hexAddress), "bytes");
  const address2 = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0;i < 40; i += 2) {
    if (hash3[i >> 1] >> 4 >= 8 && address2[i]) {
      address2[i] = address2[i].toUpperCase();
    }
    if ((hash3[i >> 1] & 15) >= 8 && address2[i + 1]) {
      address2[i + 1] = address2[i + 1].toUpperCase();
    }
  }
  return `0x${address2.join("")}`;
}
var init_getAddress = __esm(() => {
  init_toBytes();
  init_keccak256();
});

// node_modules/viem/_esm/utils/abi/decodeAbiParameters.js
function decodeAbiParameters(params, data3) {
  if (data3 === "0x" && params.length > 0)
    throw new AbiDecodingZeroDataError;
  if (size(data3) && size(data3) < 32)
    throw new AbiDecodingDataSizeTooSmallError({
      data: data3,
      params,
      size: size(data3)
    });
  return decodeParams({
    data: data3,
    params
  });
}
var decodeParams, decodeParam, decodeAddress, decodeArray, decodeBool, decodeBytes, decodeNumber, decodeString, decodeTuple, hasDynamicChild;
var init_decodeAbiParameters = __esm(() => {
  init_abi();
  init_getAddress();
  init_size();
  init_slice();
  init_trim();
  init_fromHex();
  init_encodeAbiParameters();
  decodeParams = function({ data: data3, params }) {
    const decodedValues = [];
    let position = 0;
    for (let i = 0;i < params.length; i++) {
      if (position >= size(data3))
        throw new AbiDecodingDataSizeTooSmallError({
          data: data3,
          params,
          size: size(data3)
        });
      const param = params[i];
      const { consumed, value } = decodeParam({ data: data3, param, position });
      decodedValues.push(value);
      position += consumed;
    }
    return decodedValues;
  };
  decodeParam = function({ data: data3, param, position }) {
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents) {
      const [length, type] = arrayComponents;
      return decodeArray(data3, {
        length,
        param: { ...param, type },
        position
      });
    }
    if (param.type === "tuple") {
      return decodeTuple(data3, { param, position });
    }
    if (param.type === "string") {
      return decodeString(data3, { position });
    }
    if (param.type.startsWith("bytes")) {
      return decodeBytes(data3, { param, position });
    }
    const value = slice(data3, position, position + 32, { strict: true });
    if (param.type.startsWith("uint") || param.type.startsWith("int")) {
      return decodeNumber(value, { param });
    }
    if (param.type === "address") {
      return decodeAddress(value);
    }
    if (param.type === "bool") {
      return decodeBool(value);
    }
    throw new InvalidAbiDecodingTypeError(param.type, {
      docsPath: "/docs/contract/decodeAbiParameters"
    });
  };
  decodeAddress = function(value) {
    return { consumed: 32, value: checksumAddress(slice(value, -20)) };
  };
  decodeArray = function(data3, { param, length, position }) {
    if (!length) {
      const offset = hexToNumber(slice(data3, position, position + 32, { strict: true }));
      const length2 = hexToNumber(slice(data3, offset, offset + 32, { strict: true }));
      let consumed2 = 0;
      const value2 = [];
      for (let i = 0;i < length2; ++i) {
        const decodedChild = decodeParam({
          data: slice(data3, offset + 32),
          param,
          position: consumed2
        });
        consumed2 += decodedChild.consumed;
        value2.push(decodedChild.value);
      }
      return { value: value2, consumed: 32 };
    }
    if (hasDynamicChild(param)) {
      const arrayComponents = getArrayComponents(param.type);
      const dynamicChild = !arrayComponents?.[0];
      let consumed2 = 0;
      const value2 = [];
      for (let i = 0;i < length; ++i) {
        const offset = hexToNumber(slice(data3, position, position + 32, { strict: true }));
        const decodedChild = decodeParam({
          data: slice(data3, offset),
          param,
          position: dynamicChild ? consumed2 : i * 32
        });
        consumed2 += decodedChild.consumed;
        value2.push(decodedChild.value);
      }
      return { value: value2, consumed: 32 };
    }
    let consumed = 0;
    const value = [];
    for (let i = 0;i < length; ++i) {
      const decodedChild = decodeParam({
        data: data3,
        param,
        position: position + consumed
      });
      consumed += decodedChild.consumed;
      value.push(decodedChild.value);
    }
    return { value, consumed };
  };
  decodeBool = function(value) {
    return { consumed: 32, value: hexToBool(value) };
  };
  decodeBytes = function(data3, { param, position }) {
    const [_, size7] = param.type.split("bytes");
    if (!size7) {
      const offset = hexToNumber(slice(data3, position, position + 32, { strict: true }));
      const length = hexToNumber(slice(data3, offset, offset + 32, { strict: true }));
      if (length === 0)
        return { consumed: 32, value: "0x" };
      const value2 = slice(data3, offset + 32, offset + 32 + length, {
        strict: true
      });
      return { consumed: 32, value: value2 };
    }
    const value = slice(data3, position, position + parseInt(size7), {
      strict: true
    });
    return { consumed: 32, value };
  };
  decodeNumber = function(value, { param }) {
    const signed = param.type.startsWith("int");
    const size7 = parseInt(param.type.split("int")[1] || "256");
    return {
      consumed: 32,
      value: size7 > 48 ? hexToBigInt(value, { signed }) : hexToNumber(value, { signed })
    };
  };
  decodeString = function(data3, { position }) {
    const offset = hexToNumber(slice(data3, position, position + 32, { strict: true }));
    const length = hexToNumber(slice(data3, offset, offset + 32, { strict: true }));
    if (length === 0)
      return { consumed: 32, value: "" };
    const value = hexToString(trim(slice(data3, offset + 32, offset + 32 + length, { strict: true })));
    return { consumed: 32, value };
  };
  decodeTuple = function(data3, { param, position }) {
    const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
    const value = hasUnnamedChild ? [] : {};
    let consumed = 0;
    if (hasDynamicChild(param)) {
      const offset = hexToNumber(slice(data3, position, position + 32, { strict: true }));
      for (let i = 0;i < param.components.length; ++i) {
        const component = param.components[i];
        const decodedChild = decodeParam({
          data: slice(data3, offset),
          param: component,
          position: consumed
        });
        consumed += decodedChild.consumed;
        value[hasUnnamedChild ? i : component?.name] = decodedChild.value;
      }
      return { consumed: 32, value };
    }
    for (let i = 0;i < param.components.length; ++i) {
      const component = param.components[i];
      const decodedChild = decodeParam({
        data: data3,
        param: component,
        position: position + consumed
      });
      consumed += decodedChild.consumed;
      value[hasUnnamedChild ? i : component?.name] = decodedChild.value;
    }
    return { consumed, value };
  };
  hasDynamicChild = function(param) {
    const { type } = param;
    if (type === "string")
      return true;
    if (type === "bytes")
      return true;
    if (type.endsWith("[]"))
      return true;
    if (type === "tuple")
      return param.components?.some(hasDynamicChild);
    const arrayComponents = getArrayComponents(param.type);
    if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
      return true;
    return false;
  };
});

// node_modules/viem/_esm/utils/abi/decodeErrorResult.js
function decodeErrorResult({ abi: abi7, data: data3 }) {
  const signature = slice(data3, 0, 4);
  if (signature === "0x")
    throw new AbiDecodingZeroDataError;
  const abi_ = [...abi7 || [], solidityError, solidityPanic];
  const abiItem = abi_.find((x) => x.type === "error" && signature === getFunctionSelector(formatAbiItem2(x)));
  if (!abiItem)
    throw new AbiErrorSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeErrorResult"
    });
  return {
    abiItem,
    args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice(data3, 4)) : undefined,
    errorName: abiItem.name
  };
}
var init_decodeErrorResult = __esm(() => {
  init_solidity();
  init_abi();
  init_slice();
  init_getFunctionSelector();
  init_decodeAbiParameters();
  init_formatAbiItem2();
});

// node_modules/viem/_esm/utils/stringify.js
var stringify;
var init_stringify = __esm(() => {
  stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
    const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
    return typeof replacer === "function" ? replacer(key, value2) : value2;
  }, space);
});

// node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
  if (!("name" in abiItem))
    return;
  if (!("inputs" in abiItem))
    return;
  if (!abiItem.inputs)
    return;
  return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? stringify(args[i]) : args[i]}`).join(", ")})`;
}
var init_formatAbiItemWithArgs = __esm(() => {
  init_stringify();
});

// node_modules/viem/_esm/constants/unit.js
var etherUnits, gweiUnits;
var init_unit = __esm(() => {
  etherUnits = {
    gwei: 9,
    wei: 18
  };
  gweiUnits = {
    ether: -9,
    wei: 9
  };
});

// node_modules/viem/_esm/utils/unit/formatUnits.js
function formatUnits(value, decimals) {
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
var init_formatUnits = __esm(() => {
});

// node_modules/viem/_esm/utils/unit/formatEther.js
function formatEther(wei, unit2 = "wei") {
  return formatUnits(wei, etherUnits[unit2]);
}
var init_formatEther = __esm(() => {
  init_unit();
  init_formatUnits();
});

// node_modules/viem/_esm/utils/unit/formatGwei.js
function formatGwei(wei, unit3 = "wei") {
  return formatUnits(wei, gweiUnits[unit3]);
}
var init_formatGwei = __esm(() => {
  init_unit();
  init_formatUnits();
});

// node_modules/viem/_esm/errors/transaction.js
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === undefined || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}

class FeeConflictError extends BaseError {
  constructor() {
    super([
      "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
      "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FeeConflictError"
    });
  }
}

class InvalidSerializableTransactionError extends BaseError {
  constructor({ transaction }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        prettyPrint(transaction),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidSerializableTransactionError"
    });
  }
}

class TransactionNotFoundError extends BaseError {
  constructor({ blockHash, blockNumber, blockTag, hash: hash3, index }) {
    let identifier = "Transaction";
    if (blockTag && index !== undefined)
      identifier = `Transaction at block time "${blockTag}" at index "${index}"`;
    if (blockHash && index !== undefined)
      identifier = `Transaction at block hash "${blockHash}" at index "${index}"`;
    if (blockNumber && index !== undefined)
      identifier = `Transaction at block number "${blockNumber}" at index "${index}"`;
    if (hash3)
      identifier = `Transaction with hash "${hash3}"`;
    super(`${identifier} could not be found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionNotFoundError"
    });
  }
}

class TransactionReceiptNotFoundError extends BaseError {
  constructor({ hash: hash3 }) {
    super(`Transaction receipt with hash "${hash3}" could not be found. The Transaction may not be processed on a block yet.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionReceiptNotFoundError"
    });
  }
}

class WaitForTransactionReceiptTimeoutError extends BaseError {
  constructor({ hash: hash3 }) {
    super(`Timed out while waiting for transaction with hash "${hash3}" to be confirmed.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WaitForTransactionReceiptTimeoutError"
    });
  }
}
var init_transaction = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/errors/contract.js
class CallExecutionError extends BaseError {
  constructor(cause, { account: account_, docsPath, chain, data: data3, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const account = account_ ? parseAccount(account_) : undefined;
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data: data3,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Raw Call Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "CallExecutionError"
    });
    this.cause = cause;
  }
}

class ContractFunctionExecutionError extends BaseError {
  constructor(cause, { abi: abi8, args, contractAddress, docsPath, functionName, sender }) {
    const abiItem = getAbiItem({ abi: abi8, args, name: functionName });
    const formattedArgs = abiItem ? formatAbiItemWithArgs({
      abiItem,
      args,
      includeFunctionName: false,
      includeName: false
    }) : undefined;
    const functionWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : undefined;
    const prettyArgs = prettyPrint({
      address: contractAddress && getContractAddress(contractAddress),
      function: functionWithParams,
      args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
      sender
    });
    super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
      cause,
      docsPath,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Contract Call:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "abi", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "args", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "contractAddress", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "formattedArgs", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "functionName", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "sender", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ContractFunctionExecutionError"
    });
    this.abi = abi8;
    this.args = args;
    this.cause = cause;
    this.contractAddress = contractAddress;
    this.functionName = functionName;
    this.sender = sender;
  }
}

class ContractFunctionRevertedError extends BaseError {
  constructor({ abi: abi8, data: data3, functionName, message }) {
    let cause;
    let decodedData = undefined;
    let metaMessages;
    let reason;
    if (data3 && data3 !== "0x") {
      try {
        decodedData = decodeErrorResult({ abi: abi8, data: data3 });
        const { abiItem, errorName, args: errorArgs } = decodedData;
        if (errorName === "Error") {
          reason = errorArgs[0];
        } else if (errorName === "Panic") {
          const [firstArg] = errorArgs;
          reason = panicReasons[firstArg];
        } else {
          const errorWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : undefined;
          const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
            abiItem,
            args: errorArgs,
            includeFunctionName: false,
            includeName: false
          }) : undefined;
          metaMessages = [
            errorWithParams ? `Error: ${errorWithParams}` : "",
            formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
          ];
        }
      } catch (err) {
        cause = err;
      }
    } else if (message)
      reason = message;
    let signature;
    if (cause instanceof AbiErrorSignatureNotFoundError) {
      signature = cause.signature;
      metaMessages = [
        `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
      ];
    }
    super(reason && reason !== "execution reverted" || signature ? [
      `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
      reason || signature
    ].join("\n") : `The contract function "${functionName}" reverted.`, {
      cause,
      metaMessages
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ContractFunctionRevertedError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "reason", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "signature", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = decodedData;
    this.reason = reason;
    this.signature = signature;
  }
}

class ContractFunctionZeroDataError extends BaseError {
  constructor({ functionName }) {
    super(`The contract function "${functionName}" returned no data ("0x").`, {
      metaMessages: [
        "This could be due to any of the following:",
        `  - The contract does not have the function "${functionName}",`,
        "  - The parameters passed to the contract function may be invalid, or",
        "  - The address is not a contract."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ContractFunctionZeroDataError"
    });
  }
}

class RawContractError extends BaseError {
  constructor({ data: data3, message }) {
    super(message || "");
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RawContractError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = data3;
  }
}
var init_contract = __esm(() => {
  init_parseAccount();
  init_solidity();
  init_decodeErrorResult();
  init_formatAbiItem2();
  init_formatAbiItemWithArgs();
  init_getAbiItem();
  init_formatEther();
  init_formatGwei();
  init_abi();
  init_base();
  init_transaction();
  init_utils();
});

// node_modules/viem/_esm/errors/request.js
class HttpRequestError extends BaseError {
  constructor({ body, details, headers, status, url }) {
    super("HTTP request failed.", {
      details,
      metaMessages: [
        status && `Status: ${status}`,
        `URL: ${getUrl(url)}`,
        body && `Request body: ${stringify(body)}`
      ].filter(Boolean)
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "HttpRequestError"
    });
    Object.defineProperty(this, "body", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "headers", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "status", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "url", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.body = body;
    this.headers = headers;
    this.status = status;
    this.url = url;
  }
}

class WebSocketRequestError extends BaseError {
  constructor({ body, details, url }) {
    super("WebSocket request failed.", {
      details,
      metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "WebSocketRequestError"
    });
  }
}

class RpcRequestError extends BaseError {
  constructor({ body, error, url }) {
    super("RPC Request failed.", {
      cause: error,
      details: error.message,
      metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcRequestError"
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.code = error.code;
  }
}

class TimeoutError extends BaseError {
  constructor({ body, url }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TimeoutError"
    });
  }
}
var init_request = __esm(() => {
  init_stringify();
  init_base();
  init_utils();
});

// node_modules/viem/_esm/errors/rpc.js
class RpcError extends BaseError {
  constructor(cause, { code, docsPath, metaMessages, shortMessage }) {
    super(shortMessage, {
      cause,
      docsPath,
      metaMessages: metaMessages || cause?.metaMessages
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "RpcError"
    });
    Object.defineProperty(this, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.name = cause.name;
    this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
  }
}

class ProviderRpcError extends RpcError {
  constructor(cause, options) {
    super(cause, options);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderRpcError"
    });
    Object.defineProperty(this, "data", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    this.data = options.data;
  }
}

class ParseRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: ParseRpcError.code,
      shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ParseRpcError"
    });
  }
}

class InvalidRequestRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InvalidRequestRpcError.code,
      shortMessage: "JSON is not a valid request object."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidRequestRpcError"
    });
  }
}

class MethodNotFoundRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: MethodNotFoundRpcError.code,
      shortMessage: "The method does not exist / is not available."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MethodNotFoundRpcError"
    });
  }
}

class InvalidParamsRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InvalidParamsRpcError.code,
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters."
      ].join("\n")
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidParamsRpcError"
    });
  }
}

class InternalRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InternalRpcError.code,
      shortMessage: "An internal error was received."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InternalRpcError"
    });
  }
}

class InvalidInputRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: InvalidInputRpcError.code,
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters."
      ].join("\n")
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InvalidInputRpcError"
    });
  }
}

class ResourceNotFoundRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: ResourceNotFoundRpcError.code,
      shortMessage: "Requested resource not found."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ResourceNotFoundRpcError"
    });
  }
}

class ResourceUnavailableRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: ResourceUnavailableRpcError.code,
      shortMessage: "Requested resource not available."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ResourceUnavailableRpcError"
    });
  }
}

class TransactionRejectedRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: TransactionRejectedRpcError.code,
      shortMessage: "Transaction creation failed."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionRejectedRpcError"
    });
  }
}

class MethodNotSupportedRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: MethodNotSupportedRpcError.code,
      shortMessage: "Method is not implemented."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MethodNotSupportedRpcError"
    });
  }
}

class LimitExceededRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: LimitExceededRpcError.code,
      shortMessage: "Request exceeds defined limit."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "LimitExceededRpcError"
    });
  }
}

class JsonRpcVersionUnsupportedError extends RpcError {
  constructor(cause) {
    super(cause, {
      code: JsonRpcVersionUnsupportedError.code,
      shortMessage: "Version of JSON-RPC protocol is not supported."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "JsonRpcVersionUnsupportedError"
    });
  }
}

class UserRejectedRequestError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: UserRejectedRequestError.code,
      shortMessage: "User rejected the request."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UserRejectedRequestError"
    });
  }
}

class UnauthorizedProviderError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: UnauthorizedProviderError.code,
      shortMessage: "The requested method and/or account has not been authorized by the user."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnauthorizedProviderError"
    });
  }
}

class UnsupportedProviderMethodError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: UnsupportedProviderMethodError.code,
      shortMessage: "The Provider does not support the requested method."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnsupportedProviderMethodError"
    });
  }
}

class ProviderDisconnectedError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: ProviderDisconnectedError.code,
      shortMessage: "The Provider is disconnected from all chains."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ProviderDisconnectedError"
    });
  }
}

class ChainDisconnectedError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: ChainDisconnectedError.code,
      shortMessage: "The Provider is not connected to the requested chain."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ChainDisconnectedError"
    });
  }
}

class SwitchChainError extends ProviderRpcError {
  constructor(cause) {
    super(cause, {
      code: SwitchChainError.code,
      shortMessage: "An error occurred when attempting to switch chain."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SwitchChainError"
    });
  }
}

class UnknownRpcError extends RpcError {
  constructor(cause) {
    super(cause, {
      shortMessage: "An unknown RPC error occurred."
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownRpcError"
    });
  }
}
var unknownErrorCode;
var init_rpc = __esm(() => {
  init_base();
  init_request();
  unknownErrorCode = -1;
  Object.defineProperty(ParseRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32700
  });
  Object.defineProperty(InvalidRequestRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32600
  });
  Object.defineProperty(MethodNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32601
  });
  Object.defineProperty(InvalidParamsRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32602
  });
  Object.defineProperty(InternalRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32603
  });
  Object.defineProperty(InvalidInputRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32000
  });
  Object.defineProperty(ResourceNotFoundRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32001
  });
  Object.defineProperty(ResourceUnavailableRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32002
  });
  Object.defineProperty(TransactionRejectedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32003
  });
  Object.defineProperty(MethodNotSupportedRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32004
  });
  Object.defineProperty(LimitExceededRpcError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32005
  });
  Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: -32006
  });
  Object.defineProperty(UserRejectedRequestError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4001
  });
  Object.defineProperty(UnauthorizedProviderError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4100
  });
  Object.defineProperty(UnsupportedProviderMethodError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4200
  });
  Object.defineProperty(ProviderDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4900
  });
  Object.defineProperty(ChainDisconnectedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4901
  });
  Object.defineProperty(SwitchChainError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 4902
  });
});

// node_modules/viem/_esm/errors/node.js
class ExecutionRevertedError extends BaseError {
  constructor({ cause, message } = {}) {
    const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
    super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ExecutionRevertedError"
    });
  }
}

class FeeCapTooHighError extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FeeCapTooHigh"
    });
  }
}

class FeeCapTooLowError extends BaseError {
  constructor({ cause, maxFeePerGas } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FeeCapTooLow"
    });
  }
}

class NonceTooHighError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NonceTooHighError"
    });
  }
}

class NonceTooLowError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super([
      `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
      "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
    ].join("\n"), { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NonceTooLowError"
    });
  }
}

class NonceMaxValueError extends BaseError {
  constructor({ cause, nonce } = {}) {
    super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "NonceMaxValueError"
    });
  }
}

class InsufficientFundsError extends BaseError {
  constructor({ cause } = {}) {
    super([
      "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
    ].join("\n"), {
      cause,
      metaMessages: [
        "This error could arise when the account does not have enough funds to:",
        " - pay for the total gas fee,",
        " - pay for the value to send.",
        " ",
        "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
        " - `gas` is the amount of gas needed for transaction to execute,",
        " - `gas fee` is the gas fee,",
        " - `value` is the amount of ether to send to the recipient."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "InsufficientFundsError"
    });
  }
}

class IntrinsicGasTooHighError extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "IntrinsicGasTooHighError"
    });
  }
}

class IntrinsicGasTooLowError extends BaseError {
  constructor({ cause, gas } = {}) {
    super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "IntrinsicGasTooLowError"
    });
  }
}

class TransactionTypeNotSupportedError extends BaseError {
  constructor({ cause }) {
    super("The transaction type is not supported for this chain.", {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TransactionTypeNotSupportedError"
    });
  }
}

class TipAboveFeeCapError extends BaseError {
  constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
    ].join("\n"), {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "TipAboveFeeCapError"
    });
  }
}

class UnknownNodeError extends BaseError {
  constructor({ cause }) {
    super(`An error occurred while executing: ${cause?.shortMessage}`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "UnknownNodeError"
    });
  }
}
var init_node = __esm(() => {
  init_formatGwei();
  init_base();
  Object.defineProperty(ExecutionRevertedError, "code", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 3
  });
  Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /execution reverted/
  });
  Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
  });
  Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
  });
  Object.defineProperty(NonceTooHighError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /nonce too high/
  });
  Object.defineProperty(NonceTooLowError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /nonce too low|transaction already imported|already known/
  });
  Object.defineProperty(NonceMaxValueError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /nonce has max value/
  });
  Object.defineProperty(InsufficientFundsError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /insufficient funds/
  });
  Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /intrinsic gas too high|gas limit reached/
  });
  Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /intrinsic gas too low/
  });
  Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /transaction type not valid/
  });
  Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
  });
});

// node_modules/viem/_esm/utils/errors/getNodeError.js
function getNodeError(err, args) {
  const message = (err.details || "").toLowerCase();
  const executionRevertedError = err.walk((e) => e.code === ExecutionRevertedError.code);
  if (executionRevertedError instanceof BaseError) {
    return new ExecutionRevertedError({
      cause: err,
      message: executionRevertedError.details
    });
  }
  if (ExecutionRevertedError.nodeMessage.test(message))
    return new ExecutionRevertedError({
      cause: err,
      message: err.details
    });
  if (FeeCapTooHighError.nodeMessage.test(message))
    return new FeeCapTooHighError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (FeeCapTooLowError.nodeMessage.test(message))
    return new FeeCapTooLowError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (NonceTooHighError.nodeMessage.test(message))
    return new NonceTooHighError({ cause: err, nonce: args?.nonce });
  if (NonceTooLowError.nodeMessage.test(message))
    return new NonceTooLowError({ cause: err, nonce: args?.nonce });
  if (NonceMaxValueError.nodeMessage.test(message))
    return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
  if (InsufficientFundsError.nodeMessage.test(message))
    return new InsufficientFundsError({ cause: err });
  if (IntrinsicGasTooHighError.nodeMessage.test(message))
    return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
  if (IntrinsicGasTooLowError.nodeMessage.test(message))
    return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
  if (TransactionTypeNotSupportedError.nodeMessage.test(message))
    return new TransactionTypeNotSupportedError({ cause: err });
  if (TipAboveFeeCapError.nodeMessage.test(message))
    return new TipAboveFeeCapError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas,
      maxPriorityFeePerGas: args?.maxPriorityFeePerGas
    });
  return new UnknownNodeError({
    cause: err
  });
}
var init_getNodeError = __esm(() => {
  init_base();
  init_node();
});

// node_modules/viem/_esm/utils/formatters/extract.js
function extract(value_, { format }) {
  if (!format)
    return {};
  const value = {};
  function extract_(formatted2) {
    const keys = Object.keys(formatted2);
    for (const key of keys) {
      if (key in value_)
        value[key] = value_[key];
      if (formatted2[key] && typeof formatted2[key] === "object" && !Array.isArray(formatted2[key]))
        extract_(formatted2[key]);
    }
  }
  const formatted = format(value_ || {});
  extract_(formatted);
  return value;
}
var init_extract = __esm(() => {
});

// node_modules/viem/_esm/utils/formatters/transactionRequest.js
function formatTransactionRequest(transactionRequest) {
  return {
    ...transactionRequest,
    gas: typeof transactionRequest.gas !== "undefined" ? numberToHex(transactionRequest.gas) : undefined,
    gasPrice: typeof transactionRequest.gasPrice !== "undefined" ? numberToHex(transactionRequest.gasPrice) : undefined,
    maxFeePerGas: typeof transactionRequest.maxFeePerGas !== "undefined" ? numberToHex(transactionRequest.maxFeePerGas) : undefined,
    maxPriorityFeePerGas: typeof transactionRequest.maxPriorityFeePerGas !== "undefined" ? numberToHex(transactionRequest.maxPriorityFeePerGas) : undefined,
    nonce: typeof transactionRequest.nonce !== "undefined" ? numberToHex(transactionRequest.nonce) : undefined,
    type: typeof transactionRequest.type !== "undefined" ? rpcTransactionType[transactionRequest.type] : undefined,
    value: typeof transactionRequest.value !== "undefined" ? numberToHex(transactionRequest.value) : undefined
  };
}
var rpcTransactionType;
var init_transactionRequest = __esm(() => {
  init_toHex();
  rpcTransactionType = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2"
  };
});

// node_modules/viem/_esm/utils/transaction/assertRequest.js
function assertRequest(args) {
  const { account: account_, gasPrice, maxFeePerGas, maxPriorityFeePerGas, to } = args;
  const account = account_ ? parseAccount(account_) : undefined;
  if (account && !isAddress(account.address))
    throw new InvalidAddressError({ address: account.address });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (typeof gasPrice !== "undefined" && (typeof maxFeePerGas !== "undefined" || typeof maxPriorityFeePerGas !== "undefined"))
    throw new FeeConflictError;
  if (maxFeePerGas && maxFeePerGas > 2n ** 256n - 1n)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
var init_assertRequest = __esm(() => {
  init_parseAccount();
  init_address();
  init_node();
  init_transaction();
  init_isAddress();
});

// node_modules/viem/_esm/utils/abi/decodeFunctionResult.js
function decodeFunctionResult({ abi: abi12, args, functionName, data: data3 }) {
  let abiItem = abi12[0];
  if (functionName) {
    abiItem = getAbiItem({
      abi: abi12,
      args,
      name: functionName
    });
    if (!abiItem)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath2 });
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(undefined, { docsPath: docsPath2 });
  if (!abiItem.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath2 });
  const values = decodeAbiParameters(abiItem.outputs, data3);
  if (values && values.length > 1)
    return values;
  if (values && values.length === 1)
    return values[0];
  return;
}
var docsPath2;
var init_decodeFunctionResult = __esm(() => {
  init_abi();
  init_decodeAbiParameters();
  init_getAbiItem();
  docsPath2 = "/docs/contract/decodeFunctionResult";
});

// node_modules/viem/_esm/constants/abis.js
var multicall3Abi, universalResolverErrors, universalResolverResolveAbi, universalResolverReverseAbi, textResolverAbi, addressResolverAbi, universalSignatureValidatorAbi;
var init_abis = __esm(() => {
  multicall3Abi = [
    {
      inputs: [
        {
          components: [
            {
              name: "target",
              type: "address"
            },
            {
              name: "allowFailure",
              type: "bool"
            },
            {
              name: "callData",
              type: "bytes"
            }
          ],
          name: "calls",
          type: "tuple[]"
        }
      ],
      name: "aggregate3",
      outputs: [
        {
          components: [
            {
              name: "success",
              type: "bool"
            },
            {
              name: "returnData",
              type: "bytes"
            }
          ],
          name: "returnData",
          type: "tuple[]"
        }
      ],
      stateMutability: "view",
      type: "function"
    }
  ];
  universalResolverErrors = [
    {
      inputs: [],
      name: "ResolverNotFound",
      type: "error"
    },
    {
      inputs: [],
      name: "ResolverWildcardNotSupported",
      type: "error"
    }
  ];
  universalResolverResolveAbi = [
    ...universalResolverErrors,
    {
      name: "resolve",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" }
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" }
      ]
    }
  ];
  universalResolverReverseAbi = [
    ...universalResolverErrors,
    {
      name: "reverse",
      type: "function",
      stateMutability: "view",
      inputs: [{ type: "bytes", name: "reverseName" }],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolvedAddress" },
        { type: "address", name: "reverseResolver" },
        { type: "address", name: "resolver" }
      ]
    }
  ];
  textResolverAbi = [
    {
      name: "text",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "key", type: "string" }
      ],
      outputs: [{ name: "", type: "string" }]
    }
  ];
  addressResolverAbi = [
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "name", type: "bytes32" }],
      outputs: [{ name: "", type: "address" }]
    },
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "coinType", type: "uint256" }
      ],
      outputs: [{ name: "", type: "bytes" }]
    }
  ];
  universalSignatureValidatorAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_signer",
          type: "address"
        },
        {
          internalType: "bytes32",
          name: "_hash",
          type: "bytes32"
        },
        {
          internalType: "bytes",
          name: "_signature",
          type: "bytes"
        }
      ],
      stateMutability: "nonpayable",
      type: "constructor"
    }
  ];
});

// node_modules/viem/_esm/constants/contract.js
var aggregate3Signature;
var init_contract2 = __esm(() => {
  aggregate3Signature = "0x82ad56cb";
});

// node_modules/viem/_esm/errors/chain.js
class ChainDoesNotSupportContract extends BaseError {
  constructor({ blockNumber, chain, contract: contract2 }) {
    super(`Chain "${chain.name}" does not support contract "${contract2.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...blockNumber && contract2.blockCreated && contract2.blockCreated > blockNumber ? [
          `- The contract "${contract2.name}" was not deployed until block ${contract2.blockCreated} (current block ${blockNumber}).`
        ] : [
          `- The chain does not have the contract "${contract2.name}" configured.`
        ]
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ChainDoesNotSupportContract"
    });
  }
}

class ClientChainNotConfiguredError extends BaseError {
  constructor() {
    super("No chain was provided to the Client.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "ClientChainNotConfiguredError"
    });
  }
}
var init_chain = __esm(() => {
  init_base();
});

// node_modules/viem/_esm/utils/chain/getChainContractAddress.js
function getChainContractAddress({ blockNumber, chain: chain2, contract: name }) {
  const contract2 = chain2?.contracts?.[name];
  if (!contract2)
    throw new ChainDoesNotSupportContract({
      chain: chain2,
      contract: { name }
    });
  if (blockNumber && contract2.blockCreated && contract2.blockCreated > blockNumber)
    throw new ChainDoesNotSupportContract({
      blockNumber,
      chain: chain2,
      contract: {
        name,
        blockCreated: contract2.blockCreated
      }
    });
  return contract2.address;
}
var init_getChainContractAddress = __esm(() => {
  init_chain();
});

// node_modules/viem/_esm/utils/errors/getCallError.js
function getCallError(err, { docsPath: docsPath3, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new CallExecutionError(cause, {
    docsPath: docsPath3,
    ...args
  });
}
var init_getCallError = __esm(() => {
  init_contract();
  init_node();
  init_getNodeError();
});

// node_modules/viem/_esm/utils/promise/createBatchScheduler.js
function createBatchScheduler({ fn, id, shouldSplitBatch, wait = 0, sort }) {
  const exec = async () => {
    const scheduler = getScheduler();
    flush();
    const args = scheduler.map(({ args: args2 }) => args2);
    if (args.length === 0)
      return;
    fn(args).then((data3) => {
      if (sort && Array.isArray(data3))
        data3.sort(sort);
      for (let i = 0;i < scheduler.length; i++) {
        const { pendingPromise } = scheduler[i];
        pendingPromise.resolve?.([data3[i], data3]);
      }
    }).catch((err) => {
      for (let i = 0;i < scheduler.length; i++) {
        const { pendingPromise } = scheduler[i];
        pendingPromise.reject?.(err);
      }
    });
  };
  const flush = () => schedulerCache.delete(id);
  const getBatchedArgs = () => getScheduler().map(({ args }) => args);
  const getScheduler = () => schedulerCache.get(id) || [];
  const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
  return {
    flush,
    async schedule(args) {
      const pendingPromise = {};
      const promise = new Promise((resolve, reject) => {
        pendingPromise.resolve = resolve;
        pendingPromise.reject = reject;
      });
      const split2 = shouldSplitBatch?.([...getBatchedArgs(), args]);
      if (split2)
        exec();
      const hasActiveScheduler = getScheduler().length > 0;
      if (hasActiveScheduler) {
        setScheduler({ args, pendingPromise });
        return promise;
      }
      setScheduler({ args, pendingPromise });
      setTimeout(exec, wait);
      return promise;
    }
  };
}
var schedulerCache;
var init_createBatchScheduler = __esm(() => {
  schedulerCache = new Map;
});

// node_modules/viem/_esm/errors/ccip.js
class OffchainLookupError extends BaseError {
  constructor({ callbackSelector, cause, data: data3, extraData, sender, urls }) {
    super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
      cause,
      metaMessages: [
        ...cause.metaMessages || [],
        cause.metaMessages?.length ? "" : [],
        "Offchain Gateway Call:",
        urls && [
          "  Gateway URL(s):",
          ...urls.map((url) => `    ${getUrl(url)}`)
        ],
        `  Sender: ${sender}`,
        `  Data: ${data3}`,
        `  Callback selector: ${callbackSelector}`,
        `  Extra data: ${extraData}`
      ].flat()
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "OffchainLookupError"
    });
  }
}

class OffchainLookupResponseMalformedError extends BaseError {
  constructor({ result, url }) {
    super("Offchain gateway response is malformed. Response data must be a hex value.", {
      metaMessages: [
        `Gateway URL: ${getUrl(url)}`,
        `Response: ${stringify(result)}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "OffchainLookupResponseMalformedError"
    });
  }
}

class OffchainLookupSenderMismatchError extends BaseError {
  constructor({ sender, to }) {
    super("Reverted sender address does not match target contract address (`to`).", {
      metaMessages: [
        `Contract address: ${to}`,
        `OffchainLookup sender address: ${sender}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "OffchainLookupSenderMismatchError"
    });
  }
}
var init_ccip = __esm(() => {
  init_stringify();
  init_base();
  init_utils();
});

// node_modules/viem/_esm/utils/address/isAddressEqual.js
function isAddressEqual(a, b) {
  if (!isAddress(a))
    throw new InvalidAddressError({ address: a });
  if (!isAddress(b))
    throw new InvalidAddressError({ address: b });
  return a.toLowerCase() === b.toLowerCase();
}
var init_isAddressEqual = __esm(() => {
  init_address();
  init_isAddress();
});

// node_modules/viem/_esm/utils/ccip.js
var exports_ccip = {};
__export(exports_ccip, {
  offchainLookupSignature: () => {
    {
      return offchainLookupSignature;
    }
  },
  offchainLookupAbiItem: () => {
    {
      return offchainLookupAbiItem;
    }
  },
  offchainLookup: () => {
    {
      return offchainLookup;
    }
  },
  ccipFetch: () => {
    {
      return ccipFetch;
    }
  }
});
async function offchainLookup(client, { blockNumber, blockTag, data: data3, to }) {
  const { args } = decodeErrorResult({
    data: data3,
    abi: [offchainLookupAbiItem]
  });
  const [sender, urls, callData, callbackSelector, extraData] = args;
  try {
    if (!isAddressEqual(to, sender))
      throw new OffchainLookupSenderMismatchError({ sender, to });
    const result = await ccipFetch({ data: callData, sender, urls });
    const { data: data_ } = await call2(client, {
      blockNumber,
      blockTag,
      data: concat([
        callbackSelector,
        encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
      ]),
      to
    });
    return data_;
  } catch (err) {
    throw new OffchainLookupError({
      callbackSelector,
      cause: err,
      data: data3,
      extraData,
      sender,
      urls
    });
  }
}
async function ccipFetch({ data: data3, sender, urls }) {
  let error = new Error("An unknown error occurred.");
  for (let i = 0;i < urls.length; i++) {
    const url = urls[i];
    const method = url.includes("{data}") ? "GET" : "POST";
    const body = method === "POST" ? { data: data3, sender } : undefined;
    try {
      const response = await fetch(url.replace("{sender}", sender).replace("{data}", data3), {
        body: JSON.stringify(body),
        method
      });
      let result;
      if (response.headers.get("Content-Type")?.startsWith("application/json")) {
        result = (await response.json()).data;
      } else {
        result = await response.text();
      }
      if (!response.ok) {
        error = new HttpRequestError({
          body,
          details: result?.error ? stringify(result.error) : response.statusText,
          headers: response.headers,
          status: response.status,
          url
        });
        continue;
      }
      if (!isHex(result)) {
        error = new OffchainLookupResponseMalformedError({
          result,
          url
        });
        continue;
      }
      return result;
    } catch (err) {
      error = new HttpRequestError({
        body,
        details: err.message,
        url
      });
    }
  }
  throw error;
}
var offchainLookupSignature, offchainLookupAbiItem;
var init_ccip2 = __esm(() => {
  init_call();
  init_ccip();
  init_request();
  init_decodeErrorResult();
  init_encodeAbiParameters();
  init_isAddressEqual();
  init_concat();
  init_isHex();
  init_stringify();
  offchainLookupSignature = "0x556f1830";
  offchainLookupAbiItem = {
    name: "OffchainLookup",
    type: "error",
    inputs: [
      {
        name: "sender",
        type: "address"
      },
      {
        name: "urls",
        type: "string[]"
      },
      {
        name: "callData",
        type: "bytes"
      },
      {
        name: "callbackFunction",
        type: "bytes4"
      },
      {
        name: "extraData",
        type: "bytes"
      }
    ]
  };
});

// node_modules/viem/_esm/actions/public/call.js
async function call2(client, args) {
  const { account: account_ = client.account, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = "latest", accessList, data: data3, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
  const account3 = account_ ? parseAccount(account_) : undefined;
  try {
    assertRequest(args);
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
    const block3 = blockNumberHex || blockTag;
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request3 = format({
      ...extract(rest, { format: chainFormat }),
      from: account3?.address,
      accessList,
      data: data3,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    if (batch && shouldPerformMulticall({ request: request3 })) {
      try {
        return await scheduleMulticall(client, {
          ...request3,
          blockNumber,
          blockTag
        });
      } catch (err) {
        if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract))
          throw err;
      }
    }
    const response = await client.request({
      method: "eth_call",
      params: block3 ? [request3, block3] : [request3]
    });
    if (response === "0x")
      return { data: undefined };
    return { data: response };
  } catch (err) {
    const data4 = getRevertErrorData(err);
    const { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 } = await Promise.resolve().then(() => (init_ccip2(), exports_ccip));
    if (data4?.slice(0, 10) === offchainLookupSignature2 && to) {
      return { data: await offchainLookup2(client, { data: data4, to }) };
    }
    throw getCallError(err, {
      ...args,
      account: account3,
      chain: client.chain
    });
  }
}
async function scheduleMulticall(client, args) {
  const { batchSize = 1024, wait = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const { blockNumber, blockTag = "latest", data: data3, multicallAddress: multicallAddress_, to } = args;
  let multicallAddress = multicallAddress_;
  if (!multicallAddress) {
    if (!client.chain)
      throw new ClientChainNotConfiguredError;
    multicallAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  }
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
  const block3 = blockNumberHex || blockTag;
  const { schedule } = createBatchScheduler({
    id: `${client.uid}.${block3}`,
    wait,
    shouldSplitBatch(args2) {
      const size7 = args2.reduce((size8, { data: data4 }) => size8 + (data4.length - 2), 0);
      return size7 > batchSize * 2;
    },
    fn: async (requests) => {
      const calls = requests.map((request3) => ({
        allowFailure: true,
        callData: request3.data,
        target: request3.to
      }));
      const calldata = encodeFunctionData({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3"
      });
      const data4 = await client.request({
        method: "eth_call",
        params: [
          {
            data: calldata,
            to: multicallAddress
          },
          block3
        ]
      });
      return decodeFunctionResult({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3",
        data: data4 || "0x"
      });
    }
  });
  const [{ returnData, success }] = await schedule({ data: data3, to });
  if (!success)
    throw new RawContractError({ data: returnData });
  if (returnData === "0x")
    return { data: undefined };
  return { data: returnData };
}
function getRevertErrorData(err) {
  if (!(err instanceof BaseError))
    return;
  const error = err.walk();
  return typeof error.data === "object" ? error.data.data : error.data;
}
var shouldPerformMulticall;
var init_call = __esm(() => {
  init_parseAccount();
  init_abis();
  init_contract2();
  init_base();
  init_chain();
  init_contract();
  init_decodeFunctionResult();
  init_encodeFunctionData();
  init_getChainContractAddress();
  init_toHex();
  init_getCallError();
  init_extract();
  init_transactionRequest();
  init_createBatchScheduler();
  init_assertRequest();
  shouldPerformMulticall = function({ request: request3 }) {
    const { data: data3, to, ...request_ } = request3;
    if (!data3)
      return false;
    if (data3.startsWith(aggregate3Signature))
      return false;
    if (!to)
      return false;
    if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
      return false;
    return true;
  };
});

// node_modules/ws/lib/stream.js
var require_stream = __commonJS((exports, module) => {
  var emitClose = function(stream) {
    stream.emit("close");
  };
  var duplexOnEnd = function() {
    if (!this.destroyed && this._writableState.finished) {
      this.destroy();
    }
  };
  var duplexOnError = function(err) {
    this.removeListener("error", duplexOnError);
    this.destroy();
    if (this.listenerCount("error") === 0) {
      this.emit("error", err);
    }
  };
  var createWebSocketStream = function(ws, options) {
    let terminateOnDestroy = true;
    const duplex = new Duplex({
      ...options,
      autoDestroy: false,
      emitClose: false,
      objectMode: false,
      writableObjectMode: false
    });
    ws.on("message", function message(msg, isBinary) {
      const data3 = !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;
      if (!duplex.push(data3))
        ws.pause();
    });
    ws.once("error", function error(err) {
      if (duplex.destroyed)
        return;
      terminateOnDestroy = false;
      duplex.destroy(err);
    });
    ws.once("close", function close() {
      if (duplex.destroyed)
        return;
      duplex.push(null);
    });
    duplex._destroy = function(err, callback) {
      if (ws.readyState === ws.CLOSED) {
        callback(err);
        process.nextTick(emitClose, duplex);
        return;
      }
      let called = false;
      ws.once("error", function error(err2) {
        called = true;
        callback(err2);
      });
      ws.once("close", function close() {
        if (!called)
          callback(err);
        process.nextTick(emitClose, duplex);
      });
      if (terminateOnDestroy)
        ws.terminate();
    };
    duplex._final = function(callback) {
      if (ws.readyState === ws.CONNECTING) {
        ws.once("open", function open() {
          duplex._final(callback);
        });
        return;
      }
      if (ws._socket === null)
        return;
      if (ws._socket._writableState.finished) {
        callback();
        if (duplex._readableState.endEmitted)
          duplex.destroy();
      } else {
        ws._socket.once("finish", function finish() {
          callback();
        });
        ws.close();
      }
    };
    duplex._read = function() {
      if (ws.isPaused)
        ws.resume();
    };
    duplex._write = function(chunk, encoding3, callback) {
      if (ws.readyState === ws.CONNECTING) {
        ws.once("open", function open() {
          duplex._write(chunk, encoding3, callback);
        });
        return;
      }
      ws.send(chunk, callback);
    };
    duplex.on("end", duplexOnEnd);
    duplex.on("error", duplexOnError);
    return duplex;
  };
  var { Duplex } = __require("stream");
  module.exports = createWebSocketStream;
});

// node_modules/ws/lib/constants.js
var require_constants = __commonJS((exports, module) => {
  module.exports = {
    BINARY_TYPES: ["nodebuffer", "arraybuffer", "fragments"],
    EMPTY_BUFFER: Buffer.alloc(0),
    GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
    kForOnEventAttribute: Symbol("kIsForOnEventAttribute"),
    kListener: Symbol("kListener"),
    kStatusCode: Symbol("status-code"),
    kWebSocket: Symbol("websocket"),
    NOOP: () => {
    }
  };
});

// node_modules/ws/lib/buffer-util.js
var require_buffer_util = __commonJS((exports, module) => {
  var concat5 = function(list, totalLength) {
    if (list.length === 0)
      return EMPTY_BUFFER;
    if (list.length === 1)
      return list[0];
    const target = Buffer.allocUnsafe(totalLength);
    let offset = 0;
    for (let i = 0;i < list.length; i++) {
      const buf = list[i];
      target.set(buf, offset);
      offset += buf.length;
    }
    if (offset < totalLength) {
      return new FastBuffer(target.buffer, target.byteOffset, offset);
    }
    return target;
  };
  var _mask = function(source, mask, output2, offset, length) {
    for (let i = 0;i < length; i++) {
      output2[offset + i] = source[i] ^ mask[i & 3];
    }
  };
  var _unmask = function(buffer2, mask) {
    for (let i = 0;i < buffer2.length; i++) {
      buffer2[i] ^= mask[i & 3];
    }
  };
  var toArrayBuffer = function(buf) {
    if (buf.length === buf.buffer.byteLength) {
      return buf.buffer;
    }
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
  };
  var toBuffer = function(data3) {
    toBuffer.readOnly = true;
    if (Buffer.isBuffer(data3))
      return data3;
    let buf;
    if (data3 instanceof ArrayBuffer) {
      buf = new FastBuffer(data3);
    } else if (ArrayBuffer.isView(data3)) {
      buf = new FastBuffer(data3.buffer, data3.byteOffset, data3.byteLength);
    } else {
      buf = Buffer.from(data3);
      toBuffer.readOnly = false;
    }
    return buf;
  };
  var { EMPTY_BUFFER } = require_constants();
  var FastBuffer = Buffer[Symbol.species];
  module.exports = {
    concat: concat5,
    mask: _mask,
    toArrayBuffer,
    toBuffer,
    unmask: _unmask
  };
  if (!process.env.WS_NO_BUFFER_UTIL) {
    try {
      const bufferUtil = (()=>{ throw new Error(`Cannot require module "bufferutil"`);})();
      module.exports.mask = function(source, mask, output2, offset, length) {
        if (length < 48)
          _mask(source, mask, output2, offset, length);
        else
          bufferUtil.mask(source, mask, output2, offset, length);
      };
      module.exports.unmask = function(buffer2, mask) {
        if (buffer2.length < 32)
          _unmask(buffer2, mask);
        else
          bufferUtil.unmask(buffer2, mask);
      };
    } catch (e) {
    }
  }
});

// node_modules/ws/lib/limiter.js
var require_limiter = __commonJS((exports, module) => {
  var kDone = Symbol("kDone");
  var kRun = Symbol("kRun");

  class Limiter {
    constructor(concurrency) {
      this[kDone] = () => {
        this.pending--;
        this[kRun]();
      };
      this.concurrency = concurrency || Infinity;
      this.jobs = [];
      this.pending = 0;
    }
    add(job) {
      this.jobs.push(job);
      this[kRun]();
    }
    [kRun]() {
      if (this.pending === this.concurrency)
        return;
      if (this.jobs.length) {
        const job = this.jobs.shift();
        this.pending++;
        job(this[kDone]);
      }
    }
  }
  module.exports = Limiter;
});

// node_modules/ws/lib/permessage-deflate.js
var require_permessage_deflate = __commonJS((exports, module) => {
  var deflateOnData = function(chunk) {
    this[kBuffers].push(chunk);
    this[kTotalLength] += chunk.length;
  };
  var inflateOnData = function(chunk) {
    this[kTotalLength] += chunk.length;
    if (this[kPerMessageDeflate]._maxPayload < 1 || this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload) {
      this[kBuffers].push(chunk);
      return;
    }
    this[kError] = new RangeError("Max payload size exceeded");
    this[kError].code = "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH";
    this[kError][kStatusCode] = 1009;
    this.removeListener("data", inflateOnData);
    this.reset();
  };
  var inflateOnError = function(err) {
    this[kPerMessageDeflate]._inflate = null;
    err[kStatusCode] = 1007;
    this[kCallback](err);
  };
  var zlib = __require("zlib");
  var bufferUtil = require_buffer_util();
  var Limiter = require_limiter();
  var { kStatusCode } = require_constants();
  var FastBuffer = Buffer[Symbol.species];
  var TRAILER = Buffer.from([0, 0, 255, 255]);
  var kPerMessageDeflate = Symbol("permessage-deflate");
  var kTotalLength = Symbol("total-length");
  var kCallback = Symbol("callback");
  var kBuffers = Symbol("buffers");
  var kError = Symbol("error");
  var zlibLimiter;

  class PerMessageDeflate {
    constructor(options, isServer, maxPayload) {
      this._maxPayload = maxPayload | 0;
      this._options = options || {};
      this._threshold = this._options.threshold !== undefined ? this._options.threshold : 1024;
      this._isServer = !!isServer;
      this._deflate = null;
      this._inflate = null;
      this.params = null;
      if (!zlibLimiter) {
        const concurrency = this._options.concurrencyLimit !== undefined ? this._options.concurrencyLimit : 10;
        zlibLimiter = new Limiter(concurrency);
      }
    }
    static get extensionName() {
      return "permessage-deflate";
    }
    offer() {
      const params = {};
      if (this._options.serverNoContextTakeover) {
        params.server_no_context_takeover = true;
      }
      if (this._options.clientNoContextTakeover) {
        params.client_no_context_takeover = true;
      }
      if (this._options.serverMaxWindowBits) {
        params.server_max_window_bits = this._options.serverMaxWindowBits;
      }
      if (this._options.clientMaxWindowBits) {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      } else if (this._options.clientMaxWindowBits == null) {
        params.client_max_window_bits = true;
      }
      return params;
    }
    accept(configurations) {
      configurations = this.normalizeParams(configurations);
      this.params = this._isServer ? this.acceptAsServer(configurations) : this.acceptAsClient(configurations);
      return this.params;
    }
    cleanup() {
      if (this._inflate) {
        this._inflate.close();
        this._inflate = null;
      }
      if (this._deflate) {
        const callback = this._deflate[kCallback];
        this._deflate.close();
        this._deflate = null;
        if (callback) {
          callback(new Error("The deflate stream was closed while data was being processed"));
        }
      }
    }
    acceptAsServer(offers) {
      const opts = this._options;
      const accepted = offers.find((params) => {
        if (opts.serverNoContextTakeover === false && params.server_no_context_takeover || params.server_max_window_bits && (opts.serverMaxWindowBits === false || typeof opts.serverMaxWindowBits === "number" && opts.serverMaxWindowBits > params.server_max_window_bits) || typeof opts.clientMaxWindowBits === "number" && !params.client_max_window_bits) {
          return false;
        }
        return true;
      });
      if (!accepted) {
        throw new Error("None of the extension offers can be accepted");
      }
      if (opts.serverNoContextTakeover) {
        accepted.server_no_context_takeover = true;
      }
      if (opts.clientNoContextTakeover) {
        accepted.client_no_context_takeover = true;
      }
      if (typeof opts.serverMaxWindowBits === "number") {
        accepted.server_max_window_bits = opts.serverMaxWindowBits;
      }
      if (typeof opts.clientMaxWindowBits === "number") {
        accepted.client_max_window_bits = opts.clientMaxWindowBits;
      } else if (accepted.client_max_window_bits === true || opts.clientMaxWindowBits === false) {
        delete accepted.client_max_window_bits;
      }
      return accepted;
    }
    acceptAsClient(response) {
      const params = response[0];
      if (this._options.clientNoContextTakeover === false && params.client_no_context_takeover) {
        throw new Error('Unexpected parameter "client_no_context_takeover"');
      }
      if (!params.client_max_window_bits) {
        if (typeof this._options.clientMaxWindowBits === "number") {
          params.client_max_window_bits = this._options.clientMaxWindowBits;
        }
      } else if (this._options.clientMaxWindowBits === false || typeof this._options.clientMaxWindowBits === "number" && params.client_max_window_bits > this._options.clientMaxWindowBits) {
        throw new Error('Unexpected or invalid parameter "client_max_window_bits"');
      }
      return params;
    }
    normalizeParams(configurations) {
      configurations.forEach((params) => {
        Object.keys(params).forEach((key) => {
          let value = params[key];
          if (value.length > 1) {
            throw new Error(`Parameter "${key}" must have only a single value`);
          }
          value = value[0];
          if (key === "client_max_window_bits") {
            if (value !== true) {
              const num = +value;
              if (!Number.isInteger(num) || num < 8 || num > 15) {
                throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
              }
              value = num;
            } else if (!this._isServer) {
              throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
            }
          } else if (key === "server_max_window_bits") {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
            }
            value = num;
          } else if (key === "client_no_context_takeover" || key === "server_no_context_takeover") {
            if (value !== true) {
              throw new TypeError(`Invalid value for parameter "${key}": ${value}`);
            }
          } else {
            throw new Error(`Unknown parameter "${key}"`);
          }
          params[key] = value;
        });
      });
      return configurations;
    }
    decompress(data3, fin, callback) {
      zlibLimiter.add((done) => {
        this._decompress(data3, fin, (err, result) => {
          done();
          callback(err, result);
        });
      });
    }
    compress(data3, fin, callback) {
      zlibLimiter.add((done) => {
        this._compress(data3, fin, (err, result) => {
          done();
          callback(err, result);
        });
      });
    }
    _decompress(data3, fin, callback) {
      const endpoint = this._isServer ? "client" : "server";
      if (!this._inflate) {
        const key = `${endpoint}_max_window_bits`;
        const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
        this._inflate = zlib.createInflateRaw({
          ...this._options.zlibInflateOptions,
          windowBits
        });
        this._inflate[kPerMessageDeflate] = this;
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];
        this._inflate.on("error", inflateOnError);
        this._inflate.on("data", inflateOnData);
      }
      this._inflate[kCallback] = callback;
      this._inflate.write(data3);
      if (fin)
        this._inflate.write(TRAILER);
      this._inflate.flush(() => {
        const err = this._inflate[kError];
        if (err) {
          this._inflate.close();
          this._inflate = null;
          callback(err);
          return;
        }
        const data4 = bufferUtil.concat(this._inflate[kBuffers], this._inflate[kTotalLength]);
        if (this._inflate._readableState.endEmitted) {
          this._inflate.close();
          this._inflate = null;
        } else {
          this._inflate[kTotalLength] = 0;
          this._inflate[kBuffers] = [];
          if (fin && this.params[`${endpoint}_no_context_takeover`]) {
            this._inflate.reset();
          }
        }
        callback(null, data4);
      });
    }
    _compress(data3, fin, callback) {
      const endpoint = this._isServer ? "server" : "client";
      if (!this._deflate) {
        const key = `${endpoint}_max_window_bits`;
        const windowBits = typeof this.params[key] !== "number" ? zlib.Z_DEFAULT_WINDOWBITS : this.params[key];
        this._deflate = zlib.createDeflateRaw({
          ...this._options.zlibDeflateOptions,
          windowBits
        });
        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = [];
        this._deflate.on("data", deflateOnData);
      }
      this._deflate[kCallback] = callback;
      this._deflate.write(data3);
      this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
        if (!this._deflate) {
          return;
        }
        let data4 = bufferUtil.concat(this._deflate[kBuffers], this._deflate[kTotalLength]);
        if (fin) {
          data4 = new FastBuffer(data4.buffer, data4.byteOffset, data4.length - 4);
        }
        this._deflate[kCallback] = null;
        this._deflate[kTotalLength] = 0;
        this._deflate[kBuffers] = [];
        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._deflate.reset();
        }
        callback(null, data4);
      });
    }
  }
  module.exports = PerMessageDeflate;
});

// node_modules/ws/lib/validation.js
var require_validation = __commonJS((exports, module) => {
  var isValidStatusCode = function(code) {
    return code >= 1000 && code <= 1014 && code !== 1004 && code !== 1005 && code !== 1006 || code >= 3000 && code <= 4999;
  };
  var _isValidUTF8 = function(buf) {
    const len = buf.length;
    let i = 0;
    while (i < len) {
      if ((buf[i] & 128) === 0) {
        i++;
      } else if ((buf[i] & 224) === 192) {
        if (i + 1 === len || (buf[i + 1] & 192) !== 128 || (buf[i] & 254) === 192) {
          return false;
        }
        i += 2;
      } else if ((buf[i] & 240) === 224) {
        if (i + 2 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || buf[i] === 224 && (buf[i + 1] & 224) === 128 || buf[i] === 237 && (buf[i + 1] & 224) === 160) {
          return false;
        }
        i += 3;
      } else if ((buf[i] & 248) === 240) {
        if (i + 3 >= len || (buf[i + 1] & 192) !== 128 || (buf[i + 2] & 192) !== 128 || (buf[i + 3] & 192) !== 128 || buf[i] === 240 && (buf[i + 1] & 240) === 128 || buf[i] === 244 && buf[i + 1] > 143 || buf[i] > 244) {
          return false;
        }
        i += 4;
      } else {
        return false;
      }
    }
    return true;
  };
  var { isUtf8 } = __require("buffer");
  var tokenChars = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    1,
    0,
    1,
    0
  ];
  module.exports = {
    isValidStatusCode,
    isValidUTF8: _isValidUTF8,
    tokenChars
  };
  if (isUtf8) {
    module.exports.isValidUTF8 = function(buf) {
      return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
    };
  } else if (!process.env.WS_NO_UTF_8_VALIDATE) {
    try {
      const isValidUTF8 = (()=>{ throw new Error(`Cannot require module "utf-8-validate"`);})();
      module.exports.isValidUTF8 = function(buf) {
        return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
      };
    } catch (e) {
    }
  }
});

// node_modules/ws/lib/receiver.js
var require_receiver = __commonJS((exports, module) => {
  var error = function(ErrorCtor, message, prefix, statusCode, errorCode) {
    const err = new ErrorCtor(prefix ? `Invalid WebSocket frame: ${message}` : message);
    Error.captureStackTrace(err, error);
    err.code = errorCode;
    err[kStatusCode] = statusCode;
    return err;
  };
  var { Writable } = __require("stream");
  var PerMessageDeflate = require_permessage_deflate();
  var {
    BINARY_TYPES,
    EMPTY_BUFFER,
    kStatusCode,
    kWebSocket
  } = require_constants();
  var { concat: concat5, toArrayBuffer, unmask } = require_buffer_util();
  var { isValidStatusCode, isValidUTF8 } = require_validation();
  var FastBuffer = Buffer[Symbol.species];
  var GET_INFO = 0;
  var GET_PAYLOAD_LENGTH_16 = 1;
  var GET_PAYLOAD_LENGTH_64 = 2;
  var GET_MASK = 3;
  var GET_DATA = 4;
  var INFLATING = 5;

  class Receiver extends Writable {
    constructor(options = {}) {
      super();
      this._binaryType = options.binaryType || BINARY_TYPES[0];
      this._extensions = options.extensions || {};
      this._isServer = !!options.isServer;
      this._maxPayload = options.maxPayload | 0;
      this._skipUTF8Validation = !!options.skipUTF8Validation;
      this[kWebSocket] = undefined;
      this._bufferedBytes = 0;
      this._buffers = [];
      this._compressed = false;
      this._payloadLength = 0;
      this._mask = undefined;
      this._fragmented = 0;
      this._masked = false;
      this._fin = false;
      this._opcode = 0;
      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragments = [];
      this._state = GET_INFO;
      this._loop = false;
    }
    _write(chunk, encoding3, cb) {
      if (this._opcode === 8 && this._state == GET_INFO)
        return cb();
      this._bufferedBytes += chunk.length;
      this._buffers.push(chunk);
      this.startLoop(cb);
    }
    consume(n) {
      this._bufferedBytes -= n;
      if (n === this._buffers[0].length)
        return this._buffers.shift();
      if (n < this._buffers[0].length) {
        const buf = this._buffers[0];
        this._buffers[0] = new FastBuffer(buf.buffer, buf.byteOffset + n, buf.length - n);
        return new FastBuffer(buf.buffer, buf.byteOffset, n);
      }
      const dst = Buffer.allocUnsafe(n);
      do {
        const buf = this._buffers[0];
        const offset = dst.length - n;
        if (n >= buf.length) {
          dst.set(this._buffers.shift(), offset);
        } else {
          dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
          this._buffers[0] = new FastBuffer(buf.buffer, buf.byteOffset + n, buf.length - n);
        }
        n -= buf.length;
      } while (n > 0);
      return dst;
    }
    startLoop(cb) {
      let err;
      this._loop = true;
      do {
        switch (this._state) {
          case GET_INFO:
            err = this.getInfo();
            break;
          case GET_PAYLOAD_LENGTH_16:
            err = this.getPayloadLength16();
            break;
          case GET_PAYLOAD_LENGTH_64:
            err = this.getPayloadLength64();
            break;
          case GET_MASK:
            this.getMask();
            break;
          case GET_DATA:
            err = this.getData(cb);
            break;
          default:
            this._loop = false;
            return;
        }
      } while (this._loop);
      cb(err);
    }
    getInfo() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }
      const buf = this.consume(2);
      if ((buf[0] & 48) !== 0) {
        this._loop = false;
        return error(RangeError, "RSV2 and RSV3 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_2_3");
      }
      const compressed = (buf[0] & 64) === 64;
      if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
        this._loop = false;
        return error(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
      }
      this._fin = (buf[0] & 128) === 128;
      this._opcode = buf[0] & 15;
      this._payloadLength = buf[1] & 127;
      if (this._opcode === 0) {
        if (compressed) {
          this._loop = false;
          return error(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
        }
        if (!this._fragmented) {
          this._loop = false;
          return error(RangeError, "invalid opcode 0", true, 1002, "WS_ERR_INVALID_OPCODE");
        }
        this._opcode = this._fragmented;
      } else if (this._opcode === 1 || this._opcode === 2) {
        if (this._fragmented) {
          this._loop = false;
          return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002, "WS_ERR_INVALID_OPCODE");
        }
        this._compressed = compressed;
      } else if (this._opcode > 7 && this._opcode < 11) {
        if (!this._fin) {
          this._loop = false;
          return error(RangeError, "FIN must be set", true, 1002, "WS_ERR_EXPECTED_FIN");
        }
        if (compressed) {
          this._loop = false;
          return error(RangeError, "RSV1 must be clear", true, 1002, "WS_ERR_UNEXPECTED_RSV_1");
        }
        if (this._payloadLength > 125 || this._opcode === 8 && this._payloadLength === 1) {
          this._loop = false;
          return error(RangeError, `invalid payload length ${this._payloadLength}`, true, 1002, "WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");
        }
      } else {
        this._loop = false;
        return error(RangeError, `invalid opcode ${this._opcode}`, true, 1002, "WS_ERR_INVALID_OPCODE");
      }
      if (!this._fin && !this._fragmented)
        this._fragmented = this._opcode;
      this._masked = (buf[1] & 128) === 128;
      if (this._isServer) {
        if (!this._masked) {
          this._loop = false;
          return error(RangeError, "MASK must be set", true, 1002, "WS_ERR_EXPECTED_MASK");
        }
      } else if (this._masked) {
        this._loop = false;
        return error(RangeError, "MASK must be clear", true, 1002, "WS_ERR_UNEXPECTED_MASK");
      }
      if (this._payloadLength === 126)
        this._state = GET_PAYLOAD_LENGTH_16;
      else if (this._payloadLength === 127)
        this._state = GET_PAYLOAD_LENGTH_64;
      else
        return this.haveLength();
    }
    getPayloadLength16() {
      if (this._bufferedBytes < 2) {
        this._loop = false;
        return;
      }
      this._payloadLength = this.consume(2).readUInt16BE(0);
      return this.haveLength();
    }
    getPayloadLength64() {
      if (this._bufferedBytes < 8) {
        this._loop = false;
        return;
      }
      const buf = this.consume(8);
      const num = buf.readUInt32BE(0);
      if (num > Math.pow(2, 53 - 32) - 1) {
        this._loop = false;
        return error(RangeError, "Unsupported WebSocket frame: payload length > 2^53 - 1", false, 1009, "WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");
      }
      this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
      return this.haveLength();
    }
    haveLength() {
      if (this._payloadLength && this._opcode < 8) {
        this._totalPayloadLength += this._payloadLength;
        if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
          this._loop = false;
          return error(RangeError, "Max payload size exceeded", false, 1009, "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");
        }
      }
      if (this._masked)
        this._state = GET_MASK;
      else
        this._state = GET_DATA;
    }
    getMask() {
      if (this._bufferedBytes < 4) {
        this._loop = false;
        return;
      }
      this._mask = this.consume(4);
      this._state = GET_DATA;
    }
    getData(cb) {
      let data3 = EMPTY_BUFFER;
      if (this._payloadLength) {
        if (this._bufferedBytes < this._payloadLength) {
          this._loop = false;
          return;
        }
        data3 = this.consume(this._payloadLength);
        if (this._masked && (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0) {
          unmask(data3, this._mask);
        }
      }
      if (this._opcode > 7)
        return this.controlMessage(data3);
      if (this._compressed) {
        this._state = INFLATING;
        this.decompress(data3, cb);
        return;
      }
      if (data3.length) {
        this._messageLength = this._totalPayloadLength;
        this._fragments.push(data3);
      }
      return this.dataMessage();
    }
    decompress(data3, cb) {
      const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
      perMessageDeflate.decompress(data3, this._fin, (err, buf) => {
        if (err)
          return cb(err);
        if (buf.length) {
          this._messageLength += buf.length;
          if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
            return cb(error(RangeError, "Max payload size exceeded", false, 1009, "WS_ERR_UNSUPPORTED_MESSAGE_LENGTH"));
          }
          this._fragments.push(buf);
        }
        const er = this.dataMessage();
        if (er)
          return cb(er);
        this.startLoop(cb);
      });
    }
    dataMessage() {
      if (this._fin) {
        const messageLength = this._messageLength;
        const fragments = this._fragments;
        this._totalPayloadLength = 0;
        this._messageLength = 0;
        this._fragmented = 0;
        this._fragments = [];
        if (this._opcode === 2) {
          let data3;
          if (this._binaryType === "nodebuffer") {
            data3 = concat5(fragments, messageLength);
          } else if (this._binaryType === "arraybuffer") {
            data3 = toArrayBuffer(concat5(fragments, messageLength));
          } else {
            data3 = fragments;
          }
          this.emit("message", data3, true);
        } else {
          const buf = concat5(fragments, messageLength);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            this._loop = false;
            return error(Error, "invalid UTF-8 sequence", true, 1007, "WS_ERR_INVALID_UTF8");
          }
          this.emit("message", buf, false);
        }
      }
      this._state = GET_INFO;
    }
    controlMessage(data3) {
      if (this._opcode === 8) {
        this._loop = false;
        if (data3.length === 0) {
          this.emit("conclude", 1005, EMPTY_BUFFER);
          this.end();
        } else {
          const code = data3.readUInt16BE(0);
          if (!isValidStatusCode(code)) {
            return error(RangeError, `invalid status code ${code}`, true, 1002, "WS_ERR_INVALID_CLOSE_CODE");
          }
          const buf = new FastBuffer(data3.buffer, data3.byteOffset + 2, data3.length - 2);
          if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
            return error(Error, "invalid UTF-8 sequence", true, 1007, "WS_ERR_INVALID_UTF8");
          }
          this.emit("conclude", code, buf);
          this.end();
        }
      } else if (this._opcode === 9) {
        this.emit("ping", data3);
      } else {
        this.emit("pong", data3);
      }
      this._state = GET_INFO;
    }
  }
  module.exports = Receiver;
});

// node_modules/ws/lib/sender.js
var require_sender = __commonJS((exports, module) => {
  var net = __require("net");
  var tls = __require("tls");
  var { randomFillSync } = __require("crypto");
  var PerMessageDeflate = require_permessage_deflate();
  var { EMPTY_BUFFER } = require_constants();
  var { isValidStatusCode } = require_validation();
  var { mask: applyMask, toBuffer } = require_buffer_util();
  var kByteLength = Symbol("kByteLength");
  var maskBuffer = Buffer.alloc(4);

  class Sender {
    constructor(socket, extensions, generateMask) {
      this._extensions = extensions || {};
      if (generateMask) {
        this._generateMask = generateMask;
        this._maskBuffer = Buffer.alloc(4);
      }
      this._socket = socket;
      this._firstFragment = true;
      this._compress = false;
      this._bufferedBytes = 0;
      this._deflating = false;
      this._queue = [];
    }
    static frame(data3, options) {
      let mask;
      let merge = false;
      let offset = 2;
      let skipMasking = false;
      if (options.mask) {
        mask = options.maskBuffer || maskBuffer;
        if (options.generateMask) {
          options.generateMask(mask);
        } else {
          randomFillSync(mask, 0, 4);
        }
        skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
        offset = 6;
      }
      let dataLength;
      if (typeof data3 === "string") {
        if ((!options.mask || skipMasking) && options[kByteLength] !== undefined) {
          dataLength = options[kByteLength];
        } else {
          data3 = Buffer.from(data3);
          dataLength = data3.length;
        }
      } else {
        dataLength = data3.length;
        merge = options.mask && options.readOnly && !skipMasking;
      }
      let payloadLength = dataLength;
      if (dataLength >= 65536) {
        offset += 8;
        payloadLength = 127;
      } else if (dataLength > 125) {
        offset += 2;
        payloadLength = 126;
      }
      const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);
      target[0] = options.fin ? options.opcode | 128 : options.opcode;
      if (options.rsv1)
        target[0] |= 64;
      target[1] = payloadLength;
      if (payloadLength === 126) {
        target.writeUInt16BE(dataLength, 2);
      } else if (payloadLength === 127) {
        target[2] = target[3] = 0;
        target.writeUIntBE(dataLength, 4, 6);
      }
      if (!options.mask)
        return [target, data3];
      target[1] |= 128;
      target[offset - 4] = mask[0];
      target[offset - 3] = mask[1];
      target[offset - 2] = mask[2];
      target[offset - 1] = mask[3];
      if (skipMasking)
        return [target, data3];
      if (merge) {
        applyMask(data3, mask, target, offset, dataLength);
        return [target];
      }
      applyMask(data3, mask, data3, 0, dataLength);
      return [target, data3];
    }
    close(code, data3, mask, cb) {
      let buf;
      if (code === undefined) {
        buf = EMPTY_BUFFER;
      } else if (typeof code !== "number" || !isValidStatusCode(code)) {
        throw new TypeError("First argument must be a valid error code number");
      } else if (data3 === undefined || !data3.length) {
        buf = Buffer.allocUnsafe(2);
        buf.writeUInt16BE(code, 0);
      } else {
        const length = Buffer.byteLength(data3);
        if (length > 123) {
          throw new RangeError("The message must not be greater than 123 bytes");
        }
        buf = Buffer.allocUnsafe(2 + length);
        buf.writeUInt16BE(code, 0);
        if (typeof data3 === "string") {
          buf.write(data3, 2);
        } else {
          buf.set(data3, 2);
        }
      }
      const options = {
        [kByteLength]: buf.length,
        fin: true,
        generateMask: this._generateMask,
        mask,
        maskBuffer: this._maskBuffer,
        opcode: 8,
        readOnly: false,
        rsv1: false
      };
      if (this._deflating) {
        this.enqueue([this.dispatch, buf, false, options, cb]);
      } else {
        this.sendFrame(Sender.frame(buf, options), cb);
      }
    }
    ping(data3, mask, cb) {
      let byteLength;
      let readOnly;
      if (typeof data3 === "string") {
        byteLength = Buffer.byteLength(data3);
        readOnly = false;
      } else {
        data3 = toBuffer(data3);
        byteLength = data3.length;
        readOnly = toBuffer.readOnly;
      }
      if (byteLength > 125) {
        throw new RangeError("The data size must not be greater than 125 bytes");
      }
      const options = {
        [kByteLength]: byteLength,
        fin: true,
        generateMask: this._generateMask,
        mask,
        maskBuffer: this._maskBuffer,
        opcode: 9,
        readOnly,
        rsv1: false
      };
      if (this._deflating) {
        this.enqueue([this.dispatch, data3, false, options, cb]);
      } else {
        this.sendFrame(Sender.frame(data3, options), cb);
      }
    }
    pong(data3, mask, cb) {
      let byteLength;
      let readOnly;
      if (typeof data3 === "string") {
        byteLength = Buffer.byteLength(data3);
        readOnly = false;
      } else {
        data3 = toBuffer(data3);
        byteLength = data3.length;
        readOnly = toBuffer.readOnly;
      }
      if (byteLength > 125) {
        throw new RangeError("The data size must not be greater than 125 bytes");
      }
      const options = {
        [kByteLength]: byteLength,
        fin: true,
        generateMask: this._generateMask,
        mask,
        maskBuffer: this._maskBuffer,
        opcode: 10,
        readOnly,
        rsv1: false
      };
      if (this._deflating) {
        this.enqueue([this.dispatch, data3, false, options, cb]);
      } else {
        this.sendFrame(Sender.frame(data3, options), cb);
      }
    }
    send(data3, options, cb) {
      const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
      let opcode = options.binary ? 2 : 1;
      let rsv1 = options.compress;
      let byteLength;
      let readOnly;
      if (typeof data3 === "string") {
        byteLength = Buffer.byteLength(data3);
        readOnly = false;
      } else {
        data3 = toBuffer(data3);
        byteLength = data3.length;
        readOnly = toBuffer.readOnly;
      }
      if (this._firstFragment) {
        this._firstFragment = false;
        if (rsv1 && perMessageDeflate && perMessageDeflate.params[perMessageDeflate._isServer ? "server_no_context_takeover" : "client_no_context_takeover"]) {
          rsv1 = byteLength >= perMessageDeflate._threshold;
        }
        this._compress = rsv1;
      } else {
        rsv1 = false;
        opcode = 0;
      }
      if (options.fin)
        this._firstFragment = true;
      if (perMessageDeflate) {
        const opts = {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1
        };
        if (this._deflating) {
          this.enqueue([this.dispatch, data3, this._compress, opts, cb]);
        } else {
          this.dispatch(data3, this._compress, opts, cb);
        }
      } else {
        this.sendFrame(Sender.frame(data3, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }), cb);
      }
    }
    dispatch(data3, compress, options, cb) {
      if (!compress) {
        this.sendFrame(Sender.frame(data3, options), cb);
        return;
      }
      const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
      this._bufferedBytes += options[kByteLength];
      this._deflating = true;
      perMessageDeflate.compress(data3, options.fin, (_, buf) => {
        if (this._socket.destroyed) {
          const err = new Error("The socket was closed while data was being compressed");
          if (typeof cb === "function")
            cb(err);
          for (let i = 0;i < this._queue.length; i++) {
            const params = this._queue[i];
            const callback = params[params.length - 1];
            if (typeof callback === "function")
              callback(err);
          }
          return;
        }
        this._bufferedBytes -= options[kByteLength];
        this._deflating = false;
        options.readOnly = false;
        this.sendFrame(Sender.frame(buf, options), cb);
        this.dequeue();
      });
    }
    dequeue() {
      while (!this._deflating && this._queue.length) {
        const params = this._queue.shift();
        this._bufferedBytes -= params[3][kByteLength];
        Reflect.apply(params[0], this, params.slice(1));
      }
    }
    enqueue(params) {
      this._bufferedBytes += params[3][kByteLength];
      this._queue.push(params);
    }
    sendFrame(list, cb) {
      if (list.length === 2) {
        this._socket.cork();
        this._socket.write(list[0]);
        this._socket.write(list[1], cb);
        this._socket.uncork();
      } else {
        this._socket.write(list[0], cb);
      }
    }
  }
  module.exports = Sender;
});

// node_modules/ws/lib/event-target.js
var require_event_target = __commonJS((exports, module) => {
  var callListener = function(listener, thisArg, event) {
    if (typeof listener === "object" && listener.handleEvent) {
      listener.handleEvent.call(listener, event);
    } else {
      listener.call(thisArg, event);
    }
  };
  var { kForOnEventAttribute, kListener } = require_constants();
  var kCode = Symbol("kCode");
  var kData = Symbol("kData");
  var kError = Symbol("kError");
  var kMessage = Symbol("kMessage");
  var kReason = Symbol("kReason");
  var kTarget = Symbol("kTarget");
  var kType = Symbol("kType");
  var kWasClean = Symbol("kWasClean");

  class Event {
    constructor(type) {
      this[kTarget] = null;
      this[kType] = type;
    }
    get target() {
      return this[kTarget];
    }
    get type() {
      return this[kType];
    }
  }
  Object.defineProperty(Event.prototype, "target", { enumerable: true });
  Object.defineProperty(Event.prototype, "type", { enumerable: true });

  class CloseEvent extends Event {
    constructor(type, options = {}) {
      super(type);
      this[kCode] = options.code === undefined ? 0 : options.code;
      this[kReason] = options.reason === undefined ? "" : options.reason;
      this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
    }
    get code() {
      return this[kCode];
    }
    get reason() {
      return this[kReason];
    }
    get wasClean() {
      return this[kWasClean];
    }
  }
  Object.defineProperty(CloseEvent.prototype, "code", { enumerable: true });
  Object.defineProperty(CloseEvent.prototype, "reason", { enumerable: true });
  Object.defineProperty(CloseEvent.prototype, "wasClean", { enumerable: true });

  class ErrorEvent extends Event {
    constructor(type, options = {}) {
      super(type);
      this[kError] = options.error === undefined ? null : options.error;
      this[kMessage] = options.message === undefined ? "" : options.message;
    }
    get error() {
      return this[kError];
    }
    get message() {
      return this[kMessage];
    }
  }
  Object.defineProperty(ErrorEvent.prototype, "error", { enumerable: true });
  Object.defineProperty(ErrorEvent.prototype, "message", { enumerable: true });

  class MessageEvent extends Event {
    constructor(type, options = {}) {
      super(type);
      this[kData] = options.data === undefined ? null : options.data;
    }
    get data() {
      return this[kData];
    }
  }
  Object.defineProperty(MessageEvent.prototype, "data", { enumerable: true });
  var EventTarget = {
    addEventListener(type, handler, options = {}) {
      for (const listener of this.listeners(type)) {
        if (!options[kForOnEventAttribute] && listener[kListener] === handler && !listener[kForOnEventAttribute]) {
          return;
        }
      }
      let wrapper;
      if (type === "message") {
        wrapper = function onMessage(data3, isBinary) {
          const event = new MessageEvent("message", {
            data: isBinary ? data3 : data3.toString()
          });
          event[kTarget] = this;
          callListener(handler, this, event);
        };
      } else if (type === "close") {
        wrapper = function onClose(code, message) {
          const event = new CloseEvent("close", {
            code,
            reason: message.toString(),
            wasClean: this._closeFrameReceived && this._closeFrameSent
          });
          event[kTarget] = this;
          callListener(handler, this, event);
        };
      } else if (type === "error") {
        wrapper = function onError(error) {
          const event = new ErrorEvent("error", {
            error,
            message: error.message
          });
          event[kTarget] = this;
          callListener(handler, this, event);
        };
      } else if (type === "open") {
        wrapper = function onOpen() {
          const event = new Event("open");
          event[kTarget] = this;
          callListener(handler, this, event);
        };
      } else {
        return;
      }
      wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
      wrapper[kListener] = handler;
      if (options.once) {
        this.once(type, wrapper);
      } else {
        this.on(type, wrapper);
      }
    },
    removeEventListener(type, handler) {
      for (const listener of this.listeners(type)) {
        if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
          this.removeListener(type, listener);
          break;
        }
      }
    }
  };
  module.exports = {
    CloseEvent,
    ErrorEvent,
    Event,
    EventTarget,
    MessageEvent
  };
});

// node_modules/ws/lib/extension.js
var require_extension = __commonJS((exports, module) => {
  var push = function(dest, name, elem) {
    if (dest[name] === undefined)
      dest[name] = [elem];
    else
      dest[name].push(elem);
  };
  var parse = function(header) {
    const offers = Object.create(null);
    let params = Object.create(null);
    let mustUnescape = false;
    let isEscaping = false;
    let inQuotes = false;
    let extensionName;
    let paramName;
    let start = -1;
    let code = -1;
    let end = -1;
    let i = 0;
    for (;i < header.length; i++) {
      code = header.charCodeAt(i);
      if (extensionName === undefined) {
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (i !== 0 && (code === 32 || code === 9)) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 59 || code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          const name = header.slice(start, end);
          if (code === 44) {
            push(offers, name, params);
            params = Object.create(null);
          } else {
            extensionName = name;
          }
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (paramName === undefined) {
        if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (code === 32 || code === 9) {
          if (end === -1 && start !== -1)
            end = i;
        } else if (code === 59 || code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          push(params, header.slice(start, end), true);
          if (code === 44) {
            push(offers, extensionName, params);
            params = Object.create(null);
            extensionName = undefined;
          }
          start = end = -1;
        } else if (code === 61 && start !== -1 && end === -1) {
          paramName = header.slice(start, i);
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else {
        if (isEscaping) {
          if (tokenChars[code] !== 1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (start === -1)
            start = i;
          else if (!mustUnescape)
            mustUnescape = true;
          isEscaping = false;
        } else if (inQuotes) {
          if (tokenChars[code] === 1) {
            if (start === -1)
              start = i;
          } else if (code === 34 && start !== -1) {
            inQuotes = false;
            end = i;
          } else if (code === 92) {
            isEscaping = true;
          } else {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
        } else if (code === 34 && header.charCodeAt(i - 1) === 61) {
          inQuotes = true;
        } else if (end === -1 && tokenChars[code] === 1) {
          if (start === -1)
            start = i;
        } else if (start !== -1 && (code === 32 || code === 9)) {
          if (end === -1)
            end = i;
        } else if (code === 59 || code === 44) {
          if (start === -1) {
            throw new SyntaxError(`Unexpected character at index ${i}`);
          }
          if (end === -1)
            end = i;
          let value = header.slice(start, end);
          if (mustUnescape) {
            value = value.replace(/\\/g, "");
            mustUnescape = false;
          }
          push(params, paramName, value);
          if (code === 44) {
            push(offers, extensionName, params);
            params = Object.create(null);
            extensionName = undefined;
          }
          paramName = undefined;
          start = end = -1;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      }
    }
    if (start === -1 || inQuotes || code === 32 || code === 9) {
      throw new SyntaxError("Unexpected end of input");
    }
    if (end === -1)
      end = i;
    const token = header.slice(start, end);
    if (extensionName === undefined) {
      push(offers, token, params);
    } else {
      if (paramName === undefined) {
        push(params, token, true);
      } else if (mustUnescape) {
        push(params, paramName, token.replace(/\\/g, ""));
      } else {
        push(params, paramName, token);
      }
      push(offers, extensionName, params);
    }
    return offers;
  };
  var format = function(extensions) {
    return Object.keys(extensions).map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations))
        configurations = [configurations];
      return configurations.map((params) => {
        return [extension].concat(Object.keys(params).map((k) => {
          let values = params[k];
          if (!Array.isArray(values))
            values = [values];
          return values.map((v) => v === true ? k : `${k}=${v}`).join("; ");
        })).join("; ");
      }).join(", ");
    }).join(", ");
  };
  var { tokenChars } = require_validation();
  module.exports = { format, parse };
});

// node_modules/ws/lib/websocket.js
var require_websocket = __commonJS((exports, module) => {
  var initAsClient = function(websocket, address4, protocols, options) {
    const opts = {
      protocolVersion: protocolVersions[1],
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: true,
      followRedirects: false,
      maxRedirects: 10,
      ...options,
      createConnection: undefined,
      socketPath: undefined,
      hostname: undefined,
      protocol: undefined,
      timeout: undefined,
      method: "GET",
      host: undefined,
      path: undefined,
      port: undefined
    };
    if (!protocolVersions.includes(opts.protocolVersion)) {
      throw new RangeError(`Unsupported protocol version: ${opts.protocolVersion} ` + `(supported versions: ${protocolVersions.join(", ")})`);
    }
    let parsedUrl;
    if (address4 instanceof URL) {
      parsedUrl = address4;
      websocket._url = address4.href;
    } else {
      try {
        parsedUrl = new URL(address4);
      } catch (e) {
        throw new SyntaxError(`Invalid URL: ${address4}`);
      }
      websocket._url = address4;
    }
    const isSecure = parsedUrl.protocol === "wss:";
    const isIpcUrl = parsedUrl.protocol === "ws+unix:";
    let invalidUrlMessage;
    if (parsedUrl.protocol !== "ws:" && !isSecure && !isIpcUrl) {
      invalidUrlMessage = 'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
    } else if (isIpcUrl && !parsedUrl.pathname) {
      invalidUrlMessage = "The URL's pathname is empty";
    } else if (parsedUrl.hash) {
      invalidUrlMessage = "The URL contains a fragment identifier";
    }
    if (invalidUrlMessage) {
      const err = new SyntaxError(invalidUrlMessage);
      if (websocket._redirects === 0) {
        throw err;
      } else {
        emitErrorAndClose(websocket, err);
        return;
      }
    }
    const defaultPort = isSecure ? 443 : 80;
    const key = randomBytes(16).toString("base64");
    const request4 = isSecure ? https.request : http.request;
    const protocolSet = new Set;
    let perMessageDeflate;
    opts.createConnection = isSecure ? tlsConnect : netConnect;
    opts.defaultPort = opts.defaultPort || defaultPort;
    opts.port = parsedUrl.port || defaultPort;
    opts.host = parsedUrl.hostname.startsWith("[") ? parsedUrl.hostname.slice(1, -1) : parsedUrl.hostname;
    opts.headers = {
      ...opts.headers,
      "Sec-WebSocket-Version": opts.protocolVersion,
      "Sec-WebSocket-Key": key,
      Connection: "Upgrade",
      Upgrade: "websocket"
    };
    opts.path = parsedUrl.pathname + parsedUrl.search;
    opts.timeout = opts.handshakeTimeout;
    if (opts.perMessageDeflate) {
      perMessageDeflate = new PerMessageDeflate(opts.perMessageDeflate !== true ? opts.perMessageDeflate : {}, false, opts.maxPayload);
      opts.headers["Sec-WebSocket-Extensions"] = format({
        [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
      });
    }
    if (protocols.length) {
      for (const protocol of protocols) {
        if (typeof protocol !== "string" || !subprotocolRegex.test(protocol) || protocolSet.has(protocol)) {
          throw new SyntaxError("An invalid or duplicated subprotocol was specified");
        }
        protocolSet.add(protocol);
      }
      opts.headers["Sec-WebSocket-Protocol"] = protocols.join(",");
    }
    if (opts.origin) {
      if (opts.protocolVersion < 13) {
        opts.headers["Sec-WebSocket-Origin"] = opts.origin;
      } else {
        opts.headers.Origin = opts.origin;
      }
    }
    if (parsedUrl.username || parsedUrl.password) {
      opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
    }
    if (isIpcUrl) {
      const parts = opts.path.split(":");
      opts.socketPath = parts[0];
      opts.path = parts[1];
    }
    let req;
    if (opts.followRedirects) {
      if (websocket._redirects === 0) {
        websocket._originalIpc = isIpcUrl;
        websocket._originalSecure = isSecure;
        websocket._originalHostOrSocketPath = isIpcUrl ? opts.socketPath : parsedUrl.host;
        const headers = options && options.headers;
        options = { ...options, headers: {} };
        if (headers) {
          for (const [key2, value] of Object.entries(headers)) {
            options.headers[key2.toLowerCase()] = value;
          }
        }
      } else if (websocket.listenerCount("redirect") === 0) {
        const isSameHost = isIpcUrl ? websocket._originalIpc ? opts.socketPath === websocket._originalHostOrSocketPath : false : websocket._originalIpc ? false : parsedUrl.host === websocket._originalHostOrSocketPath;
        if (!isSameHost || websocket._originalSecure && !isSecure) {
          delete opts.headers.authorization;
          delete opts.headers.cookie;
          if (!isSameHost)
            delete opts.headers.host;
          opts.auth = undefined;
        }
      }
      if (opts.auth && !options.headers.authorization) {
        options.headers.authorization = "Basic " + Buffer.from(opts.auth).toString("base64");
      }
      req = websocket._req = request4(opts);
      if (websocket._redirects) {
        websocket.emit("redirect", websocket.url, req);
      }
    } else {
      req = websocket._req = request4(opts);
    }
    if (opts.timeout) {
      req.on("timeout", () => {
        abortHandshake(websocket, req, "Opening handshake has timed out");
      });
    }
    req.on("error", (err) => {
      if (req === null || req[kAborted])
        return;
      req = websocket._req = null;
      emitErrorAndClose(websocket, err);
    });
    req.on("response", (res) => {
      const location = res.headers.location;
      const statusCode = res.statusCode;
      if (location && opts.followRedirects && statusCode >= 300 && statusCode < 400) {
        if (++websocket._redirects > opts.maxRedirects) {
          abortHandshake(websocket, req, "Maximum redirects exceeded");
          return;
        }
        req.abort();
        let addr;
        try {
          addr = new URL(location, address4);
        } catch (e) {
          const err = new SyntaxError(`Invalid URL: ${location}`);
          emitErrorAndClose(websocket, err);
          return;
        }
        initAsClient(websocket, addr, protocols, options);
      } else if (!websocket.emit("unexpected-response", req, res)) {
        abortHandshake(websocket, req, `Unexpected server response: ${res.statusCode}`);
      }
    });
    req.on("upgrade", (res, socket, head) => {
      websocket.emit("upgrade", res);
      if (websocket.readyState !== WebSocket2.CONNECTING)
        return;
      req = websocket._req = null;
      if (res.headers.upgrade.toLowerCase() !== "websocket") {
        abortHandshake(websocket, socket, "Invalid Upgrade header");
        return;
      }
      const digest = createHash("sha1").update(key + GUID).digest("base64");
      if (res.headers["sec-websocket-accept"] !== digest) {
        abortHandshake(websocket, socket, "Invalid Sec-WebSocket-Accept header");
        return;
      }
      const serverProt = res.headers["sec-websocket-protocol"];
      let protError;
      if (serverProt !== undefined) {
        if (!protocolSet.size) {
          protError = "Server sent a subprotocol but none was requested";
        } else if (!protocolSet.has(serverProt)) {
          protError = "Server sent an invalid subprotocol";
        }
      } else if (protocolSet.size) {
        protError = "Server sent no subprotocol";
      }
      if (protError) {
        abortHandshake(websocket, socket, protError);
        return;
      }
      if (serverProt)
        websocket._protocol = serverProt;
      const secWebSocketExtensions = res.headers["sec-websocket-extensions"];
      if (secWebSocketExtensions !== undefined) {
        if (!perMessageDeflate) {
          const message = "Server sent a Sec-WebSocket-Extensions header but no extension was requested";
          abortHandshake(websocket, socket, message);
          return;
        }
        let extensions;
        try {
          extensions = parse(secWebSocketExtensions);
        } catch (err) {
          const message = "Invalid Sec-WebSocket-Extensions header";
          abortHandshake(websocket, socket, message);
          return;
        }
        const extensionNames = Object.keys(extensions);
        if (extensionNames.length !== 1 || extensionNames[0] !== PerMessageDeflate.extensionName) {
          const message = "Server indicated an extension that was not requested";
          abortHandshake(websocket, socket, message);
          return;
        }
        try {
          perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
        } catch (err) {
          const message = "Invalid Sec-WebSocket-Extensions header";
          abortHandshake(websocket, socket, message);
          return;
        }
        websocket._extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
      }
      websocket.setSocket(socket, head, {
        generateMask: opts.generateMask,
        maxPayload: opts.maxPayload,
        skipUTF8Validation: opts.skipUTF8Validation
      });
    });
    if (opts.finishRequest) {
      opts.finishRequest(req, websocket);
    } else {
      req.end();
    }
  };
  var emitErrorAndClose = function(websocket, err) {
    websocket._readyState = WebSocket2.CLOSING;
    websocket.emit("error", err);
    websocket.emitClose();
  };
  var netConnect = function(options) {
    options.path = options.socketPath;
    return net.connect(options);
  };
  var tlsConnect = function(options) {
    options.path = undefined;
    if (!options.servername && options.servername !== "") {
      options.servername = net.isIP(options.host) ? "" : options.host;
    }
    return tls.connect(options);
  };
  var abortHandshake = function(websocket, stream, message) {
    websocket._readyState = WebSocket2.CLOSING;
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshake);
    if (stream.setHeader) {
      stream[kAborted] = true;
      stream.abort();
      if (stream.socket && !stream.socket.destroyed) {
        stream.socket.destroy();
      }
      process.nextTick(emitErrorAndClose, websocket, err);
    } else {
      stream.destroy(err);
      stream.once("error", websocket.emit.bind(websocket, "error"));
      stream.once("close", websocket.emitClose.bind(websocket));
    }
  };
  var sendAfterClose = function(websocket, data3, cb) {
    if (data3) {
      const length = toBuffer(data3).length;
      if (websocket._socket)
        websocket._sender._bufferedBytes += length;
      else
        websocket._bufferedAmount += length;
    }
    if (cb) {
      const err = new Error(`WebSocket is not open: readyState ${websocket.readyState} ` + `(${readyStates[websocket.readyState]})`);
      process.nextTick(cb, err);
    }
  };
  var receiverOnConclude = function(code, reason) {
    const websocket = this[kWebSocket];
    websocket._closeFrameReceived = true;
    websocket._closeMessage = reason;
    websocket._closeCode = code;
    if (websocket._socket[kWebSocket] === undefined)
      return;
    websocket._socket.removeListener("data", socketOnData);
    process.nextTick(resume, websocket._socket);
    if (code === 1005)
      websocket.close();
    else
      websocket.close(code, reason);
  };
  var receiverOnDrain = function() {
    const websocket = this[kWebSocket];
    if (!websocket.isPaused)
      websocket._socket.resume();
  };
  var receiverOnError = function(err) {
    const websocket = this[kWebSocket];
    if (websocket._socket[kWebSocket] !== undefined) {
      websocket._socket.removeListener("data", socketOnData);
      process.nextTick(resume, websocket._socket);
      websocket.close(err[kStatusCode]);
    }
    websocket.emit("error", err);
  };
  var receiverOnFinish = function() {
    this[kWebSocket].emitClose();
  };
  var receiverOnMessage = function(data3, isBinary) {
    this[kWebSocket].emit("message", data3, isBinary);
  };
  var receiverOnPing = function(data3) {
    const websocket = this[kWebSocket];
    websocket.pong(data3, !websocket._isServer, NOOP);
    websocket.emit("ping", data3);
  };
  var receiverOnPong = function(data3) {
    this[kWebSocket].emit("pong", data3);
  };
  var resume = function(stream) {
    stream.resume();
  };
  var socketOnClose = function() {
    const websocket = this[kWebSocket];
    this.removeListener("close", socketOnClose);
    this.removeListener("data", socketOnData);
    this.removeListener("end", socketOnEnd);
    websocket._readyState = WebSocket2.CLOSING;
    let chunk;
    if (!this._readableState.endEmitted && !websocket._closeFrameReceived && !websocket._receiver._writableState.errorEmitted && (chunk = websocket._socket.read()) !== null) {
      websocket._receiver.write(chunk);
    }
    websocket._receiver.end();
    this[kWebSocket] = undefined;
    clearTimeout(websocket._closeTimer);
    if (websocket._receiver._writableState.finished || websocket._receiver._writableState.errorEmitted) {
      websocket.emitClose();
    } else {
      websocket._receiver.on("error", receiverOnFinish);
      websocket._receiver.on("finish", receiverOnFinish);
    }
  };
  var socketOnData = function(chunk) {
    if (!this[kWebSocket]._receiver.write(chunk)) {
      this.pause();
    }
  };
  var socketOnEnd = function() {
    const websocket = this[kWebSocket];
    websocket._readyState = WebSocket2.CLOSING;
    websocket._receiver.end();
    this.end();
  };
  var socketOnError = function() {
    const websocket = this[kWebSocket];
    this.removeListener("error", socketOnError);
    this.on("error", NOOP);
    if (websocket) {
      websocket._readyState = WebSocket2.CLOSING;
      this.destroy();
    }
  };
  var EventEmitter = __require("events");
  var https = __require("https");
  var http = __require("http");
  var net = __require("net");
  var tls = __require("tls");
  var { randomBytes, createHash } = __require("crypto");
  var { Readable } = __require("stream");
  var { URL } = __require("url");
  var PerMessageDeflate = require_permessage_deflate();
  var Receiver = require_receiver();
  var Sender = require_sender();
  var {
    BINARY_TYPES,
    EMPTY_BUFFER,
    GUID,
    kForOnEventAttribute,
    kListener,
    kStatusCode,
    kWebSocket,
    NOOP
  } = require_constants();
  var {
    EventTarget: { addEventListener, removeEventListener }
  } = require_event_target();
  var { format, parse } = require_extension();
  var { toBuffer } = require_buffer_util();
  var closeTimeout = 30 * 1000;
  var kAborted = Symbol("kAborted");
  var protocolVersions = [8, 13];
  var readyStates = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
  var subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

  class WebSocket2 extends EventEmitter {
    constructor(address4, protocols, options) {
      super();
      this._binaryType = BINARY_TYPES[0];
      this._closeCode = 1006;
      this._closeFrameReceived = false;
      this._closeFrameSent = false;
      this._closeMessage = EMPTY_BUFFER;
      this._closeTimer = null;
      this._extensions = {};
      this._paused = false;
      this._protocol = "";
      this._readyState = WebSocket2.CONNECTING;
      this._receiver = null;
      this._sender = null;
      this._socket = null;
      if (address4 !== null) {
        this._bufferedAmount = 0;
        this._isServer = false;
        this._redirects = 0;
        if (protocols === undefined) {
          protocols = [];
        } else if (!Array.isArray(protocols)) {
          if (typeof protocols === "object" && protocols !== null) {
            options = protocols;
            protocols = [];
          } else {
            protocols = [protocols];
          }
        }
        initAsClient(this, address4, protocols, options);
      } else {
        this._isServer = true;
      }
    }
    get binaryType() {
      return this._binaryType;
    }
    set binaryType(type) {
      if (!BINARY_TYPES.includes(type))
        return;
      this._binaryType = type;
      if (this._receiver)
        this._receiver._binaryType = type;
    }
    get bufferedAmount() {
      if (!this._socket)
        return this._bufferedAmount;
      return this._socket._writableState.length + this._sender._bufferedBytes;
    }
    get extensions() {
      return Object.keys(this._extensions).join();
    }
    get isPaused() {
      return this._paused;
    }
    get onclose() {
      return null;
    }
    get onerror() {
      return null;
    }
    get onopen() {
      return null;
    }
    get onmessage() {
      return null;
    }
    get protocol() {
      return this._protocol;
    }
    get readyState() {
      return this._readyState;
    }
    get url() {
      return this._url;
    }
    setSocket(socket, head, options) {
      const receiver = new Receiver({
        binaryType: this.binaryType,
        extensions: this._extensions,
        isServer: this._isServer,
        maxPayload: options.maxPayload,
        skipUTF8Validation: options.skipUTF8Validation
      });
      this._sender = new Sender(socket, this._extensions, options.generateMask);
      this._receiver = receiver;
      this._socket = socket;
      receiver[kWebSocket] = this;
      socket[kWebSocket] = this;
      receiver.on("conclude", receiverOnConclude);
      receiver.on("drain", receiverOnDrain);
      receiver.on("error", receiverOnError);
      receiver.on("message", receiverOnMessage);
      receiver.on("ping", receiverOnPing);
      receiver.on("pong", receiverOnPong);
      socket.setTimeout(0);
      socket.setNoDelay();
      if (head.length > 0)
        socket.unshift(head);
      socket.on("close", socketOnClose);
      socket.on("data", socketOnData);
      socket.on("end", socketOnEnd);
      socket.on("error", socketOnError);
      this._readyState = WebSocket2.OPEN;
      this.emit("open");
    }
    emitClose() {
      if (!this._socket) {
        this._readyState = WebSocket2.CLOSED;
        this.emit("close", this._closeCode, this._closeMessage);
        return;
      }
      if (this._extensions[PerMessageDeflate.extensionName]) {
        this._extensions[PerMessageDeflate.extensionName].cleanup();
      }
      this._receiver.removeAllListeners();
      this._readyState = WebSocket2.CLOSED;
      this.emit("close", this._closeCode, this._closeMessage);
    }
    close(code, data3) {
      if (this.readyState === WebSocket2.CLOSED)
        return;
      if (this.readyState === WebSocket2.CONNECTING) {
        const msg = "WebSocket was closed before the connection was established";
        abortHandshake(this, this._req, msg);
        return;
      }
      if (this.readyState === WebSocket2.CLOSING) {
        if (this._closeFrameSent && (this._closeFrameReceived || this._receiver._writableState.errorEmitted)) {
          this._socket.end();
        }
        return;
      }
      this._readyState = WebSocket2.CLOSING;
      this._sender.close(code, data3, !this._isServer, (err) => {
        if (err)
          return;
        this._closeFrameSent = true;
        if (this._closeFrameReceived || this._receiver._writableState.errorEmitted) {
          this._socket.end();
        }
      });
      this._closeTimer = setTimeout(this._socket.destroy.bind(this._socket), closeTimeout);
    }
    pause() {
      if (this.readyState === WebSocket2.CONNECTING || this.readyState === WebSocket2.CLOSED) {
        return;
      }
      this._paused = true;
      this._socket.pause();
    }
    ping(data3, mask, cb) {
      if (this.readyState === WebSocket2.CONNECTING) {
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      }
      if (typeof data3 === "function") {
        cb = data3;
        data3 = mask = undefined;
      } else if (typeof mask === "function") {
        cb = mask;
        mask = undefined;
      }
      if (typeof data3 === "number")
        data3 = data3.toString();
      if (this.readyState !== WebSocket2.OPEN) {
        sendAfterClose(this, data3, cb);
        return;
      }
      if (mask === undefined)
        mask = !this._isServer;
      this._sender.ping(data3 || EMPTY_BUFFER, mask, cb);
    }
    pong(data3, mask, cb) {
      if (this.readyState === WebSocket2.CONNECTING) {
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      }
      if (typeof data3 === "function") {
        cb = data3;
        data3 = mask = undefined;
      } else if (typeof mask === "function") {
        cb = mask;
        mask = undefined;
      }
      if (typeof data3 === "number")
        data3 = data3.toString();
      if (this.readyState !== WebSocket2.OPEN) {
        sendAfterClose(this, data3, cb);
        return;
      }
      if (mask === undefined)
        mask = !this._isServer;
      this._sender.pong(data3 || EMPTY_BUFFER, mask, cb);
    }
    resume() {
      if (this.readyState === WebSocket2.CONNECTING || this.readyState === WebSocket2.CLOSED) {
        return;
      }
      this._paused = false;
      if (!this._receiver._writableState.needDrain)
        this._socket.resume();
    }
    send(data3, options, cb) {
      if (this.readyState === WebSocket2.CONNECTING) {
        throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");
      }
      if (typeof options === "function") {
        cb = options;
        options = {};
      }
      if (typeof data3 === "number")
        data3 = data3.toString();
      if (this.readyState !== WebSocket2.OPEN) {
        sendAfterClose(this, data3, cb);
        return;
      }
      const opts = {
        binary: typeof data3 !== "string",
        mask: !this._isServer,
        compress: true,
        fin: true,
        ...options
      };
      if (!this._extensions[PerMessageDeflate.extensionName]) {
        opts.compress = false;
      }
      this._sender.send(data3 || EMPTY_BUFFER, opts, cb);
    }
    terminate() {
      if (this.readyState === WebSocket2.CLOSED)
        return;
      if (this.readyState === WebSocket2.CONNECTING) {
        const msg = "WebSocket was closed before the connection was established";
        abortHandshake(this, this._req, msg);
        return;
      }
      if (this._socket) {
        this._readyState = WebSocket2.CLOSING;
        this._socket.destroy();
      }
    }
  }
  Object.defineProperty(WebSocket2, "CONNECTING", {
    enumerable: true,
    value: readyStates.indexOf("CONNECTING")
  });
  Object.defineProperty(WebSocket2.prototype, "CONNECTING", {
    enumerable: true,
    value: readyStates.indexOf("CONNECTING")
  });
  Object.defineProperty(WebSocket2, "OPEN", {
    enumerable: true,
    value: readyStates.indexOf("OPEN")
  });
  Object.defineProperty(WebSocket2.prototype, "OPEN", {
    enumerable: true,
    value: readyStates.indexOf("OPEN")
  });
  Object.defineProperty(WebSocket2, "CLOSING", {
    enumerable: true,
    value: readyStates.indexOf("CLOSING")
  });
  Object.defineProperty(WebSocket2.prototype, "CLOSING", {
    enumerable: true,
    value: readyStates.indexOf("CLOSING")
  });
  Object.defineProperty(WebSocket2, "CLOSED", {
    enumerable: true,
    value: readyStates.indexOf("CLOSED")
  });
  Object.defineProperty(WebSocket2.prototype, "CLOSED", {
    enumerable: true,
    value: readyStates.indexOf("CLOSED")
  });
  [
    "binaryType",
    "bufferedAmount",
    "extensions",
    "isPaused",
    "protocol",
    "readyState",
    "url"
  ].forEach((property) => {
    Object.defineProperty(WebSocket2.prototype, property, { enumerable: true });
  });
  ["open", "error", "close", "message"].forEach((method) => {
    Object.defineProperty(WebSocket2.prototype, `on${method}`, {
      enumerable: true,
      get() {
        for (const listener of this.listeners(method)) {
          if (listener[kForOnEventAttribute])
            return listener[kListener];
        }
        return null;
      },
      set(handler) {
        for (const listener of this.listeners(method)) {
          if (listener[kForOnEventAttribute]) {
            this.removeListener(method, listener);
            break;
          }
        }
        if (typeof handler !== "function")
          return;
        this.addEventListener(method, handler, {
          [kForOnEventAttribute]: true
        });
      }
    });
  });
  WebSocket2.prototype.addEventListener = addEventListener;
  WebSocket2.prototype.removeEventListener = removeEventListener;
  module.exports = WebSocket2;
});

// node_modules/ws/lib/subprotocol.js
var require_subprotocol = __commonJS((exports, module) => {
  var parse = function(header) {
    const protocols = new Set;
    let start = -1;
    let end = -1;
    let i = 0;
    for (i;i < header.length; i++) {
      const code = header.charCodeAt(i);
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1)
          start = i;
      } else if (i !== 0 && (code === 32 || code === 9)) {
        if (end === -1 && start !== -1)
          end = i;
      } else if (code === 44) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (end === -1)
          end = i;
        const protocol2 = header.slice(start, end);
        if (protocols.has(protocol2)) {
          throw new SyntaxError(`The "${protocol2}" subprotocol is duplicated`);
        }
        protocols.add(protocol2);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
    if (start === -1 || end !== -1) {
      throw new SyntaxError("Unexpected end of input");
    }
    const protocol = header.slice(start, i);
    if (protocols.has(protocol)) {
      throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
    }
    protocols.add(protocol);
    return protocols;
  };
  var { tokenChars } = require_validation();
  module.exports = { parse };
});

// node_modules/ws/lib/websocket-server.js
var require_websocket_server = __commonJS((exports, module) => {
  var addListeners = function(server, map) {
    for (const event of Object.keys(map))
      server.on(event, map[event]);
    return function removeListeners() {
      for (const event of Object.keys(map)) {
        server.removeListener(event, map[event]);
      }
    };
  };
  var emitClose = function(server) {
    server._state = CLOSED;
    server.emit("close");
  };
  var socketOnError = function() {
    this.destroy();
  };
  var abortHandshake = function(socket, code, message, headers) {
    message = message || http.STATUS_CODES[code];
    headers = {
      Connection: "close",
      "Content-Type": "text/html",
      "Content-Length": Buffer.byteLength(message),
      ...headers
    };
    socket.once("finish", socket.destroy);
    socket.end(`HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` + Object.keys(headers).map((h) => `${h}: ${headers[h]}`).join("\r\n") + "\r\n\r\n" + message);
  };
  var abortHandshakeOrEmitwsClientError = function(server, req, socket, code, message) {
    if (server.listenerCount("wsClientError")) {
      const err = new Error(message);
      Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);
      server.emit("wsClientError", err, socket, req);
    } else {
      abortHandshake(socket, code, message);
    }
  };
  var EventEmitter = __require("events");
  var http = __require("http");
  var https = __require("https");
  var net = __require("net");
  var tls = __require("tls");
  var { createHash } = __require("crypto");
  var extension = require_extension();
  var PerMessageDeflate = require_permessage_deflate();
  var subprotocol = require_subprotocol();
  var WebSocket2 = require_websocket();
  var { GUID, kWebSocket } = require_constants();
  var keyRegex = /^[+/0-9A-Za-z]{22}==$/;
  var RUNNING = 0;
  var CLOSING = 1;
  var CLOSED = 2;

  class WebSocketServer extends EventEmitter {
    constructor(options, callback) {
      super();
      options = {
        maxPayload: 100 * 1024 * 1024,
        skipUTF8Validation: false,
        perMessageDeflate: false,
        handleProtocols: null,
        clientTracking: true,
        verifyClient: null,
        noServer: false,
        backlog: null,
        server: null,
        host: null,
        path: null,
        port: null,
        WebSocket: WebSocket2,
        ...options
      };
      if (options.port == null && !options.server && !options.noServer || options.port != null && (options.server || options.noServer) || options.server && options.noServer) {
        throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');
      }
      if (options.port != null) {
        this._server = http.createServer((req, res) => {
          const body = http.STATUS_CODES[426];
          res.writeHead(426, {
            "Content-Length": body.length,
            "Content-Type": "text/plain"
          });
          res.end(body);
        });
        this._server.listen(options.port, options.host, options.backlog, callback);
      } else if (options.server) {
        this._server = options.server;
      }
      if (this._server) {
        const emitConnection = this.emit.bind(this, "connection");
        this._removeListeners = addListeners(this._server, {
          listening: this.emit.bind(this, "listening"),
          error: this.emit.bind(this, "error"),
          upgrade: (req, socket, head) => {
            this.handleUpgrade(req, socket, head, emitConnection);
          }
        });
      }
      if (options.perMessageDeflate === true)
        options.perMessageDeflate = {};
      if (options.clientTracking) {
        this.clients = new Set;
        this._shouldEmitClose = false;
      }
      this.options = options;
      this._state = RUNNING;
    }
    address() {
      if (this.options.noServer) {
        throw new Error('The server is operating in "noServer" mode');
      }
      if (!this._server)
        return null;
      return this._server.address();
    }
    close(cb) {
      if (this._state === CLOSED) {
        if (cb) {
          this.once("close", () => {
            cb(new Error("The server is not running"));
          });
        }
        process.nextTick(emitClose, this);
        return;
      }
      if (cb)
        this.once("close", cb);
      if (this._state === CLOSING)
        return;
      this._state = CLOSING;
      if (this.options.noServer || this.options.server) {
        if (this._server) {
          this._removeListeners();
          this._removeListeners = this._server = null;
        }
        if (this.clients) {
          if (!this.clients.size) {
            process.nextTick(emitClose, this);
          } else {
            this._shouldEmitClose = true;
          }
        } else {
          process.nextTick(emitClose, this);
        }
      } else {
        const server = this._server;
        this._removeListeners();
        this._removeListeners = this._server = null;
        server.close(() => {
          emitClose(this);
        });
      }
    }
    shouldHandle(req) {
      if (this.options.path) {
        const index2 = req.url.indexOf("?");
        const pathname = index2 !== -1 ? req.url.slice(0, index2) : req.url;
        if (pathname !== this.options.path)
          return false;
      }
      return true;
    }
    handleUpgrade(req, socket, head, cb) {
      socket.on("error", socketOnError);
      const key = req.headers["sec-websocket-key"];
      const version3 = +req.headers["sec-websocket-version"];
      if (req.method !== "GET") {
        const message = "Invalid HTTP method";
        abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
        return;
      }
      if (req.headers.upgrade.toLowerCase() !== "websocket") {
        const message = "Invalid Upgrade header";
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
      if (!key || !keyRegex.test(key)) {
        const message = "Missing or invalid Sec-WebSocket-Key header";
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
      if (version3 !== 8 && version3 !== 13) {
        const message = "Missing or invalid Sec-WebSocket-Version header";
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
      if (!this.shouldHandle(req)) {
        abortHandshake(socket, 400);
        return;
      }
      const secWebSocketProtocol = req.headers["sec-websocket-protocol"];
      let protocols = new Set;
      if (secWebSocketProtocol !== undefined) {
        try {
          protocols = subprotocol.parse(secWebSocketProtocol);
        } catch (err) {
          const message = "Invalid Sec-WebSocket-Protocol header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
      }
      const secWebSocketExtensions = req.headers["sec-websocket-extensions"];
      const extensions = {};
      if (this.options.perMessageDeflate && secWebSocketExtensions !== undefined) {
        const perMessageDeflate = new PerMessageDeflate(this.options.perMessageDeflate, true, this.options.maxPayload);
        try {
          const offers = extension.parse(secWebSocketExtensions);
          if (offers[PerMessageDeflate.extensionName]) {
            perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
            extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
          }
        } catch (err) {
          const message = "Invalid or unacceptable Sec-WebSocket-Extensions header";
          abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
          return;
        }
      }
      if (this.options.verifyClient) {
        const info = {
          origin: req.headers[`${version3 === 8 ? "sec-websocket-origin" : "origin"}`],
          secure: !!(req.socket.authorized || req.socket.encrypted),
          req
        };
        if (this.options.verifyClient.length === 2) {
          this.options.verifyClient(info, (verified, code, message, headers) => {
            if (!verified) {
              return abortHandshake(socket, code || 401, message, headers);
            }
            this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
          });
          return;
        }
        if (!this.options.verifyClient(info))
          return abortHandshake(socket, 401);
      }
      this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
    }
    completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
      if (!socket.readable || !socket.writable)
        return socket.destroy();
      if (socket[kWebSocket]) {
        throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");
      }
      if (this._state > RUNNING)
        return abortHandshake(socket, 503);
      const digest = createHash("sha1").update(key + GUID).digest("base64");
      const headers = [
        "HTTP/1.1 101 Switching Protocols",
        "Upgrade: websocket",
        "Connection: Upgrade",
        `Sec-WebSocket-Accept: ${digest}`
      ];
      const ws = new this.options.WebSocket(null);
      if (protocols.size) {
        const protocol = this.options.handleProtocols ? this.options.handleProtocols(protocols, req) : protocols.values().next().value;
        if (protocol) {
          headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
          ws._protocol = protocol;
        }
      }
      if (extensions[PerMessageDeflate.extensionName]) {
        const params = extensions[PerMessageDeflate.extensionName].params;
        const value = extension.format({
          [PerMessageDeflate.extensionName]: [params]
        });
        headers.push(`Sec-WebSocket-Extensions: ${value}`);
        ws._extensions = extensions;
      }
      this.emit("headers", headers, req);
      socket.write(headers.concat("\r\n").join("\r\n"));
      socket.removeListener("error", socketOnError);
      ws.setSocket(socket, head, {
        maxPayload: this.options.maxPayload,
        skipUTF8Validation: this.options.skipUTF8Validation
      });
      if (this.clients) {
        this.clients.add(ws);
        ws.on("close", () => {
          this.clients.delete(ws);
          if (this._shouldEmitClose && !this.clients.size) {
            process.nextTick(emitClose, this);
          }
        });
      }
      cb(ws, req);
    }
  }
  module.exports = WebSocketServer;
});

// node_modules/@noble/curves/esm/abstract/utils.js
function equalBytes(b1, b2) {
  if (b1.length !== b2.length)
    return false;
  for (let i = 0;i < b1.length; i++)
    if (b1[i] !== b2[i])
      return false;
  return true;
}
var _0n2, _1n2, _2n2;
var init_utils3 = __esm(() => {
  /*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  _0n2 = BigInt(0);
  _1n2 = BigInt(1);
  _2n2 = BigInt(2);
});

// node_modules/oauth-1.0a/oauth-1.0a.js
var require_oauth_1_0a = __commonJS((exports, module) => {
  var OAuth = function(opts) {
    if (!(this instanceof OAuth)) {
      return new OAuth(opts);
    }
    if (!opts) {
      opts = {};
    }
    if (!opts.consumer) {
      throw new Error("consumer option is required");
    }
    this.consumer = opts.consumer;
    this.nonce_length = opts.nonce_length || 32;
    this.version = opts.version || "1.0";
    this.parameter_seperator = opts.parameter_seperator || ", ";
    this.realm = opts.realm;
    if (typeof opts.last_ampersand === "undefined") {
      this.last_ampersand = true;
    } else {
      this.last_ampersand = opts.last_ampersand;
    }
    this.signature_method = opts.signature_method || "PLAINTEXT";
    if (this.signature_method == "PLAINTEXT" && !opts.hash_function) {
      opts.hash_function = function(base_string, key) {
        return key;
      };
    }
    if (!opts.hash_function) {
      throw new Error("hash_function option is required");
    }
    this.hash_function = opts.hash_function;
    this.body_hash_function = opts.body_hash_function || this.hash_function;
  };
  if (typeof module !== "undefined" && typeof exports !== "undefined") {
    module.exports = OAuth;
  }
  OAuth.prototype.authorize = function(request7, token) {
    var oauth_data = {
      oauth_consumer_key: this.consumer.key,
      oauth_nonce: this.getNonce(),
      oauth_signature_method: this.signature_method,
      oauth_timestamp: this.getTimeStamp(),
      oauth_version: this.version
    };
    if (!token) {
      token = {};
    }
    if (token.key !== undefined) {
      oauth_data.oauth_token = token.key;
    }
    if (!request7.data) {
      request7.data = {};
    }
    if (request7.includeBodyHash) {
      oauth_data.oauth_body_hash = this.getBodyHash(request7, token.secret);
    }
    oauth_data.oauth_signature = this.getSignature(request7, token.secret, oauth_data);
    return oauth_data;
  };
  OAuth.prototype.getSignature = function(request7, token_secret, oauth_data) {
    return this.hash_function(this.getBaseString(request7, oauth_data), this.getSigningKey(token_secret));
  };
  OAuth.prototype.getBodyHash = function(request7, token_secret) {
    var body = typeof request7.data === "string" ? request7.data : JSON.stringify(request7.data);
    if (!this.body_hash_function) {
      throw new Error("body_hash_function option is required");
    }
    return this.body_hash_function(body, this.getSigningKey(token_secret));
  };
  OAuth.prototype.getBaseString = function(request7, oauth_data) {
    return request7.method.toUpperCase() + "&" + this.percentEncode(this.getBaseUrl(request7.url)) + "&" + this.percentEncode(this.getParameterString(request7, oauth_data));
  };
  OAuth.prototype.getParameterString = function(request7, oauth_data) {
    var base_string_data;
    if (oauth_data.oauth_body_hash) {
      base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.deParamUrl(request7.url))));
    } else {
      base_string_data = this.sortObject(this.percentEncodeData(this.mergeObject(oauth_data, this.mergeObject(request7.data, this.deParamUrl(request7.url)))));
    }
    var data_str = "";
    for (var i = 0;i < base_string_data.length; i++) {
      var key = base_string_data[i].key;
      var value = base_string_data[i].value;
      if (value && Array.isArray(value)) {
        value.sort();
        var valString = "";
        value.forEach(function(item, i2) {
          valString += key + "=" + item;
          if (i2 < value.length) {
            valString += "&";
          }
        }.bind(this));
        data_str += valString;
      } else {
        data_str += key + "=" + value + "&";
      }
    }
    data_str = data_str.substr(0, data_str.length - 1);
    return data_str;
  };
  OAuth.prototype.getSigningKey = function(token_secret) {
    token_secret = token_secret || "";
    if (!this.last_ampersand && !token_secret) {
      return this.percentEncode(this.consumer.secret);
    }
    return this.percentEncode(this.consumer.secret) + "&" + this.percentEncode(token_secret);
  };
  OAuth.prototype.getBaseUrl = function(url) {
    return url.split("?")[0];
  };
  OAuth.prototype.deParam = function(string) {
    var arr = string.split("&");
    var data3 = {};
    for (var i = 0;i < arr.length; i++) {
      var item = arr[i].split("=");
      item[1] = item[1] || "";
      if (data3[item[0]]) {
        if (!Array.isArray(data3[item[0]])) {
          data3[item[0]] = [data3[item[0]]];
        }
        data3[item[0]].push(decodeURIComponent(item[1]));
      } else {
        data3[item[0]] = decodeURIComponent(item[1]);
      }
    }
    return data3;
  };
  OAuth.prototype.deParamUrl = function(url) {
    var tmp = url.split("?");
    if (tmp.length === 1)
      return {};
    return this.deParam(tmp[1]);
  };
  OAuth.prototype.percentEncode = function(str) {
    return encodeURIComponent(str).replace(/\!/g, "%21").replace(/\*/g, "%2A").replace(/\'/g, "%27").replace(/\(/g, "%28").replace(/\)/g, "%29");
  };
  OAuth.prototype.percentEncodeData = function(data3) {
    var result = {};
    for (var key in data3) {
      var value = data3[key];
      if (value && Array.isArray(value)) {
        var newValue = [];
        value.forEach(function(val) {
          newValue.push(this.percentEncode(val));
        }.bind(this));
        value = newValue;
      } else {
        value = this.percentEncode(value);
      }
      result[this.percentEncode(key)] = value;
    }
    return result;
  };
  OAuth.prototype.toHeader = function(oauth_data) {
    var sorted = this.sortObject(oauth_data);
    var header_value = "OAuth ";
    if (this.realm) {
      header_value += 'realm="' + this.realm + '"' + this.parameter_seperator;
    }
    for (var i = 0;i < sorted.length; i++) {
      if (sorted[i].key.indexOf("oauth_") !== 0)
        continue;
      header_value += this.percentEncode(sorted[i].key) + '="' + this.percentEncode(sorted[i].value) + '"' + this.parameter_seperator;
    }
    return {
      Authorization: header_value.substr(0, header_value.length - this.parameter_seperator.length)
    };
  };
  OAuth.prototype.getNonce = function() {
    var word_characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for (var i = 0;i < this.nonce_length; i++) {
      result += word_characters[parseInt(Math.random() * word_characters.length, 10)];
    }
    return result;
  };
  OAuth.prototype.getTimeStamp = function() {
    return parseInt(new Date().getTime() / 1000, 10);
  };
  OAuth.prototype.mergeObject = function(obj1, obj2) {
    obj1 = obj1 || {};
    obj2 = obj2 || {};
    var merged_obj = obj1;
    for (var key in obj2) {
      merged_obj[key] = obj2[key];
    }
    return merged_obj;
  };
  OAuth.prototype.sortObject = function(data3) {
    var keys = Object.keys(data3);
    var result = [];
    keys.sort();
    for (var i = 0;i < keys.length; i++) {
      var key = keys[i];
      result.push({
        key,
        value: data3[key]
      });
    }
    return result;
  };
});

// node_modules/viem/_esm/utils/getAction.js
function getAction(client, action, name) {
  return (params) => client[action.name || name]?.(params) ?? action(client, params);
}

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
init_abi();

// node_modules/viem/_esm/errors/log.js
init_base();

class FilterTypeNotSupportedError extends BaseError {
  constructor(type) {
    super(`Filter type "${type}" is not supported.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "FilterTypeNotSupportedError"
    });
  }
}

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
init_toBytes();
init_getEventSelector();
init_keccak256();
init_encodeAbiParameters();
init_formatAbiItem2();
init_getAbiItem();
function encodeEventTopics({ abi: abi4, eventName, args }) {
  let abiItem = abi4[0];
  if (eventName) {
    abiItem = getAbiItem({
      abi: abi4,
      args,
      name: eventName
    });
    if (!abiItem)
      throw new AbiEventNotFoundError(eventName, {
        docsPath: "/docs/contract/encodeEventTopics"
      });
  }
  if (abiItem.type !== "event")
    throw new AbiEventNotFoundError(undefined, {
      docsPath: "/docs/contract/encodeEventTopics"
    });
  const definition = formatAbiItem2(abiItem);
  const signature = getEventSelector(definition);
  let topics = [];
  if (args && "inputs" in abiItem) {
    const indexedInputs = abiItem.inputs?.filter((param) => ("indexed" in param) && param.indexed);
    const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
    if (args_.length > 0) {
      topics = indexedInputs?.map((param, i) => Array.isArray(args_[i]) ? args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] })) : args_[i] ? encodeArg({ param, value: args_[i] }) : null) ?? [];
    }
  }
  return [signature, ...topics];
}
var encodeArg = function({ param, value }) {
  if (param.type === "string" || param.type === "bytes")
    return keccak256(toBytes2(value));
  if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    throw new FilterTypeNotSupportedError(param.type);
  return encodeAbiParameters([param], [value]);
};

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
init_toHex();

// node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
function createFilterRequestScope(client, { method }) {
  const requestMap = {};
  if (client.transport.type === "fallback")
    client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
      if (status === "success" && method === method_)
        requestMap[id] = transport.request;
    });
  return (id) => requestMap[id] || client.request;
}

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
async function createContractEventFilter(client, { address: address2, abi: abi4, args, eventName, fromBlock, strict, toBlock }) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  const topics = eventName ? encodeEventTopics({
    abi: abi4,
    args,
    eventName
  }) : undefined;
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address: address2,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        topics
      }
    ]
  });
  return {
    abi: abi4,
    args,
    eventName,
    id,
    request: getRequest(id),
    strict,
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
init_parseAccount();
init_encodeFunctionData();

// node_modules/viem/_esm/utils/errors/getContractError.js
init_abi();
init_base();
init_contract();
init_rpc();
function getContractError(err, { abi: abi9, address: address2, args, docsPath, functionName, sender }) {
  const { code, data: data3, message, shortMessage } = err instanceof RawContractError ? err : err instanceof BaseError ? err.walk((err2) => ("data" in err2)) || err.walk() : {};
  const cause = (() => {
    if (err instanceof AbiDecodingZeroDataError)
      return new ContractFunctionZeroDataError({ functionName });
    if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data3 || message || shortMessage)) {
      return new ContractFunctionRevertedError({
        abi: abi9,
        data: typeof data3 === "object" ? data3.data : data3,
        functionName,
        message: shortMessage ?? message
      });
    }
    return err;
  })();
  return new ContractFunctionExecutionError(cause, {
    abi: abi9,
    args,
    contractAddress: address2,
    docsPath,
    functionName,
    sender
  });
}
var EXECUTION_REVERTED_ERROR_CODE = 3;

// node_modules/viem/_esm/actions/public/estimateGas.js
init_parseAccount();

// node_modules/viem/_esm/errors/account.js
init_base();

class AccountNotFoundError extends BaseError {
  constructor({ docsPath } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."
    ].join("\n"), {
      docsPath,
      docsSlug: "account"
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AccountNotFoundError"
    });
  }
}

// node_modules/viem/_esm/actions/public/estimateGas.js
init_toHex();

// node_modules/viem/_esm/errors/estimateGas.js
init_formatEther();
init_formatGwei();
init_base();
init_transaction();

class EstimateGasExecutionError extends BaseError {
  constructor(cause, { account, docsPath, chain, data: data3, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data: data3,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean)
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: undefined
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EstimateGasExecutionError"
    });
    this.cause = cause;
  }
}

// node_modules/viem/_esm/utils/errors/getEstimateGasError.js
init_node();
init_getNodeError();
function getEstimateGasError(err, { docsPath, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new EstimateGasExecutionError(cause, {
    docsPath,
    ...args
  });
}

// node_modules/viem/_esm/actions/public/estimateGas.js
init_extract();
init_transactionRequest();
init_assertRequest();

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_parseAccount();

// node_modules/viem/_esm/errors/fee.js
init_formatGwei();
init_base();

class BaseFeeScalarError extends BaseError {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BaseFeeScalarError"
    });
  }
}

class Eip1559FeesNotSupportedError extends BaseError {
  constructor() {
    super("Chain does not support EIP-1559 fees.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Eip1559FeesNotSupportedError"
    });
  }
}

class MaxFeePerGasTooLowError extends BaseError {
  constructor({ maxPriorityFeePerGas }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei(maxPriorityFeePerGas)} gwei).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "MaxFeePerGasTooLowError"
    });
  }
}

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
init_fromHex();

// node_modules/viem/_esm/errors/block.js
init_base();

class BlockNotFoundError extends BaseError {
  constructor({ blockHash, blockNumber }) {
    let identifier = "Block";
    if (blockHash)
      identifier = `Block at hash "${blockHash}"`;
    if (blockNumber)
      identifier = `Block at number "${blockNumber}"`;
    super(`${identifier} could not be found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "BlockNotFoundError"
    });
  }
}

// node_modules/viem/_esm/actions/public/getBlock.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/transaction.js
init_fromHex();
function formatTransaction(transaction4) {
  const transaction_ = {
    ...transaction4,
    blockHash: transaction4.blockHash ? transaction4.blockHash : null,
    blockNumber: transaction4.blockNumber ? BigInt(transaction4.blockNumber) : null,
    chainId: transaction4.chainId ? hexToNumber(transaction4.chainId) : undefined,
    gas: transaction4.gas ? BigInt(transaction4.gas) : undefined,
    gasPrice: transaction4.gasPrice ? BigInt(transaction4.gasPrice) : undefined,
    maxFeePerGas: transaction4.maxFeePerGas ? BigInt(transaction4.maxFeePerGas) : undefined,
    maxPriorityFeePerGas: transaction4.maxPriorityFeePerGas ? BigInt(transaction4.maxPriorityFeePerGas) : undefined,
    nonce: transaction4.nonce ? hexToNumber(transaction4.nonce) : undefined,
    to: transaction4.to ? transaction4.to : null,
    transactionIndex: transaction4.transactionIndex ? Number(transaction4.transactionIndex) : null,
    type: transaction4.type ? transactionType[transaction4.type] : undefined,
    typeHex: transaction4.type ? transaction4.type : undefined,
    value: transaction4.value ? BigInt(transaction4.value) : undefined,
    v: transaction4.v ? BigInt(transaction4.v) : undefined
  };
  transaction_.yParity = (() => {
    if (transaction4.yParity)
      return Number(transaction4.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  return transaction_;
}
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559"
};

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block) {
  const transactions = block.transactions?.map((transaction5) => {
    if (typeof transaction5 === "string")
      return transaction5;
    return formatTransaction(transaction5);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    difficulty: block.difficulty ? BigInt(block.difficulty) : undefined,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : undefined,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : undefined,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : undefined,
    timestamp: block.timestamp ? BigInt(block.timestamp) : undefined,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}

// node_modules/viem/_esm/actions/public/getBlock.js
async function getBlock(client, { blockHash, blockNumber, blockTag: blockTag_, includeTransactions: includeTransactions_ } = {}) {
  const blockTag = blockTag_ ?? "latest";
  const includeTransactions = includeTransactions_ ?? false;
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  let block3 = null;
  if (blockHash) {
    block3 = await client.request({
      method: "eth_getBlockByHash",
      params: [blockHash, includeTransactions]
    });
  } else {
    block3 = await client.request({
      method: "eth_getBlockByNumber",
      params: [blockNumberHex || blockTag, includeTransactions]
    });
  }
  if (!block3)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format = client.chain?.formatters?.block?.format || formatBlock;
  return format(block3);
}

// node_modules/viem/_esm/actions/public/getGasPrice.js
async function getGasPrice(client) {
  const gasPrice = await client.request({
    method: "eth_gasPrice"
  });
  return BigInt(gasPrice);
}

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas(client, args) {
  return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
  const { block: block_, chain = client.chain, request: request2 } = args || {};
  if (typeof chain?.fees?.defaultPriorityFee === "function") {
    const block3 = block_ || await getAction(client, getBlock, "getBlock")({});
    return chain.fees.defaultPriorityFee({
      block: block3,
      client,
      request: request2
    });
  }
  if (typeof chain?.fees?.defaultPriorityFee !== "undefined")
    return chain?.fees?.defaultPriorityFee;
  try {
    const maxPriorityFeePerGasHex = await client.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return hexToBigInt(maxPriorityFeePerGasHex);
  } catch {
    const [block3, gasPrice] = await Promise.all([
      block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
      getAction(client, getGasPrice, "getGasPrice")({})
    ]);
    if (typeof block3.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError;
    const maxPriorityFeePerGas = gasPrice - block3.baseFeePerGas;
    if (maxPriorityFeePerGas < 0n)
      return 0n;
    return maxPriorityFeePerGas;
  }
}

// node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
async function estimateFeesPerGas(client, args) {
  return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
  const { block: block_, chain = client.chain, request: request2, type = "eip1559" } = args || {};
  const baseFeeMultiplier = await (async () => {
    if (typeof chain?.fees?.baseFeeMultiplier === "function")
      return chain.fees.baseFeeMultiplier({
        block: block_,
        client,
        request: request2
      });
    return chain?.fees?.baseFeeMultiplier ?? 1.2;
  })();
  if (baseFeeMultiplier < 1)
    throw new BaseFeeScalarError;
  const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
  const denominator = 10 ** decimals;
  const multiply = (base19) => base19 * BigInt(Math.ceil(baseFeeMultiplier * denominator)) / BigInt(denominator);
  const block3 = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
  if (typeof chain?.fees?.estimateFeesPerGas === "function")
    return chain.fees.estimateFeesPerGas({
      block: block_,
      client,
      multiply,
      request: request2,
      type
    });
  if (type === "eip1559") {
    if (typeof block3.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError;
    const maxPriorityFeePerGas = request2?.maxPriorityFeePerGas ? request2.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
      block: block3,
      chain,
      request: request2
    });
    const baseFeePerGas = multiply(block3.baseFeePerGas);
    const maxFeePerGas = request2?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const gasPrice = request2?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
  return {
    gasPrice
  };
}

// node_modules/viem/_esm/actions/public/getTransactionCount.js
init_fromHex();
init_toHex();
async function getTransactionCount(client, { address: address3, blockTag = "latest", blockNumber }) {
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address3, blockNumber ? numberToHex(blockNumber) : blockTag]
  });
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_assertRequest();

// node_modules/viem/_esm/utils/transaction/getTransactionType.js
init_transaction();
function getTransactionType(transaction6) {
  if (transaction6.type)
    return transaction6.type;
  if (typeof transaction6.maxFeePerGas !== "undefined" || typeof transaction6.maxPriorityFeePerGas !== "undefined")
    return "eip1559";
  if (typeof transaction6.gasPrice !== "undefined") {
    if (typeof transaction6.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction: transaction6 });
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
async function prepareTransactionRequest(client, args) {
  const { account: account_ = client.account, chain, gas, nonce, type } = args;
  if (!account_)
    throw new AccountNotFoundError;
  const account2 = parseAccount(account_);
  const block3 = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
  const request2 = { ...args, from: account2.address };
  if (typeof nonce === "undefined")
    request2.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
      address: account2.address,
      blockTag: "pending"
    });
  if (typeof type === "undefined") {
    try {
      request2.type = getTransactionType(request2);
    } catch {
      request2.type = typeof block3.baseFeePerGas === "bigint" ? "eip1559" : "legacy";
    }
  }
  if (request2.type === "eip1559") {
    const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
      block: block3,
      chain,
      request: request2
    });
    if (typeof args.maxPriorityFeePerGas === "undefined" && args.maxFeePerGas && args.maxFeePerGas < maxPriorityFeePerGas)
      throw new MaxFeePerGasTooLowError({
        maxPriorityFeePerGas
      });
    request2.maxPriorityFeePerGas = maxPriorityFeePerGas;
    request2.maxFeePerGas = maxFeePerGas;
  } else {
    if (typeof args.maxFeePerGas !== "undefined" || typeof args.maxPriorityFeePerGas !== "undefined")
      throw new Eip1559FeesNotSupportedError;
    const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
      block: block3,
      chain,
      request: request2,
      type: "legacy"
    });
    request2.gasPrice = gasPrice_;
  }
  if (typeof gas === "undefined")
    request2.gas = await getAction(client, estimateGas3, "estimateGas")({
      ...request2,
      account: { address: account2.address, type: "json-rpc" }
    });
  assertRequest(request2);
  return request2;
}

// node_modules/viem/_esm/actions/public/estimateGas.js
async function estimateGas3(client, args) {
  const account_ = args.account ?? client.account;
  if (!account_)
    throw new AccountNotFoundError({
      docsPath: "/docs/actions/public/estimateGas"
    });
  const account3 = parseAccount(account_);
  try {
    const { accessList, blockNumber, blockTag, data: data3, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = account3.type === "local" ? await prepareTransactionRequest(client, args) : args;
    const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
    const block3 = blockNumberHex || blockTag;
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format = chainFormat || formatTransactionRequest;
    const request2 = format({
      ...extract(rest, { format: chainFormat }),
      from: account3.address,
      accessList,
      data: data3,
      gas,
      gasPrice,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    });
    const balance = await client.request({
      method: "eth_estimateGas",
      params: block3 ? [request2, block3] : [request2]
    });
    return BigInt(balance);
  } catch (err) {
    throw getEstimateGasError(err, {
      ...args,
      account: account3,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
async function estimateContractGas(client, { abi: abi9, address: address3, args, functionName, ...request2 }) {
  const data3 = encodeFunctionData({
    abi: abi9,
    args,
    functionName
  });
  try {
    const gas = await getAction(client, estimateGas3, "estimateGas")({
      data: data3,
      to: address3,
      ...request2
    });
    return gas;
  } catch (err) {
    const account3 = request2.account ? parseAccount(request2.account) : undefined;
    throw getContractError(err, {
      abi: abi9,
      address: address3,
      args,
      docsPath: "/docs/contract/estimateContractGas",
      functionName,
      sender: account3?.address
    });
  }
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
init_getAbiItem();

// node_modules/viem/_esm/actions/public/getLogs.js
init_abi();

// node_modules/viem/_esm/utils/abi/decodeEventLog.js
init_abi();
init_getEventSelector();
init_decodeAbiParameters();
init_formatAbiItem2();
function decodeEventLog({ abi: abi10, data: data3, strict: strict_, topics }) {
  const strict = strict_ ?? true;
  const [signature, ...argTopics] = topics;
  if (!signature)
    throw new AbiEventSignatureEmptyTopicsError({
      docsPath
    });
  const abiItem = abi10.find((x) => x.type === "event" && signature === getEventSelector(formatAbiItem2(x)));
  if (!(abiItem && ("name" in abiItem)) || abiItem.type !== "event")
    throw new AbiEventSignatureNotFoundError(signature, {
      docsPath
    });
  const { name, inputs } = abiItem;
  const isUnnamed = inputs?.some((x) => !(("name" in x) && x.name));
  let args = isUnnamed ? [] : {};
  const indexedInputs = inputs.filter((x) => ("indexed" in x) && x.indexed);
  for (let i = 0;i < indexedInputs.length; i++) {
    const param = indexedInputs[i];
    const topic = argTopics[i];
    if (!topic)
      throw new DecodeLogTopicsMismatch({
        abiItem,
        param
      });
    args[param.name || i] = decodeTopic({ param, value: topic });
  }
  const nonIndexedInputs = inputs.filter((x) => !(("indexed" in x) && x.indexed));
  if (nonIndexedInputs.length > 0) {
    if (data3 && data3 !== "0x") {
      try {
        const decodedData = decodeAbiParameters(nonIndexedInputs, data3);
        if (decodedData) {
          if (isUnnamed)
            args = [...args, ...decodedData];
          else {
            for (let i = 0;i < nonIndexedInputs.length; i++) {
              args[nonIndexedInputs[i].name] = decodedData[i];
            }
          }
        }
      } catch (err) {
        if (strict) {
          if (err instanceof AbiDecodingDataSizeTooSmallError)
            throw new DecodeLogDataMismatch({
              abiItem,
              data: err.data,
              params: err.params,
              size: err.size
            });
          throw err;
        }
      }
    } else if (strict) {
      throw new DecodeLogDataMismatch({
        abiItem,
        data: "0x",
        params: nonIndexedInputs,
        size: 0
      });
    }
  }
  return {
    eventName: name,
    args: Object.values(args).length > 0 ? args : undefined
  };
}
var decodeTopic = function({ param, value }) {
  if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    return value;
  const decodedArg = decodeAbiParameters([param], value) || [];
  return decodedArg[0];
};
var docsPath = "/docs/contract/decodeEventLog";

// node_modules/viem/_esm/actions/public/getLogs.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log2, { args, eventName } = {}) {
  return {
    ...log2,
    blockHash: log2.blockHash ? log2.blockHash : null,
    blockNumber: log2.blockNumber ? BigInt(log2.blockNumber) : null,
    logIndex: log2.logIndex ? Number(log2.logIndex) : null,
    transactionHash: log2.transactionHash ? log2.transactionHash : null,
    transactionIndex: log2.transactionIndex ? Number(log2.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/viem/_esm/actions/public/getLogs.js
async function getLogs(client, { address: address3, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
  const strict = strict_ ?? false;
  const events = events_ ?? (event ? [event] : undefined);
  let topics = [];
  if (events) {
    topics = [
      events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args
      }))
    ];
    if (event)
      topics = topics[0];
  }
  let logs;
  if (blockHash) {
    logs = await client.request({
      method: "eth_getLogs",
      params: [{ address: address3, topics, blockHash }]
    });
  } else {
    logs = await client.request({
      method: "eth_getLogs",
      params: [
        {
          address: address3,
          topics,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
        }
      ]
    });
  }
  return logs.map((log3) => {
    try {
      const { eventName, args: args2 } = events ? decodeEventLog({
        abi: events,
        data: log3.data,
        topics: log3.topics,
        strict
      }) : { eventName: undefined, args: undefined };
      return formatLog(log3, { args: args2, eventName });
    } catch (err) {
      let eventName;
      let isUnnamed;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if (strict)
          return;
        eventName = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
      }
      return formatLog(log3, { args: isUnnamed ? [] : {}, eventName });
    }
  }).filter(Boolean);
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
async function getContractEvents(client, { abi: abi11, address: address3, args, blockHash, eventName, fromBlock, toBlock, strict }) {
  const event = eventName ? getAbiItem({ abi: abi11, name: eventName }) : undefined;
  const events = !event ? abi11.filter((x) => x.type === "event") : undefined;
  return getAction(client, getLogs, "getLogs")({
    address: address3,
    args,
    blockHash,
    event,
    events,
    fromBlock,
    toBlock,
    strict
  });
}

// node_modules/viem/_esm/actions/public/readContract.js
init_decodeFunctionResult();
init_encodeFunctionData();
init_call();
async function readContract(client, { abi: abi12, address: address4, args, functionName, ...callRequest }) {
  const calldata = encodeFunctionData({
    abi: abi12,
    args,
    functionName
  });
  try {
    const { data: data3 } = await getAction(client, call2, "call")({
      data: calldata,
      to: address4,
      ...callRequest
    });
    return decodeFunctionResult({
      abi: abi12,
      args,
      functionName,
      data: data3 || "0x"
    });
  } catch (err) {
    throw getContractError(err, {
      abi: abi12,
      address: address4,
      args,
      docsPath: "/docs/contract/readContract",
      functionName
    });
  }
}

// node_modules/viem/_esm/actions/public/simulateContract.js
init_parseAccount();
init_decodeFunctionResult();
init_encodeFunctionData();
init_call();
async function simulateContract(client, { abi: abi12, address: address4, args, dataSuffix, functionName, ...callRequest }) {
  const account3 = callRequest.account ? parseAccount(callRequest.account) : undefined;
  const calldata = encodeFunctionData({
    abi: abi12,
    args,
    functionName
  });
  try {
    const { data: data3 } = await getAction(client, call2, "call")({
      batch: false,
      data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address4,
      ...callRequest
    });
    const result = decodeFunctionResult({
      abi: abi12,
      args,
      functionName,
      data: data3 || "0x"
    });
    return {
      result,
      request: {
        abi: abi12,
        address: address4,
        args,
        dataSuffix,
        functionName,
        ...callRequest
      }
    };
  } catch (err) {
    throw getContractError(err, {
      abi: abi12,
      address: address4,
      args,
      docsPath: "/docs/contract/simulateContract",
      functionName,
      sender: account3?.address
    });
  }
}

// node_modules/viem/_esm/utils/observe.js
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    listenersCache.set(observerId, listeners2.filter((cb) => cb.id !== callbackId));
  };
  const unwatch = () => {
    const cleanup2 = cleanupCache.get(observerId);
    if (getListeners().length === 1 && cleanup2)
      cleanup2();
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = (...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2)
        listener.fns[key]?.(...args);
    };
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}
var listenersCache = new Map;
var cleanupCache = new Map;
var callbackCount = 0;

// node_modules/viem/_esm/utils/wait.js
async function wait(time) {
  return new Promise((res) => setTimeout(res, time));
}

// node_modules/viem/_esm/utils/poll.js
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
  let active = true;
  const unwatch = () => active = false;
  const watch = async () => {
    let data3 = undefined;
    if (emitOnBegin)
      data3 = await fn({ unpoll: unwatch });
    const initialWait = await initialWaitTime?.(data3) ?? interval;
    await wait(initialWait);
    const poll2 = async () => {
      if (!active)
        return;
      await fn({ unpoll: unwatch });
      await wait(interval);
      poll2();
    };
    poll2();
  };
  watch();
  return unwatch;
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
init_stringify();
init_abi();
init_rpc();

// node_modules/viem/_esm/utils/promise/withCache.js
function getCache(cacheKey) {
  const buildCache = (cacheKey2, cache) => ({
    clear: () => cache.delete(cacheKey2),
    get: () => cache.get(cacheKey2),
    set: (data3) => cache.set(cacheKey2, data3)
  });
  const promise = buildCache(cacheKey, promiseCache);
  const response = buildCache(cacheKey, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey, cacheTime = Infinity }) {
  const cache = getCache(cacheKey);
  const response = cache.response.get();
  if (response && cacheTime > 0) {
    const age = new Date().getTime() - response.created.getTime();
    if (age < cacheTime)
      return response.data;
  }
  let promise = cache.promise.get();
  if (!promise) {
    promise = fn();
    cache.promise.set(promise);
  }
  try {
    const data3 = await promise;
    cache.response.set({ created: new Date, data: data3 });
    return data3;
  } finally {
    cache.promise.clear();
  }
}
var promiseCache = new Map;
var responseCache = new Map;

// node_modules/viem/_esm/actions/public/getBlockNumber.js
async function getBlockNumber(client, { cacheTime = client.cacheTime, maxAge } = {}) {
  const blockNumberHex = await withCache(() => client.request({
    method: "eth_blockNumber"
  }), { cacheKey: cacheKey(client.uid), cacheTime: maxAge ?? cacheTime });
  return BigInt(blockNumberHex);
}
var cacheKey = (id) => `blockNumber.${id}`;

// node_modules/viem/_esm/actions/public/getFilterChanges.js
init_abi();
async function getFilterChanges(_client, { filter }) {
  const strict = "strict" in filter && filter.strict;
  const logs = await filter.request({
    method: "eth_getFilterChanges",
    params: [filter.id]
  });
  return logs.map((log4) => {
    if (typeof log4 === "string")
      return log4;
    try {
      const { eventName, args } = "abi" in filter && filter.abi ? decodeEventLog({
        abi: filter.abi,
        data: log4.data,
        topics: log4.topics,
        strict
      }) : { eventName: undefined, args: undefined };
      return formatLog(log4, { args, eventName });
    } catch (err) {
      let eventName;
      let isUnnamed;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if ("strict" in filter && filter.strict)
          return;
        eventName = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
      }
      return formatLog(log4, { args: isUnnamed ? [] : {}, eventName });
    }
  }).filter(Boolean);
}

// node_modules/viem/_esm/actions/public/uninstallFilter.js
async function uninstallFilter(_client, { filter }) {
  return filter.request({
    method: "eth_uninstallFilter",
    params: [filter.id]
  });
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
function watchContractEvent(client, { abi: abi14, address: address4, args, batch = true, eventName, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const pollContractEvent = () => {
    const observerId = stringify([
      "watchContractEvent",
      address4,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval
    ]);
    const strict = strict_ ?? false;
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
              abi: abi14,
              address: address4,
              args,
              eventName,
              strict
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getContractEvents, "getContractEvents")({
                abi: abi14,
                address: address4,
                args,
                eventName,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber,
                strict
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log5 of logs)
              emit.onLogs([log5]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeContractEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const topics = eventName ? encodeEventTopics({
          abi: abi14,
          eventName,
          args
        }) : [];
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["logs", { address: address4, topics }],
          onData(data3) {
            if (!active)
              return;
            const log5 = data3.result;
            try {
              const { eventName: eventName2, args: args2 } = decodeEventLog({
                abi: abi14,
                data: log5.data,
                topics: log5.topics,
                strict: strict_
              });
              const formatted = formatLog(log5, {
                args: args2,
                eventName: eventName2
              });
              onLogs([formatted]);
            } catch (err) {
              let eventName2;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName2 = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
              }
              const formatted = formatLog(log5, {
                args: isUnnamed ? [] : {},
                eventName: eventName2
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return unsubscribe;
  };
  return enablePolling ? pollContractEvent() : subscribeContractEvent();
}

// node_modules/viem/_esm/actions/public/getChainId.js
init_fromHex();
async function getChainId(client) {
  const chainIdHex = await client.request({
    method: "eth_chainId"
  });
  return hexToNumber(chainIdHex);
}

// node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
async function sendRawTransaction(client, { serializedTransaction }) {
  return client.request({
    method: "eth_sendRawTransaction",
    params: [serializedTransaction]
  });
}

// node_modules/viem/_esm/utils/accounts.js
init_parseAccount();

// node_modules/viem/_esm/utils/uid.js
function uid(length = 11) {
  if (!buffer || index + length > size7 * 2) {
    buffer = "";
    index = 0;
    for (let i = 0;i < size7; i++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length);
}
var size7 = 256;
var index = size7;
var buffer;

// node_modules/viem/_esm/clients/createClient.js
function createClient(parameters) {
  const { batch, cacheTime = parameters.pollingInterval ?? 4000, key = "base", name = "Base Client", pollingInterval = 4000, type = "base" } = parameters;
  const chain3 = parameters.chain;
  const account3 = parameters.account ? parseAccount(parameters.account) : undefined;
  const { config, request: request3, value } = parameters.transport({
    chain: chain3,
    pollingInterval
  });
  const transport = { ...config, ...value };
  const client = {
    account: account3,
    batch,
    cacheTime,
    chain: chain3,
    key,
    name,
    pollingInterval,
    request: request3,
    transport,
    type,
    uid: uid()
  };
  function extend(base22) {
    return (extendFn) => {
      const extended = extendFn(base22);
      for (const key2 in client)
        delete extended[key2];
      const combined = { ...base22, ...extended };
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(client, { extend: extend(client) });
}

// node_modules/viem/_esm/utils/buildRequest.js
init_base();
init_request();
init_rpc();

// node_modules/viem/_esm/utils/promise/withRetry.js
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry = () => true } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay)
          await wait(delay);
        attemptRetry({ count: count + 1 });
      };
      try {
        const data3 = await fn();
        resolve(data3);
      } catch (err) {
        if (count < retryCount && await shouldRetry({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    attemptRetry();
  });
}

// node_modules/viem/_esm/utils/buildRequest.js
function buildRequest(request4, { retryDelay = 150, retryCount = 3 } = {}) {
  return async (args) => withRetry(async () => {
    try {
      return await request4(args);
    } catch (err_) {
      const err = err_;
      switch (err.code) {
        case ParseRpcError.code:
          throw new ParseRpcError(err);
        case InvalidRequestRpcError.code:
          throw new InvalidRequestRpcError(err);
        case MethodNotFoundRpcError.code:
          throw new MethodNotFoundRpcError(err);
        case InvalidParamsRpcError.code:
          throw new InvalidParamsRpcError(err);
        case InternalRpcError.code:
          throw new InternalRpcError(err);
        case InvalidInputRpcError.code:
          throw new InvalidInputRpcError(err);
        case ResourceNotFoundRpcError.code:
          throw new ResourceNotFoundRpcError(err);
        case ResourceUnavailableRpcError.code:
          throw new ResourceUnavailableRpcError(err);
        case TransactionRejectedRpcError.code:
          throw new TransactionRejectedRpcError(err);
        case MethodNotSupportedRpcError.code:
          throw new MethodNotSupportedRpcError(err);
        case LimitExceededRpcError.code:
          throw new LimitExceededRpcError(err);
        case JsonRpcVersionUnsupportedError.code:
          throw new JsonRpcVersionUnsupportedError(err);
        case UserRejectedRequestError.code:
          throw new UserRejectedRequestError(err);
        case UnauthorizedProviderError.code:
          throw new UnauthorizedProviderError(err);
        case UnsupportedProviderMethodError.code:
          throw new UnsupportedProviderMethodError(err);
        case ProviderDisconnectedError.code:
          throw new ProviderDisconnectedError(err);
        case ChainDisconnectedError.code:
          throw new ChainDisconnectedError(err);
        case SwitchChainError.code:
          throw new SwitchChainError(err);
        case 5000:
          throw new UserRejectedRequestError(err);
        default:
          if (err_ instanceof BaseError)
            throw err_;
          throw new UnknownRpcError(err);
      }
    }
  }, {
    delay: ({ count, error }) => {
      if (error && error instanceof HttpRequestError) {
        const retryAfter = error?.headers?.get("Retry-After");
        if (retryAfter?.match(/\d/))
          return parseInt(retryAfter) * 1000;
      }
      return ~~(1 << count) * retryDelay;
    },
    retryCount,
    shouldRetry: ({ error }) => !isDeterministicError(error)
  });
}
var isDeterministicError = (error) => {
  if ("code" in error)
    return error.code !== -1 && error.code !== -32004 && error.code !== -32005 && error.code !== -32042 && error.code !== -32603;
  if (error instanceof HttpRequestError && error.status)
    return error.status !== 403 && error.status !== 408 && error.status !== 413 && error.status !== 429 && error.status !== 500 && error.status !== 502 && error.status !== 503 && error.status !== 504;
  return false;
};

// node_modules/viem/_esm/clients/transports/createTransport.js
function createTransport({ key, name, request: request4, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  return {
    config: { key, name, request: request4, retryCount, retryDelay, timeout, type },
    request: buildRequest(request4, { retryCount, retryDelay }),
    value
  };
}

// node_modules/viem/_esm/clients/transports/http.js
init_request();

// node_modules/viem/_esm/errors/transport.js
init_base();

class UrlRequiredError extends BaseError {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro"
    });
  }
}

// node_modules/viem/_esm/clients/transports/http.js
init_createBatchScheduler();

// node_modules/ws/wrapper.mjs
var exports_wrapper = {};
__export(exports_wrapper, {
  default: () => {
    {
      return wrapper_default;
    }
  },
  createWebSocketStream: () => {
    {
      return stream.default;
    }
  },
  WebSocketServer: () => {
    {
      return websocket_server.default;
    }
  },
  WebSocket: () => {
    {
      return websocket.default;
    }
  },
  Sender: () => {
    {
      return sender.default;
    }
  },
  Receiver: () => {
    {
      return receiver.default;
    }
  }
});
var stream = __toESM(require_stream(), 1);
var receiver = __toESM(require_receiver(), 1);
var sender = __toESM(require_sender(), 1);
var websocket = __toESM(require_websocket(), 1);
var websocket_server = __toESM(require_websocket_server(), 1);
var wrapper_default = websocket.default;

// node_modules/isows/_esm/utils.js
function getNativeWebSocket() {
  if (typeof WebSocket !== "undefined")
    return WebSocket;
  if (typeof global.WebSocket !== "undefined")
    return global.WebSocket;
  if (typeof window.WebSocket !== "undefined")
    return window.WebSocket;
  if (typeof self.WebSocket !== "undefined")
    return self.WebSocket;
  throw new Error("`WebSocket` is not supported in this environment");
}

// node_modules/isows/_esm/index.js
var WebSocket3 = (() => {
  try {
    return getNativeWebSocket();
  } catch {
    if (websocket.default)
      return websocket.default;
    return exports_wrapper;
  }
})();

// node_modules/viem/_esm/utils/rpc.js
init_request();
init_createBatchScheduler();

// node_modules/viem/_esm/utils/promise/withTimeout.js
function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
  return new Promise((resolve, reject) => {
    (async () => {
      let timeoutId;
      try {
        const controller = new AbortController;
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (signal) {
              controller.abort();
            } else {
              reject(errorInstance);
            }
          }, timeout);
        }
        resolve(await fn({ signal: controller?.signal }));
      } catch (err) {
        if (err.name === "AbortError")
          reject(errorInstance);
        reject(err);
      } finally {
        clearTimeout(timeoutId);
      }
    })();
  });
}

// node_modules/viem/_esm/utils/rpc.js
init_stringify();
async function http(url, { body, fetchOptions = {}, timeout = 1e4 }) {
  const { headers, method, signal: signal_ } = fetchOptions;
  try {
    const response = await withTimeout(async ({ signal }) => {
      const response2 = await fetch(url, {
        ...fetchOptions,
        body: Array.isArray(body) ? stringify(body.map((body2) => ({
          jsonrpc: "2.0",
          id: body2.id ?? id++,
          ...body2
        }))) : stringify({ jsonrpc: "2.0", id: body.id ?? id++, ...body }),
        headers: {
          ...headers,
          "Content-Type": "application/json"
        },
        method: method || "POST",
        signal: signal_ || (timeout > 0 ? signal : undefined)
      });
      return response2;
    }, {
      errorInstance: new TimeoutError({ body, url }),
      timeout,
      signal: true
    });
    let data3;
    if (response.headers.get("Content-Type")?.startsWith("application/json")) {
      data3 = await response.json();
    } else {
      data3 = await response.text();
    }
    if (!response.ok) {
      throw new HttpRequestError({
        body,
        details: stringify(data3.error) || response.statusText,
        headers: response.headers,
        status: response.status,
        url
      });
    }
    return data3;
  } catch (err) {
    if (err instanceof HttpRequestError)
      throw err;
    if (err instanceof TimeoutError)
      throw err;
    throw new HttpRequestError({
      body,
      details: err.message,
      url
    });
  }
}
async function getSocket(url) {
  let socket = socketsCache.get(url);
  if (socket)
    return socket;
  const { schedule } = createBatchScheduler({
    id: url,
    fn: async () => {
      const webSocket = new WebSocket3(url);
      const requests = new Map;
      const subscriptions = new Map;
      const onMessage = ({ data: data3 }) => {
        const message = JSON.parse(data3);
        const isSubscription = message.method === "eth_subscription";
        const id = isSubscription ? message.params.subscription : message.id;
        const cache = isSubscription ? subscriptions : requests;
        const callback = cache.get(id);
        if (callback)
          callback({ data: data3 });
        if (!isSubscription)
          cache.delete(id);
      };
      const onClose = () => {
        socketsCache.delete(url);
        webSocket.removeEventListener("close", onClose);
        webSocket.removeEventListener("message", onMessage);
      };
      webSocket.addEventListener("close", onClose);
      webSocket.addEventListener("message", onMessage);
      if (webSocket.readyState === WebSocket3.CONNECTING) {
        await new Promise((resolve, reject) => {
          if (!webSocket)
            return;
          webSocket.onopen = resolve;
          webSocket.onerror = reject;
        });
      }
      socket = Object.assign(webSocket, {
        requests,
        subscriptions
      });
      socketsCache.set(url, socket);
      return [socket];
    }
  });
  const [_, [socket_]] = await schedule();
  return socket_;
}
var webSocket = function(socket, { body, onResponse }) {
  if (socket.readyState === socket.CLOSED || socket.readyState === socket.CLOSING)
    throw new WebSocketRequestError({
      body,
      url: socket.url,
      details: "Socket is closed."
    });
  const id_ = id++;
  const callback = ({ data: data3 }) => {
    const message = JSON.parse(data3);
    if (typeof message.id === "number" && id_ !== message.id)
      return;
    onResponse?.(message);
    if (body.method === "eth_subscribe" && typeof message.result === "string") {
      socket.subscriptions.set(message.result, callback);
    }
    if (body.method === "eth_unsubscribe") {
      socket.subscriptions.delete(body.params?.[0]);
    }
  };
  socket.requests.set(id_, callback);
  socket.send(JSON.stringify({ jsonrpc: "2.0", ...body, id: id_ }));
  return socket;
};
async function webSocketAsync(socket, { body, timeout = 1e4 }) {
  return withTimeout(() => new Promise((onResponse) => rpc4.webSocket(socket, {
    body,
    onResponse
  })), {
    errorInstance: new TimeoutError({ body, url: socket.url }),
    timeout
  });
}
var id = 0;
var socketsCache = new Map;
var rpc4 = {
  http,
  webSocket,
  webSocketAsync
};

// node_modules/viem/_esm/clients/transports/http.js
function http2(url, config = {}) {
  const { batch, fetchOptions, key = "http", name = "HTTP JSON-RPC", retryDelay } = config;
  return ({ chain: chain3, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1000, wait: wait4 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain3?.rpcUrls.default.http[0];
    if (!url_)
      throw new UrlRequiredError;
    return createTransport({
      key,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const { schedule } = createBatchScheduler({
          id: `${url}`,
          wait: wait4,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpc4.http(url_, {
            body: body2,
            fetchOptions,
            timeout
          }),
          sort: (a, b) => a.id - b.id
        });
        const fn = async (body2) => batch ? schedule(body2) : [await rpc4.http(url_, { body: body2, fetchOptions, timeout })];
        const [{ error, result }] = await fn(body);
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url
    });
  };
}
// node_modules/viem/_esm/actions/ens/getEnsAddress.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
init_trim();
init_toHex();

// node_modules/viem/_esm/utils/ens/errors.js
init_solidity();
init_base();
init_contract();
function isNullUniversalResolverError(err, callType) {
  if (!(err instanceof BaseError))
    return false;
  const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
  if (!(cause instanceof ContractFunctionRevertedError))
    return false;
  if (cause.data?.errorName === "ResolverNotFound")
    return true;
  if (cause.data?.errorName === "ResolverWildcardNotSupported")
    return true;
  if (cause.reason?.includes("Wildcard on non-extended resolvers is not supported"))
    return true;
  if (callType === "reverse" && cause.reason === panicReasons[50])
    return true;
  return false;
}

// node_modules/viem/_esm/utils/ens/namehash.js
init_concat();
init_toBytes();
init_toHex();
init_keccak256();

// node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
init_isHex();
function encodedLabelToLabelhash(label) {
  if (label.length !== 66)
    return null;
  if (label.indexOf("[") !== 0)
    return null;
  if (label.indexOf("]") !== 65)
    return null;
  const hash3 = `0x${label.slice(1, 65)}`;
  if (!isHex(hash3))
    return null;
  return hash3;
}

// node_modules/viem/_esm/utils/ens/namehash.js
function namehash(name) {
  let result = new Uint8Array(32).fill(0);
  if (!name)
    return bytesToHex(result);
  const labels = name.split(".");
  for (let i = labels.length - 1;i >= 0; i -= 1) {
    const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
    const hashed = hashFromEncodedLabel ? toBytes2(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i]), "bytes");
    result = keccak256(concat([result, hashed]), "bytes");
  }
  return bytesToHex(result);
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
init_toBytes();

// node_modules/viem/_esm/utils/ens/encodeLabelhash.js
function encodeLabelhash(hash3) {
  return `[${hash3.slice(2)}]`;
}

// node_modules/viem/_esm/utils/ens/labelhash.js
init_toBytes();
init_toHex();
init_keccak256();
function labelhash(label) {
  const result = new Uint8Array(32).fill(0);
  if (!label)
    return bytesToHex(result);
  return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
function packetToBytes(packet) {
  const value = packet.replace(/^\.|\.$/gm, "");
  if (value.length === 0)
    return new Uint8Array(1);
  const bytes2 = new Uint8Array(stringToBytes(value).byteLength + 2);
  let offset = 0;
  const list = value.split(".");
  for (let i = 0;i < list.length; i++) {
    let encoded = stringToBytes(list[i]);
    if (encoded.byteLength > 255)
      encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
    bytes2[offset] = encoded.length;
    bytes2.set(encoded, offset + 1);
    offset += encoded.length + 1;
  }
  if (bytes2.byteLength !== offset + 1)
    return bytes2.slice(0, offset + 1);
  return bytes2;
}

// node_modules/viem/_esm/actions/ens/getEnsAddress.js
async function getEnsAddress(client, { blockNumber, blockTag, coinType, name, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const functionData = encodeFunctionData({
      abi: addressResolverAbi,
      functionName: "addr",
      ...coinType != null ? { args: [namehash(name), BigInt(coinType)] } : { args: [namehash(name)] }
    });
    const res = await getAction(client, readContract, "readContract")({
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [toHex(packetToBytes(name)), functionData],
      blockNumber,
      blockTag
    });
    if (res[0] === "0x")
      return null;
    const address4 = decodeFunctionResult({
      abi: addressResolverAbi,
      args: coinType != null ? [namehash(name), BigInt(coinType)] : undefined,
      functionName: "addr",
      data: res[0]
    });
    if (address4 === "0x")
      return null;
    if (trim(address4) === "0x00")
      return null;
    return address4;
  } catch (err) {
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/errors/ens.js
init_base();

class EnsAvatarInvalidMetadataError extends BaseError {
  constructor({ data: data3 }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(data3)}`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarInvalidMetadataError"
    });
  }
}

class EnsAvatarInvalidNftUriError extends BaseError {
  constructor({ reason }) {
    super(`ENS NFT avatar URI is invalid. ${reason}`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarInvalidNftUriError"
    });
  }
}

class EnsAvatarUriResolutionError extends BaseError {
  constructor({ uri }) {
    super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarUriResolutionError"
    });
  }
}

class EnsAvatarUnsupportedNamespaceError extends BaseError {
  constructor({ namespace }) {
    super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "EnsAvatarUnsupportedNamespaceError"
    });
  }
}

// node_modules/viem/_esm/utils/ens/avatar/utils.js
async function isImageUri(uri) {
  try {
    const res = await fetch(uri, { method: "HEAD" });
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
    return false;
  } catch (error) {
    if (typeof error === "object" && typeof error.response !== "undefined") {
      return false;
    }
    if (!globalThis.hasOwnProperty("Image"))
      return false;
    return new Promise((resolve) => {
      const img = new Image;
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = uri;
    });
  }
}
function getGateway(custom, defaultGateway) {
  if (!custom)
    return defaultGateway;
  if (custom.endsWith("/"))
    return custom.slice(0, -1);
  return custom;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
  const isEncoded = base64Regex.test(uri);
  if (isEncoded)
    return { uri, isOnChain: true, isEncoded };
  const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
  const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
  const networkRegexMatch = uri.match(networkRegex);
  const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
  const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
  const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
  if (uri.startsWith("http") && !isIPNS && !isIPFS) {
    let replacedUri = uri;
    if (gatewayUrls?.arweave)
      replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
    return { uri: replacedUri, isOnChain: false, isEncoded: false };
  }
  if ((isIPNS || isIPFS) && target) {
    return {
      uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  if (protocol === "ar:/" && target) {
    return {
      uri: `${arweaveGateway}/${target}${subtarget || ""}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  let parsedUri = uri.replace(dataURIRegex, "");
  if (parsedUri.startsWith("<svg")) {
    parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
  }
  if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
    return {
      uri: parsedUri,
      isOnChain: true,
      isEncoded: false
    };
  }
  throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data3) {
  if (typeof data3 !== "object" || !("image" in data3) && !("image_url" in data3) && !("image_data" in data3)) {
    throw new EnsAvatarInvalidMetadataError({ data: data3 });
  }
  return data3.image || data3.image_url || data3.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, uri }) {
  try {
    const res = await fetch(uri).then((res2) => res2.json());
    const image = await parseAvatarUri({
      gatewayUrls,
      uri: getJsonImage(res)
    });
    return image;
  } catch {
    throw new EnsAvatarUriResolutionError({ uri });
  }
}
async function parseAvatarUri({ gatewayUrls, uri }) {
  const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
  if (isOnChain)
    return resolvedURI;
  const isImage = await isImageUri(resolvedURI);
  if (isImage)
    return resolvedURI;
  throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
  let uri = uri_;
  if (uri.startsWith("did:nft:")) {
    uri = uri.replace("did:nft:", "").replace(/_/g, "/");
  }
  const [reference, asset_namespace, tokenID] = uri.split("/");
  const [eip_namespace, chainID] = reference.split(":");
  const [erc_namespace, contractAddress] = asset_namespace.split(":");
  if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
    throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!chainID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!contractAddress)
    throw new EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!tokenID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!erc_namespace)
    throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: parseInt(chainID),
    namespace: erc_namespace.toLowerCase(),
    contractAddress,
    tokenID
  };
}
async function getNftTokenUri(client, { nft }) {
  if (nft.namespace === "erc721") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(nft.tokenID)]
    });
  }
  if (nft.namespace === "erc1155") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(nft.tokenID)]
    });
  }
  throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}
var networkRegex = /(?<protocol>https?:\/\/[^\/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;

// node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
async function parseAvatarRecord(client, { gatewayUrls, record }) {
  if (/eip155:/i.test(record))
    return parseNftAvatarUri(client, { gatewayUrls, record });
  return parseAvatarUri({ uri: record, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record }) {
  const nft = parseNftUri(record);
  const nftUri = await getNftTokenUri(client, { nft });
  const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
  if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
    const encodedJson = isEncoded ? atob(resolvedNftUri.replace("data:application/json;base64,", "")) : resolvedNftUri;
    const decoded = JSON.parse(encodedJson);
    return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
  }
  let uriTokenId = nft.tokenID;
  if (nft.namespace === "erc1155")
    uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
  return getMetadataAvatarUri({
    gatewayUrls,
    uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
  });
}

// node_modules/viem/_esm/actions/ens/getEnsText.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
init_toHex();
async function getEnsText(client, { blockNumber, blockTag, name, key, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  try {
    const res = await getAction(client, readContract, "readContract")({
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolve",
      args: [
        toHex(packetToBytes(name)),
        encodeFunctionData({
          abi: textResolverAbi,
          functionName: "text",
          args: [namehash(name), key]
        })
      ],
      blockNumber,
      blockTag
    });
    if (res[0] === "0x")
      return null;
    const record = decodeFunctionResult({
      abi: textResolverAbi,
      functionName: "text",
      data: res[0]
    });
    return record === "" ? null : record;
  } catch (err) {
    if (isNullUniversalResolverError(err, "resolve"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsAvatar.js
async function getEnsAvatar(client, { blockNumber, blockTag, gatewayUrls, name, universalResolverAddress }) {
  const record = await getAction(client, getEnsText, "getEnsText")({
    blockNumber,
    blockTag,
    key: "avatar",
    name,
    universalResolverAddress
  });
  if (!record)
    return null;
  try {
    return await parseAvatarRecord(client, { record, gatewayUrls });
  } catch {
    return null;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsName.js
init_abis();
init_getChainContractAddress();
init_toHex();
async function getEnsName(client, { address: address4, blockNumber, blockTag, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const reverseNode = `${address4.toLowerCase().substring(2)}.addr.reverse`;
  try {
    const res = await getAction(client, readContract, "readContract")({
      address: universalResolverAddress,
      abi: universalResolverReverseAbi,
      functionName: "reverse",
      args: [toHex(packetToBytes(reverseNode))],
      blockNumber,
      blockTag
    });
    return res[0];
  } catch (err) {
    if (isNullUniversalResolverError(err, "reverse"))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsResolver.js
init_getChainContractAddress();
init_toHex();
async function getEnsResolver(client, { blockNumber, blockTag, name, universalResolverAddress: universalResolverAddress_ }) {
  let universalResolverAddress = universalResolverAddress_;
  if (!universalResolverAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    universalResolverAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "ensUniversalResolver"
    });
  }
  const [resolverAddress] = await getAction(client, readContract, "readContract")({
    address: universalResolverAddress,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [{ type: "address" }, { type: "bytes32" }],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [toHex(packetToBytes(name))],
    blockNumber,
    blockTag
  });
  return resolverAddress;
}

// node_modules/viem/_esm/clients/decorators/public.js
init_call();

// node_modules/viem/_esm/actions/public/createBlockFilter.js
async function createBlockFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newBlockFilter"
  });
  const id2 = await client.request({
    method: "eth_newBlockFilter"
  });
  return { id: id2, request: getRequest(id2), type: "block" };
}

// node_modules/viem/_esm/actions/public/createEventFilter.js
init_toHex();
async function createEventFilter(client, { address: address4, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
  const events = events_ ?? (event ? [event] : undefined);
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  let topics = [];
  if (events) {
    topics = [
      events.flatMap((event2) => encodeEventTopics({
        abi: [event2],
        eventName: event2.name,
        args
      }))
    ];
    if (event)
      topics = topics[0];
  }
  const id2 = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address: address4,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        ...topics.length ? { topics } : {}
      }
    ]
  });
  return {
    abi: events,
    args,
    eventName: event ? event.name : undefined,
    fromBlock,
    id: id2,
    request: getRequest(id2),
    strict,
    toBlock,
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
async function createPendingTransactionFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newPendingTransactionFilter"
  });
  const id2 = await client.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id: id2, request: getRequest(id2), type: "transaction" };
}

// node_modules/viem/_esm/actions/public/getBalance.js
init_toHex();
async function getBalance(client, { address: address4, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
  const balance = await client.request({
    method: "eth_getBalance",
    params: [address4, blockNumberHex || blockTag]
  });
  return BigInt(balance);
}

// node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
init_fromHex();
init_toHex();
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  let count;
  if (blockHash) {
    count = await client.request({
      method: "eth_getBlockTransactionCountByHash",
      params: [blockHash]
    });
  } else {
    count = await client.request({
      method: "eth_getBlockTransactionCountByNumber",
      params: [blockNumberHex || blockTag]
    });
  }
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/public/getBytecode.js
init_toHex();
async function getBytecode(client, { address: address4, blockNumber, blockTag = "latest" }) {
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  const hex = await client.request({
    method: "eth_getCode",
    params: [address4, blockNumberHex || blockTag]
  });
  if (hex === "0x")
    return;
  return hex;
}

// node_modules/viem/_esm/actions/public/getFeeHistory.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/feeHistory.js
function formatFeeHistory(feeHistory) {
  return {
    baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
    gasUsedRatio: feeHistory.gasUsedRatio,
    oldestBlock: BigInt(feeHistory.oldestBlock),
    reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
  };
}

// node_modules/viem/_esm/actions/public/getFeeHistory.js
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
  const blockNumberHex = blockNumber ? numberToHex(blockNumber) : undefined;
  const feeHistory2 = await client.request({
    method: "eth_feeHistory",
    params: [
      numberToHex(blockCount),
      blockNumberHex || blockTag,
      rewardPercentiles
    ]
  });
  return formatFeeHistory(feeHistory2);
}

// node_modules/viem/_esm/actions/public/getFilterLogs.js
init_abi();
async function getFilterLogs(_client, { filter }) {
  const strict = filter.strict ?? false;
  const logs = await filter.request({
    method: "eth_getFilterLogs",
    params: [filter.id]
  });
  return logs.map((log6) => {
    try {
      const { eventName, args } = "abi" in filter && filter.abi ? decodeEventLog({
        abi: filter.abi,
        data: log6.data,
        topics: log6.topics,
        strict
      }) : { eventName: undefined, args: undefined };
      return formatLog(log6, { args, eventName });
    } catch (err) {
      let eventName;
      let isUnnamed;
      if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
        if ("strict" in filter && filter.strict)
          return;
        eventName = err.abiItem.name;
        isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
      }
      return formatLog(log6, { args: isUnnamed ? [] : {}, eventName });
    }
  }).filter(Boolean);
}

// node_modules/viem/_esm/actions/public/getProof.js
init_toHex();

// node_modules/viem/_esm/utils/chain/defineChain.js
function defineChain(chain3, config = {}) {
  const { fees = chain3.fees, formatters = chain3.formatters, serializers = chain3.serializers } = config;
  return {
    ...chain3,
    fees,
    formatters,
    serializers
  };
}

// node_modules/viem/_esm/utils/regex.js
var bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;

// node_modules/viem/_esm/utils/typedData.js
init_abi();
init_address();
init_isAddress();
init_size();
init_toHex();

// node_modules/viem/_esm/utils/signature/hashTypedData.js
init_encodeAbiParameters();
init_concat();
init_toHex();
init_keccak256();
function hashTypedData({ domain: domain_, message, primaryType, types: types_ }) {
  const domain = typeof domain_ === "undefined" ? {} : domain_;
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...types_
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x1901"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain") {
    parts.push(hashStruct({
      data: message,
      primaryType,
      types
    }));
  }
  return keccak256(concat(parts));
}
function hashDomain({ domain, types }) {
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types
  });
}
var hashStruct = function({ data: data3, primaryType, types }) {
  const encoded = encodeData({
    data: data3,
    primaryType,
    types
  });
  return keccak256(encoded);
};
var encodeData = function({ data: data3, primaryType, types }) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data3[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
};
var hashType = function({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
};
var encodeType = function({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
};
var findTypeDependencies = function({ primaryType: primaryType_, types }, results = new Set) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === undefined) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
};
var encodeField = function({ types, name, type, value }) {
  if (types[type] !== undefined) {
    return [
      { type: "bytes32" },
      keccak256(encodeData({ data: value, primaryType: type, types }))
    ];
  }
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value)];
  }
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map((item) => encodeField({
      name,
      type: parsedType,
      types,
      value: item
    }));
    return [
      { type: "bytes32" },
      keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
};

// node_modules/viem/_esm/utils/typedData.js
function validateTypedData({ domain, message, primaryType, types: types_ }) {
  const types = types_;
  const validateData = (struct, value_) => {
    for (const param of struct) {
      const { name, type: type_ } = param;
      const type = type_;
      const value = value_[name];
      const integerMatch = type.match(integerRegex);
      if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
        const [_type, base26, size_] = integerMatch;
        numberToHex(value, {
          signed: base26 === "int",
          size: parseInt(size_) / 8
        });
      }
      if (type === "address" && typeof value === "string" && !isAddress(value))
        throw new InvalidAddressError({ address: value });
      const bytesMatch = type.match(bytesRegex);
      if (bytesMatch) {
        const [_type, size_] = bytesMatch;
        if (size_ && size(value) !== parseInt(size_))
          throw new BytesSizeMismatchError({
            expectedSize: parseInt(size_),
            givenSize: size(value)
          });
      }
      const struct2 = types[type];
      if (struct2)
        validateData(struct2, value);
    }
  };
  if (types.EIP712Domain && domain)
    validateData(types.EIP712Domain, domain);
  if (primaryType !== "EIP712Domain") {
    const type = types[primaryType];
    validateData(type, message);
  }
}
function getTypesForEIP712Domain({ domain }) {
  return [
    typeof domain?.name === "string" && { name: "name", type: "string" },
    domain?.version && { name: "version", type: "string" },
    typeof domain?.chainId === "number" && {
      name: "chainId",
      type: "uint256"
    },
    domain?.verifyingContract && {
      name: "verifyingContract",
      type: "address"
    },
    domain?.salt && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
// node_modules/viem/_esm/utils/abi/encodeDeployData.js
init_abi();
init_concat();
init_encodeAbiParameters();
function encodeDeployData({ abi: abi17, args, bytecode }) {
  if (!args || args.length === 0)
    return bytecode;
  const description = abi17.find((x) => ("type" in x) && x.type === "constructor");
  if (!description)
    throw new AbiConstructorNotFoundError({ docsPath: docsPath3 });
  if (!("inputs" in description))
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath3 });
  if (!description.inputs || description.inputs.length === 0)
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath3 });
  const data3 = encodeAbiParameters(description.inputs, args);
  return concatHex([bytecode, data3]);
}
var docsPath3 = "/docs/contract/encodeDeployData";
// node_modules/viem/_esm/utils/index.js
init_isHex();
// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
init_fromHex();
function formatTransactionReceipt(transactionReceipt) {
  return {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log7) => formatLog(log7)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? statuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
}
var statuses = {
  "0x0": "reverted",
  "0x1": "success"
};

// node_modules/viem/_esm/utils/index.js
init_toHex();
init_fromHex();

// node_modules/viem/_esm/constants/strings.js
var presignMessagePrefix = `\x19Ethereum Signed Message:
`;

// node_modules/viem/_esm/utils/signature/hashMessage.js
init_concat();
init_toBytes();
init_keccak256();
function hashMessage(message, to_) {
  const messageBytes = (() => {
    if (typeof message === "string")
      return stringToBytes(message);
    if (message.raw instanceof Uint8Array)
      return message.raw;
    return toBytes2(message.raw);
  })();
  const prefixBytes = stringToBytes(`${presignMessagePrefix}${messageBytes.length}`);
  return keccak256(concat([prefixBytes, messageBytes]), to_);
}
// node_modules/viem/_esm/utils/formatters/proof.js
var formatStorageProof = function(storageProof) {
  return storageProof.map((proof) => ({
    ...proof,
    value: BigInt(proof.value)
  }));
};
function formatProof(proof) {
  return {
    ...proof,
    balance: proof.balance ? BigInt(proof.balance) : undefined,
    nonce: proof.nonce ? hexToNumber(proof.nonce) : undefined,
    storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : undefined
  };
}

// node_modules/viem/_esm/actions/public/getProof.js
async function getProof(client, { address: address5, blockNumber, blockTag: blockTag_, storageKeys }) {
  const blockTag = blockTag_ ?? "latest";
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  const proof2 = await client.request({
    method: "eth_getProof",
    params: [address5, storageKeys, blockNumberHex || blockTag]
  });
  return formatProof(proof2);
}

// node_modules/viem/_esm/actions/public/getStorageAt.js
init_toHex();
async function getStorageAt(client, { address: address5, blockNumber, blockTag = "latest", slot }) {
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  const data3 = await client.request({
    method: "eth_getStorageAt",
    params: [address5, slot, blockNumberHex || blockTag]
  });
  return data3;
}

// node_modules/viem/_esm/actions/public/getTransaction.js
init_transaction();
init_toHex();
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash: hash3, index: index2 }) {
  const blockTag = blockTag_ || "latest";
  const blockNumberHex = blockNumber !== undefined ? numberToHex(blockNumber) : undefined;
  let transaction9 = null;
  if (hash3) {
    transaction9 = await client.request({
      method: "eth_getTransactionByHash",
      params: [hash3]
    });
  } else if (blockHash) {
    transaction9 = await client.request({
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [blockHash, numberToHex(index2)]
    });
  } else if (blockNumberHex || blockTag) {
    transaction9 = await client.request({
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [blockNumberHex || blockTag, numberToHex(index2)]
    });
  }
  if (!transaction9)
    throw new TransactionNotFoundError({
      blockHash,
      blockNumber,
      blockTag,
      hash: hash3,
      index: index2
    });
  const format = client.chain?.formatters?.transaction?.format || formatTransaction;
  return format(transaction9);
}

// node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
async function getTransactionConfirmations(client, { hash: hash3, transactionReceipt }) {
  const [blockNumber, transaction9] = await Promise.all([
    getAction(client, getBlockNumber, "getBlockNumber")({}),
    hash3 ? getAction(client, getTransaction, "getBlockNumber")({ hash: hash3 }) : undefined
  ]);
  const transactionBlockNumber = transactionReceipt?.blockNumber || transaction9?.blockNumber;
  if (!transactionBlockNumber)
    return 0n;
  return blockNumber - transactionBlockNumber + 1n;
}

// node_modules/viem/_esm/actions/public/getTransactionReceipt.js
init_transaction();
async function getTransactionReceipt(client, { hash: hash3 }) {
  const receipt = await client.request({
    method: "eth_getTransactionReceipt",
    params: [hash3]
  });
  if (!receipt)
    throw new TransactionReceiptNotFoundError({ hash: hash3 });
  const format = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return format(receipt);
}

// node_modules/viem/_esm/actions/public/multicall.js
init_abis();
init_abi();
init_base();
init_contract();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
async function multicall(client, args) {
  const { allowFailure = true, batchSize: batchSize_, blockNumber, blockTag, contracts, multicallAddress: multicallAddress_ } = args;
  const batchSize = batchSize_ ?? (typeof client.batch?.multicall === "object" && client.batch.multicall.batchSize || 1024);
  let multicallAddress = multicallAddress_;
  if (!multicallAddress) {
    if (!client.chain)
      throw new Error("client chain not configured. multicallAddress is required.");
    multicallAddress = getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  }
  const chunkedCalls = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0;i < contracts.length; i++) {
    const { abi: abi18, address: address5, args: args2, functionName } = contracts[i];
    try {
      const callData = encodeFunctionData({
        abi: abi18,
        args: args2,
        functionName
      });
      currentChunkSize += (callData.length - 2) / 2;
      if (batchSize > 0 && currentChunkSize > batchSize && chunkedCalls[currentChunk].length > 0) {
        currentChunk++;
        currentChunkSize = (callData.length - 2) / 2;
        chunkedCalls[currentChunk] = [];
      }
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData,
          target: address5
        }
      ];
    } catch (err) {
      const error = getContractError(err, {
        abi: abi18,
        address: address5,
        args: args2,
        docsPath: "/docs/contract/multicall",
        functionName
      });
      if (!allowFailure)
        throw error;
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData: "0x",
          target: address5
        }
      ];
    }
  }
  const aggregate3Results = await Promise.allSettled(chunkedCalls.map((calls) => getAction(client, readContract, "readContract")({
    abi: multicall3Abi,
    address: multicallAddress,
    args: [calls],
    blockNumber,
    blockTag,
    functionName: "aggregate3"
  })));
  const results = [];
  for (let i = 0;i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i];
    if (result.status === "rejected") {
      if (!allowFailure)
        throw result.reason;
      for (let j = 0;j < chunkedCalls[i].length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: undefined
        });
      }
      continue;
    }
    const aggregate3Result = result.value;
    for (let j = 0;j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];
      const { callData } = chunkedCalls[i][j];
      const { abi: abi18, address: address5, functionName, args: args2 } = contracts[results.length];
      try {
        if (callData === "0x")
          throw new AbiDecodingZeroDataError;
        if (!success)
          throw new RawContractError({ data: returnData });
        const result2 = decodeFunctionResult({
          abi: abi18,
          args: args2,
          data: returnData,
          functionName
        });
        results.push(allowFailure ? { result: result2, status: "success" } : result2);
      } catch (err) {
        const error = getContractError(err, {
          abi: abi18,
          address: address5,
          args: args2,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        results.push({ error, result: undefined, status: "failure" });
      }
    }
  }
  if (results.length !== contracts.length)
    throw new BaseError("multicall results mismatch");
  return results;
}

// node_modules/viem/_esm/actions/public/verifyHash.js
init_abis();

// node_modules/viem/_esm/constants/contracts.js
var universalSignatureValidatorByteCode = "0x60806040523480156200001157600080fd5b50604051620007003803806200070083398101604081905262000034916200056f565b6000620000438484846200004f565b9050806000526001601ff35b600080846001600160a01b0316803b806020016040519081016040528181526000908060200190933c90507f6492649264926492649264926492649264926492649264926492649264926492620000a68462000451565b036200021f57600060608085806020019051810190620000c79190620005ce565b8651929550909350915060000362000192576000836001600160a01b031683604051620000f5919062000643565b6000604051808303816000865af19150503d806000811462000134576040519150601f19603f3d011682016040523d82523d6000602084013e62000139565b606091505b5050905080620001905760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b505b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90620001c4908b90869060040162000661565b602060405180830381865afa158015620001e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200020891906200069d565b6001600160e01b031916149450505050506200044a565b805115620002b157604051630b135d3f60e11b808252906001600160a01b03871690631626ba7e9062000259908890889060040162000661565b602060405180830381865afa15801562000277573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200029d91906200069d565b6001600160e01b031916149150506200044a565b8251604114620003195760405162461bcd60e51b815260206004820152603a6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e677468000000000000606482015260840162000187565b620003236200046b565b506020830151604080850151855186939260009185919081106200034b576200034b620006c9565b016020015160f81c9050601b81148015906200036b57508060ff16601c14155b15620003cf5760405162461bcd60e51b815260206004820152603b6024820152600080516020620006e083398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c75650000000000606482015260840162000187565b6040805160008152602081018083528a905260ff83169181019190915260608101849052608081018390526001600160a01b038a169060019060a0016020604051602081039080840390855afa1580156200042e573d6000803e3d6000fd5b505050602060405103516001600160a01b031614955050505050505b9392505050565b60006020825110156200046357600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b03811681146200049f57600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b83811015620004d5578181015183820152602001620004bb565b50506000910152565b600082601f830112620004f057600080fd5b81516001600160401b03808211156200050d576200050d620004a2565b604051601f8301601f19908116603f01168101908282118183101715620005385762000538620004a2565b816040528381528660208588010111156200055257600080fd5b62000565846020830160208901620004b8565b9695505050505050565b6000806000606084860312156200058557600080fd5b8351620005928162000489565b6020850151604086015191945092506001600160401b03811115620005b657600080fd5b620005c486828701620004de565b9150509250925092565b600080600060608486031215620005e457600080fd5b8351620005f18162000489565b60208501519093506001600160401b03808211156200060f57600080fd5b6200061d87838801620004de565b935060408601519150808211156200063457600080fd5b50620005c486828701620004de565b6000825162000657818460208701620004b8565b9190910192915050565b828152604060208201526000825180604084015262000688816060850160208701620004b8565b601f01601f1916919091016060019392505050565b600060208284031215620006b057600080fd5b81516001600160e01b0319811681146200044a57600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";

// node_modules/viem/_esm/actions/public/verifyHash.js
init_contract();

// node_modules/viem/_esm/utils/data/isBytesEqual.js
init_utils3();
init_toBytes();
init_isHex();
function isBytesEqual(a_, b_) {
  const a = isHex(a_) ? toBytes2(a_) : a_;
  const b = isHex(b_) ? toBytes2(b_) : b_;
  return equalBytes(a, b);
}

// node_modules/viem/_esm/actions/public/verifyHash.js
init_call();
async function verifyHash(client, { address: address5, hash: hash3, signature, ...callRequest }) {
  const signatureHex = isHex(signature) ? signature : toHex(signature);
  try {
    const { data: data3 } = await getAction(client, call2, "call")({
      data: encodeDeployData({
        abi: universalSignatureValidatorAbi,
        args: [address5, hash3, signatureHex],
        bytecode: universalSignatureValidatorByteCode
      }),
      ...callRequest
    });
    return isBytesEqual(data3 ?? "0x0", "0x1");
  } catch (error) {
    if (error instanceof CallExecutionError) {
      return false;
    }
    throw error;
  }
}

// node_modules/viem/_esm/actions/public/verifyMessage.js
async function verifyMessage(client, { address: address5, message, signature, ...callRequest }) {
  const hash3 = hashMessage(message);
  return verifyHash(client, {
    address: address5,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/verifyTypedData.js
async function verifyTypedData(client, { address: address5, signature, message, primaryType, types, domain, ...callRequest }) {
  const hash3 = hashTypedData({ message, primaryType, types, domain });
  return verifyHash(client, {
    address: address5,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
init_transaction();
init_stringify();

// node_modules/viem/_esm/actions/public/watchBlockNumber.js
init_fromHex();
init_stringify();
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  let prevBlockNumber;
  const pollBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed,
      pollingInterval
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
      try {
        const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (prevBlockNumber) {
          if (blockNumber === prevBlockNumber)
            return;
          if (blockNumber - prevBlockNumber > 1 && emitMissed) {
            for (let i = prevBlockNumber + 1n;i < blockNumber; i++) {
              emit.onBlockNumber(i, prevBlockNumber);
              prevBlockNumber = i;
            }
          }
        }
        if (!prevBlockNumber || blockNumber > prevBlockNumber) {
          emit.onBlockNumber(blockNumber, prevBlockNumber);
          prevBlockNumber = blockNumber;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlockNumber = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newHeads"],
          onData(data3) {
            if (!active)
              return;
            const blockNumber = hexToBigInt(data3.result?.number);
            onBlockNumber(blockNumber, prevBlockNumber);
            prevBlockNumber = blockNumber;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return unsubscribe;
  };
  return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
async function waitForTransactionReceipt(client, { confirmations = 1, hash: hash3, onReplaced, pollingInterval = client.pollingInterval, timeout }) {
  const observerId = stringify(["waitForTransactionReceipt", client.uid, hash3]);
  let transaction11;
  let replacedTransaction;
  let receipt;
  let retrying = false;
  return new Promise((resolve, reject) => {
    if (timeout)
      setTimeout(() => reject(new WaitForTransactionReceiptTimeoutError({ hash: hash3 })), timeout);
    const _unobserve = observe(observerId, { onReplaced, resolve, reject }, (emit) => {
      const _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
        emitMissed: true,
        emitOnBegin: true,
        poll: true,
        pollingInterval,
        async onBlockNumber(blockNumber_) {
          if (retrying)
            return;
          let blockNumber = blockNumber_;
          const done = (fn) => {
            _unwatch();
            fn();
            _unobserve();
          };
          try {
            if (receipt) {
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              done(() => emit.resolve(receipt));
              return;
            }
            if (!transaction11) {
              retrying = true;
              await withRetry(async () => {
                transaction11 = await getAction(client, getTransaction, "getTransaction")({ hash: hash3 });
                if (transaction11.blockNumber)
                  blockNumber = transaction11.blockNumber;
              }, {
                delay: ({ count }) => ~~(1 << count) * 200,
                retryCount: 6
              });
              retrying = false;
            }
            receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 });
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
          } catch (err) {
            if (transaction11 && (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError)) {
              try {
                replacedTransaction = transaction11;
                retrying = true;
                const block4 = await withRetry(() => getAction(client, getBlock, "getBlock")({
                  blockNumber,
                  includeTransactions: true
                }), {
                  delay: ({ count }) => ~~(1 << count) * 200,
                  retryCount: 6,
                  shouldRetry: ({ error }) => error instanceof BlockNotFoundError
                });
                retrying = false;
                const replacementTransaction = block4.transactions.find(({ from, nonce }) => from === replacedTransaction.from && nonce === replacedTransaction.nonce);
                if (!replacementTransaction)
                  return;
                receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                  hash: replacementTransaction.hash
                });
                if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                  return;
                let reason = "replaced";
                if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value) {
                  reason = "repriced";
                } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                  reason = "cancelled";
                }
                done(() => {
                  emit.onReplaced?.({
                    reason,
                    replacedTransaction,
                    transaction: replacementTransaction,
                    transactionReceipt: receipt
                  });
                  emit.resolve(receipt);
                });
              } catch (err_) {
                done(() => emit.reject(err_));
              }
            } else {
              done(() => emit.reject(err));
            }
          }
        }
      });
    });
  });
}

// node_modules/viem/_esm/actions/public/watchBlocks.js
init_stringify();
function watchBlocks(client, { blockTag = "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const includeTransactions = includeTransactions_ ?? false;
  let prevBlock;
  const pollBlocks = () => {
    const observerId = stringify([
      "watchBlocks",
      client.uid,
      emitMissed,
      emitOnBegin,
      includeTransactions,
      pollingInterval
    ]);
    return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
      try {
        const block5 = await getAction(client, getBlock, "getBlock")({
          blockTag,
          includeTransactions
        });
        if (block5.number && prevBlock?.number) {
          if (block5.number === prevBlock.number)
            return;
          if (block5.number - prevBlock.number > 1 && emitMissed) {
            for (let i = prevBlock?.number + 1n;i < block5.number; i++) {
              const block6 = await getAction(client, getBlock, "getBlock")({
                blockNumber: i,
                includeTransactions
              });
              emit.onBlock(block6, prevBlock);
              prevBlock = block6;
            }
          }
        }
        if (!prevBlock?.number || blockTag === "pending" && !block5?.number || block5.number && block5.number > prevBlock.number) {
          emit.onBlock(block5, prevBlock);
          prevBlock = block5;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlocks = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newHeads"],
          onData(data3) {
            if (!active)
              return;
            const format = client.chain?.formatters?.block?.format || formatBlock;
            const block5 = format(data3.result);
            onBlock(block5, prevBlock);
            prevBlock = block5;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return unsubscribe;
  };
  return enablePolling ? pollBlocks() : subscribeBlocks();
}

// node_modules/viem/_esm/actions/public/watchEvent.js
init_stringify();
init_abi();
init_rpc();
function watchEvent(client, { address: address5, args, batch = true, event, events, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const strict = strict_ ?? false;
  const pollEvent = () => {
    const observerId = stringify([
      "watchEvent",
      address5,
      args,
      batch,
      client.uid,
      event,
      pollingInterval
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createEventFilter, "createEventFilter")({
              address: address5,
              args,
              event,
              events,
              strict
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getLogs, "getLogs")({
                address: address5,
                args,
                event,
                events,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log7 of logs)
              emit.onLogs([log7]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const events_ = events ?? (event ? [event] : undefined);
        let topics = [];
        if (events_) {
          topics = [
            events_.flatMap((event2) => encodeEventTopics({
              abi: [event2],
              eventName: event2.name,
              args
            }))
          ];
          if (event)
            topics = topics[0];
        }
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["logs", { address: address5, topics }],
          onData(data3) {
            if (!active)
              return;
            const log7 = data3.result;
            try {
              const { eventName, args: args2 } = decodeEventLog({
                abi: events_,
                data: log7.data,
                topics: log7.topics,
                strict
              });
              const formatted = formatLog(log7, {
                args: args2,
                eventName
              });
              onLogs([formatted]);
            } catch (err) {
              let eventName;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !(("name" in x) && x.name));
              }
              const formatted = formatLog(log7, {
                args: isUnnamed ? [] : {},
                eventName
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return unsubscribe;
  };
  return enablePolling ? pollEvent() : subscribeEvent();
}

// node_modules/viem/_esm/actions/public/watchPendingTransactions.js
init_stringify();
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket";
  const pollPendingTransactions = () => {
    const observerId = stringify([
      "watchPendingTransactions",
      client.uid,
      batch,
      pollingInterval
    ]);
    return observe(observerId, { onTransactions, onError }, (emit) => {
      let filter;
      const unwatch = poll(async () => {
        try {
          if (!filter) {
            try {
              filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (err) {
              unwatch();
              throw err;
            }
          }
          const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          if (hashes.length === 0)
            return;
          if (batch)
            emit.onTransactions(hashes);
          else
            for (const hash3 of hashes)
              emit.onTransactions([hash3]);
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribePendingTransactions = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(data3) {
            if (!active)
              return;
            const transaction11 = data3.result;
            onTransactions([transaction11]);
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return unsubscribe;
  };
  return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}

// node_modules/viem/_esm/clients/decorators/public.js
function publicActions(client) {
  return {
    call: (args) => call2(client, args),
    createBlockFilter: () => createBlockFilter(client),
    createContractEventFilter: (args) => createContractEventFilter(client, args),
    createEventFilter: (args) => createEventFilter(client, args),
    createPendingTransactionFilter: () => createPendingTransactionFilter(client),
    estimateContractGas: (args) => estimateContractGas(client, args),
    estimateGas: (args) => estimateGas3(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlock: (args) => getBlock(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getBytecode: (args) => getBytecode(client, args),
    getChainId: () => getChainId(client),
    getContractEvents: (args) => getContractEvents(client, args),
    getEnsAddress: (args) => getEnsAddress(client, args),
    getEnsAvatar: (args) => getEnsAvatar(client, args),
    getEnsName: (args) => getEnsName(client, args),
    getEnsResolver: (args) => getEnsResolver(client, args),
    getEnsText: (args) => getEnsText(client, args),
    getFeeHistory: (args) => getFeeHistory(client, args),
    estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
    getFilterChanges: (args) => getFilterChanges(client, args),
    getFilterLogs: (args) => getFilterLogs(client, args),
    getGasPrice: () => getGasPrice(client),
    getLogs: (args) => getLogs(client, args),
    getProof: (args) => getProof(client, args),
    estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
    getStorageAt: (args) => getStorageAt(client, args),
    getTransaction: (args) => getTransaction(client, args),
    getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
    getTransactionCount: (args) => getTransactionCount(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    multicall: (args) => multicall(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    readContract: (args) => readContract(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    simulateContract: (args) => simulateContract(client, args),
    verifyMessage: (args) => verifyMessage(client, args),
    verifyTypedData: (args) => verifyTypedData(client, args),
    uninstallFilter: (args) => uninstallFilter(client, args),
    waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
    watchBlocks: (args) => watchBlocks(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    watchContractEvent: (args) => watchContractEvent(client, args),
    watchEvent: (args) => watchEvent(client, args),
    watchPendingTransactions: (args) => watchPendingTransactions(client, args)
  };
}

// node_modules/viem/_esm/clients/createPublicClient.js
function createPublicClient(parameters) {
  const { key = "public", name = "Public Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "publicClient"
  });
  return client.extend(publicActions);
}
// node_modules/viem/_esm/clients/transports/webSocket.js
init_request();
function webSocket2(url, config = {}) {
  const { key = "webSocket", name = "WebSocket JSON-RPC", retryDelay } = config;
  return ({ chain: chain3, retryCount: retryCount_, timeout: timeout_ }) => {
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain3?.rpcUrls.default.webSocket?.[0];
    if (!url_)
      throw new UrlRequiredError;
    return createTransport({
      key,
      name,
      async request({ method, params }) {
        const body = { method, params };
        const socket = await getSocket(url_);
        const { error, result } = await rpc4.webSocketAsync(socket, {
          body,
          timeout
        });
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "webSocket"
    }, {
      getSocket() {
        return getSocket(url_);
      },
      async subscribe({ params, onData, onError }) {
        const socket = await getSocket(url_);
        const { result: subscriptionId } = await new Promise((resolve, reject) => rpc4.webSocket(socket, {
          body: {
            method: "eth_subscribe",
            params
          },
          onResponse(response) {
            if (response.error) {
              reject(response.error);
              onError?.(response.error);
              return;
            }
            if (typeof response.id === "number") {
              resolve(response);
              return;
            }
            if (response.method !== "eth_subscription")
              return;
            onData(response.params);
          }
        }));
        return {
          subscriptionId,
          async unsubscribe() {
            return new Promise((resolve) => rpc4.webSocket(socket, {
              body: {
                method: "eth_unsubscribe",
                params: [subscriptionId]
              },
              onResponse: resolve
            }));
          }
        };
      }
    });
  };
}
// node_modules/viem/_esm/index.js
init_fromHex();

// node_modules/viem/_esm/chains/definitions/arbitrum.js
var arbitrum = defineChain({
  id: 42161,
  name: "Arbitrum One",
  network: "arbitrum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ["https://arb-mainnet.g.alchemy.com/v2"],
      webSocket: ["wss://arb-mainnet.g.alchemy.com/v2"]
    },
    infura: {
      http: ["https://arbitrum-mainnet.infura.io/v3"],
      webSocket: ["wss://arbitrum-mainnet.infura.io/ws/v3"]
    },
    default: {
      http: ["https://arb1.arbitrum.io/rpc"]
    },
    public: {
      http: ["https://arb1.arbitrum.io/rpc"]
    }
  },
  blockExplorers: {
    etherscan: { name: "Arbiscan", url: "https://arbiscan.io" },
    default: { name: "Arbiscan", url: "https://arbiscan.io" }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 7654707
    }
  }
});
// sendTweet.ts
var import_oauth_1 = __toESM(require_oauth_1_0a(), 1);
async function sendTweet(message) {
  tweetQueue.push(message);
  if (tweetQueue.length === 1) {
    tweetFromQueue();
  }
}
async function tweetFromQueue() {
  const nextTweet = tweetQueue.shift();
  if (!nextTweet)
    return;
  const oauth = new import_oauth_1.default({
    consumer: { key: TWITTER_CONSUMER_KEY, secret: TWITTER_CONSUMER_SECRET },
    signature_method: "HMAC-SHA1",
    hash_function(base_string, key) {
      return createHmac("sha1", key).update(base_string).digest("base64");
    }
  });
  const request_data = {
    url: "https://api.twitter.com/2/tweets",
    method: "POST"
  };
  try {
    const response = await fetch(request_data.url, {
      method: request_data.method,
      body: JSON.stringify({ text: nextTweet }),
      headers: {
        "Content-Type": "application/json",
        ...oauth.toHeader(oauth.authorize(request_data, { key: TWITTER_ACCESS_TOKEN, secret: TWITTER_TOKEN_SECRET }))
      }
    });
    const body = await response.json();
    console.log(body);
  } catch (e) {
    console.log(e);
  }
  setTimeout(tweetFromQueue, 1e4);
}
var { createHmac } = await import("crypto");
var TWITTER_CONSUMER_KEY = `${process.env.TWITTER_CONSUMER_KEY}`;
var TWITTER_CONSUMER_SECRET = `${process.env.TWITTER_CONSUMER_SECRET}`;
var TWITTER_ACCESS_TOKEN = `${process.env.TWITTER_ACCESS_TOKEN}`;
var TWITTER_TOKEN_SECRET = `${process.env.TWITTER_TOKEN_SECRET}`;
var tweetQueue = [];

// contractData.ts
var FOUNDRY_COURSE_ADDRESS = "0x39338138414Df90EC67dC2EE046ab78BcD4F56D9";
var SECURITY_COURSE_ADDRESS = "0xDe0e797bfAd78F0615d75430C53F8fe3C9e49883";
var LESSON_DICTIONARY = {
  "0x2e99A4CA9c85383ccB54769adB3837437e296479": "1",
  "0x76D2403b80591d5F6AF2b468BC14205fa5452AC0": "2",
  "0x34d130B174F4a30A846FED7C02FCF53A19a4c2B6": "3",
  "0xf988Ebf9D801F4D3595592490D7fF029E438deCa": "5",
  "0xA2626bE06C11211A44fb6cA324A67EBDBCd30B70": "4",
  "0xdeB8d8eFeF7049E280Af1d5FE3a380F3BE93B648": "6",
  "0xcf4fbA490197452Bd414E16D563623253eFb57D3": "7",
  "0x33ee14Fb8816c92fe401165330bbE29706942183": "8",
  "0xdF7cdFF0c5e85c974D6377244D9A0CEffA2b7A86": "9",
  "0xaB67557218F60C06acA750B9F8A20018e5604ebf": "10",
  "0x444aE92325dCE5D14d40c30d2657547513674dD6": "11",
  "0x3DbBF2F9AcFB9Aac8E0b31563dd75a2D69148D64": "12",
  "0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821": "13",
  "0xc584bD01fD60F671409661a6802170BbEFba5c47": "14",
  "0xa0c7ADA2c7c29729d12e2649BC6a0a293Ac46725": "15",
  "0xf923431dA74Ecc873C4D641FBDfa2564bAAfCA9F": "S0",
  "0x7a0f40757f6ba868b44ce959a1D4B8bc22C21d59": "S1",
  "0xeAb9C7AC697408fD1581494577C7c0716C3B75E6": "S2",
  "0x89edc4c74810bedbd53d7dA677eB420DC0154B0b": "S3",
  "0xeF72bA6575b86BeaA9B9e4A78BCa4A58F3cCE276": "S4",
  "0xBdaAb68a462db80fB0052947bDADba7A87fcD0fb": "S5",
  "0x956c6B0894923ba448f8bC7bB9706A2B8F60277D": "S6",
  "0xB855afC44095225105329a7416D55d0A780fc39d": "S7",
  "0xC0B55591dE55258021985Aed8DD2af40fbD659C7": "S8"
};
var FOUNDRY_COURSE_ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "FoundryCourseNft__NFTNotMinted",
    type: "error"
  },
  {
    inputs: [],
    name: "FoundryCourseNft__NotChallengeContract",
    type: "error"
  },
  {
    inputs: [],
    name: "FoundryCourseNft__YouAlreadySolvedThis",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "newUri",
        type: "string"
      }
    ],
    name: "BaseTokenImageUriChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "challengeContract",
        type: "address"
      }
    ],
    name: "ChallengeAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldChallenge",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newChallenge",
        type: "address"
      }
    ],
    name: "ChallengeReplaced",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "solver",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "challenge",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "twitterHandle",
        type: "string"
      }
    ],
    name: "ChallengeSolved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "challengeContract",
        type: "address"
      }
    ],
    name: "addChallenge",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newUri",
        type: "string"
      }
    ],
    name: "changeBaseUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256"
      }
    ],
    name: "getChallengeContract",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getChallengeContractFromTokenId",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getChallengeContractFullDescription",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTokenCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "contractAddress",
        type: "address"
      }
    ],
    name: "isChallengeContract",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address"
      },
      {
        internalType: "string",
        name: "twitterHandle",
        type: "string"
      }
    ],
    name: "mintNft",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "challengeIndex",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "newChallenge",
        type: "address"
      }
    ],
    name: "replaceChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];
var SECURITY_COURSE_ABI = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  { inputs: [], name: "CTFRegistry__NFTNotMinted", type: "error" },
  { inputs: [], name: "CTFRegistry__NotChallengeContract", type: "error" },
  { inputs: [], name: "CTFRegistry__YouAlreadySolvedThis", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "address", name: "owner", type: "address" }
    ],
    name: "ERC721IncorrectOwner",
    type: "error"
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "ERC721InsufficientApproval",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "approver", type: "address" }],
    name: "ERC721InvalidApprover",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "operator", type: "address" }],
    name: "ERC721InvalidOperator",
    type: "error"
  },
  { inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "ERC721InvalidOwner", type: "error" },
  {
    inputs: [{ internalType: "address", name: "receiver", type: "address" }],
    name: "ERC721InvalidReceiver",
    type: "error"
  },
  {
    inputs: [{ internalType: "address", name: "sender", type: "address" }],
    name: "ERC721InvalidSender",
    type: "error"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ERC721NonexistentToken",
    type: "error"
  },
  { inputs: [{ internalType: "address", name: "owner", type: "address" }], name: "OwnableInvalidOwner", type: "error" },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "approved", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "owner", type: "address" },
      { indexed: true, internalType: "address", name: "operator", type: "address" },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "ApprovalForAll",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "string", name: "newUri", type: "string" }],
    name: "BaseTokenImageUriChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "challengeContract", type: "address" }],
    name: "ChallengeAdded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "oldChallenge", type: "address" },
      { indexed: false, internalType: "address", name: "newChallenge", type: "address" }
    ],
    name: "ChallengeReplaced",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "address", name: "solver", type: "address" },
      { indexed: false, internalType: "address", name: "challenge", type: "address" },
      { indexed: false, internalType: "string", name: "twitterHandle", type: "string" }
    ],
    name: "ChallengeSolved",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: true, internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [{ internalType: "address", name: "challengeContract", type: "address" }],
    name: "addChallenge",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "string", name: "newUri", type: "string" }],
    name: "changeBaseUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "getChallengeContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getChallengeContractFromTokenId",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getChallengeContractFullDescription",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTokenCounter",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" }
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "contractAddress", type: "address" }],
    name: "isChallengeContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "receiver", type: "address" },
      { internalType: "string", name: "twitterHandle", type: "string" }
    ],
    name: "mintNft",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "challengeIndex", type: "uint256" },
      { internalType: "address", name: "newChallenge", type: "address" }
    ],
    name: "replaceChallenge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "data", type: "bytes" }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// index.ts
var formatTweetMessage = function({ twitterHandle, tokenId, lessonId, courseName }) {
  const contractAddress = courseName === "foundry" ? FOUNDRY_COURSE_ADDRESS : SECURITY_COURSE_ADDRESS;
  const openseaUrl = `https://opensea.io/assets/arbitrum/${contractAddress}/${tokenId}`;
  const courseNameCapitalized = courseName.charAt(0).toUpperCase() + courseName.slice(1);
  const message = `Congrats ${twitterHandle} for minting Lesson ${lessonId} of the ${courseNameCapitalized} course!\n\nYou can view the NFT on Opensea here\n${openseaUrl}`;
  return message;
};
var RPC_PROVIDER_API_KEY = `${process.env.RPC_PROVIDER_API_KEY}`;
var webSocketClient = createPublicClient({
  chain: arbitrum,
  transport: webSocket2(`wss://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});
var publicClient = createPublicClient({
  chain: arbitrum,
  transport: http2(`https://arb-mainnet.g.alchemy.com/v2/${RPC_PROVIDER_API_KEY}`)
});
var sanitizeHandle = (twitterHandleInput) => {
  let handle = twitterHandleInput.replace(/\s/g, "");
  if (handle.startsWith("x.com/"))
    handle = handle.replace("x.com/", "");
  if (handle.startsWith("https://x.com/"))
    handle = handle.replace("https://x.com/", "");
  if (handle.startsWith("twitter.com/"))
    handle = handle.replace("twitter.com/", "");
  if (handle.startsWith("https://twitter.com/"))
    handle = handle.replace("https://twitter.com/", "");
  if (!handle.startsWith("@"))
    handle = "@" + handle;
  if (!/^@[a-zA-Z0-9_]{1,15}$/.test(handle))
    throw new Error("Invalid twitter handle: " + handle);
  return handle;
};
var handleChallengeSolvedEvent = async ({
  twitterHandle,
  challenge,
  transactionHash,
  courseName
}) => {
  const sanitizedHandle = sanitizeHandle(twitterHandle);
  const lessonId = LESSON_DICTIONARY[challenge];
  const tokenId = await getTokenId(transactionHash, courseName);
  if (!twitterHandle) {
    throw new Error("Invalid twitter handle: " + twitterHandle);
  }
  const tweetMessage = formatTweetMessage({ twitterHandle: sanitizedHandle, tokenId, lessonId, courseName });
  console.log(`Sending tweet: ${tweetMessage}`);
  sendTweet(tweetMessage);
};
var getTokenId = async (transactionHash, courseName) => {
  const transactionReceipt2 = await publicClient.getTransactionReceipt({
    hash: transactionHash
  });
  const transferTopics = encodeEventTopics({
    abi: courseName === "foundry" ? FOUNDRY_COURSE_ABI : SECURITY_COURSE_ABI,
    eventName: "Transfer",
    args: {
      from: "0x0000000000000000000000000000000000000000"
    }
  });
  for (let i = 0;i < transactionReceipt2.logs.length; i++) {
    if (transactionReceipt2.logs[i]["topics"][0] !== transferTopics[0] || transactionReceipt2.logs[i]["topics"][1] !== transferTopics[1]) {
      continue;
    }
    const decodedEventLog = decodeEventLog({
      abi: courseName === "foundry" ? FOUNDRY_COURSE_ABI : SECURITY_COURSE_ABI,
      eventName: "Transfer",
      topics: transactionReceipt2.logs[i]["topics"],
      data: transactionReceipt2.logs[i].data
    });
    const tokenId = fromHex(decodedEventLog.args["tokenId"], "number");
    return tokenId;
  }
  throw new Error("Could not get tokenId in event logs for transaction " + transactionHash);
};
var unwatchFoundryContract = webSocketClient.watchContractEvent({
  address: FOUNDRY_COURSE_ADDRESS,
  abi: FOUNDRY_COURSE_ABI,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e);
  },
  onLogs: (logs) => {
    const {
      transactionHash,
      args: { challenge, twitterHandle }
    } = logs[0];
    try {
      handleChallengeSolvedEvent({ twitterHandle, challenge, transactionHash, courseName: "foundry" });
    } catch (e) {
      console.log(e);
    }
  }
});
var unwatchSecurityContract = webSocketClient.watchContractEvent({
  address: SECURITY_COURSE_ADDRESS,
  abi: SECURITY_COURSE_ABI,
  eventName: "ChallengeSolved",
  onError: (e) => {
    console.log(e);
  },
  onLogs: (logs) => {
    const {
      transactionHash,
      args: { challenge, twitterHandle }
    } = logs[0];
    try {
      handleChallengeSolvedEvent({ twitterHandle, challenge, transactionHash, courseName: "security" });
    } catch (e) {
      console.log(e);
    }
  }
});
console.log("Listening for ChallengeSolved events...");
