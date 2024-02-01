/**
 * Converts the given object into a new object based on the provided list of properties.
 * @param obj - The object to be converted.
 * @param list - The list of properties to include in the converted object.
 * @param type - The type of conversion ('create' by default).
 * @returns The converted object.
 */
export function convertData(payload: any, objectCore: Map<string, any>) {
  if(!payload) {
    return {};
  }

  console.log(objectCore);

  const data = {};

  const payloadMap = new Map(Object.entries(payload));

  for(let key of payloadMap.keys()) {
    if(objectCore.has(key)) {
      const attr = objectCore.get(key);
      data[attr.param] = payloadMap.get(key);
    }
  }

  return data;
}



export function convertAttributeDisplay(list: any, needs: string[]) : string {

  for(var i = 0; i < list.length; i++) {
    const item = list[i];
  }

  return ''

  // const data = {};
  // for(var i = 0; i < list.length; i++) {
  //   const item = list[i];
  // }
}