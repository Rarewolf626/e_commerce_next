/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnyZodObject } from "zod";
type TFormProps = {
  children: ReactNode;
  onFormSubmit: any;
  defaultValues?: Record<string, any>;
  schema?: AnyZodObject;
};

export default function UseForm({
  onFormSubmit,
  children,
  schema,
  defaultValues,
}: TFormProps) {
  const customMethods: Record<string, any> = {};
  if (schema) {
    customMethods["resolver"] = zodResolver(schema);
  }
  if (defaultValues) {
    customMethods["defaultValues"] = defaultValues;
  }

  const formMethods = useForm<FieldValues>({
    ...customMethods,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    onFormSubmit(data);
    formMethods.reset();
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-8">
        {children}
      </form>
    </Form>
  );
}
