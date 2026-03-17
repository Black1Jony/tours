import EnvelopeIcon from "@heroicons/react/24/outline/EnvelopeIcon";
import PhoneIcon from "@heroicons/react/24/outline/PhoneIcon";
import GlobeAltIcon from "@heroicons/react/24/solid/GlobeAltIcon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold tracking-wide opacity-60">Tours-Travel</h2>
      </div>
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <span className="text-sm opacity-80">
                About Us – A brief description of the company and its mission. A lot of text to fill the space.
              </span>
            </li>
            <li>
              <span className="text-sm opacity-80">
                Careers – Stages of team development, vacancies and general information.
              </span>
            </li>
            <li>
              <span className="text-sm opacity-80">
                Privacy Policy – Standard privacy policy that should be here just for appearance.
              </span>
            </li>
            <li>
              <span className="text-xs opacity-60">
                This section is not interactive, just for visual filling of the footer. Long text to demonstrate responsiveness and line wrapping. Extra space and information.
              </span>
            </li>
          </ul>
        </div>

        {/* Support section */}
        <div className="mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <span className="text-sm opacity-80">
                Help Center – Usually there will be a lot of information and frequently asked questions, but now just placeholder text.
              </span>
            </li>
            <li>
              <span className="text-sm opacity-80">
                Contact Us – Again, nothing clickable, just a line for visual effect.
              </span>
            </li>
            <li>
              <span className="text-xs opacity-60">
                Additional notes can be placed here to increase the height of the section and demonstrate responsive behavior.
              </span>
            </li>
          </ul>
        </div>

        {/* Contact section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="flex items-center">
            <PhoneIcon className="mr-2 w-5 h-5" /> +1 1234 5678
          </p>
          <p className="flex items-center mt-2">
            <EnvelopeIcon className="mr-2 w-5 h-5" /> support@example.com
          </p>
          <div className="flex space-x-4 mt-4">
            <span className="hover:text-gray-400 cursor-default">
              <GlobeAltIcon className="w-5 h-5" />
            </span>
            <span className="hover:text-gray-400 cursor-default">
              <GlobeAltIcon className="w-5 h-5" />
            </span>
            <span className="hover:text-gray-400 cursor-default">
              <GlobeAltIcon className="w-5 h-5" />
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer