import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { createContext, useState } from "react";
import * as Yup from "yup";
import rest from "../lib/rest";

const PAGE_SIZE = 5;
const PAGE = 1;

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

const searchSchema = Yup.object().shape({
  searchQuery: Yup.string()
    .min(2, "Search query must be at least 2 characters")
    .required("Please enter a username to search"),
});

type GlobalContextValues = {
  selectedUser?: string;
  setSelectedUser: React.Dispatch<React.SetStateAction<string | undefined>>;
  searchResponse?: GitHubUserSearchResponse;
  isLoading: boolean;
  fetchUsers: () => void;
  handleUserToggle: (username: string) => void;
  formik: ReturnType<typeof useFormik<{ searchQuery: string }>>;
  searchTerm: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalContextValues>({
  setSelectedUser: () => {},
  isLoading: false,
  fetchUsers: () => {},
  handleUserToggle: () => {},
  formik: {} as ReturnType<typeof useFormik<{ searchQuery: string }>>,
  searchTerm: "",
});

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const formik = useFormik<{ searchQuery: string }>({
    initialValues: { searchQuery: "" },
    validationSchema: searchSchema,
    onSubmit: (values) => {
      handleSubmit(values.searchQuery)
        .then(() => fetchUsers())
        .then(() => formik.setSubmitting(false));
    },
  });

  const {
    data: searchResponse,
    isLoading,
    refetch: fetchUsers,
  } = useQuery({
    enabled: false,
    queryKey: ["users", searchTerm],
    queryFn: async (props) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_key, query] = props.queryKey;
      const data = await fetchUsersAsync(query);

      return data;
    },
    refetchOnWindowFocus: false,
  });

  async function handleSubmit(query: string) {
    return new Promise((resolve) => {
      resolve(setSearchTerm(query));
    });
  }

  const handleUserToggle = (username: string) => {
    setSelectedUser(selectedUser === username ? undefined : username);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchResponse,
        isLoading,
        fetchUsers,
        handleUserToggle,
        selectedUser,
        setSelectedUser,
        formik,
        searchTerm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

async function fetchUsersAsync(
  searchQuery: string
): Promise<GitHubUserSearchResponse> {
  const url = `/search/users?per_page=${PAGE_SIZE}&page=${PAGE}&q=${encodeURIComponent(
    searchQuery
  )}`;

  // Filter mock data based on search term
  return rest
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching users:", error);
      throw error;
    });
}

export default GlobalContextProvider;
