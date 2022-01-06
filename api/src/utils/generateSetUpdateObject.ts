export const generateSetUpdateObject = (data, nestedObjectKey: string) => {
  const objectToKeyValueArray: string[][] = Object.entries(data);

  const tempObject = {};
  objectToKeyValueArray.forEach(([key, value]) => {
    tempObject[`${nestedObjectKey}.$.${key}`] = value;
  });

  return tempObject;
};
