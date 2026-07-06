import { MapPin, Mail, Phone, Clock } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

export const metadata = { title: "Contact | Kalpataru Constructions" };

export default function ContactPage() {
  return (
    <>
      <section className="bg-charcoal text-concrete blueprint-grid py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="font-mono text-xs tracking-[0.25em] text-safety mb-4">CONTACT</div>
          <h1 className="font-display text-4xl sm:text-6xl max-w-3xl leading-[1.05]">
            Let&apos;s talk about your site.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid lg:grid-cols-3 gap-14">
        <div className="lg:col-span-2">
          <InquiryForm variant="contact" />
        </div>
        <div className="space-y-6">
          <ContactRow icon={<MapPin size={18} />} label="Corporate Office" value="Bandra Kurla Complex, Mumbai, Maharashtra 400051" />
          <ContactRow icon={<Phone size={18} />} label="Phone" value="+91 22 4000 1234" />
          <ContactRow icon={<Mail size={18} />} label="Email" value="projects@kalpataruconstructions.in" />
          <ContactRow icon={<Clock size={18} />} label="Office Hours" value="Mon – Sat, 9:30 AM – 6:30 PM IST" />
        </div>
      </section>
    </>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-4 border-l-2 border-safety pl-4">
      <span className="text-safety mt-0.5">{icon}</span>
      <div>
        <div className="font-mono text-xs tracking-wider text-charcoal/40">{label.toUpperCase()}</div>
        <div className="mt-1 text-charcoal/80">{value}</div>
      </div>
    </div>
  );
}
