import React from "react";
import { GitBranch, Star } from "lucide-react";

interface RepositoryCardProps {
  repository: GitHubRepository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ repository }) => {
  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <h4 className="font-semibold text-gray-900 truncate">
              {repository.name}
            </h4>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {repository.description}
          </p>
        </div>
        <div className="flex items-center gap-1 ml-4 text-sm font-medium text-yellow-500 flex-shrink-0">
          <Star className="w-4 h-4 fill-current" />
          {repository.stargazers_count.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

RepositoryCard.displayName = "RepositoryCard";

export default RepositoryCard;
