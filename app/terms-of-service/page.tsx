import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Terms of Service | Pro Vehicle Inspections",
  description: "The terms and conditions for using the Pro Vehicle Inspections website and services.",
  alternates: { canonical: "/terms-of-service" },
  // Still linked from every page, but kept out of search results so Google's sitelinks show the services.
  robots: { index: false, follow: true },
}

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Welcome to Pro Vehicle Inspections. These Terms of Service ("Terms") govern your use of our website and
              services. By using our website or services, you agree to be bound by these Terms. If you do not agree to
              these Terms, please do not use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Services</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Pro Vehicle Inspections provides the following services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mobile pre-purchase vehicle inspections (Standard and Premium), carried out where the car is for sale</li>
              <li>EV and plug-in hybrid battery health checks, on their own or added to an inspection</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Booking and Payment</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>Inspections are booked and paid for online. Payments are taken securely by Stripe, in GBP (British Pounds Sterling)</li>
              <li>Appointments less than 24 hours away must be agreed with us by WhatsApp before booking</li>
              <li>We will contact you before the appointment to confirm the details</li>
              <li>You are responsible for arranging access to the vehicle with the seller at the booked time</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>What the Inspection Covers</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Our checks are visual and non-invasive: we assess what is visible and accessible on the day, without
              dismantling the vehicle or its mechanical components, so items hidden from view or inspection aren&apos;t
              covered. The report is not a roadworthiness certificate and does not constitute a warranty or guarantee of
              the vehicle&apos;s condition. The final decision to purchase the vehicle, and any negotiation with the seller,
              remains the buyer&apos;s responsibility.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>When using our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate details of the vehicle, its location and the seller</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not use our services for any fraudulent or unlawful purpose</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              To the fullest extent permitted by law, Pro Vehicle Inspections shall not be liable for any indirect,
              incidental, special, or consequential damages arising from your use of our services. Nothing in these
              Terms limits any rights you have as a consumer that cannot be limited by law.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Pro Vehicle
              Inspections and is protected by copyright and other intellectual property laws. You may not reproduce,
              distribute, or use any content without our prior written consent.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting
              to our website. Your continued use of our services after any changes indicates your acceptance of the
              modified Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of England and Wales. Any
              disputes arising from these Terms or your use of our services shall be subject to the exclusive
              jurisdiction of the courts of England and Wales.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>If you have any questions about these Terms of Service, please contact us:</p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Contact form:</strong>{" "}
                <a href="/contact" className="text-primary hover:underline">
                  our Contact Us page
                </a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href="https://wa.me/441992245660"
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us
                </a>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: October 2026</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
