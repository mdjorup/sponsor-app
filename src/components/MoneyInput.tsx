"use client";

// https://gist.github.com/Sutil/5285f2e5a912dcf14fc23393dac97fed

import { useReducer } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"; // Shadcn UI import
import { Input } from "./ui/input"; // Shandcn UI Input

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  description?: string;
};

const moneyFormatter = Intl.NumberFormat("en-US", {
  currency: "USD",
  currencyDisplay: "symbol",
  currencySign: "standard",
  style: "currency",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? moneyFormatter.format(props.form.getValues()[props.name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  function handleChange(realChangeFn: Function, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
            {props.description && (
              <FormDescription>{props.description}</FormDescription>
            )}
          </FormItem>
        );
      }}
    />
  );
}
