// Example usage in a page or another component

import Banner from "./components/Banner";

export default function HomePage() {
  return (
    <div>
      <Banner
        imagePath="https://paintpdx.com/wp-content/uploads/2018/02/iStock-592031050.jpg"
        cta="Get Estimate"
        description="Portland Painting and Restoration is one of Portland and Vancouver’s premier repair, light remodel, and finish contractors."
      />
    </div>
  );
}
