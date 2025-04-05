import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    PieChartIcon,
    Send,
    Settings2,
    SquareTerminal,
  } from "lucide-react";

  // TODO: add user details. avatar??

const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
        isActive: true,
      },
    ],
    navAnalytics: [
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Reports",
        url: "/dashboard/reports",
        icon: PieChartIcon,
        items: [
          {
            title: "Daily",
            url: "/dashboard/reports/daily",
          },
          {
            title: "Weekly",
            url: "/dashboard/reports/weekly",
          },
          {
            title: "Monthly",
            url: "/dashboard/reports/monthly",
          },
        ],
      },
  ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "TestiProjekti",
        url: "#",
        icon: Frame,
      },
      {
        name: "Knowit Oy",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  export { data };