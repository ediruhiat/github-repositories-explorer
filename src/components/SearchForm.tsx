import { cva } from "class-variance-authority";
import { Search, X } from "lucide-react";
import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import Button from "./Button";

const inputVariants = cva(
  "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "border-red-500 focus:ring-red-500/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SearchFormProps {}

const SearchForm: React.FC<SearchFormProps> = () => {
  const { isLoading, formik } = useContext(GlobalContext);
  const showClear =
    formik.values.searchQuery && formik.values.searchQuery.length > 0;
  const variant =
    formik.errors?.searchQuery && formik.touched?.searchQuery
      ? "error"
      : "default";

  function handleClear() {
    formik.resetForm();
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-center sm:flex-row gap-3">
        <div className="flex-1 w-full">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={16} />
            </div>

            <input
              {...formik.getFieldProps("searchQuery")}
              type="text"
              placeholder="Enter username to search..."
              className={
                inputVariants({
                  variant,
                }) + " pl-10 pr-10"
              } // padding for icons
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  formik.handleSubmit();
                }
              }}
            />

            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                aria-label="clear-button"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
        <Button
          radius="md"
          type="submit"
          disabled={formik.isSubmitting || isLoading}
          className="sm:w-auto w-full"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      {formik.errors?.searchQuery && formik.touched?.searchQuery && (
        <p className="mt-1 text-sm text-red-600">
          {formik.errors?.searchQuery}
        </p>
      )}
    </form>
  );
};

SearchForm.displayName = "SearchForm";

export default SearchForm;
