type ServiceHeroProps = {
  title: string;
  subtitle: string;
  backgroundImage?: string; // Optional background image
};

export default function ServiceHero({
  title,
  subtitle,
  backgroundImage,
}: ServiceHeroProps) {
  return (
    <div
      className={`relative flex items-center justify-center text-center text-white h-64 lg:h-96`}
      style={{
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl lg:text-5xl font-bold">{title}</h1>
        <p className="mt-4 text-lg lg:text-xl">{subtitle}</p>
      </div>
    </div>
  );
}
