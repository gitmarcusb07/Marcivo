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
    slug: "us-midterm-elections-2026-voting-today-house-senate-what-is-at-stake",
    image: "https://www.ey.com/adobe/dynamicmedia/deliver/dm-aid--e2c25154-8287-4f71-a42c-1a55a682440c/ey-united-states-capitol-building.jpg?preferwebp=true&quality=85&width=900",
    imageAlt: "The United States Capitol building in Washington DC, home of the US Congress",
    title: "US Midterm Elections 2026: Voting Today for House, Senate and 36 Governors - What Is at Stake",
    description:
      "US midterm elections 2026: Americans vote on November 3 for all 435 House seats, 35 Senate seats and 36 governors. Key races, India timings and what changes.",
    excerpt:
      "Americans vote on Tuesday, November 3, 2026, in the US midterm elections 2026, deciding control of the House of Representatives and the Senate for the final two years of Donald Trump's presidency.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "US midterm elections 2026 are under way on Tuesday, November 3, 2026, in the first nationwide vote since the 2024 presidential race. About 210 million Americans are registered to vote, and they will decide how much power Donald Trump has for the rest of his presidency. Trump himself is not on the ballot, but control of Congress is, making this a report card on his second term.",
      },
      {
        type: "h2",
        text: "US Midterm Elections 2026: What Is Being Decided",
      },
      {
        type: "p",
        text: "Midterm elections are held halfway through a president's four-year term. Voters elect Congress, which writes federal law, controls federal spending, confirms judges and senior officials, and investigates the executive branch. This year every one of the 435 House seats is up for election, along with 35 of the 100 Senate seats and 36 governorships, plus state posts and ballot measures on abortion, taxes and voting rules.",
      },
      {
        type: "h2",
        text: "The House: Democrats Need a Net Gain of Four Seats",
      },
      {
        type: "p",
        text: "All 435 House seats are contested because House members serve two-year terms. Republicans currently hold 218 seats, Democrats hold 214, one seat is held by an independent and two are vacant. Control takes 218 seats, so Democrats need a net gain of four seats to take the House. Forecasters favour the Democrats here: Decision Desk HQ's forecast, updated on November 2, gave them an 84 percent chance of winning control, projecting 241 seats. Those are probabilities, not results, and only 40 to 50 seats are considered truly competitive.",
      },
      {
        type: "h2",
        text: "The Senate: A Steeper Climb for Democrats",
      },
      {
        type: "p",
        text: "Senators serve six-year terms, so only about a third of the Senate is contested at a time. This year 35 seats are up: 33 in regular elections and two special elections, in Florida and Ohio, to fill seats vacated by Secretary of State Marco Rubio and Vice President JD Vance. Republicans defend 22 of the 35 seats, Democrats 13. Republicans currently hold 53 Senate seats; Democrats hold 45, plus two independents who caucus with them, giving the Democratic bloc 47 seats. Democrats need a net gain of four seats to reach 51. At 50-50, Vice President Vance breaks tied votes for the Republicans, so a tie still leaves the Senate in Republican hands.",
      },
      {
        type: "p",
        text: "Decision Desk HQ gave Democrats a 64 percent chance of Senate control, projecting 52 seats, but the Senate is much closer than the House. The three toss-ups in Kansas, Iowa and Ohio, all held by Republicans, plus contests in Texas, Maine, Alaska, North Carolina, Georgia, Michigan and New Hampshire, are most likely to decide it. In Georgia a runoff will be held on December 1 if no candidate wins a majority.",
      },
      {
        type: "h2",
        text: "36 Governors and the Issues Driving Voters",
      },
      {
        type: "p",
        text: "Voters in 36 states will also elect governors, with competitive races in Georgia, Michigan, Ohio and Wisconsin among those to watch. The cost of living tops voters' concerns, with rising fuel, grocery, housing and healthcare costs squeezing household budgets. Reproductive rights, immigration, US democracy, the US-Israel war on Iran and AI data centres are also shaping the vote. Advertising is on track to hit a record 11.6 billion dollars, and a Pew survey found 44 percent of registered voters backing the Democratic candidate in their district, against 36 percent for the Republican.",
      },
      {
        type: "h2",
        text: "US Midterm Elections 2026: When Results Come, in India Time",
      },
      {
        type: "p",
        text: "More than 53 million ballots had been cast before Election Day, about 29 million in person and 23 million by mail, already more than the 46 million early votes in the whole of the 2022 midterms. In India, the first polls close at 5:30 am IST on Wednesday, November 4, with the last in Alaska around 10:30 am IST. Do not expect a final answer on Tuesday night: in 2022, House control was not called until November 16, eight days after the vote.",
      },
      {
        type: "h2",
        text: "How to Follow the US Midterm Results From India in 5 Steps",
      },
      {
        type: "steps",
        items: [
          "First polls close at 5:30 am IST on Wednesday, November 4, in Georgia, Virginia, South Carolina and Vermont.",
          "Watch Florida and Virginia: Republican-held House seats there can show the size of any Democratic gains.",
          "Then follow the Senate maths: Democrats must flip seats in states Trump won by double digits, such as Ohio, Iowa, Alaska and Texas.",
          "Expect a wait: close races can take days to call, and Georgia may go to a December 1 runoff.",
          "Remember what is fixed: the new Congress is sworn in on January 3, 2027, whatever the outcome on the night.",
        ],
      },
      {
        type: "h2",
        text: "What Changes if Democrats Win, and What Does Not",
      },
      {
        type: "p",
        text: "If Democrats win the House, they gain its committees and the ability to investigate the administration, and the House alone can begin impeachment proceedings, though removal needs a two-thirds Senate majority. If Democrats win the Senate, they control judicial confirmations and cabinet nominations. Either way, Trump remains president until January 2029, keeps his veto, and most Senate bills still need 60 votes to pass. For India, the result matters because Congress shapes US tariffs, sanctions, defence budgets and aid.",
      },
      {
        type: "h2",
        text: "US Midterm Elections 2026: Frequently Asked Questions",
      },
      {
        type: "faq",
        items: [
          {
            q: "When are the US midterm elections 2026?",
            a: "They are held on Tuesday, November 3, 2026, and Congress will be sworn in on January 3, 2027.",
          },
          {
            q: "What is at stake in the US midterm elections 2026?",
            a: "Control of Congress: all 435 House seats, 35 Senate seats and 36 governorships. Democrats need a net gain of four in each chamber.",
          },
          {
            q: "Is Donald Trump on the ballot in 2026?",
            a: "No. Trump stays president whatever the result; the vote decides whether he keeps a friendly Congress or faces one that can block his agenda.",
          },
          {
            q: "When will US midterm results be known in India?",
            a: "The first polls close at 5:30 am IST on Wednesday, November 4, but close races can take days to call. In 2022, House control was called eight days after the vote.",
          },
          {
            q: "Why do US midterm elections matter for India?",
            a: "Congress shapes US tariffs, sanctions, defence budgets and aid, which affect Indian exporters, students and professionals.",
          },
        ],
      },
      {
        type: "p",
        text: "By Wednesday morning in India, the first picture will be clear, though the closest races may take days longer.",
      },
    ],
  },
  {
    slug: "acp-manasvi-vashishtha-suspended-delhi-police-protest-november-3-2026",
    image: "https://media.assettype.com/deccanherald/2026-11-03/humsoq71/file88aqepvi0gw1gzix51ysz.jpg?w=1200",
    imageAlt: "Security personnel stand guard outside Delhi Police Headquarters as protesting officers from Shahdara district assemble on November 2, 2026 (PTI photo via Deccan Herald)",
    title: "ACP Manasvi Vashishtha Suspended: Delhi Police ACP Suspended Day After Headquarters Protest",
    description:
      "ACP Manasvi Vashishtha suspended: the MHA order, the violation-of-discipline reason reported, and the Delhi High Court's Tuesday refusal explained.",
    excerpt:
      "Assistant Commissioner of Police Manasvi Vashishtha has been suspended a day after leading a protest by Delhi Police personnel outside police headquarters, with the Home Ministry order citing contemplated departmental proceedings but no specified grounds, and the Delhi High Court on Tuesday declining to take suo motu cognisance of alleged remarks made during the protest.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "ACP Manasvi Vashishtha suspended is the latest Delhi Police protest-row development: a day after police personnel demonstrated outside their own headquarters, the ACP who led that demonstration has been suspended. The order, issued by the Ministry of Home Affairs (MHA) late on Monday evening, took immediate effect and said departmental proceedings are contemplated. This post covers Tuesday's suspension, not Monday's protest.",
      },
      {
        type: "p",
        text: "Two framings of the reason have been reported. The Indian Express, reporting the MHA order on Tuesday afternoon, said the order did not specify the grounds for the proposed proceedings. The Hindu, citing Delhi Police sources on Tuesday morning, reported that the suspension was for \"violation of discipline\" after leading the protest. Both can be true at once: the reason given to the press need not match the order's wording.",
      },
      {
        type: "h2",
        text: "ACP Manasvi Vashishtha suspended: what the MHA order says",
      },
      {
        type: "p",
        text: "According to The Indian Express, the order, marked \"Most Immediate\" and issued late on Monday evening, said the competent authority, acting under Rule 10 of the Central Civil Services (Classification, Control and Appeal) Rules, 1965, had placed Vashishtha, an entry-grade officer, under suspension. Vashishtha is a 2019-batch DANIPS officer who was serving as ACP for the Gandhi Nagar subdivision.",
      },
      {
        type: "p",
        text: "Headquarters during suspension is Delhi, and leaving requires prior permission. The officer gets a subsistence allowance on half pay, plus dearness allowance if admissible, subject to a certificate of no other paid employment. No hearing date or finding has been reported.",
      },
      {
        type: "h2",
        text: "Why the suspension followed Monday's protest at police headquarters",
      },
      {
        type: "p",
        text: "On Monday, November 2, police personnel gathered outside Gate No. 1 of Delhi Police Headquarters on Jai Singh Road, demanding reinstatement of Vashishtha and Shahdara SHO Inspector Arun Kumar. Estimates vary from around 100 in the morning to around 150, with The Indian Express reporting around 500 at a later meeting with Police Commissioner Anurag Kumar. Personnel held placards and raised slogans including \"vardi ka apmaan nahi sahenge\", meaning the insult to the uniform will not be tolerated.",
      },
      {
        type: "p",
        text: "Vashishtha joined the demonstration, called for a meeting with the Police Commissioner and a formal process for such disputes, and described the protest to reporters as an \"organic call\" by personnel, saying: \"We have taken a stand because it is necessary to raise our voice against the hooliganism that the police are facing and the security problems arising inside police stations.\" A seven-person delegation later met Commissioner Anurag Kumar and submitted five demands.",
      },
      {
        type: "h2",
        text: "The five demands submitted to the Police Commissioner",
      },
      {
        type: "p",
        text: "The delegation's demands, as reported by Outlook and The Hindu, were: reinstatement of both officers; action against lawyers accused in the Shahdara confrontation; a standard operating procedure for lawyer confrontations; a cap, reported as five, on lawyers entering a police station at a time; FIRs against lawyers accused of misconduct towards personnel; a dedicated headquarters cell for complaints against lawyers; and police deployment in courts to deal with violence.",
      },
      {
        type: "p",
        text: "Delhi Police later said the Commissioner heard concerns about the dignity of the force, respect for the uniform and a structured system for service matters, and assured personnel that genuine concerns would be addressed in time. Discussions with Bar Associations and the Bar Council of Delhi had led to a Joint Coordination Committee at district and headquarters levels. Lawyers' bodies had sought Vashishtha's immediate suspension over alleged remarks, according to Outlook.",
      },
      {
        type: "h2",
        text: "The Shahdara row behind the transfers",
      },
      {
        type: "p",
        text: "The transfers followed an October 23 scuffle at Shahdara police station, in which advocate Lalit Bansal allegedly sustained a serious head injury. Lawyers launched an indefinite strike, alleging Vashishtha and Arun Kumar had threatened advocates who visited the station over the assault case. On October 28, Vashishtha was moved from Gandhi Nagar to the Special Police Unit for Women and Children, and Arun Kumar from Shahdara to the Security Branch. Lawyers ended the strike after the transfers, but police discontent led to Monday's demonstration.",
      },
      {
        type: "h2",
        text: "Delhi High Court declines suo motu action over alleged protest remarks",
      },
      {
        type: "p",
        text: "On Tuesday, the Delhi High Court also heard the matter. A lawyer urged a bench of Acting Chief Justice Nitin Sambre and Justice Sanjay Sharma to take suo motu cognisance of what the lawyer described as an unlawful assembly outside headquarters on Monday and alleged derogatory language against lawyers during the protest. The lawyer cited social media remarks, including phrases reported as \"kaale coat wale gunde\" and \"kaale coat ka behrupiya\", and an alleged remark about an AK-47. These are court allegations, not findings, and this post does not present them as established facts.",
      },
      {
        type: "p",
        text: "The court refused suo motu cognisance and asked the lawyer to file a formal petition, saying it would consider the matter. Acting Chief Justice Sambre added: \"I assure you, we will look into it.\" No petition outcome has been reported yet.",
      },
      {
        type: "h2",
        text: "What happens next after the suspension",
      },
      {
        type: "list",
        items: [
          "Departmental proceedings are contemplated, but no grounds, charges or hearing date have been publicly specified.",
          "Suspension terms keep headquarters in Delhi, bar leaving without prior permission, and provide half-pay subsistence allowance.",
          "Any High Court petition must first be formally filed, following Tuesday's direction.",
          "No suspension of SHO Inspector Arun Kumar has been reported in the coverage reviewed.",
          "The Joint Coordination Committee is the reported channel for the wider police-lawyer grievances."
        ],
      },
      {
        type: "h2",
        text: "ACP Manasvi Vashishtha suspended FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Why was ACP Manasvi Vashishtha suspended?", a: "Sources told The Hindu it was for violation of discipline after leading Monday's protest, while The Indian Express reported the MHA order cited contemplated proceedings without grounds." },
          { q: "When was the suspension ordered?", a: "Late on Monday evening, November 2, 2026, with immediate effect; it was reported publicly on Tuesday, November 3." },
          { q: "What was Monday's Delhi Police protest about?", a: "Personnel demanded reinstatement of ACP Vashishtha and SHO Arun Kumar, transferred October 28 after the October 23 Shahdara scuffle." },
          { q: "What did the Delhi High Court decide on Tuesday?", a: "It refused suo motu cognisance of alleged protest remarks and asked the lawyer raising the issue to file a formal petition." },
          { q: "Is ACP Vashishtha dismissed from service?", a: "No. Suspension pending contemplated proceedings is not a dismissal, and no final outcome has been reported." }
        ],
      },
    ],
  },
  {
    slug: "supreme-court-delhi-firecrackers-illegal-sale-november-3-2026",
    image: "https://images.news18.com/ibnlive/uploads/2025/10/night-of-Diwali-1-2025-10-d795e20cc439b85b43d2ad858e2fc7fd.jpg",
    imageAlt: "Fireworks lighting up the night sky during Diwali celebrations (News18 file photo)",
    title: "Supreme Court Delhi Firecrackers: SC Flags Illegal Sale in Delhi Markets Despite Green-Cracker-Only Order",
    description:
      "Supreme Court Delhi firecrackers: the court flagged open sale of banned crackers in Delhi markets on November 3 and asked authorities to act before Diwali.",
    excerpt:
      "The Supreme Court on Tuesday, November 3, 2026, flagged reports that conventional and unauthorised firecrackers were being sold openly in Delhi markets despite its green-cracker-only order, and asked the Centre, the Delhi government and police to take all necessary measures to stop the violations.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Supreme Court Delhi firecrackers row took a fresh turn on Tuesday, November 3, 2026, a day after the court allowed certified green crackers in Delhi-NCR for Diwali. A bench of Justices M. M. Sundresh and Prasanna B. Varale flagged a November 3 newspaper report documenting conventional and unauthorised firecrackers being sold openly in Delhi markets, and asked the Centre, the Delhi government and police to take all necessary measures to stop the violations. This is a new development, not a repeat of the November 2 permission: it is the court's response to alleged violations of that permission.",
      },
      {
        type: "p",
        text: "The bench was referring to a Hindustan Times report published on Tuesday, which found firecrackers on display across several markets, with conventional crackers available on request and products with questionable QR codes passed off as green crackers. It drew the attention of Additional Solicitor General Aishwarya Bhati, appearing for the Centre, the Delhi government and the Commission for Air Quality Management, to the report and asked her to look into it and ensure compliance.",
      },
      {
        type: "h2",
        text: "Supreme Court Delhi firecrackers: what the bench said on November 3",
      },
      {
        type: "p",
        text: "Justice Sundresh pointed to a photograph in Tuesday's report and told the law officer: \"In today's report on Hindustan Times there is a photograph. They say that notwithstanding yesterday's order, now everything is available in the (firecracker) shops. Please look into it.\" The bench added: \"They say that in the market every other cracker, licensed, unlicensed, QR code, or no QR code, everything is available. Please take a note of it.\"",
      },
      {
        type: "p",
        text: "The court did not pass a fresh substantive order in the reported proceedings; it asked the authorities to examine the allegations and act. Reports say it directed police and district teams to inspect markets, confiscate illegal crackers and prosecute violators, warning that licences could be cancelled. Those are steps the court asked for, not action already completed on the ground.",
      },
      {
        type: "h2",
        text: "Which Delhi markets were named in the November 3 report",
      },
      {
        type: "p",
        text: "The report cited by the bench documented sales in Chandni Chowk, Sadar Bazaar, Shastri Nagar, Sarojini Nagar and New Friends Colony, with Jama Masjid also named. Its findings were based on market visits on October 22 and November 2. Shopkeepers displayed packs marked \"green crackers\", \"pollution-free\" and \"zero pollution\", while conventional crackers were allegedly available to customers who asked for them.",
      },
      {
        type: "p",
        text: "QR codes often failed: many boxes lacked the mandated code, while others linked to online catalogues instead of confirming certification. That matters because every box must carry a product-specific QR code showing the manufacturer, NEERI registration, PESO or District Magistrate licence, formulation and test certificate. A code that does not show those details does not prove a cracker is green.",
      },
      {
        type: "h2",
        text: "What the court's November 2 green-cracker order actually allows",
      },
      {
        type: "p",
        text: "Tuesday's flagging follows the court's October 29 order, made public on November 2, which permitted certified green crackers for a limited Diwali window under strict conditions. Manufacturers certified by the Council of Scientific and Industrial Research-National Environmental Engineering Research Institute (CSIR-NEERI) and the Petroleum and Explosives Safety Organisation (PESO) may manufacture approved green crackers between November 2 and 6, with sale only through designated locations between November 4 and 6.",
      },
      {
        type: "p",
        text: "Bursting is permitted only on November 7 and 8, between 6 am and 7 am and between 8 pm and 10 pm, and the full ban returns across Delhi-NCR on November 9. Crackers containing barium, those not approved by CSIR-NEERI, series firecrackers and garlands are prohibited, as are online sales. Bursting is also banned within 300 metres of hospitals, schools, old-age homes and silence zones. Tuesday's hearing does not change those dates; it is about enforcement.",
      },
      {
        type: "h2",
        text: "Why the timing matters before Diwali",
      },
      {
        type: "p",
        text: "Diwali falls on November 8, so the November 4 to 6 sale window and November 7 and 8 bursting window are imminent. Delhi's air is already severe: News18 reported an overall Air Quality Index of 451 at 8 am on November 3, after the Commission for Air Quality Management invoked Stage-II of the Graded Response Action Plan on November 2. That backdrop explains the narrow relaxation and the court's quick reaction to open violations.",
      },
      {
        type: "h2",
        text: "What Delhi-NCR residents should check",
      },
      {
        type: "list",
        items: [
          "Buy only certified green crackers, only from designated locations, between November 4 and 6.",
          "Check the QR code: it must show the manufacturer, NEERI registration, licence, formulation and test certificate, not just a catalogue.",
          "Do not buy barium crackers, series crackers or garlands, and do not buy online: all are prohibited.",
          "Burst only on November 7 and 8, 6-7 am and 8-10 pm, away from hospitals, schools, old-age homes and silence zones.",
          "From November 9, the full ban on firecrackers returns across Delhi-NCR."
        ],
      },
      {
        type: "h2",
        text: "What happens next in the Supreme Court Delhi firecrackers case",
      },
      {
        type: "p",
        text: "The next test is enforcement during the November 4 to 6 sale window. The coming days will show whether inspections, confiscations and licence action follow in the markets named on Tuesday. If further violations surface, the court could return to the matter before Diwali.",
      },
      {
        type: "h2",
        text: "Supreme Court Delhi firecrackers FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "What did the Supreme Court say about Delhi firecrackers on November 3, 2026?", a: "The bench flagged a November 3 report showing conventional and unauthorised crackers on sale despite its green-cracker-only order, and asked the Centre, Delhi government and police to act." },
          { q: "When can green crackers be sold and burst in Delhi-NCR?", a: "Certified green crackers may be sold only through designated locations between November 4 and 6, and burst only on November 7 and 8 between 6 am and 7 am and between 8 pm and 10 pm. The full ban returns on November 9." },
          { q: "What makes a firecracker a certified green cracker?", a: "It must be CSIR-NEERI and PESO approved, carry a QR code showing the manufacturer, registration, licence, formulation and certificate, and must not contain barium." },
          { q: "Did the Supreme Court change its Diwali firecracker order on November 3?", a: "No. November 3 flagged violations and pressed for enforcement; the November 2 timings and conditions were unchanged." }
        ],
      },
    ],
  },
  {
    slug: "msv-al-jusufi-oman-attack-indian-sailor-killed-november-3-2026",
    image: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1uv924vrdwvrwgncax5/0/msv-al-jusufi-png.webp?f=3%3A2&q=0.75&w=1200",
    imageAlt: "The vessel MSV Al Jusufi (MarineTraffic photo via Mathrubhumi)",
    title: "MSV Al Jusufi Oman Attack: Indian Sailor Killed, 13 Rescued After Vessel Struck Off Oman Coast",
    description:
      "MSV Al Jusufi Oman attack: one Indian seafarer killed and 13 rescued after the Indian-flagged vessel was struck off Oman on November 2, officials confirmed.",
    excerpt:
      "One Indian seafarer was killed and 13 others were rescued after the Indian-flagged cargo vessel MSV Al Jusufi was struck by an unidentified aerial object off the Oman coast on November 2, 2026, with the government confirming the death on Tuesday.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The MSV Al Jusufi Oman attack has claimed the life of an Indian seafarer. On Monday, November 2, 2026, the Indian-flagged cargo vessel MSV Al Jusufi, carrying 14 Indian crew members, was struck by an unidentified aerial object near the coast of Oman. One crew member, Gandhar Nahim Ajij from Gujarat, died, while the other 13 evacuated and were rescued by the Omani Coast Guard. The government confirmed the death on Tuesday, November 3, and the story surged across Indian news outlets through the morning.",
      },
      {
        type: "p",
        text: "Union Minister for Ports, Shipping and Waterways Sarbananda Sonowal announced the death in a statement on X on Tuesday. All 14 people aboard were Indian nationals, and the 13 survivors were picked up by the Omani Coast Guard after evacuating. The External Affairs Ministry also condemned the attack near Limah, Oman, and said India's embassy in Oman is coordinating repatriation of the rescued crew and the deceased seafarer's mortal remains.",
      },
      {
        type: "h2",
        text: "MSV Al Jusufi Oman attack: what the government confirmed",
      },
      {
        type: "p",
        text: "Sonowal's statement gave the fullest official account so far. In his words: \"On Nov 2, the Indian MSV AL JUSUFI, carrying 14 Indian seafarers, was struck by an unidentified aerial object while navigating near the coast of Oman. While 13 crew members safely evacuated and were rescued by the Omani Coast Guard, I am deeply saddened to report that one of our seafarers, Gandhar Nahim Ajij from Gujarat, tragically succumbed to his injuries.\"",
      },
      {
        type: "p",
        text: "The External Affairs Ministry's statement, shared by spokesperson Randhir Jaiswal, said the attack took place on Monday evening near Limah, Oman, and that 13 of the 14 Indian nationals aboard were rescued while one tragically lost his life. The ministry added: \"The continuing incidents of attacks on commercial shipping in the region are deeply concerning. We reiterate our call for immediate de-escalation of tensions, and the conclusion of ongoing negotiations for a diplomatic solution so that peace and stability can return to the region.\"",
      },
      {
        type: "h2",
        text: "What is not yet known about the Oman vessel strike",
      },
      {
        type: "p",
        text: "Officials have not said who attacked the vessel or what weapon was used, and readers should be careful with headlines that go further than the official record. Some headlines describe the incident as a drone attack, but the shipping ministry and External Affairs Ministry statements describe only an \"unidentified aerial object\", and say it is not immediately clear who was responsible. Until an official inquiry says more, the cause remains unconfirmed, and this report does not attribute it to any country or group.",
      },
      {
        type: "p",
        text: "What is confirmed is the human toll and the rescue: the Omani Coast Guard recovered all 13 survivors, and Indian authorities are working on bringing them home along with Ajij's remains. No official statement so far has given further details, and the story is described as developing.",
      },
      {
        type: "h2",
        text: "Why the MSV Al Jusufi Oman attack fits a wider pattern in Gulf shipping",
      },
      {
        type: "p",
        text: "The strike is the latest in a series of attacks on merchant shipping in Gulf waters that have escalated since hostilities involving the United States, Israel and Iran erupted in February 2026. Indian seafarers, one of the largest workforces in world merchant shipping, have repeatedly been caught in these incidents. The External Affairs Ministry said on October 28, as cited in Indian press coverage, that at least 22 Indian nationals have been killed in the ongoing conflict, including 14 seafarers.",
      },
      {
        type: "p",
        text: "Only days earlier, on October 30, a Marshall Islands-flagged LNG carrier, M/T Al Mayeda, carrying six Indian seafarers, was hit by a projectile in the Persian Gulf. Sonowal confirmed on Saturday that all six Indian nationals, along with the vessel's entire 25-member crew, were unhurt. The contrast between the two incidents underlines why Indian officials have been raising the alarm about crew safety with growing urgency.",
      },
      {
        type: "p",
        text: "External Affairs Minister S. Jaishankar raised the issue at the G20 Foreign Ministers' Meeting, stressing the need to safeguard freedom of navigation. He noted that developing nations across the Global South were disproportionately suffering, writing: \"The Global South is disproportionately bearing the consequences of attacks on civilian shipping and seafarers, jeopardising the availability and cost of fuel, food and fertilisers.\"",
      },
      {
        type: "h2",
        text: "What happens next for the Al Jusufi survivors",
      },
      {
        type: "p",
        text: "The immediate priority is repatriation. The Indian embassy in Oman is coordinating the early return of the 13 survivors and Ajij's mortal remains; no timeline has been announced.",
      },
      {
        type: "p",
        text: "Beyond the rescue, the incident adds fresh pressure on diplomatic efforts to protect commercial shipping. New Delhi's statement tied the attack to its wider call for de-escalation and a negotiated solution, and for an end to the targeting of commercial shipping and civilian infrastructure. Whether it leads to new protective measures for Indian-flagged vessels will depend on what investigators establish about how the vessel was hit, which has not yet been released.",
      },
      {
        type: "h2",
        text: "MSV Al Jusufi Oman attack FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "What happened in the MSV Al Jusufi Oman attack?", a: "On November 2, 2026, the Indian-flagged MSV Al Jusufi was struck by an unidentified aerial object near Oman. One Indian seafarer died and 13 were rescued by the Omani Coast Guard." },
          { q: "Who was the Indian sailor killed in the Oman vessel attack?", a: "Union Shipping Minister Sarbananda Sonowal identified him as Gandhar Nahim Ajij of Gujarat, who succumbed to his injuries." },
          { q: "How many crew members were on MSV Al Jusufi, and how many survived?", a: "All 14 aboard were Indian nationals. Thirteen evacuated and were rescued by the Omani Coast Guard; one died." },
          { q: "Was the vessel hit by a drone?", a: "Not confirmed. Official statements describe only an 'unidentified aerial object'; who attacked the ship is not yet clear, despite some headlines calling it a drone attack." },
          { q: "What has the Indian government said about the attack?", a: "The shipping ministry confirmed the death and rescue; the External Affairs Ministry condemned the attack and urged de-escalation and a diplomatic solution." },
          { q: "Is this part of a wider pattern of attacks on ships?", a: "Yes. Gulf merchant vessels have faced repeated attacks since US-Israel-Iran hostilities escalated in February 2026; Indian officials say at least 22 Indian nationals, including 14 seafarers, have been killed." }
        ],
      },
    ],
  },
  {
    slug: "lebron-james-wine-sip-76ers-fan-troy-clemons-november-3-2026",
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_focal-1000x563,f_auto,q_auto:best/mpx/2704722219/2026_07/1784910303823_now_daily_a_brk_lebron_76ers_260724_S3_1920x1080-uizv82.jpg",
    imageAlt: "LeBron James in a Philadelphia 76ers uniform during a game",
    title: "LeBron James Wine Sip Goes Viral: 76ers Star Sips Fan's Wine Mid-Game vs Bulls",
    description:
      "LeBron James wine sip: the 76ers star sipped a fan's wine mid-game vs the Bulls, and fan Troy Clemons has now shared his side of the viral moment.",
    excerpt:
      "LeBron James's mid-game sip from a Philadelphia 76ers fan's cup of wine during the 126-107 win over the Chicago Bulls on November 2, 2026, has gone viral, with the fan, Troy Clemons, now telling his side of the story.",
    date: "2026-11-03",
    category: "Sports",
    sections: [
      {
        type: "p",
        text: "The LeBron James wine sip is the viral sports moment of Tuesday morning. During the Philadelphia 76ers' 126-107 home win over the Chicago Bulls on Monday, November 2, 2026, James chased a loose ball into the stands, crashed into a fan holding a cup of wine, and appeared to take a sip from it before running back onto the court. Several camera angles spread across social media overnight, and by Tuesday morning the fan at the centre of it, Troy Clemons, had told his side to ESPN's Kris Rhim.",
      },
      {
        type: "p",
        text: "The sequence happened in the third quarter at the Xfinity Mobile Arena in Philadelphia. A hit-ahead pass from Tyrese Maxey sailed out of James's reach and out of bounds, and the 41-year-old stumbled into the baseline seats while chasing it down. He bumped into Clemons, who was walking to his seat with a drink, and wine spilled everywhere. James then took the cup from Clemons, raised it to his lips, handed it back, and jogged back onto the court as the section erupted.",
      },
      {
        type: "h2",
        text: "LeBron James wine sip: what LeBron said after the game",
      },
      {
        type: "p",
        text: "James addressed the moment after the win, part apology, part joke. He said he had spilled some of Clemons's wine when he crashed into him, and wanted to check whether it was any good. In his words, reported by ESPN's Kris Rhim: \"I spilled some of his wine. I crashed into him, spilled some of his wine. So I wanted to see if it was worth it on my arm and how good it was. It was all right.\"",
      },
      {
        type: "p",
        text: "James later added that a season is a long marathon, and players must find ways to have fun throughout, even while working. On the court, the wine sip was a footnote to another strong night: James finished with 15 points, seven rebounds and nine assists on 6-for-13 shooting, and the win moved his new-look 76ers to 7-1. It was only his sixth game for Philadelphia.",
      },
      {
        type: "h2",
        text: "76ers fan Troy Clemons tells his side of the viral moment",
      },
      {
        type: "p",
        text: "The new twist on Tuesday came from Clemons himself. Speaking to Rhim after the game, he walked through the collision: \"LeBron crashed into me, he grabbed me, he said, 'My bad.' My drink spilled everywhere, he took my drink from me, and he basically just took a sip of it, gave it back, and ran back on the court.\" Clemons confirmed the drink was wine, adding: \"I'm just glad for him to be here. I'm not worried about the wine getting on me.\"",
      },
      {
        type: "p",
        text: "Online, fans immediately told Clemons he should never wash the cup and keep it as a souvenir. Clemons was having none of it. \"At the end of the day, he's another man like me,\" he told Rhim. \"He's LeBron, but at the end of the day, I threw that cup in the trash. And it's nothing up with him; I just got a fresh drink.\"",
      },
      {
        type: "h2",
        text: "Why the LeBron James wine sip video went viral",
      },
      {
        type: "p",
        text: "Part of the clip's power is how unexpected it is. Players grab water or a sports drink during breaks all the time, but a mid-game sip from a fan's cup of wine is something nobody expects on a broadcast, let alone from a four-time MVP in his 24th NBA season. The moment was captured from several angles, including a bird's-eye view posted by Rhim, and reposted by accounts including NBA on Prime.",
      },
      {
        type: "p",
        text: "The other part is LeBron's well-documented love of wine, long part of his off-court routine. Seeing that habit collide, literally, with a live game made the clip instantly shareable, and Clemons's deadpan reaction, throwing away the cup instead of treasuring it, gave the story a second act on Tuesday morning.",
      },
      {
        type: "h2",
        text: "What the viral moment does not change",
      },
      {
        type: "p",
        text: "For all the attention, the wine sip changed nothing about the game itself. Philadelphia won comfortably, 126-107, and James's line of 15 points, nine assists and seven rebounds was in keeping with his start as a 76er. The coverage reviewed reports no statement from the NBA about the incident, and the story's appeal rests on humour rather than controversy: a star apologised to a fan, tasted his wine, gave the cup back, and both men went home happy after a win.",
      },
      {
        type: "p",
        text: "That is also why the moment is likely to live on as a meme rather than a talking point about discipline. Clemons did not ask for anything, did not keep the cup, and did not complain. James did not hide from it, joking about it in the post-game press conference within minutes.",
      },
      {
        type: "h2",
        text: "LeBron James wine sip FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "What happened in the LeBron James wine sip moment?", a: "During the 76ers' 126-107 win over the Bulls on November 2, 2026, James chased a loose ball into the stands, crashed into fan Troy Clemons, spilling his wine, and appeared to take a sip from the cup before returning to the court." },
          { q: "Who is Troy Clemons?", a: "Troy Clemons is the 76ers fan whose cup of wine James sipped from. He told ESPN's Kris Rhim that James apologised, took a sip, handed the cup back, and ran back onto the court." },
          { q: "What did LeBron James say about the wine sip?", a: "James said: 'I spilled some of his wine. I crashed into him, spilled some of his wine. So I wanted to see if it was worth it on my arm and how good it was. It was all right.'" },
          { q: "Did the fan keep the cup as a souvenir?", a: "No. Despite fans urging him to keep it, Clemons said he threw the cup in the trash and got a fresh drink." },
          { q: "What were LeBron James's stats in the 76ers vs Bulls game?", a: "James finished with 15 points, seven rebounds and nine assists on 6-for-13 shooting as Philadelphia beat Chicago 126-107 to improve to 7-1." },
          { q: "Why did the LeBron James wine sip go viral?", a: "Multiple camera angles spread on social media overnight, helped by LeBron's well-known love of wine, his joking explanation, and the fan's deadpan decision to throw the cup away." }
        ],
      },
    ],
  },
  {
    slug: "supreme-court-california-ballots-trump-bid-rejected-november-3-2026",
    image: "https://cdnx.premiumread.com/?url=https://www.malaymail.com/malaymail/uploads/images/2026/11/03/372021.jpg&w=1600&q=100&f=jpg&t=7",
    imageAlt: "Voters casting ballots at a polling station in Los Angeles, California, on November 2, 2026, ahead of the US midterm elections",
    title: "Supreme Court California Ballots: Court Rejects Trump Bid to Set Aside 20,000 Mail-In Ballots on Eve of Midterms",
    description:
      "Supreme Court California ballots ruling: the court rejected Trump's bid to set aside 20,000 mail-in ballots on the eve of the US midterms.",
    excerpt:
      "The US Supreme Court on Monday, November 2, 2026, rejected the Trump administration's emergency bid to force California to set aside the mail-in ballots of more than 20,000 registered voters, acting on the eve of the November 3 midterm elections.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Supreme Court California ballots ruling came on Monday, November 2, 2026, in a fast, unsigned, one-sentence order that gave no reasoning, as is common for emergency decisions. The justices rejected the Trump administration's emergency request to force California to segregate the mail-in ballots of more than 20,000 registered voters whom federal officials allege are likely not United States citizens, and to hold those ballots aside until the voters' citizenship could be verified. No justice publicly dissented, and the court did not ask California for a response before ruling, a step that usually signals serious consideration of an emergency case.",
      },
      {
        type: "p",
        text: "The timing is what makes the decision so consequential. It arrived hours after the Justice Department filed the emergency request, and a day before the November 3 midterm elections, which decide control of Congress for the final two years of President Donald Trump's second term. All 435 House seats and 35 Senate seats are at stake, and tens of millions of Americans had already cast early ballots.",
      },
      {
        type: "h2",
        text: "Supreme Court California ballots: what the administration asked for",
      },
      {
        type: "p",
        text: "The administration asked the Supreme Court to intervene in a case it had already lost in the lower courts. The Justice Department sued California in October, arguing that the state was preventing enforcement of the federal law that makes it a crime for noncitizens to vote in federal elections. It asked the courts to order California to separate any ballots cast by people on its list of allegedly questionable voters, and not to count them until those voters were determined to be US citizens.",
      },
      {
        type: "p",
        text: "Solicitor General D. John Sauer, arguing for the administration, told the court that once California mixes the challenged ballots with lawful ones, there is no way to get the challenged ballots back. The administration had originally accused California of having 190,000 illegal voters on its rolls, according to AFP reporting, but it later revised that figure to about 20,000. California replied that its list appeared to be filled with errors, that it already has safeguards to protect election integrity, and that the process used to create the list was, in its words, highly suspect.",
      },
      {
        type: "h2",
        text: "How the lower courts ruled before the Supreme Court stepped in",
      },
      {
        type: "list",
        items: [
          "October 28, 2026: US District Judge David Carter refused the request, writing that never before had the federal government, on the eve of an election, sought to coerce a state to abandon its own constitutional election procedures, and that the administration had not shown a credible process for creating its list.",
          "Friday, October 30, 2026: the 9th US Circuit Court of Appeals refused the request in a 2-1 decision, saying there was no feasible way to segregate specific ballots without potentially catastrophic effects on the system, and that using the list could bar valid votes.",
          "Appeals dissent: Circuit Judge Patrick Bumatay called the request reasonable, saying it would not cancel any vote but would allow time to verify eligibility.",
          "Monday, November 2, 2026: Chief Judge James Boasberg ruled separately against the administration, finding it had likely violated the Constitution's Elections Clause and describing the alleged-noncitizen lists as flawed."
        ],
      },
      {
        type: "h2",
        text: "Why the ruling matters for the midterm elections",
      },
      {
        type: "p",
        text: "California is the most populous US state and a Democratic stronghold, and the case was the latest in a flurry of election-related litigation before the midterms. California Attorney General Rob Bonta said the appeal reeks of desperation and was another attempt to undermine elections. The administration has argued its request was modest and would eventually allow legal votes to be counted.",
      },
      {
        type: "p",
        text: "The rapid rejection also follows an earlier defeat at the same court. In September 2026, the justices rejected the president's plan to change how mail ballots are sent nationwide, a proposal election officials warned could have had catastrophic consequences for this year's midterms. Reports also note that studies repeatedly show voter fraud cases are extremely rare and do not influence election results.",
      },
      {
        type: "h2",
        text: "What happens next for California voters",
      },
      {
        type: "p",
        text: "With the order in place, California will count ballots in the normal way, without segregating the challenged group. Voting takes place on Tuesday, November 3, with polling hours varying by state. First election-night results are expected from Tuesday evening, but some close races may take days or weeks, particularly where mail-in ballots are still being counted.",
      },
      {
        type: "p",
        text: "The ruling does not end the underlying lawsuit over the voter list, but it removes the immediate threat that thousands of ballots would be set aside on election eve. Ballots already cast, and ballots cast on election day, will be processed under California's existing procedures.",
      },
      {
        type: "h2",
        text: "Supreme Court California ballots FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "What did the Supreme Court decide on California ballots?", a: "On November 2, 2026, the court rejected the Trump administration's emergency bid to force California to set aside the mail-in ballots of more than 20,000 registered voters whom federal officials allege are likely noncitizens." },
          { q: "Did any justice dissent from the Supreme Court California ballots ruling?", a: "No justice publicly dissented. The order was unsigned and one sentence long, with no reasoning given, as is common for emergency decisions." },
          { q: "Why did the administration want the ballots set aside?", a: "The Justice Department argued the voters may not be US citizens and asked that their ballots be segregated and not counted until citizenship was verified, saying that once the ballots are mixed with lawful ones they cannot be retrieved." },
          { q: "What did the lower courts say before the Supreme Court ruling?", a: "District Judge David Carter refused the request on October 28, and the 9th Circuit refused it on October 30 in a 2-1 decision, saying segregation was not feasible without potentially catastrophic effects on the system and could bar valid votes." },
          { q: "Does the ruling mean the ballots are now counted normally?", a: "Yes, for this election. California will count ballots under its existing procedures, without segregating the challenged group, while the underlying lawsuit over the voter list continues." },
          { q: "When are the US midterm elections?", a: "Election day is Tuesday, November 3, 2026. Results begin arriving on Tuesday evening, but some close races may take days or weeks to call." }
        ],
      },
    ],
  },
  {
    slug: "cyclone-murasu-landfall-completed-weakening-november-3-2026",
    image: "https://static.thesouthfirst.com/wp-content/uploads/2026/11/Heavy-rains-1.jpg",
    imageAlt: "Heavy rain lashing a coastal area of Andhra Pradesh as Cyclone Murasu moves inland after landfall",
    title: "Cyclone Murasu Landfall Completed: Storm Crosses Andhra Coast, Weakening Into Deep Depression by Tonight",
    description:
      "Cyclone Murasu landfall completed between 3:30 and 5:30 am on November 3, 2026, near Ongole, IMD said, with the storm weakening through the day.",
    excerpt:
      "Cyclone Murasu completed its landfall on the south Andhra Pradesh coast between 3:30 and 5:30 am on Tuesday, November 3, 2026, the India Meteorological Department said, after crossing near Ongole with winds of 100-110 kmph gusting to 120 kmph.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Cyclone Murasu landfall completed in the early hours of Tuesday, November 3, 2026, closing the most dangerous phase of the storm for the Andhra Pradesh coast. According to the India Meteorological Department (IMD), the severe cyclonic storm crossed the south Andhra Pradesh coast between Nellore and Narsapur, close to Ongole, between 3:30 and 5:30 am, with winds of 100-110 kmph and gusts reaching 120 kmph. By 5:30 am the system lay centred over south coastal Andhra Pradesh, close to Ongole, and was moving north-northwestwards.",
      },
      {
        type: "p",
        text: "This is the confirmed end of a landfall process that began at 1 am on Tuesday, when the storm's northern inner spiral band entered the south coastal region. The completion matters because it marks the point at which the storm's core is fully ashore: the threat now shifts from the landfall winds at the coast to heavy rain, strong winds and waterlogging as the weakening system moves inland through Tuesday.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall completed: the IMD timeline",
      },
      {
        type: "list",
        items: [
          "1:00 am, November 3: the landfall process commenced near Ongole, with the storm's northern inner spiral band entering south coastal Andhra Pradesh.",
          "3:30 to 5:30 am, November 3: the severe cyclonic storm crossed the coast between Nellore and Narsapur, close to Ongole, at latitude 15.53 degrees north and longitude 80.22 degrees east.",
          "Landfall winds: 100-110 kmph sustained, with gusts up to 120 kmph at the landfall point, as reported by the IMD.",
          "5:30 am, November 3: the system lay centred over south coastal Andhra Pradesh near Ongole, about 40 km southwest of Bapatla, 80 km north-northeast of Kavali and 120 km west-southwest of Machilipatnam.",
          "Movement: north-northwestwards at about 8 kmph during the six hours before the 5:30 am bulletin, under continuous watch from Doppler weather radars at Machilipatnam and Visakhapatnam."
        ],
      },
      {
        type: "h2",
        text: "Damage so far: trees uprooted, areas inundated, no casualties reported",
      },
      {
        type: "p",
        text: "The storm battered the coastal districts through the night. Hundreds of trees were uprooted in Nellore, Prakasam and Bapatla districts, several low-lying areas were inundated, and strong winds scattered pushcarts and signboards along Kothapatnam Beach Road near Ongole. In Ongole itself, a statue of Andhra Kesari Tanguturi Prakasam Pantulu at the Prakasam Bhavan in the district Collectorate premises collapsed after a tree fell on it.",
      },
      {
        type: "p",
        text: "No casualties had been reported in Tuesday morning's updates, and the electricity department reported no disruption to power supply anywhere in the affected zones, with no power poles reported fallen. But officials stressed the danger is not over: Chief Minister N. Chandrababu Naidu, who reviewed the situation with district collectors at 3:30 am, directed that people in cyclone-affected areas should not venture onto the roads until obstructions are cleared.",
      },
      {
        type: "h2",
        text: "What happens next: weakening into a cyclonic storm, then a deep depression",
      },
      {
        type: "p",
        text: "The IMD expects Murasu to weaken steadily as it moves inland. It is likely to become a cyclonic storm with winds of 80-90 kmph, gusting to 100 kmph, by noon on Tuesday, and then a deep depression with winds of 55-65 kmph, gusting to 75 kmph, by midnight on Tuesday. Heavy to very heavy rain, with extremely heavy falls in isolated places, is still expected across Krishna, Guntur, Bapatla, Prakasam, Markapuram and Nellore districts, with very heavy rain also forecast for parts of Eluru, East Godavari, West Godavari, NTR, Palnadu, Tirupati and Chittoor districts. Heavy rain was also reported in Puducherry and north Tamil Nadu because of the cyclone's impact.",
      },
      {
        type: "p",
        text: "Six National Disaster Response Force teams and seven State Disaster Response Force teams were kept on standby. Officials also warned that rainfall in the catchment areas of the Nagarjuna Sagar and Pulichintala projects could trigger flood inflows of around 13 to 15 TMC, and thousands of people from low-lying and flood-prone areas had been evacuated before landfall.",
      },
      {
        type: "h2",
        text: "Fishermen warning and helplines: what residents should do now",
      },
      {
        type: "p",
        text: "Fishermen have been strictly advised not to venture into the sea. Under the IMD's 6 am fishermen warning on November 3, the do-not-venture advisories run until the morning of November 4 for the southwest Bay of Bengal and the north Tamil Nadu-Puducherry coasts, and until the afternoon of November 4 for the west-central Bay of Bengal and the south Odisha coast. The sea remains very high to very rough in the affected areas.",
      },
      {
        type: "list",
        items: [
          "Stay indoors and off the roads in affected districts until local officials say obstructions, including fallen trees and wires, have been cleared.",
          "Report cyclone-related problems such as power outages, fallen trees, collapsed walls or waterlogging through the Mana Mitra WhatsApp service on 9552300009: send 'Hi', select 'Murasu Cyclone Issues', then 'Report Issue', confirm and register with your name, district, mandal and details of the problem.",
          "For emergencies, call the toll-free numbers 112, 1070 or 18004250101.",
          "Fishermen should not venture into the sea until the advisories are lifted on November 4.",
          "Do not touch fallen electric wires or poles, and keep children away from waterlogged areas and debris."
        ],
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall completed FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "When was Cyclone Murasu landfall completed?", a: "Between 3:30 and 5:30 am on Tuesday, November 3, 2026, when the severe cyclonic storm crossed the south Andhra Pradesh coast between Nellore and Narsapur, close to Ongole, according to the IMD." },
          { q: "How strong were the winds at landfall?", a: "The IMD reported sustained winds of 100-110 kmph with gusts up to 120 kmph at the landfall point." },
          { q: "Has anyone died in Cyclone Murasu?", a: "No casualties had been reported in Tuesday morning's updates, though officials warned the situation was still being assessed as the storm moved inland." },
          { q: "How will Murasu weaken?", a: "The IMD expects it to weaken into a cyclonic storm by noon on November 3 and into a deep depression by midnight, while still bringing heavy rain to Andhra Pradesh and neighbouring areas." },
          { q: "Where can affected residents report problems?", a: "Through the Mana Mitra WhatsApp service on 9552300009, or the emergency numbers 112, 1070 and 18004250101." },
          { q: "When can fishermen go back to sea?", a: "Not until the IMD advisories are lifted: until the morning of November 4 for most affected waters, and until the afternoon of November 4 for the west-central Bay of Bengal and south Odisha coast." }
        ],
      },
    ],
  },
  {
    slug: "gst-collections-october-2026-rs-231-lakh-crore-229-percent-growth",
    image: "https://media.assettype.com/thequint%2F2017-03%2Fe1943e86-1064-4dfb-b8ff-e8cb98343bc7%2Fa7b7c620-96a2-4171-b9db-b95b32ba7096.jpg?rect=0%2C0%2C1024%2C576",
    imageAlt: "Goods and Services Tax in India, illustrated with tax and finance imagery",
    title: "GST Collections October 2026: Rs 2.31 Lakh Crore, Up 22.9% - Second-Highest Month Ever",
    description:
      "GST collections October 2026 rose 22.9% to Rs 2.31 lakh crore, the second-highest month ever, with import revenue up 42.2% and domestic collections up 15.8%.",
    excerpt:
      "India's gross GST collections rose 22.9% year-on-year to Rs 2.31 lakh crore in October 2026, the second-highest monthly collection on record, according to provisional Finance Ministry data released on November 1, 2026.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "GST collections October 2026 have delivered one of the strongest monthly tax results India has ever recorded. Per provisional data released by the Finance Ministry on November 1, 2026, gross Goods and Services Tax (GST) collections rose 22.9% year-on-year to Rs 2,31,290 crore in October 2026, up from Rs 1,88,125 crore in October 2025. That makes October 2026 the second-highest GST collection month on record, behind only April 2026, at Rs 2.42 lakh crore. It is also the fourth month in a row that gross collections have crossed Rs 2 lakh crore.",
      },
      {
        type: "h2",
        text: "GST Collections October 2026: The Headline Numbers",
      },
      {
        type: "p",
        text: "The headline figure is the gross collection, the total GST collected before refunds are paid back. Once refunds are deducted, the picture stays just as strong:",
      },
      {
        type: "list",
        items: [
          "Gross GST: Rs 2,31,290 crore, up 22.9% from Rs 1,88,125 crore in October 2025.",
          "Net GST revenue: Rs 2,03,356 crore after refunds, up 25.6% from Rs 1,61,900 crore.",
          "Total refunds: Rs 27,934 crore, up 6.5% from Rs 26,225 crore.",
          "Domestic revenue: Rs 1,59,044 crore, up 15.8% from Rs 1,37,328 crore.",
          "Import revenue: Rs 72,246 crore, up 42.2% from Rs 50,796 crore.",
          "April to October 2026-27: gross Rs 14,77,569 crore, up 13.2%; net Rs 12,69,486 crore, up 12.6%.",
        ],
      },
      {
        type: "p",
        text: "Net revenue grew faster than gross revenue because refunds rose only 6.5%, much slower than collections. Domestic refunds rose 9.8% to Rs 14,007 crore; refunds on imports rose 3.4% to Rs 13,927 crore.",
      },
      {
        type: "h2",
        text: "Where the Money Came From: Domestic Sales and Imports",
      },
      {
        type: "p",
        text: "GST collections October 2026 grew from both parts of the economy, but imports grew far faster than domestic sales. Domestic collections, from goods and services sold inside India, rose 15.8% to Rs 1,59,044 crore. Import-linked revenue, the GST charged on goods brought into India, jumped 42.2% to Rs 72,246 crore. Imports did most of the heavy lifting, though domestic sales still supplied the larger share.",
      },
      {
        type: "h2",
        text: "CGST, SGST and IGST: The October 2026 Breakdown",
      },
      {
        type: "p",
        text: "GST is split into three parts depending on where a sale happens. Central GST (CGST) goes to the Centre, State GST (SGST) goes to the state of sale, and Integrated GST (IGST) applies to inter-state sales and imports, shared later between Centre and states. The October 2026 breakdown was:",
      },
      {
        type: "list",
        items: [
          "CGST: Rs 42,935 crore, up from Rs 36,547 crore.",
          "SGST: Rs 51,340 crore, up from Rs 45,134 crore.",
          "IGST: Rs 1,37,015 crore, up from Rs 1,06,443 crore, made up of Rs 64,769 crore from domestic transactions and Rs 72,246 crore from imports.",
          "After settlement, post-settlement SGST revenue for states and Union Territories rose 13% to Rs 1,03,341 crore.",
        ],
      },
      {
        type: "h2",
        text: "Why Did GST Collections Jump in October 2026?",
      },
      {
        type: "p",
        text: "Reports point to two main drivers: strong festive-season demand and a sharp rise in import-linked tax revenue. October is a festival-heavy month, when spending typically rises, and that shows up in domestic collections growing 15.8%. Experts also noted October 2025 was the first full month in which GST 2.0 rate rationalisation was fully reflected, making the year-on-year comparison a cleaner read on demand.",
      },
      {
        type: "p",
        text: "Experts also struck a cautious note. One Deloitte India partner said sustained revenue buoyancy, despite bold rate cuts last year, gives the GST Council confidence and headroom to continue reforms. A Grant Thornton Bharat expert said the more important test will be whether momentum continues after the festive season ends.",
      },
      {
        type: "h2",
        text: "Which States Collected the Most GST in October 2026?",
      },
      {
        type: "list",
        items: [
          "Maharashtra: Rs 35,150 crore, up 13%, and Rs 19,101 crore after settlement, the highest post-settlement figure.",
          "Karnataka: Rs 15,922 crore, up 18%. Gujarat: Rs 13,516 crore, up 16%. Haryana: Rs 11,529 crore, up 17%. Uttar Pradesh: Rs 10,235 crore, up 24%.",
          "Assam: Rs 1,934 crore, up 47%. Jharkhand: Rs 2,821 crore, up 31%.",
          "Declines: Sikkim fell 28% to Rs 221 crore, Himachal Pradesh declined 2% to Rs 704 crore, Puducherry dropped 7% to Rs 179 crore.",
        ],
      },
      {
        type: "h2",
        text: "What Do Higher GST Collections Mean for Ordinary People?",
      },
      {
        type: "p",
        text: "A rise in GST collections does not mean tax rates have gone up for shoppers. GST is charged on what people and businesses buy, so rising collections usually mean people are spending more, more businesses are complying, or imports are higher, or a mix of all three. For households the effect is indirect: stronger revenue gives the government more room to spend on public services and infrastructure without raising rates.",
      },
      {
        type: "h2",
        text: "How to Read a Monthly GST Collection Report in 5 Steps",
      },
      {
        type: "steps",
        items: [
          "Start with gross collections: the total GST collected before refunds, the headline number.",
          "Then look at net collections: gross collections minus refunds, or what the government actually kept.",
          "Split domestic and import revenue: domestic growth shows spending inside India; import growth shows tax on goods entering the country.",
          "Check the CGST, SGST and IGST split: how the money is divided between the Centre and the states.",
          "Finally, look at the cumulative figure for the financial year so far, and remember the numbers are provisional.",
        ],
      },
      {
        type: "h2",
        text: "GST Collections October 2026: Frequently Asked Questions",
      },
      {
        type: "faq",
        items: [
          {
            q: "What were India's GST collections in October 2026?",
            a: "Gross GST collections were Rs 2,31,290 crore, up 22.9% from Rs 1,88,125 crore in October 2025, per provisional Finance Ministry data.",
          },
          {
            q: "Is October 2026 the highest GST collection month ever?",
            a: "No. It was the second-highest month on record. The highest so far is April 2026, at Rs 2.42 lakh crore.",
          },
          {
            q: "What is the difference between gross and net GST collections?",
            a: "Gross collections are the total collected before refunds. Net collections are what remains after refunds. In October 2026, gross was Rs 2,31,290 crore and net was Rs 2,03,356 crore, after Rs 27,934 crore in refunds.",
          },
          {
            q: "Why did GST collections rise so much in October 2026?",
            a: "Reports point to strong festive-season demand, which lifted domestic collections by 15.8%, and a 42.2% surge in import-linked revenue to Rs 72,246 crore.",
          },
          {
            q: "Are the October 2026 GST figures final?",
            a: "No. They are provisional and may change slightly when finalised.",
          },
        ],
      },
      {
        type: "p",
        text: "The next test comes with the November figures. If collections stay above Rs 2 lakh crore after the festive season, October will look less like a festival spike and more like a durable step up.",
      },
    ],
  },
  {
    slug: "russia-strikes-komyshuvakha-aid-centre-26-killed-november-3-2026",
    image: "https://newsimg.koreatimes.co.kr/2026/11/03/f180e7bc-a9ef-4372-8309-51a3867da962.jpg",
    imageAlt: "Ukrainian rescuers working at the site of the Russian strike on an educational facility in Komyshuvakha, Zaporizhzhia region, on November 2, 2026",
    title: "Komyshuvakha Aid Centre Strike: 26 Killed as Russian Bombs Hit Ukraine Aid Hub",
    description:
      "Komyshuvakha aid centre strike killed 26 on November 2, 2026, when Russian bombs hit a school aid hub and shelter in Zaporizhzhia, Ukraine says.",
    excerpt:
      "At least 26 people were killed on Monday, November 2, 2026, when Russian aerial bombs struck a school used as a humanitarian aid distribution centre and a nearby shelter in Komyshuvakha, in Ukraine's Zaporizhzhia region, Ukrainian officials said, with 27 people initially reported missing.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Komyshuvakha aid centre strike is dominating Tuesday morning's international news. Ukrainian officials said at least 26 people were killed on Monday, November 2, 2026, when Russian aerial bombs struck a school in the village of Komyshuvakha, in the Zaporizhzhia region, that was being used to distribute humanitarian aid, and then struck the shelter where people had taken cover. Five people were injured, including two rescue workers, and 27 people were initially reported missing.",
      },
      {
        type: "p",
        text: "The story is surging again on Tuesday morning because the confirmed death toll rose through the night. Ukraine's State Emergency Service first confirmed 24 deaths, and President Volodymyr Zelenskyy then put the toll at 26 in his nightly address late on Monday, after the figure had earlier stood at 18. The Zaporizhzhia region has declared Tuesday, November 3, a day of mourning for the victims.",
      },
      {
        type: "h2",
        text: "Komyshuvakha aid centre strike: what happened on Monday",
      },
      {
        type: "p",
        text: "Komyshuvakha sits very close to the front line in southern Ukraine, and the school there had long stopped holding classes, according to President Zelenskyy. Instead, the building and its shelter were used every Monday to hand out humanitarian aid packages, including bread and food parcels, to residents who had remained in the village and nearby settlements. Monday, November 2, was one of those distribution days.",
      },
      {
        type: "p",
        text: "According to Zelenskyy and Ukrainian officials, the attack came in two waves. The first bombs struck the school building just as people were arriving for aid. Then, in what officials described as a double-tap strike, more bombs hit the shelter where people had taken cover. Acting regional governor Mykhailo Semikin said at least nine 3,000-kilogram aerial bombs hit the village, reported as FAB-3000 guided bombs. Photos and video from Ukraine's emergency services showed the building reduced to smouldering rubble.",
      },
      {
        type: "list",
        items: [
          "When: Monday morning, November 2, 2026, reported between about 10 am and 11 am local time.",
          "Where: Komyshuvakha, in Ukraine's southern Zaporizhzhia region, close to the front line.",
          "What was hit: a school used as a weekly aid distribution point, and the shelter where people took cover.",
          "Weapons reported: at least nine aerial bombs, described as 3,000-kilogram FAB-3000 guided bombs.",
          "Killed: at least 26, up from an earlier confirmed figure of 24.",
          "Injured: five people, including two rescue workers.",
          "Missing: 27 people were initially reported missing."
        ],
      },
      {
        type: "h2",
        text: "Rescuers and police officers among the dead",
      },
      {
        type: "p",
        text: "The death toll includes people who had come to help as well as people who had come for aid. Ukraine's State Emergency Service said two of its rescuers and four police officers were among the dead. The rescuers were named as Denys Konovalenko and Oleksii Sushchevskyi, both aged 44. Two more rescue workers were among the injured.",
      },
      {
        type: "p",
        text: "Rescue work itself became dangerous. Officials said emergency teams had to stop their search several times because of Russian drone attacks in the area, and that drones, shelling and thick smoke slowed the effort. As night fell on Monday, responders were still using torches to search the rubble. That continuing search is why officials have warned the death toll could rise further.",
      },
      {
        type: "h2",
        text: "Why the Komyshuvakha aid centre strike matters for peace talks",
      },
      {
        type: "p",
        text: "The strike landed just as a rare pause in the fighting had ended. A six-day local ceasefire in the neighbouring Kherson region, centred on the Russian-occupied city of Oleshky, ended on Sunday, November 1. The pause, brokered with the help of US First Lady Melania Trump, had allowed a humanitarian mission and civilian evacuations from Oleshky, and was described as the longest truce of the war, with neither side reporting breaches.",
      },
      {
        type: "p",
        text: "In his nightly address, Zelenskyy said the attack sent the opposite signal. He called the strike utterly horrific and a vile terrorist strike, and said Russian forces could not have been unaware that residents gathered at the site every week for aid. His words, as reported by multiple outlets, were: \"With these killings, Russia is sending an entirely opposite signal: Russia is counting on more killings. There must be a response to this.\"",
      },
      {
        type: "p",
        text: "The Russian military has not publicly commented on the Komyshuvakha strikes, according to reports on Tuesday morning. Separately, Kremlin spokesman Dmitry Peskov said it was completely normal practice for forces to fortify positions during a pause. Ukraine's military, in turn, alleged Moscow used the Oleshky pause to bolster drone defences and replenish ammunition, and a senior Ukrainian figure told AFP that Russia had refused a Ukrainian offer to extend the truce.",
      },
      {
        type: "h2",
        text: "What happens next: mourning, rescue and Abu Dhabi talks",
      },
      {
        type: "p",
        text: "Tuesday, November 3, is a day of mourning across the Zaporizhzhia region for the victims, as declared by acting regional governor Mykhailo Semikin. Rescue and search operations were continuing, with families of the missing still waiting for news.",
      },
      {
        type: "p",
        text: "Diplomatically, the next fixed date is November 10 to 11, when US special envoy Steve Witkoff said delegations from Ukraine and Russia are due to meet in Abu Dhabi for US-mediated talks on post-war security, de-escalation and humanitarian measures. Those would be the first such three-way talks since February, according to reports.",
      },
      {
        type: "h2",
        text: "Komyshuvakha aid centre strike FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How many people were killed in the Komyshuvakha aid centre strike?", a: "At least 26, according to President Zelenskyy and Ukraine's State Emergency Service. The toll rose from 18 to 24 and then to 26 on Monday evening." },
          { q: "What was hit in Komyshuvakha?", a: "A school used every Monday to distribute humanitarian aid, and the shelter where people took cover after the first bombs fell." },
          { q: "Who was among the dead?", a: "Two rescuers, Denys Konovalenko and Oleksii Sushchevskyi, both 44, and four police officers, plus civilians who had come for aid." },
          { q: "How many people are missing?", a: "27 people were initially reported missing, and officials warned the death toll could rise as rescue work continues." },
          { q: "Has Russia commented on the strike?", a: "The Russian military had not publicly commented on the strikes in reports on Tuesday morning." },
          { q: "Why is November 3 a day of mourning?", a: "Acting regional governor Mykhailo Semikin declared November 3 a day of mourning across the Zaporizhzhia region for the victims." }
        ],
      },
    ],
  },
  {
    slug: "cyclone-murasu-landfall-ongole-november-3-2026",
    image: "https://imagesvs.oneindia.com/img/2026/11/cyclone2-81171793529629.jpg",
    imageAlt: "Cyclone Murasu over the Bay of Bengal and flooding on a road, as pictured in news coverage",
    title: "Cyclone Murasu Landfall: Storm Crosses Andhra Coast Near Ongole With 110-120 Kmph Winds",
    description:
      "Cyclone Murasu landfall began at 1 am on November 3, 2026 near Ongole, Andhra Pradesh, with 110-120 kmph winds, heavy rain and early damage reports.",
    excerpt:
      "Severe Cyclonic Storm Murasu began making landfall near Ongole in Andhra Pradesh at 1 am on Tuesday, November 3, 2026, with observed sustained winds of 110 to 120 kmph at the landfall point, and the crossing was expected to be completed by around 7:30 am.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Cyclone Murasu landfall is under way on Tuesday, November 3, 2026. The landfall process of Severe Cyclonic Storm Murasu commenced at 1 am near Ongole, in Prakasam district of Andhra Pradesh, with the observed maximum sustained wind speed of 110 kmph to 120 kmph at the landfall point, according to the India Meteorological Department (IMD). This is the actual crossing that the last two days of forecasts on this blog warned about: the storm was forecast to cross the south Andhra coast close to Ongole, between Nellore and Narsapur, between 11:30 pm on November 2 and 4 am on November 3, and it has now done so, on schedule and at the forecast strength.",
      },
      {
        type: "p",
        text: "As of the 5:30 am update, the landfall process was expected to be completed in another two hours, putting completion at around 7:30 am on Tuesday. The cyclone had been moving at 9 kmph over the previous six hours, much slower than its earlier pace, which stretched the crossing across the early morning. The IMD said a major part of the wall cloud had entered land and the eye was entering the coast, with gale winds of 100 to 110 kmph, gusting to 120 kmph, until the morning. A storm surge of 1.0 to 1.5 metres is likely to inundate low-lying south coastal areas until Tuesday morning, peaking over Bapatla, Krishna and Prakasam.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall: timeline on November 3",
      },
      {
        type: "list",
        items: [
          "1 am: landfall commences near Ongole, with observed sustained winds of 110 to 120 kmph at the landfall point.",
          "1:30 am: the cyclone is centred about 40 km southeast of Ongole, 60 km northeast of Kavali and 70 km south of Bapatla.",
          "3:30 am: Chief Minister N. Chandrababu Naidu holds a review by teleconference with district Collectors and officials.",
          "5:30 am: the IMD says landfall should be completed in another two hours, with the system then 20 km from Ongole and winds of 100 to 120 kmph."
        ],
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall damage reported so far in Ongole",
      },
      {
        type: "p",
        text: "The first damage reports are coming from Ongole itself. Several thatched houses collapsed and residents were stranded at Samatha Nagar in Ongole, Prakasam district, after heavy rain and strong winds, and the district administration has started rescue operations to evacuate those stranded. Several houses were also inundated in Beeramgunta village of Kothapatnam mandal. Along Kothapatnam Beach Road in Ongole, pushcarts and shop signboards lay scattered after being blown away by wind and rain since Monday night.",
      },
      {
        type: "p",
        text: "The statue of Andhra Kesari Tanguturi Prakasam Panthulu in the Prakasam district Collectorate premises in Ongole collapsed early on Tuesday after a large tree fell on it in heavy rain and strong winds. Reports also describe trees uprooted in Nellore, Prakasam and Bapatla, and several low-lying areas inundated. These are early reports, not a final damage assessment, and officials have not yet released consolidated totals.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall: Chief Minister Naidu's 3:30 am review and power supply",
      },
      {
        type: "p",
        text: "After Cyclone Murasu made landfall past midnight, Chief Minister N. Chandrababu Naidu held a review with district Collectors and officials at 3:30 am. He directed officials to ensure that people in cyclone-affected areas did not venture onto roads, and to take all necessary precautions to prevent loss of life and minimise property damage. He stressed that people should not come out onto the roads until all obstructions are cleared, drawing on the experience of Cyclone Arnab days earlier, when fallen live wires proved deadly.",
      },
      {
        type: "p",
        text: "On power supply, the news from the review was reassuring. Energy department officials informed the Chief Minister that no electricity poles had fallen and there were no disruptions to power supply anywhere in the affected zones.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall: rainfall today and what happens next",
      },
      {
        type: "p",
        text: "Landfall is not the end of the danger, because the heaviest rain follows the crossing. Several districts are forecast to receive heavy rainfall on Tuesday, including West Godavari, Eluru, Krishna, NTR, Guntur, Bapatla, Palnadu, Markapuram, Prakasam and Nellore. After landfall, the IMD expects the system to weaken into a depression and move northwest towards Telangana, but that does not remove the rainfall and surge risk for coastal Andhra Pradesh today.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu safety steps and Mana Mitra helpline",
      },
      {
        type: "steps",
        items: [
          "Stay indoors and do not venture onto roads in cyclone-affected areas until the storm has crossed and obstructions are cleared.",
          "Do not touch fallen wires, poles or damaged electrical equipment, and keep away from flooded stretches and coastal roads.",
          "To report a cyclone-related issue, send Hi on WhatsApp to 9552300009, the Mana Mitra helpline run by the Real Time Governance Society.",
          "Select Services from the menu, choose Murasu Cyclone Issues, click Report Issue and confirm, giving the location and nature of the problem.",
          "Check your district Collector's announcements for school closures and relief centres, rather than relying on forwarded messages."
        ],
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "When did Cyclone Murasu make landfall?", a: "At 1 am on Tuesday, November 3, 2026, near Ongole in Andhra Pradesh. The 5:30 am IMD update expected the process to be completed by around 7:30 am." },
          { q: "How strong was Cyclone Murasu at landfall?", a: "The IMD reported observed sustained winds of 110 to 120 kmph at the landfall point, with gale winds of 100 to 110 kmph, gusting to 120 kmph, along and off the coast." },
          { q: "Where exactly did Cyclone Murasu cross the coast?", a: "Close to Ongole, between Nellore and Narsapur on the south Andhra Pradesh coast, about 40 km southeast of Ongole at 1:30 am." },
          { q: "What damage has Cyclone Murasu caused so far?", a: "Early Ongole reports include collapsed thatched houses at Samatha Nagar, inundated houses at Beeramgunta village, scattered pushcarts on Kothapatnam Beach Road, uprooted trees in three districts, and a statue that collapsed at the Prakasam Collectorate after a tree fell on it. A full assessment has not yet been released." },
          { q: "Which districts face heavy rain on November 3?", a: "West Godavari, Eluru, Krishna, NTR, Guntur, Bapatla, Palnadu, Markapuram, Prakasam and Nellore, with heavy spells along south coastal Andhra Pradesh over the next 12 hours." }
        ],
      },
    ],
  },

  {
    slug: "hpcl-vizag-refinery-fire-visakhapatnam-november-3-2026",
    image: "https://img.republicworld.com/all_images/2026/11/massive-fire-erupts-at-hpcl-refinery-in-visakhapatnam-after-explosion-thick-smoke-covers-city-1793642312212-1280x720.webp?w=1280&h=720&q=75&format=webp",
    imageAlt: "Flames and thick black smoke rising from the HPCL refinery in Visakhapatnam after the pitch tank fire",
    title: "HPCL Vizag Refinery Fire: Blast at Pitch Tank Contained, No Casualties Reported",
    description:
      "HPCL Vizag refinery fire broke out at a pitch tank on November 2, 2026 night; HPCL says the blaze was contained quickly with no casualties.",
    excerpt:
      "A fire broke out at HPCL's Visakhapatnam refinery late on November 2, 2026, after explosion sounds at a pitch storage tank. HPCL says the blaze was localised, brought under control quickly, and caused no casualties.",
    date: "2026-11-03",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The HPCL Vizag refinery fire broke out late on Monday night, November 2, 2026, at the Hindustan Petroleum Corporation Limited (HPCL) refinery in Visakhapatnam, Andhra Pradesh. According to HPCL, the fire was reported at a pitch intermediate storage tank at around 10 pm, after a blast, and thick flames and black smoke rising over the port city quickly set off panic in nearby neighbourhoods. Videos and photos of the towering blaze spread widely on social media overnight, pushing the incident into the top trending news stories of Tuesday morning.",
      },
      {
        type: "p",
        text: "The reassuring part of the story came quickly. HPCL said its in-house Fire and Safety Team activated emergency protocols immediately, the fire remained localised to the pitch tank area, and it was brought under control within a short time. The company confirmed there were no casualties, and said all units at the Visakhapatnam refinery were operating safely. Revenue Divisional Officer Dileep Chakravarthy, who inspected the site, later confirmed the blaze had been completely put out and that there was no longer any danger to the public.",
      },
      {
        type: "h2",
        text: "HPCL Vizag refinery fire: what happened at the Visakhapatnam plant",
      },
      {
        type: "p",
        text: "The refinery is one of the country's major refining complexes, located in the Gajuwaka industrial area of Visakhapatnam. Reports citing police and HPCL employees said explosion-like sounds were heard from inside the facility on Monday night, followed by flames that spread rapidly and sent thick clouds of black smoke into the sky over the surrounding locality. Residents rushed out of their homes in fear as the glow and smoke became visible across the area.",
      },
      {
        type: "p",
        text: "As a precaution, refinery officials suspended power supply to the affected area and moved personnel to safer locations while firefighters worked on the tank. HPCL said its own firefighting systems were pressed into service and supplemented by units of the Andhra Pradesh Fire Department. Visakhapatnam Police Commissioner Shankhabrata Bagchi confirmed the incident and said the fire was confined to the tank and posed no threat to other sections of the refinery.",
      },
      {
        type: "list",
        items: [
          "When: late on Monday night, November 2, 2026, at around 10 pm, per HPCL's statement.",
          "Where: HPCL's Visakhapatnam (Vizag) refinery, in the Gajuwaka industrial area.",
          "What caught fire: a pitch intermediate storage tank, described in news reports as a sulphur pitch tank.",
          "What triggered it: a blast or explosion sounds were reported before the fire; the exact cause has not yet been confirmed by HPCL.",
          "Casualties: none reported, confirmed by HPCL, the police commissioner and the Revenue Divisional Officer.",
          "Status now: fire fully extinguished, all refinery units operating safely, and a formal safety enquiry to follow."
        ],
      },
      {
        type: "h2",
        text: "Why the HPCL Vizag refinery fire went viral overnight",
      },
      {
        type: "p",
        text: "The visuals did much of the work. Clips shared on X through the night showed a tall column of fire and dense black smoke above the refinery, and the sheer scale of the flames, combined with early reports of explosions, made the incident look far worse than the official outcome turned out to be. That gap between the dramatic footage and the confirmed facts is exactly why the story kept trending into Tuesday morning, as people searched for whether anyone had been hurt and whether nearby areas were at risk.",
      },
      {
        type: "p",
        text: "The timing added to the attention. The fire broke out on a night when Andhra Pradesh was already on high alert, with Severe Cyclonic Storm Murasu making its landfall along the state's south coast in the early hours of Tuesday. The two events are separate, and no official has linked them, but the coincidence meant a state already watching one emergency woke up to news of another.",
      },
      {
        type: "h2",
        text: "What officials have confirmed, and what is still under investigation",
      },
      {
        type: "p",
        text: "Three points are confirmed by multiple official sources: the fire was confined to the pitch tank area, it was brought under control and extinguished, and nobody was killed or injured. HPCL's own statement is the clearest on this: \"The fire was localised to the pitch tank area and was brought under control within a short time. There have been no casualties, and all units of the refinery are working safely.\"",
      },
      {
        type: "p",
        text: "What is not confirmed is the cause. The police commissioner said the exact cause was yet to be confirmed by the company, and early suggestions circulating in some reports have not been confirmed by HPCL or the police. Revenue Divisional Officer Dileep Chakravarthy described a minor explosion preceding the fire and said a formal enquiry into industrial safety compliance at the facility would be initiated as per prescribed norms. He also appealed to the public not to panic or spread rumours, saying, \"There is no cause for worry, and no injuries or casualties have been reported.\"",
      },
      {
        type: "p",
        text: "HPCL reiterated its commitment to safety and emergency preparedness. Further details are awaited.",
      },
      {
        type: "h2",
        text: "HPCL Vizag refinery fire FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "When did the HPCL Vizag refinery fire happen?", a: "Late on Monday night, November 2, 2026, at around 10 pm, at HPCL's Visakhapatnam refinery, according to the company's statement." },
          { q: "What caught fire at the HPCL Vizag refinery?", a: "A pitch intermediate storage tank, described in news reports as a sulphur pitch tank. HPCL says the fire stayed localised to that tank area." },
          { q: "Was anyone hurt in the HPCL Vizag refinery fire?", a: "No. HPCL, Visakhapatnam Police Commissioner Shankhabrata Bagchi and Revenue Divisional Officer Dileep Chakravarthy all confirmed there were no casualties or injuries." },
          { q: "Is the refinery still operating after the fire?", a: "Yes. HPCL said all units at the Visakhapatnam refinery were operating safely after the blaze was brought under control and extinguished." },
          { q: "What caused the HPCL Vizag refinery fire?", a: "The exact cause has not been confirmed yet. A minor explosion was reported before the fire, and a formal enquiry into industrial safety compliance is to follow." },
          { q: "Is there any danger to nearby residents now?", a: "No. Officials confirmed the blaze was fully extinguished and said there is no longer any danger to the public, while asking people not to panic over rumours." }
        ],
      },
    ],
  },
  {
    slug: "europe-supermarket-fridge-cyberattack-november-2-2026",
    image: "https://www.thedailymeal.com/img/gallery/9-mistakes-to-avoid-in-the-freezer-aisle/l-intro-1711382788.jpg",
    imageAlt: "A supermarket freezer aisle with glass-fronted frozen food cabinets (stock photo, not an affected store)",
    title: "Europe Supermarket Fridge Cyberattack: How Hackers Hit Stores Across 8 Countries",
    description:
      "Europe supermarket fridge cyberattack hit stores in at least eight countries on November 2, 2026, pushing freezer temperatures to 50°C and forcing disposal.",
    excerpt:
      "A suspected cyberattack on supermarket refrigeration systems hit stores in at least eight European countries on November 2, 2026, pushing some freezer temperatures to 50°C and forcing retailers to throw away spoiled food.",
    date: "2026-11-03",
    category: "Tech",
    sections: [
      {
        type: "p",
        text: "The Europe supermarket fridge cyberattack spread across the continent on Monday, November 2, 2026, hitting grocery stores from Sweden to Portugal. Retailers in at least eight countries reported fridges and freezers warming up overnight, and several chains threw away food that had spoiled or was at risk of spoiling. The European Union denounced the incidents as a deliberate attempt to disrupt its food chain, three weeks after a similar attack in French supermarkets.",
      },
      {
        type: "p",
        text: "What makes this incident unusual is how it happened. The attackers did not target checkout systems or customer data. Instead, they appear to have gone after the refrigeration systems themselves, remotely raising temperatures in some units to 50 degrees Celsius. Once cold-chain food warms up, it cannot simply be re-chilled and sold, so the immediate result was discarded food.",
      },
      {
        type: "h2",
        text: "Europe supermarket fridge cyberattack: which countries and stores were hit",
      },
      {
        type: "p",
        text: "Reports from AFP, Reuters and Deutsche Welle on November 2 put the affected countries at Belgium, Estonia, Finland, Ireland, Luxembourg, the Netherlands, Portugal and Sweden, with France hit by a separate but similar attack on October 12. Not every retailer used the same words, so the list below separates what chains confirmed as a cyberattack from what they described only as a technical or IT incident.",
      },
      {
        type: "list",
        items: [
          "Belgium: Carrefour reported disruption in about 15 of its 700 stores; its spokesman said, \"It's a cyberattack, there is no other reason.\" Around 40 Delhaize stores, plus Colruyt, Intermarche, Spar and an Ikea store in Mons, also reported fridge problems.",
          "Sweden: Coop confirmed six of its around 800 stores were hit by a cyber incident, now resolved. Ica reported problems in a limited number of stores, without confirming a cyberattack.",
          "Ireland: Musgrave, which owns SuperValu, said 13 of its stores were affected by a cyber-incident.",
          "Luxembourg: Four Delhaize stores reported problems, and Ahold Delhaize reported an overnight IT incident affecting freezers in Belgium and Luxembourg.",
          "Portugal: Mosqueteiros confirmed incidents at seven Intermarche stores linked to a cyberattack, apparently targeting an external refrigeration service provider.",
          "Estonia: Broadcaster ERR reported at least one supermarket attacked, with refrigeration temperatures raised to 50 degrees Celsius.",
          "Finland: Irregular temperatures were found in a few smaller Kesko stores; network interference had not been ruled out.",
          "Netherlands: A small number of corner shops suffered disruptions, according to AFP."
        ],
      },
      {
        type: "h2",
        text: "How the supermarket fridge cyberattack worked: remote refrigeration controls",
      },
      {
        type: "p",
        text: "The common thread is remote control. Modern supermarket refrigeration is monitored and managed through external systems, sometimes over mobile networks, so a chain can watch hundreds of stores from one place. That convenience is also the vulnerability. Coop said its affected stores had been connected to a 4G network rather than the updated 5G system, making them more exposed. Ica said its affected stores were all connected to an external refrigeration control system from Danish manufacturer Danfoss, the same supplier named in connection with the October 12 attack in France.",
      },
      {
        type: "p",
        text: "Belgian refrigeration group Sabcobel told AFP it had begun securing its installations after the French attack, but around 10 per cent were still not fixed, and some of those were in shops affected on Monday. In Estonia, a refrigeration executive told ERR the affected units were older Danfoss models similar to those targeted in France. Danfoss had yet to respond to AFP's request for comment, and no official link between the French and Monday attacks has been established.",
      },
      {
        type: "h2",
        text: "What the EU and investigators have said so far",
      },
      {
        type: "p",
        text: "EU food and agriculture commissioner Christophe Hansen said the bloc was taking the incidents very seriously, calling them a deliberate attempt to disrupt the food supply chain and undermine consumers' confidence in it. A Commission spokesperson added that food security is not currently at risk, but that the food waste and impact on businesses are real.",
      },
      {
        type: "p",
        text: "In Belgium, federal prosecutors opened an investigation, but without qualifying the incident as a cyberattack at that stage. That caution matters: while several chains were unequivocal, others, including Ica and Kesko, stopped short of confirming a cyberattack. Sweden's National Cyber Security Centre said it was investigating exposed operational technology devices, from refrigerators to security cameras, that need updating or patching.",
      },
      {
        type: "h2",
        text: "Why a fridge attack is a food security story, not just a tech story",
      },
      {
        type: "p",
        text: "A supermarket fridge is critical infrastructure in a way that is easy to miss until it fails. If temperatures rise for hours, chilled and frozen food must be discarded, even if it looks fine, because bacteria multiply quickly once food leaves safe cold storage. That is why the immediate visible effect was staff throwing away bags of spoiled food outside stores, as photographed outside an ICA supermarket in Stockholm on November 2.",
      },
      {
        type: "p",
        text: "The wider worry is the pattern. The October 12 attack in France affected hundreds of supermarkets. Monday's incidents, three weeks later, spread the same kind of disruption across at least eight countries in a single night. Specialists quoted in the reports said the spread beyond France had been expected, and that vulnerabilities in connected industrial systems are being exploited ever more actively. No individual or group had claimed responsibility for either attack at the time of reporting.",
      },
      {
        type: "h2",
        text: "Europe supermarket fridge cyberattack FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Which countries were hit?", a: "Belgium, Estonia, Finland, Ireland, Luxembourg, the Netherlands, Portugal and Sweden, per the AFP report on November 2, 2026, after a similar attack in France on October 12." },
          { q: "How hot did the freezers get?", a: "Retailers and broadcasters reported temperatures reaching 50 degrees Celsius in some units in Sweden and Estonia." },
          { q: "Was every store confirmed as a cyberattack?", a: "No. Carrefour, Coop, Musgrave and Mosqueteiros described cyber incidents, but Ica, Kesko and Belgian prosecutors stopped short of that confirmation." },
          { q: "Who is behind the attacks?", a: "No one had claimed responsibility for the November 2 incidents or the October 12 French attack, and no official link between the two has been established." },
          { q: "Is European food supply at risk?", a: "The European Commission said food security is not currently at risk, but that food waste and the impact on businesses are real." }
        ],
      },
    ],
  },
  {
    slug: "kimi-antonelli-youngest-f1-world-champion-mexico-grand-prix-november-2-2026",
    image: "https://autoracer.it/wp-content/uploads/2026/04/kimi2-scaled-e1777573628302.jpg",
    imageAlt: "Kimi Antonelli celebrating with the Italian flag as his Mercedes team sprays champagne",
    title: "Kimi Antonelli Youngest F1 World Champion: How the 20-Year-Old Sealed the Title in Mexico",
    description:
      "Kimi Antonelli youngest F1 world champion at 20 years and 68 days after finishing third at the Mexico City Grand Prix behind Max Verstappen and Lewis Hamilton.",
    excerpt:
      "Kimi Antonelli became Formula 1's youngest-ever world champion at 20 years and 68 days by finishing third at the Mexico City Grand Prix, a race won by Max Verstappen ahead of Lewis Hamilton.",
    date: "2026-11-02",
    category: "Sports",
    sections: [
      {
        type: "p",
        text: "Kimi Antonelli youngest F1 world champion is now official: the 20-year-old Mercedes driver clinched his first Formula 1 title at the Mexico City Grand Prix, finishing third in a dramatic, red-flagged race won by Max Verstappen ahead of Lewis Hamilton. At 20 years and 68 days, Antonelli is the youngest champion in the sport's history, breaking Sebastian Vettel's record from 2010, and the first Italian champion since Alberto Ascari in 1953.",
      },
      {
        type: "p",
        text: "The podium told the story of three eras of Formula 1: Hamilton, a seven-time champion, in second; Verstappen, winner of four straight titles from 2021 to 2024, on the top step; and between them the new champion, in only his second Formula 1 season, mobbed by his Mercedes crew with an Italian flag around his shoulders. His radio message said it all: We did it. Thank you so much.",
      },
      {
        type: "h2",
        text: "Kimi Antonelli youngest F1 world champion: how the title was sealed in Mexico",
      },
      {
        type: "p",
        text: "Antonelli arrived in Mexico City leading by 123 points, with only his team-mate George Russell and Hamilton still able to catch him. The maths was simple: finish ninth or better, and the title was his no matter what anyone else did. He started fourth, after qualifying fifth and moving up on a penalty for Verstappen, and drove a controlled race to third, passing Charles Leclerc for the final podium place around lap 48.",
      },
      {
        type: "p",
        text: "In the end, neither Russell nor Hamilton won the race, so the arithmetic was settled regardless. But Antonelli did not cruise home for safe points; he raced for the podium and got it, about four seconds behind Verstappen. With four races left, his lead is unassailable: 380 points to Verstappen's 261 and Hamilton's 259.",
      },
      {
        type: "list",
        items: [
          "Winner: Max Verstappen (Red Bull) in 2:20:28.772, his 74th career win and sixth in Mexico.",
          "Second: Lewis Hamilton (Ferrari), 0.799 seconds behind, from his first Ferrari pole at a full Grand Prix.",
          "Third: Kimi Antonelli (Mercedes), the result that sealed the drivers' championship with four races left.",
          "Fourth: Charles Leclerc (Ferrari), ahead of fifth-placed Lando Norris (McLaren) and sixth-placed George Russell (Mercedes).",
          "Standings: Antonelli 380 points, Verstappen 261, Hamilton 259, Russell fourth, 130 points behind Antonelli."
        ],
      },
      {
        type: "h2",
        text: "Why Antonelli's record is so remarkable",
      },
      {
        type: "p",
        text: "The previous youngest champion, Sebastian Vettel, was 23 years and 134 days old when he won his first title with Red Bull in 2010. Antonelli has beaten that mark by more than three years. He has also joined a short list of drivers to win the title in their second season, after Jacques Villeneuve and Lewis Hamilton, and is only the third Italian champion ever, after Giuseppe Farina in 1950 and Ascari, who won in 1952 and 1953.",
      },
      {
        type: "p",
        text: "The season behind the title has been remarkably consistent, with nine wins and 16 podiums, including victory in the United States Grand Prix just before Mexico. He had even missed the Mexico weekend's media day through illness, excused by the FIA as a precaution, and still delivered, admitting he had felt more tense than usual.",
      },
      {
        type: "h2",
        text: "A chaotic Mexico City Grand Prix: pole, crashes, a red flag and a 33-minute halt",
      },
      {
        type: "p",
        text: "The race was anything but a procession. Hamilton started from pole, the 105th of his career but his first for Ferrari at a full Grand Prix, with Leclerc alongside him. The Ferraris battled into the first corners, Leclerc cut across the grass at turn four, and Verstappen swept past Hamilton into second. Hamilton's radio complaint, Pushed out by my own team-mate, said it all, and Leclerc later took a five-second penalty.",
      },
      {
        type: "p",
        text: "The race was then halted on lap 46 of 71, when Valtteri Bottas suffered a front-left suspension failure and his Cadillac hit the barriers at turn one. Bottas walked to an ambulance giving a thumbs-up and was later released from the medical centre. The stoppage lasted about 33 minutes with 25 laps remaining; after the restart, Verstappen held off Hamilton while Antonelli passed Leclerc for third.",
      },
      {
        type: "p",
        text: "One more twist followed: after a second safety car, caused by a collision between Arvid Lindblad and Oscar Piastri, Hamilton chased Verstappen for the final nine laps but could not pass. Verstappen won by 0.799 seconds. Russell, who had started on the front row and needed to win to stay in contention, dropped back, collided with Isack Hadjar and took a 10-second penalty on his way to sixth.",
      },
      {
        type: "h2",
        text: "What happens next: Brazil, the constructors' title and four races to enjoy",
      },
      {
        type: "p",
        text: "With the drivers' title decided, attention turns to the constructors' championship and the final four races, starting in Brazil next weekend. Mercedes lead Ferrari 630 points to 504 and could clinch the team title in Brazil, while Verstappen and Hamilton will now fight over second place in the drivers' standings.",
      },
      {
        type: "p",
        text: "For Antonelli, the pressure is off, and he intends to enjoy it. I am speechless, he told the Mexico City crowd. It has been an incredible season, and to share this podium with Max and Lewis is truly incredible. On the last lap, he admitted, he had to back off because he could barely see the track through the emotion.",
      },
      {
        type: "h2",
        text: "Kimi Antonelli youngest F1 world champion FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How old is Kimi Antonelli, the youngest F1 world champion?", a: "20 years and 68 days, beating Sebastian Vettel's 23 years and 134 days from 2010 by more than three years." },
          { q: "Where did Antonelli win the 2026 F1 world championship?", a: "At the Mexico City Grand Prix, by finishing third behind race winner Max Verstappen and second-placed Lewis Hamilton." },
          { q: "What did Antonelli need to do in Mexico to seal the title?", a: "Finish ninth or better, which would have made him champion regardless of any other result. He finished third." },
          { q: "Who was the last Italian F1 world champion before Antonelli?", a: "Alberto Ascari in 1953, 73 years earlier. Antonelli is only the third Italian champion, after Giuseppe Farina (1950) and Ascari." },
          { q: "How many races remain in the 2026 F1 season?", a: "Four races, starting in Brazil, where Mercedes (630 points) can clinch the constructors' title ahead of Ferrari (504)." }
        ],
      },
    ],
  },
  {
    slug: "rishabh-pant-fails-fitness-test-new-zealand-tour-second-test-november-2-2026",
    image: "https://media.crictracker.com/media/attachments/1750506721747_Rishabh-Pant.jpeg",
    imageAlt: "Rishabh Pant in India colours (file photo)",
    title: "Rishabh Pant Fails Fitness Test Ahead of New Zealand Tour: Second Chance to Prove Readiness",
    description:
      "Rishabh Pant fitness test: India keeper reportedly failed his first BCCI assessment in Bengaluru and must clear a second test to tour New Zealand.",
    excerpt:
      "Rishabh Pant has reportedly failed his first fitness test at the BCCI Centre of Excellence in Bengaluru, leaving his New Zealand tour place to a second assessment within two days.",
    date: "2026-11-02",
    category: "Sports",
    sections: [
      {
        type: "p",
        text: "Rishabh Pant fitness test news broke on November 2, 2026, with reports saying India's star wicketkeeper-batter failed his first fitness assessment at the BCCI Centre of Excellence in Bengaluru on Sunday, November 1. According to ESPNcricinfo, whose report was carried by News18, ABP Live, CricTracker, the Free Press Journal and others through the afternoon, Pant has been given another chance to prove his fitness before he can board the flight to New Zealand for the two-Test series. His place on that tour now depends on a second assessment, expected within the next two days.",
      },
      {
        type: "p",
        text: "This is important precision: the reports describe a failed first test and a second chance, not a final ruling-out. No BCCI statement confirming the result was quoted in the November 2 coverage, and head coach Gautam Gambhir said on Sunday that he had no information about Pant's availability. The BCCI medical team's second test will settle whether he joins the squad in New Zealand.",
      },
      {
        type: "h2",
        text: "Rishabh Pant fitness test: how the injury happened",
      },
      {
        type: "p",
        text: "Pant's fitness battle traces back to a side strain he suffered during the Irani Cup in early October, while leading Rest of India against Jammu and Kashmir in Srinagar. He has been out of competitive action since then. On October 23 he reported to the BCCI Centre of Excellence in Bengaluru, where he has been working through a structured rehabilitation programme that, according to the reports, has included both batting drills and wicketkeeping sessions.",
      },
      {
        type: "p",
        text: "The selectors had already flagged the uncertainty when they picked the squads: Pant was named in India's Test squad for New Zealand and in the India A squad, but with an asterisk against his name marking his selection as subject to fitness. He was also ruled out of the first two four-day tour fixtures between India A and New Zealand A, with uncapped Kumar Kushagra brought in as cover. The first fitness test at the Centre of Excellence was therefore always going to be a decisive checkpoint, and the reported failure means the asterisk stays in place for now.",
      },
      {
        type: "h2",
        text: "Rishabh Pant fitness test: what the second test decides",
      },
      {
        type: "p",
        text: "If Pant clears the second assessment, the reported plan is for him to join the India A squad for the third four-day match against New Zealand A in Lincoln, which starts on November 7 and runs to November 10. That match would serve as his preparation and match practice ahead of the Test series itself. If he does not clear it, his trip to New Zealand, and his availability for the Tests, would be in serious doubt, and the team management would have to lean on its backup options behind the stumps.",
      },
      {
        type: "list",
        items: [
          "First fitness test: reportedly failed on Sunday, November 1, at the BCCI Centre of Excellence in Bengaluru.",
          "Second fitness test: expected within the next two days, to decide whether Pant can travel to New Zealand.",
          "India A third four-day match: New Zealand A vs India A in Lincoln, November 7 to 10, if Pant is cleared.",
          "First Test: India vs New Zealand at the Basin Reserve, Wellington, starting November 19.",
          "Second Test: India vs New Zealand in Christchurch, starting November 27."
        ],
      },
      {
        type: "h2",
        text: "Rishabh Pant fitness test: who keeps wicket if he misses out",
      },
      {
        type: "p",
        text: "Dhruv Jurel is the designated backup wicketkeeper in India's main Test squad for New Zealand, and he has already stepped in behind the stumps in the India A fixtures that Pant missed. Jurel's presence means India are not left without a specialist keeper, but Pant's absence would still be a major blow: he is the first-choice keeper-batter, a match-winner in Test cricket, and a senior voice in the dressing room. That is why the second test matters so much, and why the reports on November 2 spread so quickly among Indian cricket fans.",
      },
      {
        type: "p",
        text: "Fast bowler Jasprit Bumrah, by contrast, departed for New Zealand on Sunday and is pencilled in for the same third four-day match in Lincoln, according to CricTracker. Pant's reported setback shows how finely balanced India's preparations remain less than three weeks before the Wellington Test.",
      },
      {
        type: "h2",
        text: "Rishabh Pant fitness test: what happens next",
      },
      {
        type: "list",
        items: [
          "Second assessment: the BCCI medical team is expected to test Pant again within two days of the reported first-test failure.",
          "Travel decision: clearance from that test determines whether Pant boards the flight to New Zealand.",
          "Lincoln match: if cleared, Pant is expected to play the third India A four-day match against New Zealand A from November 7.",
          "Wellington Test: the first Test begins on November 19, and Pant's participation depends on fitness clearance and match readiness.",
          "Official word: fans should watch for a BCCI or team-management update, since the November 2 reports are based on the ESPNcricinfo report rather than a formal board announcement."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: Rishabh Pant reportedly failed his first fitness test at the BCCI Centre of Excellence in Bengaluru on November 1 while recovering from a side strain, and he will get a second test within two days that decides his New Zealand tour. Nothing is final yet, and that second assessment is the moment that will settle whether one of India's most important Test players makes the trip.",
      },
      {
        type: "h2",
        text: "Rishabh Pant fitness test FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Did Rishabh Pant fail his fitness test for the New Zealand tour?", a: "According to ESPNcricinfo, as reported on November 2, Pant failed his first fitness test at the BCCI Centre of Excellence in Bengaluru on November 1. He has not been ruled out yet." },
          { q: "Will Rishabh Pant get another fitness test?", a: "Yes. Reports say the BCCI medical team will arrange a second fitness test within the next two days to decide whether he can travel to New Zealand." },
          { q: "What injury has kept Rishabh Pant out?", a: "A side strain suffered during the Irani Cup in early October, while leading Rest of India against Jammu and Kashmir in Srinagar." },
          { q: "If cleared, when will Rishabh Pant play next?", a: "He is expected to join India A for the third four-day match against New Zealand A in Lincoln, starting November 7, as preparation for the Tests." },
          { q: "When does the India vs New Zealand Test series start?", a: "The first Test begins in Wellington on November 19, followed by the second Test in Christchurch on November 27." }
        ],
      },
    ],
  },
  {
    slug: "supreme-court-green-crackers-delhi-ncr-diwali-2026-timings-rules-november-2-2026",
    image: "https://cf-images.assettype.com/thequint%2F2026-11-02%2Fj0112yvx%2FDSC_8113__1_.jpg",
    imageAlt: "Fireworks bursting over rooftops during Diwali celebrations at night (file photo)",
    title: "Supreme Court Green Crackers Delhi-NCR: Diwali 2026 Timings, Rules and Ban Dates Explained",
    description:
      "Supreme Court green crackers Delhi-NCR: certified green crackers are allowed only on November 7-8, 2026, in fixed hours, with a full ban back from November 9.",
    excerpt:
      "The Supreme Court's detailed order published on November 2, 2026, allows only certified green firecrackers in Delhi-NCR on Diwali, November 7 and 8, in two fixed time windows each day.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Supreme Court green crackers Delhi-NCR news broke in detail on November 2, 2026, when the court's 23-page order was published, setting out exactly how Delhi and the National Capital Region may celebrate Diwali this year. A Bench of Justices M. M. Sundresh and Prasanna B. Varale has allowed only certified green firecrackers in Delhi-NCR, and only on November 7 and 8, 2026, in two fixed time windows each day. Outside those windows, and from November 9 onwards, the complete ban returns. It is a limited, temporary relaxation, not a general lifting of the ban.",
      },
      {
        type: "p",
        text: "This matters because Diwali falls on November 7 and 8, and Delhi-NCR slipped into the 'very poor' air-quality category on November 2 itself. Anyone in Delhi, Gurugram, Noida, Ghaziabad or Faridabad needs to know the permitted hours, certified products and no-cracker zones: an ordinary cracker, or a green cracker burst at the wrong hour, is not covered.",
      },
      {
        type: "h2",
        text: "Supreme Court green crackers Delhi-NCR: what is allowed and when",
      },
      {
        type: "p",
        text: "The court has permitted bursting of certified green firecrackers only between 6 am and 7 am and between 8 pm and 10 pm on November 7 and 8, 2026. No bursting is permitted at any other time on those days, and no firecracker of any kind may be burst from November 9, when the complete ban is restored.",
      },
      {
        type: "list",
        items: [
          "Bursting: 6 am to 7 am and 8 pm to 10 pm, on November 7 and 8, 2026 only.",
          "Manufacture: only CSIR-NEERI-certified, PESO-licensed makers, from November 2 to 6, 2026.",
          "Trader licences: cancelled licences restored temporarily from November 4 to 6, 2026.",
          "Ban resumes: from November 9, 2026, all firecrackers are banned again in Delhi-NCR.",
          "Next dates: compliance reports due December 14, 2026; matter listed December 16, 2026."
        ],
      },
      {
        type: "h2",
        text: "Supreme Court green crackers Delhi-NCR: the strict conditions on every box",
      },
      {
        type: "p",
        text: "Only crackers approved by CSIR-NEERI (the Council of Scientific and Industrial Research - National Environmental Engineering Research Institute) and made by PESO-licensed manufacturers are permitted. Conventional crackers, barium crackers and unapproved crackers remain banned, as do 'ladis' and garland-style crackers.",
      },
      {
        type: "p",
        text: "Every approved box must be sealed and not mixed with unauthorised crackers. Each box must carry a product-specific QR code giving the manufacturer, NEERI registration, licence, formulation and test certificate, so buyers and officers can verify it. Coverage also reports that online sales are prohibited and sales must take place only at designated locations. Makers and traders must furnish a monetary security, a 'handsome amount' fixed by the authorities, forfeitable for violations, along with licence cancellation.",
      },
      {
        type: "h2",
        text: "Supreme Court green crackers Delhi-NCR: the 300-metre no-cracker zones",
      },
      {
        type: "p",
        text: "No firework may be burst within a 300-metre radius of hospitals, nursing homes, primary and district health centres, old-age homes, educational institutions and notified silence zones. These areas must be declared no-cracker zones, marked on the ground and published. Police and district authorities must inspect designated sale locations, verify QR codes, check vehicles entering the region for illegal firecrackers, and enforce the no-cracker zones.",
      },
      {
        type: "p",
        text: "The court warned of contempt action against officials who fail to implement its directions. Buyers should check the published no-cracker zone list for their neighbourhood before Diwali night.",
      },
      {
        type: "h2",
        text: "Why the court allowed a limited window instead of a full ban or a free Diwali",
      },
      {
        type: "p",
        text: "The Bench called bursting firecrackers during Deepavali a religious practice, but a qualified right, not an absolute one. Article 25(1) is subject to public order, morality and health, the court said, and Article 21 includes a healthy, safe and pollution-free environment. Unregulated bursting causes severe air and noise pollution, harming children, disabled people and the elderly most.",
      },
      {
        type: "p",
        text: "At the same time, the court was sharply critical of how the ban had worked. It said the State had 'utterly failed' in complying with its orders since 2015, and the situation had not improved even after the resumption of a complete ban, with a significant air-quality spike evident on Dasara and the day after. The complete ban, it said, had facilitated illegal sales while preventing people from buying legitimate green crackers. The limited window is therefore a regulated middle path: only certified, lower-pollution products, for two days, in fixed hours, under verifiable safeguards.",
      },
      {
        type: "h2",
        text: "What Delhi-NCR residents should check before buying green crackers",
      },
      {
        type: "list",
        items: [
          "Certification: buy only CSIR-NEERI-approved crackers from a licensed trader; check the QR code on the sealed box.",
          "Timing: burst only 6 am to 7 am or 8 pm to 10 pm on November 7 and 8, 2026.",
          "Place: do not burst within 300 metres of a hospital, health centre, old-age home, school or silence zone.",
          "Product type: avoid barium, conventional, 'ladis' and garland crackers; all remain banned.",
          "Air quality: the pollution board must publish daily reports from November 2 to 30, 2026."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: the order published on November 2 gives Delhi-NCR a narrow, tightly policed Diwali window for certified green crackers only, on November 7 and 8, in the morning and evening hours fixed by the court, with a full ban returning on November 9. For buyers, the details that matter most are the QR code, the sealed box, the two time windows, and the 300-metre no-cracker zones.",
      },
      {
        type: "h2",
        text: "Supreme Court green crackers Delhi-NCR FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Are green crackers allowed in Delhi-NCR for Diwali 2026?", a: "Yes, only certified green crackers, only on November 7 and 8, 2026. A complete ban returns from November 9." },
          { q: "What are the permitted bursting hours in Delhi-NCR?", a: "6 am to 7 am and 8 pm to 10 pm on November 7 and 8, 2026. No bursting is allowed outside those hours." },
          { q: "How can I tell if a cracker is a genuine green cracker?", a: "It must be CSIR-NEERI-approved, PESO-licensed, sold in a sealed box, and carry a product-specific QR code." },
          { q: "Where are crackers banned even on November 7 and 8?", a: "Within 300 metres of hospitals, health centres, old-age homes, schools and notified silence zones." },
          { q: "When does the full ban return in Delhi-NCR?", a: "From November 9, 2026. Compliance reports are due December 14, and the matter returns on December 16." }
        ],
      },
    ],
  },
  {
    slug: "delhi-aqi-today-very-poor-first-time-season-grap-stage-2-november-2-2026",
    image: "https://i.natgeofe.com/n/a295913d-5a4c-4e2f-93f0-731a95d8d8e3/1-delhi-smog.jpg?w=1280&",
    imageAlt: "Delhi skyline shrouded in thick smog (file photo)",
    title: "Delhi AQI Today: Air Turns 'Very Poor' for the First Time This Season as GRAP Stage 2 Kicks In",
    description:
      "Delhi AQI today crossed 300 into 'very poor' for the first time this season on November 2, 2026. Check area-wise readings, GRAP rules and health tips.",
    excerpt:
      "Delhi's air quality slipped into the 'very poor' category for the first time this season on November 2, 2026, with the city's AQI recorded at 312 in the morning.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Delhi AQI today has turned 'very poor' for the first time this season. On Monday, November 2, 2026, Delhi's overall Air Quality Index (AQI) was 312 at 9 am, per Central Pollution Control Board (CPCB) data reported by PTI, putting the capital in the 301 to 400 'very poor' band. The Indian Express reported a morning reading of 310, up from 277 a day earlier. In short, the air is unhealthy for prolonged outdoor exposure today, and the stricter GRAP stage now applies.",
      },
      {
        type: "p",
        text: "This is not a one-station spike. Readings above 300 were reported across the city, neighbouring Noida also entered the 'very poor' category at 311, and Delhi Traffic Police stepped up enforcement of vehicle restrictions that came into force on November 1. The slide came a day after Delhi's Winter Action Plan took effect.",
      },
      {
        type: "h2",
        text: "Delhi AQI today: area-wise readings on November 2, 2026",
      },
      {
        type: "p",
        text: "CPCB Sameer app and station readings on November 2 show how widespread the deterioration was. These are morning readings, not the full-day average published later, so areas may move by evening. Most of the city sat in the 'poor' or 'very poor' range, with several hotspots near the top of the 'very poor' band.",
      },
      {
        type: "list",
        items: [
          "Rohini: 396 (very poor), the highest reported",
          "Alipur: 375 (very poor) and Vivek Vihar: 370 (very poor)",
          "Chandni Chowk: 358, ITO: 349 and Akshardham: 349 (all very poor)",
          "Jawaharlal Nehru Stadium: 343 (very poor) and India Gate and Janpath: 335 (very poor)",
          "Burari: 308 (very poor), Aya Nagar: 276 (poor) and IGI Airport Terminal 3: 263 (poor)",
          "Noida: 311 (very poor); Ghaziabad at 278 and Gurugram at 230 were 'poor'",
        ],
      },
      {
        type: "p",
        text: "For context, the CPCB scale runs from 0 to 50 for 'good' to 401 to 500 for 'severe'. Delhi at 312 sits just inside the 'very poor' band, but Rohini, at 396, was close to 'severe', which is why your local reading can feel quite different from the city average.",
      },
      {
        type: "h2",
        text: "What GRAP Stage 2 means for Delhi",
      },
      {
        type: "p",
        text: "The Graded Response Action Plan (GRAP) is Delhi's staged emergency framework, operated by the Commission for Air Quality Management (CAQM). Stage 2 is associated with the 'very poor' band of 301 to 400, and the CAQM's sub-committee invokes it based on readings and forecasts. Reports on November 2 said crossing 300 activated Stage 2, adding stricter curbs on top of Stage 1 restrictions that began on November 1.",
      },
      {
        type: "p",
        text: "The most visible change concerns vehicles. The Indian Express reported that, under the revised GRAP, petrol and diesel vehicles registered outside Delhi that do not meet BS-VI standards are barred from entering the capital until January 31, 2027, while electric and CNG vehicles are exempt. Non-BS-VI commercial goods vehicles and buses face restrictions too. Delhi Traffic Police said they checked 7,279 vehicles on November 1, turned back 714 and impounded 38.",
      },
      {
        type: "list",
        items: [
          "Stage 1 came into force on November 1, with Stage 2 associated with the 'very poor' 301 to 400 band",
          "Non-BS-VI petrol and diesel vehicles registered outside Delhi are barred from entry until January 31, 2027",
          "Electric and CNG vehicles are exempt from the entry restriction",
          "Delhi Traffic Police checked 7,279 vehicles on November 1, turning back 714 and impounding 38",
        ],
      },
      {
        type: "h2",
        text: "How to check Delhi AQI today for your area",
      },
      {
        type: "steps",
        items: [
          "Open the CPCB Sameer app or website and find your nearest monitoring station, since readings vary sharply by area.",
          "Check the AQI number and category, not just the colour, and note whether it is live or a daily average.",
          "Compare your area with the city average: 396 and 242 mean very different precautions on the same day.",
          "Recheck in the evening, because morning readings and the 4 pm average can differ, and GRAP follows official readings.",
        ],
      },
      {
        type: "h2",
        text: "How to protect yourself when Delhi AQI is very poor",
      },
      {
        type: "p",
        text: "Health advisories warn that prolonged exposure at this level can cause respiratory illness, and people with asthma or heart conditions, children and older adults should take extra care. These are general precautions, not medical advice.",
      },
      {
        type: "list",
        items: [
          "Limit prolonged outdoor exertion, especially in the morning, and move workouts indoors where possible.",
          "Wear a well-fitting mask outdoors if you must be out long, and keep windows closed during the worst hours.",
          "Use an air purifier indoors if you have one, and avoid indoor smoke from incense, candles or frying without ventilation.",
          "Watch for persistent coughing, wheezing or breathlessness, and seek medical advice if they worsen.",
        ],
      },
      {
        type: "h2",
        text: "Why does Delhi's air get worse in November?",
      },
      {
        type: "p",
        text: "Delhi's air typically deteriorates as winter sets in: calm winds and cooler temperatures trap pollutants close to the ground instead of dispersing them, while emissions from vehicles, construction dust and other sources continue. That is why a clean October can be followed by a sharp slide in early November. Weather played a role on November 2 too: the minimum at Safdarjung was 16.4 degrees Celsius, slightly above normal, and no rainfall was recorded at the city's five stations in the 24 hours to 8.30 am, so no rain washed pollutants away.",
      },
      {
        type: "faq",
        items: [
          {
            q: "What is Delhi AQI today?",
            a: "Delhi's overall AQI was 312 at 9 am on November 2, 2026, its first 'very poor' day this season, per CPCB data reported by PTI.",
          },
          {
            q: "What does 'very poor' AQI mean?",
            a: "On the CPCB scale, 'very poor' is 301 to 400. Prolonged exposure can cause respiratory illness, especially for children, older adults and people with breathing or heart conditions.",
          },
          {
            q: "Is GRAP Stage 2 in force in Delhi?",
            a: "Reports said crossing 300 activated GRAP Stage 2, the stage for the 301 to 400 band. The CAQM decides the stage from official readings and forecasts, so check the latest announcement before travelling.",
          },
          {
            q: "Which Delhi areas had the worst AQI on November 2?",
            a: "Rohini was highest at 396, followed by Alipur at 375, Vivek Vihar at 370, Chandni Chowk at 358, and ITO and Akshardham at 349 each.",
          },
          {
            q: "Are vehicles from outside Delhi banned?",
            a: "Non-BS-VI petrol and diesel vehicles registered outside Delhi are barred from entry until January 31, 2027, under the revised GRAP curbs. Electric and CNG vehicles are exempt.",
          },
        ],
      },
    ],
  },
  {
    slug: "punjab-police-asi-suspended-planting-heroin-khanna-viral-video-november-2-2026",
    image: "https://www.thestatesman.com/wp-content/uploads/2022/05/Pic-2-1-768x512.jpg",
    imageAlt: "Punjab Police officers at a press conference (file photo)",
    title: "Punjab Police ASI Suspended After Viral Video Allegedly Shows Him Planting Heroin in Khanna",
    description:
      "Punjab Police ASI suspended after a viral Khanna video allegedly shows him planting heroin under a mattress before a raid on Mahant Kashmir Giri.",
    excerpt:
      "A viral hidden-camera video allegedly showing a Punjab Police ASI placing a packet under a mattress has led to his suspension and an SIT probe in Khanna.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Punjab Police planting heroin allegations exploded on social media on November 2, 2026, after a viral video purportedly showed a police officer placing a packet under a mattress at a home in Khanna, Punjab, shortly before a police search allegedly recovered heroin from the same spot. Khanna Senior Superintendent of Police Dr Darpan Ahluwalia has suspended Assistant Sub-Inspector Sukhdev Singh, who was posted with the CIA staff, and ordered a Special Investigation Team probe into the incident.",
      },
      {
        type: "p",
        text: "The suspension and the release of the arrested man, Shiv Sena leader Mahant Kashmir Giri, turned a local raid into a statewide political controversy within hours, with the BJP and Shiromani Akali Dal chief Sukhbir Singh Badal attacking the Bhagwant Mann-led AAP government on November 2. Precision matters here: the video allegedly shows planting, and its authenticity is part of what the SIT must investigate. This post does not treat planting as a proven fact.",
      },
      {
        type: "h2",
        text: "Punjab Police planting heroin video: what allegedly happened in Khanna",
      },
      {
        type: "p",
        text: "According to reports in The Indian Express, NDTV, The Statesman, Outlook and Oneindia, the sequence began with the arrest of Giri's driver, Gurjant Singh alias Janta, who was allegedly caught with 7.5 grams of heroin. An FIR was registered at Khanna Sadar Police Station, and police said the driver's interrogation led them to Giri's residence in Khanna town in Ludhiana district.",
      },
      {
        type: "p",
        text: "A police team then searched Giri's house and claimed to have recovered around 30 grams of heroin from beneath a bed mattress, after which Giri was arrested in a drug trafficking case. That recovery is now under a cloud because of footage from a hidden camera installed at the house by the family. The viral clip purportedly shows ASI Sukhdev Singh, dressed in plain clothes, entering a room before the formal police party arrived and placing a packet beneath the mattress.",
      },
      {
        type: "p",
        text: "Moments later, according to NDTV's account, police entered the room with Giri, searched it, and claimed to discover heroin from the same spot where the ASI had allegedly been seen placing the packet.",
      },
      {
        type: "h2",
        text: "Punjab Police planting heroin case: suspension and SIT probe",
      },
      {
        type: "p",
        text: "After senior officers reviewed the recording, Khanna SSP Dr Darpan Ahluwalia suspended ASI Sukhdev Singh, removed him from the case and discharged Giri, who had been arrested after the claimed recovery. The SSP has also constituted a Special Investigation Team headed by an SP-rank officer to probe the footage's authenticity, the ASI's alleged role, the recovery's circumstances and other officers' possible involvement. A departmental inquiry has also begun, according to Oneindia.",
      },
      {
        type: "h2",
        text: "Punjab Police planting heroin row: political reaction on November 2",
      },
      {
        type: "p",
        text: "The political reaction was swift. The BJP's official X account posted on November 2 that footage showed ASI Sukhdev Singh placing something under the bed at Giri's house, and that police then 'recovered' 30 grams of heroin from the exact same spot. Shiromani Akali Dal president Sukhbir Singh Badal posted that the ASI was 'caught live on CCTV secretly hiding a packet of drugs under a mattress', accusing the AAP government of a breakdown of law and order and of framing citizens. Those are political allegations, not SIT findings.",
      },
      {
        type: "h2",
        text: "Punjab Police planting heroin case: who is Mahant Kashmir Giri",
      },
      {
        type: "p",
        text: "Mahant Kashmir Giri is a Shiv Sena leader and Hindu religious leader based in Khanna. The Indian Express described him as a former rashtriya pracharak of the Shiv Sena's Punjab unit, and reported that he has faced several criminal cases over the years, including allegations of attempted murder, weapons offences, cheating, impersonation and drug trafficking.",
      },
      {
        type: "p",
        text: "The same report listed earlier cases and allegations against him, including an alleged drug-supply racket case last year and older cheating, impersonation and weapons allegations. These are earlier allegations as reported, not verdicts, and they do not by themselves settle what happened in the Khanna search.",
      },
      {
        type: "h2",
        text: "Punjab Police planting heroin case: what happens next",
      },
      {
        type: "list",
        items: [
          "SIT findings: whether the inquiry confirms the footage is authentic, and what it says about the ASI's role and any other officers involved.",
          "Departmental action: whether the suspension leads to further disciplinary proceedings against Sukhdev Singh or others.",
          "The driver's case: what happens to the case against Gurjant Singh alias Janta, whose arrest led police to Giri's house in the first place.",
          "Court scrutiny: whether the claimed 30-gram recovery is tested in court, and how the video affects any prosecution.",
          "Political fallout: whether the row stays a Khanna story or becomes a larger Punjab debate about drug-case investigations."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: a viral video allegedly shows a Punjab Police ASI placing a packet under a mattress in Khanna before a search that claimed to find heroin there; the ASI has been suspended, the arrested Shiv Sena leader has been discharged from the case, and an SP-rank SIT is investigating. The key question, whether the footage proves a planted recovery, is still under investigation, and this post will not call it proved until an inquiry or court says so.",
      },
      {
        type: "h2",
        text: "Punjab Police planting heroin FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Which Punjab Police officer was suspended in the Khanna case?", a: "ASI Sukhdev Singh, who was posted with the CIA staff in Khanna, was suspended by Khanna SSP Dr Darpan Ahluwalia." },
          { q: "What does the viral Khanna video allegedly show?", a: "It purportedly shows ASI Sukhdev Singh, in plain clothes, placing a packet under a mattress at Mahant Kashmir Giri's house before a police search claimed to recover heroin from the same spot." },
          { q: "How much heroin did police claim to recover in Khanna?", a: "Police claimed to have recovered around 30 grams of heroin from beneath the mattress; the driver's earlier arrest involved an alleged 7.5 grams." },
          { q: "What happened to Mahant Kashmir Giri after the video surfaced?", a: "He was discharged from the case and released after senior officers reviewed the hidden-camera footage." },
          { q: "Who is investigating the Khanna planting allegation?", a: "A Special Investigation Team headed by an SP-rank officer, constituted by Khanna SSP Dr Darpan Ahluwalia, is probing the footage and the search." }
        ],
      },
    ],
  },
  {
    slug: "spicejet-sg553-mumbai-gorakhpur-cancelled-viral-video-passengers-november-2-2026",
    image: "https://static0.simpleflyingimages.com/wordpress/wp-content/uploads/2021/01/31117439718_9fb77e019e_o-1-scaled.jpg",
    imageAlt: "A SpiceJet aircraft on a runway (file photo)",
    title: "SpiceJet SG553 Mumbai-Gorakhpur Cancellation Sparks Viral Video Chaos: What Passengers Say",
    description:
      "SpiceJet SG553 Mumbai-Gorakhpur cancelled viral video: passengers say they were boarded, briefed and seated for nearly an hour before cancellation.",
    excerpt:
      "A viral video shows panic among SpiceJet SG553 passengers after the Mumbai-Gorakhpur flight was cancelled at the last minute on November 1.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "SpiceJet SG553 Mumbai-Gorakhpur cancelled viral video chaos broke out online on November 2, 2026, as footage of panicking passengers spread across social media a day after the flight was called off at the last minute. SpiceJet flight SG553, scheduled to operate from Mumbai to Gorakhpur, was cancelled on Sunday, November 1, and the airline has said the reason was watch-hour restrictions at Gorakhpur airport.",
      },
      {
        type: "p",
        text: "The video, filmed by passenger Vijay Lakshmi Mallya and reported by Times Now on November 2, shows crying toddlers, screaming adults, chaotic queues and confused passengers after the cancellation was announced just before take-off. Passengers in the clip say the crew and pilot left after making the announcement, leaving a full aircraft to deboard in confusion. That account of the crew leaving is the passengers' allegation as reported; the airline's statement quoted in the same coverage does not directly address it.",
      },
      {
        type: "h2",
        text: "SpiceJet SG553 cancelled viral video: what passengers say happened",
      },
      {
        type: "p",
        text: "According to Times Now, passengers had already boarded, completed the safety briefing and remained seated for almost an hour before the announcement. The filming passenger can be heard saying: 'All the crew members and the pilot left after announcing. The passengers are getting panicked, this is the condition. This is insane and something against which a case should be filed.'",
      },
      {
        type: "p",
        text: "The passenger's written post, quoted by Times Now, was even angrier. It said the flight's timing had been changed multiple times, passengers were made to board, the safety briefing was completed, they were kept seated for almost an hour, and only then was the flight cancelled because of an alleged 8 pm landing restriction. The post asked why passengers were allowed to board at all if the airline already knew about the operational restriction, and demanded answers and accountability from the airline and aviation authorities.",
      },
      {
        type: "p",
        text: "The clip then shows passengers panicking as they began to deboard from the aircraft. Online reaction, as reported, split between criticism of the airline staff for poor handling of the situation and questions about compensation for affected passengers. Some viewers sympathised with families travelling with small children, while others asked what rebooking or refund help was actually offered on the spot.",
      },
      {
        type: "h2",
        text: "SpiceJet SG553 cancelled: what the airline said",
      },
      {
        type: "p",
        text: "SpiceJet issued a statement after the video gained traction, clarifying that the cancellation was due to watch-hour restrictions at Gorakhpur. The airline said: 'On November 01, 2026, SpiceJet flight SG553 scheduled to operate from Mumbai to Gorakhpur was cancelled due to watch hour restrictions at Gorakhpur. As Gorakhpur is a defence airport, the watch hour extension was not possible beyond 9:00 pm. An additional commercial flight is scheduled today for the stranded passengers. Inconvenience caused to the passengers is deeply regretted.'",
      },
      {
        type: "p",
        text: "That explanation answers the narrow question of why the flight could not operate, but it leaves the passengers' main complaint unanswered in the coverage so far: the timing. If a 9 pm watch-hour limit at a defence airport was already known, passengers want to know why boarding, a safety briefing and nearly an hour seated on the aircraft happened first. The airline's statement does not explain the boarding decision, and no separate response to that specific point was quoted in the Times Now report.",
      },
      {
        type: "h2",
        text: "SpiceJet SG553 cancelled viral video: why it struck a nerve",
      },
      {
        type: "p",
        text: "The video struck a nerve because it combined three frustrations frequent flyers recognise at once: a last-minute change, a long wait with no clear information, and a sense of being left to sort things out alone. The presence of crying children in the footage made the clip especially shareable, and the passenger's direct-to-camera anger gave it a clear villain in the eyes of many viewers: an airline that, in their view, wasted their time and then apologised.",
      },
      {
        type: "p",
        text: "It also arrived during a busy travel period, when rebooking is harder and replacement fares are higher. Commenters raised the practical questions that follow any last-minute cancellation: who pays for a missed connection or a new ticket, and what rebooking or refund help is offered on the spot? Affected SG553 passengers should check the airline's own options for this flight rather than relying on social media claims.",
      },
      {
        type: "h2",
        text: "SpiceJet SG553 cancelled: what stranded passengers should check",
      },
      {
        type: "list",
        items: [
          "The additional flight: SpiceJet said an additional commercial flight was scheduled on November 2 for stranded passengers, so check the airline's app, website or airport counter for that option first.",
          "Rebooking or refund: ask the airline directly for the SG553 option, and keep the booking reference and boarding pass.",
          "Receipts and records: keep receipts for any extra spending caused by the cancellation, and note the times of announcements, which matter if a complaint is later filed.",
          "Official channels: raise a complaint through the airline's customer care and, if unresolved, the regulator's grievance channels, rather than only on social media."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: SG553 was cancelled on November 1 over Gorakhpur watch-hour restrictions, where an extension beyond 9 pm was not possible; a viral passenger video shows panic among passengers who say they were boarded, briefed and seated for nearly an hour first; and SpiceJet says an additional flight was scheduled on November 2. Whether boarding was avoidable remains the unanswered question.",
      },
      {
        type: "h2",
        text: "SpiceJet SG553 cancelled FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Which SpiceJet flight was cancelled in the viral video?", a: "SpiceJet flight SG553, scheduled from Mumbai to Gorakhpur on November 1, 2026." },
          { q: "Why was SpiceJet SG553 cancelled?", a: "SpiceJet said it was cancelled due to watch-hour restrictions at Gorakhpur, a defence airport where an extension beyond 9:00 pm was not possible." },
          { q: "What does the viral SG553 video show?", a: "Passengers panicking and deboarding after a last-minute cancellation announcement; the filming passenger said the crew and pilot left after announcing it." },
          { q: "What did SpiceJet offer stranded SG553 passengers?", a: "The airline said an additional commercial flight was scheduled on November 2 for stranded passengers, and expressed regret for the inconvenience." },
          { q: "Was the SG553 cancellation announced before boarding?", a: "No, according to the passengers in the video: they say they had boarded, completed the safety briefing and sat inside for almost an hour before the cancellation was announced." }
        ],
      },
    ],
  },
  {
    slug: "punjab-aap-mlas-join-bjp-2027-polls-november-2-2026",
    image: "https://cdn.indiavoice.com/wp-content/uploads/2022/03/PB-VIDHAN.jpg",
    imageAlt: "Punjab Legislative Assembly (file photo)",
    title: "Punjab AAP MLAs Join BJP: 3 Rebel MLAs Quit Ahead of 2027 Polls",
    description:
      "Punjab AAP MLAs join BJP on November 2: three sitting MLAs quit the ruling party and joined the BJP ahead of the 2027 Punjab Assembly elections.",
    excerpt:
      "Three sitting Punjab AAP MLAs joined the BJP in New Delhi on November 2, 2026, dealing a setback to the ruling party months before the 2027 Assembly elections.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Three Punjab AAP MLAs join BJP ranks on Monday, November 2, 2026, in a major setback for the ruling Aam Aadmi Party (AAP) ahead of the 2027 Punjab Assembly elections. Kunwar Vijay Pratap Singh, Harmeet Singh Pathanmajra and Chetan Singh Jouramajra joined the Bharatiya Janata Party (BJP) at its New Delhi headquarters, in the presence of Punjab in-charge Satish Poonia and Punjab BJP president Kewal Singh Dhillon.",
      },
      {
        type: "p",
        text: "The defections came days after AAP released its first list of 40 candidates for the 2027 elections. The departing leaders accused the Bhagwant Mann government of failing on drugs, law and order and debt, while AAP accused the BJP of recruiting leaders who had left or been expelled by other parties. Claims that more MLAs could follow are, for now, claims, not confirmed defections.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP: what happened in Delhi today",
      },
      {
        type: "p",
        text: "The BJP announced the inductions on its official X account on November 2, naming all three leaders. The Hindu, Business Today, The Times of India and The New Indian Express all reported the joining the same day.",
      },
      {
        type: "p",
        text: "Pathanmajra and Jouramajra had resigned from AAP's primary membership on Sunday, November 1. Singh announced on Monday that he had resigned from the Punjab Legislative Assembly itself, sharing his letter to Speaker Kultar Singh Sandhwan on Facebook. It said the resignation took effect from November 1, 2026.",
      },
      {
        type: "p",
        text: "By the afternoon, the story was still developing: news agency IANS reported that AAP had begun preparing to seek the disqualification of two of the MLAs who quit on Sunday. That reported move, if filed, would test whether the switch triggers anti-defection proceedings.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP: who are the three leaders",
      },
      {
        type: "p",
        text: "Kunwar Vijay Pratap Singh was the AAP MLA from Amritsar North and a former IPS officer who probed the 2015 Kotkapura and Behbal Kalan police-firing cases. He was suspended from AAP in June 2025, reportedly for five years, over alleged anti-party activities.",
      },
      {
        type: "p",
        text: "Harmeet Singh Pathanmajra represented Sanaur and Chetan Singh Jouramajra represented Samana, both in Patiala district. Jouramajra was a Cabinet minister from January 2023 to September 2024. Neither seat figured in AAP's first candidate list, and the party had appointed new constituency in-charges in both.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP: why they say they quit",
      },
      {
        type: "p",
        text: "The three leaders gave overlapping reasons, all aimed at the Mann government's record. Pathanmajra and Jouramajra said the party had failed to fulfil its 2022 promises, particularly making Punjab drug-free. They also raised law and order, farmers' issues, rising debt and shortages in schools and hospitals.",
      },
      {
        type: "p",
        text: "Pathanmajra said Punjab was now known as Udta Punjab and should become Ubharta Punjab, and he alleged the government had taken on around Rs 2.5 lakh crore in loans. That loan figure is his allegation, not a verified figure. Jouramajra alleged a mining mafia and scams in government schemes, and said Punjab needed a double-engine government, meaning the same party at the Centre and in the state.",
      },
      {
        type: "p",
        text: "Singh was the most blunt. He described his five years in AAP as an internship that had now ended, said the party was finished in Punjab in practical terms, and held national convenor Arvind Kejriwal and Chief Minister Bhagwant Mann responsible. He predicted a BJP double-engine government after the next election. Those are his political claims, which AAP rejects.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP: how AAP hit back",
      },
      {
        type: "p",
        text: "AAP's Punjab chief Aman Arora accused the BJP of inducting leaders who had left or been expelled by other parties, while spokesperson Kuldeep Singh Dhaliwal mocked the BJP as a kabaad di dukaan, or junk shop. The party's line is that these were already sidelined figures, not a collapse of its core.",
      },
      {
        type: "p",
        text: "Congress MP Manish Tewari called Aaya Ram, Gaya Ram politics damaging, while Shiromani Akali Dal leader Daljit Singh Cheema predicted more exits once the Model Code of Conduct comes into force. That is a prediction, not a fact.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP: what it means for the 2027 election",
      },
      {
        type: "p",
        text: "In 2022, AAP won 92 of the 117 seats, far above the majority mark of 59, while Congress won 18, the Shiromani Akali Dal three and the BJP just two. Even after losing three MLAs, AAP would still hold a large majority, so the defections do not by themselves threaten the government. Their importance is political: they signal dissent and feed an anti-incumbency narrative.",
      },
      {
        type: "p",
        text: "The elections are due in early 2027, with polling expected around February to March, and the Assembly's term ends on March 16, 2027. Jouramajra suggested some ticket-holders might relinquish their tickets and join the BJP. Whether that happens will test whether November 2 was a one-day story or a larger exodus.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP: what happens next",
      },
      {
        type: "list",
        items: [
          "The Speaker's decision on Singh's Assembly resignation.",
          "Disqualification petitions: whether AAP follows through on the reported plan for the MLAs who quit on Sunday.",
          "More exits or not: whether any other AAP leader actually switches, as the departing leaders predict.",
          "Candidate lists: how AAP fills Samana and Sanaur, and whether the BJP fields any of the three.",
          "The campaign narrative: whether drugs, debt and law and order define the Punjab election, as the defectors argue."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: three sitting Punjab MLAs quit AAP and joined the BJP in Delhi on November 2, citing unfulfilled promises and governance failures, and AAP has hit back while reportedly preparing a disqualification move. Claims of a wider exodus remain unproved.",
      },
      {
        type: "h2",
        text: "Punjab AAP MLAs join BJP FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Which Punjab AAP MLAs joined the BJP?", a: "Kunwar Vijay Pratap Singh (Amritsar North), Harmeet Singh Pathanmajra (Sanaur) and Chetan Singh Jouramajra (Samana)." },
          { q: "When did the three leaders quit AAP?", a: "Pathanmajra and Jouramajra resigned from AAP on Sunday, November 1, while Singh announced his resignation from the Punjab Assembly on Monday, November 2." },
          { q: "Why did the Punjab AAP MLAs join the BJP?", a: "They cited unfulfilled 2022 promises, drugs, law and order, rising debt and governance failures." },
          { q: "Does this threaten the AAP government in Punjab?", a: "No: AAP won 92 of 117 seats in 2022, well above the majority mark of 59." },
          { q: "When are the next Punjab Assembly elections?", a: "Early 2027, with polling expected around February to March; the Assembly's term ends on March 16, 2027." }
        ],
      },
    ],
  },
  {
    slug: "phantom-blade-zero-4-million-copies-72-hours-steam-peak-november-2-2026",
    image: "https://gmedia.playstation.com/is/image/SIEPDC/phantom-blade-zero-store-artwork-01-en-26feb26?$1200px$",
    imageAlt: "Phantom Blade Zero official PlayStation store artwork",
    title: "Phantom Blade Zero Sells 4 Million Copies in 72 Hours as Steam Peak Passes 833,000",
    description:
      "Phantom Blade Zero 4 million copies sold in 72 hours, developer S-GAME announced on November 2, with a Steam peak of 833,921 players.",
    excerpt:
      "S-GAME's wuxia action RPG Phantom Blade Zero has sold over 4 million copies in its first 72 hours, with a record Steam peak of 833,921 concurrent players.",
    date: "2026-11-02",
    category: "Gaming",
    sections: [
      {
        type: "p",
        text: "Phantom Blade Zero 4 million copies sold in just 72 hours: developer S-GAME announced the milestone on November 2, 2026, confirming one of the biggest game launches of the year. The wuxia action RPG, available on PlayStation 5 and PC, also peaked at 833,921 concurrent players on Steam on November 1, putting it among the most-played games in Steam's history.",
      },
      {
        type: "p",
        text: "The announcement came from the game's official X account, which thanked players for what it called overwhelming support. Gadgets 360, Dot Esports, Insider Gaming, GameWatcher and GamingBolt all reported the same figure on November 2, and the game was trending in gaming coverage on the day, making this a genuine same-day gaming story rather than a routine sales update.",
      },
      {
        type: "h2",
        text: "Phantom Blade Zero 4 million copies: the launch numbers",
      },
      {
        type: "p",
        text: "The headline numbers are striking. Phantom Blade Zero sold over 4 million copies across all platforms in its first three days, according to S-GAME, without a platform-by-platform breakdown. On Steam alone, the game reached an all-time peak of 833,921 concurrent players on November 1, according to SteamDB charts cited by multiple outlets, after passing 700,000 concurrent players on launch day itself.",
      },
      {
        type: "p",
        text: "Review scores help explain the momentum. The game holds a Metacritic score of 88, with user scores of 8.8 on PC and 9.3 on PS5 reported by Inven Global, and IGN awarded it 9 out of 10, praising its smooth combat and memorable boss battles. GamingBolt noted that the Steam peak made it the 14th most-played title in the platform's history, and Gadgets 360 reported it was among the most played games on Steam right now, behind only the free-to-play multiplayer giant Counter-Strike 2.",
      },
      {
        type: "h2",
        text: "Phantom Blade Zero 4 million copies: what kind of game is it",
      },
      {
        type: "p",
        text: "Phantom Blade Zero is a wuxia action-adventure game inspired by Chinese martial arts, from Chinese studio S-GAME. Players follow Soul, an assassin on a quest to clear his name after being accused of his mentor's murder, through fast-paced combat and boss encounters in an ink-wash-inspired world. It is the studio's first major release outside mobile gaming, which makes the scale of the launch even more notable.",
      },
      {
        type: "p",
        text: "The game launched on PlayStation 5 and PC via Steam and the Epic Games Store, as a digital-only release, with the standard edition priced at $59.99. A physical PlayStation 5 edition is scheduled for 2027. The launch had been delayed from September 9 to late October so the studio could ship a stronger version rather than relying on post-launch patches, a decision that appears to have paid off in both reviews and sales.",
      },
      {
        type: "h2",
        text: "Phantom Blade Zero 4 million copies: why the launch was so big",
      },
      {
        type: "p",
        text: "The demand was visible before launch. The game had topped three million wishlists across PS5 and PC by September, and market research firm Alinea Analytics estimated it had sold around 850,000 digital copies ahead of launch, with about 73.8 percent on Steam and 26.2 percent on PS5. That estimate is not S-GAME's own figure, but it shows how much pre-release momentum the game carried.",
      },
      {
        type: "p",
        text: "Phantom Blade Zero also follows in the footsteps of other Chinese breakout hits. Game Science's Black Myth: Wukong sold ten million copies in its first four days in 2024 and became the second most-played title of all time on Steam, while Wuchang: Fallen Feathers was another major Chinese release in 2025. Phantom Blade Zero is not at that level yet, but a 4-million-copy opening weekend puts it firmly in the same conversation.",
      },
      {
        type: "h2",
        text: "Phantom Blade Zero 4 million copies: not a flawless launch",
      },
      {
        type: "p",
        text: "It has not been entirely smooth. GameWatcher reported that performance complaints had not disappeared entirely, and that the studio had acknowledged further bug fixes were needed. The developer also warned that Nvidia's 621.01 driver was causing performance instability, recommending affected players roll back to version 617.42 with a clean installation.",
      },
      {
        type: "p",
        text: "Alongside the sales announcement, S-GAME said it had recorded player feedback and was working on optimisations, with a further round of fixes for more obvious bugs planned for the near future. For a game selling at this pace, how quickly those fixes land will matter almost as much as the opening weekend.",
      },
      {
        type: "h2",
        text: "Phantom Blade Zero 4 million copies: what happens next",
      },
      {
        type: "list",
        items: [
          "Bug-fix updates: S-GAME's promised optimisation and bug-fix rounds, and whether performance complaints fade.",
          "The next sales milestone: whether the game pushes past 5 million copies and towards the 1-million concurrent player mark on Steam.",
          "The physical edition: the PlayStation 5 physical release scheduled for 2027, which could bring a second sales wave.",
          "Awards season: with a Metacritic score of 88 and an IGN 9 out of 10, the game is now firmly in year-end best-game conversations."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: Phantom Blade Zero sold over 4 million copies in 72 hours, peaked at 833,921 concurrent players on Steam, and earned some of the strongest reviews of 2026. It is one of the fastest-selling games of the year, and the launch weekend has made S-GAME a studio to watch.",
      },
      {
        type: "h2",
        text: "Phantom Blade Zero 4 million copies FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How many copies has Phantom Blade Zero sold?", a: "Over 4 million copies in its first 72 hours, according to developer S-GAME's announcement on November 2, 2026." },
          { q: "What is Phantom Blade Zero's Steam peak player count?", a: "833,921 concurrent players on November 1, 2026, according to SteamDB charts cited by multiple gaming outlets." },
          { q: "What platforms is Phantom Blade Zero on?", a: "PlayStation 5 and PC via Steam and the Epic Games Store, as a digital-only release for now, with a physical PS5 edition scheduled for 2027." },
          { q: "What is Phantom Blade Zero about?", a: "It is a wuxia action RPG where players follow Soul, an assassin trying to clear his name after being accused of his mentor's murder." },
          { q: "How much does Phantom Blade Zero cost?", a: "The standard edition costs $59.99 on PlayStation 5 and PC." }
        ],
      },
    ],
  },
  {
    slug: "delhi-police-protest-headquarters-transfers-acp-sho-november-2-2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Delhi_police_headquarters.JPG",
    imageAlt: "Delhi Police headquarters building (file photo)",
    title: "Delhi Police Protest: Cops Protest Outside Their Own Headquarters Over ACP, SHO Transfers",
    description:
      "Delhi Police protest on November 2: around 80 personnel gathered outside PHQ over the transfers of ACP Manasvi Vashistha and SHO Arun Kumar.",
    excerpt:
      "Around 80 Delhi Police personnel gathered outside police headquarters on November 2, 2026, demanding a meeting with the Commissioner over the transfers of two officers after the Shahdara police station scuffle.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "A Delhi Police protest took place outside the force's own headquarters on Monday, November 2, 2026, in an unusual show of dissent that quickly went viral. Around 80 to 100 personnel gathered outside Gate No. 1 of the Delhi Police Headquarters (PHQ), demanding that two transferred officers be reinstated and seeking a meeting with the Police Commissioner. Senior officers tried to persuade them to take their grievances inside, but the gathering continued for hours before the group went in for a meeting.",
      },
      {
        type: "h2",
        text: "Delhi Police protest: what happened outside headquarters today",
      },
      {
        type: "p",
        text: "The Indian Express put the gathering at around 80 personnel on the footpath outside Gate No. 1, while The Hindu put it at around 100, including women officers holding placards. They assembled around 8 am after messages circulated in Delhi Police WhatsApp groups calling on staff to gather to support the two officers and seek restoration of their previous postings.",
      },
      {
        type: "p",
        text: "Deputy Commissioner of Police (New Delhi) Sachin Sharma reached the spot soon after the personnel assembled and spoke to ACP Manasvi Vashistha, one of the transferred officers. Sharma urged the personnel not to stage a protest and reminded them of the discipline expected of a police force. He asked some of them to accompany him inside, but initially no one was ready to go in. The protesters demanded a Sampark Sabha, an interactive meeting with the Commissioner.",
      },
      {
        type: "p",
        text: "NewsBytes reported that around 11:30 am, Vashistha and the other personnel were eventually inside headquarters to meet the Commissioner. The Indian Express had earlier reported that no senior official had stepped out to address the gathering. The outcome of the meeting had not been confirmed in the reports checked.",
      },
      {
        type: "h2",
        text: "Delhi Police protest: which officers were transferred and why",
      },
      {
        type: "p",
        text: "The two officers at the centre of the Delhi Police protest are ACP Manasvi Vashistha and Inspector Arun Kumar. Vashistha was posted as the Sub-Divisional Police Officer of Gandhi Nagar in the Shahdara subdivision, while Kumar was the Station House Officer (SHO) of Shahdara police station. On October 28, 2026, Vashistha was transferred to the Special Police Unit for Women and Children (SPUWAC), and Kumar was moved to the Delhi Police Security Branch.",
      },
      {
        type: "p",
        text: "The transfers followed an incident at Shahdara police station on October 23, 2026, in which an advocate allegedly sustained a serious head injury during a scuffle between police officers and lawyers. That triggered an indefinite strike by Delhi's district court lawyers, who called it off on October 28 after the transfer orders were issued. Exactly what happened inside the station remains contested.",
      },
      {
        type: "h2",
        text: "Delhi Police protest: the claims on both sides of the Shahdara scuffle",
      },
      {
        type: "p",
        text: "The protest is rooted in a dispute over who was at fault on October 23. Lawyers accused the officers of assaulting an advocate, and India TV reported that they accused ACP Vashistha of brandishing a pistol. Those are allegations, not findings established in the reports checked.",
      },
      {
        type: "p",
        text: "On the police side, a sub-inspector at the gathering told reporters that a 30-minute video showed men in black coats assaulting the ACP and the SHO. That is the officer's account; the video has not been independently verified in the reporting checked. In a video circulated on October 31, ACP Vashistha thanked colleagues for their support and sought an open discussion with the Commissioner, with video conferencing for those who could not attend.",
      },
      {
        type: "p",
        text: "The protesters' demands were procedural as much as personal: a direct hearing with the Commissioner and clarity on the transfers.",
      },
      {
        type: "h2",
        text: "Delhi Police protest: why it matters beyond one transfer order",
      },
      {
        type: "p",
        text: "A protest by police personnel outside their own headquarters is rare, which is why this drew so much attention. Police grievances are normally raised through the chain of command, not on the street, so a placard gathering outside PHQ puts the leadership under public pressure to respond.",
      },
      {
        type: "p",
        text: "The timing added to the sensitivity. The Indian Express reported that district DCPs and unit heads had been asked to ensure their staff did not reach the PHQ for the proposed protest, yet the gathering still took place. It also comes a day before Lieutenant Governor Taranjit Singh Sandhu's scheduled interaction with Delhi Police personnel on November 3 at 4 pm at Utsav Sadan, Kingsway Camp.",
      },
      {
        type: "h2",
        text: "Delhi Police protest: what happens next",
      },
      {
        type: "list",
        items: [
          "The Commissioner meeting: whether the November 2 meeting produces any assurance on the transfers or a Sampark Sabha is the key next development.",
          "The November 3 interaction: Lieutenant Governor Taranjit Singh Sandhu is scheduled to meet Delhi Police personnel at Utsav Sadan, Kingsway Camp, at 4 pm.",
          "The Shahdara case: any inquiry findings on the October 23 scuffle will shape whether the transfers stand.",
          "Discipline questions: whether any action follows against personnel who protested outside headquarters remains open."
        ],
      },
      {
        type: "p",
        text: "For now, the verified picture is this: personnel protested outside PHQ on November 2 over two transfer orders, senior officers urged them inside, and by late morning the group had gone in to meet the Commissioner. What that meeting decides has not yet been reported, and any claim of reinstatement should be treated as unconfirmed until officially confirmed.",
      },
      {
        type: "h2",
        text: "Delhi Police protest FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Why did Delhi Police personnel protest on November 2, 2026?", a: "They were protesting the October 28 transfers of ACP Manasvi Vashistha and Inspector Arun Kumar, and demanding a Commissioner meeting and restoration of their postings." },
          { q: "What happened at Shahdara police station on October 23?", a: "A scuffle between police officers and lawyers allegedly left an advocate with a serious head injury. Lawyers struck indefinitely, calling it off on October 28 after the transfers." },
          { q: "Where did the Delhi Police protest take place?", a: "Outside Gate No. 1 of the Delhi Police Headquarters (PHQ), where around 80 to 100 personnel gathered from about 8 am on November 2." },
          { q: "Were the transferred officers reinstated?", a: "No reinstatement has been confirmed. Around 11:30 am the personnel went inside PHQ to meet the Commissioner, but the outcome had not been publicly reported." },
          { q: "What is a Sampark Sabha?", a: "It is an interactive meeting, in this case sought with the Police Commissioner, where personnel can raise concerns directly with senior leadership." }
        ],
      },
    ],
  },
  {
    slug: "delhi-guwahati-bullet-train-corridor-approved-route-travel-time",
    image: "https://www.punenow.com/wp-content/uploads/2026/02/Mumbai-Pune-Bullet-Train.jpg",
    imageAlt: "A modern high-speed bullet train at a station platform (representational image)",
    title: "Delhi-Guwahati Bullet Train Corridor Approved: Route, Stations and Travel Time Explained",
    description:
      "Delhi-Guwahati bullet train corridor approved: route via Agra, Lucknow, Varanasi and Patna, with Delhi to Guwahati in under 8 hours.",
    excerpt:
      "The Delhi-Guwahati bullet train corridor has been approved, linking Delhi with Guwahati via Agra, Kanpur, Lucknow, Varanasi, Patna and Siliguri in under eight hours.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Delhi-Guwahati bullet train corridor has been approved. Railway Minister Ashwini Vaishnaw announced on October 31, 2026, that Prime Minister Narendra Modi has approved the North Bullet Train Corridor, which will connect Delhi with Guwahati in Assam. The proposed route runs through Agra, Kanpur, Lucknow, Ayodhya, Varanasi, Prayagraj, Patna and Siliguri before reaching Guwahati, and Assam Chief Minister Himanta Biswa Sarma said the journey between Guwahati and Delhi could take less than eight hours. That would turn a trip that takes well over a day today into a single-day journey, and bring the Northeast onto India's high-speed rail network.",
      },
      {
        type: "h2",
        text: "Delhi-Guwahati bullet train route: cities list",
      },
      {
        type: "p",
        text: "The route covers ten major cities across Delhi, Uttar Pradesh, Bihar, West Bengal and Assam. It is built on two sections already in the national plan, Delhi to Varanasi and Varanasi to Siliguri through Patna. The minister named six main stations, and the full route also passes through Ayodhya and Prayagraj.",
      },
      {
        type: "list",
        items: [
          "Delhi",
          "Agra",
          "Kanpur",
          "Lucknow",
          "Ayodhya",
          "Varanasi",
          "Prayagraj",
          "Patna",
          "Siliguri",
          "Guwahati"
        ],
      },
      {
        type: "h2",
        text: "Delhi-Guwahati bullet train travel time: what the minister announced",
      },
      {
        type: "p",
        text: "The travel times shared by the Railway Minister are indicative figures for the proposed corridor, not a published timetable. The headline figure is Guwahati to Delhi in under eight hours, stated by Chief Minister Sarma. On the western section, Delhi to Agra would take under an hour and Delhi to Varanasi about three and a half hours.",
      },
      {
        type: "list",
        items: [
          "Delhi to Agra: 59 minutes.",
          "Delhi to Kanpur: 1 hour and 45 minutes.",
          "Delhi to Lucknow: 2 hours and 12 minutes.",
          "Varanasi to Lucknow: 1 hour and 21 minutes.",
          "Varanasi to Prayagraj: 33 minutes.",
          "Varanasi to Patna: around 1 hour.",
          "Varanasi to Delhi: about 3 hours and 33 minutes.",
          "Delhi to Siliguri: around 6 hours, as stated by the minister in June 2026.",
          "Guwahati to Delhi: under 8 hours, according to Assam Chief Minister Himanta Biswa Sarma."
        ],
      },
      {
        type: "h2",
        text: "Why the Guwahati extension matters for the Northeast",
      },
      {
        type: "p",
        text: "The Guwahati extension is the newest and most significant part of this announcement. The Northern bullet train corridor was originally planned to end at Siliguri, which would have left Assam and the rest of the Northeast off the high-speed map. Chief Minister Sarma said he wrote to the Railway Minister and met him in July 2026 to ask for the corridor to be extended into the Northeast, and that the minister saw merit in the proposal and approved the extension. In a post on November 1, Sarma thanked the Prime Minister and the Railway Minister and called the extension a pivotal moment for East India.",
      },
      {
        type: "p",
        text: "Sarma linked the faster link to Assam's economic plans, saying fast and affordable connectivity to Delhi would open up opportunities for businesses and livelihoods as Assam prepares to attract high-tech industries. A bullet train to Assam once seemed so far-fetched that it never even became a public demand, he said, but the proposed corridor is bringing that idea closer to reality.",
      },
      {
        type: "h2",
        text: "What the Delhi-Guwahati bullet train approval means, and what it does not",
      },
      {
        type: "p",
        text: "It is important to be clear about what has actually been announced. The approval was announced by the Railway Minister on October 31, while he was launching India's second Vande Bharat Sleeper train on the Varanasi-New Delhi route. The reports checked do not publish a construction cost, a start date, or an opening date, and no ticket prices have been fixed. Treat the journey times above as indicative figures for a proposed corridor, not a timetable, and do not expect booking to open any time soon.",
      },
      {
        type: "p",
        text: "What the minister did promise is affordability. Vaishnaw said bullet trains would not be limited to the rich, but would also be affordable for poor and middle-class families, with fares below airfares. He said work on the high-speed network is progressing rapidly under the Make in India spirit, and called the project a major gift for future generations.",
      },
      {
        type: "h2",
        text: "How the Delhi-Guwahati corridor fits India's bullet train plans",
      },
      {
        type: "p",
        text: "The Delhi-Guwahati corridor is the northern arm of a much larger high-speed rail programme. India's first bullet train corridor, the 508-km Mumbai-Ahmedabad line, is already under construction, and the government has targeted operationalising its priority section by August 2027. The Union Budget 2026-27 announced seven new bullet train corridors: Mumbai-Pune, Pune-Hyderabad, Hyderabad-Bengaluru, Hyderabad-Chennai, Chennai-Bengaluru, Delhi-Varanasi and Varanasi-Siliguri. The Delhi-Varanasi and Varanasi-Siliguri sections are exactly the backbone of the new Northern corridor, which now extends that backbone all the way to Guwahati.",
      },
      {
        type: "h2",
        text: "How to follow the Delhi-Guwahati bullet train project",
      },
      {
        type: "steps",
        items: [
          "Watch for official Railway Ministry and National High-Speed Rail Corporation announcements confirming the detailed project report and funding.",
          "Look out for station and alignment news for your city, since the main stations and the Ayodhya and Prayagraj stops will shape local options.",
          "Treat any unofficial booking link or ticket price with caution: no tickets are on sale, and no opening date has been announced.",
          "Compare future updates against the indicative times here, Delhi to Agra in 59 minutes and Guwahati to Delhi in under eight hours."
        ],
      },
      {
        type: "h2",
        text: "Delhi-Guwahati bullet train FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Which cities are on the Delhi-Guwahati bullet train route?", a: "Delhi, Agra, Kanpur, Lucknow, Ayodhya, Varanasi, Prayagraj, Patna, Siliguri and Guwahati, per Railway Minister Ashwini Vaishnaw." },
          { q: "How long will the Delhi to Guwahati bullet train take?", a: "Chief Minister Himanta Biswa Sarma has said Guwahati to Delhi could take less than eight hours. Delhi to Agra is put at 59 minutes, Delhi to Varanasi at about three and a half hours." },
          { q: "When will the Delhi-Guwahati bullet train open?", a: "No opening date has been announced. The corridor has been approved, but no construction start date or commissioning date has been published in the reports checked." },
          { q: "How much will Delhi-Guwahati bullet train tickets cost?", a: "No fares have been fixed. The Railway Minister has said fares would stay below airfares and that bullet trains would be affordable for poor and middle-class families." },
          { q: "Was Guwahati always part of the bullet train plan?", a: "No. It was originally planned to end at Siliguri, and was extended to Guwahati after Chief Minister Himanta Biswa Sarma requested it in July 2026." }
        ],
      },
    ],
  },
  {
    slug: "jhunjhunu-electrocution-8-workers-killed-rajasthan-november-2-2026",
    image: "https://imgs.etvbharat.com/etvbharat/prod-images/02-11-2026/1200-675-28016904-thumbnail-16x9-ht-current-aspera.jpg",
    imageAlt: "High-tension power lines, like the overhead line a road-construction machine touched in Jhunjhunu, Rajasthan",
    title: "Jhunjhunu Electrocution: 8 Workers Killed in Rajasthan as Machine Touches High-Tension Wire",
    description:
      "The Jhunjhunu electrocution killed eight workers on a road project in Rajasthan on November 2, 2026, after a gravel-mixing machine hit a high-tension line.",
    excerpt:
      "Eight workers were electrocuted to death in Rajasthan's Jhunjhunu district on November 2, 2026, after a gravel-mixing machine came into contact with an overhead high-tension power line.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Jhunjhunu electrocution has killed eight workers in Rajasthan on November 2, 2026, after a gravel-mixing machine at a road construction site came into contact with an overhead high-tension power line. Police said the accident happened in Chhapoli village, under the Udaipurwati police station area of Jhunjhunu district, on Monday, and the news was first reported by national outlets in the early afternoon. The deaths have triggered grief in the village and fresh questions about safety at small, community-led construction works carried out close to live power lines.",
      },
      {
        type: "h2",
        text: "Jhunjhunu electrocution: what happened in Chhapoli village",
      },
      {
        type: "p",
        text: "According to police, the workers were engaged in a road construction project in Chhapoli village, near Kadam Kund, when the machine being used to mix gravel touched an overhead high-tension line. Udaipurwati station house officer Rampal said the machine came into contact with the line, causing electric current to pass through the equipment and electrocuting the workers operating around it. ETV Bharat reports that the line carried 11,000 volts, and that the current instantly electrified the aggregate-mixing machinery. The exact sequence of events that brought the machine into contact with the wire is still being established, police said, and authorities are assessing the circumstances and the safety arrangements at the site.",
      },
      {
        type: "list",
        items: [
          "Place: Chhapoli village, near Kadam Kund, under Udaipurwati police station, Jhunjhunu district, Rajasthan.",
          "Work: a community-led road construction project, with local residents building the road.",
          "Equipment: a gravel-mixing, or aggregate-mixing, machine used at the site.",
          "Cause reported: the machine came into contact with an overhead high-tension power line, reported as an 11,000-volt line.",
          "Deaths: at least eight workers killed, according to police, as reported by PTI-based outlets."
        ],
      },
      {
        type: "h2",
        text: "Eight killed, three critically injured: the casualty figures so far",
      },
      {
        type: "p",
        text: "Police have confirmed eight deaths in the Jhunjhunu electrocution, a figure carried by multiple outlets reporting PTI inputs, including India TV, The New Indian Express and Orissa Post. ETV Bharat additionally reports that three other workers were critically injured and were taken to hospital for treatment, with District Collector Arun Garg saying the injured were undergoing treatment and their condition was critical. Because the first reports are still being updated, with ETV Bharat itself marking its story as developing, the casualty picture should be read as eight confirmed deaths plus critically injured workers under treatment, rather than as a final, fully reconciled toll. No victims have been named in the reports published so far.",
      },
      {
        type: "h2",
        text: "Rescue, response and condolences after the Jhunjhunu accident",
      },
      {
        type: "p",
        text: "Local residents reacted first. Reports say the accident triggered panic in the village, and locals immediately began rescue efforts and helped transport the injured to hospital. District Collector Arun Garg said officials received information about the accident over the telephone and were heading to the site, adding that the initial information indicated the road was being constructed by local residents and that the machinery in use had come into contact with the overhead power line. Local MLA Bhagwanaram Saini expressed grief over the deaths and said he was also on his way to the accident site. Rajasthan Energy Minister Heeralal Nagar also expressed condolences and described the incident as tragic.",
      },
      {
        type: "h2",
        text: "Why a road machine near a power line is so dangerous",
      },
      {
        type: "p",
        text: "The Jhunjhunu accident underlines a risk that safety experts warn about again and again: tall or metal construction machinery working directly beneath overhead power lines. A gravel-mixing machine, like cranes, concrete mixers and other site equipment, can conduct electricity through its metal body the moment it touches or comes very close to a live high-voltage conductor. Workers standing on the ground and touching the machine, or working around it, can then be electrocuted in seconds, with no time to react. That is why construction guidelines require checking the height and position of overhead lines before work begins, keeping machinery at a safe distance, and stopping work or seeking a temporary shutdown where a line passes too close to the site. Whether any of those precautions were in place at Chhapoli, and who was responsible for checking them, is part of what the authorities are now assessing.",
      },
      {
        type: "h2",
        text: "What happens next in the Jhunjhunu electrocution investigation",
      },
      {
        type: "p",
        text: "Police have said the exact circumstances leading to the accident are yet to be established, so the next steps will be to record statements from survivors and witnesses, examine the machine and the power line, and determine how the work was organised. The key questions are straightforward: how close was the overhead line to the work area, who knew about the risk, and whether any safety clearance or supervision was in place for a community-led project using heavy machinery. The condition of the three critically injured workers will also be watched closely, since any change there would change the final toll. For now, the confirmed facts are the eight deaths, the village and the machine involved, and the police account that current passed through the equipment after it touched the high-tension line.",
      },
      {
        type: "h2",
        text: "Jhunjhunu electrocution FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How many workers died in the Jhunjhunu electrocution?", a: "At least eight workers were killed, according to police. ETV Bharat additionally reports three other workers critically injured and under treatment in hospital." },
          { q: "Where did the Jhunjhunu accident happen?", a: "In Chhapoli village, near Kadam Kund, under the Udaipurwati police station area of Jhunjhunu district in Rajasthan, at a road construction site." },
          { q: "What caused the Jhunjhunu electrocution?", a: "Police say a gravel-mixing machine came into contact with an overhead high-tension power line, sending current through the equipment. ETV Bharat reports the line carried 11,000 volts. The exact circumstances are still being established." },
          { q: "Was the road work a government project?", a: "Reports describe it as a community-led road construction project, with local residents building the road. Authorities are assessing the safety arrangements at the site." },
          { q: "Who has responded to the Jhunjhunu deaths?", a: "District Collector Arun Garg said officials were heading to the site, local MLA Bhagwanaram Saini expressed grief, and Energy Minister Heeralal Nagar described the incident as tragic." }
        ],
      },
    ],
  },
  {
    slug: "rohtang-pass-maggi-seller-15000-daily-off-season-viral-november-2-2026",
    image: "https://www.plattershare.com/storage/2025/05/Street-Style-Tadka-Maggi.webp",
    imageAlt: "A bowl of street-style Maggi noodles, like the plates sold at the viral Rohtang Pass stall",
    title: "Rohtang Pass Maggi Seller Racks Up Rs 15,000 a Day in Off-Season Sales, Viral Video Shows",
    description:
      "A Rohtang Pass Maggi seller's off-season sales of Rs 14,000-15,000 a day have gone viral after creator Harsh Chauhan shared the stall's daily numbers.",
    excerpt:
      "A Maggi seller at Himachal Pradesh's Rohtang Pass has gone viral for selling 60-70 plates of Maggi and around 200 cups of tea a day, even in the off-season.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Rohtang Pass Maggi seller is the internet's favourite small-business story today. A roadside vendor at the high Himachal Pradesh mountain pass has gone viral after content creator Harsh Chauhan asked him a simple question during the off-season: how much do you actually sell in a day? The answer, around 60 to 70 plates of Maggi and nearly 200 cups of tea every single day, has travelled across Instagram and news sites on November 2, 2026, turning a tiny stall at a famous mountain pass into a talking point about small businesses.",
      },
      {
        type: "h2",
        text: "Rohtang Pass Maggi seller: the viral video and the daily numbers",
      },
      {
        type: "p",
        text: "The story came to light when Chauhan, who posts as @harshreturns, stopped at the stall during a visit to Rohtang Pass and got curious about how the vendor manages when tourist footfall is low. In the video, he asks the seller how much he earns. The vendor's first answer is modest: it is the off-season, so there is not much earning at this time. Pressed for the actual figures, though, he shares numbers that surprised Chauhan and everyone watching. The vendor says he sells around 60 to 70 plates of Maggi and approximately 200 cups of tea every day, plus a few orders for eggs, though demand for eggs is considerably lower than for Maggi and tea.",
      },
      {
        type: "list",
        items: [
          "Maggi: 60-70 plates a day, priced at Rs 100 per plate.",
          "Tea: around 200 cups a day, priced at Rs 40 per cup.",
          "Extras: a few egg orders a day, on top of the Maggi and tea sales.",
          "Estimated daily turnover: Rs 14,000 to Rs 15,000, before any costs are deducted."
        ],
      },
      {
        type: "p",
        text: "The maths behind the headline figure is simple, and Chauhan lays it out in the caption of his Instagram video. Sixty plates of Maggi at Rs 100 each come to Rs 6,000, and seventy plates come to Rs 7,000. Two hundred cups of tea at Rs 40 each add Rs 8,000. Put together, that is Rs 14,000 to Rs 15,000 a day in gross sales, and that is before the small number of egg orders is counted. Chauhan's own caption puts it plainly: he and his team went to Rohtang Pass and asked a Maggi seller about his turnover during the off-season, and the seller's own figures produced an estimated daily sales total of around Rs 14,000 to Rs 15,000 per day.",
      },
      {
        type: "h2",
        text: "Rs 14,000-15,000 is turnover, not profit: the costs behind the Rohtang Pass stall",
      },
      {
        type: "p",
        text: "The most important detail in this story is also the easiest to miss: Rs 14,000 to Rs 15,000 is the stall's estimated daily turnover, not the vendor's take-home profit. Every outlet carrying the story makes the same distinction, and so do the commenters. Ingredients have to be bought, gas and equipment maintained, and supplies hauled up to a high-altitude pass where the weather is harsh and the work is physically demanding. Several users in the comments made exactly this point, noting that transporting goods to such a remote location costs extra and that the real income, after expenses, would look very different from the gross figure.",
      },
      {
        type: "p",
        text: "There is also a verification caveat worth stating plainly. The figures come from the vendor himself, as reported by Chauhan in his video, and the news outlets covering the story note that the claims have not been independently verified. That does not make the story false, but the Rs 14,000 to Rs 15,000 figure should be read as the vendor's own account of his daily sales, not as an audited business record.",
      },
      {
        type: "h2",
        text: "Why the Rohtang Pass Maggi seller video struck a chord",
      },
      {
        type: "p",
        text: "Part of the appeal is the setting. A hot plate of Maggi at a cold mountain pass is a ritual for generations of Indian travellers, and Rohtang Pass, the high crossing above Manali, is one of the places where that ritual is most famous. Part of it is the off-season twist: these are not peak-summer numbers with crowds everywhere, but the sales of a quiet period, when the vendor himself says business is slow. And part of it is Chauhan's closing line, which has become the story's tagline: so, this is the thing, no business is small.",
      },
      {
        type: "h2",
        text: "What the off-season numbers suggest about peak season",
      },
      {
        type: "p",
        text: "Chauhan himself points to the obvious next question. In his caption he writes that this is just the off-season, and asks viewers to imagine the turnover during peak tourist season, when Rohtang Pass fills with travellers heading between Manali and the high valleys beyond. No peak-season figure has been shared, so any number would be a guess, but the logic is clear: if a quiet-period day already produces 60 to 70 plates and 200 cups of tea, a busy summer day at one of Himachal Pradesh's most visited passes would be expected to produce considerably more.",
      },
      {
        type: "h2",
        text: "Rohtang Pass Maggi seller FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How much does the Rohtang Pass Maggi seller make a day?", a: "His estimated daily turnover is Rs 14,000 to Rs 15,000 in the off-season. That is gross sales, not profit, since ingredient, transport and stall costs still have to be deducted." },
          { q: "How many plates of Maggi and cups of tea does he sell daily?", a: "Around 60 to 70 plates of Maggi at Rs 100 per plate, and approximately 200 cups of tea at Rs 40 per cup, plus a few egg orders." },
          { q: "Who shared the viral Rohtang Pass Maggi seller video?", a: "Content creator Harsh Chauhan, who posts as @harshreturns, shared the video of his conversation with the vendor on Instagram." },
          { q: "Where is Rohtang Pass?", a: "Rohtang Pass is a high mountain pass in Himachal Pradesh, above Manali, and a popular stop for tourists travelling to the high valleys beyond." },
          { q: "Are the Rs 15,000-a-day figures verified?", a: "The figures are the vendor's own account, as shared in Chauhan's video. News outlets covering the story note the claims have not been independently verified." }
        ],
      },
    ],
  },
  {
    slug: "chicken-leg-piece-ulhas-kamthe-death-rumours-alive-november-2-2026",
    image: "https://images.loksattaimg.com/2023/06/Ulhaskamathe9.jpeg",
    imageAlt: "Food influencer Ulhas Kamthe, known as the Chicken Leg Piece guy, who has dismissed rumours of his death",
    title: "Chicken Leg Piece Ulhas Kamthe Death Rumours Debunked: 'I Am Alive', Says Influencer",
    description:
      "Ulhas Kamthe death rumours are false: the Chicken Leg Piece influencer has posted videos confirming he is alive and well after a panic attack at a premiere.",
    excerpt:
      "Food influencer Ulhas Kamthe, famous as the Chicken Leg Piece guy, has dismissed viral rumours claiming he died, confirming he is alive and well.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Ulhas Kamthe death rumours spreading across social media on November 2, 2026 are false. The food influencer known to millions as the Chicken Leg Piece guy has posted videos confirming he is alive, healthy and doing well, after an undated hospital video was shared online with claims that he had died of a heart attack. The real story is far less alarming: Kamthe suffered a panic attack during a horror film premiere, was checked at a Mumbai hospital, and was discharged within about an hour. His own message to fans was blunt: he is absolutely fine, and he is alive.",
      },
      {
        type: "h2",
        text: "Ulhas Kamthe death rumours: how an old hospital video sparked false claims",
      },
      {
        type: "p",
        text: "The confusion began when footage of Kamthe being taken to hospital started circulating again on social media, this time without a date, a caption or any explanation of what had happened. Stripped of context, the clip was paired with sensational claims that the influencer had suffered a fatal heart attack, and the story spread quickly across Instagram and YouTube, leaving fans panicked. The hospital clip itself was real, but the story attached to it was not. It showed a genuine medical visit from an earlier event, not a new emergency, and certainly not a death. Kamthe himself later noted that the false news had been coming for the last two days, which shows how long an out-of-context clip can keep circulating before the person at the centre of it manages to correct the record.",
      },
      {
        type: "h2",
        text: "What really happened at the Jhaad Phoonk premiere",
      },
      {
        type: "p",
        text: "The hospital visit dates back to the premiere screening of the horror film Jhaad Phoonk in Mumbai, an event also spelled Zaad-Phoonk in some reports. Kamthe had been reluctant to attend in the first place because he does not handle horror films well, but he agreed to come after a member of the film's team personally invited him. During one of the film's most terrifying scenes, he suffered a sudden anxiety-induced panic attack and fainted in his seat. Members of the film's team, including director Rajan Ramgopal Varma, stepped in immediately and rushed him to Kokilaben Hospital in Mumbai. Emergency doctors examined him, identified the episode as a panic attack, and discharged him after about an hour once his vital signs had stabilised. In the clarification video, Kamthe appeared alongside members of the film's crew to explain what had taken place and to put the death rumours to rest.",
      },
      {
        type: "h2",
        text: "'Abhi toh main zinda hoon': Kamthe's own response to the death rumours",
      },
      {
        type: "p",
        text: "Kamthe addressed the rumours directly in a video shared on his Instagram, telling followers that he is absolutely fit and normal and thanking them for their love and concern. His words in the video were simple and memorable: abhi toh main zinda hoon, meaning he is still alive. He thanked the people who had called and messaged him after seeing the footage, and said he was deeply grateful for how much they cared. He has since also shared further videos, including clips from a restaurant opening, showing him out and about and in good health. The message across all of them is consistent: the death reports were wrong, and he is doing completely fine.",
      },
      {
        type: "h2",
        text: "Panic attack vs heart attack: why the two get confused",
      },
      {
        type: "p",
        text: "One reason the false story travelled so fast is that a panic attack can look terrifyingly like a cardiac emergency. A panic attack triggers a sudden wave of intense fear, flooding the body with adrenaline even when there is no physical danger, and it can bring a pounding heart, cold sweats, dizziness, shaking, shortness of breath, nausea and sharp chest tightness. A heart attack, by contrast, is a life-threatening emergency caused by blocked blood flow to the heart muscle, and its warning signs, chest pressure, breathlessness, nausea and a rapid pulse, overlap heavily with those of a panic attack. Health experts stress that the two should never be confused by guesswork: persistent chest pain, or discomfort spreading to the arm, jaw or back, always demands immediate emergency medical care, whatever the suspected cause.",
      },
      {
        type: "h2",
        text: "Who is Ulhas Kamthe, the Chicken Leg Piece guy?",
      },
      {
        type: "p",
        text: "Kamthe is a food influencer and content creator from Mumbai, Maharashtra, who built a massive online following through his distinct food videos, particularly clips of him enthusiastically eating large platters of chicken and mutton. His energetic style and his repeated spotlight on chicken leg pieces turned him into an instantly recognisable personality across social media, and his catchphrase made him famous far beyond food-video circles. Some reports spell his surname Kamte. That familiarity is exactly why the false death reports generated such an immediate reaction: when a face millions of people recognise appears in a hospital video, the worst interpretation spreads before the facts can catch up. In the end, this story had a simple, relief-filled resolution. Kamthe had a panic attack at a movie, got checked out by doctors, went home, and is doing completely fine.",
      },
      {
        type: "h2",
        text: "Ulhas Kamthe death rumours FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Is Ulhas Kamthe dead?", a: "No. Ulhas Kamthe is alive and well. He has posted videos confirming this himself, saying he is absolutely fit and normal." },
          { q: "What actually happened to Ulhas Kamthe at the film premiere?", a: "He suffered an anxiety-induced panic attack during a scary scene at the Jhaad Phoonk premiere in Mumbai, fainted, was taken to Kokilaben Hospital, and was discharged after about an hour." },
          { q: "Did Ulhas Kamthe have a heart attack?", a: "No. Doctors identified the episode as a panic attack, not a heart attack. The heart-attack claim came from social media posts sharing the hospital video without context." },
          { q: "What did Ulhas Kamthe say about the death rumours?", a: "In his video he said he is absolutely fine and alive, thanked fans for their concern, and said he was grateful for their love." },
          { q: "What is Jhaad Phoonk?", a: "Jhaad Phoonk, also spelled Zaad-Phoonk in some reports, is a Hindi horror film whose premiere Kamthe attended. The film released on JioHotstar on October 30, 2026." }
        ],
      },
    ],
  },
  {
    slug: "strait-of-hormuz-tanker-explosions-oil-prices-november-2-2026",
    image: "https://images.investinglive.com/images/Strait%20of%20Hormuz_id_6881abc9-fc01-4219-b86c-567046ca794c_size975.jpg",
    imageAlt: "An oil tanker transiting the Strait of Hormuz, the strategic waterway at the centre of the November 2026 tanker explosions",
    title: "Strait of Hormuz Tanker Explosions: Oil Above $110 as Trump Threatens Iran and Two-Day Reopening Plan Emerges",
    description: "Strait of Hormuz tanker explosions: Iran claims two tankers hit mines as oil trades above $110 and a two-day reopening plan is floated.",
    excerpt: "Iran claims two oil tankers, including a supertanker, exploded after hitting mines in the Strait of Hormuz, as oil trades above $110 a barrel and a two-day plan to reopen the waterway is floated.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Strait of Hormuz tanker explosions are the world story to watch on Monday, November 2, 2026. Iran's Islamic Revolutionary Guard Corps (IRGC) Navy claims two oil tankers, including a supertanker, exploded after striking naval mines while sailing what it calls an unauthorised route through the Strait of Hormuz, one of the world's most important oil export routes. The claim, reported late on Sunday, November 1, has pushed the waterway back to the centre of a war that began in February 2026, sent oil prices above $110 a barrel, and drawn a fresh military threat from United States President Donald Trump. What actually happened to the tankers is still not independently confirmed."
      },
      {
        type: "h2",
        text: "What Iran claims happened in the Strait of Hormuz"
      },
      {
        type: "p",
        text: "According to Press TV, citing a statement from the IRGC Navy's Public Relations Office, the two tankers were transiting the Strait of Hormuz through a route Iran had not authorised. The IRGC Navy alleged that both vessels had switched off their navigation and identification systems and ignored repeated warnings against using restricted routes. One of the tankers, a supertanker, suffered a powerful explosion and was engulfed in flames, the statement said, and both vessels were brought to a halt. Iran's account is a claim, not an independently verified fact: no vessel names, nationalities, casualty figures or damage details have been confirmed by outside sources. Iran has controlled passage through the Strait since February 28, 2026, when it barred safe passage for vessels belonging to or affiliated with Israel and the United States after their joint strikes on Iranian territory, and it insists vessels may only use northern lanes it approves, while the United States pushes vessels toward lanes on the southern side of the Strait."
      },
      {
        type: "h2",
        text: "A second, separate report: the UKMTO projectile warning"
      },
      {
        type: "p",
        text: "Separately, the United Kingdom Maritime Trade Operations (UKMTO) centre reported an incident in the Strait of Hormuz on November 1. In a warning issued at approximately 1509 UTC, UKMTO said the master of a merchant vessel had relayed a Mayday call on VHF channel 16 stating that another vessel had been struck by an unknown projectile. UKMTO advised vessels transiting the area to exercise caution and report suspicious activity while authorities investigate. It has not been confirmed whether the projectile report and the IRGC's mine claim describe the same incident or two different ones, and that distinction is important: a mine strike and a projectile strike are different kinds of attack with different implications. Saudi Arabia and the United Arab Emirates have also condemned the targeting of the Al Mayeda liquefied natural gas (LNG) carrier, owned by Qatar Gas Transport Company, in the waters of the Arabian Gulf, with Saudi Arabia's Foreign Ministry saying it rejected violations threatening maritime navigation and global energy supplies and expressing solidarity with Qatar."
      },
      {
        type: "h2",
        text: "Why the Strait of Hormuz tanker explosions matter for oil prices"
      },
      {
        type: "p",
        text: "The Strait of Hormuz is the narrow channel between Iran and Oman through which a huge share of the world's seaborne oil and gas must pass. On Monday, Brent crude traded around $110 to $112 a barrel and United States West Texas Intermediate crude traded around $102 a barrel, after Brent ended October at its highest level in six months. Prices actually eased by more than 1 percent on Monday, with Brent down $1.59 to $111.84 a barrel and WTI down $1.56 to $102.56 a barrel by 0011 GMT, as traders reacted to the Doha talks rather than to the explosions alone. Tim Waterer, chief market analyst at KCM Trade, told Reuters the move was a technical pullback after strong gains, with hopes of diplomatic progress and the absence of any meaningful military escalation over the weekend taking some of the immediate heat out of prices. He also warned rhetoric around Iran could push Brent toward $120 after the November 3 midterm elections."
      },
      {
        type: "h2",
        text: "Trump's warning and the two-day plan to reopen the Strait"
      },
      {
        type: "p",
        text: "President Trump has renewed threats of military action against Iran, saying Washington may eventually have to give Tehran what he called the hammer, as Tehran warned that any new war could last longer than the last one. Iran's Supreme Leader, Ayatollah Mojtaba Khamenei, issued a statement on Saturday ordering the armed forces to be prepared to respond to any attacks, warning of an immediate military response without geographical limits. Trump has said the United States will not launch new attacks on Iran before the midterm vote, and that talks with Tehran have been productive, though he has not ruled out further military action afterwards. United States Secretary of State Marco Rubio said on Saturday that Trump had not decided whether to launch new strikes, but would prefer to resolve the conflict diplomatically. Meanwhile, Iranian Foreign Minister Abbas Araghchi said Qatar-mediated talks had produced a two-day plan: on the first day, the United States would implement a set of measures, and on the second day, the Strait of Hormuz would reopen and transit would return to its previous state. The plan is a proposal, not an agreed deal: reported Iranian conditions include new shipping routes, unfrozen funds, an end to regional wars including in Lebanon, lifting the maritime blockade, exemptions for Iranian oil exports, and removing new post-Islamabad Memorandum sanctions. Washington has not publicly accepted it, and the third-day Doha talks have reached no conclusion on the wider war."
      },
      {
        type: "h2",
        text: "Strait of Hormuz tanker explosions: what is confirmed and what is not"
      },
      {
        type: "list",
        items: [
          "Claimed, not confirmed: The IRGC Navy claims two tankers, including a supertanker, exploded after hitting naval mines on an unauthorised route in the Strait of Hormuz, with their navigation systems switched off. No vessel names, flags, casualty figures or damage details have been independently confirmed.",
          "Confirmed: UKMTO issued a warning on November 1 at about 1509 UTC about an incident in the Strait, relaying a Mayday report that another vessel had been struck by an unknown projectile. Whether this is the same incident as the IRGC claim is not confirmed.",
          "Confirmed: Saudi Arabia and the UAE condemned the targeting of the Qatari LNG carrier Al Mayeda in the Arabian Gulf, and Saudi Arabia called for urgent international action to ensure maritime security.",
          "Confirmed: Brent crude traded above $110 a barrel and WTI above $101 a barrel on Monday, November 2, easing more than 1 percent as Qatar-mediated talks continued, after Brent ended October at a six-month high.",
          "Confirmed: Iranian and Qatari officials held a third straight day of talks in Doha aimed at ending the US-Israeli war on Iran, and Iran has floated a two-day plan to reopen the Strait. The plan is a proposal, not an agreed deal.",
          "Not confirmed: The cause of the explosions, the identity and condition of the tankers and their crews, and whether any oil spill or environmental damage occurred. US Central Command has previously denied Iranian accounts of tankers hitting mines, and the two sides have long given conflicting narratives of incidents in the Strait."
        ]
      },
      {
        type: "h2",
        text: "What happens next in the Strait of Hormuz"
      },
      {
        type: "p",
        text: "Three things will decide whether this story escalates or eases. First, whether independent sources identify the tankers, confirm casualties and establish what actually hit them, mine or projectile, because that evidence will settle which account is credible. Second, whether ships actually start moving through the Strait without incident, which would do more to calm oil markets than any statement: talk moves prices for a day or two, but tankers moving safely would move them for months. Third, what happens after the United States midterm elections on November 3, when Trump's pledge not to launch new attacks before the vote expires and his warning about giving Tehran the hammer will be tested. This story is still developing, and updates on vessel identification, the Doha talks and oil prices will follow as they are confirmed."
      },
      {
        type: "h2",
        text: "Strait of Hormuz tanker explosions FAQs"
      },
      {
        type: "faq",
        items: [
          {
            q: "What happened in the Strait of Hormuz tanker explosions?",
            a: "Iran's IRGC Navy claims two oil tankers, including a supertanker, exploded after hitting naval mines on an unauthorised route through the Strait of Hormuz on November 1, 2026. The claim is not independently confirmed, and UKMTO separately reported a vessel struck by an unknown projectile."
          },
          {
            q: "How have oil prices reacted to the Hormuz tanker explosions?",
            a: "Brent crude traded around $110 to $112 a barrel and US crude around $102 a barrel on Monday, November 2, easing more than 1 percent as Qatar-mediated talks continued, after Brent ended October at a six-month high."
          },
          {
            q: "What is the two-day plan to reopen the Strait of Hormuz?",
            a: "Iranian Foreign Minister Abbas Araghchi said Qatar-mediated talks produced a two-day plan: the US implements a set of measures on day one, and the Strait reopens on day two. It is a proposal, not an agreed deal, and Washington has not publicly accepted it."
          },
          {
            q: "Is the Strait of Hormuz closed?",
            a: "No confirmed closure has been reported. Iran restricts passage for Israel- and US-affiliated vessels and insists on its approved northern lanes, while the US pushes southern lanes, and shipping continues under severe threat warnings and rising insurance costs."
          },
          {
            q: "What did Trump say about Iran after the tanker explosions?",
            a: "President Trump renewed threats of military action, saying Washington may eventually have to give Tehran the hammer, while also saying the US will not launch new attacks before the November 3 midterm elections."
          }
        ]
      }
    ]
  },
  {
    slug: "florida-learjet-crash-palm-beach-9-killed-november-1-2026",
    image: "https://img.mathrubhumi.com/view/acePublic/alias/contentid/1uu9x9ji7s3askm6ioy/1/florida-small-plane-crash.webp?f=3%3A2&q=0.75&w=900",
    imageAlt: "Emergency responders at the Florida Learjet crash site in Palm Beach County, where a private jet crashed on November 1, 2026",
    title: "Florida Learjet Crash: All 9 Killed as Bahamas-Bound Jet Nosedives Into Palm Beach County",
    description: "Florida Learjet crash: all 9 aboard a Bahamas-bound Learjet 60 died after it nosedived into Palm Beach County on November 1, officials confirm.",
    excerpt: "All nine people aboard a Bahamas-bound Learjet 60 were killed when the jet nosedived into a Palm Beach County neighbourhood on November 1, 2026.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "The Florida Learjet crash is the breaking story dominating news feeds this morning. All nine people aboard a private Learjet 60 were killed on Sunday, November 1, 2026, when the Bahamas-bound jet nosedived into Palm Beach County, Florida, and erupted into a fireball. US Transportation Secretary Sean Duffy confirmed there were no survivors, calling the disaster a “horrific tragedy”. Dashcam and bystander videos of the plunge have since gone viral."
      },
      {
        type: "h2",
        text: "What happened in the Florida Learjet crash"
      },
      {
        type: "p",
        text: "According to the Federal Aviation Administration (FAA), the Learjet 60 had departed Austin-Bergstrom International Airport in Texas and was headed to North Eleuthera Airport in the Bahamas. The aircraft, tail number N722BD, crashed at about 12:50 pm Eastern Time on Sunday near Military Trail and 10th Avenue North, in the Cresthaven area near Greenacres, 7 miles southwest of West Palm Beach. Bystander video captured the jet plunging from the sky before exploding near the roadway. The impact left a large, fiery crater in the pavement as thick black smoke engulfed the area. The jet narrowly missed nearby homes, coming down feet from houses and inches from passing vehicles. The Palm Beach County Sheriff’s Office closed roads in both directions and firefighters rushed to the scene."
      },
      {
        type: "h2",
        text: "The final minutes: icing, turbulence and a mayday call"
      },
      {
        type: "p",
        text: "Air traffic control recordings captured by LiveATC.net, reported by CNN and other outlets, reveal a flight in trouble in its final minutes. At 35,000 feet, the pilot reported light, clear ice, moderate turbulence bouncing the plane by up to 700 feet, and an outside temperature of minus 47 degrees Celsius. After reporting precipitation and requesting to climb 2,000 feet, the pilot declared an emergency. “We’re descending 8,000 – mayday, mayday – we’re descending 10,000 feet per minute,” the pilot radioed. Moments later: “We are in an overspeed condition descending 20,000 feet per minute.” Reports put the descent rate as high as 30,000 feet per minute, far beyond the aircraft’s design limits, and CNN cites ADS-B Exchange data showing a 27,000-foot descent in one minute before tracking cut off. The pilot banked sharply right before the jet crashed steeply into the ground, with a final acknowledgement: “We’re going to crash into the ground.” There were scattered storms in the area, and the plane had passed through a stronger storm cell minutes before descending. It is not yet clear whether the weather contributed, and investigators have not said what caused the crash."
      },
      {
        type: "h2",
        text: "Florida Learjet crash: what is confirmed and what is not"
      },
      {
        type: "list",
        items: [
          "Confirmed: All nine people aboard the Learjet 60 were killed, US Transportation Secretary Sean Duffy confirmed.",
          "Confirmed: The jet departed Austin-Bergstrom International Airport for the Bahamas and crashed at about 12:50 pm Eastern Time on November 1 near Military Trail and 10th Avenue North in Palm Beach County. Its tail number was N722BD.",
          "Confirmed: The FAA is sending a team to support the NTSB, which is leading the investigation. Investigators were due at the site on Sunday and Monday, with a news conference planned for Monday.",
          "Confirmed: No deaths or injuries on the ground were immediately reported, Governor Ron DeSantis said, but about 600 people needed shelter because the crash scene blocks a nearby mobile home park entrance.",
          "Not confirmed: The cause. Officials have not said what made the jet go down, and it is not established that icing or storms caused it.",
          "Not confirmed: The identities of the nine aboard, how many were passengers and crew, and the operator. Officials had not released those details.",
          "Not confirmed: Whether a flight recorder survived the explosion, or whether a cockpit voice recorder was on board. CNN notes this was unclear."
        ]
      },
      {
        type: "h2",
        text: "The toll on the ground: 600 people evacuated"
      },
      {
        type: "p",
        text: "No deaths or injuries on the ground were immediately reported, but the crash upended life for hundreds nearby. About 600 residents of a mobile home community needed shelter because the crash scene blocks the entrance to the park and they could not stay there, with residents sent to two shelters while the site is investigated. All northbound and southbound lanes of Military Trail were closed until further notice. Governor DeSantis, who visited the scene, called it a “cataclysmic plane crash” and said: “It looked like a missile going down and left a big crater on the side of the road.” A local resident, Andrew Mannino, told CNN: “I heard and felt the boom. The power immediately went out and is still out.”"
      },
      {
        type: "h2",
        text: "Why the Florida Learjet crash video went viral"
      },
      {
        type: "p",
        text: "The footage spread fast because it is horrifyingly close to everyday life: cars on an ordinary road, a jet falling from the sky beside them, a fireball, and a crater where the road used to be. CNN reports the crash is the second deadliest in the United States this year according to NTSB records, following June’s skydiving plane crash in Butler, Missouri, which killed 12 people, and the worst crash involving a Learjet 60 according to Flight Safety Foundation data, after a 2008 Learjet 60 crash that killed four. With a news conference planned for Monday, more details – including the identities of those aboard and the first findings – are expected in the coming days, and this story is still developing."
      },
      {
        type: "h2",
        text: "Florida Learjet crash FAQs"
      },
      {
        type: "faq",
        items: [
          {
            q: "What happened in the Florida Learjet crash?",
            a: "A Bahamas-bound Learjet 60 carrying nine people nosedived into a Palm Beach County neighbourhood on November 1, 2026, erupting into a fireball. All nine aboard were killed, Secretary Sean Duffy confirmed."
          },
          {
            q: "Where did the Florida Learjet crash happen?",
            a: "Near Military Trail and 10th Avenue North, in the Cresthaven area near Greenacres, 7 miles southwest of West Palm Beach, after departing Austin, Texas, for the Bahamas."
          },
          {
            q: "Who died in the Florida Learjet crash?",
            a: "All nine aboard died, but officials had not released their identities, or said how many were passengers and crew."
          },
          {
            q: "What caused the Florida Learjet crash?",
            a: "The cause is under investigation by the NTSB, supported by the FAA. The pilot reported icing and turbulence and declared an emergency, but investigators have not said what caused the crash."
          }
        ]
      }
    ]
  },
  {
    slug: "pv-sindhu-lakshya-sen-hylo-open-2026-double-titles-germany",
    image: "https://images.mykhel.com/img/2026/11/hylo-open-12791793554662.jpg",
    imageAlt: "PV Sindhu and Lakshya Sen, the Hylo Open 2026 singles champions, pictured in tournament coverage",
    title: "PV Sindhu and Lakshya Sen Win Hylo Open 2026: India's Historic Double Titles in Germany",
    description:
      "PV Sindhu and Lakshya Sen won the Hylo Open 2026 singles titles in Germany, beating Line Kjaersfeldt and Jonatan Christie in straight games on November 1.",
    excerpt:
      "PV Sindhu and Lakshya Sen swept both singles titles at the Hylo Open 2026 in Saarbrucken, Germany, on Sunday, November 1.",
    date: "2026-11-02",
    category: "Sports",
    sections: [
      {
        type: "p",
        text: "PV Sindhu and Lakshya Sen have given Indian badminton a Super Sunday to remember. At the Hylo Open 2026 in Saarbrucken, Germany, on Sunday, November 1, Sindhu and Sen both won their singles finals in straight games, sweeping the women's and men's titles at the BWF Super 500 tournament. Sindhu beat Denmark's Line Hojmark Kjaersfeldt 21-12, 21-14, and Sen beat Indonesia's Jonatan Christie 21-17, 21-10. Each final lasted just 39 minutes. It is the first time in four years that two Indian shuttlers have won singles titles at the same BWF World Tour event at Super 500 level or above, and it caps a remarkable fortnight for Sindhu and ends a year-long title wait for Sen.",
      },
      {
        type: "h2",
        text: "Hylo Open 2026: PV Sindhu beats Line Kjaersfeldt in the women's final",
      },
      {
        type: "p",
        text: "PV Sindhu, the second seed and world No. 8, set the tone for India's double. She took control early against Kjaersfeldt, the world No. 25 from Denmark, after the first game was tied at five-all, and never let the Dane back into the match. Sindhu had lost just once to Kjaersfeldt in seven meetings before the final, and she played like it, staying in front throughout the second game to close out a 21-12, 21-14 win in 39 minutes. She won every match at the tournament in straight games, including a semi-final win over compatriot Anmol Kharb.",
      },
      {
        type: "p",
        text: "This is Sindhu's second title of the season, after the Japan Open Super 750 in July, and her first season since 2022 with multiple BWF World Tour titles. It follows a runner-up finish at the French Open last week, where she lost to world No. 1 An Se-young of South Korea, so the Hylo Open win completes an impressive two-week run. Sindhu now has seven BWF World Tour titles in total. The win also earned her 9,200 ranking points, keeping her in contention for the season-ending BWF World Tour Finals. After the final she credited her team's planning and stressed staying calm.",
      },
      {
        type: "h2",
        text: "Hylo Open 2026: Lakshya Sen beats Jonatan Christie in the men's final",
      },
      {
        type: "p",
        text: "Lakshya Sen completed the double later in the day with an equally commanding display. The seventh seed and world No. 14 started fast against Christie, opening up an 8-4 lead with deft net play and sharp angles, before the Indonesian fought back with a run of points to lead 9-8. Sen recovered his composure, regained control through solid defence and well-directed smashes, and took the first game 21-17. The second game was far more one-sided: Sen raised his intensity, turned defence into counter-attack, and sealed the title 21-10 in 39 minutes.",
      },
      {
        type: "p",
        text: "The win ends a title drought that stretched back to the Australian Open in November 2025, and it is Sen's first tournament victory of the season. It is also his second Hylo Open crown, after his first in 2019 when the tournament was rated a Super 100 event, and it levels his career head-to-head record against Christie at 4-4. Sen now has five BWF World Tour titles, plus two Super 100 crowns. He had reached the All England final earlier in 2026 but had struggled for consistency since, in a season disrupted by injuries.",
      },
      {
        type: "h2",
        text: "Hylo Open 2026 results: full scores from both finals",
      },
      {
        type: "list",
        items: [
          "Women's singles final: PV Sindhu (India, 2nd seed) beat Line Hojmark Kjaersfeldt (Denmark) 21-12, 21-14 in 39 minutes.",
          "Men's singles final: Lakshya Sen (India, 7th seed) beat Jonatan Christie (Indonesia) 21-17, 21-10 in 39 minutes.",
          "Tournament: Hylo Open 2026, BWF Super 500, at the Saarlandhalle in Saarbrucken, Germany, with a prize pool of USD 500,000.",
          "Sindhu's season so far: Japan Open champion in July, French Open runner-up last week, Hylo Open champion on November 1.",
          "Sen's season so far: All England finalist earlier in 2026, Hylo Open champion on November 1, his first title since November 2025."
        ],
      },
      {
        type: "h2",
        text: "Why the Hylo Open 2026 double matters for Indian badminton",
      },
      {
        type: "p",
        text: "A double like this is rare because it needs two players to peak in the same week. Sindhu's win shows her late-season form is real: two titles and a French Open final in a short stretch, after a difficult 2025 campaign, is a player rediscovering her rhythm, not enjoying one good week. Sen's win matters differently: he has reached finals all year, as at the All England Championships, but converting finals into titles after injury interruptions is the step he needed, and he took it.",
      },
      {
        type: "p",
        text: "There is also a practical prize beyond the trophies. Sindhu's 9,200 ranking points strengthen her bid for the season-ending World Tour Finals. For Sen, a title and a level head-to-head against a top Indonesian rival are exactly the confidence boost players want before the closing stretch of a season.",
      },
      {
        type: "h2",
        text: "How to follow PV Sindhu and Lakshya Sen after the Hylo Open 2026",
      },
      {
        type: "steps",
        items: [
          "Watch the updated BWF rankings, where Sindhu's 9,200 points should improve her World Tour Finals qualification position.",
          "Follow the next BWF World Tour events, where both champions are likely to be seeded against the same top rivals.",
          "Rewatch the two turning points: Sindhu pulling away after five-all, and Sen steadying himself after Christie led 9-8.",
          "Keep an eye on the World Tour Finals race, which now shapes the rest of both players' seasons."
        ],
      },
      {
        type: "h2",
        text: "Hylo Open 2026 FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Who won the Hylo Open 2026 singles titles?", a: "India's PV Sindhu won the women's title and Lakshya Sen won the men's title, both on November 1, 2026." },
          { q: "What were the Hylo Open 2026 final scores?", a: "Sindhu beat Line Hojmark Kjaersfeldt 21-12, 21-14, and Sen beat Jonatan Christie 21-17, 21-10. Both finals lasted 39 minutes." },
          { q: "Is this PV Sindhu's first title of 2026?", a: "No. It is her second title of the season after the Japan Open in July." },
          { q: "When did Lakshya Sen last win a title before the Hylo Open 2026?", a: "At the Australian Open in November 2025, so the Hylo Open ended a year-long wait." },
          { q: "What level is the Hylo Open?", a: "The Hylo Open is a BWF Super 500 tournament, held at the Saarlandhalle in Saarbrucken, Germany, with a prize pool of USD 500,000." }
        ],
      },
    ],
  },
  {
    slug: "amitabh-bachchan-bulletproof-glass-jalsa-fans-november-1-2026",
    image: "https://feeds.abplive.com/onecms/images/uploaded-images/2026/11/02/7e24009b68128a6c655395487a23330717935835107991347_original.png?impolicy=abp_cdn&imwidth=1200&height=675",
    imageAlt: "Amitabh Bachchan greeting fans from behind a transparent bulletproof enclosure outside his Mumbai home Jalsa",
    title: "Amitabh Bachchan Bulletproof Glass Jalsa: Big B Greets Fans Behind Protective Shield After Threat Reports",
    description:
      "Amitabh Bachchan greeted fans from behind bulletproof glass at Jalsa on November 1, in a viral Sunday moment following a reported threat to his home.",
    excerpt:
      "Amitabh Bachchan greeted fans outside Jalsa on November 1 from behind a transparent bulletproof enclosure, with son Abhishek Bachchan beside him.",
    date: "2026-11-02",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "Amitabh Bachchan bulletproof glass Jalsa is the image everyone is talking about this morning. On Sunday, November 1, 2026, Amitabh Bachchan stepped out for his weekly fan greeting outside his Mumbai home, Jalsa, and waved to the crowd from behind a transparent bulletproof enclosure. A video of the moment, shared by news agency ANI, has since gone viral on social media. His son, Abhishek Bachchan, stood beside him during the interaction, while security personnel managed the crowd and moved the enclosure. The extra security comes after a reported threat email mentioned Bachchan's home in October, though it is not confirmed that the glass was installed because of that email.",
      },
      {
        type: "h2",
        text: "What happened at Jalsa on November 1",
      },
      {
        type: "p",
        text: "Bachchan has for decades stepped out of Jalsa on Sunday evenings to wave to fans who gather at the bungalow's gate in Juhu, Mumbai. On November 1 he followed the same tradition, but with one visible change: a protective glass screen on three sides of his usual wheeled pedestal. In the viral video, security personnel can be seen manually moving the protective enclosure while Bachchan stands inside it and waves at the crowd. ABP Live reports that Abhishek Bachchan accompanied his father, stood a little behind him and kept an eye on the crowd, with security staff stationed nearby.",
      },
      {
        type: "h2",
        text: "Why the bulletproof glass appeared: the reported threat email",
      },
      {
        type: "p",
        text: "Reports link the heightened security to a threatening email received in October. According to NDTV, on October 23 security agencies and the Mumbai Police were placed on high alert after an email sent to Mumbai Mayor Ritu Tawde threatened bomb blasts at her office, Bachchan's home and the venue of singer Diljit Dosanjh's concert. It threatened to target Jalsa between October 31 and November 27 and warned of a grenade attack on a school on October 31, and an attack during Dosanjh's November 27 concert in the Mahalaxmi Racecourse area, according to police cited by NDTV. Officials stepped up security at the named places and launched an investigation to trace the email's origin and sender. What remains unconfirmed is the direct reason for the glass itself: NDTV states that it was not clear whether the bulletproofing move was part of a state measure or Bachchan's personal decision, and ABP Live describes the enclosure as reportedly added as an extra security measure.",
      },
      {
        type: "h2",
        text: "Tiger Shroff firing in Juhu: the other security worry",
      },
      {
        type: "p",
        text: "The glass screen also appeared two weeks after actor Tiger Shroff was shot at in Juhu, NDTV notes. Shroff was shot at on the evening of October 18 when he was returning from a football game in Juhu. According to NDTV, two men fired multiple rounds at his BMW, and one attacker then pointed a gun directly at Shroff, but the weapon jammed, leaving the actor unharmed, while his driver and a bystander were injured. NDTV reports that the Lawrence Bishnoi gang claimed responsibility for the attack, and that a dozen arrests have been made so far. None of the reports published so far say the Jalsa glass was a direct response to the Shroff incident, and that link should not be assumed.",
      },
      {
        type: "h2",
        text: "Amitabh Bachchan bulletproof glass Jalsa: what is confirmed and what is not",
      },
      {
        type: "list",
        items: [
          "Confirmed: On November 1, Bachchan greeted fans outside Jalsa from behind a transparent bulletproof enclosure on three sides of his wheeled pedestal, with Abhishek Bachchan beside him.",
          "Confirmed: A video of the greeting, posted by ANI, has gone viral, and was covered by NDTV, ABP Live, Moneycontrol, Oneindia and Gulf News on November 1 and the morning of November 2.",
          "Reported: A threatening email on October 23 mentioned Bachchan's home, Jalsa, and warned of attacks between October 31 and November 27. Police launched an investigation and stepped up security at the places named.",
          "Not confirmed: Whether the glass was installed on police advice or as a personal precaution. Reports explicitly say this is unclear.",
          "Not confirmed: Any claim that the glass proves a specific, imminent threat. The email is part of an ongoing police investigation, and no report cited here confirms who sent it."
        ],
      },
      {
        type: "h2",
        text: "The Sunday tradition at Jalsa, and why this one felt different",
      },
      {
        type: "p",
        text: "The Sunday greeting outside Jalsa is one of Bollywood's longest-running fan rituals. For decades, fans have gathered outside the gate on Sunday evenings, and Bachchan has stepped out to wave to them. That is why the November 1 appearance drew so much attention: the ritual was the same, but the setting was visibly different, with a transparent barrier between the actor and the crowd.",
      },
      {
        type: "h2",
        text: "Why the Amitabh Bachchan bulletproof glass video went viral",
      },
      {
        type: "p",
        text: "The video went viral because it combined three things at once: a beloved, decades-old tradition, a striking visual change, and a worrying backstory. The timing added to the reaction, with the appearance coming just days after the reported threat window opened on October 31, and two weeks after the firing incident involving Tiger Shroff in the same Juhu neighbourhood.",
      },
      {
        type: "h2",
        text: "Amitabh Bachchan bulletproof glass Jalsa FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Why did Amitabh Bachchan greet fans from behind bulletproof glass?", a: "On November 1, Bachchan greeted fans outside Jalsa from behind a transparent bulletproof enclosure. Reports say the extra security follows a threatening email in October that mentioned his home, but it is not confirmed whether the glass was a police measure or a personal precaution." },
          { q: "What did the reported threat email say about Jalsa?", a: "According to reports, an email on October 23 threatened bomb blasts at the Mumbai mayor's office, Bachchan's home and a concert venue, and warned of an attack on Jalsa between October 31 and November 27. Police launched an investigation and stepped up security." },
          { q: "Who was with Amitabh Bachchan at Jalsa on November 1?", a: "His son, Abhishek Bachchan, accompanied him, standing behind him while security personnel managed the crowd and moved the enclosure." },
          { q: "Is the Sunday greeting at Jalsa a regular tradition?", a: "Yes. Bachchan has for decades stepped out of Jalsa on Sunday evenings to wave to fans gathered outside the gate, and the November 1 greeting followed that tradition with the added bulletproof enclosure." }
        ],
      },
    ],
  },
  {
    slug: "severe-cyclone-murasu-andhra-coast-tonight-landfall-november-2-2026",
    image: "https://imagesvs.oneindia.com/img/2026/11/cyclone2-81171793529629.jpg",
    imageAlt: "Cyclone Murasu over the Bay of Bengal and flooding on a road, as pictured in news coverage",
    title: "Severe Cyclone Murasu: Andhra Coast Braces Tonight as Storm Nears Ongole, Landfall 11:30 PM to 4 AM",
    description:
      "Severe Cyclone Murasu is nearing the Andhra coast tonight, with landfall close to Ongole between 11:30 pm and 4 am and winds up to 120 kmph.",
    excerpt:
      "Severe Cyclone Murasu, confirmed by the IMD's 5 am bulletin on November 2, is set to cross the south Andhra Pradesh coast close to Ongole tonight.",
    date: "2026-11-02",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Severe Cyclone Murasu is now a confirmed severe cyclonic storm, not just a forecast. The India Meteorological Department (IMD) said in its 5 am bulletin on Monday, November 2, 2026, that Murasu had strengthened into a severe cyclonic storm by 2:30 am and is heading northwest towards the south Andhra Pradesh coast. Landfall is expected tonight, between 11:30 pm on November 2 and 4 am on November 3, close to Ongole, between Nellore and Narsapur, with winds of 100 to 110 kmph, gusting to 120 kmph. This updates the November 1 post, which forecast severe strength for Monday morning: the overnight bulletin confirms it, with the crossing point narrowed to near Ongole.",
      },
      {
        type: "h2",
        text: "Severe Cyclone Murasu: where it is now",
      },
      {
        type: "p",
        text: "At 2:30 am on November 2, Severe Cyclonic Storm Murasu lay over the west-central and adjoining southwest Bay of Bengal, near 13.6 degrees north and 82.5 degrees east, according to the IMD bulletin. That put it about 260 km east-northeast of Chennai, 290 km east-southeast of Nellore and 330 km southeast of Ongole. It had moved nearly northwestwards at about 20 kmph during the previous six hours, and is very likely to keep moving northwestwards. At 2:30 am its sustained winds were 90 to 100 kmph, gusting to 110 kmph, below the stronger winds expected at landfall tonight.",
      },
      {
        type: "h2",
        text: "Severe Cyclone Murasu landfall tonight: time, place and wind speed",
      },
      {
        type: "p",
        text: "The IMD's landfall forecast is unchanged in timing but sharper in location: Severe Cyclone Murasu is very likely to cross the south Andhra coast close to Ongole, between Nellore and Narsapur, between 11:30 pm on Monday, November 2, and 4 am on Tuesday, November 3, with sustained winds of 100 to 110 kmph, gusting to 120 kmph. The IMD also warns of a 1.0 to 1.5 metre storm surge at landfall, very likely to flood low-lying south coastal Andhra Pradesh, highest in Bapatla and also in Krishna and Prakasam. Along the Andhra coast, winds of 65 to 75 kmph are expected by noon, 80 to 90 kmph from evening, and 100 to 110 kmph from midnight into early Tuesday.",
      },
      {
        type: "h2",
        text: "Severe Cyclone Murasu red alerts and rainfall for November 2 and 3",
      },
      {
        type: "p",
        text: "The IMD has issued a red alert for Andhra Pradesh and north Tamil Nadu, with heavy to very heavy rainfall very likely over coastal Andhra Pradesh, Rayalaseema and Telangana on November 2 and 3. For Monday, the five districts on red alert for extremely heavy rainfall are Krishna, Guntur, Bapatla, Prakasam and Nellore, the same districts named on Sunday. North Tamil Nadu and Puducherry face winds of 60 to 70 kmph, gusting to 80 kmph, from Monday evening into Tuesday morning. In Telangana, an orange alert covers six districts and a yellow alert five for Monday, according to The Hindu's morning digest. Odisha's rain increases on November 3 and 4, and its southern region remains on high alert, with evacuations from vulnerable areas.",
      },
      {
        type: "h2",
        text: "Severe Cyclone Murasu school closures and transport disruption today",
      },
      {
        type: "p",
        text: "Chennai and Tiruvallur collectors have announced schools and colleges closed on Monday, November 2, because of heavy rain from Murasu, The Hindu reports. In Odisha, Malkangiri has closed schools and colleges from November 2 to 4. Students in Andhra Pradesh should check their district collector's announcements for late orders. Cautionary signals have been hoisted at seven Andhra ports, and travellers should expect delays and avoid coastal roads and flooded stretches once winds pick up in the evening.",
      },
      {
        type: "h2",
        text: "What has changed since yesterday's Cyclone Murasu forecast",
      },
      {
        type: "list",
        items: [
          "Status: a cyclonic storm on Sunday; by 2:30 am Monday a severe cyclonic storm, confirmed in the IMD's 5 am bulletin.",
          "Track: turned northwest and slowed to about 20 kmph, bringing it closer to Chennai and the south Andhra coast.",
          "Crossing point: narrowed from the Nellore-Narsapur stretch to close to Ongole, between 11:30 pm Monday and 4 am Tuesday.",
          "Storm surge: now 1.0 to 1.5 metres above tide, highest in Bapatla and also in Krishna and Prakasam.",
          "Warnings: the red-message cyclone warning for the Andhra and north Tamil Nadu coasts remains, and fishermen must stay off the Andhra coast until Wednesday afternoon."
        ],
      },
      {
        type: "h2",
        text: "Severe Cyclone Murasu safety steps and helplines",
      },
      {
        type: "steps",
        items: [
          "Follow only official IMD and state advisories, and check the IMD's next bulletin, due at 8:30 am Monday, for any change in track or timing.",
          "If you live in a low-lying or coastal area in Krishna, Guntur, Bapatla, Prakasam or Nellore, be ready to move early if evacuation is ordered; do not wait for landfall.",
          "Stay indoors once red-alert winds arrive, away from the sea, flooded roads and weak structures, with water, food, medicines, documents and a charged phone ready.",
          "Fishermen must not venture into the sea: the IMD advice covers the Andhra coast until Wednesday afternoon.",
          "For emergencies, use 112, the Andhra Pradesh helpline 1070, or toll-free 1800-425-0101. Andhra Pradesh has positioned 12 NDRF and SDRF teams, and Odisha's Rayagada district has deployed all 11 fire station teams with heavy machinery."
        ],
      },
      {
        type: "h2",
        text: "Severe Cyclone Murasu FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "When will Severe Cyclone Murasu make landfall?", a: "Severe Cyclone Murasu is forecast to cross the south Andhra coast close to Ongole, between Nellore and Narsapur, between 11:30 pm on November 2 and 4 am on November 3, 2026." },
          { q: "How strong will Severe Cyclone Murasu be at landfall?", a: "The IMD forecasts sustained winds of 100 to 110 kmph, gusting to 120 kmph, at landfall, with a 1.0 to 1.5 metre storm surge flooding low-lying south coastal Andhra Pradesh." },
          { q: "Which districts are on red alert for Severe Cyclone Murasu today?", a: "For Monday, November 2, Krishna, Guntur, Bapatla, Prakasam and Nellore are on red alert for extremely heavy rainfall, with orange alerts in six Telangana districts and yellow alerts in five more." },
          { q: "Are schools closed because of Severe Cyclone Murasu?", a: "Schools and colleges in Chennai and Tiruvallur are closed on Monday, November 2, and in Odisha's Malkangiri from November 2 to 4. Check your district collector's announcement for other districts." }
        ],
      },
    ],
  },
  {
    slug: "king-tu-mil-jaaye-song-out-shah-rukh-khan-deepika-padukone-november-2-2026",
    image: "https://i.ytimg.com/vi/BPZkZpGMpXA/maxresdefault.jpg",
    imageAlt: "Shah Rukh Khan and Deepika Padukone in the official video of Tu Mil Jaaye from King",
    title: "Tu Mil Jaaye King Song Out: Shah Rukh Khan and Deepika Padukone's First Song From King Drops on SRK's 61st Birthday",
    description:
      "Tu Mil Jaaye King song is out: Shah Rukh Khan and Deepika Padukone's first song from King, sung by Arijit Singh, Ed Sheeran and Madhubanti.",
    excerpt:
      "Tu Mil Jaaye, the first song from Shah Rukh Khan's King, is out on his 61st birthday, pairing him with Deepika Padukone in a romantic action number.",
    date: "2026-11-02",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "The Tu Mil Jaaye King song is out. Shah Rukh Khan's first song from King dropped at midnight on November 2, 2026, coinciding with the superstar's 61st birthday, and it immediately became the most talked-about Bollywood release of the morning. The full song video, titled KING: Tu Mil Jaaye, stars Shah Rukh Khan alongside Deepika Padukone, and it is the first full musical asset from Siddharth Anand's action film, which arrives in cinemas on December 24, 2026.",
      },
      {
        type: "h2",
        text: "Tu Mil Jaaye King song: singers, composer and credits",
      },
      {
        type: "p",
        text: "The credits on the official release confirm the collaboration fans had been waiting for. Tu Mil Jaaye is composed by Sachin-Jigar, with lyrics by Kumaar, and the vocals are by Arijit Singh and Madhubanti Bagchi, featuring Ed Sheeran. The film is presented by Red Chillies Entertainment in association with Marflix Pictures, and the song's official description lists Ed Sheeran courtesy of Interscope Records and Gingerbread Man Records.",
      },
      {
        type: "list",
        items: [
          "Song: Tu Mil Jaaye, the first song from King",
          "Starring in the video: Shah Rukh Khan and Deepika Padukone",
          "Vocals: Arijit Singh and Madhubanti Bagchi, featuring Ed Sheeran",
          "Composed by: Sachin-Jigar; lyrics: Kumaar",
          "Film: King, directed by Siddharth Anand, in cinemas December 24, 2026",
          "Released: at midnight on November 2, 2026, Shah Rukh Khan's 61st birthday"
        ],
      },
      {
        type: "p",
        text: "That combination is what makes the track such a talking point. Arijit Singh brings the familiar Hindi romantic voice that fans associate with Shah Rukh Khan's biggest love songs, while Ed Sheeran's presence gives King its first genuinely global musical hook. It is the kind of pairing that was reported ahead of the release, and the official video now confirms it in full.",
      },
      {
        type: "h2",
        text: "What happens in the Tu Mil Jaaye video",
      },
      {
        type: "p",
        text: "The video opens on a much harsher note than a conventional love song. Shah Rukh Khan appears in dark glasses, surrounded by guns, cargo and coastal hideouts, placing the romance inside a tense action world from the very first frames. That edge is deliberate: Tu Mil Jaaye frames love as something pursued inside danger, not away from it.",
      },
      {
        type: "p",
        text: "As the song unfolds, the mood loosens into breezy seaside romance. Shah Rukh Khan and Deepika Padukone share drinks at an outdoor setting, pose with roses by crashing waves, share street food by the harbour at night and slow-dance beneath fireworks. The recurring lyric, about finding peace if the loved one is found, becomes the emotional spine of the song, carrying the quiet ache of wanting calm in a chaotic world.",
      },
      {
        type: "p",
        text: "That tenderness never stays untouched for long. The video cuts back into gunfights, flames, rooftop action, car chases and close combat, giving King a muscular identity even inside a romantic track. A later lyrical turn, about a fire lit in the heart that will not stop until the world burns, pushes the song from longing into a more dangerous, obsessive register. The result is a number designed for replay value as much as for visual recall, balancing softness with scale.",
      },
      {
        type: "h2",
        text: "Why some reports called it Tu Mil Jaaye Toh",
      },
      {
        type: "p",
        text: "Fans searching for the song may notice two very similar titles. Reports ahead of the release referred to the track as Tu Mil Jaaye Toh, and that name was widely shared through November 1. The official release, however, titles the song Tu Mil Jaaye, and that is the name on the official video and audio pages. The song itself is the same birthday release; only the final official title is the shorter form.",
      },
      {
        type: "h2",
        text: "What Tu Mil Jaaye tells us about King",
      },
      {
        type: "p",
        text: "King is directed by Siddharth Anand, who previously directed Shah Rukh Khan and Deepika Padukone in Pathaan, and Tu Mil Jaaye deliberately leans on that reunion. The film is shaping up as a romance-driven action spectacle, and its first song makes that promise clear: the romance is front and centre, but the action world around it never disappears. Alongside Shah Rukh Khan and Deepika Padukone, the film features Suhana Khan, Abhishek Bachchan, Rani Mukerji, Anil Kapoor and others, and it is one of the most closely watched releases of the year-end season.",
      },
      {
        type: "p",
        text: "The timing of the release is part of the strategy. King arrives in cinemas on December 24, 2026, and the birthday song drop gives the campaign its first full musical asset weeks ahead of the trailer, which is expected to follow at a later stage. For a film carrying this level of expectation, a song that works both as a romantic number and as an action showcase is a careful first step.",
      },
      {
        type: "h2",
        text: "The birthday build-up: Mannat lights up for King",
      },
      {
        type: "p",
        text: "The release did not arrive out of nowhere. Ahead of Shah Rukh Khan's birthday, his Mumbai bungalow Mannat lit up with King posters and dialogues, and the Bandra-Worli Sea Link lit up with the King poster as well. Director Siddharth Anand had teased a midnight drop over the preceding days, and reports through November 1 consistently pointed to a full song, not a teaser or a short glimpse, arriving on the birthday. The midnight release delivered exactly that: the complete song, unveiled in full.",
      },
      {
        type: "h2",
        text: "Tu Mil Jaaye King song FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Is Tu Mil Jaaye from King out?", a: "Yes. Tu Mil Jaaye, the first song from King, was released at midnight on November 2, 2026, on Shah Rukh Khan's 61st birthday." },
          { q: "Who sings Tu Mil Jaaye from King?", a: "Tu Mil Jaaye is sung by Arijit Singh and Madhubanti Bagchi, featuring Ed Sheeran. It is composed by Sachin-Jigar with lyrics by Kumaar." },
          { q: "Who stars in the Tu Mil Jaaye video?", a: "The video stars Shah Rukh Khan and Deepika Padukone, reuniting the Pathaan pair in a romantic action number." },
          { q: "When does King release in cinemas?", a: "King, directed by Siddharth Anand, is scheduled to release in cinemas on December 24, 2026." },
          { q: "Is the song called Tu Mil Jaaye or Tu Mil Jaaye Toh?", a: "Reports before the release called it Tu Mil Jaaye Toh, but the official release titles the song Tu Mil Jaaye." }
        ],
      },
    ],
  },
  {
    slug: "mahadev-betting-app-sourabh-chandrakar-extradited-oman-cbi-raipur-november-1-2026",
    image: "https://img.republicworld.com/all_images/2026/11/cbi-extradites-mahadev-app-kingpin-sourabh-chandrakar-from-oman-1793541224570-1280x720.webp?w=1280&h=720&q=75&format=webp",
    imageAlt: "Sourabh Chandrakar flanked by CBI officials after being extradited to India from Oman",
    title: "Sourabh Chandrakar Extradited: Mahadev Betting App Kingpin Brought Back From Oman, To Face Raipur Court on November 2",
    description:
      "Sourabh Chandrakar extradited: the CBI has brought the alleged Mahadev betting app kingpin back from Oman, and he faces a Raipur court on November 2.",
    excerpt:
      "The CBI has extradited Sourabh Chandrakar, the alleged promoter of the Mahadev Online Book betting syndicate, from Oman to India, and he will be produced before a special court in Raipur on November 2, 2026.",
    date: "2026-11-01",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Sourabh Chandrakar has been extradited to India in one of the country's largest alleged betting scandals. The Central Bureau of Investigation (CBI) announced on Sunday, November 1, 2026, that it has successfully secured the extradition of Chandrakar, the alleged promoter of the Mahadev Online Book (MOB) illegal betting syndicate, from the Sultanate of Oman. A CBI team deputed to Oman escorted him back to India, and he will now be produced before the CBI Special Court in Raipur, Chhattisgarh, on Monday, November 2.",
      },
      {
        type: "h2",
        text: "Sourabh Chandrakar extradited: how the CBI brought him back from Oman",
      },
      {
        type: "p",
        text: "The extradition followed a long trail across countries. According to the CBI, Chandrakar, who hails from Durg in Chhattisgarh, was located and detained by the Royal Oman Police after an Interpol Red Corner Notice was issued against him. The CBI and the Enforcement Directorate (ED) then sent formal extradition proposals to Oman, along with the evidence gathered during their investigations. The request was pursued with other central agencies, the Interpol National Central Bureau and the Oman authorities, and once approved, a CBI team travelled to Muscat and escorted Chandrakar back to India.",
      },
      {
        type: "p",
        text: "The CBI described the extradition as a significant milestone in India's efforts to bring back fugitives accused of running transnational criminal enterprises against Indian citizens from abroad. The agency also thanked the Government of Oman and the Royal Oman Police. Before he is taken to Raipur, Chandrakar will undergo a medical examination and be taken there after obtaining transit remand, the CBI said.",
      },
      {
        type: "p",
        text: "This was not the first attempt to bring Chandrakar back. Authorities in the United Arab Emirates briefly detained him in October 2024 following an Interpol Red Notice and placed him under house arrest, but that extradition did not materialise. He was later traced to Oman, where the Royal Oman Police detained him, setting up the extradition now completed.",
      },
      {
        type: "h2",
        text: "What is the Mahadev betting app case?",
      },
      {
        type: "p",
        text: "The Mahadev Online Book case concerns an alleged illegal online betting syndicate pegged at around Rs 6,000 crore, which investigators say was one of the largest such networks in the country. According to the CBI, the syndicate operated from outside India and offered illegal betting on cricket, football, card games and other events through franchised panels and branches across India, which enrolled users and collected their stakes.",
      },
      {
        type: "p",
        text: "Chandrakar allegedly set up the betting network along with co-founder Ravi Uppal, with the duo reported to have operated from Dubai after moving there around 2019. The CBI took over the Mahadev Online Book cases at the Chhattisgarh government's request in 2024, while the ED has separately probed the money-laundering angle.",
      },
      {
        type: "p",
        text: "The financial trail alleged by investigators is central to the case. The CBI has said the proceeds of the illegal betting were routed through a large number of mule bank accounts, layered through multiple transactions and moved abroad through hawala channels. Investigators have also alleged that a portion of the proceeds was used to pay protection money to public servants so the syndicate could operate without hindrance.",
      },
      {
        type: "h2",
        text: "Sourabh Chandrakar extradited: the charges he faces",
      },
      {
        type: "list",
        items: [
          "Two CBI cases: Chandrakar is wanted in two CBI cases in which chargesheets have already been filed, and he is among the key accused named in them.",
          "One ED case: he is also an accused in a separate ED case in which a prosecution complaint has been filed, and the ED has attached several properties in India and abroad linked to the alleged syndicate.",
          "The statutes: the CBI has filed chargesheets under the Prevention of Corruption Act, 1988, and provisions of the Indian Penal Code relating to criminal conspiracy, cheating and forgery, along with the Chhattisgarh Gambling (Prohibition) Act.",
          "The alleged scale: the Mahadev Online Book syndicate is pegged at around Rs 6,000 crore.",
          "The next court date: after a medical examination and transit remand, Chandrakar is scheduled to be produced before the CBI Special Judge in Raipur on Monday, November 2, 2026."
        ],
      },
      {
        type: "h2",
        text: "What happens next in the Mahadev app case",
      },
      {
        type: "p",
        text: "With Chandrakar now back in India, attention turns to the proceedings before the special CBI court in Raipur and to the questioning investigators are expected to carry out into the alleged syndicate and its financial network. His production before the court on November 2 will be the first formal step in the Indian proceedings, and the ED's separate money-laundering case will continue alongside the CBI cases.",
      },
      {
        type: "p",
        text: "It is important to keep the legal position clear. Chandrakar is described by the agencies as the alleged kingpin and promoter of the syndicate, and the chargesheets and prosecution complaint set out the allegations against him. He has not been convicted in these cases. What is confirmed as of November 1, 2026, is the extradition itself: the alleged Mahadev app kingpin is back in India, and his first court appearance is set for November 2.",
      },
      {
        type: "h2",
        text: "Sourabh Chandrakar extradited FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Who is Sourabh Chandrakar?", a: "Sourabh Chandrakar, from Durg in Chhattisgarh, is described by the CBI as the promoter of the alleged Mahadev Online Book betting syndicate, pegged at around Rs 6,000 crore." },
          { q: "Why was Sourabh Chandrakar extradited from Oman?", a: "He was detained by the Royal Oman Police after an Interpol Red Corner Notice, and India secured his extradition after the CBI and ED sent formal proposals with evidence to Oman." },
          { q: "When will Sourabh Chandrakar appear in court?", a: "After a medical examination and transit remand, Chandrakar is scheduled to be produced before the CBI Special Judge in Raipur, Chhattisgarh, on Monday, November 2, 2026." },
          { q: "What cases does Sourabh Chandrakar face?", a: "He is wanted in two CBI cases with chargesheets filed and one ED case with a prosecution complaint filed, with charges including criminal conspiracy, cheating and forgery and the Prevention of Corruption Act, 1988." },
          { q: "What is the Mahadev betting app case about?", a: "The case concerns an alleged illegal online betting syndicate offering betting on cricket, football, card games and other events through franchised panels across India, with proceeds allegedly routed through mule accounts and hawala channels." }
        ],
      },
    ],
  },
  {
    slug: "rc17-ram-charan-sukumar-launch-chiranjeevi-clap-anirudh",
    image: "https://cdn.123telugu.com/content/wp-content/uploads/2026/11/RC-17.webp",
    imageAlt: "Ram Charan and Sukumar at the RC17 launch ceremony in Hyderabad on November 1, 2026",
    title: "RC17 Launched: Ram Charan and Sukumar Reunite as Chiranjeevi Gives the Mega Clap, Anirudh Reportedly on Music",
    description:
      "RC17 launch: Ram Charan and Sukumar's film began with a grand pooja in Hyderabad on November 1, 2026, with Chiranjeevi giving the first clap.",
    excerpt:
      "Ram Charan and director Sukumar officially launched their new film RC17 with a grand pooja ceremony in Hyderabad on November 1, 2026, with Megastar Chiranjeevi giving the ceremonial first clap.",
    date: "2026-11-01",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "RC17 is officially underway. Ram Charan and director Sukumar launched their much-awaited film, tentatively titled RC17, with a grand pooja ceremony in Hyderabad on Sunday, November 1, 2026, more than two years after the project was first announced. Megastar Chiranjeevi, Ram Charan's father, gave the ceremonial first clap and performed the traditional coconut-breaking ritual, formally launching a film carrying high expectations in Telugu cinema.",
      },
      {
        type: "h2",
        text: "RC17 launch: what happened at the Hyderabad pooja ceremony",
      },
      {
        type: "p",
        text: "The RC17 launch ceremony began at around 10:50 am in Hyderabad, according to reports of the event, with the team gathering for the traditional pooja before filming starts. The clip shared by Mythri Movie Makers showed Ram Charan arriving at the venue, greeting the team and lighting the ceremonial lamp. Chiranjeevi then sounded the clapboard, and the makers summed up the moment in their post: the journey of RC17 begins with the MEGA CLAP, with the megastar blessing the entire team. The film carries the tagline You Can Imagine, and the makers have said shooting will take place at Ramoji Film City, with the remaining cast and crew to be announced in the coming days.",
      },
      {
        type: "p",
        text: "The launch was a star-studded industry affair. Along with Chiranjeevi, Ram Charan and Sukumar, those present included directors Harish Shankar, Buchi Babu Sana, Gopichand Malineni and Maruthi, producer Naga Vamsi, and producers Naveen Yerneni and Y. Ravi Shankar of Mythri Movie Makers. The film is bankrolled by Mythri Movie Makers in association with Sukumar Writings and T-Series Films.",
      },
      {
        type: "h2",
        text: "Why the Ram Charan and Sukumar reunion matters after Rangasthalam",
      },
      {
        type: "p",
        text: "The RC17 pairing matters because Ram Charan and Sukumar have not made a film together since Rangasthalam in 2018, the village drama that became a blockbuster and remains one of the most loved films of both men's careers. Its success is exactly why expectations for RC17 are so high. The two first confirmed their reunion in March 2024, when Ram Charan shared a photograph with Sukumar, and the project has been discussed by fans ever since.",
      },
      {
        type: "p",
        text: "Reports of the launch say Ram Charan is undergoing a major transformation for the role and will be seen in a completely new look, with the film expected to feature him in a rugged, never-before-seen avatar. One report of the launch says the team plans to complete the shoot by the end of 2027 and release the film in 2028, though the makers have not yet announced a release date themselves, so fans should treat that window as a reported plan rather than a confirmed date.",
      },
      {
        type: "h2",
        text: "RC17 music: Anirudh Ravichander reportedly joins, a break from Sukumar's DSP tradition",
      },
      {
        type: "p",
        text: "The biggest talking point from the RC17 launch, beyond the clap itself, is the music. Multiple reports say Anirudh Ravichander has joined RC17 as its music composer, which would mark a major shift: Sukumar has traditionally collaborated with Devi Sri Prasad (DSP) for his films, and Anirudh teaming up with Sukumar for the first time is itself a headline. Cinematographer Ratnavelu is also reported to be on board to handle the visuals. Some reports present Anirudh's involvement as confirmed, while others describe it as reported rather than officially confirmed by the makers, so the careful reading is that Anirudh is reported to be composing RC17, with a formal announcement from the team still awaited.",
      },
      {
        type: "p",
        text: "The composer news also connects RC17 to one of Bollywood's biggest upcoming films. Reports say Anirudh has stepped away from Shah Rukh Khan's King, directed by Siddharth Anand, due to scheduling conflicts, with the same reports linking his RC17 commitment to that decision. King is scheduled to release in cinemas on December 24, 2026, and its first song is reported to arrive on November 2, Shah Rukh Khan's birthday.",
      },
      {
        type: "h2",
        text: "RC17 cast, crew and what happens next",
      },
      {
        type: "list",
        items: [
          "Title: RC17 (working title), with the tagline You Can Imagine.",
          "Lead and director: Ram Charan reunites with director Sukumar after Rangasthalam (2018).",
          "Launch: grand pooja ceremony in Hyderabad on November 1, 2026, with Chiranjeevi giving the first clap.",
          "Producers: Mythri Movie Makers, in association with Sukumar Writings and T-Series Films.",
          "Reported crew: Anirudh Ravichander reported as music composer, Ratnavelu reported as cinematographer.",
          "Filming location: Ramoji Film City, Hyderabad, as stated by the makers at launch.",
          "Reported plan: shoot to be completed by the end of 2027 with a 2028 release, according to one launch report, not yet confirmed by the makers.",
          "Still to come: remaining cast and crew announcements, first look, and an official release date."
        ],
      },
      {
        type: "h2",
        text: "What RC17 means for Telugu cinema's 2028 slate",
      },
      {
        type: "p",
        text: "RC17 arrives at a moment when Telugu cinema's biggest stars are lining up large-scale projects years in advance, and a Ram Charan and Sukumar reunion naturally sits near the top of that slate. For RC17, though, the launch is only the starting gun. The first look, the remaining cast, and the first glimpse of Ram Charan's new avatar will decide whether the film lives up to the excitement of its pooja ceremony.",
      },
      {
        type: "h2",
        text: "RC17 FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "What is RC17?", a: "RC17 is the working title of Ram Charan's new film directed by Sukumar, produced by Mythri Movie Makers with Sukumar Writings and T-Series Films, launched in Hyderabad on November 1, 2026." },
          { q: "Who gave the first clap for RC17?", a: "Megastar Chiranjeevi, Ram Charan's father, gave the ceremonial first clap and performed the coconut-breaking ritual at the Hyderabad launch ceremony." },
          { q: "Is Anirudh Ravichander composing RC17's music?", a: "Multiple reports say Anirudh Ravichander is on board as RC17's composer, though some reports describe it as reported rather than officially confirmed by the makers. Ratnavelu is also reported as the film's cinematographer." },
          { q: "When will RC17 release?", a: "No official release date has been announced. One launch report says the team plans to finish shooting by the end of 2027 and release the film in 2028, but that should be treated as a reported plan for now." },
          { q: "Why is RC17 such a big deal?", a: "It reunites Ram Charan and Sukumar for the first time since their 2018 blockbuster Rangasthalam, and it comes more than two years after the project was first announced in March 2024." }
        ],
      },
    ],
  },
  {
    slug: "ind-vs-nz-5th-t20i-seifert-93-new-zealand-win-series-3-2",
    image: "https://aniportalimages.s3.amazonaws.com/media/details/ANI-20260128170746.jpg",
    imageAlt: "Glenn Phillips, New Zealand's Player of the Series, raises his bat after reaching a fifty",
    title: "IND vs NZ 5th T20I: Seifert's 93 Powers New Zealand to 7-Wicket Win as India Take Series 3-2",
    description:
      "IND vs NZ 5th T20I result: Tim Seifert's 93 and Glenn Phillips' 65 not out powered New Zealand to a 7-wicket win in Hamilton, but India took the series 3-2.",
    excerpt:
      "New Zealand beat India by seven wickets in the fifth T20I at Hamilton on November 1, 2026, but India still claimed the five-match series 3-2.",
    date: "2026-11-01",
    category: "Sports",
    sections: [
      {
        type: "p",
        text: "The IND vs NZ 5th T20I ended with a New Zealand win, but India still lifted the trophy. At Seddon Park in Hamilton on Sunday, November 1, 2026, New Zealand chased down India's 191 for 8 with 12 balls to spare, finishing on 195 for 3 in 18 overs to win by seven wickets. Tim Seifert smashed 93 off 50 balls, Glenn Phillips finished unbeaten on 65 off 38, and Phillips ended the series with a world-record 341 runs.",
      },
      {
        type: "h2",
        text: "IND vs NZ 5th T20I result and full scorecard",
      },
      {
        type: "p",
        text: "New Zealand captain Mitchell Santner won the toss and chose to bowl first, with India batting first for the first time in the series. India were 112 for 2 after 10.1 overs and looked set for 200, but finished on 191 for 8.",
      },
      {
        type: "list",
        items: [
          "India: 191 for 8 in 20 overs (Ishan Kishan 61 off 32, Shreyas Iyer 50, Adam Milne 4 for 19)",
          "New Zealand: 195 for 3 in 18 overs (Tim Seifert 93 off 50, Glenn Phillips 65 not out off 38)",
          "Result: New Zealand won by 7 wickets, with 12 balls remaining",
          "Series result: India won the five-match series 3-2",
          "Player of the Match: Adam Milne (4 for 19); Player of the Series: Glenn Phillips (341 runs)"
        ],
      },
      {
        type: "h2",
        text: "How India reached 191 for 8 after a flying start",
      },
      {
        type: "p",
        text: "India lost both openers cheaply inside the powerplay to the New Zealand quicks. Ishan Kishan and captain Shreyas Iyer then rebuilt in style, adding 93 runs for the third wicket and taking India to 112 for 2. Kishan smashed 61 off 32 balls with five fours and five sixes, while Iyer played a quickfire fifty, and at one stage India looked certain to pass 200.",
      },
      {
        type: "p",
        text: "Adam Milne was the star with the ball, taking 4 for 19 in four overs, including both openers in the powerplay and two more at the death. Nathan Smith took 2 for 28 and Blair Tickner two wickets, and India faded in the death overs after Kishan and Iyer fell.",
      },
      {
        type: "h2",
        text: "Seifert's 93 turns the chase after an early let-off",
      },
      {
        type: "p",
        text: "New Zealand's chase began shakily, with Finn Allen falling for 2 to Arshdeep Singh. Then came the moment that decided the match: Tim Seifert, on 13, offered a simple catch that Naman Dhir shelled at deep point in the fourth over. Seifert made India pay, taking his side to 59 for 1 by the end of the powerplay and finishing with 11 fours and five sixes in his 93 off 50 balls.",
      },
      {
        type: "p",
        text: "Seifert first added 73 runs with Daryl Mitchell for the second wicket, then 86 runs with Glenn Phillips for the third. At one stage New Zealand needed 111 off 69 balls, but the pair never let the asking rate climb. Seifert fell seven runs short of what would have been his maiden T20I hundred, but Phillips stayed calm and sealed the win with a boundary. Reaching 192 in 18 overs made it the fastest chase of 190-plus against India in T20Is, measured by overs.",
      },
      {
        type: "h2",
        text: "Glenn Phillips breaks Phil Salt's world record with 341 runs",
      },
      {
        type: "p",
        text: "The biggest individual story belongs to Glenn Phillips. His unbeaten 65 in Hamilton took his series total to 341 runs, breaking Phil Salt's world record of 331 runs in a bilateral T20I series, set against the West Indies in 2023. Phillips is also the first New Zealand batter to pass 300 runs in a bilateral T20I series, and the first with four fifty-plus scores in one series against India.",
      },
      {
        type: "p",
        text: "His scores across the five matches tell the story of a remarkable run: 82 not out, 70, 17, 107 and 65 not out, with one century and three fifties. Mohammad Rizwan's 316 against England in 2022 is now third on the all-time list. Phillips was named Player of the Series, while Adam Milne's 4 for 19 earned him Player of the Match in the finale.",
      },
      {
        type: "h2",
        text: "What the IND vs NZ 5th T20I result means for the ODI series",
      },
      {
        type: "p",
        text: "For India, the series win softens back-to-back defeats to close the T20I leg: a 3-2 win is a solid return from a tough away tour. For New Zealand, two straight wins to finish are a welcome boost, and Phillips's form plus Milne's pace give them momentum. Both teams now turn to the ODI leg, starting Wednesday, November 4 at Eden Park in Auckland.",
      },
      {
        type: "p",
        text: "The series also produced striking team numbers for India: 142 sixes against one opposition in a calendar year, and 400 sixes in 40 T20Is in 2026, a first. The batting firepower is clearly there; Hamilton turned on the death overs and one dropped catch.",
      },
      {
        type: "h2",
        text: "How to follow the IND vs NZ ODI series",
      },
      {
        type: "steps",
        items: [
          "First ODI: Wednesday, November 4, 2026, at Eden Park in Auckland.",
          "Watch on Sony Sports Network TV channels or Sony LIV, which have shown this tour's matches.",
          "Key battles: Glenn Phillips against India's spinners, and Adam Milne's pace against the top order.",
          "Check team news before each game: India rotated players through the T20I series."
        ],
      },
      {
        type: "h2",
        text: "IND vs NZ 5th T20I FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "Who won the IND vs NZ 5th T20I?", a: "New Zealand won by seven wickets, chasing India's 191 for 8 with 12 balls to spare and finishing on 195 for 3 in 18 overs." },
          { q: "Who won the IND vs NZ T20I series?", a: "India won the five-match series 3-2, winning the first three matches before New Zealand won the last two." },
          { q: "What world record did Glenn Phillips break?", a: "Phillips scored 341 runs in the series, the most ever in a bilateral T20I series, breaking Phil Salt's 331 against the West Indies in 2023." },
          { q: "Who was the Player of the Match and Player of the Series?", a: "Adam Milne was Player of the Match for his 4 for 19, and Glenn Phillips was Player of the Series for his record 341 runs." },
          { q: "When does the IND vs NZ ODI series start?", a: "The five-match ODI series starts on Wednesday, November 4, 2026, with the first ODI at Eden Park in Auckland." }
        ],
      },
    ],
  },
  {
    slug: "cyclone-murasu-red-alert-andhra-pradesh-november-3-landfall",
    image: "https://imagesvs.oneindia.com/img/2026/11/cyclone2-81171793529629.jpg",
    imageAlt: "Cyclone Murasu over the Bay of Bengal, as pictured in news coverage on November 1, 2026",
    title: "Cyclone Murasu: Red Alert in Andhra Pradesh, Landfall Between Nellore and Narsapur on November 3",
    description:
      "Cyclone Murasu has triggered a red alert in Andhra Pradesh, with landfall between Nellore and Narsapur forecast for November 3 and winds up to 120 kmph.",
    excerpt:
      "Cyclone Murasu, named on November 1, is forecast to cross the south Andhra Pradesh coast between Nellore and Narsapur on November 3 as a severe cyclonic storm.",
    date: "2026-11-01",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Cyclone Murasu is now the storm to watch on India's east coast. The deep depression over the Bay of Bengal intensified into Cyclone Murasu at 11:30 am on Sunday, November 1, 2026, the India Meteorological Department (IMD) confirmed, and within hours Andhra Pradesh was put on red alert, Odisha ordered evacuations from vulnerable areas, and fishermen were told to stay off the sea until Wednesday. It follows Cyclone Arnab by days, while parts of both states are still recovering.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu: where it is now and where it is headed",
      },
      {
        type: "p",
        text: "At 11:30 am on November 1, Cyclone Murasu lay centred over the southwest and adjoining west-central Bay of Bengal, near latitude 12.1 degrees north and longitude 85.3 degrees east, according to the IMD. That put it about 560 km east-southeast of Chennai and 630 km east-southeast of Nellore, moving west-northwest at about 23 kmph. The IMD expects it to intensify further into a severe cyclonic storm over the west-central Bay of Bengal around the morning of November 2, then turn northwest and cross the south Andhra Pradesh coast between Nellore and Narsapur.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu landfall date, time and wind speed",
      },
      {
        type: "p",
        text: "Cyclone Murasu is forecast to cross the south Andhra Pradesh coast between Nellore and Narsapur during the night of November 2 and the early hours of November 3, with the IMD's 2:30 pm bulletin on November 1 narrowing the window to 11:30 pm on Monday to 4 am on Tuesday. At landfall it is expected to be a severe cyclonic storm, with sustained wind speeds of 100 to 110 kmph, gusting to 120 kmph. The IMD also warns of a one-metre storm surge flooding low-lying south coastal Andhra Pradesh, most of all in Bapatla, Krishna and Prakasam.",
      },
      {
        type: "list",
        items: [
          "Named: 11:30 am, Sunday, November 1, 2026, over the southwest and adjoining west-central Bay of Bengal",
          "Severe cyclonic storm stage: expected around the morning of Monday, November 2",
          "Landfall window: 11:30 pm on November 2 to 4 am on November 3, between Nellore and Narsapur",
          "Landfall winds: 100 to 110 kmph, gusting to 120 kmph"
        ],
      },
      {
        type: "h2",
        text: "Cyclone Murasu red alert: which Andhra Pradesh districts are affected",
      },
      {
        type: "p",
        text: "The Meteorological Centre in Visakhapatnam has issued a red alert for coastal Andhra Pradesh for November 2 and 3, with an orange alert for the Rayalaseema region for the next two days. For Monday, November 2, the IMD has put five districts on red alert for extremely heavy rainfall, meaning more than 204 mm in a day: Krishna, Guntur, Bapatla, Prakasam and Nellore. Residents in Krishna, Guntur and Bapatla have been warned not to step outside unless there is an emergency. Seven districts are on orange alert for Monday, East Godavari, West Godavari, Eluru, NTR, Palnadu, Tirupati and Chittoor, and a yellow alert covers Alluri Sitarama Raju, Kakinada, Konaseema, Nandyal, Kadapa and Annamayya. On Tuesday, the red alert shifts to Alluri Sitarama Raju and Eluru.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu rainfall forecast for Andhra Pradesh, Odisha and Tamil Nadu",
      },
      {
        type: "p",
        text: "Heavy to very heavy rainfall is forecast across coastal Andhra Pradesh and Rayalaseema on November 2 and 3, with extremely heavy rainfall possible in isolated areas. Monday's heaviest rain is expected in West Godavari, Eluru, NTR, Krishna, Guntur, Bapatla, Palnadu, Prakasam, Nellore and Tirupati. Odisha's rain increases on November 3 and 4, and northern Tamil Nadu may see moderate rain.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu Odisha alert and evacuations",
      },
      {
        type: "p",
        text: "Odisha has placed its southern region on high alert and ordered the evacuation of people from low-lying areas and hilly terrain, Disaster Management Minister Suresh Pujari said. The state is still running Arnab relief operations in Ganjam and Gajapati. In Andhra Pradesh, residents from low-lying areas are being asked to evacuate and arrangements are being made for them, according to the state disaster management authority. Fishermen have been told not to venture into the sea until Wednesday.",
      },
      {
        type: "h2",
        text: "Why is it called Cyclone Murasu, and what happened with Cyclone Arnab",
      },
      {
        type: "p",
        text: "Cyclone Murasu was named by India from the list of names prepared for the North Indian Ocean under the World Meteorological Organization and the United Nations Economic and Social Commission for Asia and the Pacific. In Tamil, Murasu means an ancient drum, traditionally used in villages to spread important information and alert people to danger, including natural disasters. A name is assigned once a system reaches cyclonic storm intensity. It follows Cyclone Arnab, which brought heavy rainfall and flooding to both states in late October. Officials warn infrastructure already strained by Arnab could be hit again.",
      },
      {
        type: "h2",
        text: "Cyclone Murasu safety steps: what residents should do now",
      },
      {
        type: "steps",
        items: [
          "Follow only official IMD bulletins and state advisories, not unverified social media messages.",
          "If you live in a low-lying or coastal area, be ready to move if an evacuation order is issued.",
          "Keep water, food, medicines, documents and a charged phone ready before November 2.",
          "Do not step outside during the red-alert period unless there is an emergency, and stay away from the sea and flooded roads.",
          "Fishermen should not venture into the sea until Wednesday, as advised by the IMD and the state disaster management authority."
        ],
      },
      {
        type: "h2",
        text: "Cyclone Murasu FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "When will Cyclone Murasu make landfall?", a: "Cyclone Murasu is forecast to cross the south Andhra Pradesh coast between Nellore and Narsapur between 11:30 pm on November 2 and 4 am on November 3, 2026, as a severe cyclonic storm." },
          { q: "How strong will Cyclone Murasu be at landfall?", a: "The IMD forecasts sustained winds of 100 to 110 kmph, gusting to 120 kmph, with a storm surge of about one metre above normal tide flooding low-lying areas of south coastal Andhra Pradesh." },
          { q: "Which districts are on red alert for Cyclone Murasu?", a: "For Monday, November 2, Krishna, Guntur, Bapatla, Prakasam and Nellore are on red alert for extremely heavy rainfall. On Tuesday, November 3, the red alert moves to Alluri Sitarama Raju and Eluru." },
          { q: "What does the name Murasu mean?", a: "Murasu, contributed by India, is the Tamil word for an ancient drum traditionally used to spread important information and alert villages to danger." }
        ],
      },
    ],
  },
  {
    slug: "ramayana-part-1-advance-booking-63-crore-november-1-2026",
    image: "https://images.filmibeat.com/ph-big/2026/10/ramayana-the-introduction-movie-20261793360080_7.jpg",
    imageAlt: "Ranbir Kapoor as Lord Ram in the official Ramayana: Part 1 poster, ahead of the film's November 5, 2026 release",
    title: "Ramayana Advance Booking Crosses Rs 63 Crore Worldwide Ahead of November 5 Release",
    description:
      "Ramayana advance booking has crossed Rs 63 crore worldwide, with Rs 34 crore from India, ahead of the Ranbir Kapoor epic's November 5 release.",
    excerpt:
      "Ramayana: Part 1 has crossed Rs 63 crore in worldwide advance bookings, led by Rs 34 crore from India, four days before its November 5, 2026 release.",
    date: "2026-11-01",
    category: "Cinema",
    sections: [
      {
        type: "p",
        text: "Ramayana advance booking has crossed Rs 63 crore worldwide, and the numbers are still climbing. With four days to go before release, Nitesh Tiwari's Ramayana: Part 1, starring Ranbir Kapoor as Rama, Sai Pallavi as Sita and Yash as Ravana, has sold more than 7.64 lakh tickets in India alone, according to Sacnilk figures reported by The Week on November 1, 2026.",
      },
      {
        type: "h2",
        text: "Ramayana advance booking: the latest worldwide numbers",
      },
      {
        type: "p",
        text: "According to Sacnilk figures reported by The Week on the afternoon of November 1, 2026, Ramayana: Part 1 has reached approximately Rs 63.48 crore gross worldwide: about Rs 34.01 crore from India and around Rs 29.47 crore from overseas. In India, it has sold more than 7.64 lakh tickets across 23,199 shows, covering every date open for booking, not just opening day. Bookings are still open, so treat these as a November 1 snapshot, not a final total.",
      },
      {
        type: "list",
        items: [
          "Worldwide advance booking gross: approximately Rs 63.48 crore",
          "India advance booking gross: approximately Rs 34.01 crore, from more than 7.64 lakh tickets across 23,199 shows",
          "Overseas advance booking gross: approximately Rs 29.47 crore (about $3.50 million)",
          "Opening day (November 5) advance booking in India: approximately Rs 22.77 crore gross",
          "Premium formats (IMAX and Dolby) on opening day: approximately Rs 4.74 crore"
        ],
      },
      {
        type: "h2",
        text: "Ramayana day 1 advance booking in India",
      },
      {
        type: "p",
        text: "The opening day alone accounts for most of the Indian total. For Thursday, November 5, advance bookings in India had reached approximately Rs 22.77 crore gross by the afternoon of November 1. A morning snapshot, reported by Business Today from Sacnilk data, put day 1 at over Rs 22 crore, with about 4.9 lakh tickets sold including blocked seats across 12,631 shows. Premium formats are a big part of the story: IMAX and Dolby shows alone have contributed about Rs 4.74 crore to day 1.",
      },
      {
        type: "h2",
        text: "Which cities and languages are driving Ramayana advance booking",
      },
      {
        type: "p",
        text: "Hindi is carrying the film: about Rs 28.65 crore, or around 84 per cent of the Indian total across all dates, followed by Kannada at about Rs 3.46 crore and Telugu at about Rs 1.66 crore. On day 1, Hindi stood at about Rs 18.20 crore, or 82 per cent of the day 1 gross. By state, Maharashtra leads with about Rs 6.99 crore, followed by Delhi at about Rs 5.74 crore and Karnataka at about Rs 5.62 crore. Among cities, the National Capital Region (NCR) leads with about Rs 5.74 crore, ahead of Mumbai at about Rs 4.54 crore. For day 1, NCR contributed about Rs 3.45 crore and Bengaluru about Rs 3.27 crore with a high 31 per cent occupancy, while Hyderabad stood out at about 38 per cent occupancy.",
      },
      {
        type: "h2",
        text: "Ramayana overseas advance booking: North America leads",
      },
      {
        type: "p",
        text: "Overseas, the film has collected approximately $3.50 million, or about Rs 29.47 crore. North America is the biggest overseas market at around $2.58 million, followed by the United Kingdom at approximately $351,000 and Australia and New Zealand together at about $313,000. The November 4 paid premieres alone have generated more than $1 million. The overseas opening weekend is currently estimated at $2.85 million to $3 million on existing bookings, with more growth expected when the Middle East opens sales.",
      },
      {
        type: "h2",
        text: "The film itself: cast, director and release date",
      },
      {
        type: "p",
        text: "Ramayana: Part 1 is directed by Nitesh Tiwari, best known for Dangal and Chhichhore, and produced by Namit Malhotra's Prime Focus Studios with Yash's Monster Mind Creations. The music is by A. R. Rahman and Hans Zimmer. Ranbir Kapoor plays Rama, Sai Pallavi plays Sita, Yash plays Ravana, Sunny Deol plays Hanuman and Ravi Dubey plays Lakshman. The film releases in five languages and is the first part of a planned two-part adaptation, with part two expected in 2027. Reports put the combined budget of both parts at around Rs 4,000 crore, but the makers have not confirmed a budget.",
      },
      {
        type: "h2",
        text: "How to book Ramayana tickets for November 5",
      },
      {
        type: "steps",
        items: [
          "Open your usual movie ticket booking app or website and search for Ramayana.",
          "Pick your city and cinema, then choose November 5, 2026, for opening day, or November 4 for overseas paid premieres where available.",
          "Choose your format: standard, IMAX or Dolby. Premium formats are selling fastest and cost more.",
          "Select your seats early for popular shows, since top cities already report high day 1 occupancy, and check the timing and language before paying."
        ],
      },
      {
        type: "h2",
        text: "What the Ramayana advance booking numbers mean, and what they do not",
      },
      {
        type: "p",
        text: "Advance booking is a demand signal, not a final verdict. A strong pre-sale total means audiences have committed money before reviews or word of mouth, which is why trade watchers treat it as the best early indicator of opening day. Trade estimates reported by The Week suggest a worldwide opening day of more than Rs 200 crore if momentum continues, but that is an estimate, not a guarantee. Blocked seats, which cinemas hold back and may later release, also lift gross figures slightly above tickets actually sold. The honest reading: with Rs 63 crore banked worldwide, Ramayana: Part 1 is heading for a huge opening.",
      },
      {
        type: "h2",
        text: "Ramayana advance booking FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How much is the Ramayana advance booking total so far?", a: "As of the afternoon of November 1, 2026, about Rs 63.48 crore worldwide, including about Rs 34.01 crore from India and about Rs 29.47 crore overseas, as per Sacnilk figures reported by The Week." },
          { q: "When is Ramayana: Part 1 releasing?", a: "Ramayana: Part 1 releases in India on November 5, 2026, in Hindi, Tamil, Telugu, Kannada and Malayalam, with paid premiere screenings overseas on November 4." },
          { q: "Who stars in Ramayana: Part 1?", a: "Ranbir Kapoor plays Rama, Sai Pallavi plays Sita, Yash plays Ravana, Sunny Deol plays Hanuman and Ravi Dubey plays Lakshman. It is directed by Nitesh Tiwari, with music by A. R. Rahman and Hans Zimmer." },
          { q: "Will the Ramayana advance booking total rise before release?", a: "Yes, almost certainly. Bookings are still open and the totals here are a November 1 snapshot, so the final advance total will be higher, especially once Middle East sales open." }
        ],
      },
    ],
  },
  {
    slug: "azam-khan-14-day-judicial-custody-ed-jauhar-university-november-1-2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c6/Mohammad_Azam_Khan_1.jpg",
    imageAlt: "Samajwadi Party leader Azam Khan speaking into a microphone, file photo",
    title: "Azam Khan Judicial Custody: SP Leader Sent to 14 Days in Jail in ED Jauhar University Case",
    description:
      "Azam Khan judicial custody: SP leader sent to 14-day judicial custody by a Ghaziabad PMLA court in the ED Jauhar University money laundering case.",
    excerpt:
      "A Ghaziabad PMLA court sent Azam Khan to 14-day judicial custody on November 1, 2026, a day after he walked out of Rampur jail on bail and was taken into ED custody.",
    date: "2026-11-01",
    category: "News",
    sections: [
      {
        type: "p",
        text: "Azam Khan judicial custody is the big breaking news out of Uttar Pradesh today, Sunday, November 1, 2026. A special Prevention of Money Laundering Act (PMLA) court in Ghaziabad has sent senior Samajwadi Party leader and former Uttar Pradesh minister Azam Khan to 14 days of judicial custody in the Enforcement Directorate's money laundering case linked to Mohammad Ali Jauhar University and the Jauhar Trust. The order came barely a day after Khan walked out of Rampur jail on bail, only to be taken into ED custody right outside the jail gate.",
      },
      {
        type: "h2",
        text: "Azam Khan judicial custody: what the Ghaziabad court ordered",
      },
      {
        type: "p",
        text: "According to the Free Press Journal and The Times of India, both reporting on November 1, 2026, the special PMLA court in Ghaziabad ordered 14-day judicial custody for Azam Khan on Sunday. He will be lodged in Dasna District Jail in Ghaziabad, not Rampur jail, from where he had been released barely a day earlier. The court also directed the jail superintendent to ensure Khan receives all necessary medical care under prison rules, including his prescribed medicines. He will be produced before the court again on November 13, 2026.",
      },
      {
        type: "p",
        text: "One distinction matters here. The ED had sought custody to question Khan, and his lawyers opposed the remand plea. What the court granted was judicial custody, meaning Khan stays in jail while the investigation continues, rather than in ED custody for interrogation.",
      },
      {
        type: "h2",
        text: "Inside the court hearing: 10.30 am production, 90-minute arguments",
      },
      {
        type: "p",
        text: "The Times of India reports that the ED produced Khan before the special court at around 10.30 am on Sunday amid tight security, with five ED vehicles and more than 100 police and paramilitary personnel escorting him. After about 90 minutes of arguments, the court passed its order.",
      },
      {
        type: "p",
        text: "As he arrived, Khan appeared calm. When journalists asked whether he wanted to say something, he replied in Hindi, \"Ab kya reh gaya hai bolne ko,\" meaning \"What is left to say now?\" The Free Press Journal similarly records him answering \"What is there to say?\" to reporters.",
      },
      {
        type: "h2",
        text: "How Azam Khan went from freedom to custody in less than a day",
      },
      {
        type: "p",
        text: "The custody order follows a dramatic 24 hours. On October 29, 2026, the Allahabad High Court suspended Khan's 10-year sentence in the two PAN card cases and granted bail to him and his son, former MLA Abdullah Azam Khan. The father and son walked out of Rampur jail at around 7.15 pm on Saturday, October 31, after nearly 11 months in custody. As he stepped out, Khan told reporters his only offence was that he, a Muslim, had established a university and built schools for children.",
      },
      {
        type: "p",
        text: "His freedom lasted only minutes. An ED team waiting outside Rampur jail took him into custody in the separate money laundering case, even as his son headed home. He was taken to the ED headquarters in Delhi, examined at RML Hospital after complaining of chest and stomach pain, cleared by specialists, and questioned again, with the agency reportedly putting more than 50 questions to him.",
      },
      {
        type: "h2",
        text: "What the ED alleges in the Jauhar University case",
      },
      {
        type: "p",
        text: "The ED's case, registered in 2019 under the Prevention of Money Laundering Act, concerns the Maulana Mohammad Ali Jauhar Trust and the university in Rampur that Khan founded and where he serves as honorary chancellor. The agency alleges diversion of government funds meant for public works, illegal occupation of farmers' land, and illegal collections from contractors during construction, with alleged proceeds of crime of Rs 426 crore. It had earlier attached the university's land and buildings.",
      },
      {
        type: "p",
        text: "These are allegations under investigation, and judicial custody is not a conviction. Khan has not been convicted in this money laundering case, and his legal team has called the detention illegal and politically motivated, a claim the agency and the ruling party reject.",
      },
      {
        type: "h2",
        text: "Political reactions: SP cries vendetta, BJP says law is equal for all",
      },
      {
        type: "p",
        text: "Samajwadi Party leaders have accused the government of political vendetta, with general secretary Shivpal Singh Yadav alleging the ED acted at its behest to arrest Khan right after his release. BJP leaders have defended the action, with Uttar Pradesh minister AK Sharma saying the law applies equally to everyone.",
      },
      {
        type: "h2",
        text: "Azam Khan judicial custody: what happens next",
      },
      {
        type: "list",
        items: [
          "Khan stays in judicial custody at Dasna District Jail, Ghaziabad, with court-directed medical care under prison rules.",
          "He will be produced before the special PMLA court again on November 13, 2026.",
          "The ED's investigation into the alleged money trail, land deals and fund sources behind Jauhar University and the Trust continues.",
          "The political fallout is set to continue, with the SP framing the arrest as vendetta and the BJP insisting it is straightforward law enforcement."
        ],
      },
      {
        type: "p",
        text: "A leader who walked free on Saturday evening after nearly 11 months is back behind bars on Sunday, in a different jail and a different case, until at least November 13.",
      },
      {
        type: "faq",
        items: [
          {
            q: "Why was Azam Khan sent to judicial custody?",
            a: "A special PMLA court in Ghaziabad sent him to 14-day judicial custody on November 1, 2026, in the ED's money laundering case linked to Jauhar University and the Jauhar Trust.",
          },
          {
            q: "Is Azam Khan in ED custody or judicial custody?",
            a: "Judicial custody. The ED sought custody to question him, but the court ordered judicial custody, so he will be lodged in Dasna District Jail, Ghaziabad.",
          },
          {
            q: "When will Azam Khan be produced in court again?",
            a: "He will be produced before the special PMLA court again on November 13, 2026.",
          },
          {
            q: "Why was Azam Khan arrested a day after his release?",
            a: "He was released from Rampur jail on October 31 after the Allahabad High Court suspended his sentence in the two PAN card cases. Minutes later, the ED took him into custody in the separate Jauhar University money laundering case.",
          },
          {
            q: "What does the ED allege against Azam Khan?",
            a: "The ED alleges diversion of government funds, illegal occupation of farmers' land and illegal collections from contractors in building Jauhar University, with alleged proceeds of crime of Rs 426 crore. These are allegations, not a conviction in this case.",
          }
        ],
      },
    ],
  },
  {
    slug: "farah-khan-dilip-viral-video-privacy-response-november-1-2026",
    image: "https://images.mid-day.com/images/images/2026/nov/Entertainment_91_1793511073060_d.jpg",
    imageAlt: "Farah Khan with her cook Dilip, the pair at the centre of the viral video that Farah Khan responded to on November 1, 2026",
    title: "Farah Khan Dilip Viral Video: Filmmaker Asks for Privacy After Heated Clip Goes Viral",
    description:
      "Farah Khan Dilip viral video explained: what the clip shows, Farah Khan's privacy response, and why she asked fans not to jump to conclusions.",
    excerpt:
      "A clip of Farah Khan and her cook Dilip exchanging heated words went viral on November 1, 2026, and Farah Khan responded on Instagram asking fans to respect their privacy and not jump to conclusions.",
    date: "2026-11-01",
    category: "Pop Culture",
    sections: [
      {
        type: "p",
        text: "The Farah Khan Dilip viral video is the Bollywood clip everyone is talking about today, Sunday, November 1, 2026, and it has now drawn a direct response from Farah Khan herself. A short video featuring the filmmaker and her cook Dilip surfaced online and spread quickly across social media, with viewers debating what exactly was happening in the clip. Within hours, Farah Khan addressed the buzz on Instagram, asking people to respect both her and Dilip's privacy and not to jump to conclusions. Here is what it shows, what she said, and what is still unknown.",
      },
      {
        type: "h2",
        text: "What the Farah Khan Dilip viral video actually shows",
      },
      {
        type: "p",
        text: "According to Mid-day's report on November 1, 2026, the video appears to show Farah Khan and Dilip exchanging heated words. In the clip, Dilip is heard saying, in Hindi, \"Maine kitni baar aapko bola hai,\" which translates roughly to \"How many times have I told you.\" Farah Khan is heard responding, \"Tu mujhe samjhayega?\" meaning \"Will you explain it to me?\" The report adds that on noticing they were being filmed, Farah Khan asked the person recording to stop. That is all the clip itself shows.",
      },
      {
        type: "p",
        text: "That missing context is important, and it is the reason this story needs careful reading. A short clip cut from a longer moment cannot tell viewers why the exchange happened, whether it was serious, light-hearted, or staged for a video, or how it ended. Nothing in the verified reporting so far describes a falling out, a sacking, or any change in Dilip's role, and readers should treat any such claim as speculation unless Farah Khan or Dilip say so themselves.",
      },
      {
        type: "h2",
        text: "Farah Khan's response: \"Please give us privacy\"",
      },
      {
        type: "p",
        text: "As the clip kept spreading, Farah Khan broke her silence on Instagram. In her message, she wrote: \"Guys, please respect Dilip and my privacy. Do not jump to any conclusion (folded hands).\" The message was short, and deliberately so. It did not explain what happened before or after the clip, describe the exchange as a fight, or announce any decision about Dilip. Its one clear request was privacy for both of them.",
      },
      {
        type: "p",
        text: "That response matters because it is the only on-the-record statement from either person in the clip, making it the most reliable part of the story. It directly answers the speculation: Farah Khan is asking viewers not to treat a few seconds of heated-sounding words as the full story.",
      },
      {
        type: "h2",
        text: "Farah Khan Dilip viral video: what is confirmed and what is not",
      },
      {
        type: "list",
        items: [
          "Confirmed: A video of Farah Khan and Dilip exchanging heated-sounding words is circulating online and sparked wide discussion on November 1, 2026.",
          "Confirmed: In the clip, Dilip says \"Maine kitni baar aapko bola hai\" and Farah Khan replies \"Tu mujhe samjhayega,\" and Farah Khan asks the person filming to stop.",
          "Confirmed: Farah Khan responded on Instagram, writing, \"Guys, please respect Dilip and my privacy. Do not jump to any conclusion.\"",
          "Not confirmed: The reason for the exchange, what happened before or after it, or whether it was serious, playful, or part of a shoot.",
          "Not confirmed: Any claim that Dilip has left or that the pair have fallen out. No verified report or statement says so."
        ],
      },
      {
        type: "h2",
        text: "Who is Dilip, and why did this clip blow up so fast?",
      },
      {
        type: "p",
        text: "Dilip is Farah Khan's cook, and over the past couple of years he has become a star in his own right. Farah Khan launched her YouTube cooking series in 2024, built around home-cooked meals and celebrity guests in her kitchen, and Dilip quickly became the breakout face of those vlogs. His deadpan remarks and easy back-and-forth with Farah Khan turned him into a fan favourite.",
      },
      {
        type: "p",
        text: "That fame is exactly why a clip like this travels so fast. Dilip is no longer a background figure in someone else's videos; he is a recognisable personality with his own following, and Farah Khan has spoken in the past about how the channel's success changed his life, including helping him financially. When a familiar pairing appears to argue on camera, fans react instantly, and the clip gets shared before anyone has the full picture.",
      },
      {
        type: "h2",
        text: "Social media reaction to the Farah Khan Dilip clip",
      },
      {
        type: "p",
        text: "Online reaction has split in two directions. Some viewers treated the clip at face value and wondered what had gone wrong, while many others urged caution, noting that a few seconds of video prove very little. For now, the most sensible reading is Farah Khan's own: do not jump to conclusions.",
      },
      {
        type: "h2",
        text: "What happens next for Farah Khan and Dilip?",
      },
      {
        type: "p",
        text: "Neither Farah Khan nor Dilip has given any further explanation, and there is no verified sign of any change to their videos or working relationship. Viewers should wait for something official rather than filling the gap with rumours. Until then, the story stands as a viral clip, a privacy request, and a lesson in how quickly a few seconds of video can outrun the facts.",
      },
      {
        type: "faq",
        items: [
          {
            q: "What is the Farah Khan Dilip viral video?",
            a: "It is a short clip circulating online on November 1, 2026, that appears to show Farah Khan and her cook Dilip exchanging heated words. Its full context is not visible.",
          },
          {
            q: "What did Farah Khan say about the viral video?",
            a: "Farah Khan responded on Instagram, writing, \"Guys, please respect Dilip and my privacy. Do not jump to any conclusion.\" She did not explain the exchange or announce any decision about Dilip.",
          },
          {
            q: "Did Farah Khan and Dilip have a fight?",
            a: "That has not been confirmed. Without what happened before or after the brief exchange, it cannot be described as a confirmed fight or falling out.",
          },
          {
            q: "Who is Dilip, Farah Khan's cook?",
            a: "Dilip is the cook who became a fan favourite through Farah Khan's YouTube cooking vlogs, launched in 2024. His on-screen banter with her made him a personality in his own right.",
          },
          {
            q: "Has Dilip left Farah Khan's videos?",
            a: "No verified report or statement says so. Such claims are speculation, and Farah Khan's message asked people not to jump to conclusions.",
          }
        ],
      },
    ],
  },
  {
    slug: "fortnite-treasure-hunters-one-piece-season-live-november-1-2026",
    image: "https://i.ytimg.com/vi/WKTOfvqL-bc/maxresdefault.jpg",
    imageAlt: "Official Fortnite Treasure Hunters key art with Monkey D. Luffy, Buggy, Zoro and the Straw Hat crew over the new pirate island",
    title: "Fortnite Treasure Hunters One Piece Season Goes Live Today: v43.00 Downtime, Skins, Map and India Timings",
    description:
      "Fortnite Treasure Hunters One Piece season goes live November 1, 2026: v43.00 downtime, India timings, Battle Pass and Shop skins, and the Crossbones Isle map.",
    excerpt:
      "Fortnite's Treasure Hunters mini-season goes live today, November 1, 2026, as the v43.00 update takes servers offline from 10:30 AM IST and brings the One Piece crossover, a new 80-player island and Devil Fruit mythics.",
    date: "2026-11-01",
    category: "Gaming",
    sections: [
      {
        type: "p",
        text: "Fortnite Treasure Hunters, the One Piece mini-season, goes live today, Sunday, November 1, 2026, and players in India are watching the clock. Epic Games has taken Fortnite offline for the v43.00 update, with downtime starting at 10:30 AM IST, as the game swaps its Chapter 7 Season 4 Override island for a brand-new pirate island built around the Straw Hat Pirates. The Treasure Hunters season closes out Chapter 7 and runs until December 5, 2026, when Epic has confirmed a live end event. Below: the downtime and India timings, the Battle Pass and Item Shop skins, the new map, and the Devil Fruit mythics.",
      },
      {
        type: "h2",
        text: "Fortnite Treasure Hunters downtime today: India timings and when servers return",
      },
      {
        type: "p",
        text: "Epic's Fortnite Status account confirmed that downtime for v43.00 begins at 1 AM ET on November 1, with matchmaking ending shortly beforehand. In India that works out to a 10:30 AM IST start, and reports put the expected maintenance window at roughly three hours, until about 1:30 PM IST. New seasons usually take a few hours to come back online, and Epic can extend maintenance if the update hits problems, so the exact moment servers reopen is not fixed in advance. The safest check is the official Fortnite Status account, which posts when matchmaking closes and when servers are back. Players who pre-downloaded the v43.00 update can jump in as soon as servers reopen.",
      },
      {
        type: "h2",
        text: "Fortnite One Piece skins: Battle Pass and Item Shop schedule",
      },
      {
        type: "p",
        text: "Epic has split the One Piece roster between the Battle Pass and the Item Shop, and the split matters because the most wanted character is not in the pass. The Treasure Hunters Battle Pass names Portgas D. Ace and Nico Robin as its One Piece headliners, alongside new anime-styled looks for Jonesy, Cuddle Team Leader and Charlotte. Monkey D. Luffy, Nami and Usopp arrive in the Item Shop at season launch on November 1, so Luffy is a Shop purchase, not a Battle Pass reward. Roronoa Zoro, Sanji and a Chopper Sidekick follow on November 7, and Buggy the Clown is listed for November 13. Beyond One Piece, the season brings pirate Hatsune Miku, Kasane Teto, Lil Uzi Vert and A$AP Rocky, with A$AP Rocky and Lil Uzi Vert also getting their own locations on the new map. Epic has not published individual V-Bucks prices for every Shop outfit in its season announcement, so treat fan-made price lists as unconfirmed until the Shop itself refreshes.",
      },
      {
        type: "list",
        items: [
          "Treasure Hunters Battle Pass: Portgas D. Ace, Nico Robin, plus anime looks for Jonesy, Cuddle Team Leader and Charlotte",
          "Item Shop at launch, November 1: Monkey D. Luffy, Nami and Usopp",
          "Item Shop, November 7: Roronoa Zoro, Sanji and a Chopper Sidekick",
          "Item Shop, November 13: Buggy the Clown",
        ],
      },
      {
        type: "h2",
        text: "Crossbones Isle: Fortnite's new 80-player map and its One Piece locations",
      },
      {
        type: "p",
        text: "Treasure Hunters replaces the usual 100-player island with Crossbones Isle, a smaller skull-shaped island built for 80 players, with 12 named points of interest. The map is packed with places One Piece fans will recognise: Loguetown, Arlong Park and Windmill Village, plus the Baratie, alongside treasure-themed spots like The Chest. The Going Merry, the Straw Hats' first ship, replaces the Battle Bus for the season, carrying players over the island before they drop. The smaller player count and tighter map are designed to make treasure hunts and crew fights break out faster than on a full-size island, which fits a mini-season built around racing rival crews to loot.",
      },
      {
        type: "h2",
        text: "One Piece mythics, Devil Fruits and weekly captains in Treasure Hunters",
      },
      {
        type: "p",
        text: "The October 30 gameplay trailer confirmed Devil Fruits as new mythic items: Luffy's Gum-Gum Fruit powers, Ace's Flame-Flame Fruit, Zoro's Three Sword Style and Usopp's Slingshot are all in, alongside a Shock Rocket tied to the season's battleship location. Epic's plan is that each week a new captain arrives with their own crew and point of interest, with the Straw Hats and A$AP Rocky leading week one and the first Captain's Day scheduled for 9 AM ET on November 1. The mini-season runs for just over a month and ends with a Chapter 7 live event on Saturday, December 5, 2026, though Epic has not revealed the event's start time or details yet. The season was first teased on October 24, when the Going Merry sailed out of the fog in-game, and the full season trailer followed on October 27.",
      },
      {
        type: "h2",
        text: "How to play Fortnite Treasure Hunters in India today",
      },
      {
        type: "steps",
        items: [
          "Update Fortnite to v43.00 on your platform, or let the pre-downloaded update apply once maintenance ends.",
          "Wait out the downtime, which began at 10:30 AM IST on November 1 and is expected to last roughly three hours; check the Fortnite Status account for the all-clear.",
          "Before spending V-Bucks, check whether the outfit you want is in the Battle Pass or the Item Shop: Ace and Robin are in the pass, while Luffy, Nami and Usopp are Shop items at launch.",
          "Drop on Crossbones Isle, hunt treasure chests, and try the Devil Fruit mythics and weekly captain events as they rotate through the season.",
        ],
      },
      {
        type: "faq",
        items: [
          {
            q: "When does Fortnite Treasure Hunters start in India?",
            a: "Downtime for the v43.00 update began at 10:30 AM IST on November 1, 2026, and is expected to last roughly three hours. The season is playable once Epic confirms servers are back online.",
          },
          {
            q: "Is Luffy in the Treasure Hunters Battle Pass?",
            a: "No. Luffy arrives in the Item Shop at season launch on November 1. Portgas D. Ace and Nico Robin are the One Piece characters in the Battle Pass.",
          },
          {
            q: "When does the Fortnite Treasure Hunters season end?",
            a: "The mini-season ends on December 5, 2026, with a Chapter 7 live event. Epic has not yet revealed the event's start time or details.",
          },
          {
            q: "Is Fortnite Treasure Hunters free to play?",
            a: "Fortnite Battle Royale is free to play, and the Treasure Hunters island is part of the game. The Battle Pass and Item Shop outfits are paid extras bought with V-Bucks.",
          },
        ],
      },
    ],
  },
  {
    slug: "binance-hack-6-3-billion-fbi-north-korea-withdrawals-november-1-2026",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png",
    imageAlt: "The gold Binance logo, the cryptocurrency exchange hit by the October 2026 hack",
    title: "Binance Hack: $6.3 Billion Stolen, FBI Blames North Korea, 90% Recovered as Withdrawals Reopen November 1",
    description:
      "Binance hack update: $6.3 billion stolen, FBI blames North Korea's TraderTraitor, 90% replenished and withdrawals reopening November 1, 2026.",
    excerpt:
      "Binance says it has replenished 90% of the roughly $6.3 billion stolen in its October 2026 hack, as the FBI blames North Korea and withdrawals reopen in phases from November 1, 2026.",
    date: "2026-11-01",
    category: "Tech",
    sections: [
      {
        type: "p",
        text: "The Binance hack is the biggest crypto story of the week. Binance, the world's largest crypto exchange, says it has replenished 90% of the roughly $6.3 billion stolen from its hot wallets on October 29, 2026. The FBI has blamed North Korea's TraderTraitor group, and withdrawals reopen in phases from Sunday, November 1, 2026.",
      },
      {
        type: "h2",
        text: "Binance hack: what happened on October 29, 2026",
      },
      {
        type: "p",
        text: "Binance reported a cyberattack on its hot wallets, the internet-connected wallets used for withdrawals. TRM Labs says the transfers began at 20:05 UTC on October 29, around 1.35 am IST on October 30, and most of the theft happened within about 20 minutes. Binance puts the loss at approximately $6.3 billion; TRM Labs calculates about $6.36 billion and Elliptic about $6.43 billion. Either way, it is the largest crypto exchange theft on record, roughly four times the approximately $1.5 billion Bybit theft of February 2025. Binance then suspended withdrawals for security checks, while deposits kept working.",
      },
      {
        type: "h2",
        text: "FBI blames North Korea's TraderTraitor for the Binance hack",
      },
      {
        type: "p",
        text: "On Saturday, October 31, 2026, the FBI said North Korea was responsible for the theft of more than $6 billion from Binance on or about October 29, naming the activity TraderTraitor. The FBI said members of the unit were observed converting stolen assets into Ethereum, and warned that further laundering is expected. TRM Labs, Chainalysis and Elliptic had attributed it to TraderTraitor earlier, with high confidence, but no government had formally attributed it until now.",
      },
      {
        type: "h2",
        text: "How did the attackers get in?",
      },
      {
        type: "p",
        text: "Binance co-CEO Richard Teng described a complex attack involving a compromised laptop and malicious software designed to delete evidence. Binance first identified a potentially compromised laptop belonging to an engineer running its systems, then found more breach points. It says it has found no evidence of leaked wallet private keys, and a full post-mortem is still to come. TRM Labs points to a compromise of Binance's signing infrastructure, not a break of Bitcoin's or Ethereum's ledgers. On Ethereum, the attackers used EIP-7702 authorisations to install instructions that could drain wallets.",
      },
      {
        type: "h2",
        text: "Binance hack recovery: 90% replenished, 10 major tokens fully backed",
      },
      {
        type: "p",
        text: "In its third security update on October 31, Binance said it had replenished 90% of the stolen assets, up from about 80% before. Teng said on X that users will not bear the impact, and Binance is committed to covering the remaining 10% in less liquid tokens. Binance also confirmed 10 major cryptocurrencies are now fully backed at 100%: Bitcoin (BTC), Ethereum (ETH), Tether (USDT), BNB, Solana (SOL), USD Coin (USDC), XRP, USD1, RLUSD and ZEC.",
      },
      {
        type: "h2",
        text: "Where the recovery money comes from: SAFU, Futures fund and treasury",
      },
      {
        type: "p",
        text: "Binance says it has set aside more than $6.34 billion of company funds to cover the losses, from three sources: a partial deployment of its Secure Asset Fund for Users (SAFU), a portion of its Futures Insurance Fund, and its corporate treasury. SAFU, created in July 2018, is an emergency reserve funded from trading fees. Binance says it will deploy part of SAFU over the next 24 hours and restore the fund to approximately $1 billion.",
      },
      {
        type: "h2",
        text: "About $3 billion frozen is not the same as recovered",
      },
      {
        type: "p",
        text: "Binance reports approximately $3 billion frozen, working with law enforcement and intelligence firms; Elliptic independently identified $2.84 billion, 94% of it stablecoins. Frozen is not the same as returned.",
      },
      {
        type: "h2",
        text: "Binance withdrawals reopen November 1: what to expect",
      },
      {
        type: "p",
        text: "Binance says it remains on track to reopen withdrawals on Sunday, November 1, 2026, in phases and subject to security checks. Expect a token-by-token restart, possible queues and possibly lower limits at first. It has also taken a fresh proof-of-reserves snapshot as of 00:00 UTC on October 31; the full zero-knowledge proof, letting holders of the 10 fully backed tokens verify backing of at least 1:1, is expected by November 3, 2026. Proof of reserves is useful, but it is not a financial statement audit.",
      },
      {
        type: "h2",
        text: "What Binance users should do now",
      },
      {
        type: "steps",
        items: [
          "Check notices only through Binance's official app or website, and ignore unsolicited messages offering recovery help.",
          "Never share your wallet private keys or recovery phrase with anyone, including anyone offering paid recovery help.",
          "Keep copies of your statements and transaction records from around October 29, 2026.",
          "When withdrawals reopen, double-check the address and network before confirming, as a wrong one can mean a permanent loss.",
          "Expect queues and a phased restart: if your token is not available immediately, wait for Binance's next official update.",
          "Once the proof-of-reserves report is published, check whether your holdings are covered."
        ],
      },
      {
        type: "h2",
        text: "What the Binance hack means for Indian users",
      },
      {
        type: "p",
        text: "India has already seen a major custody breach: Elliptic estimated approximately $235 million stolen from WazirX on July 18, 2024. Registration with India's Financial Intelligence Unit is not a guarantee against theft or reimbursement, and the Finance Ministry has warned there may be no regulatory recourse for crypto losses.",
      },
      {
        type: "h2",
        text: "Binance hack FAQs",
      },
      {
        type: "faq",
        items: [
          { q: "How much was stolen in the Binance hack?", a: "Binance estimates approximately $6.3 billion, while TRM Labs estimates $6.36 billion and Elliptic $6.43 billion." },
          { q: "Who does the FBI blame for the Binance hack?", a: "On October 31, 2026, the FBI blamed North Korea's state-sponsored TraderTraitor group, saying its members were observed converting stolen assets into Ethereum." },
          { q: "Is my money safe on Binance after the hack?", a: "Binance says users will not bear the impact, with 90% replenished. Watch the proof-of-reserves report due by November 3 and whether withdrawals work normally." },
          { q: "When will Binance withdrawals resume?", a: "Binance says it remains on track to reopen withdrawals in phases from Sunday, November 1, 2026, subject to security checks. Expect a token-by-token restart and possible queues." },
          { q: "What is SAFU in the Binance hack recovery?", a: "SAFU, the Secure Asset Fund for Users, is Binance's emergency reserve from July 2018. Binance is using part of it, plus its Futures fund and treasury, and will restore it to about $1 billion." },
          { q: "Has the stolen crypto been recovered?", a: "Not in full. About $3 billion is frozen, but frozen assets are not yet returned funds. Binance is buying replacements and says 90% has been replenished." }
        ],
      },
    ],
  },
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
