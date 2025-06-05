import { User } from "lucide-react";
import UserCard from "./UserCard";
import React from "react";

interface SearchResultsProps {
  searchTerm: string;
  data?: GitHubUserSearchResponse;
  selectedUser?: string;
  onUserToggle: (username: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchTerm,
  data,
  selectedUser,
  onUserToggle,
}) => {
  const users = data?.items ?? [];

  if (!data) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Search Results for "{searchTerm}"
        </h2>
        <span className="text-sm text-gray-500">
          Showing {data?.items?.length} of {data?.total_count?.toLocaleString()}{" "}
          {data?.total_count === 1 ? "user" : "users"} found
        </span>
      </div>

      {data?.total_count === 0 ? (
        <div className="text-center py-8">
          <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No users found matching your search.</p>
          <p className="text-sm text-gray-400 mt-1">
            Try a different search query.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <UserCard
              key={user.login}
              user={user}
              isExpanded={selectedUser === user.login}
              onToggle={() => onUserToggle(user.login)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

SearchResults.displayName = "SearchResults";

export default SearchResults;
