import data from "./data.json";

export interface Values {
  [key: string]: {
    [key: string]: string | number | string[];
  };
}
interface IData {
  [key: string]: string | number;
  Alcohol: number;
  "Malic Acid": number;
  Ash: number | string;
  "Alcalinity of ash": number;
  Magnesium: number | string;
  "Total phenols": number | string;
  Flavanoids: number | string;
  "Nonflavanoid phenols": number | string;
  Proanthocyanins: number | string;
  "Color intensity": number | string;
  Hue: number | string;
  "OD280/OD315 of diluted wines": number | string;
  Unknown: number | string;
}

export const getItemClass = (param: string) => {
  let key = "Alcohol" as string;
  
  let obj: { [key: string]: (string | number)[] } = {};
  let values: Values = {};

  for (let item of data as IData[]) {
    const ash = typeof item.Ash === "string" ? parseFloat(item.Ash) : item.Ash;
    const hue = typeof item.Hue === "string" ? parseFloat(item.Hue) : item.Hue;
  //here we are adding Gamma Key value in the Alchol Array items
    const magnesium =
      typeof item.Magnesium === "string"
        ? parseFloat(item.Magnesium)
        : item.Magnesium;

      item["Gamma"] = ((ash * hue) / magnesium).toFixed(2);
//Below code is used to add new key value pair to a obj, where keys will be Alchols Different classes and its values
//is an array which can have all Flavinoids & Gamma Values, depending upon the function we are calling
    if (!obj[`Class ${item?.[key]}`]) {
      obj[`Class ${item?.[key]}`] = [];
    }

    obj?.[`Class ${item?.[key]}`]?.push(item?.[param]);
  }
//
  for (let key in obj) {
    //Here are creating Obj Object, we are looping through it, and creating new keys values pair in Value Object
    //we are creating a objects, having mean, median and mode as keys, and its values will the result of corresponding function
    values[key] = {
      ...values[key],
      [`${param} Mean`]: getMean(obj[key]),
      [`${param} Mode`]: getMode(obj[key]),
      [`${param} Median`]: getMedian(obj[key]),
    };
  }

  return values;
};

const getMean = (arr: (string | number)[]) => {
  if (!arr.length) {
    return "No Mean Found...!";
  }
//sum of all the values of the corresponding values
  let sum = 0;
  for (let item of arr) {
    sum = sum + parseFloat(item.toString());
  }

  return (sum / arr?.length).toFixed(3);
};

const getMode = (arr: (string | number)[]) => {
  const modes: string[] = [];
  //highestOccurance is an object, which will have keys of the item we want to find the max and its corresponding value
  //display the how many times it occur
  const highestOccurrence: { [key: string]: number } = {};

  let maxCount = 0;
  for (let item of arr) {
    const itemAsString = item.toString();
    if (!highestOccurrence[itemAsString]) {
      highestOccurrence[itemAsString] = 1;
    } else {
      highestOccurrence[itemAsString]++;
    }

    if (highestOccurrence[itemAsString] > maxCount) {
      maxCount = highestOccurrence[itemAsString];
    }
  }

  for (let item in highestOccurrence) {
    if (highestOccurrence[item] === maxCount) {
      modes.push(parseFloat(item).toFixed(3));
    }
  }
//if every item occur only 1 time then their will be no Mode
  if (modes.length === Object.keys(highestOccurrence).length) {
    return "No Unique Mode Found...!";
  }

  return modes;
};

const getMedian = (arr: (string | number)[]) => {
  //bubble sort
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (parseFloat(arr[j] as string) > parseFloat(arr[j + 1] as string)) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  const middleIndex = Math.floor(arr.length / 2);
//finding the median
  if (arr.length % 2 === 0) {
    const middleValue1 = parseFloat(arr[middleIndex - 1].toString());
    const middleValue2 = parseFloat(arr[middleIndex].toString());
    return ((middleValue1 + middleValue2) / 2).toFixed(3);
  } else {
    return parseFloat(arr[middleIndex].toString()).toFixed(3);
  }
};
