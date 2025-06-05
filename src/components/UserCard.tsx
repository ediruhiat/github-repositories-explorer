import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useMemo } from "react";
import rest from "../lib/rest";
import { Avatar } from "./Avatar";
import RepositoryCard from "./RepositoryCard";

interface UserCardProps {
  user: GitHubUser;
  isExpanded: boolean;
  onToggle: () => void;
}

const Spinner: React.FC = () => (
  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-zinc-400" data-testid="spinner"></div>
);

const UserCard: React.FC<UserCardProps> = ({ user, isExpanded, onToggle }) => {
  const { data: repositories, isLoading } = useQuery({
    queryKey: ["repositories", user.login],
    queryFn: () => fetchRepositoriesAsync(user.login),
    refetchOnWindowFocus: false,
  });
  const totalStars = useMemo(
    () => (repositories ? _.sumBy(repositories, "stargazers_count") : 0),
    [repositories]
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg/5 hover:shadow-md/5 transition-all">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-gray-50 rounded-t-lg transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={user.avatar_url} alt={user.login} size="md" border />
            <div>
              <h3 className="font-semibold text-gray-900">{user.login}</h3>
              <div className="text-sm text-gray-500">
                <div className="flex gap-2 items-center">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <span>{repositories?.length}</span>
                  )}
                  {repositories?.length === 1 ? "repository" : "repositories"} •{" "}
                  {isLoading ? <Spinner /> : totalStars.toLocaleString()} total
                  stars
                </div>
              </div>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
          <h4 className="font-medium text-gray-900 mt-4">Repositories</h4>
          {repositories?.map((repo, index) => (
            <RepositoryCard
              key={`${user.login}-${repo.name}-${index}`}
              repository={repo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

async function fetchRepositoriesAsync(
  username: string
): Promise<GitHubRepository[]> {
  const url = `/users/${username}/repos?sort=stars&order=desc&page=1&per_page=100`;

  return rest
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      console.error(`Failed to fetch repositories for ${username}:`, error);
      throw error;
    });
}

UserCard.displayName = "UserCard";

export default UserCard;
