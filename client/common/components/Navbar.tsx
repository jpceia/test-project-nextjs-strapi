import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <Link href="/available-courses">Available Courses</Link>
      <Link href="/my-courses">My Courses</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/logout">Logout</Link>
    </div>
  );
}

export default Navbar;
