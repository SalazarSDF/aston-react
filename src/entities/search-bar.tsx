import { useForm, SubmitHandler } from "react-hook-form";
import "./search-bar.css";

type Inputs = {
  searchInput: string;
};

export default function SearchBar() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  //const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const searchValue = watch("searchInput");

  return (
    <>
      <input
        className="search-bar"
        type="text"
        placeholder="Tipe your favorite food"
        {...register("searchInput", {
          required: true,
          minLength: { value: 3, message: "Min length is 3" },
        })}
      />
      <p>{errors.searchInput?.message}</p>
      <p>Search: {searchValue}</p>
    </>
  );
}
