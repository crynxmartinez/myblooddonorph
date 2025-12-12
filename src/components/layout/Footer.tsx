import Link from "next/link";
import { Droplet, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Droplet className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold">MyBloodDonorPH</span>
            </div>
            <p className="text-secondary-300 max-w-md">
              Connecting blood donors with those in need across the Philippines.
              Every donation saves lives. Join our community of heroes today.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/donors"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Find Donors
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Become a Donor
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/legal/privacy"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/hipaa"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  HIPAA Compliance
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/data-protection"
                  className="text-secondary-300 hover:text-white transition-colors"
                >
                  Data Protection
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-400 text-sm">
            © {new Date().getFullYear()} MyBloodDonorPH. All rights reserved.
          </p>
          <p className="text-secondary-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary-500" /> in the
            Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
