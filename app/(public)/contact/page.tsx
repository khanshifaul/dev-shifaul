"use client";

import { motion } from "framer-motion";

import ContactForm from "@/components/ContactForm";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";

export default function ContactPage() {
  return (
    <div className="container mx-auto w-full">
      <motion.div
        onScroll={() => {}}
        className="flex flex-col gap-12 p-4 w-full h-full"
      >
        <SocialMediaLinks />

        <ContactForm />
      </motion.div>
    </div>
  );
}
