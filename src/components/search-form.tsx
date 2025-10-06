import Form from "next/form";
import { CiSearch } from "react-icons/ci";

const SearchForm = () => {
    return (
        <Form action="/search">
            <div
                className="flex gap-2 relative items-center justify-between bg-white px-[8px] py-[.4rem] md:px-4  rounded-lg text-gray-700 border-[1px] border-gray-300 
                
                
                lg:w-[90%] lg:m-auto"
            >
                <input className="bg-transparent text-[.9rem] lg:text-[1rem] w-[200px] md:w-[300px]
          lg:w-[500px]" type="text" name="query" placeholder="search products" />

                <button type="submit" className="absolute right-2 md:inset-0 md:relative">
                    <CiSearch size={20} className="font-bold" />
                </button>
            </div>
        </Form>
    );
}

export default SearchForm;