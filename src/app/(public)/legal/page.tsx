import Link from "next/link";
import { FileText, Shield, Scale, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function LegalPage() {
  const legalPages = [
    {
      title: "Terms of Service",
      description:
        "Read our terms and conditions for using MyBloodDonorPH platform.",
      href: "/legal/terms",
      icon: FileText,
    },
    {
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information.",
      href: "/legal/privacy",
      icon: Lock,
    },
    {
      title: "HIPAA Compliance",
      description:
        "Our commitment to protecting your health information under HIPAA guidelines.",
      href: "/legal/hipaa",
      icon: Shield,
    },
    {
      title: "Data Protection",
      description:
        "Information about our data protection practices and your rights.",
      href: "/legal/data-protection",
      icon: Scale,
    },
  ];

  return (
    <div className="min-h-screen bg-secondary-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary-900 mb-4">
            Legal Information
          </h1>
          <p className="text-secondary-600 max-w-2xl mx-auto">
            Important legal documents and policies governing the use of
            MyBloodDonorPH.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {legalPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card className="h-full hover:shadow-xl transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <page.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-2">
                      {page.title}
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      {page.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
