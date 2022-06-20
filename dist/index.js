"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = require("readline-sync");
const OPERATION = {
    KEYS: "KEYS",
    MEMBERS: "MEMBERS",
    ADD: "ADD",
    REMOVE: "REMOVE",
    REMOVEALL: "REMOVEALL",
    CLEAR: "CLEAR",
    KEYEXISTS: "KEYEXISTS",
    MEMBEREXISTS: "MEMBEREXISTS",
    ALLMEMBERS: "ALLMEMBERS",
    ITEMS: "ITEMS",
    EXIT: "EXIT"
};
const ERROR = {
    EMPTY_SET: "(empty set)",
    INCORRECT_ARGS: "ERROR, Incorrect number of arguments!",
    KEY_DOES_NOT_EXIST: ") ERROR, key does not exist",
    UN_SUPPORTED: ") ERROR, Unsupported operation; please try again",
    MEMBER_NOT_EXIST: ") ERROR, member does not exist",
    MEMBER_ALREADY_EXIST: ") ERROR, member already exists for key"
};
const SUCCESS = {
    ADDED: "Added",
    REMOVED: ") Removed",
    CLEARED: ") Cleared"
};
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const dictionaryViaMap = new Map();
        const getOperation = (splitInput) => (splitInput === null || splitInput === void 0 ? void 0 : splitInput.length) > 0 ? splitInput[0] : '';
        const getKey = (splitInput) => (splitInput === null || splitInput === void 0 ? void 0 : splitInput.length) > 1 ? splitInput[1] : '';
        const getMember = (splitInput) => (splitInput === null || splitInput === void 0 ? void 0 : splitInput.length) > 2 ? splitInput[2] : '';
        const printMessage = (message) => console.log(message);
        while (true) {
            const input = (0, readline_sync_1.question)('>');
            const splitInput = input.split(" ");
            const inputLength = splitInput.length;
            if (inputLength > 0) {
                switch (getOperation(splitInput)) {
                    case OPERATION.KEYS: {
                        if (inputLength !== 1) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            if (dictionaryViaMap.size === 0) {
                                printMessage(ERROR.EMPTY_SET);
                            }
                            else {
                                let keyNum = 1;
                                for (let key of dictionaryViaMap.keys()) {
                                    printMessage(`${keyNum++}) ${key}`);
                                }
                            }
                        }
                        break;
                    }
                    case OPERATION.MEMBERS: {
                        if (inputLength !== 2) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const key = getKey(splitInput);
                            let memberNum = 1;
                            const members = dictionaryViaMap.get(key);
                            if (members && dictionaryViaMap.has(key)) {
                                for (let member of members) {
                                    printMessage(`${memberNum++}) ${member}`);
                                }
                            }
                            else {
                                printMessage(ERROR.KEY_DOES_NOT_EXIST);
                            }
                        }
                        break;
                    }
                    case OPERATION.ADD: {
                        if (inputLength !== 3) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const key = getKey(splitInput);
                            let values = [];
                            const isKeyExist = dictionaryViaMap.has(key);
                            if (isKeyExist) {
                                const oldValues = dictionaryViaMap.get(key);
                                if (oldValues && (oldValues === null || oldValues === void 0 ? void 0 : oldValues.length) > 0) {
                                    if (oldValues.some((s) => s === getMember(splitInput))) {
                                        values = [...oldValues];
                                        printMessage(ERROR.MEMBER_ALREADY_EXIST);
                                    }
                                    else {
                                        values = [...oldValues, getMember(splitInput)];
                                        printMessage(SUCCESS.ADDED);
                                    }
                                }
                                else {
                                    values = [getMember(splitInput)];
                                    printMessage(SUCCESS.ADDED);
                                }
                            }
                            else {
                                values = [getMember(splitInput)];
                                printMessage(SUCCESS.ADDED);
                            }
                            dictionaryViaMap.set(key, values);
                        }
                        break;
                    }
                    case OPERATION.REMOVE: {
                        if (inputLength !== 3) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const key = getKey(splitInput);
                            const member = getMember(splitInput);
                            if (dictionaryViaMap.has(key)) {
                                const items = dictionaryViaMap.get(key);
                                if (items && (items === null || items === void 0 ? void 0 : items.length) > 0 && items.some((s) => s === member)) {
                                    dictionaryViaMap.set(key, items.filter((s) => s !== member));
                                    const _items = dictionaryViaMap.get(key);
                                    if ((_items === null || _items === void 0 ? void 0 : _items.length) === 0) {
                                        dictionaryViaMap.delete(key);
                                    }
                                    printMessage(SUCCESS.REMOVED);
                                }
                                else {
                                    printMessage(ERROR.MEMBER_NOT_EXIST);
                                }
                            }
                            else {
                                printMessage(ERROR.KEY_DOES_NOT_EXIST);
                            }
                        }
                        break;
                    }
                    case OPERATION.REMOVEALL: {
                        if (inputLength !== 2) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const key = getKey(splitInput);
                            if (dictionaryViaMap.has(key)) {
                                dictionaryViaMap.delete(key);
                                printMessage(SUCCESS.REMOVED);
                            }
                            else {
                                printMessage(ERROR.KEY_DOES_NOT_EXIST);
                            }
                        }
                        break;
                    }
                    case OPERATION.CLEAR: {
                        if (inputLength !== 1) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            dictionaryViaMap.clear();
                            printMessage(SUCCESS.CLEARED);
                        }
                        break;
                    }
                    case OPERATION.KEYEXISTS: {
                        if (inputLength != 2) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const key = getKey(splitInput);
                            printMessage(`) ${dictionaryViaMap.has(key)}`);
                        }
                        break;
                    }
                    case OPERATION.MEMBEREXISTS: {
                        if (inputLength !== 3) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const key = getKey(splitInput);
                            const values = dictionaryViaMap.get(key);
                            const isValuesExist = dictionaryViaMap.has(key) && (values === null || values === void 0 ? void 0 : values.some((s) => s === getMember(splitInput)));
                            console.log(isValuesExist);
                        }
                        break;
                    }
                    case OPERATION.ALLMEMBERS: {
                        if (inputLength !== 1) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const members = dictionaryViaMap.entries();
                            if (dictionaryViaMap.size === 0) {
                                printMessage(ERROR.EMPTY_SET);
                            }
                            else {
                                let num = 1;
                                for (let member of members) {
                                    for (let item of member[1]) {
                                        printMessage(`${num++}) ${item}`);
                                    }
                                }
                            }
                        }
                        break;
                    }
                    case OPERATION.ITEMS: {
                        if (inputLength !== 1) {
                            printMessage(ERROR.INCORRECT_ARGS);
                        }
                        else {
                            const members = dictionaryViaMap.entries();
                            if (dictionaryViaMap.size === 0) {
                                printMessage(ERROR.EMPTY_SET);
                            }
                            else {
                                for (let member of members) {
                                    for (let item of member[1]) {
                                        printMessage(`${member[0]}: ${item}`);
                                    }
                                }
                            }
                        }
                        break;
                    }
                    case OPERATION.EXIT:
                        break;
                    default:
                        printMessage(ERROR.UN_SUPPORTED);
                        break;
                }
            }
        }
    });
}
run().then();
