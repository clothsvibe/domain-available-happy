
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AnimatedButton from './AnimatedButton';
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageSquare } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log("Submitting form data:", data);
      
      // Call the edge function to handle email sending
      const response = await fetch('https://gmhhtubytyzbzybgzggm.supabase.co/functions/v1/send-inquiry-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.error || 'Failed to submit inquiry');
      }
      
      const result = await response.json();
      console.log("Form submission result:", result);
      
      toast({
        title: "Inquiry Sent",
        description: "Thank you for your interest. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem sending your inquiry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "+447308658080";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        <a 
          href={whatsappLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full md:w-auto glass-panel border-0 shadow-md shadow-primary/10 px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:shadow-lg transition-all bg-green-500 text-white"
        >
          <MessageSquare className="h-5 w-5" />
          <span>WhatsApp</span>
        </a>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Name</FormLabel>
                  <FormControl>
                    <Input 
                      className="glass-input" 
                      placeholder="Your name" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Email</FormLabel>
                  <FormControl>
                    <Input 
                      className="glass-input" 
                      placeholder="your@email.com" 
                      type="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Budget (Optional)</FormLabel>
                <FormControl>
                  <Input 
                    className="glass-input" 
                    placeholder="Your budget" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground/80">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    className="glass-input min-h-[120px]" 
                    placeholder="Tell us about your interest in this domain..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <AnimatedButton 
            type="submit" 
            className="w-full md:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </AnimatedButton>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
