/* =========================================================
   CONTENT.JS — All editable website text lives here.
   Edit this file to update what appears on the page.
   No JSX knowledge required.
   =========================================================

   HOW TO EDIT:
   - Find the section you want (headers below act as a map)
   - Change the string value on the right of the colon
   - Save and reload the page in your browser
   - Avoid deleting keys — the page components expect them
   ========================================================= */

const CONTENT = {

  // -------------------------------------------------------
  // PERSONAL
  // Core identity fields used throughout the site —
  // in the nav, footer, CV section, and hero areas.
  // -------------------------------------------------------
  name:        "Eden Goodwin",
  pronouns:    "she/her or they/them",
  role:        "Ph.D candidate",         // shown in Variation B sidebar
  institution: "Carleton University",         // shown in nav and at-a-glance
  department:  "Department of Chemistry",
  location:    "Ottawa, ON",
  address:     "Steacie Building\n1125 Colonel By Dr\nOttawa, ON",  // footer; \n = line break
  email:       "eden.goodwin@carleton.ca",
  orcid:       "0000-0001-5680-468X",
  orcidUrl:    "https://orcid.org/0000-0001-5680-468X",
  scholarUrl:  "https://scholar.google.com/citations?user=Pb9uWMgAAAAJ",
  hIndex:      "4",
  citations:   "240+",
  available:   "Fall 2026",
  lastUpdated: "2026-05-07",   // ISO date shown in footer and Variation B
  siteVersion: "v. 2026.05",  // version string shown in footer

  // -------------------------------------------------------
  // HERO
  // Text at the very top of the page.
  // A/B/C variants each have their own lede and headline.
  // cta* are the call-to-action button labels.
  // -------------------------------------------------------
  hero: {
    tag:          "TENURE-TRACK · FALL 2026",
    tagB:         "On the market · Tenure-track · Fall 2026",
    subheadC:     "Eden Goodwin · Carleton University · est. grad 2026",
    headlineA:    "Designing small molecules that teach surfaces where to grow, atom by atom.",
    headlineB:    "Atomic layer chemistry\nfor the ångström era.",
    headlineC:    "Angstrom\nchemistry.",
    ledeA:        "I develop precursors and process windows for area-selective deposition, atomic layer restructuring, and the next generation of microelectronics manufacturing — the chemistry behind Moore's law in the ångström era.",
    ledeB:        "Precursor design · area-selective deposition · atomic layer restructuring. Building the chemistry that keeps Moore's law moving past 2 nm.",
    ledeC:        "A candidate for tenure-track faculty positions developing small-molecule precursors, area-selective ALD, and atomic layer restructuring — the chemistry inside the tools building tomorrow's microelectronics.",
    thesisC:      "I develop small molecules for advanced atomic layer processes — the ligand chemistry that pushes Moore's law into the ångström era — and I build new tools that compartmentalize the coupled problems of selectivity, volatility, and reactivity in the gas phase.",
    ctaExplore:   "▸ Explore interactive models",
    ctaCV:        "⤓ Download CV (PDF)",  // TODO: update href in source.html once CV PDF path is known
    ctaDemos:     "▸ Interactive demos",
    ctaFullCV:    "⤓ Full CV",
  },

  // -------------------------------------------------------
  // STATS
  // Bold numbers shown in the hero of Variation B and C.
  // Update these whenever publications/talks change.
  // statLabels are the descriptor lines below each number (Variation B).
  // -------------------------------------------------------
  stats: {
    papers:    "07",
    models:    "03",
    talks:     "25",
    citations: "∢100",
    available: "Fall '26",
  },
  statLabels: {
    papers:    "Peer-reviewed publications",
    models:    "Interactive models",
    talks:     "Conference presentations",
    citations: "Total citations",
  },

  // -------------------------------------------------------
  // AT A GLANCE
  // Small sidebar card in Variation A (right of the hero).
  // -------------------------------------------------------
  glance: {
    institution: "Carleton University",
    group:       "Goodwin Lab",
    focus:       "Atomic layer chem.",
    teaching:    "Inorganic · Mat. chem.",
    available:   "Fall 2026",
  },

  // -------------------------------------------------------
  // PULL QUOTE
  // Italic quote shown in the sidebar of Variation A.
  // -------------------------------------------------------
  pullQuote: {
    text:   "Pedagogy and research are intractable from one another. One can only flourish with the other.",
    source: "— teaching statement",
  },

  // -------------------------------------------------------
  // RESEARCH PROJECTS
  // Three project cards used by all variations.
  //   title/body     → Variation A long-form card
  //   titleB/bodyB   → Variation B compact card
  //   tag            → coloured pill label
  //   pills          → keyword tags at bottom of Var A card
  // -------------------------------------------------------
  projects: [
    {
      num:    "01",
      tag:    "METROLOGY",
      title:  "Compartmentalizing volatility, selectivity, reactivity",
      titleB: "Tools for analyzing precursors, processes and surfaces",
      body:   "Atomic layer processes fail in coupled ways. I build simple experimental tests and inexpensive computational screens that isolate each failure mode — so a precursor that works on paper doesn't become a six-month dead end in a reactor.",
      bodyB:  "Low-cost experimental and computational screens that flag a bad precursor before it flags the reactor.",
      pills:  ["TGA / DSC", "Screening", "DFT", "QCM / QMS"],
      img:    "assets/TOC/pub06_toc.png",   // ← swap path to change the scheme shown
    },
    {
      num:    "02",
      tag:    "SMALL MOLECULE DESIGN",
      title:  "NHCs as small molecule",
      titleB: "Small molecules for ALD",
      body:   "A precursor toolkit for sub-2-nm nodes — compact thermal windows, engineered volatility, and by-products that don't poison downstream steps. Each ligand is tuned to isolate a single failure mode: selectivity, volatility, or reactivity.",
      bodyB:  "Thermally stable, volatile precursors whose ligands are tuned to a single failure mode at a time.",
      pills:  ["Hf precursors", "Thermolysis", "Area-selective ALD"],
      img:    "assets/TOC/pub04_toc.png",   // ← swap path to change the scheme shown
    },
    {
      num:    "03",
      tag:    "NOVEL ATOMIC LAYER PROCESSES",
      title:  "True-Zero Smoothing: Atomic Layer Restructuring",
      titleB: "Atomic layer restructuring",
      body:   "Rather than treating a deposited film as final, ALR uses alternating gas-phase reactions to reorganize metal-oxide networks post-deposition — improving crystallinity, closing pinholes, and enabling nanoscale architectures beyond the reach of lithography.",
      bodyB:  "Post-deposition gas-phase cycles that rebuild film networks without a vacuum break.",
      pills:  ["ALR", "CMP", "Post Construction Modification"],
      img:    "assets/TOC/pub05_toc.png",   // ← swap path to change the scheme shown
    },
  ],

  // -------------------------------------------------------
  // RESEARCH THREADS (Variation C only)
  // Four compact entries in the typographic layout.
  //   n = number label, t = thread title, d = one-line descriptor
  // -------------------------------------------------------
  researchThreadsC: [
    { n: "01", t: "Precursor design",           d: "Small molecules with decoupled failure modes." },
    { n: "02", t: "Area-selective ALD",          d: "Growth that knows where to land." },
    { n: "03", t: "Atomic layer restructuring",  d: "Post-deposition gas-phase reorganization." },
    { n: "04", t: "Diagnostic screens",          d: "Tests that catch dead ends early." },
  ],

  // -------------------------------------------------------
  // IDENTITY BLOCK (Variation B only)
  // The narrow left sidebar in the dashboard layout.
  // cvBtn is the label on the CV download button.
  // -------------------------------------------------------
  identityB: {
    name:  "EDEN GOODWIN",
    role:  "Postdoctoral Fellow",
    inst:  "Carleton University",
    orcid: "ORCID · 0000-0001-5680-468X",
    h:     "h-index · 4",
    cites: "citations · 100",
    cvBtn: "⤓ CV.pdf · 184 kb",
  },

  // -------------------------------------------------------
  // SECTION HEADERS & LEDE TEXT
  // Labels and short paragraphs that open each page section.
  // The § numbers are just visual labels — fine to change.
  // varC* are the section sidebar labels in Variation C.
  // cvTabs are the tab labels in the CV section.
  // -------------------------------------------------------
  sections: {
    research:  "§ 02 — Research portfolio",
    researchH: "Three threads, one problem.",
    demos:     "§ Interactive models",
    demosH:    "Play with the chemistry.",
    demosLede: "Three small, runnable models that capture the shape of the problems I work on — adsorption equilibria, thermal stability, and the pulse / purge rhythm of an ALD cycle. Move the sliders.",
    pubs:      "§ 03 — Publications & Patents",
    pubsH:     "Selected writing.",
    cv:        "§ 04 — Curriculum vitae",
    teaching:  "§ 05 — Teaching",
    teachingH: "Pedagogy and research are intractable from each other.",
    teachingLede: "One can only flourish with the other. I have taught two years of large first-year cohorts at Carleton (300+ and 80+ students) with student evaluations averaging above 4.2 / 5, and I founded a 6 hr/week Chemistry Help Room whose attendees outperformed peers by 15% on test-based evaluations.",
    varCThesis:   "§ 01 — Thesis",
    varCResearch: "§ 02 — Research",
    heroLabelA:   "Assistant Professor candidate",
  },

  // CV section tab labels (keys must stay in this order)
  cvTabs: [
    { key: "education",     label: "Education" },
    { key: "exchanges",     label: "Research exchanges" },
    { key: "positions",     label: "Teaching & positions" },
    { key: "grants",        label: "Research grants" },
    { key: "awards",        label: "Fellowships & awards" },
    { key: "presentations", label: "Presentation awards" },
    { key: "mentorship",    label: "Mentorship" },
    { key: "service",       label: "Service & outreach" },
  ],

  // -------------------------------------------------------
  // FOOTER
  // Bottom bar of every page variant.
  // -------------------------------------------------------
  footer: {
    bio: "Developing atomic layer processes for the angstrom era of microelectronics. Open to tenure-track positions beginning Fall 2026.",
    copyright: "© 2026 Eden Goodwin",
    geo: "Ottawa · Canada",
    coords: "45.3876° N, 75.6960° W",
  },

  // -------------------------------------------------------
  // CV SECTION
  // Text shown at the top of the CV section (§ 05).
  // cvItems holds the structured entries for each tab; keys
  // must match the key fields in cvTabs above.
  // Each entry: { date, title, sub } — sub may contain HTML.
  // -------------------------------------------------------
  cvBlurb: "Small molecule and materials chemist with 6 years of expertise in thermal characterization, modelling, and in-situ metrology. Expert in translating molecular design into functional atomic layer processes for sustainability and miniaturization of integrated circuit design.",

  cvItems: {
    education: [
      { date: "2021 — 2026", title: "Ph.D., Chemistry",
        sub: 'Carleton University · Advisor: Prof. Seán T. Barry<br/><em style="color:var(--ink-3)">Thesis: N-Heterocyclic Carbenes in Atomic Layer Processes</em>' },
      { date: "2020",        title: "M.Sc., Chemistry",
        sub: "Carleton University · Fast-tracked to Ph.D. · Advisor: Prof. Seán T. Barry" },
      { date: "2013 — 2018", title: "B.Sc. (Hons.), Chemistry & Physics",
        sub: 'Carleton University · Thesis: ALD of Fluorinated Tin Oxide<br/><span style="color:var(--ink-3)">Supervisor: Prof. Seán T. Barry</span>' },
    ],
    exchanges: [
      { date: "Mar — May 2026", title: "Visiting Researcher", sub: "Helsinki University · Group of Prof. Mikko Ritala" },
      { date: "May — Jun 2023", title: "Visiting Researcher", sub: "University of Western Ontario · Group of Prof. Paul J. Ragogna" },
      { date: "2020",           title: "Research Collaborator", sub: "TU Delft · Group of Prof. Ruud Van Ommen" },
    ],
    positions: [
      { date: "2024 — 2025", title: "Course Instructor — CHEM 1101",      sub: "1st-year Engineering Chemistry · 300+ students · 4.23 / 5 SEQ" },
      { date: "2024 — 2025", title: "Course Instructor — CHEM 1001 / 1002", sub: "1st-year General Chemistry · 80+ students · 4.30 / 5 SEQ" },
      { date: "2019 — 2026", title: "Teaching Assistant",                  sub: "CHEM 1101, 2501, 3503/3504 · Tutorial &amp; lab duties" },
      { date: "2020 — 2022", title: "Co-Treasurer & Administrative Manager", sub: "Ottawa Street Medics · 20 hr / week · ~$130k in donations managed" },
    ],
    grants: [
      { date: "2025", amount: "$20,000", title: "NHCs in Molecular Layer Deposition",               sub: "C2MCI · HQP Funding Competition" },
      { date: "2024", amount: "$20,000", title: "NHCs as Molecular Transistors",                    sub: "C2MCI · HQP Funding Competition" },
      { date: "2023", amount: "$20,000", title: "Metallocene-Functionalized NHCs as Redox Active Monolayers", sub: "C2MCI · HQP Funding Competition" },
      { date: "2023", amount: "$2,000",  title: "SAPP Funding Competition",                          sub: "Carleton University" },
    ],
    awards: [
      { date: "2023 — 2026", amount: "$101,000", title: "NSERC PGS-D",                    sub: "Natural Sciences &amp; Engineering Research Council of Canada" },
      { date: "2025",        amount: "$5,000",   title: "C2MCI Research Excellence Award", sub: "Carbon to Metal Coating Institute" },
      { date: "2023",        amount: "$10,000",  title: "C2MCI EDII Fellowship",            sub: "Carbon to Metal Coating Institute" },
      { date: "2021 — 2023", amount: "$25,000",  title: "Queen Elizabeth II Graduate Scholarship", sub: "Government of Ontario" },
      { date: "2026",                            title: "J.W. Apsimon Graduate Award",     sub: "Carleton University Department of Chemistry" },
      { date: "2020 — 2024", amount: "$20,000",  title: "Department of Chemistry Graduate Scholarship", sub: "Carleton University" },
      { date: "2022",                            title: "Dorothy O'Connell Community Champion Award", sub: "Ottawa Street Medics — public service award" },
    ],
    presentations: [
      { date: "2024", title: "Best Poster · Micro Division",     sub: "C2MCI Annual General Meeting · $200" },
      { date: "2024", title: "Best Oral Presentation",           sub: "Area-Selective Deposition (ASD) · $200" },
      { date: "2023", title: "Top 10 Best Student Presentation", sub: "TechCon" },
      { date: "2023", title: "Best Student Paper Finalist",      sub: "ALD/ALE · $500" },
      { date: "2022", title: "CSC Best Oral Presentation",       sub: "Inorganic Discussion Weekend · $100" },
      { date: "2021", title: "Best Oral in Division",            sub: "Ottawa-Carleton Chemistry Institute · $50" },
    ],
    mentorship: [
      { date: "2024",        title: "Chloe French",        sub: "Funded by C2MCI 2024" },
      { date: "2023",        title: "Arina Sherstyuck",    sub: "Funded by C2MCI 2023 · presented at international conference · graduated with honours" },
      { date: "2022 — 2023", title: "Gabriel Larrivee",    sub: "Funded by C2MCI 2022 · graduated with honours · now graduate student" },
      { date: "2023",        title: "Marshall Atherton",   sub: "Funded by SAPP 2022 · now Ph.D. student in the Barry Lab" },
      { date: "2021 — 2022", title: "Linh Lam",            sub: "Honours thesis student · graduated with honours" },
    ],
    service: [
      { date: "2025 —", title: "Pride Committee — Volunteer",            sub: "Canadian Institute of Chemistry · CSC 2026 Pride programming" },
      { date: "2023 —", title: "Leadership Committee — C2MCI",           sub: "Institutional outreach &amp; EDII initiatives" },
      { date: "2024",   title: "Gender Affirmation Committee — CUPE 4600", sub: "Reviewed financial-aid applications from transgender members" },
      { date: "2025",   title: "Volunteer Coordinator — CSC 2025 (Ottawa)", sub: "Recruited &amp; supported a team of 50 volunteers" },
      { date: "2024",   title: "Organizing Committee — OCCI / ASD",      sub: "Conference scheduling, design, proceedings" },
      { date: "2023 —", title: "C2MCI Conference Volunteer",             sub: "Topic workshopping &amp; invited-speaker outreach" },
      { date: "2021",   title: "Carleton Trans Advocacy Group — Panel Member", sub: "Advised on the needs of transgender STEM students" },
      { date: "2012 — 2016", title: "Drop-In Facilitator",              sub: "Youth Service Bureau · LGBTQ+ youth (14–25) · 5 hr / week" },
    ],
  },

  // cvStats: five [bigNumber, label] pairs shown as a quick stats strip.
  // papers = published only; talks = all contributed (hero shows invited-only subset)
  cvStats: [
    ["07",    "Peer-reviewed papers"],
    ["3",     "Patents filed"],
    ["21",    "Contributed talks"],
    ["6",     "Best presentation awards"],
  ],
  // Awards & grants totals are computed live from cvItems — do not add them here.

  // -------------------------------------------------------
  // WRITING (§ 04) — publications and patents in one list, year-descending.
  // type    → "Article" | "Chapter" | "Patent"
  // status  → free text shown below venue (omit for patents)
  // doi     → DOI URL string, or omit to hide the link
  // preprint → preprint URL string, or omit to hide the link
  // Patent numbering: n is the patent number (displayed as P1, P2, …)
  // Article/Chapter numbering: n is the pub number (displayed as 01, 02, …)
  // -------------------------------------------------------
  writing: [
    { n: 11, year: 2026, type: "Article", status: "In Preparation",
      title: "Atomic Layer Processing: Surfaces, Surfactants, and the interplay between",
      authors: "Goodwin, E.; Norouziyan, S.; Rogers, A.; Atherton, M. T.; Bentley, J. N.; Deijkers, J. H.; Bakiro, M.; Dimova, D.; Barry, S. T.",},
    { n: 10, year: 2026, type: "Article", status: "In Preparation",
      title: "N,N′-chelating ligands for vapor phase precursors",
      authors: "Obenlüneschloß, J.; Goodwin, E.; Alderman, M.; Upadhyay, A.; Barry, S. T.; Devi, A.",
      venue: "Eur. J. Inorg. Chem." },
    { n: 9, year: 2026, type: "Article", status: "In Submission",
      title: "Self-Assembled Monolayers of N-Heterocyclic Carbenes for Nano-electronic Interfaces",
      authors: "Lomax, J. T.; Bosso, J.; Goodwin, E.; Bentley, J.; Salehi Alaei, E.; Shiu, W. T.; Bakiro, M.; Aloisio, M.; Liu, L.; Noël, J. J.; Gilroy, J. B.; Crudden, C. M.; Barry, S. T.; Ragogna, P. J.",
      venue: "RSC Chem. Sci." },
    { n: 8, year: 2026, type: "Article", status: "In Submission",
      title: "N-Heterocyclic Carbene-dihydrogen Adducts: Formation of Self-Assembled Monolayers by a Surface-Mediated Double C–H Activation",
      authors: "Wong, Z. R.; DesRoche, E.; Wang, S.; Tumino, F.; Goodwin, E.; Stoerzinger, K.; Barry, S. T.; Neurock, M.; Crudden, C. M.",
      venue: "—" },
    { n: 7, year: 2026, type: "Chapter", status: "Published",
      title: "Surface Precursor Decomposition for Practical Applications",
      authors: "Barry, S. T.; Goodwin, E.",
      venue: "Reference Module in Chem., Mol. Sci. & Chem. Eng. — Elsevier",
      doi: "https://doi.org/10.1016/b978-0-443-27509-8.00007-3" },
    { n: 6, year: 2025, type: "Article", status: "Editor's Pick",
      title: "Benzimidazolium Hydrogen Carbonate Salts — Investigation of Thermal Properties in the Context of Small Molecule Inhibitors",
      authors: "Goodwin, E.; Bentley, J. N.; Bakiro, M.; Aloisio, M. D.; Lomax, J. T.; Singh, I.; Veinot, A. J.; Nezamzedah, A.; Ragogna, P. J.; Crudden, C. M.; Barry, S. T.",
      venue: "J. Vac. Sci. Technol. A · 43, 062403",
      doi: "https://doi.org/10.1116/6.0004886" },
    { n: 5, year: 2025, type: "Article", status: "Published",
      title: "Atomic Layer Restructuring of Gold Surfaces by N-Heterocyclic Carbenes over Large Surface Areas",
      authors: "Goodwin, E.; Davies, M.; Bakiro, M.; Desroche, E.; Tumino, F.; Aloisio, M. D.; Crudden, C. M.; Ragogna, P. J.; Karttunen, M.; Barry, S. T.",
      venue: "ACS Nano · 19, 15617–15626",
      doi: "https://doi.org/10.1021/acsnano.4c17517" },
    { n: 3, year: 2025, type: "Patent", status: "Provisional Filed",
      title: "NHC Restructuring and Smoothing",
      authors: "Crudden, C. M.; Karttunen, M.; Barry, S. T.; Goodwin, E.; Desroche, E.; Davies, M.; Bakiro, M.; Tumino, F.",
      venue: "International Patent Application · PCT/CA2025/05474" },
    { n: 4, year: 2024, type: "Article", status: "Journal Cover",
      title: "Deposition of N-Heterocyclic Carbenes on Reactive Metal Substrates — Applications in Area-Selective Atomic Layer Deposition",
      authors: "Lomax, J.; Goodwin, E.; Aloisio, M. D.; Veinot, A. J.; Singh, I.; Shiu, W. T.; Bakiro, M.; Bentley, J.; DeJesus, J. F.; Gordon, P. G.; Liu, L.; Barry, S. T.; Crudden, C. M.; Ragogna, P. J.",
      venue: "Chem. Mater. · 36, 5500–5507",
      doi: "https://doi.org/10.1021/acs.chemmater.4c00412" },
    { n: 2, year: 2024, type: "Patent", status: "Accepted",
      title: "Carbene-Functionalized Composite Materials",
      authors: "Crudden, C. M.; Barry, S. T.; Goodwin, E. R.; Ragogna, P. J.; Lomax, J.; Yang, M. S.; Senanayake, W.; Mauzeroll, J.; Laundry-Mottiar, L.; Suduwella, T. M.",
      venue: "Continuation in Part Patent · US 18/675,046" },
    { n: 3, year: 2023, type: "Article", status: "Published",
      title: "Synthesis, Characterization, and Single-Crystal X-ray Structures of Refractory Metal Compounds as Precursors for Single-Source CVD of Metal Nitrides",
      authors: "Lawford, K. G.; Land, M. A.; Goodwin, E.; Robertson, K. N.; Barry, S. T.",
      venue: "Inorg. Chem. · 62 (51), 21061–21073",
      doi: "https://doi.org/10.1021/acs.inorgchem.3c02841" },
    { n: 2, year: 2023, type: "Article", status: "Published",
      title: "Robust surface functionalization of PDMS through atmospheric pressure atomic layer deposition",
      authors: "Santoso, A.; van den Berg, B. J.; Saedy, S.; Goodwin, E.; van Steijn, V.; Van Ommen, J. R.",
      venue: "Atomic Layer Deposition · 1, 1–13",
      doi: "https://doi.org/10.3897/aldj.1.105146" },
    { n: 1, year: 2022, type: "Article", status: "Journal Cover",
      title: "Plasma-Enhanced Molecular Layer Deposition of Phosphane–Ene Polymer Films",
      authors: "Lomax, J. T.; Goodwin, E.; Gordon, P. G.; McGuiness, C.; De Campo, F.; Barry, S. T.; Ragogna, P. J.",
      venue: "Chem. Mater. · 35, 1579–1585",
      doi: "https://doi.org/10.1021/acs.chemmater.2c03036" },
    { n: 1, year: 2022, type: "Patent", status: "Accepted",
      title: "Method of Selective Deposition of Small Molecules on Metal Surfaces",
      authors: "Crudden, C.; Barry, S. T.; Ragogna, P. J.; McBreen, P.; Veinot, A. J.; Goodwin, E.; Lomax, J. T.; Zhang, T.; Singh, I.; Gordon, P.",
      venue: "USPTO Provisional · 63/333,190" },
  ],

  // -------------------------------------------------------
  // TEACHING SECTION (§ 06)
  // equityText and equityPills appear in the equity card.
  // courses is the instructor record table: [courseCode, description]
  // -------------------------------------------------------
  equityText: "Diversity of thought, experience, and beliefs makes us stronger and more robust researchers. I have built this into my service work for over a decade — from the Youth Service Bureau drop-in for LGBTQ+ youth (2012–2016), to managing $130k in donations for the Ottawa Street Medics, to the C2MCI EDII Fellowship and the Canadian Society of Chemistry Pride Committee.",
  equityPills: ["C2MCI EDII Fellow", "CIC Pride Committee", "CUPE 4600 Gender Affirmation", "Trans Advocacy"],

  // courses: each entry is ["COURSE CODE", "description · enrolment · eval score"]
  courses: [
    ["CHEM 1101A", "1st-year Engineering Chemistry · 300+ students · 4.23 / 5"],
    ["CHEM 1101C", "1st-year Engineering Chemistry · 300+ students · 4.20 / 5"],
    ["CHEM 1001A", "1st-year General Chemistry · 70+ students · 4.29 / 5"],
    ["CHEM 1002A", "1st-year General Chemistry · 80+ students · 4.30 / 5"],
    ["CHEM 5908", "Guest lecture — QCM theory, applications, limitations"],
  ],

};

// Make available globally (loaded before the JSX files)
window.CONTENT = CONTENT;

// Ensure duplicate fields reference the same source value
CONTENT.identityB.role = CONTENT.role;
