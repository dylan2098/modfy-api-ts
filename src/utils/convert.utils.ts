import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

export function convertData(payload: any, objectCore: Map<string, any>) {
  if(!payload) return {};

  if(!_.has(payload, 'roleId')) {
    payload.roleId = uuidv4();
  }

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



export function attributes(objectCore: Map<string, any>, columnNeeds: string[]) : string[] {
  let arr: string[] = [];

  for (let i = 0; i < columnNeeds.length; i++) {
    const key = columnNeeds[i];

    if (objectCore.has(key)) {
      const attr = objectCore.get(key);
      arr.push(`${attr.param} as "${key}"`);
    }
  }

  return arr;
}