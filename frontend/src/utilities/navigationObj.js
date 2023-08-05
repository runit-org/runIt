export const NavigationObj = (user) => {
  const profileNav = [
    {
      title: "Calendar",
      href: user ? `/profile/calendar?user=${user.username}` : "",
    },
    {
      title: "Settings",
      href: user ? `/profile/settings?user=${user.username}` : "",
    },
  ];

  const profileNavCurrUser = [
    {
      title: "Calendar",
      id: "calendar",
      href: user ? `calendar?user=${user.username}` : "",
    },
    {
      title: "Settings",
      id: "settings",
      href: user ? `settings?user=${user.username}` : "",
    },
    {
      title: "History",
      id: "history",
      href: user ? `history?user=${user.username}` : "",
    },
    /*   {
      title: "Feedback & Support",
      href: user ? `/profile/feedback-support?user=${user.username}` : "",
    }, */
  ];

  return { profileNav, profileNavCurrUser };
};
