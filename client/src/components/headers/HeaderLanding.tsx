import Logo from "../logos/Logo";

export default function HeaderLanding() {
  return (
    <header className="header-landing fixed bg-white/65 backdrop-blur-sm h-fit z-[9999] inset-0 py-4 shadow-md">
      <div className="container center-y justify-between">
        <Logo />

        <div className="button-group flex gap-x-4">
          <a
            href="/login"
            className="main-button text-sm hover:bg-gray-100 duration-200"
          >
            Login
          </a>
          <a
            href="/signup"
            className="main-button shadow-lg text-sm bg-blue-700 text-white duration-200 hover:bg-blue-800"
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  );
}
