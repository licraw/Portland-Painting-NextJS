import Image from "next/image";
import Review from "./Review";
import Head from "next/head";

export default function ReviewsPage() {
  const reviews =
    [
      {
        "text": "After an unfortunate experience with a soft washing service that stripped the paint off of our exterior trim – Portland Painting & Restoration came out to survey the damage. From the first visit until the final review with the owners son, this company covers all of their bases with quality professional care.\n\nThe painting + prep crew was respectful of our property, efficient and meticulous! They paid great attention to detail and went above and beyond my expectations.\n\nIf you need painting done, I cant recommend this family-owned business enough. Their commitment to quality and customer care truly sets them apart. They will be my first call for all future projects for our home and my first recommendation for any who ask.",
        "author": "Mel Jimenez"
      },
      {
        "text": "Portland Painting and Restoration did an awesome job on my house this year. I am so happy with the work that was done, inside and out. Their attention to detail, professionalism, and dedication to getting the job done right was so impressive! I highly recommend this company.",
        "author": "Joy Williams"
      },
      {
        "text": "Recently worked with PDX Paint and Restoration to have some carpentry and painting done on our home. Quote and timeline were reasonable. Communication ahead of and during the project was great. Sequencing between the carpentry and painting teams worked well. The painters and carpenters were professional and honest about what work needed to be done vs. what could be deferred. Would recommend and will be back to work with them again for future projects.",
        "author": "Garet Voit"
      },
      {
        "text": "Great local business! The folks we worked with were great - from the PM (Alex), to carpentry (Dave), to the painting crew (Abraham, Gilberto, Juan, and Mynor). Everything from communication to on-site work to accommodating our minor last minute schedule change - was handled smoothly and professionally. We are delighted to select PP&R again for another project next year :)",
        "author": "Trang Weitemier"
      },
      {
        "text": "Portland Painting & Restoration did a fantastic job painting our house! We had never gotten our house painted before and had no idea what colors we wanted. But Renae, our color consultant from PP&R, was a huge help in guiding us through the process of selecting colors. Lexi, our scheduling contact at PP&R, kept everything running smooth and kept us informed at every step. PP&R brought in their own carpenters to help us fix some dry rot before the painting, and the painting itself went great! The painters, Angel, Mynor, Flor and Abraham were very professional and did excellent, precise work for the big job that we gave them. All in all, we couldn't have asked for a better job and will definitely be using them in the future!",
        "author": "Jonathan Salomon"
      },
      {
        "text": "I worked with this company on a remodel and I have to say the job had some hiccups.\n\nMy building was broken into while they were doing the job and we also don’t live close to the property so that provided some challenges.\n\nI worked with Alex to fix the things that came up. He was great! When my building was compromised and I was 2 hours away, I didn’t know how to fix the broken glass and after a long work day for him he said “do you want me to go get the supplies to board up your window?” I mean I didn’t even think to ask him to do this but yes, please!\n\nThe way he communicated all the things that came up and also met me in person to go over the job at the end he really won us over for painters in the portland area.\n\nAll our homes and businesses will be done by this company and my business will be referring this company to everyone as well.\n\nWell done Alex & portland painting.",
        "author": "Tamara Young"
      },
      {
        "text": "Portland Painting and Restoration is 5+ stars from start to finish! The entire process was professional and supportive. The work well above highest star review rating from the initiation of my project team, to the on sight crew... I am beyond pleased with the amazing outcome and transformation of my home. My color selection process was extensive. PPR would likely agree I was methodical and as mentioned to me by one of there management team, a process they do not commonly see. I took matters into my own hands committing plenty of time to evaluating color's I was drawn to by striping the front, back and trims of my home with potential color. I did not rush the process as I wanted my selection to feel RIGHT. My final selection for base, foundation and trim coupled with PPR flawless ability to prep, paint and trim out, based on my colors, is nothing short of perfect.\n\nI highly recommend this company, with confidence, your experience will be similar to mine.\nPositive\nResponsiveness, Punctuality, Quality, Professionalism, Value",
        "author": "Christie Rae"
      },
      {
        "text": "\"We’ve partnered with Portland Painting for several years and continue to be impressed by their exceptional work. Their pricing is fair, and their team is not only highly professional but also approachable and easy to work with. They consistently set a high standard, and demonstrate a strong commitment to quality and client satisfaction. An outstanding business all around!\"",
        "author": "Ryan Ybarra"
      },
      {
        "text": "We contracted with Portland Painting & Restoration to paint the exterior of our house. On the scheduled day the painters Angel and Mynor arrived and after introductions they set right to work. The next day Dan the carpenter arrived and did the needed repairs. All the work was completed with quality in mind.\nWe are thoroughly pleased with the results and have received compliments from several of our neighbors. We would highly recommend this company!",
        "author": "Joan Hamilton"
      },
      {
        "text": "Portland Painting and Restoration is one of the best contractors we have worked with, and there have been many over the years. The quality of their work is outstanding. We met them at the home show and hired them to paint our living room, dining room and bath. The trim in our 100 year old house was in bad shape, chipped and gouged with the original dark wood exposed in places. PP and R worked miracles with that trim. I never dreamed it could be so buttery smooth and gorgeous. We were so pleased that we hired them to paint the exterior of our house and they didn't disappoint. Then, we hired them to strip and re-stain our cedar fence. Time and again, they demonstrated their commitment to doing the job right even if that meant redoing a few things at no additional cost. The estimator, Alex, and painting crews were awesome, including Abe, Nathan, Jesse, Jose, Szolt, and others whose names we didn't catch. They were so pleasant, hard-working and professional that even our neighbors commented on it. And the level of communication was far beyond what we are used to with contractors. The estimating and bidding process was very transparent and they kept us in the loop with an ongoing group text chat. That level of open and honest communication is rare, indeed. We highly recommend Portland Painting and Restoration.",
        "author": "Tony Thompson"
      },
      {
        "text": "We had a wonderful experience working with Portland Painting and Restoration (PPR). We had PPR paint our original wooden windows, which included coordination with a specialized window company, painting the windows at PPR's shop, and painting the sills, jambs, etc, at our home. Every aspect of this work was executed impeccably. The logistics people at PPR are amazing; everything was coordinated well and completed on schedule. The paint work is phenomenal; we are super impressed and so were the window experts. PPR was flexible and allowed us to update the project scope several times, which was very helpful because we were learning a lot during the process. All of the employees we interacted with were knowledgeable, professional, and kind. Overall totally excellent; looking forward to working with them again.\n\nPictured: fully painted windows partway through reinstall. Note the amazing detail work on the upper lights.",
        "author": "Aryeh&Matt"
      },
      {
        "text": "Portland Painting & Restoration did an excellent job painting the exterior of our home in Portland. Their work was timely, efficient, neat and first-rate work. Dealing with the staff, including their representative Alex Douglas, went very well and smoothly with timely and clear explanations and updates from the beginning to the end of the project. Based on our home painting experience, we would highly recommend them for any painting & restoration project.",
        "author": "Joseph Chamie"
      },
      {
        "text": "We own two historic homes in Uptown Vancouver, both over 100 years old. Portland Painting & Restoration completed both jobs over the past two years with expert skill and care. From estimate to careful lead-based paint removal to final walk-through, every employee we encountered was professional, friendly, and very knowledgeable. Their color consult advice proved to be spot-on and I've received nothing but raves from my neighbors. The house is cheery and warm and really shines on its elevated corner lot. The crews showed up when scheduled and completed the job as promised and then some. I particularly appreciated the fact that they have skilled carpenters who were able to replace one window, and some window trim, ​and siding as needed. Not all painting companies have the confidence and resources to paint old homes, but Portland Painting & Restoration fills that​ niche better than anyone I've used.",
        "author": "Michele Wollert"
      },
      {
        "text": "The Portland Painting crew were bright, hardworking, and knowledgeable. They did incredible prep work. I plan on using them for some interior work soon.",
        "author": "John Calhoun"
      },
      {
        "text": "Portland Painting and Restoration did an absolutely stunning job on repainting my old house and staining my new deck. Their lead, Colby, was intelligent, efficient and kind. The workmanship was excellent. Wonderful, wonderful work.\nPositive\nResponsiveness, Punctuality, Quality, Professionalism",
        "author": "Susan Pease Banitt, LCSW"
      },
      {
        "text": "Oscar and his team did a great job painting our house. The project was done on time and we are very happy with the workmanship. We also had carpentry work done by PPR which we are also very pleased with. Josh did a great job enclosing our front porch with rails and rebuilding our back steps. Everyone was a pleasure to have around and we would absolutely recommend PPR.",
        "author": "Athena Ashe"
      },
      {
        "text": "Richard and his crew were AMAZING! Beyond doing a comprehensive and stellar job painting in a time-efficient, safe, and tidy way, they were so kid-friendly. My 3 and 5 year old enjoyed watching them from the windows and cheering them on every step of the way; the Portland Painting & Restoration crew was interactive, kind, and playful with them, which made the overall experience so delightful.",
        "author": "olivia murray"
      },
      {
        "text": "What an amazing experience. I was nervous about having my fireplace whitewashed. However the team at Portland Painting and Restoration helped to ease my nerves by answering all of my questions. I even had access to one of their partner carpenters if I wanted to upgrade my existing shelving on my fireplace, which was a plus! The end project was more than I could have hoped for. The painter did an excellent and thorough job.\n\nThanks again for taking care of my fireplace!",
        "author": "Sharnissa Secrett"
      },
      {
        "text": "PP&R recently completed 2 jobs for us. The first was stripping and re-staining of our house exterior and stripping of our deck. The second was some drywall/ceiling repair and painting inside our home. Stellar job on both! The company is very customer-service oriented and has excellent communication. Working with Alex and Gilberto on both projects was a pleasure, and they are both quite expert in their skills. The company was very clear on timelines and process, and everything went very smoothly. And the results exceeded expectations. Really can't say enough good things about this company and their people. We will be using them going forward for additional projects as they may come up.",
        "author": "Rich Koesel"
      },
      {
        "text": "Portland Painting and Restoration refinished our front door and slat ceilings over front and back patio. We had a great experience working with them from start to finish - excellent communication, organized, professional, and lovely results. We will definitely reach out to them for future projects!\nPositive\nResponsiveness, Punctuality, Quality, Professionalism",
        "author": "Chelsea Tieszen"
      },
      {
        "text": "From start to finish, Portland Painting and Restoration was amazing to work with. The office staff, project leads, carpentry contractors, and painters were all so nice and professional. They went out of their way to make sure our expectations were met. Our house looks amazing, and it was a huge project! Highly recommend\nPositive\nResponsiveness, Punctuality, Quality, Professionalism\n\n\nServices\nExterior painting",
        "author": "Heather Fellers"
      },
      {
        "text": "There are already plenty of great reviews of Portland Painting & Restoration. I'm here to add my rave review.\n\nOur house is over 130 years old, and we hadn't had it painted for more than 15 years. As it turned out, the house needed quite a bit of carpentry work, particularly on the south-facing wall. Dann and his crew did a fantastic job -- so good that now the house is completely painted, you can't see any of the repairs. It looks like the house was perfect to start with.\n\nAlex was responsive, professional, friendly and helpful from the very beginning. He walked around with us when we asked the company to bid the job, identified some issues we hadn't considered, and made sure the whole project went smoothly. Lexi kept us informed throughout the process, which was important in a year when exceptionally late and abundant rain messed up all kinds of schedules for outdoor work. She was, like Alex, friendly, responsive and professional throughout the project.\n\nOur painting crew -- lead painter Zsolt, plus Cedric and Robin -- were fantastic. Their attention to detail was unparalleled, in my experience. They had to work under really adverse conditions, too -- one of the hotter heat waves we've had in Portland. They let us know they were going to need to start work at 7 AM and finish early each day due to the extreme heat, yet they still got the project finished on time and with everything looking as good as if they'd had perfect weather.\n\nThe crews were very respectful and careful of our garden, and they tidied up after themselves every day, and at the end of the job.\n\nI can't say enough good things about PP&R. Though their bid was high, the work was worth every dollar. Thank you PP&R for making our house look fantastic, and keeping it in good shape for the next decade or so.\n\nUPDATE: We had the interior of our condo painted in January-February 2023, five months after the house exterior described above. After seeing the excellence of PPR's work on the house, we were sure they'd do a great job on the condo. We were right, and we couldn't be more pleased.\n\nThe team we had this time -- Gilberto, John, Marlon and Luke -- were as skilled and careful as the crew who worked on the house exterior. They called us immediately when they needed information, making sure they wasted no time, and completed it right on schedule.\n\nLuke followed up on the last details and cleaned the place thoroughly. He also came back a couple of weeks later to fix a few small details that needed attention -- we didn't see them until later -- and we'd also arranged with PPR to have Luke help us hang some art in a tall and difficult space.\n\nAs with our prior job, Alex did a fantastic job with the estimate -- there were no surprises -- and Lexi kept us up to date on every change (and one delay when everyone, unfortunately, got sick). PPR proved once again that it's a truly excellent firm, with great people who are professional, friendly and so knowledgeable.\nPositive\nResponsiveness, Quality, Professionalism\n\n\nServices\nExterior painting",
        "author": "Aliza Earnshaw"
      },
      {
        "text": "We required a full painting and restoration inside and out on our 1924 craftsman bungalow. PPR did a spectacular job. The quality of the work is excellent. They are wonderful at communicating clearly. They are professional and courteous. They work quickly but nothing is rushed. You can ask as many questions as you like and they are always accommodating and flexible. The three professionals who worked on the outside of my house -- Max, Ritchie, and Joel -- we're all very pleasant to work with: positive, courteous, kind, and funny. They made me feel very comfortable and confident. I could not recommend them more highly.\nPositive\nResponsiveness, Punctuality, Quality, Professionalism, Value",
        "author": "Becko Copenhaver"
      },
      {
        "text": "I live in a condo and serve on the HOA board. As maintenance chair I value a contractor I can depend on to give the owners good work for their money. I really trust Portland Painting&Restoration to work on the older buildings and respect the different owners that live here. The employees this season have been great. Communication has been excellent which makes my job so much easier. Highly recommend this Portland business.\nPositive\nResponsiveness, Quality, Professionalism\n\n\nServices\nWood staining, Exterior painting",
        "author": "Marlene Rooney"
      },
      {
        "text": "I hired PP&R to do a complete exterior restoration and painting of my 1898 house in Goose Hollow. It was an extensive project that took roughly six weeks to complete. I have to say I have NEVER dealt with a more competent, professional and talented group of people. From their office staff, carpenter team and painting team they are as good as they come.\n\nThey gave me a bid, did exactly what they said they were going to do in the time they said they were going to do it, and at the price originally outlined. Never was there a day that no one showed up or was late arriving.\n\nI simply could not recommend them enough. If you are looking for true professionals who know their craft, and care about your home, you found them here!!\n\nMy home looks absolutely perfect and I couldn’t be more pleased.\nPositive\nResponsiveness, Punctuality, Quality, Professionalism, Value\n\n\nServices\nWater damage repair, Exterior painting, Service not listed",
        "author": "Gary C"
      },
      {
        "text": "I had the exterior of my two story house painted. There were some areas of peeling paint what needed some extra prep work. Benjamin and his crew did a fantastic job from start to finish. Each day the crew arrived on time and worked a full work day until the sun went down. They always cleaned everything up at the end of each day and removed all debris. The crew was always courteous and asked if I was fully satisfied as the job progressed. I never had any concerns or complaints. Benjamin is very knowledgeable and made good recommendations of what needed to be done for a professional long lasting paint job. Even after almost 3 years since the painting job was done my house still looks fantastic. Thank you for a quality job from start to finish. I will use you again for future work.",
        "author": "Scott Hagele"
      },
      {
        "text": "Fantastic experience from start to finish. Our house is fairly large and old so it was a huge job and I wanted it done right. Alex came out to give a quote in February. He was very thorough and explained everything that would be done - also flexible in offering different paint options and price comparisons for additional add ons. The quote was neither the lowest nor highest I received (I got 5 quotes, they were right in the middle). The team that came out both for the wood restoration and painting were top notch. Our house is 100 years old and the repaired or replace a number of historical cornices for a very reasonable cost. The paint team - what can I say...they were incredibly professional, polite, competent and did such a thorough job we had 4-5 neighbors come by with complements. The prep work was astounding and our house looks fantastic. I cannot recommend highly enough.",
        "author": "David Mayhew"
      },
      {
        "text": "Another company had renovated our kitchen. When the work was going on, we needed consultation from another company because what our contractor was telling us didn't add up. My girlfriend found Alex from Portland Painting & Restoration and he was very helpful in explaining few things to us.\n\nOnce the work was finished at our house, we asked Alex if he could come by and help quality check the work our contractors did. Alex came out to our home in person and free of charge.\n\nWe really appreciated that Alex took time out of his day to help us even though he wasn't working for us. Would highly recommend!\nPositive\nPunctuality, Professionalism",
        "author": "Sobir"
      },
      {
        "text": "This is my second house painted by PP&R over the past 2 years. I've had nothing but positive experiences with this company and all of their office staff and painters. Ricardo and the crew did a super quality job with the preparation and all the details that are required in a top quality paint job. On the last day, we looked at all parts of the house to discuss the little things that needed attention to make it perfect. Highly recommended!",
        "author": "Barry Reeves"
      },
      {
        "text": "PP&R just finished painting our 110 year old house. They did an amazing job, it looks stunning. Every step was professional, on time and as promised. Our paint team was lead by John, carpentry by Dan and logistics with Lexi - We couldn’t have asked for a better experience!\nPositive\nResponsiveness, Punctuality, Quality, Professionalism, Value\n\n\nServices\nExterior painting",
        "author": "K. Crawford"
      },
      {
        "text": "Highly recommend! PPR recently restored and painted the main level of our 1912 craftsman home and we're very happy with the finished project. The entire staff and crew were very professional, responsive, and communicated with us each step of the way. Everyone was easy to work with and took great care in our home. I wish this was on a scale of 10 stars, because 5 doesn't seem like enough!",
        "author": "Lynette Hamilton"
      },
      {
        "text": "Following the stripping of deteriorating paint from the entire house exterior by another company, Portland Painting and Restoration took over ... and we could NOT be more pleased with their effort! Following some skilled carpentry prep work and over a period of nearly two weeks, their crew of three tireless painters did wonders for our home's appearance. They arrived exactly on time early each morning, worked steadily with few breaks, kept us informed of their progress throughout, were exceedingly friendly and polite, took tremendous care with our property, provided good advice regarding ongoing upkeep, and cleaned up thoroughly at the end of each workday. Finally, the very few issues that were noted at the time of the final walk-thru with the company owner were promptly remedied.\n\nThese workers clearly demonstrated their skill and professionalism in all aspects of the project and we feel that the end result MORE than justifies the cost of this renovation. Good communication was maintained with the front office personnel from start to finish and we feel that, had we encountered any real problems, we always knew to whom to turn for resolution. We would recommend Portland Painting and Restoration without reservation to anyone who wants their project completed RIGHT the first time!",
        "author": "Kenneth Klesh"
      },
      {
        "text": "Recently had our house painted by Portland Painting and Restoration. Excellent experience. Excellent company. Contract was thorough and thoroughly observed. Change orders were submitted as (expected) problem areas were discovered problem areas. Process was interactive with questions, concerns, and suggestions discussed. Prep work was excellent, including carpentry, cleaning, sanding, caulking, priming. Paint looks good, covers very well. Very happy with the result. Workers and work crews were personable and professional. Highly recommend; I'd use again.",
        "author": "PatOrMonty Scott Carey"
      },
      {
        "text": "We were very impressed by PPR. We had the exterior of our 1940 SW portland home completely restored--all old paint removed (by a PPR companion organization) and then restoration by PPR. This included re-sinking all nails, replacing broken or damaged cedar planks, sanding, recaulking, re-sanding, priming, and 2 coats of high quality paint. This was a lot of man-hours. The two lead painters on our house, Jose and Alex, were outstanding. They treated it like their own house, working carefully and patiently on every nook and crevice. A neighbor commented he had never seen a house worked on so carefully. I tend to be a picky person with lots of questions. PPR's team handled these patiently, flexibly and professionally. The result was outstanding--I had a friend who is a professional painter go over the house inch by inch with me and he was quite impressed. The exterior is as close to like-new as it could be with the original cedar siding, and decades of life have been added to the house. These are definitely the ones to go with if you want the A-team and top-of-the line work.\nPositive\nResponsiveness, Quality, Professionalism",
        "author": "JT Nigg"
      },
      {
        "text": "Liz (our lead painter) and her crew were fantastic: attentive to detail and skilled at their craft, easy to be around, straightforward with communicating. While painting the ceiling, Liz discovered a soft spot from some (resolved) water damage. She did an impeccable job fixing that and another damaged area; the patches disappeared into the ceiling.\nWe greatly appreciated that the company was very responsible with COVID precautions. In addition, we had warm, professional service at every touchpoint--Alex the estimator, Lexi at the office and Randy the project manager. Bottom line, as my husband put it, \"Beautiful work. Pleasant to have in the house. Highly recommend!\"\nPositive\nResponsiveness, Punctuality, Quality, Professionalism, Value\n\n\nServices\nWater damage repair, Door painting, Interior painting",
        "author": "Janet Filips"
      },
      {
        "text": "We’ve had PPR do several jobs for us (big and small) over more than a decade. Always high quality work. Crews have always been skilled, efficient, and friendly. Luke and Max on our most recent job were delightful to work with. Fun, friendly, and finished ahead of schedule!\nPositive\nResponsiveness, Punctuality, Quality, Value",
        "author": "Michael Garland"
      },
      {
        "text": "I have used the services of Portland Painting & Restoration for several projects. Each project, no matter the size, was attend to with the same high degree of professionalism, knowledge and attention to detail. Ben listened carefully to what I wanted, made suggestions, allowed me time to decide what I wanted and at the end of the project I have beautiful home. Ben was very fair in his quote and did not charge more than what was quoted, clean up was excellent and all unused product I wanted to keep was stacked neatly away for me. His team completed the work on schedule and the end result of their work outstanding.",
        "author": "J J"
      },
      {
        "text": "Portland Painting did an amazing job doing some repair and repainting work on our home. They were great communicators and very professional throughout the project. Couldn't recommend them highly enough!\nPositive\nResponsiveness, Punctuality, Quality, Professionalism\n\n\nServices\nDoor painting, Siding painting, Wood staining, Exterior painting, Deck painting",
        "author": "Gabrielle Jacobs"
      },
      {
        "text": "Super professional crew, from front office to painters. Extremely detail oriented, very satisfied with both their interior and exterior painting. Highly recommend!",
        "author": "Tina Gjovik"
      },
      {
        "text": "Ben and his team are simply awesome! The upstairs of our 1927 SE PDX Bungalow had been given a hasty and sloppy makeover by the previous owners. Ben and his team came in stripped the paint/stain mixture off of all the windows, sills, trim in 2 bedrooms, foyer and stairwell.\n\nThey understood our desire to keep the original windows and glass (despite their flaws) and didn't try to sell us on something new. It was a relatively small project and often that means you are a low priority with most contractors but not these guys. They treated my house like their own.\n\nI can't say enough about the team. They were always here on time, polite, hardworking and they were sweet to my dogs, even taking our new puppy out to go potty on their breaks.\n\nWe liked them so much that I had them paint these rooms (a job I would normally do myself).\n\nWe will be hiring them again this spring for some work in our bathroom.",
        "author": "Mary Lohnes"
      }
    ];

  return (

    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Customer Reviews | Portland Painting & Restoration</title>
        <meta
          name="description"
          content="Read what our customers have to say about their experiences with Portland Painting & Restoration. Discover why we’re rated 4.9 stars for quality, professionalism, and exceptional service."
        />
        <meta
          name="keywords"
          content="customer reviews, testimonials, Portland Painting & Restoration, painting reviews, restoration reviews, quality painting, professional painters, customer satisfaction"
        />
        <link rel="canonical" href="https://www.paintpdx.com/reviews" />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content="Customer Reviews | Portland Painting & Restoration" />
        <meta
          property="og:description"
          content="Read what our customers have to say about their experiences with Portland Painting & Restoration. Discover why we’re rated 4.9 stars for quality, professionalism, and exceptional service."
        />
        <meta property="og:image" content="https://www.paintpdx.com/logo.png" />
        <meta property="og:url" content="https://www.paintpdx.com/reviews" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Customer Reviews | Portland Painting & Restoration" />
        <meta
          name="twitter:description"
          content="Read what our customers have to say about their experiences with Portland Painting & Restoration. Discover why we’re rated 4.9 stars for quality, professionalism, and exceptional service."
        />
        <meta name="twitter:image" content="https://www.paintpdx.com/logo.png" />
      </Head>

      <section className="max-w-5xl mx-auto my-12 p-10 bg-gray-50 border border-gray-200 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-center text-green-900">Customer Reviews</h1>
        <p className="text-center text-gray-700 mb-6">
          See what our customers say about their experiences with Portland Painting and Restoration.
        </p>

        {/* Cool 4.9 Rating Display */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-3xl font-extrabold text-green-900 mr-2">
            4.9
          </span>
          <div className="flex items-center mr-4">
            {/* 5 Gold Stars (use any icon you prefer) */}
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-6 w-6 text-yellow-500 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.431 8.21 1.192-5.93 5.776 1.401 8.168L12 18.896l-7.349 3.858 1.401-8.168-5.93-5.776 8.21-1.192z" />
              </svg>
            ))}
          </div>
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
          Have feedback?{" "}
          <a href="/contact" className="text-green-700 font-semibold hover:underline">
            Contact us
          </a>{" "}
          to share your thoughts.
        </p>
      </section>
    </>
  );
}

