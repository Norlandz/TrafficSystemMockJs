                                                                                                                                                         
function JsonReplacer(key: string, value: any) {
  if (value instanceof Set) {
    return {
      dataType: 'Set',
      value: Array.from(value),                                     
    };
  } else if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),                                     
    };
  } else {
    return value;
  }
}

export { JsonReplacer };
