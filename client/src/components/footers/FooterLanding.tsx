import { footerSections } from "@/assets/assets";
import Logo from "../logos/Logo";

export function FooterLanding() {
  return (
    <footer className="bg-white">
      <div className="container px-6 pt-12 pb-6">
        <div className="grid md:text-start text-center gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="w-fit md:mx-0 mx-auto">
              <Logo />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Connect with friends and the world around you on Facebook.
            </p>
          </div>

          {/* Link sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-1 text-lg">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-sm text-gray-500 hover:text-blue-600 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 pt-6 text-sm  md:flex-row md:items-center md:justify-between text-gray-500">
          <p>&copy; 2025 Facebook Clone. All rights reserved.</p>
          <p>
            Powered by <span className="font-medium">Ahmad Mayallo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
