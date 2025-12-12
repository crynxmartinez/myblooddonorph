import Link from "next/link";
import {
  Droplet,
  Search,
  Shield,
  Users,
  Heart,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const features = [
    {
      icon: Search,
      title: "Find Donors Quickly",
      description:
        "Search for blood donors by blood type and city. Get connected with potential donors in minutes.",
    },
    {
      icon: Shield,
      title: "Privacy Protected",
      description:
        "Your data is secure. We follow strict privacy guidelines and only share information with consent.",
    },
    {
      icon: Users,
      title: "Growing Community",
      description:
        "Join thousands of Filipinos who are ready to help save lives through blood donation.",
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description:
        "Our platform is available around the clock for emergency blood needs.",
    },
  ];

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Save Lives.
              <br />
              <span className="text-primary-200">Donate Blood.</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Connect with blood donors across the Philippines. Whether you need
              blood or want to donate, MyBloodDonorPH makes it easy to find and
              help each other.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/donors">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find a Donor
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Become a Donor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              All Blood Types Welcome
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              We connect donors of all blood types with those in need. Every
              type is valuable and can save lives.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {bloodTypes.map((type) => (
              <div
                key={type}
                className="w-20 h-20 rounded-full bg-primary-50 border-2 border-primary-200 flex items-center justify-center"
              >
                <span className="text-2xl font-bold text-primary-700">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Why Choose MyBloodDonorPH?
            </h2>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              We&apos;re committed to making blood donation accessible, safe,
              and efficient for all Filipinos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-secondary-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Search for Donors
              </h3>
              <p className="text-secondary-600">
                Filter by blood type and city to find compatible donors in your
                area.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Request Contact Info
              </h3>
              <p className="text-secondary-600">
                Fill out a quick form with your details and reason for the
                request.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                Connect & Save Lives
              </h3>
              <p className="text-secondary-600">
                Get the donor&apos;s contact information and coordinate the
                donation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Droplet className="w-16 h-16 mx-auto mb-6 text-primary-200" />
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-primary-100 max-w-2xl mx-auto mb-8">
            Join our community of blood donors today. Your donation could save
            up to 3 lives.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-white text-primary-700 hover:bg-primary-50"
            >
              Register as a Donor
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
