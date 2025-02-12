"use client";
import { CREATE_NEWSLETTER_SUBSCRIBER } from "@/app/api/graphql/mutations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa6";

const NewsletterForm = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean | null>(null);
  const [createNewsletterSubscriber, { loading, error }] = useMutation(
    CREATE_NEWSLETTER_SUBSCRIBER
  );

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      // Execute the mutation
      const result = await createNewsletterSubscriber({
        variables: {
          input: {
            email: data.email,
          },
        },
      });

      // Handle success
      if (result.data?.createNewsletterSubscriber) {
        setIsSubmitted(true);
        form.reset(); // Reset the form after successful submission
      }
    } catch (err) {
      // Handle error
      setIsSubmitted(false);
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="p-6 bg-amber-50 dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-xl font-bold mb-4">Subscribe to our newsletter</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Email address"
                    className="p-2 border border-gray-300 rounded-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                    maxLength={255}
                    required
                    disabled={loading} // Disable input while loading
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-none rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin">🌀</div>
            ) : (
              <FaArrowRight className="w-5 h-5" />
            )}
          </Button>
        </form>
      </Form>
      {isSubmitted === true && (
        <div className="mt-2 text-green-600" aria-label="Email Form success">
          Thank you! Your submission has been received!
        </div>
      )}
      {isSubmitted === false && (
        <div className="mt-2 text-red-600" aria-label="Email Form failure">
          Oops! Something went wrong while submitting the form.
        </div>
      )}
      {/* Display GraphQL error message */}
      {error && (
        <div className="mt-2 text-red-600" aria-label="GraphQL error">
          Error: {error.message}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
