import ProductForm from "@/app/components/clientcomponents/ProductForm";
import { ProductModel } from "@/app/mongodb/models/product.model";
import mongoconnect from "@/app/mongodb/mongoconnect";

const CreateProduct = async () => {
  await mongoconnect();

  let products = await ProductModel.find();

  return (
    <div>
      <ProductForm />

      {products.map((product: { name: string; category: string }, i) => {
        return (
          <div
            key={i}
            className="mx-auto flex border-2 rounded hover:ring-2  w-3/6 p-2 mt-2 bg-fuchsia-300 justify-between "
          >
            <div>{product?.name}</div>
            <div>{product?.category}</div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateProduct;
