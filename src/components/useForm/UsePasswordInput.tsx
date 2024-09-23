import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
type PasswordInputProps = {
  placeholder?: string;
  name: string;
  label?: string;
};

export const UsePasswordInput = ({
  placeholder,
  name,
  label,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const formContext = useFormContext();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormField
      name={name}
      control={formContext.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
