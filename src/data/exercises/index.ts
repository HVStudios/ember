import type { ExerciseDefinition } from "@/types/training";

const createExercise = (id: string, sv: string, en: string, purpose: string, cues: string[]): ExerciseDefinition => ({
  id,
  version: 1,
  name: { sv, en },
  equipment: [],
  primaryMuscles: [],
  loadSemantics: id.includes("dumbbell") ? "per-dumbbell" : "machine-display",
  media: { kind: "placeholder", alt: { sv: `Illustration av ${sv}`, en: `${en} illustration` } },
  purpose: { sv: purpose, en: purpose },
  steps: { sv: cues, en: cues },
  cues: { sv: cues, en: cues },
  commonMistakes: { sv: [], en: [] },
  expectedSensation: { sv: [], en: [] },
  alternativeExerciseIds: [],
});

export const exercises: ExerciseDefinition[] = [
  createExercise("flat-neutral-dumbbell-press", "Plan hantelpress", "Flat dumbbell press", "Bröst, axlar och triceps", ["Håll handflatorna lätt mot varandra.", "Låt armbågarna följa kroppen i cirka 30–45° och stanna där axeln känns stabil."]),
  createExercise("neutral-lat-pulldown", "Latsdrag med neutralt grepp", "Neutral-grip lat pulldown", "Rygg och armbågsböjare", ["Tänk armbågar mot höfterna.", "Dra kontrollerat mot övre bröstet utan att hänga passivt i toppläget."]),
  createExercise("seated-cable-row", "Sittande kabelrodd", "Seated cable row", "Övre rygg och lats", ["Sitt stadigt med en lång rygg.", "Dra handtaget mot övre magen utan att kasta överkroppen bakåt."]),
  createExercise("landmine-press", "Landmine-press", "Landmine press", "Axlar, bröst och bål", ["Pressa stången i dess naturliga båge.", "Håll revbenen över bäckenet och undvik att svanka dig genom repetitionen."]),
  createExercise("cable-lateral-raise", "Sidolyft i kabel", "Cable lateral raise", "Sida axel", ["Led rörelsen med armbågen.", "Använd lätt vikt och avsluta innan kontrollen eller armbågens bana förändras."]),
  createExercise("rope-triceps-pushdown", "Tricepspress med rep", "Rope triceps pushdown", "Triceps", ["Håll armbågarna intill kroppen.", "Rör underarmarna och behåll en avslappnad handled."]),
  createExercise("cable-curl", "Bicepscurl i kabel", "Cable curl", "Biceps", ["Håll överarmarna stilla.", "Curl kontrollerat utan att jaga ett extremt ytterläge i armbågen."]),
  createExercise("supported-bulgarian-split-squat", "Bulgarian split squat med stöd", "Supported Bulgarian split squat", "Lår, säte och höftkontroll", ["Håll lätt i ett stabilt stöd och gå rakt ned.", "Låt främre knät följa fotens riktning och pressa genom hela foten."]),
  createExercise("dumbbell-romanian-deadlift", "Rumänska marklyft med hantlar", "Dumbbell Romanian deadlift", "Baksida lår och säte", ["Skjut höfterna bakåt med mjukt böjda knän.", "Stanna när baksida lår begränsar rörelsen och behåll ryggen neutral."]),
  createExercise("leg-press", "Benpress", "Leg press", "Lår och säte", ["Placera hela foten på plattan.", "Gå inte djupare än att bäcken och rygg kan ligga stabilt mot stödet."]),
  createExercise("leg-curl", "Lårcurl", "Leg curl", "Baksida lår", ["Ställ in maskinens ledpunkt i linje med knät.", "Böj och sänk benen lugnt utan att kasta vikten."]),
  createExercise("sled-push", "Slädskjut", "Sled push", "Ben, säte och kondition", ["Spänn bålen och luta kroppen som en rak enhet.", "Ta korta kraftfulla steg och välj en vikt som låter dig fortsätta röra dig kontrollerat."]),
  createExercise("reverse-crunch", "Omvänd crunch", "Reverse crunch", "Mage och bäckenkontroll", ["Böj knäna och rulla bäckenet upp från underlaget.", "Gör en liten kontrollerad rörelse utan att svinga benen."]),
  createExercise("trap-bar-deadlift", "Trap bar-marklyft", "Trap-bar deadlift", "Ben, säte, rygg och grepp", ["Stå centrerat och skapa buktryck före lyftet.", "Pressa golvet ifrån dig och avsluta upprätt utan att luta bakåt."]),
  createExercise("chest-supported-row", "Bröststödd rodd", "Chest-supported row", "Övre rygg och lats", ["Låt bröstet stanna mot stödet.", "Dra armbågarna bakåt utan att höja axlarna mot öronen."]),
  createExercise("incline-neutral-dumbbell-press", "Lutande hantelpress", "Incline neutral dumbbell press", "Övre bröst, axlar och triceps", ["Ställ bänken på ungefär 20–30 grader.", "Använd lätt neutralt grepp och stanna där axeln känns stabil."]),
  createExercise("assisted-pull-up", "Assisterade chins", "Assisted pull-up", "Rygg och armbågsböjare", ["Starta med aktiva skuldror i stället för att hänga passivt.", "Dra bröstet mot handtagen med en kontrollerad väg ned."]),
  createExercise("supported-single-leg-rdl", "Enbens-RDL med stöd", "Supported single-leg RDL", "Baksida lår, säte och höftkontroll", ["Håll lätt i ett stöd och skjut höften bakåt.", "Håll bäckenet så rakt som möjligt och använd ett kontrollerat rörelseomfång."]),
  createExercise("farmer-carry", "Farmer’s carry", "Farmer carry", "Grepp, bål och hållning", ["Stå långt och håll vikterna stabila vid sidorna.", "Gå med lugna steg utan att luta åt någon sida eller dra axlarna mot öronen."]),
  createExercise("dead-bug", "Dead bug", "Dead bug", "Mage och bäckenkontroll", ["Pressa ländryggen lätt mot underlaget.", "Sträck motsatt arm och ben bara så långt att bäcken och rygg kan ligga stilla."]),
  createExercise("face-pull", "Face pull", "Face pull", "Bakre axlar och övre rygg", ["Dra repet mot ansiktet med lugn fart.", "Låt händerna separera mot öronen utan att svanka eller skjuta fram huvudet."]),
];

export function hasExercise(id: string) { return exercises.some((exercise) => exercise.id === id); }

export const exerciseAlternatives: Record<string, string[]> = {
  "flat-neutral-dumbbell-press": ["incline-neutral-dumbbell-press"],
  "incline-neutral-dumbbell-press": ["flat-neutral-dumbbell-press"],
  "neutral-lat-pulldown": ["assisted-pull-up"],
  "assisted-pull-up": ["neutral-lat-pulldown"],
  "seated-cable-row": ["chest-supported-row"],
  "chest-supported-row": ["seated-cable-row"],
  "cable-lateral-raise": [],
  "supported-bulgarian-split-squat": ["leg-press"],
  "dumbbell-romanian-deadlift": ["supported-single-leg-rdl"],
  "supported-single-leg-rdl": ["dumbbell-romanian-deadlift"],
  "reverse-crunch": ["dead-bug"],
  "dead-bug": ["reverse-crunch"],
};

export function getExerciseAlternatives(id: string) { return (exerciseAlternatives[id] ?? []).map(getExercise); }

export function getExercise(id: string): ExerciseDefinition {
  return exercises.find((exercise) => exercise.id === id) ?? createExercise(id, humanize(id), humanize(id), "", ["Utför rörelsen lugnt och kontrollerat.", "Avbryt om en led känns instabil eller gör ont."]);
}

export function getExerciseName(id: string) {
  return getExercise(id).name.sv;
}

function humanize(id: string) {
  const value = id.replaceAll("-", " ");
  return value.charAt(0).toUpperCase() + value.slice(1);
}
