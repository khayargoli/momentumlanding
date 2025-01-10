import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function App() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    setErrors(prevState => ({
      ...prevState,
      [id]: '' // Clear error message on input change
    }));
  };

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    const newErrors = { name: '', email: '', phone: '', message: '' };
    let isValid = true;

    if (!name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
      isValid = false;
    }
    if (!message) {
      newErrors.message = 'Message is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const sendEmail = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch('/.netlify/functions/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Thank you for contacting us! We will reach out to you withing 24hrs via email or phone.');
        setShowContactForm(false);
      } else {
        alert('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email.');
    }
  };

  return (
    <>

      {/* Dialog for Image Popup */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage("")}>
        <DialogContent className="max-w-7xl">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected image"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>

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
                {/* <Dumbbell className="h-10 w-10 text-white" aria-hidden="true" />
                <h1 className="text-4xl font-bold text-foreground">Momentum Nepal</h1> */}
                <div className="flex rounded-md bg-slate-200 p-[2px]">
                  <img src={'/logo.png'} alt="logo" width={200} height={50} className="m-auto" />
                </div>
              </div>
              <p className="text-xl text-foreground max-w-4xl mb-8 text-center">
                Make gym management easy with Momentum's gym management system.
                <br />Track attendance, send payment reminders, and manage everything with a simple dashboard.
                <br />From member management to payments, our system handles it all.
                <br /><br />Join gyms across Nepal that trust us to save time and grow their business!
              </p>
              <Button size="lg" className="text-lg" onClick={() => setShowContactForm(true)}>
                Get Demo
              </Button>
            </div>
          </div>
        </header>

        {/* Pricing Section */}
        <section className="py-10 bg-secondary/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-secondary-foreground">Simple, Transparent Pricing</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Starter",
                  price: "NPR 2,999",
                  description: "Perfect for small gyms",
                  features: ["Up to 100 members", "Basic reporting", "Email notifiction", "Email support", "Quick Trial", "Guided Installation"]
                },
                {
                  title: "Professional",
                  price: "NPR 3,999",
                  description: "Ideal for growing facilities",
                  features: ["Up to 500 members", "Advanced analytics", "WhatsApp notification", "Email notification", "Priority support", "Custom branding"]
                },
                {
                  title: "Enterprise",
                  price: "NPR 4,999",
                  description: "For large-scale operations",
                  features: ["Unlimited members", "Custom reporting", "Advanced analytics", "WhatsApp notification", "Email notification", "24/7 support"]
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
                          <CheckCircle2 className="h-5 w-5 text-white" />
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
        <section className="py-10 bg-[hsl(var(--delftblue))]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { src: "/1.png", text: "Dashboard" },
                { src: "/6.jpg", text: "Member Enrollment" },
                { src: "/8.jpg", text: "Payment Reminder" },
                { src: "/3.png", text: "Attendance Tracking" },
                { src: "/6.jpg", text: "Subscription Renewal" },
                { src: "/4.png", text: "Payment Tracking" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="aspect-video relative overflow-hidden rounded-lg p-2 cursor-pointer  hover:scale-110 transition-transform duration-300"
                  onClick={() => setSelectedImage(item.src)}
                >
                  <img
                    src={item.src}
                    alt={`Gallery image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg bg-black/80 px-3 py-1 rounded">
                      {item.text}
                    </span>
                  </div>
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
                    <Input id="name" placeholder="Your name" value={formData.name} onChange={handleInputChange} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleInputChange} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone">Phone</label>
                    <Input id="phone" placeholder="Your phone number" value={formData.phone} onChange={handleInputChange} />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message">Message</label>
                    <Textarea id="message" placeholder="Tell us about your gym..." value={formData.message} onChange={handleInputChange} />
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button onClick={() => setShowContactForm(false)}>Cancel</Button>
                <Button onClick={sendEmail}>Send Message</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Contact Information */}
        <section className="py-10 bg-secondary/50">
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
                  <p>+977-9860308415</p>
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
                  <p>momentuminnepal@gmail.com</p>
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

            </div>
          </div>
        </section>
        <section className="py-10 bg-[hsl(var(--delftblue))]">
          <footer className="text-white text-center">
            <p>Momentum &copy; 2025 | All Rights Reserved</p>
          </footer>
        </section>
      </div>
    </>
  );
}

export default App;