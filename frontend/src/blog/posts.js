/**
 * Blog posts for Marcivo — the single data file the blog job appends to.
 * Mirrors the TeraPlayer blog: the same posts are published here as on
 * TeraPlayer, at /blog/<slug>.
 *
 * HOW TO ADD A POST (blog job):
 *  1. Prepend a new object to the `posts` array (newest first).
 *  2. `slug` must be unique, lowercase, kebab-case, and match the post's URL:
 *     /blog/<slug>. Never reuse a slug, even for a revised post.
 *  3. `date` is YYYY-MM-DD (the publish date). `excerpt` is one sentence.
 *     `image` (optional but preferred) is a high-quality cover image URL that
 *     loads publicly, with `imageAlt` describing it. Use the real poster or
 *     official image for a movie/show/game when one exists, otherwise a good
 *     topical image; never a broken, low-resolution, or watermarked image.
 *  4. `sections` is an ordered list of content blocks. Supported block types:
 *       { type: "p", text: "..." }                        paragraph
 *       { type: "h2", text: "..." }                       section heading
 *       { type: "h3", text: "..." }                       sub-heading
 *       { type: "list", items: ["...", "..."] }            bullet list
 *       { type: "steps", items: ["...", "..."] }           numbered steps
 *       { type: "faq", items: [{ q: "...", a: "..." }] }  FAQ pairs
 *     Keep text plain — no HTML, no markdown, no invented dates, features,
 *     prices, limits or statistics.
 *  5. Also add the new post URL (https://marcivo.teraplayer.in/blog/<slug>)
 *     to the sitemap core Set in backend/src/index.ts, so the cached
 *     sitemap served at /sitemap.xml includes it.
 *  6. Do NOT touch any ad code, ad component, or ad key. Blog pages sit
 *     inside the existing App shell, which already mounts the site's ads.
 *  7. When publishing the same post on TeraPlayer and Marcivo, prepend the
 *     identical post object to both repos' posts files (same slug, title,
 *     sections and image), and add its URL to each site's sitemap.
 */

export const posts = [
  {
    slug: "pubg-netflix-live-action-series-donald-glover",
    image: "https://cdn.cloudflare.steamstatic.com/steam/apps/578080/library_hero.jpg",
    imageAlt: "PUBG: Battlegrounds key art showing a player in a battleground landscape",
    title: "PUBG Netflix Series Announced: Donald Glover to Write, Direct and Star in Live-Action Adaptation",
    description:
      "PUBG Netflix series announced: Donald Glover will write, direct, executive produce and star in KRAFTON's live-action PUBG adaptation. No release date yet.",
    excerpt:
      "KRAFTON and Netflix have announced a live-action PUBG series, with Donald Glover set to write, direct, executive produce and star in it.",
    date: "2026-10-30",
    category: "Gaming",
    sections: [
      {
        type: "p",
        text: "The PUBG Netflix series is officially in development. KRAFTON and Netflix have announced a live-action television adaptation of PUBG: Battlegrounds, the battle royale game that popularised the genre, with Donald Glover attached to write, direct, executive produce and star in it. No release date, plot details or additional cast have been announced yet, so this is an early-stage announcement rather than a finished show ready to stream.",
      },
      { type: "h2", text: "PUBG Netflix series: what KRAFTON and Netflix announced" },
      {
        type: "p",
        text: "According to the announcement reported on October 29 and 30, 2026, PUBG is in development as a live-action series at Netflix. KRAFTON, the Seoul-headquartered company behind PUBG, is developing the series with its entertainment entity LV3H, which is involved in both development and production. The project is part of KRAFTON's push to expand the PUBG property beyond games into original entertainment content.",
      },
      { type: "h2", text: "Who is making the PUBG Netflix series" },
      {
        type: "list",
        items: [
          "Donald Glover will write, direct, executive produce and star in the series. He is best known for Atlanta and Community, and is a two-time Emmy and Golden Globe winner.",
          "Stephen Glover, his brother and Atlanta collaborator, will write and executive produce.",
          "Michael Schaefer (NEON TV) and Fam Udeorji (Gilga) will executive produce.",
          "Taeseok Jang and Sujin Lee will executive produce for LV3H, KRAFTON's entertainment arm.",
          "No other cast has been announced yet; Glover is the only confirmed actor.",
        ],
      },
      { type: "h2", text: "What is PUBG, and why a live-action series makes sense" },
      {
        type: "p",
        text: "PUBG, short for PlayerUnknown's Battlegrounds and now known as PUBG: Battlegrounds, launched in 2017 and became the game that brought the battle royale format to a global audience. In a typical match, 100 players drop onto a large map, gather weapons and supplies, and survive as the playable area keeps shrinking until only one player or team remains. The famous phrase winner winner, chicken dinner, shown when a player wins a match, has become part of gaming culture far beyond PUBG itself.",
      },
      { type: "h2", text: "Why Donald Glover is a surprising but fitting choice" },
      {
        type: "p",
        text: "Donald Glover is not the first name most gamers would have predicted for a PUBG adaptation, and that is part of why the announcement has travelled so fast. Glover created and starred in Atlanta, a series praised for mixing comedy, drama and surreal storytelling, and he has worked across television, film and music. A straight, military-style action retelling of PUBG would be the safe option. Glover's involvement suggests Netflix and KRAFTON may be aiming for something more character-led and distinctive, though that is an expectation based on his past work, not a confirmed creative direction for this series.",
      },
      { type: "h2", text: "PUBG Netflix series release date: what we know so far" },
      {
        type: "p",
        text: "There is no PUBG Netflix series release date yet. KRAFTON and Netflix have announced the project and its lead creative team, but they have not shared when filming will begin or when the series will arrive on Netflix. Because the project is only in development, with no plot or further casting announced, fans should expect a wait rather than a quick launch. The sensible way to follow it is to watch for the next official update: a plot synopsis, additional casting, or the start of production.",
      },
      { type: "h2", text: "What the PUBG Netflix series means for fans in India" },
      {
        type: "p",
        text: "PUBG has a complicated history in India, which is why this announcement is being followed closely by Indian gamers. PUBG: Battlegrounds itself is available in India on PC and console, while BGMI, or Battlegrounds Mobile India, is KRAFTON's sibling battle royale game made for players in India. A Netflix series, unlike a game, does not depend on which version is installed on your phone: if and when the PUBG Netflix series releases, it would stream on Netflix like any other Netflix original, subject to Netflix's usual availability in India.",
      },
      { type: "h2", text: "PUBG on screen before: the earlier animated project" },
      {
        type: "p",
        text: "This is not the first time a PUBG screen adaptation has been discussed. An animated PUBG project was announced years ago, with Adi Shankar attached, but that version went quiet and the new Netflix announcement makes no mention of it. The live-action series therefore appears to be a fresh start for PUBG on screen, with a new creative team and a new home at Netflix, rather than a continuation of the earlier animated plan.",
      },
      { type: "h2", text: "How to watch the PUBG Netflix series when it releases" },
      {
        type: "steps",
        items: [
          "Wait for an official release date from KRAFTON or Netflix; no date has been announced yet.",
          "When it is listed, search for PUBG on Netflix to find its official page and trailer.",
          "Add it to your watchlist on Netflix to get notified when it is available.",
          "Watch the official trailer when it drops; it will confirm tone and characters better than rumours.",
          "Follow KRAFTON and Netflix for casting and plot updates, not unverified leaks.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "Is there a PUBG Netflix series?",
            a: "Yes. KRAFTON and Netflix have announced a live-action PUBG series in development, with Donald Glover to write, direct, executive produce and star.",
          },
          {
            q: "Who is starring in the PUBG Netflix series?",
            a: "Donald Glover is the only confirmed actor so far; Stephen Glover will write and executive produce.",
          },
          {
            q: "What is the PUBG Netflix series release date?",
            a: "No release date has been announced yet; the series is in early development with no timeline shared.",
          },
          {
            q: "Will the PUBG Netflix series be available in India?",
            a: "Netflix originals normally stream in India, but this can only be confirmed once Netflix lists the series.",
          },
        ],
      },
    ],
  },
  {
    slug: "eetha-trailer-shraddha-kapoor-vithabai-december-4",
    image: "https://images.indianexpress.com/2026/10/eetha.jpg?w=1024",
    imageAlt: "Shraddha Kapoor as Vithabai performing Lavani on stage in Eetha",
    title: "Eetha Trailer Out: Shraddha Kapoor as Lavani Legend Vithabai, Release Date and Trailer Breakdown",
    description:
      "Eetha trailer out: Shraddha Kapoor plays Lavani legend Vithabai in Laxman Utekar's biopic, releasing in theatres on December 4, 2026.",
    excerpt:
      "The Eetha trailer is out: Shraddha Kapoor transforms into legendary Tamasha and Lavani performer Vithabai Bhau Mang Narayangaonkar in Laxman Utekar's biopic, releasing in theatres on December 4, 2026.",
    date: "2026-10-30",
    category: "Pop Culture",
    sections: [
      {
        type: "p",
        text: "The Eetha trailer is out, and it has quickly become one of the most talked-about Bollywood trailers of the day. Released on Friday, October 30, 2026, the trailer introduces Shraddha Kapoor as Vithabai Bhau Mang Narayangaonkar, the legendary Marathi Tamasha and Lavani performer whose life story is at the heart of this biographical musical drama. Directed by Laxman Utekar and backed by Maddock Films and Kathputli Creations, Eetha releases in theatres on December 4, 2026.",
      },
      { type: "h2", text: "Eetha trailer: what the trailer shows" },
      {
        type: "p",
        text: "The Eetha trailer opens where Vithabai lived her life: on stage. Shraddha appears in traditional Lavani attire, performing before a large, cheering crowd, with shots of audiences holding up lights and elaborate performance spaces setting the scale of the Tamasha world. The music, composed by Ajay-Atul, drives the stage sequences, and the trailer moves between grand public performances and quieter, more painful moments away from the spotlight, presenting Vithabai as both a celebrated artist and a woman carrying heavy personal struggles.",
      },
      {
        type: "p",
        text: "Two trailer dialogues have already stood out to viewers. In one, Vithabai says that her trust was her pride, and when that trust broke, everything broke with it, pointing to betrayal at the centre of her story. In another, she declares that even destiny cannot beat her in a dance battle, and that if she dies while dancing, she will become an example rather than being called helpless. The trailer also shows her defending her traditional Navvari saree, calling it the pride and identity of the Maharashtrian people, when someone questions her attire. Together, these moments frame Eetha as a story about art, dignity and survival, not just a rise-to-fame biopic.",
      },
      {
        type: "p",
        text: "The trailer also offers glimpses of Vithabai's family and personal relationships, with Randeep Hooda and Mohammed Zeeshan Ayyub in brief shots. Running for nearly three minutes, it traces her journey from early struggle through fame, and into the challenges she faces when the spotlight begins to fade.",
      },
      { type: "h2", text: "Who was Vithabai Narayangaonkar, the real Eetha?" },
      {
        type: "p",
        text: "Vithabai Bhau Mang Narayangaonkar was one of Maharashtra's most celebrated Tamasha and Lavani performers. Born in Pandharpur in 1935, she grew up in a family of folk artistes and began performing at a young age, eventually becoming a major force in Maharashtra's folk theatre tradition. One widely recounted story has her going into labour during a Tamasha performance, delivering her baby backstage, and preparing to return to the stage until the audience learnt what had happened and insisted she rest. That incident was also shown in the film's teaser, released earlier in 2026.",
      },
      {
        type: "p",
        text: "Behind the applause, Vithabai's personal life was far from easy. Accounts describe a troubled marriage in which her husband controlled her earnings and subjected her to abuse. She also faced financial difficulties late in life, and died in January 2002, with reports at the time saying her family struggled to pay her hospital bills. She had also worked for Tamasha artistes' welfare and helped secure pensions for them from the state government.",
      },
      { type: "h2", text: "Eetha trailer cast and crew" },
      {
        type: "list",
        items: [
          "Shraddha Kapoor as Vithabai Bhau Mang Narayangaonkar, the legendary Tamasha and Lavani performer.",
          "Directed by Laxman Utekar and written by Kshitij Patwardhan.",
          "Produced by Dinesh Vijan, Laxman Utekar and Karishma Sharma under Maddock Films and Kathputli Creations.",
          "Supporting cast includes Randeep Hooda, Mohammed Zeeshan Ayyub, Nana Patekar, Siddharth Jadhav, Anant Joshi, Akshara Singh and Ulka Gupta.",
          "Music and background score composed by Ajay-Atul, with cinematography by Akash Agrawal.",
          "The film reunites Utekar with Maddock Films after Luka Chuppi, Mimi, Zara Hatke Zara Bachke and Chhaava, and marks Shraddha's reunion with Maddock after the Stree franchise.",
        ],
      },
      { type: "h2", text: "Eetha release date: when does Eetha release in theatres?" },
      {
        type: "p",
        text: "Eetha is scheduled to release in theatres on December 4, 2026. The film was originally planned for an August 2026 release before being moved to December, and the trailer launch on October 30, held at an event in Mumbai, marks the start of its final promotional run. The trailer has received a UA 16+ certification and runs for approximately three minutes, giving audiences a substantial first look at the film's scale, performances and music rather than a short teaser-style glimpse.",
      },
      {
        type: "p",
        text: "For Shraddha Kapoor, Eetha is a clear departure from her recent mainstream work. After the blockbuster success of Stree 2 in 2024, this role places her at the centre of a performance-driven biographical narrative rooted in Maharashtra's traditions, with Lavani dance and folk music doing much of the storytelling. That shift is a big part of why the Eetha trailer is drawing attention.",
      },
      { type: "h2", text: "What to watch for in the Eetha trailer" },
      {
        type: "steps",
        items: [
          "Watch the opening stage sequences for how the film recreates the Tamasha world, from the costumes and choreography to the crowd's energy.",
          "Listen for the two standout dialogues about trust and about dying while dancing, which set up the film's emotional core.",
          "Look for the contrast between Vithabai's public triumphs and her private hardships, including her family relationships and financial struggles.",
          "Note the supporting cast in brief trailer shots, especially Randeep Hooda and Mohammed Zeeshan Ayyub, whose roles will shape the personal side of the story.",
          "Keep December 4, 2026 in mind: with the trailer out now, expect songs, posters and further promos in the weeks leading up to the theatrical release.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "When is the Eetha trailer out?",
            a: "The Eetha trailer was released on October 30, 2026, by Maddock Films, ahead of the film's theatrical release on December 4, 2026.",
          },
          {
            q: "Who does Shraddha Kapoor play in Eetha?",
            a: "Shraddha Kapoor plays Vithabai Bhau Mang Narayangaonkar, the legendary Marathi Tamasha and Lavani performer, in Laxman Utekar's biographical drama.",
          },
          {
            q: "When does Eetha release in theatres?",
            a: "Eetha is scheduled to release in theatres on December 4, 2026. It was originally planned for August 2026 before being moved to December.",
          },
          {
            q: "Who directed Eetha?",
            a: "Eetha is directed by Laxman Utekar, written by Kshitij Patwardhan, and produced by Dinesh Vijan, Laxman Utekar and Karishma Sharma under Maddock Films and Kathputli Creations.",
          },
        ],
      },
    ],
  },
  {
    slug: "elder-scrolls-vi-sentinel-reported-title-hammerfell-november",
    image: "https://www.dexerto.com/cdn-image/wp-content/uploads/2026/08/12/Elder-Scrolls-6-fans-convinced-theyve-uncovered-the-name-after-Xbox-CEO-clue.jpg?width=1200&quality=60&format=auto",
    imageAlt: "The Elder Scrolls VI logo over its teaser landscape",
    title: "The Elder Scrolls VI: Sentinel Reportedly Revealed as Bethesda's Next Title, Set in Hammerfell",
    description: "The Elder Scrolls VI: Sentinel is reportedly Bethesda's next title, set in Hammerfell, with a name reveal possibly in November. What the report says.",
    excerpt: "The Elder Scrolls VI is reportedly titled Sentinel and set in Hammerfell, with a name reveal possibly coming in November — but Bethesda has not confirmed any of it yet.",
    date: "2026-10-30",
    category: "Gaming",
    sections: [
      { type: "p", text: "The Elder Scrolls VI: Sentinel is reportedly the full title of Bethesda's long-awaited follow-up to Skyrim, according to a report published on October 29, 2026, by The Verge's Tom Warren, citing sources familiar with Bethesda's plans. This is a report, not an official announcement: neither Bethesda nor Microsoft has confirmed the title, the setting, or a reveal date, and fans should treat every detail below as reported rather than confirmed until Bethesda says so itself." },
      { type: "h2", text: "The Elder Scrolls VI: Sentinel: what the report says" },
      { type: "list", items: [
        "Reported title: The Elder Scrolls VI: Sentinel, the first full title for the game since its teaser in 2018.",
        "Reported setting: Hammerfell, the desert province in the west of Tamriel, previously explored in The Elder Scrolls Adventures: Redguard and The Elder Scrolls Online.",
        "Reported reveal timing: a title announcement could arrive as soon as November 2026, possibly around November 11, the 15th anniversary of The Elder Scrolls V: Skyrim.",
        "Reported scope of the reveal: only the name is expected, with no new trailer, gameplay, release date, or platform list alongside it.",
        "Reported story angle: the game will be the first in the series to dig into the history and secrets of the Elder Scrolls themselves, the ancient artifacts the series is named after.",
      ] },
      { type: "h2", text: "Why Sentinel fits a Hammerfell setting" },
      { type: "p", text: "Sentinel is not a random fantasy word. In the world of Tamriel, Sentinel is a major Redguard kingdom and port city in north-western Hammerfell, overlooking the Iliac Bay, and it was one of the principal powers around that bay in The Elder Scrolls II: Daggerfall. That is why the reported subtitle has landed so cleanly with fans: if the game really is set in Hammerfell, a title drawn from one of its most important cities makes immediate sense. It also lines up with years of fan speculation about the 2018 teaser's landscape, which many viewers read as a coastline between Hammerfell and High Rock rather than the snowy north of Skyrim." },
      { type: "h2", text: "The eight-asterisk clue fans spotted back in August" },
      { type: "p", text: "The Sentinel theory did not appear out of nowhere on October 29. In August 2026, Xbox chief executive Asha Sharma said she had seen a live playthrough of the game at Bethesda and praised its scale, writing the title as The Elder Scrolls VI with eight asterisks in place of the subtitle. Fans quickly counted those eight characters and landed on Sentinel, which has exactly eight letters. Reports of the new story also note that former Bethesda writer Michael Kirkbride responded affirmatively to a Reddit post floating the theory, though that is fan-discussion evidence, not a Bethesda confirmation. The Verge report, built on its own sources rather than on the asterisk puzzle, is what has turned a popular fan theory into the day's biggest gaming story." },
      { type: "h2", text: "What a November reveal would, and would not, mean" },
      { type: "p", text: "Even if the report's timing is right, expectations should stay small. The Verge's report expects a name reveal only, not a gameplay presentation, and other coverage of the same report stresses that a new trailer is unlikely. That fits Bethesda's long pattern with this game: a 36-second teaser at E3 in June 2018, and almost nothing official since. A title would finally give fans something concrete to call the game, and a November date tied to Skyrim's anniversary would be a neat piece of timing, but it would not tell us when we can play it, what it costs, or which platforms it will reach." },
      { type: "h2", text: "The long wait since the 2018 teaser" },
      { type: "p", text: "The Elder Scrolls VI was announced in June 2018 while still in pre-production, then entered active production in 2023 after Starfield launched. In March 2024, Bethesda marked the series' 30th anniversary by saying early builds were already being played, and in July 2026 it said the game was now its primary development focus, with the majority of the studio working on it. Director Todd Howard has said more recently that development is going well and the team is nearing a big internal milestone. Even so, Bloomberg's Jason Schreier said in July 2026 that the game was still at least two years away, which is why several reports put a release no earlier than 2028. A title reveal in November would therefore be a milestone on a long road, not the end of the wait." },
      { type: "h2", text: "What to watch next for The Elder Scrolls VI: Sentinel" },
      { type: "steps", items: [
        "Watch Bethesda's and Xbox's official channels in November, especially around November 11, for any title announcement — and treat anything else as unconfirmed until then.",
        "Do not trust unofficial pre-order pages, prices, or release dates for a game that has no confirmed release window; the report itself expects no such details with a name reveal.",
        "Revisit Skyrim and the Hammerfell areas of The Elder Scrolls Online if you want a refresher on the province and its Redguard cities before any official reveal.",
        "Keep an eye on whether Bethesda confirms, denies, or simply stays silent: silence would not disprove the report, but only an official statement makes Sentinel confirmed.",
      ] },
      { type: "faq", items: [
        { q: "Is The Elder Scrolls VI: Sentinel confirmed?", a: "No. It is reported by The Verge, citing sources familiar with Bethesda's plans, and Bethesda and Microsoft have not confirmed the title, the Hammerfell setting, or a reveal date." },
        { q: "When could Bethesda reveal the name?", a: "The report says as soon as November 2026, possibly around November 11, the 15th anniversary of Skyrim's release in 2011. Only a name reveal is expected, not gameplay or a trailer." },
        { q: "Where is The Elder Scrolls VI: Sentinel reportedly set?", a: "Hammerfell, the desert province in western Tamriel, home to the Redguard city of Sentinel on the Iliac Bay, previously seen in Redguard and The Elder Scrolls Online." },
        { q: "When will The Elder Scrolls VI come out?", a: "There is no announced release date. Bloomberg's Jason Schreier said in July 2026 that the game was still at least two years away, so a release before 2028 looks unlikely on current reporting." },
      ] },
    ],
  },
  {
    slug: "patrick-stewart-dies-86-star-trek-picard-xmen-professor-x",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/87/Patrick_Stewart_by_Gage_Skidmore_2.jpg",
    imageAlt: "Patrick Stewart speaking at San Diego Comic-Con in 2019",
    title: "Patrick Stewart Dies at 86: Star Trek's Captain Picard and X-Men's Professor X Remembered",
    description:
      "Patrick Stewart dies at 86: the Star Trek and X-Men legend passed away at his Los Angeles home on October 28, 2026, after Alzheimer's and Lewy body dementia.",
    excerpt:
      "Sir Patrick Stewart, the Star Trek captain and X-Men professor loved by generations of fans, has died at 86 after a brief illness with Alzheimer's disease and Lewy body dementia.",
    date: "2026-10-30",
    category: "Pop Culture",
    sections: [
      {
        type: "p",
        text: "Patrick Stewart dies at 86. The British actor best known as Captain Jean-Luc Picard in Star Trek and Professor Charles Xavier in the X-Men films passed away at his home in Los Angeles on Wednesday, October 28, 2026, his spokesperson confirmed. His death was announced on Thursday, October 29, 2026, through a statement on his official social media accounts, which said he died after a \"brief and poignant journey\" with Alzheimer's disease and Lewy body dementia, surrounded by family and friends.",
      },
      { type: "h2", text: "Patrick Stewart dies: the key facts" },
      {
        type: "list",
        items: [
          "Died on October 28, 2026, at his home in Los Angeles, aged 86.",
          "Cause of death: Alzheimer's disease and Lewy body dementia, according to his longtime spokesperson Kelly Bush Novak.",
          "His death was announced on October 29, 2026, through his official social media accounts.",
          "He is survived by his wife, singer Sunny Ozell, and his two children from his first marriage.",
          "In lieu of flowers, memorial contributions were requested to the Johns Hopkins Alzheimer's Disease Research Center Fund and the Alzheimer's Foundation of America Caregiver Resources.",
        ],
      },
      { type: "h2", text: "From a Yorkshire mill town to the captain's chair" },
      {
        type: "p",
        text: "Patrick Stewart was born on July 13, 1940, in Mirfield, West Yorkshire, and built his career as a classically trained stage actor, performing Shakespeare long before he became a screen star. His international breakthrough came in 1987, when he was cast as Captain Jean-Luc Picard in Star Trek: The Next Generation. The series ran for seven seasons and 178 episodes and led to four feature films, and Picard's thoughtful command style, along with his famous order \"Make it so\", made Stewart one of science fiction's most recognisable faces. He returned to the role decades later in Star Trek: Picard, which ran from 2020 to 2023.",
      },
      { type: "h2", text: "Professor X: the heart of the X-Men" },
      {
        type: "p",
        text: "Stewart reached a second generation of fans as Professor Charles Xavier, the founder of the X-Men, first playing the role in X-Men in 2000 and returning across the franchise, including X-Men: Days of Future Past and Logan in 2017. His calm authority gave the mutant saga its moral centre, and his final appearance as the character is set to be in Marvel's Avengers: Doomsday, due in December 2026, a farewell that fans will now watch with very different eyes.",
      },
      { type: "h2", text: "Tributes: \"the most beloved actor\"" },
      {
        type: "p",
        text: "Tributes poured in from across the Star Trek and Marvel worlds within hours of the announcement. His close friend and X-Men co-star Sir Ian McKellen called him \"the most beloved actor\" and said he \"wore his heart on his sleeve, which made him a man to rely on, to admire and in my case, love\". William Shatner, the original Captain Kirk, described Stewart as \"a friend, a colleague, and a magnificent actor\" who \"brought intelligence, grace, and a deep sense of humanity to everything he did\". George Takei said fans mourn \"a true and irreplaceable legend\" and that, as Picard, Stewart \"inspired a whole next generation of star-gazers\". Hugh Jackman, his Wolverine co-star, wrote: \"We lost one of the greats of stage and screen today. And, in my book, a tremendous friend and man. I learned so much from him.\" Marvel Studios said Stewart brought Professor Xavier to life with \"extraordinary grace, intelligence, and humanity\", and Logan director James Mangold praised him as \"a brilliant and tireless actor, a great collaborator and a gentle soul\".",
      },
      { type: "h2", text: "A knighthood, a memoir, and a life off screen" },
      {
        type: "p",
        text: "In 2010, Queen Elizabeth II knighted Stewart for his services to drama, an honour he called the grandest thing that had professionally happened to him. He married singer Sunny Ozell in 2013, with McKellen officiating at the ceremony, and in 2023 he published his memoir, Making It So, telling his own story from a Yorkshire childhood to the captain's chair and beyond.",
      },
      { type: "h2", text: "How to revisit Patrick Stewart's best work" },
      {
        type: "steps",
        items: [
          "Start with Star Trek: The Next Generation (1987-1994), the series that made Picard a household name.",
          "Continue with Star Trek: Picard (2020-2023) to see the captain's later years and farewell.",
          "Watch X-Men (2000) through Logan (2017) to follow Professor Xavier's full arc.",
          "Read his 2023 memoir, Making It So, for his own account of the journey from the Yorkshire stage to Hollywood.",
          "Look out for Avengers: Doomsday, due in December 2026, his final appearance as Professor Xavier.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "What was Patrick Stewart's cause of death?",
            a: "Alzheimer's disease and Lewy body dementia, according to his longtime spokesperson Kelly Bush Novak, who described it as a \"brief and poignant journey\".",
          },
          {
            q: "How old was Patrick Stewart when he died?",
            a: "He was 86. He was born on July 13, 1940, in Mirfield, West Yorkshire, and died on October 28, 2026, at his home in Los Angeles.",
          },
          {
            q: "Will Patrick Stewart appear in Avengers: Doomsday?",
            a: "Yes, reports say his final appearance as Professor Charles Xavier will be in Marvel's Avengers: Doomsday, due in December 2026.",
          },
          {
            q: "What is Patrick Stewart best known for?",
            a: "Captain Jean-Luc Picard in Star Trek: The Next Generation and its films and Star Trek: Picard, and Professor Charles Xavier in the X-Men films.",
          },
        ],
      },
    ],
  },
  {
    slug: "cyclone-arnab-odisha-floods-october-30-2026",
    image: "https://cf-images.assettype.com/nationalherald%2F2023-05%2F865b069a-9ebf-4400-a50a-1e9c47067e69%2FFvlh9_paAAAXpRr.jpg?rect=0%2C21%2C1080%2C567&w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100",
    imageAlt: "Satellite view of Cyclone Arnab over the Bay of Bengal near India's east coast",
    title: "Cyclone Arnab Odisha Floods (October 30, 2026): 59,000 Evacuated, 1,000+ Villages Hit as CM Plans Aerial Survey",
    description:
      "Cyclone Arnab Odisha floods: 59,028 people evacuated, 1,000+ villages affected in Ganjam and Gajapati, trains cancelled, and a CM aerial survey today.",
    excerpt:
      "Cyclone Arnab has weakened, but its rains have flooded more than 1,000 villages in Odisha, forced over 59,000 people to safety, and disrupted trains and roads across the south of the state.",
    date: "2026-10-30",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Cyclone Arnab Odisha floods are now the story coming out of the storm. Cyclone Arnab itself has weakened over central India, but the danger in Odisha has shifted from wind to water. Torrential rain on Thursday, October 29, 2026, sent rivers into spate, cut off villages, washed away stretches of road, and forced a rescue operation across nine districts. On Friday, October 30, 2026, Chief Minister Mohan Charan Majhi is scheduled to visit the worst-hit districts, Ganjam and Gajapati, to assess the damage from the air and review relief work on the ground.",
      },
      { type: "h2", text: "Cyclone Arnab Odisha floods: the key numbers" },
      {
        type: "list",
        items: [
          "59,028 people evacuated to safety across nine districts in Odisha, including 11,882 from Ganjam.",
          "More than 1,000 villages affected: 299 villages across 22 blocks in Ganjam and 711 villages across seven blocks in Gajapati.",
          "313 rescue teams deployed: nine National Disaster Response Force teams, 60 Odisha Disaster Rapid Action Force teams and 244 fire services teams.",
          "3,001 pregnant women among those evacuated in Odisha, according to the state government.",
          "Patrapur recorded 546 mm of rain and Sorada 503 mm in the 24 hours ending at 8.30 am on Thursday.",
          "36 trains cancelled, 30 diverted and eight regulated or rescheduled on the Howrah-Chennai route.",
        ],
      },
      { type: "h2", text: "Ganjam and Gajapati: where the flooding is worst" },
      {
        type: "p",
        text: "Ganjam and Gajapati have borne the brunt of the flooding. In Ganjam, floods affected 208 gram panchayats across 22 blocks, with 22 villages reported marooned. In Gajapati, rising water from the Vansadhara and Mahendratanaya rivers inundated low-lying villages, including around Kashinagar, and left residents stranded in several blocks. Schools and colleges in both districts stay closed until October 31.",
      },
      { type: "h2", text: "Why the rain was so extreme" },
      {
        type: "p",
        text: "The rainfall totals explain why rivers rose so fast. Patrapur in Ganjam recorded 546 mm in 24 hours, Sorada recorded 503 mm, and G Udayagiri in Kandhamal recorded 462.4 mm. Extremely heavy rainfall above 200 mm was recorded at 15 places across Ganjam, Gajapati and Kandhamal in the same period. That volume of water pushed several rivers past their danger marks, including the Rushikulya, flowing at about 19 metres at Purushottampur, above its danger level.",
      },
      { type: "h2", text: "Roads, rail and rescue operations" },
      {
        type: "p",
        text: "Road and rail links have taken extensive damage. A stretch of National Highway 326 in Gajapati district was washed away, disrupting the route between Ganjam and Mohana, and floodwater near railway bridges and submerged tracks disrupted services on the Howrah-Chennai route. The East Coast Railway cancelled 24 trains and diverted 22, while the South Coast Railway cancelled 12 and diverted eight. Rescue teams are working in difficult conditions: an Indian Coast Guard helicopter winched six people, including two children, from a flooded public health centre at Jagmohan in Dharakote, while efforts to reach more than 2,000 people stranded in cut-off villages in Ganjam have been affected by low cloud cover.",
      },
      { type: "h2", text: "CM aerial survey and central assistance" },
      {
        type: "p",
        text: "Chief Minister Mohan Charan Majhi, accompanied by Revenue and Disaster Management Minister Suresh Pujari, is scheduled to conduct an aerial survey of Ganjam and Gajapati on Friday, October 30, 2026, and later land at Rangeilunda to hold discussions with officials and review relief and rescue operations. Union Home Minister Amit Shah has spoken to the chief ministers of Odisha, Andhra Pradesh, Chhattisgarh and Puducherry and assured central assistance, and inter-ministerial teams are expected to visit the affected states to assess the damage.",
      },
      { type: "h2", text: "Andhra Pradesh: damage put at Rs 4,600 crore" },
      {
        type: "p",
        text: "Neighbouring Andhra Pradesh has also been badly hit. Chief Minister N Chandrababu Naidu has put the preliminary damage in Andhra Pradesh at Rs 4,600 crore, after an aerial survey of cyclone-hit areas in the Krishna and Godavari regions. Power infrastructure losses alone are estimated at Rs 500 crore, crops across 2.24 lakh hectares have been affected, and the casualty figure given for Andhra Pradesh was seven. The Indian Coast Guard also airlifted all 20 crew members of the bulk carrier Sigma Pearl, stranded off the Andhra coast, and in Andhra Pradesh 3,100 pregnant women were shifted to hospitals as a precaution.",
      },
      { type: "h2", text: "What happens next for Odisha" },
      {
        type: "p",
        text: "The weather threat is not yet over. The India Meteorological Department has said a separate low-pressure area over the South Andaman Sea is likely to intensify into a depression over the southeast Bay of Bengal around October 31, and it is expected to move west-northwestwards. That system could bring another spell of rain to south Odisha in early November, so residents in flood-affected districts should keep following official weather and district advisories, even as the immediate rescue and relief operation continues and the authorities assess the full damage.",
      },
      { type: "h2", text: "If you are in or travelling to the affected areas" },
      {
        type: "steps",
        items: [
          "Check the latest official train and road updates before travelling on the Howrah-Chennai route or through Ganjam and Gajapati, as cancellations and diversions are still in force.",
          "Do not try to cross flooded roads, bridges or causeways, and avoid driving through water where the depth or current is unclear.",
          "Follow district and disaster management advisories on school closures, shelter locations and evacuation instructions, rather than rumours on social media.",
          "If you are in a low-lying or riverside area and water is rising, move to higher ground and contact local rescue teams rather than waiting for the water to recede.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "How many people have been evacuated in the Cyclone Arnab Odisha floods?",
            a: "According to the Odisha government, 59,028 people have been evacuated to safety across nine districts, including 11,882 from Ganjam and 3,001 pregnant women.",
          },
          {
            q: "Which districts are worst affected by Cyclone Arnab in Odisha?",
            a: "Ganjam and Gajapati are the worst affected, with more than 1,000 villages affected between them, followed by heavy rain in Kandhamal, Malkangiri, Koraput, Nabarangpur, Rayagada, Kalahandi and Nuapada.",
          },
          {
            q: "Are trains running on the Howrah-Chennai route?",
            a: "Services have been disrupted: 36 trains were cancelled, 30 diverted and eight regulated or rescheduled after the Bahuda river crossed the danger mark at railway bridges in Ganjam, so check the latest railway updates before travelling.",
          },
        ],
      },
    ],
  },
  {
    slug: "new-ott-releases-this-weekend-october-30-2026",
    image: "https://www.ottrelease.com/wp-content/uploads/2026/10/akka.jpg",
    imageAlt: "Akka, the Netflix crime thriller leading this weekend's new OTT releases",
    title: "New OTT Releases This Weekend (October 30, 2026): Akka, Sigma, The Strangers: Chapter 3 and More",
    description:
      "New OTT releases this weekend, October 30, 2026: Akka and Sigma on Netflix, The Strangers: Chapter 3 on Prime Video, plus new South Indian titles on SonyLIV, ZEE5 and JioHotstar.",
    excerpt:
      "This weekend's new OTT releases bring crime thrillers, action drama, horror and South Indian stories to Netflix, Prime Video, SonyLIV, ZEE5 and JioHotstar from October 30, 2026.",
    date: "2026-10-30",
    category: "Pop Culture",
    sections: [
      {
        type: "p",
        text: "If you are looking for what to watch this weekend, the new OTT releases this weekend have arrived at a good time. From Friday, October 30, 2026, several new movies and shows are streaming across Netflix, Prime Video, SonyLIV, ZEE5 and JioHotstar. The mix covers Tamil and Telugu stories, crime thrillers, action drama, horror and family drama, so there is something here whether you want a tense weekend binge or a lighter watch.",
      },
      { type: "h2", text: "New OTT releases this weekend: the quick list" },
      {
        type: "list",
        items: [
          "Akka — Netflix, from October 30, 2026. A Tamil crime thriller set in the 1980s.",
          "Sigma — Netflix, from October 30, 2026. A Tamil action drama.",
          "The Strangers: Chapter 3 — Prime Video and Apple TV+, from October 30, 2026.",
          "Love Always — JioHotstar, from October 30, 2026. Adapted from a Korean webtoon.",
          "Rudravanam PS — ZEE5, from October 30, 2026. A Telugu investigation series.",
          "More South Indian titles — SonyLIV, ZEE5 and JioHotstar, from October 30, 2026.",
        ],
      },
      { type: "h2", text: "Akka on Netflix: the weekend's big crime thriller" },
      {
        type: "p",
        text: "Akka is the title most people will be searching for this weekend. It is a Tamil crime thriller set in the fictional town of Pernuru in the 1980s, and it centres on a gold-smuggling network run by women. Keerthy Suresh plays Bhavani, the feared boss of the syndicate, with Radhika Apte and Tanvi Azmi also starring. If you like period crime stories with a strong central character, start here.",
      },
      { type: "h2", text: "Sigma on Netflix: Tamil action drama to watch" },
      {
        type: "p",
        text: "Sigma is a Tamil action drama that also arrives on Netflix on October 30, 2026. It marks the directorial debut of Jason Sanjay, and Telugu and Hindi language tracks are available, which makes it an easy pick for viewers who do not watch Tamil originals. Action drama fans who want a new film, rather than a new series, should put this near the top of the list.",
      },
      { type: "h2", text: "The Strangers: Chapter 3 on Prime Video" },
      {
        type: "p",
        text: "For horror fans, The Strangers: Chapter 3 streams on Prime Video and Apple TV+ from October 30, 2026. It is the weekend's clear horror pick, and it pairs well with a late-night watch. If you are choosing between a thriller and a horror film this weekend, this is the horror option to start with.",
      },
      { type: "h2", text: "More new South Indian OTT releases today" },
      {
        type: "p",
        text: "Friday, October 30, 2026 is a crowded day for South Indian streaming. Six new South Indian titles are streaming from today across Netflix, SonyLIV, ZEE5 and JioHotstar, covering Tamil, Telugu and Malayalam stories in comedy, crime, romance, horror and investigation. Two more to note are Love Always on JioHotstar, adapted from a Korean webtoon called Here We Go Again, and Rudravanam PS on ZEE5, a Telugu series following Sub-Inspector Sivakumar, played by Naresh Agastya.",
      },
      { type: "h2", text: "What to watch first this weekend" },
      {
        type: "steps",
        items: [
          "Want a crime thriller? Start with Akka on Netflix.",
          "Want a new action film? Watch Sigma on Netflix.",
          "Want horror? Choose The Strangers: Chapter 3 on Prime Video.",
          "Want a series to follow into the week? Try Rudravanam PS on ZEE5 or Love Always on JioHotstar.",
          "Check the language options before you start, especially for Sigma, which offers Telugu and Hindi tracks as well.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "What are the new OTT releases this weekend, October 30, 2026?",
            a: "The new OTT releases this weekend include Akka and Sigma on Netflix, The Strangers: Chapter 3 on Prime Video and Apple TV+, and new South Indian titles on SonyLIV, ZEE5 and JioHotstar, all from October 30, 2026.",
          },
          {
            q: "Where can I watch Akka?",
            a: "Akka streams on Netflix from October 30, 2026. It is a Tamil crime thriller set in the 1980s, starring Keerthy Suresh, Radhika Apte and Tanvi Azmi.",
          },
          {
            q: "Is Sigma available in Hindi or Telugu?",
            a: "Yes, according to the release listings, Sigma offers Telugu and Hindi language tracks in addition to its Tamil version on Netflix.",
          },
        ],
      },
    ],
  },
  {
    slug: "watch-terabox-video-online-without-app",
    image: "https://www.teraplayer.in/images/feature-player.webp",
    imageAlt: "TeraPlayer video player opening a TeraBox link in the browser",
    title: "How to Watch a TeraBox Video Online Without the App",
    description:
      "Learn how to watch a TeraBox video online without the app, using just your browser. No install and no TeraBox login needed for public links.",
    excerpt:
      "You received a TeraBox link but do not want to install another app just to watch one video. Here is how to watch it in your browser instead.",
    date: "2026-10-30",
    category: "How-to",
    sections: [
      {
        type: "p",
        text: "You received a TeraBox link, but you do not want to install another app just to watch one video. That is a common problem, especially on a phone that is already short on storage. The good news is that you can watch many public TeraBox videos directly in your browser, without installing the TeraBox app and without signing in to a TeraBox account. This guide explains how it works and what to do if the video does not load on the first try.",
      },
      { type: "h2", text: "Why watch in the browser?" },
      {
        type: "p",
        text: "A browser player is useful when you are on a friend's phone, using a shared computer, or trying to save storage space. It is also handy when you only want to preview a file before deciding whether it is worth keeping. A browser tool does not change who owns the file. It simply opens a public share link in a web player. Files shared through TeraBox still belong to their owners, and you should only open links that were shared with you or shared publicly.",
      },
      { type: "h2", text: "What you need" },
      {
        type: "p",
        text: "You need only three things: a public TeraBox share link, a modern browser such as Chrome, Safari, Edge, or Firefox, and a stable internet connection. You do not need a TeraBox account for a public link, and you do not need to install anything. If a link asks for a password, it is a protected share, and you will need the correct password from the person who shared it.",
      },
      { type: "h2", text: "How to watch a TeraBox video online without the app" },
      { type: "p", text: "Follow these steps on your phone or computer. The steps are the same in most browsers." },
      {
        type: "steps",
        items: [
          "Copy the TeraBox link. Open the message, email, or post that contains the link. Long-press the link on your phone, or right-click it on a computer, and choose Copy. Make sure you copy the full link, not just part of it. A cut-off link is one of the most common reasons a video fails to open.",
          "Open the browser player. Go to the TeraPlayer tool on the home page. You will see a box where you can paste a link. There is nothing to install and no account to create before you use it.",
          "Paste the link and press Watch. Paste the link into the box and press Watch. The tool will try to read the public share and load the video in the browser player. This can take a few seconds, depending on your connection and the size of the file.",
          "Play the video. Once the video appears, press Play. You can usually pause, seek forward or back, and switch to full screen, just as you would in a normal video player. If more than one quality option is available, choose the one that works best with your connection.",
          "Close the page when you are done. When you finish watching, simply close the tab. There is no app left behind on your device, and no account to sign out of.",
        ],
      },
      { type: "h2", text: "Watch on any device" },
      {
        type: "p",
        text: "The same steps work on Android, iPhone, tablets, and computers. On iPhone, if the video plays with no sound, check the silent switch and the volume in Control Center. If the video stutters, try a lower quality option or a stronger connection.",
      },
      { type: "h2", text: "If the video will not play" },
      {
        type: "p",
        text: "First re-copy the full link, refresh the page, and try again. Then try a different browser, because an ad blocker or strict privacy setting can block a player. If the link is private, expired, or removed by the owner, it will not open in any player, and you should ask the owner for a fresh link. Never enter your TeraBox password into a random site, because a public link should not need it.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Do I need the TeraBox app to watch a shared video?",
            a: "No, not for a public link. You can watch it in a browser player without installing the app.",
          },
          {
            q: "Do I need a TeraBox account?",
            a: "No. Public links need no login. Protected links will still ask for the share password set by the owner.",
          },
          {
            q: "Why does my video keep buffering?",
            a: "Buffering is usually caused by a slow connection or a very large file. Try a lower quality option, pause briefly to let it load, or switch to a stronger connection.",
          },
        ],
      },
    ],
  },
];

/** Newest first. The list page renders in this order; the daily job prepends. */
export function getAllPosts() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}
