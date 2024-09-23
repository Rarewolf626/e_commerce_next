import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type InputProps = {
  name: string;
  label: string;
  type?: "text" | "number" | "file";
  placeholder?: string;
};

export const UseFileField = ({
  name,
  label,
  type = "text",
  placeholder,
}: InputProps) => {
  const formContext = useFormContext();
  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field: { onChange } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              onChange={(e) => onChange(e.target.files?.[0])}
              placeholder={placeholder}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
