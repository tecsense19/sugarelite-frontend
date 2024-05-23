"use server"

import { get_language_action } from "./actions";

let allStrings;

export const getAllStrings = async () => {
  if (allStrings) {
    console.log("Got All strings data");
    return allStrings;
  } else {
    console.log("All strings API called");
    let tempData = await get_language_action();
    if (tempData?.success) {
      const transformedData = tempData.data;

      for (const key in tempData.data) {
        transformedData[key] = tempData.data[key].danish_string;
      }
      tempData.data = transformedData;
      allStrings = tempData;
    }
    return tempData
  }
}