import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import RepositoryCard from "../RepositoryCard";

// Mock data
const mockRepo: GitHubRepository = {
  id: 123456789,
  node_id: "R_kgDOJ_dummyNodeId",
  name: "dummy-repo-one",
  full_name: "dummyuser/dummy-repo-one",
  private: false,
  owner: {
    login: "dummyuser",
    id: 987654321,
    node_id: "MDQ6VXNlcjlkdW1teVVzZXJJZA==",
    avatar_url: "https://avatars.githubusercontent.com/u/987654321?v=4",
    gravatar_id: "",
    url: "https://api.github.com/users/dummyuser",
    html_url: "https://github.com/dummyuser",
    followers_url: "https://api.github.com/users/dummyuser/followers",
    following_url:
      "https://api.github.com/users/dummyuser/following{/other_user}",
    gists_url: "https://api.github.com/users/dummyuser/gists{/gist_id}",
    starred_url:
      "https://api.github.com/users/dummyuser/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/dummyuser/subscriptions",
    organizations_url: "https://api.github.com/users/dummyuser/orgs",
    repos_url: "https://api.github.com/users/dummyuser/repos",
    events_url: "https://api.github.com/users/dummyuser/events{/privacy}",
    received_events_url:
      "https://api.github.com/users/dummyuser/received_events",
    type: "User",
    user_view_type: "public",
    site_admin: false,
    score: 1.0,
  },
  html_url: "https://github.com/dummyuser/dummy-repo-one",
  description: "A dummy repository for demonstration purposes",
  fork: false,
  url: "https://api.github.com/repos/dummyuser/dummy-repo-one",
  forks_url: "https://api.github.com/repos/dummyuser/dummy-repo-one/forks",
  keys_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/keys{/key_id}",
  collaborators_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/collaborators{/collaborator}",
  teams_url: "https://api.github.com/repos/dummyuser/dummy-repo-one/teams",
  hooks_url: "https://api.github.com/repos/dummyuser/dummy-repo-one/hooks",
  issue_events_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/issues/events{/number}",
  events_url: "https://api.github.com/repos/dummyuser/dummy-repo-one/events",
  assignees_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/assignees{/user}",
  branches_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/branches{/branch}",
  tags_url: "https://api.github.com/repos/dummyuser/dummy-repo-one/tags",
  blobs_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/git/blobs{/sha}",
  git_tags_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/git/tags{/sha}",
  git_refs_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/git/refs{/sha}",
  trees_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/git/trees{/sha}",
  statuses_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/statuses/{sha}",
  languages_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/languages",
  stargazers_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/stargazers",
  contributors_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/contributors",
  subscribers_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/subscribers",
  subscription_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/subscription",
  commits_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/commits{/sha}",
  git_commits_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/git/commits{/sha}",
  comments_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/comments{/number}",
  issue_comment_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/issues/comments{/number}",
  contents_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/contents/{+path}",
  compare_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/compare/{base}...{head}",
  merges_url: "https://api.github.com/repos/dummyuser/dummy-repo-one/merges",
  archive_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/{archive_format}{/ref}",
  downloads_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/downloads",
  issues_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/issues{/number}",
  pulls_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/pulls{/number}",
  milestones_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/milestones{/number}",
  notifications_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/notifications{?since,all,participating}",
  labels_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/labels{/name}",
  releases_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/releases{/id}",
  deployments_url:
    "https://api.github.com/repos/dummyuser/dummy-repo-one/deployments",
  created_at: "2024-01-15T10:00:00Z",
  updated_at: "2024-01-15T10:30:00Z",
  pushed_at: "2024-01-15T11:00:00Z",
  git_url: "git://github.com/dummyuser/dummy-repo-one.git",
  ssh_url: "git@github.com:dummyuser/dummy-repo-one.git",
  clone_url: "https://github.com/dummyuser/dummy-repo-one.git",
  svn_url: "https://github.com/dummyuser/dummy-repo-one",
  homepage: null,
  size: 100,
  stargazers_count: 5,
  watchers_count: 3,
  language: "JavaScript",
  has_issues: true,
  has_projects: true,
  has_downloads: true,
  has_wiki: true,
  has_pages: false,
  has_discussions: false,
  forks_count: 1,
  mirror_url: null,
  archived: false,
  disabled: false,
  open_issues_count: 2,
  license: {
    key: "apache-2.0",
    name: "Apache License 2.0",
    spdx_id: "Apache-2.0",
    url: "https://api.github.com/licenses/apache-2.0",
    node_id: "MDc6TGljZW5zZTI=",
  },
  allow_forking: true,
  is_template: false,
  web_commit_signoff_required: false,
  topics: ["dummy", "example", "json"],
  visibility: "public",
  forks: 1,
  open_issues: 2,
  watchers: 3,
  default_branch: "main",
};

describe("RepositoryCard component", () => {
  it("renders the repository name", () => {
    render(<RepositoryCard repository={mockRepo} />);
    const name = screen.getByText("dummy-repo-one");
    expect(name).toBeInTheDocument();
  });

  it("renders the repository description", () => {
    render(<RepositoryCard repository={mockRepo} />);
    const description = screen.getByText(mockRepo.description as string);
    expect(description).toBeInTheDocument();
  });

  it("renders and formats the star count correctly", () => {
    render(<RepositoryCard repository={mockRepo} />);
    const stars = screen.getByText("5");
    expect(stars).toBeInTheDocument();
  });
});
