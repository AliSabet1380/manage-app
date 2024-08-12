"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
    })
    .min(2, "name is too short")
    .max(12, "name is too long"),
  price: z
    .string({
      required_error: "price is required",
    })
    .min(1, "price is required")
    .max(25, "can not handle price"),
  description: z
    .string({
      required_error: "description is required",
    })
    .min(1, "description is requred")
    .max(15, "use shorter description"),
});

export type FormValues = z.infer<typeof FormSchema>;

interface PaymentFormProps {
  onSubmit: (formValues: FormValues) => void;
  disabled?: boolean;
  defaultValues?: FormValues;
  id?: string;
  onDelete?: () => void;
}

export const NewPaymentForm = ({
  onSubmit,
  disabled,
  defaultValues,
  id,
  onDelete,
}: PaymentFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="price"
                  {...field}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="desctiption"
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={disabled} className="w-full">
          {id ? "Edit" : "Create"}
        </Button>
        {id && (
          <Button
            disabled={disabled}
            variant={"outline"}
            className="w-full"
            type="button"
            onClick={onDelete}
          >
            <Trash className="size-4 mr-2" />
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
};
