"use server";

import mongoconnect from "../../mongodb/mongoconnect";
import { ProductModel } from "../../mongodb/models/product.model";
import { revalidatePath } from "next/cache";

const handleFormAction = async (formData: any) => {
  let result;

  console.log("creation server action is activated");
  mongoconnect().catch((err) => {
    console.log("error connecting database");
  });

  console.log("formdata->", formData);
  let doc = await new ProductModel(formData);
  await doc
    .save()
    .then((data: { name: string; category: string }) => {
      console.log(`${data} saved succressfully`);
      result = { status: "ok", message: "data saved successfull" };
    })
    .catch((err: any) => {
      console.log("there was an error in saving data", err.message);
      result = { status: "error", message: err.message };
    });

  revalidatePath("/product/create");
  if (result !== undefined) {
    return result;
  }
};

export default handleFormAction;
