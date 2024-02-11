"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormStatus } from "react-dom";

type Inputs = {
  name: string;
  category: string;
};

import handleFormAction from "../serveractions/product.action";
import SubmitButton from "../button/SubmitButton";
import { useState } from "react";

const ProductForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  let { pending } = useFormStatus();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setLoading(true);
    let res: any = await handleFormAction(data);
    console.log(res);
    if (!res) {
      toast.error(`server not responding`);
      setLoading(false);
    }
    if (res?.status === "error") {
      toast.error(`${res?.message}`);
      setLoading(false);
      return;
    }
    toast.success(`${res?.message}`);
    setLoading(false);
  };

  console.log(errors);

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto my-auto">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
        className="py-7"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div>
            <label htmlFor="product name">Product Name</label>
          </div>
          <input
            id={"productName"}
            type="text"
            placeholder="product name"
            className="input input-bordered input-primary w-full max-w-xs  "
            {...register("name", {
              required: {
                value: true,
                message: "name is required",
              },
            })}
          />
          <p className="text-error">{errors?.name?.message}</p>
        </div>
        <div>
          <div>
            <label htmlFor="ctegory">Catrgory</label>
          </div>
          <input
            id={"category"}
            type="text"
            placeholder="category name"
            className="input input-bordered input-primary w-full max-w-xs "
            {...register("category", {
              required: {
                value: true,
                message: "category is required",
              },
            })}
          />
          <p className="text-error">{errors?.category?.message}</p>
        </div>
        <div>
          <SubmitButton pending={loading} />
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default ProductForm;
