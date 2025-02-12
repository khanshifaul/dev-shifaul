"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

const SearchForm = () => {
  const form = useForm({
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = (data: { query: string }) => {
    // Handle form submission
    console.log(data);
    // You can redirect or perform search logic here
  };

  return (
    <div className="p-6 bg-amber-50 dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center w-full"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    type="search"
                    placeholder="Search articles..."
                    className="p-3 border border-gray-300 rounded-none rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-gray-400"
                    maxLength={255}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="p-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none rounded-none rounded-r-lg focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <FaSearch className="w-5 h-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchForm;
