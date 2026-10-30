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
