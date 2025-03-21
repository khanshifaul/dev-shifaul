"use client";

import { CREATE_MESSAGE } from "@/app/api/graphql/mutations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const ContactForm = () => {
  const [status, setStatus] = useState<string>("");

  // Apollo Client mutation hook
  const [createMessage, { loading, error }] = useMutation(CREATE_MESSAGE);

  // React Hook Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Form submission handler
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Execute the mutation
      const { data } = await createMessage({
        variables: {
          input: {
            name: values.name,
            email: values.email,
            subject: values.subject,
            message: values.message,
          },
        },
      });

      if (data?.createMessage) {
        setStatus("Message Sent successfully!");
        form.reset(); // Clear form on success
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setStatus(`Failed to send message: ${err.message}`);
      } else {
        setStatus("Failed to send message: An unknown error occurred");
      }
    }
  };

  return (
    <motion.div className="flex flex-col items-center gap-4 p-6">
      <motion.h2
        animate={{
          opacity: [0, 100],
          transition: { duration: 1, ease: "easeInOut" },
        }}
        className="text-3xl font-bold mb-4 border-b-3 border-blue-500"
      >
        Send Me a Message
      </motion.h2>
      {/* Intro Text */}
      <motion.p
        animate={{
          opacity: [0, 100],
          transition: { duration: 1, ease: "easeInOut" },
        }}
        className="text-gray-600 text-center max-w-lg"
      >
        {`I'd love to hear from you! Whether you have questions or feedback, feel free to reach out. I'll respond as soon as I can!`}
      </motion.p>
      <motion.div
        animate={{
          opacity: [0, 100],
          y: [0, 30],
          transition: { duration: 0.6, ease: "easeInOut" },
        }}
        className="p-6 rounded-lg shadow-lg shadow-blue-400 w-full"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What's your message about? (e.g., Collaboration, Feedback, Inquiry)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={`Write your message here... Let me know how I can help!`}
                      {...field}
                      className="h-48"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {status && (
              <p className="mt-4 text-gray-500 text-center">{status}</p>
            )}
            {error && (
              <p className="mt-4 text-red-500">Error: {error.message}</p>
            )}
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
