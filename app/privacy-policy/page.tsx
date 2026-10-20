import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy Policy | Pro Vehicle Inspections",
  description: "How Pro Vehicle Inspections collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
  // Still linked from every page, but kept out of search results so Google's sitelinks show the services.
  robots: { index: false, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Pro Vehicle Inspections ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your personal information when you use our website and
              services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address and phone number when you book an
                inspection or send us an enquiry
              </li>
              <li>
                <strong>Vehicle Information:</strong> The registration, where the car is, the seller&apos;s details and
                the advert link for the car you want inspected
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you interact with our website, including IP address,
                browser type, and pages visited
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To arrange and carry out the inspection you booked</li>
              <li>To send you your booking confirmation and inspection report</li>
              <li>To reply to your enquiries</li>
              <li>To improve our services and website functionality</li>
              <li>To comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>


        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Sharing Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Service providers who assist in operating our business, such as Stripe for payments</li>
              <li>Legal authorities when required by law</li>
              <li>Vehicle data providers to verify vehicle information</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>Under data protection law, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cookies</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Cookies are small files stored on your device. When you first visit, a banner asks whether you agree to
              analytics and advertising cookies. Until you agree, none of them are loaded.
            </p>
            <p>If you agree, we use:</p>
            <ul>
              <li>Google Analytics, to understand how visitors use the site.</li>
              <li>
                Google Ads and the Meta (Facebook) pixel, to measure whether our adverts lead to bookings and enquiries
                and to show our adverts to people who have visited this site. Google and Meta may also use this to
                personalise the ads you see.
              </li>
            </ul>
            <p>
              These tools are loaded through Cloudflare Zaraz. You can change or withdraw your choice at any time using
              &ldquo;Cookie settings&rdquo; at the bottom of any page, and you can also block cookies in your browser
              settings.
            </p>
            <p>
              Whatever you choose, we use Cloudflare Web Analytics to count visits and check how fast pages load. It
              does not use cookies or identify you.
            </p>
            <p>
              The site notes how you arrived on each visit (for example from a Google advert, a search or another
              website). It is added to bookings and enquiries you send us, and to the start of WhatsApp messages you
              start from this site, where you can see it and delete it before sending (WhatsApp is run by Meta). We only
              use it to see which of our adverts work. If you agree to analytics or advertising cookies, your browser
              also remembers it for 30 days, so we still know if you come back later to book. Saying no removes it.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date. We encourage you to review this policy periodically.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have any questions about this Privacy Policy or how we handle your personal information, please
              contact us:
            </p>
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
