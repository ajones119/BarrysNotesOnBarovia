export class Item {
    constructor(
      docId,
      campaignDocId = "",
      name,
      description = "",
      itemImageURl = "",
      itemURL = ""

    ) {
      this = {
        docId,
        campaignDocId,
        name,
        description,
        itemImageURl,
        itemURL
      }
    }
  }
  
  
  export const validateItem = (item) => {
    let validator = {};
    if (!item?.name || item?.name.trim() === "") {
      validator.name = "Empty Name"
    }
  
    return validator;
  }