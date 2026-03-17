import { setSearch } from "@/redux/slices/searchSlice";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Search = { search: string };

export default function SearchPostsField() {
  const { register, handleSubmit } = useForm<Search>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: Search) => {
    navigate("/search");
    dispatch(setSearch(data.search));
  }


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="ml-6 md:flex hidden search relative items-center justify-center"
    >
      <button type="submit" className="absolute left-4 cursor-pointer">
        <FaSearch className="text-gray-500" />
      </button>
      <input
        {...register("search", {
          required: true,
        })}
        type="text"
        placeholder="Search Facebook"
        className="py-2 pr-6 pl-10 bg-gray-100 rounded-full"
      />
    </form>
  );
}
