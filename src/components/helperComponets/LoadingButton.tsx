import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

const LoadingButton = () => {
  return (
    <Button className="w-full   transition-all duration-300 ease-in-out">
      <Loader2 className="h-5 w-5 animate-spin" />
    </Button>
  );
};
export default LoadingButton;
