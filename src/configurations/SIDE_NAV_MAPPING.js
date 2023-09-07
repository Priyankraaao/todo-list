import {
    FaChartArea,
    FaFolder,
    FaHeart,
    FaHome,
    FaRegCalendar,
  } from "react-icons/fa";

const navigationItems = [
    {
      label: "Overview",
      href: `overview`,
      key: "overview",
      icon: FaHome,
    },
    {
      label: "Stats",
      href: `stats`,
      key: "stats",
      icon: FaChartArea,
    },
    {
      label: "Projects",
      href: `projects`,
      key: "projects",
      icon: FaFolder,
    },
    {
      label: "Chat",
      href: `chats`,
      key: "chat",
      icon: FaHeart,
    },
    {
      label: "calendar",
      href: `calendar`,
      key: "calendar",
      icon: FaRegCalendar,
    },
  ];

  export default navigationItems;