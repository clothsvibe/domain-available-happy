
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "https://gmhhtubytyzbzybgzggm.supabase.co";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  email: string;
  budget?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received request at send-inquiry-email endpoint");
    
    const bodyText = await req.text();
    console.log("Request body:", bodyText);
    
    let requestData;
    try {
      requestData = JSON.parse(bodyText);
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      throw new Error("Invalid JSON payload");
    }
    
    const { name, email, budget, message } = requestData as InquiryRequest;

    if (!name || !email || !message) {
      console.error("Missing required fields:", { name, email, message });
      throw new Error("Missing required fields");
    }

    console.log("Processing inquiry for:", { name, email, budget: budget || "Not specified" });

    // Store inquiry in Supabase
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      console.log("Connecting to Supabase:", supabaseUrl);
      
      const { data, error } = await supabase
        .from("inquiries")
        .insert({ name, email, budget, message });

      if (error) {
        console.error("Error storing inquiry in database:", error);
        throw new Error(`Failed to store inquiry data: ${error.message}`);
      }
      
      console.log("Inquiry stored in database successfully");
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      throw new Error(`Database operation failed: ${dbError.message}`);
    }

    // Send confirmation email to the person who submitted the form
    try {
      console.log("Sending confirmation email to:", email);
      const userEmailResponse = await resend.emails.send({
        from: "Domain Inquiry <onboarding@resend.dev>",
        to: [email],
        subject: "We received your domain inquiry",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Thank you for your inquiry, ${name}!</h1>
            <p>We have received your message about the <strong>mamadrop.ma</strong> domain and will get back to you as soon as possible.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p><strong>Your message:</strong></p>
              <p style="color: #555;">${message}</p>
            </div>
            <p>Best regards,<br>The Domain Sales Team</p>
          </div>
        `,
      });
      
      console.log("User confirmation email sent:", userEmailResponse);
    } catch (emailError) {
      console.error("Error sending user confirmation email:", emailError);
      // Continue execution even if user email fails
    }

    // Send notification email to the domain owner
    try {
      console.log("Sending notification email to domain owner");
      const ownerEmailResponse = await resend.emails.send({
        from: "Domain Inquiry <onboarding@resend.dev>",
        to: ["sale@mamadrop.ma"], // Domain owner email
        subject: "New Domain Inquiry for mamadrop.ma",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">New Domain Inquiry Received</h1>
            <p>You have received a new inquiry about the <strong>mamadrop.ma</strong> domain.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
              <p><strong>Inquiry Details:</strong></p>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Budget:</strong> ${budget || "Not specified"}</li>
                <li><strong>Message:</strong> ${message}</li>
              </ul>
            </div>
            <p>Respond to this inquiry by replying directly to ${email}.</p>
          </div>
        `,
      });
      
      console.log("Owner notification email sent:", ownerEmailResponse);
    } catch (emailError) {
      console.error("Error sending owner notification email:", emailError);
      // Continue execution even if owner email fails
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-inquiry-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
