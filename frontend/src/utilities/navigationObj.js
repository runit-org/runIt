export const NavigationObj = (user) => {
  const profileNav = [
    {
      title: "Profile",
      href: user ? `settings?user=${user.username}` : "",
    },
    {
      title: "Calendar",
      href: user ? `calendar?user=${user.username}` : "",
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
      title: "Starred",
      href: user ? `stars?user=${user.username}` : "",
    },
    {
      title: "Security Settings",
      href: user ? `security?user=${user.username}` : "",
    },
    {
      title: "Feedback & Support",
      href: user ? `feedback-support?user=${user.username}` : "",
    },
  ];

  return { profileNav, profileNavCurrUser };
};
