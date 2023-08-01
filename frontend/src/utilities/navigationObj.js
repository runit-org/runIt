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
    {
      title: "History",
      href: user ? `/profile/history?user=${user.username}` : "",
    },
    {
      title: "Feedback & Support",
      href: user ? `/profile/feedback-support?user=${user.username}` : "",
    },
  ];

  return { profileNav };
};
