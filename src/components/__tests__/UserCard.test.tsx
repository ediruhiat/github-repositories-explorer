// components/__tests__/UserCard.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserCard from "../UserCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

// Mock Avatar and RepositoryCard for isolation
jest.mock("../Avatar", () => ({
  Avatar: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="avatar" />
  ),
}));
jest.mock(
  "../RepositoryCard",
  () =>
    ({ repository }: { repository: GitHubRepository }) =>
      <div data-testid="repository-card">{repository.name}</div>
);

// Mock rest client
jest.mock("../../lib/rest", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
  },
}));

import rest from "../../lib/rest";

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockUser: GitHubUser = {
  login: "superleexpert",
  id: 1480950,
  node_id: "MDQ6VXNlcjE0ODA5NTA=",
  avatar_url: "https://avatars.githubusercontent.com/u/1480950?v=4",
  gravatar_id: "",
  url: "https://api.github.com/users/superleexpert",
  html_url: "https://github.com/superleexpert",
  followers_url: "https://api.github.com/users/superleexpert/followers",
  following_url:
    "https://api.github.com/users/superleexpert/following{/other_user}",
  gists_url: "https://api.github.com/users/superleexpert/gists{/gist_id}",
  starred_url:
    "https://api.github.com/users/superleexpert/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/superleexpert/subscriptions",
  organizations_url: "https://api.github.com/users/superleexpert/orgs",
  repos_url: "https://api.github.com/users/superleexpert/repos",
  events_url: "https://api.github.com/users/superleexpert/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/superleexpert/received_events",
  type: "User",
  user_view_type: "public",
  site_admin: false,
  score: 1.0,
};

const mockRepositories = [
  { name: "repo-1", stargazers_count: 5 },
  { name: "repo-2", stargazers_count: 10 },
];

describe("UserCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user login and avatar", async () => {
    (rest.get as jest.Mock).mockResolvedValue({ data: [] });

    render(
      <UserCard user={mockUser} isExpanded={false} onToggle={jest.fn()} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText("superleexpert")).toBeInTheDocument();
    expect(screen.getByTestId("avatar")).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/1480950?v=4"
    );
  });

  it("calls onToggle when header is clicked", async () => {
    const onToggle = jest.fn();
    (rest.get as jest.Mock).mockResolvedValue({ data: [] });

    render(
      <UserCard user={mockUser} isExpanded={false} onToggle={onToggle} />,
      {
        wrapper: createWrapper(),
      }
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onToggle).toHaveBeenCalled();
  });

  it("displays loading spinners when fetching data", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let resolvePromise: any;
    (rest.get as jest.Mock).mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
    );

    render(
      <UserCard user={mockUser} isExpanded={true} onToggle={jest.fn()} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getAllByTestId("spinner")).toHaveLength(2); // 2 spinners

    resolvePromise({ data: [] });
  });

  it("displays repository list when expanded", async () => {
    (rest.get as jest.Mock).mockResolvedValue({ data: mockRepositories });

    render(
      <UserCard user={mockUser} isExpanded={true} onToggle={jest.fn()} />,
      { wrapper: createWrapper() }
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("repository-card")).toHaveLength(2);
    });

    expect(screen.getByText("repo-1")).toBeInTheDocument();
    expect(screen.getByText("repo-2")).toBeInTheDocument();
  });

  it("shows total stars correctly", async () => {
    (rest.get as jest.Mock).mockResolvedValue({ data: mockRepositories });

    render(
      <UserCard user={mockUser} isExpanded={true} onToggle={jest.fn()} />,
      { wrapper: createWrapper() }
    );

    await screen.findAllByTestId("repository-card");

    expect(screen.getByText(/15\s+total stars/i)).toBeInTheDocument();
  });
});
