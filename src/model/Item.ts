import { Validator } from "./Validator";

export type Item = {
      docId: string;
      campaignDocId: string;
      name: string;
      description: string;
      itemImageURl: string;
      itemURL: string;
  }
  
  
  export const validateItem = (item: Item) => {
    let validator: Validator = {};
    if (!item?.name || item?.name.trim() === "") {
      validator.name = "Empty Name"
    }
  
    return validator;
  }
