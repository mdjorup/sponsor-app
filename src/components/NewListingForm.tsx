"use client";

import { Entity } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoneyInput } from "./MoneyInput";
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

const NewListingFormSchema = z.object({
  entity_id: z.string().uuid(),
  title: z.string().max(255),
  description: z.string().max(1000),
  reserve_price: z.number().positive(),
  n_winners: z.number().int().positive(),
  status: z.literal("open"),
  end_date: z.date().min(new Date()),
});

interface NewListingFormProps {
  entity: Entity;
}

const NewListingForm = ({ entity }: NewListingFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof NewListingFormSchema>>({
    resolver: zodResolver(NewListingFormSchema),
    defaultValues: {
      entity_id: entity.id,
      reserve_price: 50.0,
      n_winners: 1,
      status: "open",
    },
  });

  const handleNWinnersChange = (value: string) => {
    form.setValue("n_winners", parseInt(value));
  };

  const onSubmit = async (values: z.infer<typeof NewListingFormSchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Title</FormLabel>
              <FormControl>
                <Input className="max-w-72" placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive title for your listing.
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
                This is a more detailed description of your listing. Describe
                anything that you want your bidders to know.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <MoneyInput
          form={form}
          label="Reserve Price"
          name="reserve_price"
          placeholder={"$0.00"}
          description="This is the minimum amount that a bidder must bid to win the listing."
        />
        <FormField
          control={form.control}
          name="n_winners"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of winners</FormLabel>
              <Select
                onValueChange={handleNWinnersChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="max-w-72">
                    <SelectValue placeholder={form.getValues("n_winners")} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from(Array(5).keys()).map((_, i) => {
                    return (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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

export default NewListingForm;
