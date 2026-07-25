"use client";

import * as React from "react";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/shared/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { addToast } = useToast();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!subject.trim()) errs.subject = "Subject is required";
    if (!message.trim()) {
      errs.message = "Message content is required";
    } else if (message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast({
        title: "Message Submitted",
        description: "Thank you for reaching out! We received your simulated message.",
        type: "success",
      });
    }, 1000);
  };

  return (
    <PageContainer className="py-12">
      <PageHeader
        title="Contact PromptPilot Support"
        description="Have questions, suggestions, or feedback about the PromptPilot static SaaS application? Send us a message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs">
          {isSubmitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{name}</strong>. Your feedback has been recorded in this local demo session.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsSubmitted(false);
                  setName("");
                  setEmail("");
                  setSubject("");
                  setMessage("");
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required error={errors.name}>
                  <Input
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!errors.name}
                  />
                </FormField>

                <FormField label="Email Address" required error={errors.email}>
                  <Input
                    type="email"
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                  />
                </FormField>
              </div>

              <FormField label="Subject" required error={errors.subject}>
                <Input
                  placeholder="Feature feedback or question..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  isInvalid={!!errors.subject}
                />
              </FormField>

              <FormField label="Your Message" required error={errors.message}>
                <Textarea
                  rows={5}
                  placeholder="Share details about your prompt engineering workflow or questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  isInvalid={!!errors.message}
                />
              </FormField>

              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                leftIcon={<Send className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Direct Support</h3>
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <Mail className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Demo Email:</span>
                <br />
                support@promptpilot.app
              </div>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <MessageSquare className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900">Community:</span>
                <br />
                GitHub Discussions &bull; Local Demo Mode
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl text-xs text-indigo-900 leading-relaxed">
            <h4 className="font-bold mb-1">Static Demo Notice</h4>
            PromptPilot operates entirely in your web browser. Form submissions simulate feedback processing without making external network requests.
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
