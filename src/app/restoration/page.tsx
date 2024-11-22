import ServiceHero from "../components/ServiceHero";
import ServiceIntro from "../components/ServiceIntro";

export default function RestorationPage() {
  return (
    <div>
      {/* Hero Section */}
      <ServiceHero
        title="Restoration Services"
        subtitle="Reviving the beauty and integrity of your home."
        backgroundImage="/gallery/restoration1.jpg"
      />

      {/* Intro Section */}
      <ServiceIntro heading="Our Restoration Services">
        <p className="mb-8">
        Here in the Pacific Northwest, buildings are subject to constant moisture that over time can degrade their integrity. Exterior restoration may be necessary if a building is experiencing chronic failure; chronic failure is typically identified as an area where the substrates are failing and not sound enough to hold the tension of new paint. An example would be an area, typically exposed to the sun where you see bubbles or sheathing of paint, and another coat of paint is probably the last thing needed and definitely a waste of your resources as these areas will never perform unless we get back down to a sound substrate, of which usually incorporates the removal of the paint.
        </p>
        <p className="mb-8">
        The key to a successful restoration is first understanding the root of the problem. This could be the integrity of the initial prime coat itself as a 100 year old layer is very fragile, the level of adhesion between the various coats of paint, an inferior product at some layer, or most often condensation build up as the previous painter caulked and sealed up the whole wall of which is suppose to breath. Selecting the proper materials and procedures is imperative to select the proper solution to the root issue, rather than just treating the symptoms, of which never covers the liability adjacent to the visible issues.
        </p>
        <p className="mb-8">
        If your building or deck is in need of repairs in order to protect its value- We can help. Each solution will be tailored to the specific needs of each individual project.
        </p>
      </ServiceIntro>
    </div>
  );
}
