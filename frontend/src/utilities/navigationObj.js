export const NavigationObj = (user) => {
  const profileNav = [
    {
      title: "Calendar",
      href: user ? `calendar?user=${user.username}` : "",
    },
    {
      title: "Profile",
      href: user ? `settings?user=${user.username}` : "",
    },
  ];

  const profileNavCurrUser = [
    {
      title: "Profile",
      href: user ? `settings?user=${user.username}` : "",
    },
    {
      title: "Calendar",
      href: user ? `calendar?user=${user.username}` : "",
    },
    {
      title: "History",
      href: user ? `history?user=${user.username}` : "",
    },
    /*   {
      title: "Feedback & Support",
      href: user ? `/profile/feedback-support?user=${user.username}` : "",
    }, */
  ];

  return { profileNav, profileNavCurrUser };
};
