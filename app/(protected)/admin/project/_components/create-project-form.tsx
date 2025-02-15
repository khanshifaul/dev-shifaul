"use client";
import { CREATE_PROJECT } from "@/app/api/graphql/mutations";
import {
  MultiSelectCombobox,
  Option,
} from "@/components/multi-select-combobox";
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
import { Plus, Trash } from "lucide-react";
import React from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { z } from "zod";

// Options for the comboboxes
const serviceOptions: Option[] = [
  { value: "design", label: "Design" },
  { value: "development", label: "Development" },
  { value: "consulting", label: "Consulting" },
  { value: "marketing", label: "Marketing" },
  { value: "seo", label: "SEO" },
];

const technologyOptions: Option[] = [
  { value: "react", label: "React" },
  { value: "next.js", label: "Next.js" },
  { value: "graphql", label: "GraphQL" },
  { value: "node.js", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
];

// Update the schema so that images are stored as objects.
const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  client: z.string().min(1, "Client is required"),
  logo: z.string().min(1, "Logo URL is required"),
  services: z.array(z.string()).nonempty("At least one service is required"),
  technologies: z
    .array(z.string())
    .nonempty("At least one technology is required"),
  website: z.string().min(1, "Website URL is required"),
  thumbnail: z.string().min(1, "Thumbnail URL is required"),
  about: z.string().min(1, "About is required"),
  goal: z.string().min(1, "Goal is required"),
  execution: z.string().min(1, "Execution is required"),
  results: z.string().min(1, "Results are required"),
  // Image fields now expect an array of objects with a 'url' property.
  goalImages: z
    .array(z.object({ url: z.string().min(1, "Image URL is required") }))
    .min(1, "At least one goal image is required"),
  resultImages: z
    .array(z.object({ url: z.string().min(1, "Image URL is required") }))
    .min(1, "At least one result image is required"),
});

type ProjectFormInput = z.infer<typeof projectSchema>;

const CreateProjectForm: React.FC = () => {
  const form = useForm<ProjectFormInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      client: "",
      logo: "",
      services: [],
      technologies: [],
      website: "",
      thumbnail: "",
      about: "",
      goal: "",
      execution: "",
      results: "",
      goalImages: [{ url: "" }],
      resultImages: [{ url: "" }],
    },
  });
  const { handleSubmit, reset, control } = form;

  // Field array for goalImages
  const {
    fields: goalImageFields,
    append: appendGoalImage,
    remove: removeGoalImage,
    update: updateGoalImage,
  } = useFieldArray({
    control,
    name: "goalImages",
  });

  // Field array for resultImages
  const {
    fields: resultImageFields,
    append: appendResultImage,
    remove: removeResultImage,
    update: updateResultImage,
  } = useFieldArray({
    control,
    name: "resultImages",
  });

  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);

  const onSubmit: SubmitHandler<ProjectFormInput> = async (formData) => {
    // Auto-generate slug from title by replacing whitespace with underscores
    const slug = formData.title.trim().replace(/\s+/g, "_");

    // Prepare project input, mapping image objects to strings if necessary.
    const projectInput = {
      ...formData,
      slug,
      goalImages: formData.goalImages.map((img) => img.url),
      resultImages: formData.resultImages.map((img) => img.url),
      // Optionally, you can auto-generate tags from services and technologies here.
    };

    try {
      const response = await createProject({
        variables: { input: projectInput },
      });
      console.log("Project created:", response.data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Subtitle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Input placeholder="Client Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/logo.png"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Services Combobox */}
            <Controller
              control={control}
              name="services"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Services</FormLabel>
                  <FormControl>
                    <MultiSelectCombobox
                      options={serviceOptions}
                      selected={field.value}
                      onSelectedChange={field.onChange}
                      placeholder="Select services..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Technologies Combobox */}
            <Controller
              control={control}
              name="technologies"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <MultiSelectCombobox
                      options={technologyOptions}
                      selected={field.value}
                      onSelectedChange={field.onChange}
                      placeholder="Select technologies..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/thumbnail.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Text Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                control={control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="About the project"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Project goal"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Dynamic Goal Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-base font-semibold">
                    Goal Images
                  </FormLabel>
                  <Button
                    type="button"
                    onClick={() => appendGoalImage({ url: "" })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {goalImageFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <Input
                      type="text"
                      placeholder="Image URL"
                      value={field.url}
                      onChange={(e) =>
                        updateGoalImage(index, { url: e.target.value })
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => removeGoalImage(index)}
                      className="text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <FormField
                control={control}
                name="execution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Execution</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Execution details"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="results"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Results</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Project results"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Dynamic Result Images */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-base font-semibold">
                    Result Images
                  </FormLabel>
                  <Button
                    type="button"
                    onClick={() => appendResultImage({ url: "" })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {resultImageFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 mb-2">
                    <Input
                      type="text"
                      placeholder="Image URL"
                      value={field.url}
                      onChange={(e) =>
                        updateResultImage(index, { url: e.target.value })
                      }
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => removeResultImage(index)}
                      className="text-red-500"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
          {error && (
            <p className="text-red-500 text-sm mt-2">Error: {error.message}</p>
          )}
          {data && (
            <p className="text-green-500 text-sm mt-2">
              Project created successfully!
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default CreateProjectForm;
