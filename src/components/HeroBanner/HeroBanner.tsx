const HeroBanner = () => {
  return (
    <section
      style={{
        backgroundImage: "url('/hero-image.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="h-screen pt-32 pl-20"
    >
      <div className="flex flex-col">
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl">
          Your workspace.
        </h1>
        <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl">
          Reinvented.
        </h1>
      </div>
    </section>
  );
};

export default HeroBanner;
