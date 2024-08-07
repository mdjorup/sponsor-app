"use client";

import { createEntity } from "@/actions/entityActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const EntityFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.enum(["podcast", "website", "newsletter"]),
  link: z.string().url(),
});

const EntityForm = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof EntityFormSchema>>({
    resolver: zodResolver(EntityFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof EntityFormSchema>) => {
    setLoading(true);
    try {
      const entity = await createEntity(
        values.name,
        values.description,
        values.type,
        values.link,
      );
      if (!entity) {
        throw new Error("An error occurred while creating the entity.");
      }
      router.replace(`/entities/${entity.id}`);
    } catch (error) {
      form.setError("root", {
        message: "An error occurred while creating the entity.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="max-w-72"
                  placeholder="Entity Name"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the name of your platform. For example, Sponsor Hunt.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This is a more detailed description of your platform. Describe
                what your platform is, who your users are, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="max-w-72">
                    <SelectValue placeholder="Select an entity type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>How can users find you?</FormLabel>
              <FormControl>
                <Input
                  className="max-w-72"
                  placeholder="https://..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EntityForm;
