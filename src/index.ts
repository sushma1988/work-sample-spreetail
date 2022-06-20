import { question } from 'readline-sync';

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

async function run() {
  const dictionaryViaMap = new Map<string, string[]>();

  const getOperation = (splitInput: string[]): string => splitInput?.length > 0 ? splitInput[0] : '';

  const getKey = (splitInput: string[]): string => splitInput?.length > 1 ? splitInput[1] : '';

  const getMember = (splitInput: string[]): string => splitInput?.length > 2 ? splitInput[2] : '';

  const printMessage = (message: string): void => console.log(message);

  while (true) {
    const input = question('>');
    const splitInput: string[] = input.split(" ");
    const inputLength: number = splitInput.length;
    if (inputLength > 0) {
      switch (getOperation(splitInput)) {
        case OPERATION.KEYS: {
          if (inputLength !== 1) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            if (dictionaryViaMap.size === 0) {
              printMessage(ERROR.EMPTY_SET);
            } else {
              let keyNum: number = 1;
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
          } else {
            const key: string = getKey(splitInput);
            let memberNum: number = 1;
            const members = dictionaryViaMap.get(key);
            if (members && dictionaryViaMap.has(key)) {
              for (let member of members) {
                printMessage(`${memberNum++}) ${member}`);
              }
            } else {
              printMessage(ERROR.KEY_DOES_NOT_EXIST);
            }
          }
          break;
        }
        case OPERATION.ADD: {
          if (inputLength !== 3) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            const key: string = getKey(splitInput);
            let values: string[] = [];
            const isKeyExist = dictionaryViaMap.has(key);
            if (isKeyExist) {
              const oldValues = dictionaryViaMap.get(key);
              if (oldValues && oldValues?.length > 0) {
                if (oldValues.some((s: string) => s === getMember(splitInput))) {
                  values = [...oldValues];
                  printMessage(ERROR.MEMBER_ALREADY_EXIST);
                } else {
                  values = [...oldValues, getMember(splitInput)];
                  printMessage(SUCCESS.ADDED);
                }
              } else {
                values = [getMember(splitInput)];
                printMessage(SUCCESS.ADDED);
              }
            } else {
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
          } else {
            const key: string = getKey(splitInput);
            const member: string = getMember(splitInput);
            if (dictionaryViaMap.has(key)) {
              const items = dictionaryViaMap.get(key);
              if (items && items?.length > 0 && items.some((s: string) => s === member)) {
                dictionaryViaMap.set(key, items.filter((s) => s !== member));
                const _items = dictionaryViaMap.get(key);
                if (_items?.length === 0) {
                  dictionaryViaMap.delete(key);
                }
                printMessage(SUCCESS.REMOVED);
              } else {
                printMessage(ERROR.MEMBER_NOT_EXIST);
              }

            } else {
              printMessage(ERROR.KEY_DOES_NOT_EXIST);
            }
          }
          break;
        }
        case OPERATION.REMOVEALL: {
          if (inputLength !== 2) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            const key: string = getKey(splitInput);
            if (dictionaryViaMap.has(key)) {
              dictionaryViaMap.delete(key);
              printMessage(SUCCESS.REMOVED);
            } else {
              printMessage(ERROR.KEY_DOES_NOT_EXIST);
            }
          }
          break;
        }
        case OPERATION.CLEAR: {
          if (inputLength !== 1) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            dictionaryViaMap.clear();
            printMessage(SUCCESS.CLEARED);
          }
          break;
        }
        case OPERATION.KEYEXISTS: {
          if (inputLength != 2) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            const key: string = getKey(splitInput);
            printMessage(`) ${dictionaryViaMap.has(key)}`);
          }
          break;
        }
        case OPERATION.MEMBEREXISTS: {
          if (inputLength !== 3) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            const key: string = getKey(splitInput);
            const values = dictionaryViaMap.get(key);
            const isValuesExist = dictionaryViaMap.has(key) && values?.some((s: string) => s === getMember(splitInput));
            console.log(isValuesExist);
          }
          break;
        }
        case OPERATION.ALLMEMBERS: {
          if (inputLength !== 1) {
            printMessage(ERROR.INCORRECT_ARGS);
          } else {
            const members = dictionaryViaMap.entries();
            if (dictionaryViaMap.size === 0) {
              printMessage(ERROR.EMPTY_SET);
            } else {
              let num: number = 1;
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
          } else {
            const members = dictionaryViaMap.entries();
            if (dictionaryViaMap.size === 0) {
              printMessage(ERROR.EMPTY_SET);
            } else {
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
}

run().then();

