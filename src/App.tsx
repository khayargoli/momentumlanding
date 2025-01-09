import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Dumbbell, Mail, MapPin, Phone, Users, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

function App() {
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Momentum Nepal",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "NPR",
              "lowPrice": "2999",
              "highPrice": "4999",
              "offerCount": "3"
            },
            "description": "Comprehensive gym management system for fitness businesses in Nepal",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background dark">
        {/* Hero Section */}
        <header className="relative py-24 overflow-hidden">
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.2)'
            }}
            role="img"
            aria-label="Gym equipment silhouette"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="h-10 w-10 text-primary" aria-hidden="true" />
                <h1 className="text-4xl font-bold text-foreground">Momentum Nepal</h1>
              </div>
              <p className="text-xl text-foreground max-w-2xl mb-8">
                Streamline your gym operations with Nepal's leading gym management system.
                Empower your fitness business with our comprehensive solution.
              </p>
              <Button size="lg" className="text-lg" onClick={() => setShowContactForm(true)}>
                Get Demo
              </Button>
            </div>
          </div>
        </header>

        {/* Pricing Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Starter",
                  price: "NPR 2,999",
                  description: "Perfect for small gyms",
                  features: ["Up to 100 members", "Basic reporting", "Email support", "Member portal"]
                },
                {
                  title: "Professional",
                  price: "NPR 3,999",
                  description: "Ideal for growing facilities",
                  features: ["Up to 500 members", "Advanced analytics", "Priority support", "Custom branding"]
                },
                {
                  title: "Enterprise",
                  price: "NPR 4,999",
                  description: "For large-scale operations",
                  features: ["Unlimited members", "Custom reporting", "24/7 support", "API access"]
                }
              ].map((plan) => (
                <Card key={plan.title} className="relative">
                  <CardHeader>
                    <CardTitle>{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold mb-6">{plan.price}<span className="text-sm font-normal">/month</span></p>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setShowContactForm(true)}>Get Started</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-[hsl(var(--delftblue))]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
                "https://images.unsplash.com/photo-1576678927484-cc907957088c",
                "https://images.unsplash.com/photo-1540497077202-7c8a3999166f",
                "https://images.unsplash.com/photo-1517963879433-6ad2b056d712",
                "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
                "https://images.unsplash.com/photo-1591291621164-2c6367723315"
              ].map((image, index) => (
                <div key={index} className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src={`${image}?w=600&h=400&fit=crop`}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        {showContactForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Get Your Demo</CardTitle>
                <CardDescription>Fill out the form below and we'll contact you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name">Name</label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone">Phone</label>
                    <Input id="phone" placeholder="Your phone number" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message">Message</label>
                    <Textarea id="message" placeholder="Tell us about your gym..." />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={() => setShowContactForm(false)}>Cancel</Button>
                <Button>Send Message</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Contact Information */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>+977 9860308415</p>
                  <p>+977 9849640930</p>
                </CardContent>

              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sanogaucharan, Bhagwati Marg</p>
                  <p>Kathmandu, Nepal</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>info@momentumnepal.com</p>
                  <p>support@momentumnepal.com</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;