"use client";

import Image from "next/image";
import { Be_Vietnam_Pro } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { ToastAction } from "@radix-ui/react-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type EnvelopeState = "closed" | "open";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const envelopeVariants = {
  closed: {
    rotate: [-2, 2, -2, 2, -2, 2, 0], // Multiple tilts then rest
    transition: {
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6], // Control timing of each tilt
      duration: 3, // Total duration of sequence
      repeat: Infinity, // Repeat forever
      repeatDelay: 2, // 2 second pause between sequences
      ease: "linear",
    },
  },
  open: {
    rotate: 0,
    transition: { duration: 0.3 },
  },
};

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // bold weight
});

const teamMembers = [
  {
    name: "Mohit Srinivasan",
    role: "Lead Organizer",
    avatar: "/avatars/Mohit Srinivasan.webp",
  },
  {
    name: "Malav Patel",
    role: "Co-Lead Organizer",
    avatar: "/avatars/Malav Patel.png",
  },
  {
    name: "Alexander Masin",
    role: "Logistics Lead",
    avatar: "/avatars/Alexander Masin.jpg",
  },
  {
    name: "Ayushmaan Mukherjee",
    role: "Marketing Lead",
    avatar: "/avatars/Ayushmaan Mukherjee.webp",
  },
  {
    name: "Abdullah Kamran",
    role: "Operations Lead",
    avatar: "/avatars/Abdullah Kamran.jpg",
  },
  {
    name: "Arjun Agarwala",
    role: "Finance Lead",
    avatar: "/avatars/Arjun Agarwala.png",
  },
];

const sponsors = [
  {
    name: "gen.xyz",
    logo: "/sponsors/genxyz.svg",
    link: "https://gen.xyz",
  },
  {
    name: "Balsamiq",
    logo: "/sponsors/balsamiq.svg",
    link: "https://balsamiq.com",
  },
  {
    name: "CodeCrafters",
    logo: "/sponsors/codecrafters.svg",
    link: "https://codecrafters.io",
  },
  {
    name: "Incogni",
    logo: "/sponsors/incogni.svg",
    link: "https://incogni.com",
  },
  {
    name: "NordVPN",
    logo: "/sponsors/nordvpn.svg",
    link: "https://nordvpn.com",
  },
  {
    name: "NordPass",
    logo: "/sponsors/nordpass.svg",
    link: "https://nordpass.com",
  },
];

export default function Home() {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [envelopeState, setEnvelopeState] = useState<"closed" | "open">(
    "closed"
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenEnvelope = localStorage.getItem("hasSeenEnvelope");

    if (!hasSeenEnvelope) {
      // Show envelope after 2 minutes for first-time visitors
      const timer = setTimeout(() => {
        setShowEnvelope(true);
        localStorage.setItem("hasSeenEnvelope", "true");
      }, 120000); // 2 minutes
      return () => clearTimeout(timer);
    } else {
      // Show toast for returning visitors
      toast({
        title: "Welcome back!",
        description: "Would you like to see the recruitment letter again?",
        action: (
          <ToastAction
            altText="Show Recruitment letter"
            onClick={() => setShowEnvelope(true)}
          >
            Show
          </ToastAction>
        ),
        duration: 10000, // 10 seconds
      });
    }
  }, []);

  const handleEnvelopeClick = async () => {
    if (envelopeState === "closed") {
      setTimeout(() => {
        setEnvelopeState("open");
      }, 300);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      emailSchema.parse({ email });
      setEmailError(null);
      setIsSubmitting(true);

      const res = await fetch("/api/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setEmail("");
      setShowEmailDialog(false);
      setShowEnvelope(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      } else {
        setEmailError("Failed to submit email");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="flex flex-col min-h-screen p-4 sm:p-8 lg:p-20 font-[family-name:var(--font-geist-sans)] relative"
        style={{
          backgroundImage: 'url("/background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/[.68] z-0"></div>

        {/* Add logo */}
        <div className="flex justify-between items-center z-10">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={40}
            className="w-[150px] sm:w-[200px] h-auto"
            priority
          />

          <button className="flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full hover:bg-white/90 transition-colors">
            <span className={`${beVietnamPro.className} font-medium`}>
              Register
            </span>
            <ArrowRight size={16} />
          </button>
        </div>

        <main className="flex flex-col mt-auto z-10 w-full">
          <h1
            className={`${beVietnamPro.className} text-6xl font-bold sm:text-7xl md:text-9xl text-white text-left mb-6 lg:mb-10`}
            style={{
              letterSpacing: "-0.09em",
              lineHeight: "0.93",
            }}
          >
            Build your first
            <br />
            project to space
          </h1>
          <p
            className={`${beVietnamPro.className} text-lg font-medium sm:text-xl md:text-2xl text-left max-w-3xl`}
            style={{
              letterSpacing: "-0.06em",
              lineHeight: "1.222",
              color: "rgba(255, 255, 255, 0.73)",
            }}
          >
            Solaris is a 24-hour high school hackathon where students come
            together to build projects for a space mission.
          </p>
        </main>
      </div>
      <div className="flex flex-col mt-20 bg-white w-full py-20">
        <div className="flex flex-col items-center max-w-6xl mx-auto px-4 sm:px-8">
          <h2
            className={`${beVietnamPro.className} text-4xl sm:text-5xl font-bold text-center`}
            style={{
              letterSpacing: "-0.09em",
              lineHeight: "0.93",
              color: "#000000",
            }}
          >
            About Us
          </h2>

          <p
            className={`${beVietnamPro.className} text-xl sm:text-2xl max-w-xl text-center mt-6`}
            style={{
              letterSpacing: "-0.05em",
              lineHeight: "1.116",
              color: "rgba(0, 0, 0, 0.6)",
            }}
          >
            More information about Solaris as a hackathon and the team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mt-20">
          {/* Team Grid - Left Side */}
          <div className="grid grid-cols-3 gap-10 px-4 sm:px-8 md:px-12 lg:px-20 w-full">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 sm:w-40 sm:h-40 mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3
                  className={`${beVietnamPro.className} font-bold text-black text-sm sm:text-base mb-1`}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-black/60">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="px-4 sm:px-8 md:px-12 lg:px-20">
            <div className="flex flex-col gap-6">
              <p
                className={`${beVietnamPro.className} text-lg sm:text-xl`}
                style={{
                  letterSpacing: "-0.05em",
                  lineHeight: "1.6",
                  color: "rgba(0, 0, 0, 0.8)",
                }}
              >
                Solaris is a 24-hour high school hackathon in New Jersey. We
                call upon high schoolers from all across New Jersey, and the
                United States to come together and build awesome projects in
                order to help the Solaris Space Agency save the colonists on the
                Moon's Tranquility Base.
              </p>

              <p
                className={`${beVietnamPro.className} text-lg sm:text-xl`}
                style={{
                  letterSpacing: "-0.05em",
                  lineHeight: "1.6",
                  color: "rgba(0, 0, 0, 0.8)",
                }}
              >
                We are a group of STEM enthusiasts who believe that STEM
                education is a must for all high schoolers. We believe that STEM
                education in high school is quite lackluster, and have partnered
                with Hack Club to provide real-world Computer Science and
                experience to all high schoolers, regardless of prior
                experience.
              </p>
            </div>
          </div>{" "}
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="bg-black/[.89] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center">
            <h2
              className={`${beVietnamPro.className} text-4xl sm:text-5xl font-bold text-center text-white`}
              style={{
                letterSpacing: "-0.09em",
                lineHeight: "0.93",
              }}
            >
              Sponsors
            </h2>

            <p
              className={`${beVietnamPro.className} text-xl sm:text-2xl max-w-xl text-center mt-6`}
              style={{
                letterSpacing: "-0.05em",
                lineHeight: "1.116",
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              Companies that rock and are providing us with the opportunity to
              educate high schoolers.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {sponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[calc(50%-1rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1rem)] flex items-center justify-center"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={200}
                  height={100}
                  className="w-full max-w-[200px] h-auto object-contain hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>

          <p
            className={`${beVietnamPro.className} text-lg text-center mt-10`}
            style={{
              letterSpacing: "-0.05em",
              lineHeight: "1.5",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            Want your company here? Contact{" "}
            <a
              href="mailto:team@hacksolaris.com"
              className="underline hover:opacity-80 transition-opacity"
            >
              team@hacksolaris.com
            </a>
          </p>
        </div>
      </div>

      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col items-center">
            <h2
              className={`${beVietnamPro.className} text-4xl sm:text-5xl font-bold text-center`}
              style={{
                letterSpacing: "-0.06em",
                lineHeight: "1.2",
                color: "rgba(0, 0, 0, 0.9)",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`${beVietnamPro.className} text-xl sm:text-2xl max-w-xl text-center mt-6`}
              style={{
                letterSpacing: "-0.05em",
                lineHeight: "1.116",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              Common questions about hackathons and what to expect.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full">
              <Accordion
                type="single"
                collapsible
                className="w-full text-black"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    What is a hackathon?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    A hackathon is an event where students come together to turn
                    their ideas into reality through coding, designing, and
                    building projects. Think of it as an invention marathon
                    where you can learn new skills, meet amazing people, and
                    create something awesome - all in 24 hours!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    Do I need to know how to code?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    Not at all! Hackathons are perfect for beginners. We'll have
                    workshops, mentors, and resources to help you learn. Many
                    participants come with zero coding experience and leave
                    having built their first project.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    What should I bring?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    Bring your laptop, charger, and any other devices you might
                    need. We'll provide food, drinks, snacks, and a comfortable
                    space to work. Don't forget a sleeping bag or blanket if you
                    plan to rest!
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    Where will the hackathon be held?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    We're currently in talks with several potential venues in
                    the New Jersey area and potentially the Greater New York
                    Area. We're looking for a spacious, accessible location that
                    can comfortably accommodate all our hackers with the
                    necessary amenities and technical infrastructure. We'll
                    announce the final venue as soon as we secure the perfect
                    spot for an amazing hackathon experience!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion
                type="single"
                collapsible
                className="w-full text-black"
              >
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    What can I build?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    Anything! Websites, apps, games, hardware projects - the
                    sky's the limit. We'll have themed prize tracks and sponsors
                    who can help guide your project, but you're free to build
                    whatever interests you most.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    How much does it cost?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    Nothing! The event is completely free for all participants.
                    We provide meals, snacks, swag, and everything you need to
                    have an amazing experience, thanks to our generous sponsors.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    Do I need a team?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    Nope! You can come solo and find a team at the event, or
                    work alone if you prefer. We'll have team formation
                    activities at the start to help you find people with
                    complementary skills and interests.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-black hover:text-black/70">
                    When is the hackathon?
                  </AccordionTrigger>
                  <AccordionContent className="text-black/80">
                    Solaris is planned for Spring 2024! We're currently
                    finalizing the exact date, coordinating with academic
                    calendars and other major hackathons to ensure maximum
                    participation. Stay tuned to our social media channels for
                    the official date announcement!
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowEnvelope(false)}
          >
            <motion.div
              className="relative p-8 rounded cursor-pointer"
              variants={envelopeVariants}
              // animate={envelopeState}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                handleEnvelopeClick();
              }}
            >
              <div className="relative w-[400px] h-[400px] md:w-[700px] md:h-[700px]">
                {envelopeState === "closed" && (
                  <motion.img
                    src="/envelope-closed.svg"
                    alt="Envelope"
                    className="absolute inset-0 w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                {envelopeState === "open" && (
                  <>
                    <motion.img
                      src="/envelope-open.svg"
                      alt="Open Envelope"
                      className="absolute inset-0 w-[500px] h-[600px] md:w-[700px] md:h-[700px]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex gap-4">
                      <button
                        className={`${beVietnamPro.className} px-6 py-2 bg-white font-medium text-black/90 rounded-lg hover:bg-white/80 transition-colors`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEmailDialog(true);
                        }}
                      >
                        Interested
                      </button>
                      <button
                        className={`${beVietnamPro.className} px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEnvelope(false);
                        }}
                      >
                        Not Interested
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enter your email</DialogTitle>
            <DialogDescription>
              If you got this recruitment letter, and you're interested, we'd
              love to send this to your inbox so you don't lose it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              // type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}{" "}
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer Section */}
      <div className="bg-black/[.68] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-start">
            {/* Left side - All text content */}
            <div className="flex flex-col gap-2">
              <p className={`${beVietnamPro.className} text-sm text-white/80`}>
                Built and designed by Mohit Srinivasan
              </p>
              <div>
                <p
                  className={`${beVietnamPro.className} text-sm text-white/80 mb-2`}
                >
                  Solaris is a 501(c)(3) nonprofit organization fiscally
                  sponsored by The Hack Foundation
                </p>
                <p
                  className={`${beVietnamPro.className} text-xs text-white/60`}
                >
                  EIN: 81-2908499
                </p>
              </div>
            </div>

            {/* Right side - Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/hacksolaris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://github.com/hacksolaris"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
