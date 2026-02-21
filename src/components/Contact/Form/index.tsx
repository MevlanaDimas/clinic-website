'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormValues, contactSchema, genderOptions } from "@/schema/contact";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionForm } from "@/lib/motion";


interface ContactFormProps {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    setIsSuccess: (isSuccess: boolean) => void;
    setIsOpen: (isOpen: boolean) => void;
}

const formatPhoneNumber = (phone: string) => {
    let cleaned = phone.trim().replace(/[^0-9+]/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '+62' + cleaned.slice(1);
    } else if (cleaned.startsWith('62')) {
        cleaned = '+' + cleaned;
    }
    return cleaned;
};

export const ContactForm: React.FC<ContactFormProps> = ({ loading, setLoading, setIsSuccess, setIsOpen }) => {
    

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            gender: undefined,
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            message: ''
        }
    });

    const onSubmit = async (data: ContactFormValues) => {
        setLoading(true);
        try {
            const payload = {
                ...data,
                phoneNumber: formatPhoneNumber(data.phoneNumber || ''),
                email: data.email?.toLowerCase().trim()
            };

            const response = await fetch('/api/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 400) {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        Object.entries(errorData.errors).forEach(([key, value]) => {
                            form.setError(key as keyof ContactFormValues, {
                                type: 'server',
                                message: (value as string[])[0]
                            });
                        });
                        return; // Stop execution, field errors are shown
                    }
                }
                throw new Error('Failed to send message');
            }

            setIsSuccess(true);
            setIsOpen(true);
            form.reset();
        } catch {
            setIsSuccess(false);
            setIsOpen(true); // Show generic error toast for non-validation errors
        } finally {
            setLoading(false);
        }
    };

    return (
            <Form {...form}>
                <MotionForm onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender *</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange} required>
                                <FormControl>
                                    <SelectTrigger disabled={loading} className="w-full cursor-pointer">
                                        <SelectValue placeholder="Select Your Gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {genderOptions.map((gender) => (
                                        <SelectItem key={gender.value} value={gender.value} className="cursor-pointer">
                                            {gender.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    min={1}
                                    disabled={loading}
                                    placeholder="John"
                                    {...field}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    min={1}
                                    disabled={loading}
                                    placeholder="Doe"
                                    {...field}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field}) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    disabled={loading}
                                    placeholder="example@mail.com"
                                    {...field}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    disabled={loading}
                                    placeholder="08**********"
                                    {...field}
                                    required
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
                            <FormLabel>Message *</FormLabel>
                            <FormControl>
                                <Textarea
                                    minLength={10}
                                    maxLength={500}
                                    disabled={loading}
                                    placeholder="Your message..."
                                    {...field}
                                    required
                                    className="resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-row mt-12 items-center justify-between">
                    <Button disabled={loading} variant="outline" type="reset" className="cursor-pointer" onClick={() => form.reset()}>
                        Reset
                    </Button>

                    <Button disabled={loading} className="cursor-pointer" type="submit">
                        {loading ? (
                            <>
                                <LoaderCircle className="mr-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Message"
                        )}
                    </Button>
                </div>
            </MotionForm>
        </Form>
    )
}