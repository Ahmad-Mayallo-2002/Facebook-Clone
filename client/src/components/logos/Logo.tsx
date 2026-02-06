import logo from "@/assets/facebook.png";

export default function Logo() {
  return (
    <a href="/" className="w-fit logo center-y gap-x-2">
      <img src={logo} alt="Facebook Logo" className="object-cover w-10" />
      <span className="font-bold sm:text-2xl text-blue-600">Facebook</span>
    </a>
  );
}
