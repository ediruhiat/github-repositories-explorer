// components/__tests__/SearchForm.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../SearchForm";
import { GlobalContext } from "../../contexts/GlobalContext";
import "@testing-library/jest-dom";

const baseMockFormik = {
  initialValues: { searchQuery: "" },
  initialErrors: {},
  initialTouched: {},
  initialStatus: undefined,
  values: { searchQuery: "" },
  errors: {},
  touched: {},
  status: undefined,
  isSubmitting: false,
  isValidating: false,
  submitCount: 0,
  dirty: false,
  isValid: true,
  handleBlur: jest.fn(),
  handleChange: jest.fn(),
  handleReset: jest.fn(),
  handleSubmit: jest.fn(),
  setFieldTouched: jest.fn(),

  setValues: jest.fn(),
  resetForm: jest.fn(),
  validateForm: jest.fn(),
  validateField: jest.fn(),
  getFieldProps: jest.fn(() => ({
    name: "searchQuery",
    value: "",
    onChange: jest.fn(),
    onBlur: jest.fn(),
  })),
  getFieldMeta: jest.fn(),
  getFieldHelpers: jest.fn(),
  submitForm: jest.fn(),
  setSubmitting: jest.fn(),
  setFormikState: jest.fn(),
  registerField: jest.fn(),
  unregisterField: jest.fn(),
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: false,
  setErrors: jest.fn(),
  setFieldValue: jest.fn(),
  setFieldError: jest.fn(),
  setStatus: jest.fn(),
  setTouched: jest.fn(),
};

const setSelectedUser = () => {};
const fetchUsers = () => {};
const handleUserToggle = () => {};
const searchTerm = "";

const renderSearchForm = (overrideFormik = {}) => {
  const formik = { ...baseMockFormik, ...overrideFormik };
  return render(
    <GlobalContext.Provider
      value={{
        isLoading: false,
        formik,
        fetchUsers,
        handleUserToggle,
        setSelectedUser: setSelectedUser,
        searchTerm,
      }}
    >
      <SearchForm />
    </GlobalContext.Provider>
  );
};

describe("SearchForm", () => {
  it("renders input and button", () => {
    renderSearchForm();
    expect(
      screen.getByPlaceholderText("Enter username to search...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("displays 'Searching...' when loading", () => {
    const formik = { ...baseMockFormik };

    render(
      <GlobalContext.Provider
        value={{
          isLoading: true,
          formik,
          fetchUsers,
          handleUserToggle,
          setSelectedUser: setSelectedUser,
          searchTerm,
        }}
      >
        <SearchForm />
      </GlobalContext.Provider>
    );
    expect(screen.getByRole("button")).toHaveTextContent("Searching...");
  });

  it("shows clear button when input has value", () => {
    renderSearchForm({
      values: { searchQuery: "john" },
      getFieldProps: jest.fn(() => ({
        name: "searchQuery",
        value: "john",
        onChange: jest.fn(),
        onBlur: jest.fn(),
      })),
    });
    expect(
      screen.getByRole("button", { name: "clear-button" })
    ).toBeInTheDocument();
  });

  it("calls resetForm when clear button is clicked", () => {
    const resetForm = jest.fn();
    renderSearchForm({
      values: { searchQuery: "john" },
      resetForm,
      getFieldProps: jest.fn(() => ({
        name: "searchQuery",
        value: "john",
        onChange: jest.fn(),
        onBlur: jest.fn(),
      })),
    });
    const clearButton = screen.getByRole("button", { name: "clear-button" });
    fireEvent.click(clearButton);
    expect(resetForm).toHaveBeenCalled();
  });

  it("prevents default submit on Enter and calls formik.handleSubmit", () => {
    const handleSubmit = jest.fn();
    const { getByPlaceholderText } = renderSearchForm({
      handleSubmit,
    });

    const input = getByPlaceholderText("Enter username to search...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(handleSubmit).toHaveBeenCalled();
  });

  it("displays error message when formik has error and touched field", () => {
    renderSearchForm({
      errors: { searchQuery: "This field is required" },
      touched: { searchQuery: true },
    });

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
