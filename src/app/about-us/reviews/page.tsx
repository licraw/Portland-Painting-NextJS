import Image from "next/image";
import Review from "./Review";

export default function ReviewsPage() {
  const reviews = [
    {
      text: "I could not be happier with PPR, they have painted the inside of my home and did a fabulous job. The color choices from the color coordinator were perfect. I have had a year of bad painting experiences, being ripped off by people not completing their work and then charging for any additions to touch up their bad work. I finally sought out more professional workmanship via PPR and my expectations were 100% met. Alex made sure I was happy with every part of the job. He made sure I was happy with colors, costs, and all finishing touches being perfect. My costs stayed well within reason even with adding on many touch-ups for PPR to fix from previous painters.",
      author: "Kristonn C, Portland, Oregon"
    },
   
    {
      text: "This is my second time using Portland Painting and Restoration, and once again, I’m a very satisfied customer. I got four bids, and they had the best price, and I already knew they did stellar work so it was an easy choice.",
      author: "Joan B, Portland, Oregon"
    },
    {
      text: "My painter this time was Zsolt, and there aren’t enough superlatives to describe him: highly-skilled, hard-working, easy to be around, and super-accommodating. Portland Painting is one of the few businesses left in Portland where customer service comes first. Lexi, the office manager, didn’t blink an eye during my daily calls to change the scope of the job or to get advice on color matching.",
      author: "Bob Hogstrom, Portland, Oregon"
    },
    {
      text: "If you’re looking for professional painting at a fair price, talk to Portland Painting. An added bonus–they have carpenters on staff. I didn’t need carpentry work this time, but I had some base molding added last time, and the carpenter, Dann, does excellent work.",
      author: "Dylan Crawshaw, Portland, Oregon"
    },
    {
      text: "Very happy with my choice to work with Portland Paint & Restoration. The communication and bid process with Alex went smoothly. The work came out better than I could have hoped with an exceptional follow-up process. Would absolutely work with this team again!",
      author: "Cory, Portland, Oregon"
    },
    {
      text: "Max and his team were total pros. They got the job done in under the time they had estimated and were polite, professional, friendly, and clean throughout the process. They showed up on time every day, gave great advice along the way when we had choices to make, and showed amazing attention to detail. We couldn’t be happier with the end result! The house is gorgeous.",
      author: "Anne W, Portland, Oregon"
    },
    {
      text: "We couldn’t be happier with our experience with PPR. The office staff was very upfront with everything, they were excellent communicators, very professional, and overall just a pleasure to work with. The staff that worked on our house from start to finish was also wonderful, trustworthy, and did an excellent job. I would recommend them to anyone and we will definitely use them in the future for other projects! Thank you, PPR for treating us like it was your own house! :)",
      author: "Emily L, Portland, Oregon"
    },
    {
      text: "Highly recommend! PPR recently restored and painted the main level of our 1912 craftsman home and we’re very happy with the finished project. The entire staff and crew were very professional, responsive, and communicated with us each step of the way. Everyone was easy to work with and took great care in our home. I wish this was on a scale of 10 stars because 5 doesn’t seem like enough!",
      author: "Lynette Hamilton, Portland, Oregon"
    },
    {
      text: "Portland Painting and Restoration is 5+ stars from start to finish! The entire process was professional and supportive. The work well above the highest star review rating from the initiation of my project team, to the onsite crew… I am beyond pleased with the amazing outcome and transformation of my home. My color selection process was extensive. PPR would likely agree I was methodical and as mentioned to me by one of their management team, a process they do not commonly see. I took matters into my own hands committing plenty of time to evaluate colors I was drawn to by striping the front, back, and trims of my home with potential color. I did not rush the process as I wanted my selection to feel RIGHT. My final selection for the base, foundation, and trim coupled with PPR’s flawless ability to prep, paint, and trim out, based on my colors, is nothing short of perfect.",
      author: "Christie Rae, Portland, Oregon"
    },
    {
      text: "The lead painter for my home, Rich, was the only painter I’ve ever met that had such attention to detail and awareness of what looks good. He was a hard worker and really made everything look above and beyond what would be expected. I plan to have both Rich and Alex organizing the painting of the exterior in May and could not be more excited!",
      author: "Kris D, Portland, Oregon"
    },
  ];

  return (
    <section className="max-w-5xl mx-auto my-12 p-10 bg-gray-50 border border-gray-200 rounded-lg shadow-xl">
      <h1 className="text-4xl font-bold text-center text-green-900">Customer Reviews</h1>
      <p className="text-center text-gray-700 mb-6">See what our customers say about their experiences with Portland Painting and Restoration.</p>
      <div className="flex justify-center mb-6">
        <Image
          src="/googlereviews1.png"
          alt="Google Reviews"
          width={150}
          height={50}
          className="rounded-lg"
        />
      </div>
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <Review key={index} text={review.text} author={review.author} />
        ))}
      </div>
      <p className="text-center text-gray-700 mt-8">
        Have feedback? {" "}
        <a href="/contact" className="text-green-700 font-semibold hover:underline">Contact us</a> to share your thoughts.
      </p>
    </section>
  );
}


