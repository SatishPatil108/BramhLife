import { useSelector } from "react-redux";

export function useHeader() {
  // Safe access: use optional chaining and default to null
  const user = useSelector((state) => state.auth?.user || null);
  // console.log(user);

  const links = [
    { to: "/home", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  if (!user) {
    // links.push({ to: "/my-courses", label: "My Courses" }),
    links.push({ to: "/login", label: "Login" });
    links.push({ to: "/register", label: "Create an account" });
  } else {
    links.splice(2, 0, { to: "/my-courses", label: "My Courses" });
    links.push({ to: "/logout", label: "Logout" });
  }

  return { links, user };
}
