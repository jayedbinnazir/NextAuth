import React from "react";
import mongoconnect from "../mongodb/mongoconnect";
import { ProductModel } from "../mongodb/models/product.model";

const Product = () => {
  const handleFormAction = async () => {
    "use server";
    console.log("server action is activated");
    mongoconnect().catch((err) => {
      console.log("error connecting database");
    });

    let products = ProductModel.find();
    products
      .then((products: {}) => {
        console.log("all products", products);
      })
      .catch((err: any) => {
        console.log("there is a problem fetching products", err.message);
      });
  };

  return (
    <div>
      <form>
        <button
          formAction={handleFormAction}
          className="btn btn-accent  w-64 rounded-full"
        >
          Server Action
        </button>
      </form>
    </div>
  );
};

export default Product;
