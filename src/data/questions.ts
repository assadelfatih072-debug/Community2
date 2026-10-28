import { Question } from '../types/quiz';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    question: "The modern concept of ventilation includes:",
    options: [
      { key: 'A', text: "Replacing polluted air only" },
      { key: 'B', text: "Replacing polluted air and controlling incoming air quality" },
      { key: 'C', text: "Increasing humidity only" },
      { key: 'D', text: "Removing oxygen" }
    ],
    correctAnswer: 'B',
    category: 'ventilation',
    categoryLabel: "Ventilation & Air Quality",
    explanation: "Modern ventilation is not merely removing stale or polluted air; it fundamentally involves conditioning, filtering, and actively controlling the quality of incoming outdoor air (including temperature, humidity, and particulate filtration).",
    difficulty: 'medium'
  },
  {
    id: 2,
    question: "Which of the following is a component of air quality control?",
    options: [
      { key: 'A', text: "Temperature" },
      { key: 'B', text: "Humidity" },
      { key: 'C', text: "CO₂ and oxygen levels" },
      { key: 'D', text: "All of the above" }
    ],
    correctAnswer: 'D',
    category: 'ventilation',
    categoryLabel: "Ventilation & Air Quality",
    explanation: "Comprehensive air quality control encompasses thermal comfort (temperature), moisture regulation (relative humidity), and chemical balance (carbon dioxide, oxygen levels, and airborne pollutants).",
    difficulty: 'easy'
  },
  {
    id: 3,
    question: "Waste management includes:",
    options: [
      { key: 'A', text: "Collection only" },
      { key: 'B', text: "Storage only" },
      { key: 'C', text: "Treatment only" },
      { key: 'D', text: "Collection, storage, treatment and disposal" }
    ],
    correctAnswer: 'D',
    category: 'waste',
    categoryLabel: "Waste Management",
    explanation: "An integrated solid waste management system comprises the complete lifecycle: generation, on-site storage, regular collection, transport, treatment/recovery, and final safe disposal.",
    difficulty: 'easy'
  },
  {
    id: 4,
    question: "Which is a health problem associated with solid waste?",
    options: [
      { key: 'A', text: "Skin disease" },
      { key: 'B', text: "Gastrointestinal disease" },
      { key: 'C', text: "Respiratory disease" },
      { key: 'D', text: "All of the above" }
    ],
    correctAnswer: 'D',
    category: 'waste',
    categoryLabel: "Waste Management",
    explanation: "Improper solid waste handling attracts disease vectors causing gastrointestinal infections, emits bioaerosols and noxious gases causing respiratory ailments, and exposes individuals to contact dermatoses and skin infections.",
    difficulty: 'easy'
  },
  {
    id: 5,
    question: "Burning waste unsafely may produce:",
    options: [
      { key: 'A', text: "Toxic ash and air pollution" },
      { key: 'B', text: "Pure oxygen only" },
      { key: 'C', text: "Safe drinking water" },
      { key: 'D', text: "No environmental effects" }
    ],
    correctAnswer: 'A',
    category: 'waste',
    categoryLabel: "Waste Management",
    explanation: "Open and uncontrolled burning of municipal waste releases carcinogenic dioxins, furans, black carbon, fine particulate matter (PM2.5), and leaves toxic bottom ash loaded with heavy metals.",
    difficulty: 'easy'
  },
  {
    id: 6,
    question: "The chemical formula of water is:",
    options: [
      { key: 'A', text: "CO₂" },
      { key: 'B', text: "H₂O" },
      { key: 'C', text: "CO₂" },
      { key: 'D', text: "NaCl" }
    ],
    correctAnswer: 'B',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Each water molecule is composed of two hydrogen atoms bonded covalently to a single central oxygen atom (H₂O).",
    difficulty: 'easy'
  },
  {
    id: 7,
    question: "Potable water means water that is:",
    options: [
      { key: 'A', text: "Safe for human consumption" },
      { key: 'B', text: "Always salty" },
      { key: 'C', text: "Always coloured" },
      { key: 'D', text: "Unsafe to drink" }
    ],
    correctAnswer: 'A',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Potable water is wholesome water free from pathogenic microorganisms, chemical toxins, excessive turbidity, and objectionable taste or odor, making it safe for drinking and culinary purposes.",
    difficulty: 'easy'
  },
  {
    id: 8,
    question: "Water turbidity is measured in:",
    options: [
      { key: 'A', text: "NTU" },
      { key: 'B', text: "dB" },
      { key: 'C', text: "Litres per minute" },
      { key: 'D', text: "Sieverts" }
    ],
    correctAnswer: 'A',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Turbidity (cloudiness caused by suspended colloids and particulates) is quantified in NTU (Nephelometric Turbidity Units) using light-scattering nephelometry.",
    difficulty: 'easy'
  },
  {
    id: 9,
    question: "According to the lecture, drinking water turbidity should not exceed:",
    options: [
      { key: 'A', text: "1 NTU" },
      { key: 'B', text: "5 NTU" },
      { key: 'C', text: "15 NTU" },
      { key: 'D', text: "50 NTU" }
    ],
    correctAnswer: 'B',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Under standard WHO and public health guidelines, drinking water turbidity should ideally be <1 NTU, but must not exceed 5 NTU for consumer acceptability and effective chemical disinfection.",
    difficulty: 'medium'
  },
  {
    id: 10,
    question: "The pH scale indicates the water's:",
    options: [
      { key: 'A', text: "Temperature" },
      { key: 'B', text: "Turbidity only" },
      { key: 'C', text: "Acidity or alkalinity" },
      { key: 'D', text: "Volume" }
    ],
    correctAnswer: 'C',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "The pH scale expresses the logarithmic concentration of hydrogen ions [H+], indicating whether water is acidic (pH < 7), neutral (pH = 7), or alkaline/basic (pH > 7). Safe drinking water is typically 6.5 - 8.5.",
    difficulty: 'easy'
  },
  {
    id: 11,
    question: "E. coli in drinking water may indicate:",
    options: [
      { key: 'A', text: "Faecal contamination" },
      { key: 'B', text: "Noise pollution" },
      { key: 'C', text: "Radiation exposure" },
      { key: 'D', text: "Poor lighting" }
    ],
    correctAnswer: 'A',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Escherichia coli is the classic bacteriological indicator organism of recent faecal contamination from humans or warm-blooded animals, signifying the possible presence of dangerous enteric pathogens.",
    difficulty: 'easy'
  },
  {
    id: 12,
    question: "The lecture gives the minimum domestic water use as:",
    options: [
      { key: 'A', text: "5 L/person/day" },
      { key: 'B', text: "10 L/person/day" },
      { key: 'C', text: "15 L/person/day" },
      { key: 'D', text: "50 L/person/day" }
    ],
    correctAnswer: 'C',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "According to the international Sphere standards and emergency public health guidelines, the basic minimum domestic water requirement for survival, drinking, and hygiene is 15 litres per person per day.",
    difficulty: 'medium'
  },
  {
    id: 13,
    question: "According to the lecture, the maximum number of people per tap is:",
    options: [
      { key: 'A', text: "50" },
      { key: 'B', text: "100" },
      { key: 'C', text: "250" },
      { key: 'D', text: "500" }
    ],
    correctAnswer: 'C',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Public health and Sphere guidelines establish a maximum threshold of 250 people per public water point or tapstand to prevent queuing delays and ensure equitable access.",
    difficulty: 'hard'
  },
  {
    id: 14,
    question: "Which substance is mentioned in water treatment to help particles clump together?",
    options: [
      { key: 'A', text: "Aluminium sulphate" },
      { key: 'B', text: "Carbon dioxide" },
      { key: 'C', text: "Nitrogen gas" },
      { key: 'D', text: "Sandfly extract" }
    ],
    correctAnswer: 'A',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Aluminium sulphate (commonly known as alum) is the primary chemical coagulant used to destabilize negative charges on colloidal particles so they aggregate into settleable flocs.",
    difficulty: 'medium'
  },
  {
    id: 15,
    question: "Which method is used to disinfect water?",
    options: [
      { key: 'A', text: "Chlorination" },
      { key: 'B', text: "Adding household waste" },
      { key: 'C', text: "Adding noise" },
      { key: 'D', text: "Increasing turbidity" }
    ],
    correctAnswer: 'A',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Chlorination is the most widely adopted chemical disinfection method, destroying microbial pathogens and providing a protective residual in the distribution system.",
    difficulty: 'easy'
  },
  {
    id: 16,
    question: "Which disease is associated with contaminated drinking water?",
    options: [
      { key: 'A', text: "Cholera" },
      { key: 'B', text: "Typhoid" },
      { key: 'C', text: "Hepatitis A" },
      { key: 'D', text: "All of the above" }
    ],
    correctAnswer: 'D',
    category: 'water',
    categoryLabel: "Water Sanitation",
    explanation: "Cholera (Vibrio cholerae), Typhoid fever (Salmonella Typhi), and Hepatitis A virus are classic waterborne illnesses transmitted via contaminated water supplies.",
    difficulty: 'easy'
  },
  {
    id: 17,
    question: "Noise pollution is:",
    options: [
      { key: 'A', text: "Unwanted or excessive sound" },
      { key: 'B', text: "Clean outdoor air" },
      { key: 'C', text: "Water filtration" },
      { key: 'D', text: "A type of insect" }
    ],
    correctAnswer: 'A',
    category: 'noise',
    categoryLabel: "Noise Pollution",
    explanation: "Noise pollution is formally defined as any excessive, undesirable, or disruptive acoustic energy that impairs human comfort, communication, or physiological well-being.",
    difficulty: 'easy'
  },
  {
    id: 18,
    question: "Noise-induced hearing loss involves damage to the:",
    options: [
      { key: 'A', text: "Hearing organ" },
      { key: 'B', text: "Liver" },
      { key: 'C', text: "Kidneys" },
      { key: 'D', text: "Intestinal cells" }
    ],
    correctAnswer: 'A',
    category: 'noise',
    categoryLabel: "Noise Pollution",
    explanation: "Excessive sound energy leads to mechanical trauma and metabolic exhaustion of sensory stereocilia and hair cells located within the Organ of Corti in the inner ear cochlea.",
    difficulty: 'easy'
  },
  {
    id: 19,
    question: "Which is a possible effect of noise pollution?",
    options: [
      { key: 'A', text: "Hypertension" },
      { key: 'B', text: "Sleep disturbance" },
      { key: 'C', text: "Hearing loss" },
      { key: 'D', text: "All of the above" }
    ],
    correctAnswer: 'D',
    category: 'noise',
    categoryLabel: "Noise Pollution",
    explanation: "Noise triggers both auditory consequences (permanent threshold shift, tinnitus) and non-auditory systemic stress effects (arterial hypertension, insomnia, neuroendocrine activation).",
    difficulty: 'easy'
  },
  {
    id: 20,
    question: "In the lecture's noise table, 8 hours corresponds to:",
    options: [
      { key: 'A', text: "80 dB" },
      { key: 'B', text: "85 dB" },
      { key: 'C', text: "95 dB" },
      { key: 'D', text: "110 dB" }
    ],
    correctAnswer: 'B',
    category: 'noise',
    categoryLabel: "Noise Pollution",
    explanation: "85 dBA is the standard occupational permissible exposure limit (PEL) for an 8-hour workday time-weighted average without hearing protection.",
    difficulty: 'medium'
  },
  {
    id: 21,
    question: "Weak lighting during prolonged work may cause:",
    options: [
      { key: 'A', text: "Eye strain" },
      { key: 'B', text: "Malaria" },
      { key: 'C', text: "Typhoid" },
      { key: 'D', text: "Lyme disease" }
    ],
    correctAnswer: 'A',
    category: 'lighting',
    categoryLabel: "Lighting & Vision",
    explanation: "Insufficient illumination forces continuous ciliary muscle exertion and pupil accommodation, resulting in asthenopia (ocular fatigue, headaches, burning sensations, and blurred vision).",
    difficulty: 'easy'
  },
  {
    id: 22,
    question: "Nystagmus refers to:",
    options: [
      { key: 'A', text: "Involuntary eye movements" },
      { key: 'B', text: "Hearing loss" },
      { key: 'C', text: "High blood pressure" },
      { key: 'D', text: "Skin irritation" }
    ],
    correctAnswer: 'A',
    category: 'lighting',
    categoryLabel: "Lighting & Vision",
    explanation: "Nystagmus is an involuntary, rapid, and repetitive oscillatory movement of the eyes, historically observed in underground coal miners due to chronic working in poor illumination.",
    difficulty: 'medium'
  },
  {
    id: 23,
    question: "Cataract is associated with opacity of the:",
    options: [
      { key: 'A', text: "Eye lens" },
      { key: 'B', text: "Ear canal" },
      { key: 'C', text: "Tongue" },
      { key: 'D', text: "Skin" }
    ],
    correctAnswer: 'A',
    category: 'lighting',
    categoryLabel: "Lighting & Vision",
    explanation: "A cataract is a progressive clouding or loss of transparency of the crystalline lens of the eye, which scatters light and impedes sharp focal imaging on the retina.",
    difficulty: 'easy'
  },
  {
    id: 24,
    question: "Radiation can transmit energy as:",
    options: [
      { key: 'A', text: "Waves or particles" },
      { key: 'B', text: "Water only" },
      { key: 'C', text: "Sound only" },
      { key: 'D', text: "Living organisms only" }
    ],
    correctAnswer: 'A',
    category: 'radiation',
    categoryLabel: "Radiation & ARS",
    explanation: "Radiation is the emission or propagation of energy through space or material in the dual forms of electromagnetic waves (e.g. X-rays, gamma rays) or subatomic particles (alpha, beta, neutrons).",
    difficulty: 'easy'
  },
  {
    id: 25,
    question: "Which of the following is electromagnetic radiation?",
    options: [
      { key: 'A', text: "Gamma rays" },
      { key: 'B', text: "Housefly hairs" },
      { key: 'C', text: "Water droplets only" },
      { key: 'D', text: "Lice eggs" }
    ],
    correctAnswer: 'A',
    category: 'radiation',
    categoryLabel: "Radiation & ARS",
    explanation: "Gamma rays are high-frequency, highly penetrating electromagnetic photons emitted during radioactive nuclear transitions and radioactive decay.",
    difficulty: 'easy'
  },
  {
    id: 26,
    question: "The prodromal stage of acute radiation syndrome is associated with:",
    options: [
      { key: 'A', text: "Early symptoms" },
      { key: 'B', text: "The mosquito pupa" },
      { key: 'C', text: "Water precipitation" },
      { key: 'D', text: "Egg production" }
    ],
    correctAnswer: 'A',
    category: 'radiation',
    categoryLabel: "Radiation & ARS",
    explanation: "The prodromal phase of Acute Radiation Syndrome occurs within minutes to hours following significant radiation exposure, manifesting with early acute signs: nausea, vomiting, anorexia, and fatigue.",
    difficulty: 'medium'
  },
  {
    id: 27,
    question: "The latent period means:",
    options: [
      { key: 'A', text: "Initial symptoms may subside while damage continues" },
      { key: 'B', text: "All damage has certainly ended" },
      { key: 'C', text: "The person becomes a mosquito" },
      { key: 'D', text: "Water is disinfected" }
    ],
    correctAnswer: 'A',
    category: 'radiation',
    categoryLabel: "Radiation & ARS",
    explanation: "In Acute Radiation Syndrome, the latent phase is a transient asymptomatic interval where initial prodromal distress abates, yet internal cellular damage and bone marrow hypoplasia continue unhalted.",
    difficulty: 'medium'
  },
  {
    id: 28,
    question: "The hematopoietic radiation syndrome mainly affects:",
    options: [
      { key: 'A', text: "Bone marrow and blood cells" },
      { key: 'B', text: "Hair only" },
      { key: 'C', text: "The eye lens only" },
      { key: 'D', text: "The skin surface only" }
    ],
    correctAnswer: 'A',
    category: 'radiation',
    categoryLabel: "Radiation & ARS",
    explanation: "Hematopoietic syndrome occurs at radiation doses between 1 and 6 Gy, selectively killing actively proliferating pluripotential hematopoietic stem cells and causing pancytopenia, bleeding, and severe infections.",
    difficulty: 'easy'
  },
  {
    id: 29,
    question: "The gastrointestinal radiation syndrome mainly affects the:",
    options: [
      { key: 'A', text: "Intestinal cells" },
      { key: 'B', text: "Hearing organ" },
      { key: 'C', text: "Hair shafts" },
      { key: 'D', text: "Mosquito wings" }
    ],
    correctAnswer: 'A',
    category: 'radiation',
    categoryLabel: "Radiation & ARS",
    explanation: "Gastrointestinal radiation syndrome occurs at acute doses >6–10 Gy, destroying rapidly dividing intestinal crypt progenitor cells, resulting in denudation of the intestinal lining, massive fluid loss, and septic shock.",
    difficulty: 'easy'
  },
  {
    id: 30,
    question: "The scientific name of the housefly is:",
    options: [
      { key: 'A', text: "Musca domestica" },
      { key: 'B', text: "Anopheles" },
      { key: 'C', text: "Aedes aegypti" },
      { key: 'D', text: "Ixodes" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Musca domestica is the universal binomial classification for the common synanthropic housefly in the order Diptera, family Muscidae.",
    difficulty: 'easy'
  },
  {
    id: 31,
    question: "Houseflies can carry microorganisms on their:",
    options: [
      { key: 'A', text: "Hairs" },
      { key: 'B', text: "Mouthparts" },
      { key: 'C', text: "Feces and vomitus" },
      { key: 'D', text: "All of the above" }
    ],
    correctAnswer: 'D',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Houseflies contaminate surfaces externally through setae on legs and mouthparts, and internally by depositing pathogen-laden regurgitation droplets (vomit drops) and fecal matter.",
    difficulty: 'easy'
  },
  {
    id: 32,
    question: "The housefly commonly transmits pathogens by:",
    options: [
      { key: 'A', text: "Mechanical carriage" },
      { key: 'B', text: "Producing vaccines" },
      { key: 'C', text: "Purifying food" },
      { key: 'D', text: "Destroying every microorganism" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Unlike biological vectors in which the disease agent undergoes obligate development or replication, the housefly serves primarily as a mechanical transport vector, shuttling microbes from waste to human food.",
    difficulty: 'easy'
  },
  {
    id: 33,
    question: "Which mosquito genus is associated with malaria?",
    options: [
      { key: 'A', text: "Anopheles" },
      { key: 'B', text: "Musca" },
      { key: 'C', text: "Phlebotomus" },
      { key: 'D', text: "Pediculus" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Female mosquitoes of the genus Anopheles are the definitive biological vectors responsible for transmitting Plasmodium parasites (causing human malaria).",
    difficulty: 'easy'
  },
  {
    id: 34,
    question: "Which mosquito genus is associated with dengue in the lecture?",
    options: [
      { key: 'A', text: "Aedes" },
      { key: 'B', text: "Musca" },
      { key: 'C', text: "Body louse" },
      { key: 'D', text: "Hard tick" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Aedes mosquitoes (specifically Aedes aegypti and Aedes albopictus) are the principal daytime-biting vectors for Dengue virus, Yellow fever, and Zika virus.",
    difficulty: 'easy'
  },
  {
    id: 35,
    question: "The correct mosquito life cycle is:",
    options: [
      { key: 'A', text: "Egg → Larva → Pupa → Adult" },
      { key: 'B', text: "Egg → Pupa → Larva → Adult" },
      { key: 'C', text: "Larva → Adult → Egg → Pupa" },
      { key: 'D', text: "Adult → Pupa → Egg → Larva" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Mosquitoes undergo complete metamorphosis (holometabolous development) progressing sequentially through four distinct stages: Egg → Larva (wriggler) → Pupa (tumbler) → Adult (imago).",
    difficulty: 'easy'
  },
  {
    id: 36,
    question: "The main disease associated with sandflies in the lecture is:",
    options: [
      { key: 'A', text: "Leishmaniasis" },
      { key: 'B', text: "Cataract" },
      { key: 'C', text: "Noise-induced hearing loss" },
      { key: 'D', text: "Cholera only" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Female sandflies of the genus Phlebotomus (Old World) and Lutzomyia (New World) transmit Leishmania protozoa, which cause cutaneous and visceral leishmaniasis.",
    difficulty: 'easy'
  },
  {
    id: 37,
    question: "Head lice mainly live in:",
    options: [
      { key: 'A', text: "Hair" },
      { key: 'B', text: "Clothing seams only" },
      { key: 'C', text: "Drinking water" },
      { key: 'D', text: "The intestine" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Head lice (Pediculus humanus capitis) reside exclusively on the human scalp and hair shafts, gluing their eggs (nits) near the base of individual hairs.",
    difficulty: 'easy'
  },
  {
    id: 38,
    question: "Body lice mainly live in:",
    options: [
      { key: 'A', text: "Seams and folds of clothing" },
      { key: 'B', text: "The eye lens" },
      { key: 'C', text: "Water surfaces" },
      { key: 'D', text: "Mosquito larvae" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Body lice (Pediculus humanus corporis) reside and oviposit within the inner seams, stitches, and folds of apparel, migrating onto the host skin solely to take blood meals.",
    difficulty: 'medium'
  },
  {
    id: 39,
    question: "Which treatment ingredient is mentioned for lice in the lecture?",
    options: [
      { key: 'A', text: "Permethrin" },
      { key: 'B', text: "Aluminium sulphate" },
      { key: 'C', text: "Chlorine gas for clothing" },
      { key: 'D', text: "Gamma rays" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Permethrin (a neurotoxic synthetic pyrethroid pediculicide, commonly formulated as 1% lotion or cream rinse) is the standard first-line treatment for pediculosis.",
    difficulty: 'medium'
  },
  {
    id: 40,
    question: "Which family contains hard ticks?",
    options: [
      { key: 'A', text: "Ixodidae" },
      { key: 'B', text: "Argasidae" },
      { key: 'C', text: "Muscidae" },
      { key: 'D', text: "Culicidae" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "The family Ixodidae comprises the hard ticks (characterized by a prominent rigid chitinous dorsal scutum shield), whereas Argasidae contains soft ticks.",
    difficulty: 'medium'
  },
  {
    id: 41,
    question: "Which disease is associated with the erythema migrans rash?",
    options: [
      { key: 'A', text: "Lyme disease" },
      { key: 'B', text: "Cholera" },
      { key: 'C', text: "Malaria" },
      { key: 'D', text: "Hepatitis A" }
    ],
    correctAnswer: 'A',
    category: 'entomology',
    categoryLabel: "Medical Entomology",
    explanation: "Erythema migrans (the characteristic expanding target or bull's-eye rash) is the distinctive clinical hallmark of early localized Lyme disease, caused by Borrelia burgdorferi transmitted by Ixodes ticks.",
    difficulty: 'medium'
  }
];

export const CATEGORIES = [
  { id: 'all' as const, label: 'All Topics (41)', count: 41 },
  { id: 'ventilation' as const, label: 'Ventilation & Air', count: 2 },
  { id: 'waste' as const, label: 'Waste Management', count: 3 },
  { id: 'water' as const, label: 'Water Sanitation', count: 11 },
  { id: 'noise' as const, label: 'Noise Pollution', count: 4 },
  { id: 'lighting' as const, label: 'Lighting & Vision', count: 3 },
  { id: 'radiation' as const, label: 'Radiation & ARS', count: 6 },
  { id: 'entomology' as const, label: 'Medical Entomology', count: 12 },
];
