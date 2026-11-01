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
    slug: "pikmin-day-direct-november-1-pikmin-day-nintendo",
    image: "https://i.ytimg.com/vi/7-1lQh551UY/maxresdefault.jpg",
    imageAlt: "Official Pikmin Day Direct key art with the red, blue and yellow Pikmin forming 11.1 and the Nintendo logo",
    title: "Pikmin Day Direct: Nintendo Declares November 1 Pikmin Day in Surprise Showcase",
    description:
      "Pikmin Day Direct surprise: Nintendo declares November 1 Pikmin Day, with a Pikmin 4 Switch 2 demo on November 2 and Hello! Pikmin shorts.",
    excerpt:
      "Nintendo has surprised fans with a Pikmin Day Direct on October 31, 2026, declaring November 1 as Pikmin Day and confirming a free Pikmin 4 Switch 2 demo for November 2.",
    date: "2026-11-01",
    category: "Gaming",
    sections: [
      {
        type: "p",
        text: "The Pikmin Day Direct is one of the biggest surprise gaming announcements of October 31, 2026. Nintendo quietly posted a roughly nine-and-a-half-minute Pikmin presentation to YouTube, with minimal prior notice, and in it, series creator Shigeru Miyamoto declared that November 1 will henceforth be known as Pikmin Day. Today is therefore the first-ever Pikmin Day, and the Direct sets up a packed fortnight: a free Pikmin 4 demo on November 2, the full Nintendo Switch 2 edition on November 12, a new Pikmin Bloom feature this winter, and a brand-new series of animated shorts.",
      },
      {
        type: "h2",
        text: "Pikmin Day Direct: why November 1 is Pikmin Day",
      },
      {
        type: "p",
        text: "Miyamoto opened the Pikmin Day Direct by explaining the date, and it is pure Pikmin logic. In the first Pikmin game, three Pikmin colours made their debut: red, blue and yellow. Stand those three Pikmin side by side, Miyamoto said, and they resemble the number 1 three times over, making 11.1, or November 1. From 2026 onwards, November 1 is therefore Pikmin Day, an annual celebration of the franchise, which is now 25 years old after debuting on the GameCube in 2001.",
      },
      {
        type: "list",
        items: [
          "Pikmin Day Direct date: October 31, 2026, posted to YouTube with minimal prior notice.",
          "Pikmin Day: November 1, every year from 2026, declared by Shigeru Miyamoto.",
          "Why November 1: the original red, blue and yellow Pikmin resemble 11.1.",
          "Direct length: just over nine minutes, entirely focused on Pikmin.",
          "Franchise age: Pikmin debuted on GameCube in 2001, making it 25 years old in 2026.",
        ],
      },
      {
        type: "h2",
        text: "Pikmin Day Direct: Pikmin 4 Switch 2 demo on November 2",
      },
      {
        type: "p",
        text: "The most immediately useful announcement in the Pikmin Day Direct is the free demo. A demo of Pikmin 4 - Nintendo Switch 2 Edition + Dandori Academy launches on November 2, 2026, letting Switch 2 owners try the game before its full release. The demo includes the opening area, Sun-Speckled Terrace, plus two Dandori Academy stages, and save data from the demo can be carried over to the full game.",
      },
      {
        type: "p",
        text: "The Switch 2 version lets players use the console's built-in microphone to give voice commands to Oatchi, the space dog companion, such as rush and go to work. Dandori Academy, the new mode bundled with the Switch 2 edition, is built around planning the most efficient treasure-collecting route, then testing it in timed examinations held on Fridays, Saturdays and Sundays, where players can earn medals.",
      },
      {
        type: "h2",
        text: "Pikmin 4 Switch 2 Edition release date: November 12, 2026",
      },
      {
        type: "p",
        text: "Pikmin 4 - Nintendo Switch 2 Edition + Dandori Academy launches on November 12, 2026. The edition was first announced during Nintendo's September 2026 Direct, and the Pikmin Day Direct served as a refresher and a deeper walkthrough rather than a new reveal. The Direct also noted that all four mainline Pikmin entries are playable across Nintendo Switch and Nintendo Switch 2.",
      },
      {
        type: "p",
        text: "One point to be clear about: the Pikmin Day Direct did not announce Pikmin 5 or any new mainline Pikmin game. The showcase was about Pikmin Day itself, the Pikmin 4 Switch 2 edition, Pikmin Bloom and the new shorts, not a sequel reveal.",
      },
      {
        type: "h2",
        text: "Pikmin Bloom Secret Caves coming in winter 2026",
      },
      {
        type: "p",
        text: "Mobile players got the biggest new feature in the Pikmin Day Direct. Pikmin Bloom, Nintendo's augmented-reality smartphone game from 2021, will add Secret Caves in winter 2026. A cinematic trailer in the Direct showed the new underground expeditions, where players send their Pikmin into caves to explore, battle creatures and collect treasure.",
      },
      {
        type: "p",
        text: "Players will also be able to obtain special cave maps for Pikmin Bloom through Dandori Academy examinations in the Switch 2 edition and through Postcards. Nintendo has not given a specific date for Secret Caves beyond winter 2026.",
      },
      {
        type: "h2",
        text: "Hello! Pikmin shorts: a new animated series starts now",
      },
      {
        type: "p",
        text: "The Pikmin Day Direct closed with a charming surprise of its own: Hello! Pikmin, a new series of animated Pikmin short films. Miyamoto introduced Japanese actress Fuka Koshiba, whose hand-knitted Pikmin hats shared on social media caught his eye, to help present the first short. It follows a Pikmin hiding from a suspiciously sneaky toad, and it is the first of many.",
      },
      {
        type: "p",
        text: "Nintendo plans another Hello! Pikmin short later in November, followed by monthly shorts starting in December through the Nintendo Today! app and other Nintendo channels.",
      },
      {
        type: "h2",
        text: "Pikmin Day Direct reaction: a small showcase with a big idea",
      },
      {
        type: "p",
        text: "Reaction has focused less on any single game announcement and more on the idea itself: Nintendo inventing a new annual holiday for one of its most beloved franchises, via a shadow-dropped showcase. The mix of a demo date, a mobile update and a shorts series gives players something to do on Pikmin Day itself.",
      },
      {
        type: "faq",
        items: [
          { q: "What is Pikmin Day?", a: "November 1, declared by Nintendo in the Pikmin Day Direct on October 31, 2026, because the original red, blue and yellow Pikmin resemble 11.1." },
          { q: "When is the Pikmin 4 Switch 2 demo release date?", a: "November 2, 2026, with the Sun-Speckled Terrace opening area and two Dandori Academy stages; demo save data transfers to the full game." },
          { q: "When does Pikmin 4 Switch 2 Edition release?", a: "Pikmin 4 - Nintendo Switch 2 Edition + Dandori Academy releases on November 12, 2026." },
          { q: "What is Pikmin Bloom Secret Caves?", a: "A new Pikmin Bloom feature coming in winter 2026, adding underground expeditions where Pikmin explore, battle creatures and collect treasure; cave maps come via Dandori Academy examinations and Postcards." },
          { q: "What is Hello! Pikmin?", a: "A new series of animated Pikmin shorts from the Pikmin Day Direct, starting with a Pikmin hiding from a suspiciously sneaky toad, with another short later in November and monthly shorts from December via the Nintendo Today! app and other channels." },
          { q: "Did the Pikmin Day Direct announce Pikmin 5?", a: "No. It focused on Pikmin Day, Pikmin 4 Switch 2 Edition, Pikmin Bloom and the Hello! Pikmin shorts." },
        ],
      },
    ],
  },  {
    slug: "scene-trailer-suriya-release-date-november-6-2026",
    image: "https://i.ytimg.com/vi/LM4ByXufv2w/maxresdefault.jpg",
    imageAlt: "Suriya as Inbaraj in the official Scene trailer key art, with the film title and 6th November Diwali release date",
    title: "Scene Trailer: Suriya's Action Entertainer Releases November 6, 2026 for Diwali",
    description:
      "Scene trailer is out: Suriya stars as cop Inbaraj in Jithu Madhavan's Diwali action entertainer, releasing in theatres on November 6, 2026.",
    excerpt:
      "Suriya's Scene trailer is out, and the Jithu Madhavan action entertainer releases in theatres worldwide on November 6, 2026, for Diwali.",
    date: "2026-10-31",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "The Scene trailer is out, giving fans their clearest look yet at Suriya's Diwali release. The makers of the Jithu Madhavan film released the trailer on Saturday, October 31, 2026, ahead of its theatrical release on November 6, 2026. Suriya shared it on X with the message, “Murder. Mystery. Madness… and a whole lot of laughter! Enjoy #Scene in theatres with friends and family! With Love from us to you. In cinemas from 6th Nov 2026! #DiwaliRelease.” That line sums up the trailer: a murder investigation wrapped in comedy and action.",
      },
      {
        type: "h2",
        text: "Scene trailer release date and Diwali theatrical release",
      },
      {
        type: "p",
        text: "The Scene trailer arrived on the day of the film's audio and trailer launch event in Chennai, held at the Sairam Institute from 5 pm on October 31, 2026. The production house had announced the trailer would drop at 7:30 pm that evening, and it did, to a wave of fan reaction online. The film releases worldwide on November 6, 2026, for the Deepavali weekend, alongside the Sundar C and Nayanthara film Mookuthi Amman 2.",
      },
      {
        type: "list",
        items: [
          "Scene trailer release date: October 31, 2026.",
          "Scene theatrical release date: November 6, 2026, worldwide, for Diwali.",
          "Lead actor: Suriya as Inbaraj, a police officer.",
          "Female lead: Nazriya Nazim as Maya.",
          "Antagonist: Naslen as Eeswaran.",
          "Director: Jithu Madhavan, in his Tamil cinema debut.",
          "Produced by Suriya and Jyotika, Zhagaram Studios and 2D Entertainment.",
          "Music: Sushin Shyam.",
        ],
      },
      {
        type: "h2",
        text: "Scene trailer story: Inbaraj quits the force, then gets pulled back in",
      },
      {
        type: "p",
        text: "The Scene trailer begins with Inbaraj, played by Suriya, resigning from the police force, surprising his seniors, colleagues and subordinates. He wants to relax at home, but his superior officer Stephen, played by Lal, keeps ordering him back. When policemen are sent to arrest him, Inbaraj refuses to cooperate, and when an officer threatens to carry him if needed, he raises his arms and legs as if asking to be carried. They do exactly that, in one of the trailer's funniest sequences.",
      },
      {
        type: "p",
        text: "At Stephen's office, Inbaraj says he plans to join politics after quitting the force. Soon, though, Stephen asks him to come out of retirement to investigate a murder, and that case becomes the story's spine, mixing humour with tension.",
      },
      {
        type: "h2",
        text: "Scene trailer: Maya, the house help who is much more than she seems",
      },
      {
        type: "p",
        text: "A big talking point is Nazriya Nazim's Maya. Inbaraj advertises for a house help, and Maya turns up for the job. At first she seems to be just that, but the trailer soon shows her in action sequences, fighting attackers in a rare action role, with real mystery around who she is. The trailer does not explain her backstory, and that mystery should be a major draw on release.",
      },
      {
        type: "h2",
        text: "Scene trailer villain: Naslen as Eeswaran, the 'equal' adversary",
      },
      {
        type: "p",
        text: "Naslen plays Eeswaran, the film's antagonist, and the Scene trailer positions him as an 'equal' adversary to Suriya's cop. The trailer suggests that only a person of equal intelligence to Eeswaran, described as a ruthless and sharp criminal, can bring him to justice. Eeswaran himself considers Inbaraj a worthy opponent, but Inbaraj, in his typical maverick style, questions that idea, asking, “Am I your equal?” An earlier character video for Eeswaran had already described him as a “faceless, emotionless, inhuman predator,” and the trailer keeps that menace intact, including a chilling moment where Eeswaran tells someone not to be scared, saying he will not kill them, and asks them to get the vehicle started.",
      },
      {
        type: "h2",
        text: "Scene cast and crew",
      },
      {
        type: "p",
        text: "Scene was tentatively called Suriya 47 before its title was announced, and it has been one of the year's most anticipated projects since the Suriya and Jithu Madhavan collaboration was first discussed. Jithu, known for Romancham and Aavesham, makes his Tamil debut here. The film went on floors with a traditional pooja in December last year.",
      },
      {
        type: "list",
        items: [
          "Suriya as Inbaraj, the lead role.",
          "Nazriya Nazim as Maya, the female lead.",
          "Naslen as Eeswaran, the antagonist.",
          "Lal as Stephen, Inbaraj's senior officer.",
          "Anandraj, John Vijay and Raj Priyan in pivotal roles.",
          "Music by Sushin Shyam, a frequent collaborator of Jithu Madhavan.",
          "Cinematography by Vineeth Augustian, editing by Ajmal Sabu, action by Chethan D'Souza.",
        ],
      },
      {
        type: "h3",
        text: "The Singam callback at the end of the Scene trailer",
      },
      {
        type: "p",
        text: "The Scene trailer ends with a callback that long-time Suriya fans will catch instantly. Inbaraj delivers a version of the iconic Durai Singam line, “Ongi adicha ondra ton weight da!”, which translates to, “If I punch you hard, it carries the weight of one and a half tons!” It is a deliberate nod to Suriya's Singam cop avatar, and it frames Inbaraj as a hero in that same larger-than-life tradition, even though Scene's tone is far more playful than a straight police drama.",
      },
      {
        type: "h2",
        text: "Scene trailer reaction and what to expect on November 6",
      },
      {
        type: "p",
        text: "Early reaction has focused on Suriya's comic timing as the reluctant cop, Nazriya's unexpected action turn, and the cat-and-mouse dynamic between Inbaraj and Eeswaran. The trailer promises a fun-filled action entertainer, not a dark thriller, with light moments running through a gripping investigation. That balance, praised in Jithu's earlier films, is why the trailer has travelled so fast.",
      },
      {
        type: "p",
        text: "The trailer keeps its surprises back: Maya's mystery, the Inbaraj-Eeswaran collision and the murder case all stay hidden until November 6, when Scene enters release week as one of the year's most talked-about Tamil films.",
      },
      {
        type: "faq",
        items: [
          { q: "When is the Scene release date?", a: "Scene releases in theatres worldwide on November 6, 2026, for Diwali." },
          { q: "When was the Scene trailer released?", a: "The Scene trailer was released on October 31, 2026, at the film's audio and trailer launch event in Chennai." },
          { q: "Who directs Scene?", a: "Scene is directed by Jithu Madhavan, known for Romancham and Aavesham, in his Tamil cinema debut." },
          { q: "Who stars in Scene?", a: "Suriya stars as Inbaraj, Nazriya Nazim plays Maya, and Naslen plays the antagonist Eeswaran. Lal, Anandraj, John Vijay and Raj Priyan are also in the cast." },
          { q: "What is Scene about?", a: "Scene follows Inbaraj, a police officer who quits the force but is pulled back to investigate a murder, crossing paths with Maya and the criminal Eeswaran." },
        ],
      },
    ],
  },
  {
    slug: "im-game-ott-release-jiohotstar-november-6-2026",
    image: "https://www.pinkvilla.com/images/2026-10/529669661_im-game-ott-webp.webp",
    imageAlt: "Dulquer Salmaan as Dan in I'm Game, walking through a grand doorway in a beige jacket",
    title: "I'm Game OTT Release: Dulquer Salmaan's Film Streams on JioHotstar From November 6, 2026",
    description:
      "I'm Game OTT release confirmed: Dulquer Salmaan's fantasy action film streams on JioHotstar from November 6, 2026, in five languages.",
    excerpt:
      "Dulquer Salmaan's I'm Game will stream on JioHotstar from November 6, 2026, in Malayalam, Hindi, Tamil, Telugu and Kannada.",
    date: "2026-10-31",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "The I'm Game OTT release is now confirmed. Dulquer Salmaan's Malayalam fantasy action film will premiere on JioHotstar on November 6, 2026, just two months after its theatrical release on September 3, 2026. JioHotstar announced the date on October 31, 2026, with the tagline, The game is about to begin, and the film will be available in five languages: Malayalam, Hindi, Tamil, Telugu and Kannada.",
      },
      { type: "h2", text: "I'm Game OTT release date and platform" },
      {
        type: "p",
        text: "JioHotstar confirmed the I'm Game OTT release date through its official announcement on October 31, 2026, reported the same day by Pinkvilla, The Week, Filmibeat and other entertainment outlets. JioHotstar is the only streaming home announced for the film so far, so viewers should look for it there rather than on another service.",
      },
      {
        type: "list",
        items: [
          "OTT release date: November 6, 2026.",
          "Streaming platform: JioHotstar.",
          "Languages: Malayalam, Hindi, Tamil, Telugu and Kannada.",
          "Theatrical release date: September 3, 2026.",
          "Director: Nahas Hidhayath.",
          "Production: Wayfarer Films, produced by Dulquer Salmaan and Jom Varghese.",
        ],
      },
      { type: "h2", text: "What is I'm Game about? The story of Dan and Vicky's hand" },
      {
        type: "p",
        text: "I'm Game follows Dan, played by Dulquer Salmaan, a spoiled and irresponsible young man whose obsession with making a fortune comes from his desire to prove himself to his wealthy, disapproving father. Addicted to high-stakes money-making and driven by blind faith in luck, Dan becomes deeply involved in the cricket world and piles up enormous debts through his reckless lifestyle.",
      },
      {
        type: "p",
        text: "Dan's life takes an unexpected turn when he is involved in a serious road accident that leaves one of his arms beyond recovery. Doctors manage to save him, and he undergoes a hand transplant. But soon after regaining consciousness, he discovers that his new hand behaves independently, moving against his will and displaying extraordinary strength. He eventually learns that the hand belonged to Vicky, a celebrated cricketer who passed away under mysterious circumstances, and that Vicky's lingering consciousness remains connected to the hand, driven by an overwhelming desire to punish those responsible for his fate.",
      },
      {
        type: "p",
        text: "Dan is unwillingly drawn into Vicky's unfinished battle against Toni, a powerful figure controlling an extensive cricket network. With the help of Isha, a physiotherapist who helps him understand his unusual condition, Dan uncovers the truth behind Vicky's past, moves beyond his selfish ambitions, and uses his newfound abilities to confront Toni and bring down his network.",
      },
      { type: "h2", text: "I'm Game cast and crew" },
      {
        type: "p",
        text: "I'm Game stars Dulquer Salmaan in the lead role as Dan, and it marks his return to Malayalam cinema after King of Kotha in 2023. The film is directed by Nahas Hidhayath, who made his directorial debut with the action entertainer RDX in 2023, and the screenplay is penned by Sajeer Baba, Ismail Aboobacker and Bilal Moidu. The music is composed by Jakes Bejoy, Jimshi Khalid handles the cinematography, and Chaman Chacko serves as the editor.",
      },
      {
        type: "list",
        items: [
          "Dulquer Salmaan as Dan, the lead role.",
          "Antony Varghese Pepe, Mysskin and Kathir in key roles.",
          "Kayadu Lohar, Samyuktha Viswanathan, Vinay Forrt and Parth Tiwari in the ensemble cast.",
          "Directed by Nahas Hidhayath, produced by Dulquer Salmaan and Jom Varghese under Wayfarer Films.",
          "Music by Jakes Bejoy, cinematography by Jimshi Khalid, editing by Chaman Chacko.",
        ],
      },
      { type: "h2", text: "How to watch I'm Game on JioHotstar" },
      {
        type: "p",
        text: "JioHotstar has already confirmed the date, so the film should appear on the platform on November 6, 2026 itself. Follow these steps when it releases.",
      },
      {
        type: "steps",
        items: [
          "Open the JioHotstar app on your phone, tablet or smart TV, or open the JioHotstar website on your computer.",
          "Sign in to your JioHotstar account.",
          "Search for I'm Game in the search bar.",
          "Pick your preferred language version from Malayalam, Hindi, Tamil, Telugu or Kannada, where available.",
          "Press play and watch the film from November 6, 2026.",
        ],
      },
      { type: "h3", text: "Which language version of I'm Game should you pick?" },
      {
        type: "p",
        text: "I'm Game is originally a Malayalam film, so the Malayalam version is closest to how it was made. But the Hindi, Tamil, Telugu and Kannada versions let viewers across India watch it in the language they are most comfortable with, which is one reason the OTT release is expected to reach a much wider audience than the theatrical run did.",
      },
      { type: "h2", text: "Why the I'm Game OTT release matters" },
      {
        type: "p",
        text: "The OTT release gives I'm Game a second chance with audiences. The Week reported that the film's theatrical run did not meet expectations despite its ambitious scale and high production budget, even though the fantasy premise, the Dulquer Salmaan star power and the cricket-world setting drew plenty of attention before release.",
      },
      {
        type: "p",
        text: "The timing helps too. A November 6 premiere puts I'm Game in front of viewers heading into the weekend, and the wait since its September 3 theatrical release has been short. If it clicks with streaming audiences, its unusual premise, a man sharing his body with a dead cricketer's vengeful hand, is exactly the kind of story people recommend to friends.",
      },
      { type: "h2", text: "I'm Game OTT release: frequently asked questions" },
      {
        type: "faq",
        items: [
          { q: "When is the I'm Game OTT release date?", a: "I'm Game will premiere on JioHotstar on November 6, 2026." },
          { q: "Where can I watch I'm Game online?", a: "I'm Game will stream on JioHotstar, which is the platform announced for its digital premiere." },
          { q: "In which languages will I'm Game stream on JioHotstar?", a: "I'm Game will be available in Malayalam, Hindi, Tamil, Telugu and Kannada." },
          { q: "Who stars in I'm Game?", a: "Dulquer Salmaan stars as Dan, alongside Antony Varghese Pepe, Mysskin, Kayadu Lohar, Samyuktha Viswanathan, Kathir, Vinay Forrt and Parth Tiwari." },
          { q: "Who directed I'm Game?", a: "I'm Game is directed by Nahas Hidhayath and produced by Dulquer Salmaan and Jom Varghese under Wayfarer Films." },
          { q: "What is I'm Game about?", a: "I'm Game follows Dan, a reckless young man who receives a hand transplant after an accident, only to discover the hand belonged to a cricketer named Vicky, whose consciousness drives him to take revenge on a powerful cricket network." },
          { q: "When did I'm Game release in theatres?", a: "I'm Game released in theatres on September 3, 2026, before its November 6, 2026 OTT premiere on JioHotstar." },
        ],
      },
    ],
  },

  {
    slug: "spider-man-brand-new-day-rerelease-new-footage",
    image: "https://image.tmdb.org/t/p/w1280/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg",
    imageAlt: "Official Spider-Man: Brand New Day poster showing Tom Holland's Spider-Man in close-up",
    title: "Spider-Man Brand New Day Rerelease Reportedly Planned With New Footage",
    description:
      "Spider-Man Brand New Day rerelease is reportedly planned with new footage, including a cut Rosario Dawson cameo, as the $2.5 billion hit chases Avatar.",
    excerpt:
      "Sony is reportedly planning a Spider-Man: Brand New Day rerelease with new footage, including a cut Rosario Dawson cameo as Claire Temple, after the film earned about $2.5 billion worldwide.",
    date: "2026-10-31",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "The Spider-Man Brand New Day rerelease is reportedly on its way. According to a report from Deadline, picked up by Polygon on October 30, 2026, Sony Pictures is planning to bring Spider-Man: Brand New Day back to theatres with new footage added, giving the biggest superhero hit of 2026 another run at the box office. Sony has not officially confirmed the rerelease or announced a date, so everything about the extended version so far comes from that report. But the idea is already sending fans into overdrive, because the extra footage is said to include a cut cameo that connects directly to the wider Marvel Cinematic Universe.",
      },
      { type: "h2", text: "Spider-Man Brand New Day rerelease: what the new footage reportedly includes" },
      {
        type: "p",
        text: "The headline detail is Rosario Dawson's Claire Temple, also known as Night Nurse. Dawson played Temple across Marvel's Netflix shows, including Daredevil, Jessica Jones, Luke Cage, Iron Fist and The Defenders, where she was the street-level heroes' trusted medical contact. Dawson has said she filmed a scene for Brand New Day that was cut from the theatrical version, and Deadline's report says that scene is now expected to return.",
      },
      {
        type: "p",
        text: "That matters more than a simple deleted scene. Bringing Claire Temple into a Tom Holland Spider-Man film would tie the Netflix Marvel corner of the universe to the big-screen Spider-Man story in a way fans have waited years to see. Deadline's report also says there will be more surprises beyond the Temple cameo, though it does not name them.",
      },
      {
        type: "list",
        items: [
          "A restored cameo from Rosario Dawson as Claire Temple, also known as Night Nurse.",,
          "Dawson previously confirmed she filmed a scene cut from the theatrical release.",,
          "The report says the extra footage will include more surprises beyond the Temple cameo.",
        ],
      },
      { type: "h2", text: "Why Sony would bring Brand New Day back to theatres" },
      {
        type: "p",
        text: "Sony has done this before with Tom Holland's Spider-Man films. The studio released an extended cut of Spider-Man: Far From Home and a More Fun Stuff Version of Spider-Man: No Way Home, both adding deleted scenes to lure audiences back. The timing also follows Marvel Studios' own move: Avengers: Endgame returned as Endgame: Encore with a few minutes of additional footage, and it topped the weekend box office again.",
      },
      {
        type: "p",
        text: "The numbers explain the temptation. Brand New Day has earned about 2.5 billion dollars worldwide, according to Box Office Mojo figures cited by Polygon, including 958 million dollars in North America, the highest domestic total to date. Worldwide it sits third all time, behind only Avatar and Avengers: Endgame, trailing Avatar by about 428 million dollars, a gap the rerelease is unlikely to close completely.",
      },
      { type: "h2", text: "What we know about the original film" },
      {
        type: "p",
        text: "Spider-Man: Brand New Day arrived in theatres on July 31, 2026, directed by Destin Daniel Cretton and starring Tom Holland as Peter Parker. The film picks up with Peter fighting crime full time as Spider-Man in a world that no longer remembers him, after the memory wipe at the end of No Way Home. Alongside Holland, the cast includes Zendaya as MJ, Jacob Batalon as Ned Leeds, Jon Bernthal as Frank Castle, Sadie Sink and Mark Ruffalo as Bruce Banner.",
      },
      {
        type: "p",
        text: "After its theatrical run, the film moved to digital platforms on October 6, 2026, and a 4K Ultra HD, Blu-ray and DVD release is scheduled for December 15, 2026. Fans now want to know whether the extra footage will appear in theatres first, on disc later, or both, and Sony has not said yet.",
      },
      { type: "h2", text: "Spider-Man Brand New Day rerelease date: what is not confirmed yet" },
      {
        type: "p",
        text: "For now, the honest answer to most questions about the rerelease is that nobody outside Sony knows. There is no confirmed rerelease date, no confirmed runtime, and no studio-confirmed list of added scenes. The Deadline report describes a plan, not a finished announcement, and plans for extended cuts can change before they reach theatres.",
      },
      {
        type: "p",
        text: "What is confirmed is the film's extraordinary run: a two-month theatrical performance that made it the biggest domestic hit on record and the third-biggest worldwide release ever. Any rerelease would be building on that, not rescuing a struggling film. Sony only needs to give audiences one new reason to see it again.",
      },
      { type: "h2", text: "Why fans are talking about the Night Nurse cameo" },
      {
        type: "p",
        text: "Claire Temple has a long Marvel history. In the comics, the Night Nurse tended to the medical needs of New York City's vigilante heroes, a role Dawson's version carried into the Netflix shows, where she patched up Daredevil, Jessica Jones, Luke Cage and Iron Fist. Restoring her scene would acknowledge that street-level history inside a theatrical Spider-Man film, and it fits Brand New Day's tone, with Peter operating as a neighbourhood hero rather than an Avenger in a cosmic event.",
      },
      {
        type: "p",
        text: "Until Sony confirms the plan, treat the news as a strong, well-sourced report rather than a done deal. But the pieces line up: a record-breaking film, a studio with a history of extended Spider-Man cuts, a cut cameo from a beloved character, and Endgame: Encore showing audiences will still turn up for a few extra minutes.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Is the Spider-Man Brand New Day rerelease confirmed?",
            a: "Not by Sony. It is reported by Deadline and covered by Polygon on October 30, 2026, but Sony has not confirmed it or announced a date.",
          },,
          {
            q: "What new footage will the rerelease include?",
            a: "According to the report, a cut cameo from Rosario Dawson as Claire Temple, also known as Night Nurse, plus more surprises that have not been named.",
          },,
          {
            q: "Who is Claire Temple?",
            a: "Claire Temple, played by Rosario Dawson, was the medical contact for Marvel's Netflix heroes in Daredevil, Jessica Jones, Luke Cage, Iron Fist and The Defenders.",
          },,
          {
            q: "How much has Brand New Day earned?",
            a: "About 2.5 billion dollars worldwide, including 958 million dollars in North America, the highest domestic total to date and third-highest worldwide.",
          },,
          {
            q: "When is the rerelease date?",
            a: "No rerelease date has been announced. The film released in theatres on July 31, 2026, arrived on digital on October 6, 2026, and is due on 4K, Blu-ray and DVD on December 15, 2026.",
          },
        ],
      },
    ],
  },

  {
    slug: "jumanji-open-world-trailer-release-date-december-25-2026",
    image: "https://i.ytimg.com/vi/qy7vHLyVBAc/maxresdefault.jpg",
    imageAlt: "Official Jumanji Open World new trailer key art showing Dwayne Johnson, Karen Gillan, Jack Black and Kevin Hart with jungle creatures in a city",
    title: "Jumanji Open World Trailer: Release Date December 25, 2026, Cast and What the New Trailer Reveals",
    description:
      "Jumanji Open World trailer is out: the game breaks free into the real world. Release date December 25, 2026, full cast, India languages and trailer details.",
    excerpt:
      "The new Jumanji Open World trailer shows the game breaking free of its console and unleashing its chaos into the real world, ahead of its Christmas Day release on December 25, 2026.",
    date: "2026-10-31",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "The Jumanji Open World trailer has given fans the clearest look yet at the final chapter of the modern Jumanji trilogy, and the big twist is right there in the premise: this time, the game does not wait for anyone to pick up a controller. Sony Pictures released the new trailer on October 28, 2026, and it shows Jumanji breaking free of its console and spilling its creatures, rules and chaos into the real world. The film arrives in theatres on December 25, 2026, Christmas Day, and in India it will release in English, Hindi, Tamil and Telugu. Sony is billing it with the tagline, “Two worlds collide. One final game.”",
      },
      {
        type: "h2",
        text: "Jumanji Open World trailer: what the new footage actually shows",
      },
      {
        type: "p",
        text: "The trailer opens around Christmas in a snowy, ordinary-looking city, before jungle animals start rampaging through suburbia. Spencer Gilpin, played by Alex Wolff, warns that Jumanji has spilt into their world, and the danger becomes personal when his mother Janice, played by Marin Hinkle, gets sucked into the game. The trailer then flips the usual formula: instead of teenagers being pulled into a video game, the game's avatars are now walking around in the real world, behaving stiffly and oddly, as if stuck in a limited demo mode, which is where much of the comedy comes from.",
      },
      {
        type: "list",
        items: [
          "Jungle animals, including ostriches and other creatures, escape into city streets during the Christmas season.",
          "Spencer Gilpin warns that the game is beginning to bleed into the real world.",
          "Spencer's mother Janice is pulled into the game.",
          "The familiar avatars appear in the real world, behaving strangely.",
          "The trailer closes on “one final game,” the last film in the modern trilogy.",
        ],
      },
      {
        type: "p",
        text: "The official synopsis puts it simply: the heroes have escaped the jungles of Jumanji before, but this time the game comes to us, breaking free of its console and unleashing its chaos into our world. That removes the safety net of the earlier films, where the danger was mostly contained inside the game. Here, there is no console to switch off, because the jungle has arrived in the players' own neighbourhood.",
      },
      {
        type: "h2",
        text: "Who is back in Jumanji Open World",
      },
      {
        type: "p",
        text: "Director Jake Kasdan returns for the third time, after both Welcome to the Jungle and The Next Level, and he co-wrote the screenplay with Jeff Pinkner and Scott Rosenberg, based on Chris Van Allsburg's book Jumanji.",
      },
      {
        type: "list",
        items: [
          "Dwayne Johnson as Dr. Xander “Smolder” Bravestone.",
          "Kevin Hart as Franklin “Mouse” Finbar.",
          "Jack Black as Professor Sheldon “Shelly” Oberon.",
          "Karen Gillan as Ruby Roundhouse.",
          "Alex Wolff, Madison Iseman, Morgan Turner and Ser'Darius Blain as the original young players.",
          "Nick Jonas, Danny DeVito, Awkwafina and Rhys Darby also return, with newcomers including Burn Gorman, Nasim Pedrad, Brittany O'Grady, Lamorne Morris and Bebe Neuwirth.",
        ],
      },
      {
        type: "h2",
        text: "Jumanji Open World release date in India and languages",
      },
      {
        type: "p",
        text: "Jumanji Open World will release in cinemas on December 25, 2026. Sony Pictures Entertainment India has confirmed the same date for India, with versions in English, Hindi, Tamil and Telugu. The film was originally planned for December 11, but its date was moved by two weeks in March 2026 to Christmas Day, and its full title was revealed at CinemaCon in April 2026.",
      },
      {
        type: "h2",
        text: "How to watch the Jumanji Open World trailer",
      },
      {
        type: "steps",
        items: [
          "Go to YouTube and search for the official Sony Pictures or Sony Pictures India channel.",
          "Search for “Jumanji: Open World new trailer” on the channel to find the October 28 trailer.",
          "Pick your language version: the Hindi trailer is also available from Sony Pictures India, along with the English version.",
          "Watch for the Christmas-city opening and the avatars' arrival in the real world.",
          "Avoid re-uploaded copies if you want the clean official trailer.",
        ],
      },
      {
        type: "h2",
        text: "Why the Jumanji Open World trailer is trending now",
      },
      {
        type: "p",
        text: "The trailer is trending in India this week, with the Hindi trailer ranking among the top trending videos on YouTube in India since October 30. Timing helps: a Christmas blockbuster trailer in late October gives fans almost two months to talk about it and plan a holiday cinema trip. The farewell angle helps too, with the tagline “Two worlds collide. One final game” framing this as a last visit to familiar characters. And the twist itself is easy to share: ostriches in a city street look very different from a standard jungle adventure teaser.",
      },
      {
        type: "h2",
        text: "What we still do not know about Jumanji Open World",
      },
      {
        type: "p",
        text: "Sony has not yet announced a runtime or age rating, and those details are expected closer to release. How the game escapes, and how the players plan to send it back, are also being kept for the film itself. What is confirmed is the director, the returning cast, the December 25, 2026 release date, the India languages, and the central idea that the game is no longer contained.",
      },
      {
        type: "faq",
        items: [
          { q: "When is the Jumanji Open World release date?", a: "Jumanji Open World releases in theatres on December 25, 2026, Christmas Day, including in India." },
          { q: "What is the Jumanji Open World trailer about?", a: "The trailer shows Jumanji breaking free of its console, with jungle creatures and the game's avatars appearing in the real world during Christmas." },
          { q: "Who stars in Jumanji Open World?", a: "Dwayne Johnson, Kevin Hart, Jack Black and Karen Gillan return as the main avatars, alongside Alex Wolff, Madison Iseman, Morgan Turner, Ser'Darius Blain, Nick Jonas, Danny DeVito and Awkwafina." },
          { q: "Who directed Jumanji Open World?", a: "Jake Kasdan directed it and co-wrote it with Jeff Pinkner and Scott Rosenberg." },
          { q: "In which languages will Jumanji Open World release in India?", a: "Sony Pictures Entertainment India will release the film in English, Hindi, Tamil and Telugu on December 25, 2026." },
          { q: "Is Jumanji Open World the last Jumanji movie?", a: "Sony bills it as the final instalment of the modern trilogy with Johnson, Hart, Black and Gillan." },
        ],
      },
    ],
  },
  {
    slug: "death-stranding-isolations-anime-teaser-disney-plus-2027",
    image: "https://media.dotesports.com/wp-content/uploads/2026/10/Death-Stranding-Anime.webp",
    imageAlt: "Official Death Stranding Isolations teaser key art from Kojima Productions, showing the anime's desolate world",
    title: "Death Stranding Isolations Teaser: Kojima's Hand-Drawn Anime Comes to Disney+ in 2027",
    description:
      "Death Stranding Isolations teaser is out: Kojima Productions' hand-drawn anime streams on Disney+ in 2027 with a new story and 'My mom became a crater.'",
    excerpt:
      "Kojima Productions has unveiled the first teaser for Death Stranding Isolations, a hand-drawn 2D anime set in the Death Stranding universe that will stream on Disney+ in 2027.",
    date: "2026-10-31",
    category: "Gaming",
    sections: [
      {
        type: "p",
        text: "The Death Stranding Isolations teaser is finally here. Kojima Productions unveiled the first teaser for Death Stranding Isolations, its hand-drawn 2D anime series, during the studio's 10th anniversary celebration, Beyond the Strand, in Tokyo on October 30, 2026. The roughly 45-second teaser confirms a completely original story set in the world of Death Stranding, streaming on Disney+ in 2027. It does not star Sam Porter Bridges. Instead, it follows new characters in the same broken world, and its opening line has already become the teaser's most quoted moment: \u201cMy mom became a crater.\u201d",
      },
      { type: "h2", text: "Death Stranding Isolations teaser: what the 45 seconds actually show" },
      {
        type: "p",
        text: "The teaser opens on a lone porter standing on a ridge above an enormous crater, a thin beam of light rising from the centre, before cutting to a sleeping blonde girl wearing a visor marked with the word \u201cSLEEP\u201d. Around her, the signature horrors of the Death Stranding universe bleed into everyday spaces: black handprints press through glass, dark hands surge from the ground, and the girl wakes gasping from a nightmare in a storeroom lined with green-lit jars. The final cards carry the title logo and the words \u201cExclusively on Disney+ in 2027\u201d, with Hulu branding also appearing in the teaser.",
      },
      {
        type: "list",
        items: [
          "A porter overlooking a vast crater, the aftermath of a Voidout, the explosion left when a BT catches a living person.",
          "A young girl asleep in a bunk, wearing a visor that reads \u201cSLEEP\u201d, who wakes gasping from a nightmare.",
          "Black tar handprints and surging dark hands, the visual language of BTs, the stranded souls of the dead.",
          "A shelf holding a figure of Ludens, Kojima Productions' mascot.",
          "A closing title card confirming a 2027 premiere on Disney+, with no exact date yet announced.",
        ],
      },
      {
        type: "p",
        text: "The most striking choice is the animation itself. Where the games use realistic, motion-captured performances and vast 3D landscapes, Isolations uses traditional, hand-drawn 2D animation with painted backgrounds: a smaller, more intimate story told in a style closer to a nightmare remembered than a blockbuster played.",
      },
      { type: "h2", text: "A new story in the same world, not Sam Bridges' story" },
      {
        type: "p",
        text: "According to Kojima Productions' official synopsis, Death Stranding Isolations is set in North America immediately after Sam Porter Bridges reconnects the continent through the Chiral Network in the first game. But it tells a standalone story about different people facing the same question Sam faced: what does connection cost, and what happens to those who refuse it? It centres on a young girl who lost her mother in the aftermath of the Death Stranding, an event summed up in the teaser's opening line. Shaped by that loss, she has grown comfortable in isolation and reluctant to connect with others. Her journey introduces a small ensemble, including a wise old man who tries to connect people differently from Sam, a female soldier caught in an endless cycle of war, and a boy consumed by resentment towards the world. Together, they revisit the games' central theme, isolation versus human connection, from the perspective of ordinary people rather than a legendary porter.",
      },
      { type: "h2", text: "Who is making Death Stranding Isolations" },
      {
        type: "p",
        text: "The teaser credits, revealed in full for the first time, confirm a heavyweight animation team. Hideo Kojima, the creator of Death Stranding, serves as executive producer. Takayuki Sano directs, with animation by Japanese studio E&H Production, known for Ninja Kamui and Bullet/Bullet. Series composition and screenplay come from author Tow Ubukata, while Ilya Kuvshinov provides the original character designs. This is being positioned as an anime in its own right, not just a promotional extra for the games.",
      },
      {
        type: "list",
        items: [
          "Executive producer: Hideo Kojima, creator of Death Stranding.",
          "Director: Takayuki Sano, with animation by E&H Production.",
          "Series composition and screenplay: Tow Ubukata.",
          "Original character designs: Ilya Kuvshinov.",
          "Animation style: traditional, hand-drawn 2D with painted backgrounds.",
        ],
      },
      { type: "h2", text: "Death Stranding Isolations release date and what is still unknown" },
      {
        type: "p",
        text: "So far, Kojima Productions has confirmed only a 2027 window for Death Stranding Isolations on Disney+, with no exact premiere date, episode count or voice cast announced yet. The project was first teased during a Disney+ Originals event in Hong Kong last year, as the studio's first global streaming partnership with Disney+, and the October 30 teaser is the first full look at what it has produced. Further details are expected through Kojima Productions' official website and YouTube channel closer to release.",
      },
      { type: "h2", text: "Why the Death Stranding Isolations teaser matters" },
      {
        type: "p",
        text: "Death Stranding has always been a franchise about connection, and Isolations turns that theme inward. The games asked players to walk across a ruined America rebuilding links between isolated shelters. The anime asks what happens to the people who watched that rebuilding from the sidelines and chose, or were forced, to stay apart. That is a braver premise than a straight adaptation, and the teaser's focus on a grieving girl rather than a hero with a cargo pack suggests Kojima Productions knows it. With more than 20 million cumulative players across the games, according to figures cited in coverage, the audience for this story already exists. What remains now is the longer wait until 2027, when the full series arrives on Disney+.",
      },
      {
        type: "faq",
        items: [
          {
            q: "When does Death Stranding Isolations release?",
            a: "Death Stranding Isolations is scheduled to premiere on Disney+ in 2027. Kojima Productions has not yet announced an exact release date.",
          },
          {
            q: "Is Death Stranding Isolations a retelling of the games?",
            a: "No. It tells a new, standalone story with new characters, set in the same world after Sam Porter Bridges reconnects North America in the first game.",
          },
          {
            q: "Who is the main character of Death Stranding Isolations?",
            a: "The teaser centres on a young girl who lost her mother in the aftermath of the Death Stranding. She is reluctant to connect with others and prefers isolation.",
          },
          {
            q: "Who is directing Death Stranding Isolations?",
            a: "Takayuki Sano directs, with animation by E&H Production. Hideo Kojima is executive producer, Tow Ubukata handles screenplay, and Ilya Kuvshinov provides the character designs.",
          },
          {
            q: "Where can I watch the Death Stranding Isolations teaser?",
            a: "Kojima Productions released the official teaser on its YouTube channel on October 30, 2026.",
          },
        ],
      },
    ],
  },
  {
    slug: "ffxiv-evercold-release-date-february-23-2027-zephyr-job",
    image: "https://media.fullcleared.com/2026/10/31024433/ffxiv-evercold-gets-a-date-reveals-crossbow-job-zephyr-1536x864.jpg",
    imageAlt: "Zephyr, the new crossbow job in Final Fantasy XIV: Evercold, with an avian familiar (official Square Enix art)",
    title: "FFXIV Evercold Release Date: February 23, 2027, Plus New Zephyr Job Revealed at Fan Fest Tokyo",
    description:
      "FFXIV Evercold release date is February 23, 2027, with early access from February 19. Pre-orders open November 4, and the new Zephyr job joins the expansion.",
    excerpt:
      "Square Enix has confirmed the FFXIV Evercold release date as February 23, 2027, with early access from February 19, and revealed the new crossbow job Zephyr at Fan Festival 2026 in Tokyo.",
    date: "2026-10-31",
    category: "Gaming",
    sections: [
      {
        type: "p",
        text: "The FFXIV Evercold release date is finally official. Square Enix confirmed during the Fan Festival 2026 keynote in Tokyo that Final Fantasy XIV: Evercold, the sixth expansion for its long-running MMORPG, will launch on February 23, 2027. Players who pre-order will get in four days earlier, with early access beginning on February 19, 2027, and pre-orders open on November 4, 2026. Evercold was first revealed in April 2026 at the Anaheim Fan Festival with only a January 2027 window attached, so Tokyo was always the event where fans expected the exact day. It delivered that and more, opening the keynote with the expansion's full opening cinematic and revealing Evercold's second new job, Zephyr, a crossbow-wielding ranged damage dealer with a bird companion.",
      },
      { type: "h2", text: "FFXIV Evercold release date: the key dates to remember" },
      {
        type: "list",
        items: [
          "Full launch: February 23, 2027, on PS5, PS4, Xbox Series X|S, Switch 2, Windows, Mac and Steam.",
          "Early access: February 19, 2027, for players who pre-order.",
          "Pre-orders open: November 4, 2026.",
          "Previous window: January 2027, announced at Anaheim in April 2026, so the shift is roughly four weeks.",
        ],
      },
      {
        type: "p",
        text: "The move from January to late February is a delay, but only a small one by MMO standards, and Square Enix presented it that way on stage. Producer and director Naoki Yoshida, known to players as Yoshi-P, said the extra time was about giving players the best possible experience, and keynote coverage describes the team as needing a little more time to polish the expansion. Nothing in the Tokyo announcement suggested rework or cut content. Instead, the keynote was full of finished-looking material, from the opening cinematic to the new job reveal, which points to a game in its final polish phase rather than one in trouble.",
      },
      { type: "h2", text: "Meet Zephyr: Evercold's new crossbow job" },
      {
        type: "p",
        text: "The other headline from Tokyo was Zephyr, the second of Evercold's two new jobs. Zephyr is a physical ranged DPS job that fights with a crossbow, supported in battle by an avian familiar called a Nephele. The reveal trailer shows a hooded, blue-robed character firing the crossbow while the bird dives on targets, and Yoshida walked on stage in the job's outfit to present it. The crossbow is a new weapon type for Final Fantasy XIV: Bard uses a bow, Machinist uses guns and Dancer throws chakrams, so Zephyr fills a gap players have talked about for years.",
      },
      {
        type: "list",
        items: [
          "Role: physical ranged DPS, attacking from distance.",
          "Weapon: crossbow, with support from the Nephele avian familiar.",
          "Starting level: 90, with its job quest chain beginning in Gridania.",
          "Battle mode: playable only in Evolved Mode, the new battle system.",
          "Partner job: joins Bastion, the dual-greatshield tank revealed in Berlin in July 2026.",
        ],
      },
      {
        type: "p",
        text: "The Evolved Mode restriction is worth understanding before you plan a job change. Evercold arrives alongside Final Fantasy XIV version 8.0, which introduces a battle-system overhaul with two modes: Evolved Mode, the new system, and Reborn Mode, which keeps the current combat system for players who do not want the overhaul. Both new jobs, Zephyr and Bastion, are only playable in Evolved Mode. Square Enix has not yet published Zephyr's full action list, but the trailer makes its identity clear: a mobile ranged fighter whose bird companion is part of the damage, not just decoration.",
      },
      { type: "h2", text: "What else the Tokyo keynote revealed about Evercold" },
      {
        type: "p",
        text: "Evercold begins a new chapter called the Godless Realms Saga and takes the Warrior of Light to the Fourth, a reflection of the world that players have never explored before. The expansion raises the level cap from 100 to 110, and the keynote introduced Sessrymnir, the Realmship of Earth, joining Naglfar, the Realmship of Water, and Hringhorni, the Realmship of Fire, as the floating vessels players will spend much of the expansion aboard above the frozen wastes of the Fourth. Beyond the main story, Evercold will include a Neon Genesis Evangelion crossover raid series, titled Ghosts of Desire, and a Final Fantasy VII remake trilogy crossover raid series.",
      },
      { type: "h2", text: "Evercold editions, Collector's Box and pre-order details" },
      {
        type: "p",
        text: "Pre-orders open on November 4, 2026, and pre-ordering is what qualifies you for the February 19 early access period, so players who want to start on day one of early access should be ready when pre-orders go live. Square Enix has already shown the Collector's Bundle, which combines a physical Collector's Box with the Digital Collector's Edition. The physical box includes a Warrior of Light Reaper statue, a special art box featuring artwork by Yoshitaka Amano, a tapestry of the Fourth, an Ethos metal keychain and a Köttr mini plush. The digital items are the Valhallar Odin mount, the Entreat Crystal emote and the Crystal Skyltborg weapon for Bastion.",
      },
      { type: "h2", text: "Why a four-week delay is good news in disguise" },
      {
        type: "p",
        text: "It is easy to read any delay as bad news, but for Final Fantasy XIV players the context is reassuring. The expansion was announced with only a month-long window, not a date, and Tokyo delivered a specific day plus a full opening cinematic, a second job and a working pre-order schedule. That is the shape of a normal final stretch, not a project in crisis. For now, mark February 23, 2027 in the calendar and set a reminder for November 4.",
      },
      {
        type: "faq",
        items: [
          {
            q: "What is the FFXIV Evercold release date?",
            a: "Final Fantasy XIV: Evercold launches on February 23, 2027. Early access for pre-orders begins on February 19, 2027.",
          },
          {
            q: "When do FFXIV Evercold pre-orders open?",
            a: "Pre-orders open on November 4, 2026. Pre-ordering is required to qualify for early access.",
          },
          {
            q: "What is the new Zephyr job in Evercold?",
            a: "Zephyr is a physical ranged DPS job that wields a crossbow and fights alongside an avian familiar called a Nephele. It starts at level 90 and is playable only in Evolved Mode.",
          },
          {
            q: "Was Evercold delayed?",
            a: "Yes, by about four weeks. It was announced with a January 2027 window in April 2026, and the Tokyo keynote moved it to February 23, 2027, to allow more polish time.",
          },
          {
            q: "Which platforms will Evercold launch on?",
            a: "PlayStation 5, PlayStation 4, Xbox Series X|S, Nintendo Switch 2, Windows, Mac and Steam.",
          },
        ],
      },
    ],
  },
  {
    slug: "manisha-bhanwala-first-indian-woman-wrestling-world-champion",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/ManishaBhanwala.jpg",
    imageAlt: "Manisha Bhanwala at the 2025 Asian Championships (file photo)",
    title: "Manisha Bhanwala Makes History: First Indian Woman to Win Wrestling World Championship Gold",
    description:
      "Manisha Bhanwala became the first Indian woman to win wrestling World Championships gold, beating Abigail Nette 8-6 in Astana after trailing 0-6.",
    excerpt:
      "Manisha Bhanwala became the first Indian woman to win a wrestling World Championships gold medal, beating Abigail Nette of the USA 8-6 in the 59kg final in Astana.",
    date: "2026-10-31",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Manisha Bhanwala has written her name into Indian sporting history. The 29-year-old wrestler from Haryana became the first Indian woman ever to win a gold medal at the Senior World Wrestling Championships, beating Abigail Nette of the United States 8-6 in the women's freestyle 59kg final in Astana, Kazakhstan, on Friday, October 30, 2026. It was a final that looked lost before it truly began: Manisha trailed 0-6, then fought back point by point to take the gold.",
      },
      { type: "h2", text: "Manisha Bhanwala's historic final: from 0-6 down to 8-6 gold" },
      {
        type: "p",
        text: "The final against Nette, the Pan-American champion from the USA, started in the worst possible way for the Indian. Nette raced to a 6-0 lead, and the gold looked to be slipping away. But Manisha refused to panic. She started her comeback with a takedown, and when the American camp challenged the call, the appeal failed, adding another point to the Indian's tally. She clawed her way level at 6-6, then produced the decisive score in the dying moments to seal an 8-6 victory. When the final whistle sounded, she jumped in celebration, bowed down and kissed the mat.",
      },
      {
        type: "p",
        text: "The win makes Manisha only the second Indian wrestler in history to win a World Championships gold medal, after two-time Olympic medallist Sushil Kumar, who won the men's 66kg title in Moscow in 2010. Before her triumph, no Indian woman had ever stood on top of the podium at the Senior World Championships.",
      },
      { type: "h2", text: "Manisha Bhanwala's road to the world title in Astana" },
      {
        type: "p",
        text: "Manisha's run through the 59kg bracket was dominant from the start. She moved to the non-Olympic 59kg category for this edition after previously wrestling at 57kg and 62kg, and the decision paid off in full. Her path to the final looked like this:",
      },
      {
        type: "list",
        items: [
          "Round of 16: Victory by fall over Laurence Beauregard of Canada.",
          "Quarterfinal: A 6-0 win over Bolortuya Khurelkhuu of Mongolia.",
          "Semifinal: Victory by technical superiority over local favourite Altyn Shagayeva of Kazakhstan.",
          "Final: An 8-6 comeback win over Abigail Nette of the United States, after trailing 0-6.",
        ],
      },
      {
        type: "p",
        text: "Reaching the final alone was a landmark: Manisha became only the third Indian woman ever to reach a World Championships final. Neelam Sirohi and Kajal Dhochak had also reached gold-medal bouts at the same championships, making it the first edition in which three Indian women wrestled for gold. Manisha made sure the campaign ended with gold rather than silver.",
      },
      { type: "h2", text: "India's record four medals at the 2026 World Championships" },
      {
        type: "p",
        text: "Manisha's gold capped a record campaign for the Indian women's team, which finished the championships in Astana with four medals, the country's best-ever haul at the event. The full medal list tells the story of a team performing together, not just one star:",
      },
      {
        type: "list",
        items: [
          "Gold: Manisha Bhanwala, women's freestyle 59kg.",
          "Silver: Neelam Sirohi, women's freestyle 50kg.",
          "Silver: Kajal Dhochak, women's freestyle 76kg.",
          "Bronze: Tanu Sharma, women's freestyle 72kg.",
        ],
      },
      {
        type: "p",
        text: "Union Sports Minister Mansukh Mandaviya was among the first to congratulate Manisha, calling her victory a historic moment for Indian wrestling. Across the country, the win was celebrated as a breakthrough for women's sport in India.",
      },
      { type: "h2", text: "The story behind the gold: a father's dream" },
      {
        type: "p",
        text: "Manisha's journey to the top of the world podium was anything but straightforward. Born in Rohtak district in Haryana, she took up wrestling at the age of 17, which is considered late for the sport, initially to get fit at her father's urging. Finding the right weight category to suit her height proved a long struggle, and she moved between categories several times during her career.",
      },
      {
        type: "p",
        text: "The hardest chapter came in 2022, when her father Suresh died suddenly on the very day she was due to leave for the Asian Championships in Mongolia. Manisha almost quit wrestling after that loss. Instead, she carried the dream forward: before leaving for Astana she had photographs of her parents printed on a white T-shirt, intending to win the gold and show that T-shirt to the world. After the final whistle, she did exactly that, holding it up for everyone to see.",
      },
      { type: "h2", text: "Why Manisha Bhanwala's gold matters for Indian wrestling" },
      {
        type: "p",
        text: "A first world title changes what young wrestlers believe is possible. Indian women's wrestling has produced Asian champions, Commonwealth medallists and Olympic medallists, but the World Championships gold had remained out of reach. Manisha's win removes that barrier, and it does so in a style that will inspire: a late starter, a wrestler who changed weights repeatedly, and a finalist who refused to accept a 6-0 deficit as defeat. It is also a team story, with four medals showing depth across weight categories rather than a single success.",
      },
      {
        type: "p",
        text: "For Manisha herself, the gold is the biggest medal of her career so far, adding to her 2025 Asian Championships title at 62kg and her 2016 South Asian Games gold. At 29, she has now done something no Indian woman had done before, on the biggest stage her sport offers outside the Olympics.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Who is Manisha Bhanwala?",
            a: "Manisha Bhanwala is a 29-year-old Indian freestyle wrestler from Rohtak, Haryana, who became the first Indian woman to win a World Championships gold medal, in the 59kg category at Astana in 2026.",
          },
          {
            q: "Who did Manisha Bhanwala beat in the World Championships final?",
            a: "She beat Abigail Nette of the United States 8-6 in the women's freestyle 59kg final, coming back from a 0-6 deficit to win the gold.",
          },
          {
            q: "How many medals did India win at the 2026 World Wrestling Championships?",
            a: "India won four medals in women's wrestling: one gold (Manisha Bhanwala, 59kg), two silvers (Neelam Sirohi, 50kg, and Kajal Dhochak, 76kg) and one bronze (Tanu Sharma, 72kg).",
          },
          {
            q: "Who was the only other Indian wrestling world champion before Manisha?",
            a: "Sushil Kumar, who won the men's 66kg gold at the 2010 World Championships in Moscow. Manisha is the second Indian overall, and the first Indian woman, to win a world title.",
          },
        ],
      },
      {
        type: "p",
        text: "Manisha Bhanwala's name now sits alongside Sushil Kumar's in the record books, and her comeback in Astana will be remembered as one of the great finals in Indian wrestling history.",
      },
    ],
  },
  {
    slug: "pm-kisan-24th-instalment-status-check-2000-october-30",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80",
    imageAlt: "A tractor working in a green farm field in India",
    title: "PM Kisan 24th Instalment Status Check: Rs 2,000 Released on October 30, How to Check Your Payment",
    description:
      "PM Kisan 24th instalment status check: Rs 2,000 released on October 30 to 9.34 crore farmers. Check beneficiary status and e-KYC if payment is pending.",
    excerpt:
      "The PM Kisan 24th instalment of Rs 2,000 was released on October 30, 2026, and eligible farmers can check their beneficiary status on the official PM-KISAN portal.",
    date: "2026-10-31",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The PM Kisan 24th instalment status check is the question most farmers are asking this morning, and the short answer is simple: the money has been released, and your payment status can be checked online in a few minutes. Prime Minister Narendra Modi released the 24th instalment of the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme on October 30, 2026, at an event in Banaskantha district in Gujarat. Under this instalment, Rs 2,000 was transferred directly to eligible farmers, with more than Rs 18,680 crore released to over 9.34 crore farmer families. If the amount has not yet appeared in your account, check your beneficiary status on the official portal first: a pending e-KYC, an unlinked bank account, or a land-record check can hold up an individual payment even after the instalment has been released.",
      },
      { type: "h2", text: "PM Kisan 24th instalment: key details" },
      {
        type: "list",
        items: [
          "Instalment: 24th instalment of PM-KISAN, released on October 30, 2026.",
          "Amount per farmer: Rs 2,000, paid by direct benefit transfer into the bank account.",
          "Total released: more than Rs 18,680 crore to over 9.34 crore farmer families.",
          "Released by: Prime Minister Narendra Modi, at an event in Banaskantha, Gujarat.",
          "Annual help under the scheme: Rs 6,000 per eligible farmer family, paid in three equal instalments of Rs 2,000 every four months.",
          "Who gets it: eligible landholding farmer families whose records, e-KYC and bank details are in order. Release of the instalment does not by itself guarantee payment to every registered farmer.",
        ],
      },
      { type: "h2", text: "How to check PM Kisan 24th instalment status" },
      {
        type: "p",
        text: "The most reliable way to check is the official PM-KISAN portal, under the Farmers Corner section. It shows your registration details, e-KYC status and the status of each instalment, so it tells you whether the problem is a delay or a verification issue. Keep your PM-KISAN registration number ready; if you do not remember it, the portal has an option to look it up.",
      },
      {
        type: "steps",
        items: [
          "Open the official PM-KISAN portal and go to the Farmers Corner section on the homepage.",
          "Select Know Your Status to check your beneficiary and payment status.",
          "Enter your registration number and complete the verification shown on the screen.",
          "Check the instalment-wise details: look for the 24th instalment entry and whether it is shown as paid, pending or held for verification.",
          "If the status shows a problem with e-KYC, Aadhaar seeding or land records, fix that item first, then check again after the record is updated.",
        ],
      },
      { type: "h2", text: "Why some farmers may not have received Rs 2,000 yet" },
      {
        type: "p",
        text: "A released instalment and a credited payment are two different steps, and several routine checks sit between them. Farmers whose e-KYC is incomplete, whose bank account is not seeded with Aadhaar, or whose land records are not linked on the portal can face delays, and in some cases benefits are temporarily withheld while physical verification is completed. The portal status, not rumours on social media, is the place to find the real reason.",
      },
      {
        type: "list",
        items: [
          "e-KYC not completed: e-KYC is mandatory for PM-KISAN beneficiaries, and an incomplete e-KYC is one of the most common reasons for a held payment.",
          "Aadhaar not linked to the bank account: the payment is made by direct benefit transfer, so the bank account must be Aadhaar-seeded and ready for DBT.",
          "Land records not seeded: the farmer's land details must be linked on the PM-KISAN portal, and mismatches can hold the payment.",
          "Verification hold: benefits can be withheld temporarily where suspected eligibility cases are under physical verification.",
        ],
      },
      { type: "h2", text: "How to complete PM Kisan e-KYC" },
      {
        type: "p",
        text: "If your status points to e-KYC, completing it is usually the fastest fix. There are three accepted routes.",
      },
      {
        type: "steps",
        items: [
          "OTP-based e-KYC: complete it on the official PM-KISAN portal using the one-time password sent to your Aadhaar-linked mobile number.",
          "Face authentication: use the PM-KISAN mobile app, which supports face authentication for e-KYC.",
          "Biometric e-KYC: visit your nearest Common Service Centre, where staff can complete biometric verification for you.",
        ],
      },
      { type: "h2", text: "What to do if your PM Kisan 24th instalment is still pending" },
      {
        type: "steps",
        items: [
          "Check your status first on the portal and note exactly which item is marked pending: e-KYC, Aadhaar seeding, land seeding or verification.",
          "Fix that specific item, whether it is e-KYC on the portal, Aadhaar seeding at your bank, or a land-record correction through your state authorities.",
          "Do not pay anyone who promises to release your instalment for a fee: the scheme does not work through agents charging for payment release.",
          "Never share your OTP, bank password or Aadhaar details with callers or messages claiming to be from PM-KISAN. Official status checks happen on the portal, not through a link sent by an unknown number.",
          "If the portal still shows a verification hold after you have corrected your details, contact your local agriculture office or Common Service Centre with your registration number and the exact status shown.",
        ],
      },
      { type: "h2", text: "PM Kisan 24th instalment: what this means for farmers" },
      {
        type: "p",
        text: "For eligible families, the 24th instalment is the latest Rs 2,000 part of the Rs 6,000 annual support that PM-KISAN provides to help with farming and household needs. Make sure the portal entry you are reading is for the 24th instalment, and keep your e-KYC and bank details updated so the next instalment is not held up for the same reason.",
      },
      {
        type: "faq",
        items: [
          {
            q: "When was the PM Kisan 24th instalment released?",
            a: "The 24th instalment was released on October 30, 2026, by Prime Minister Narendra Modi at an event in Banaskantha, Gujarat.",
          },
          {
            q: "How much money do farmers get in the PM Kisan 24th instalment?",
            a: "Eligible farmers receive Rs 2,000 in this instalment. PM-KISAN provides Rs 6,000 a year in three equal instalments of Rs 2,000.",
          },
          {
            q: "How do I check my PM Kisan 24th instalment status?",
            a: "Go to the official PM-KISAN portal, open Farmers Corner, select Know Your Status, enter your registration number and check the instalment-wise payment details.",
          },
          {
            q: "Why has my PM Kisan payment not come yet?",
            a: "The most common reasons are incomplete e-KYC, a bank account not seeded with Aadhaar, land records not linked on the portal, or a verification hold. Your portal status will show which one applies to you.",
          },
        ],
      },
    ],
  },
  {
    slug: "isro-nvs-03-launch-gslv-f18-navic-success",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GSLV_F16_during_Liftoff_carrying_NISAR.webp/1280px-GSLV_F16_during_Liftoff_carrying_NISAR.webp",
    imageAlt: "A GSLV rocket lifting off from Sriharikota, the same launch site used for the GSLV-F18 NVS-03 mission",
    title: "ISRO NVS-03 Launch Success: GSLV-F18 Puts NavIC Satellite in Orbit",
    description:
      "ISRO NVS-03 launch success: GSLV-F18 placed the 2,250-kg NavIC satellite in orbit on October 30, restoring India's navigation constellation.",
    excerpt:
      "ISRO's GSLV-F18 successfully placed the NVS-03 navigation satellite into its intended orbit late on October 30, 2026, giving India's NavIC system a much-needed boost.",
    date: "2026-10-31",
    category: "Tech",
    sections: [
      {
        type: "p",
        text: "The ISRO NVS-03 launch has ended in success. Late on Friday night, October 30, 2026, the Indian Space Research Organisation's GSLV-F18 rocket lifted off from Sriharikota carrying the NVS-03 navigation satellite, and within minutes the mission was declared a success. For India's homegrown navigation system, NavIC, this was not just another launch: it was the mission meant to pull the constellation back from a difficult stretch marked by ageing satellites and a failed orbit-raising attempt. In the early hours of Saturday, October 31, ISRO confirmed that NVS-03 was in its intended orbit.",
      },
      { type: "h2", text: "ISRO NVS-03 launch: what happened overnight" },
      {
        type: "p",
        text: "GSLV-F18 lifted off at 11:51 pm IST on October 30 from the Second Launch Pad at the Satish Dhawan Space Centre in Sriharikota, Andhra Pradesh, after a 24-hour countdown. ISRO's live coverage had begun at 11:20 pm, and the rocket climbed into the night sky on schedule. About 18 minutes after liftoff, the vehicle placed NVS-03 into its intended geosynchronous transfer orbit. At 12:23 am IST on October 31, ISRO announced on X: Mission Success, confirming that GSLV-F18 had successfully placed NVS-03 in the intended orbit. ISRO Chairman Dr. V. Narayanan said the vehicle had precisely injected the 2,250-kg satellite into its intended elliptical orbit, and congratulated the ISRO teams, industry partners and academic partners behind the mission.",
      },
      { type: "h2", text: "What is NVS-03, and why did NavIC need it?" },
      {
        type: "p",
        text: "NVS-03 is the third satellite in ISRO's second-generation navigation series, built to ensure continuity of services from the Indian Regional Navigation Satellite System, now known as NavIC, short for Navigation with Indian Constellation. NavIC provides position, navigation and timing services over India and up to about 1,500 km beyond the country's borders, reducing dependence on foreign navigation systems such as the United States' GPS. NVS-03 carries an indigenous atomic clock alongside procured atomic clocks, and it adds the L1 navigation signal to the existing L5 and S signals.",
      },
      {
        type: "p",
        text: "The launch mattered so much because NavIC had been running short of healthy satellites. NVS-02, launched in January 2025, could not raise its orbit after its onboard engines failed to fire, severely limiting its usefulness. Another older satellite, IRNSS-1F, completed its 10-year mission life in March 2026, and ISRO later said its procured atomic clock had stopped functioning. Before NVS-03, only three satellites were left providing position, navigation and timing services: IRNSS-1B, IRNSS-1I and NVS-01. ISRO described the NVS-03 success as restoring the constellation to its minimum operational configuration of four satellites.",
      },
      { type: "h2", text: "GSLV-F18 mission facts" },
      {
        type: "list",
        items: [
          "Launch vehicle: GSLV-F18, the 20th flight of India's Geosynchronous Satellite Launch Vehicle.",
          "Satellite: NVS-03, weighing about 2,250 kg, the third satellite in the second-generation NavIC series.",
          "Liftoff: 11:51 pm IST on October 30, 2026, from the Second Launch Pad at Satish Dhawan Space Centre, Sriharikota.",
          "Rocket: a roughly 50-metre-tall, three-stage vehicle with a lift-off mass of about 420 tonnes.",
          "Target orbit: a geosynchronous transfer orbit with a planned perigee of 170 km and apogee of 37,023 km.",
          "Flight time to separation: about 18 minutes, including the cryogenic upper stage performing normally.",
          "Turnaround: ISRO said the mission was completed within 56 days of the previous GSLV launch, the shortest such gap so far.",
          "Next in series: NVS-04 and NVS-05, which the government has said are at an advanced stage of realisation.",
        ],
      },
      { type: "h2", text: "What happens next for NVS-03" },
      {
        type: "p",
        text: "A successful launch is only the first step. NVS-03 must now use its own propulsion to raise its orbit from the transfer orbit towards its final geosynchronous slot, and then go through testing and commissioning before it can enter regular service. That is worth remembering before expecting an immediate change on your phone: a navigation satellite only starts helping users once it has been checked out in its final orbit and its signals have been validated. ISRO has also made clear that more satellites are still needed for a robust, redundant constellation, with NVS-04 and NVS-05 planned to follow.",
      },
      { type: "h2", text: "What the ISRO NVS-03 launch means for everyday users in India" },
      {
        type: "p",
        text: "For most people, NavIC works quietly in the background. Its signals support navigation and timing services used in areas such as transport, mapping, disaster management and other civilian and strategic applications, and a stronger constellation means more reliable coverage over India and the surrounding region. The addition of the L1 signal on NVS-03 is also significant, because L1 is a widely used civilian navigation frequency, which should make NavIC signals easier for a broader range of receivers to use. None of this changes overnight, and ISRO has not announced a date for NVS-03 to begin operational service.",
      },
      { type: "h2", text: "How to follow NVS-03 updates" },
      {
        type: "steps",
        items: [
          "Follow ISRO's official announcements for confirmation that NVS-03 has reached its final orbit.",
          "Watch for updates on orbit-raising and commissioning, which come before the satellite enters service.",
          "Look out for news on NVS-04 and NVS-05, the next satellites planned for the NavIC constellation.",
          "Be cautious about social media claims on NavIC coverage: trust ISRO's statements over unverified posts.",
          "Check whether your device or app lists NavIC support before assuming a new satellite changes your navigation.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "Was the ISRO NVS-03 launch successful?",
            a: "Yes. GSLV-F18 lifted off at 11:51 pm IST on October 30, 2026, and ISRO confirmed at 12:23 am IST on October 31 that NVS-03 had been placed in its intended orbit.",
          },
          {
            q: "What is NVS-03?",
            a: "NVS-03 is the third satellite in ISRO's second-generation NavIC navigation series. It weighs about 2,250 kg, carries an indigenous atomic clock alongside procured clocks, and adds the L1 signal to the existing L5 and S signals.",
          },
          {
            q: "Why is NVS-03 important for NavIC?",
            a: "NavIC had slipped below the strength needed for reliable standalone positioning after the NVS-02 orbit-raising failure and the end of older satellites' mission lives. ISRO said NVS-03 restores the constellation to its minimum operational configuration of four satellites.",
          },
          {
            q: "Will NavIC work better immediately after the launch?",
            a: "Not immediately. NVS-03 must still raise its orbit to its final geosynchronous slot and complete testing and commissioning before it enters regular service.",
          },
        ],
      },
    ],
  },
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
