import {
  CALENDAR,
  RUNIT_ABOUT,
  RUNIT_CHANGELOG,
  RUNIT_SUPPORT,
  SECURITY,
  SETTINGS,
  STARS,
  SUPPORT,
} from "../routes/routes";

export const NavigationObj = (user) => {
  const profileNav = [
    {
      title: "Profile",
      href: user ? `${SETTINGS}?user=${user.username}` : "",
    },
    {
      title: "Calendar",
      href: user ? `${CALENDAR}?user=${user.username}` : "",
    },
  ];

  const profileNavCurrUser = [
    {
      title: "Profile",
      href: user ? `${SETTINGS}?user=${user.username}` : "",
    },
    {
      title: "Calendar",
      href: user ? `${CALENDAR}?user=${user.username}` : "",
    },
    {
      title: "Starred",
      href: user ? `${STARS}?user=${user.username}` : "",
    },
    {
      title: "Security Settings",
      href: user ? `${SECURITY}?user=${user.username}` : "",
    },
    {
      title: "Feedback & Support",
      href: user ? `${SUPPORT}?user=${user.username}` : "",
    },
  ];

  const footerLinks = [
    {
      title: "Support",
      href: RUNIT_SUPPORT,
    },
    {
      title: "About",
      href: RUNIT_ABOUT,
    },
    {
      title: "Changelog",
      href: RUNIT_CHANGELOG,
    },
  ];
  return { profileNav, profileNavCurrUser, footerLinks };
};
