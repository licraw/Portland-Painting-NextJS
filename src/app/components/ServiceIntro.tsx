"use client";

type ServiceIntroProps = {
  heading: string;
  children: React.ReactNode;
};

export default function ServiceIntro({ heading, children }: ServiceIntroProps) {
  return (
    <section className="py-12 px-6 lg:py-16 lg:px-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{heading}</h2>
        <div className="mt-4 text-gray-700 text-base lg:text-lg leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  );
}
