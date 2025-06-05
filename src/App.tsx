import { useContext } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResult";
import { GlobalContext } from "./contexts/GlobalContext";

export default function App() {
  const {
    searchResponse,
    isLoading,
    handleUserToggle,
    selectedUser,
    searchTerm,
  } = useContext(GlobalContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Search Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg/5 border border-gray-200">
            <SearchForm />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Searching users...
              </div>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && (
            <SearchResults
              searchTerm={searchTerm}
              data={searchResponse}
              selectedUser={selectedUser}
              onUserToggle={handleUserToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
