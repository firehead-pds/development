export type emailTemplates = {
  'contact-us': ContactUsTemplateBody;
};

interface ContactUsTemplateBody {
  title: string;
  message: string;
}
