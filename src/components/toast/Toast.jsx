import { useToast } from "@/components/ui/use-toast";
export const Toast = ({ title, description }) => {
  const { toast } = useToast();

  return toast({
    title: { title },
    description: { description },
  });
};
