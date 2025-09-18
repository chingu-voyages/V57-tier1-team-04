import PROverviewCard from "./PrCard";

const mockPRs = [
  {
    id: 1,
    number: 101,
    title: "Add login flow",
    body: "Implemented login with JWT",
    state: "open",
    html_url: "#",
    user: { login: "Abdullah", avatar_url: "https://i.pravatar.cc/40?img=5" },
    comments: 3,
    timeAgo: "2h ago",
    updated_at: "2025-09-15T12:00:00Z",
  },
  {
    id: 2,
    number: 102,
    title: "Fix dashboard layout",
    body: "Responsive grid fixes",
    state: "merged",
    html_url: "#",
    user: { login: "Sarah", avatar_url: "https://i.pravatar.cc/40?img=6" },
    comments: 1,
    timeAgo: "5h ago",
    updated_at: "2025-09-14T18:00:00Z",
  },
  {
    id: 3,
    number: 103,
    title: "Update README",
    body: "Added installation instructions",
    state: "closed",
    html_url: "#",
    user: { login: "John", avatar_url: "https://i.pravatar.cc/40?img=7" },
    comments: 0,
    timeAgo: "1d ago",
    updated_at: "2025-09-13T15:30:00Z",
  },
  {
    id: 4,
    number: 104,
    title: "Add logout button",
    body: "Added logout button with confirmation",
    state: "open",
    html_url: "#",
    user: { login: "Emma", avatar_url: "https://i.pravatar.cc/40?img=8" },
    comments: 2,
    timeAgo: "3h ago",
    updated_at: "2025-09-15T10:00:00Z",
  },
  {
    id: 5,
    number: 105,
    title: "Refactor API calls",
    body: "Used Axios instead of fetch",
    state: "merged",
    html_url: "#",
    user: { login: "Mike", avatar_url: "https://i.pravatar.cc/40?img=9" },
    comments: 4,
    timeAgo: "2d ago",
    updated_at: "2025-09-12T14:00:00Z",
  },
];

const PrList = ({ prList, filterState = "all"}) => {
    const list= prList? prList: mockPRs
  const filteredPRs =
    filterState === "all"
      ? list
      : list.filter((pr) => pr.state === filterState);

  const sortedPRs = filteredPRs
    .sort((a, b) => {
      const stateOrder = { open: 0, merged: 1, closed: 2 };
      if (stateOrder[a.state] !== stateOrder[b.state]) {
        return stateOrder[a.state] - stateOrder[b.state];
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    })
    .slice(0, 2); 

  return (
    <div className="p-6">
      <div className="grid grid-cols-1  gap-4"> 
         {sortedPRs.map((pr) => ( 
             <PROverviewCard key={pr.id} pr={pr} /> 
          ))} 
      </div>
    </div>
  );
};

export default PrList;