import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchResults from "../SearchResult";

// Mock UserCard to isolate SearchResults logic
jest.mock(
  "../UserCard",
  () =>
    ({
      user,
      isExpanded,
      onToggle,
    }: {
      user: GitHubUser;
      isExpanded: boolean;
      onToggle: () => void;
    }) =>
      (
        <div data-testid="user-card" onClick={onToggle}>
          {user.login} {isExpanded && "(Expanded)"}
        </div>
      )
);

const mockData: GitHubUserSearchResponse = {
  total_count: 5313,
  incomplete_results: false,
  items: [
    {
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
      subscriptions_url:
        "https://api.github.com/users/superleexpert/subscriptions",
      organizations_url: "https://api.github.com/users/superleexpert/orgs",
      repos_url: "https://api.github.com/users/superleexpert/repos",
      events_url: "https://api.github.com/users/superleexpert/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/superleexpert/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "DummyKitty",
      id: 40905775,
      node_id: "MDQ6VXNlcjQwOTA1Nzc1",
      avatar_url: "https://avatars.githubusercontent.com/u/40905775?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/DummyKitty",
      html_url: "https://github.com/DummyKitty",
      followers_url: "https://api.github.com/users/DummyKitty/followers",
      following_url:
        "https://api.github.com/users/DummyKitty/following{/other_user}",
      gists_url: "https://api.github.com/users/DummyKitty/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/DummyKitty/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/DummyKitty/subscriptions",
      organizations_url: "https://api.github.com/users/DummyKitty/orgs",
      repos_url: "https://api.github.com/users/DummyKitty/repos",
      events_url: "https://api.github.com/users/DummyKitty/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/DummyKitty/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "AndroidBlobs",
      id: 54524741,
      node_id: "MDEyOk9yZ2FuaXphdGlvbjU0NTI0NzQx",
      avatar_url: "https://avatars.githubusercontent.com/u/54524741?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/AndroidBlobs",
      html_url: "https://github.com/AndroidBlobs",
      followers_url: "https://api.github.com/users/AndroidBlobs/followers",
      following_url:
        "https://api.github.com/users/AndroidBlobs/following{/other_user}",
      gists_url: "https://api.github.com/users/AndroidBlobs/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/AndroidBlobs/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/AndroidBlobs/subscriptions",
      organizations_url: "https://api.github.com/users/AndroidBlobs/orgs",
      repos_url: "https://api.github.com/users/AndroidBlobs/repos",
      events_url: "https://api.github.com/users/AndroidBlobs/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/AndroidBlobs/received_events",
      type: "Organization",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "emilyfreeman",
      id: 12585856,
      node_id: "MDQ6VXNlcjEyNTg1ODU2",
      avatar_url: "https://avatars.githubusercontent.com/u/12585856?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/emilyfreeman",
      html_url: "https://github.com/emilyfreeman",
      followers_url: "https://api.github.com/users/emilyfreeman/followers",
      following_url:
        "https://api.github.com/users/emilyfreeman/following{/other_user}",
      gists_url: "https://api.github.com/users/emilyfreeman/gists{/gist_id}",
      starred_url:
        "https://api.github.com/users/emilyfreeman/starred{/owner}{/repo}",
      subscriptions_url:
        "https://api.github.com/users/emilyfreeman/subscriptions",
      organizations_url: "https://api.github.com/users/emilyfreeman/orgs",
      repos_url: "https://api.github.com/users/emilyfreeman/repos",
      events_url: "https://api.github.com/users/emilyfreeman/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/emilyfreeman/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
    {
      login: "dumtux",
      id: 58913889,
      node_id: "MDQ6VXNlcjU4OTEzODg5",
      avatar_url: "https://avatars.githubusercontent.com/u/58913889?v=4",
      gravatar_id: "",
      url: "https://api.github.com/users/dumtux",
      html_url: "https://github.com/dumtux",
      followers_url: "https://api.github.com/users/dumtux/followers",
      following_url:
        "https://api.github.com/users/dumtux/following{/other_user}",
      gists_url: "https://api.github.com/users/dumtux/gists{/gist_id}",
      starred_url: "https://api.github.com/users/dumtux/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/dumtux/subscriptions",
      organizations_url: "https://api.github.com/users/dumtux/orgs",
      repos_url: "https://api.github.com/users/dumtux/repos",
      events_url: "https://api.github.com/users/dumtux/events{/privacy}",
      received_events_url:
        "https://api.github.com/users/dumtux/received_events",
      type: "User",
      user_view_type: "public",
      site_admin: false,
      score: 1.0,
    },
  ],
};

describe("SearchResults", () => {
  it("renders nothing if data is undefined", () => {
    const { container } = render(
      <SearchResults
        searchTerm="dummy"
        data={undefined}
        onUserToggle={() => {}}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("displays header and total user count", () => {
    render(
      <SearchResults searchTerm="dummy" data={mockData} onUserToggle={() => {}} />
    );
    expect(screen.getByText('Search Results for "dummy"')).toBeInTheDocument();
    expect(screen.getByText("Showing 5 of 5,313 users found")).toBeInTheDocument();
  });

  it("renders UserCard components", () => {
    render(
      <SearchResults searchTerm="dummy" data={mockData} onUserToggle={() => {}} />
    );
    const cards = screen.getAllByTestId("user-card");
    expect(cards).toHaveLength(5);
    expect(cards[0]).toHaveTextContent("superleexpert");
    expect(cards[1]).toHaveTextContent("DummyKitty");
  });

  it("calls onUserToggle with username on click", () => {
    const onUserToggle = jest.fn();
    render(
      <SearchResults
        searchTerm="dummy"
        data={mockData}
        onUserToggle={onUserToggle}
      />
    );

    const firstCard = screen.getByText("superleexpert");
    fireEvent.click(firstCard);
    expect(onUserToggle).toHaveBeenCalledWith("superleexpert");
  });

  it("displays empty state when no users found", () => {
    render(
      <SearchResults
        searchTerm="dummy"
        data={{
          total_count: 0,
          incomplete_results: false,
          items: [],
        }}
        onUserToggle={() => {}}
      />
    );
    expect(
      screen.getByText("No users found matching your search.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Try a different search query.")
    ).toBeInTheDocument();
  });

  it("highlights the expanded user", () => {
    render(
      <SearchResults
        searchTerm="dummy"
        data={mockData}
        selectedUser="superleexpert"
        onUserToggle={() => {}}
      />
    );
    expect(screen.getByText("superleexpert (Expanded)")).toBeInTheDocument();
  });
});
