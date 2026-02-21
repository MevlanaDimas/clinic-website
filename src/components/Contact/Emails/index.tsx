import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
  Row,
  Column,
} from "@react-email/components";

interface ContactEmailProps {
  gender: string;
  name: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
}

export const ContactEmail = ({
  gender,
  name,
  email,
  phoneNumber,
  subject,
  message,
}: ContactEmailProps) => {
  // CHANGE THIS: Use an absolute URL to a PNG/JPG hosted on your site or an image host
  const logoUrl = "https://storage.googleapis.com/clinic_website-admin_panel/2.png"; 

  return (
    <Html>
      <Head />
      <Preview>New Inquiry: {subject}</Preview>
      <Tailwind>
        <Body className="bg-slate-50 my-auto mx-auto font-sans">
          <Container className="bg-white border border-solid border-slate-200 rounded-lg my-10 mx-auto p-8 max-w-125 shadow-sm">
            
            {/* Logo Section */}
            <Section className="text-center mb-8">
              <Img
                src={logoUrl}
                alt="Clinic Logo"
                width="140"
                className="mx-auto"
              />
            </Section>

            <Heading className="text-slate-900 text-[20px] font-bold text-center p-0 mb-6 mx-0">
              New Contact Submission
            </Heading>

            <Text className="text-slate-600 text-[14px] leading-6">
              You have received a new message through the clinic website. Here are the details:
            </Text>

            {/* Information Grid */}
            <Section className="bg-slate-50 rounded-md py-4 px-10 mb-6 border border-solid border-slate-100">
              <Row className="mb-2">
                <Column className="w-1/3 text-slate-500 text-[12px] uppercase font-bold tracking-wider">Sender</Column>
                <Column className="text-slate-900 text-[14px]">
                  {gender === "male" ? "Mr." : "Mrs."} {name}
                </Column>
              </Row>
              <Row className="mb-2">
                <Column className="w-1/3 text-slate-500 text-[12px] uppercase font-bold tracking-wider">Email</Column>
                <Column className="text-blue-600 text-[14px]">{email}</Column>
              </Row>
              <Row>
                <Column className="w-1/3 text-slate-500 text-[12px] uppercase font-bold tracking-wider">Phone</Column>
                <Column className="text-slate-900 text-[14px]">{phoneNumber}</Column>
              </Row>
            </Section>

            {/* Message Body */}
            <Section className="mb-6 px-10">
              <Text className="text-slate-900 font-semibold text-[14px] mb-2 uppercase tracking-tighter italic">
                Subject: {subject}
              </Text>
              <div className="border-l-2 border-slate-200 pl-4 py-1 text-slate-700 text-[15px] leading-6.5 whitespace-pre-wrap">
                {message}
              </div>
            </Section>

            <Hr className="border border-solid border-slate-200 my-8 w-full" />
            
            <Text className="text-slate-400 text-[12px] text-center leading-4.5">
              This is an automated notification. To respond to the patient, simply click <strong>&quot;Reply&quot;</strong> in your email client.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactEmail;