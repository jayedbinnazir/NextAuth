import { useFormStatus } from "react-dom";

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <>
      <button type="submit" className="btn btn-accent  w-64 rounded-full">
        {pending ? "...creating" : "create"}
      </button>
    </>
  );
};

export default SubmitButton;
