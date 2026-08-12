import type { Ingredient, Recipe } from "@/types/meals";
import { emberMealsV1Additions } from "./ember-meals-v1-additions";

const i = (amount: number | undefined, unit: string | undefined, item: string, note?: string): Ingredient => ({ amount, unit, item, note });

export const emberMealsV1: Recipe[] = [
  {
    id: "chipotle-lime-chicken-bowl",
    name: "Chipotle Lime Chicken Bowl",
    description: "Rökig limekyckling, färgstarka grönsaker och krämig chipotlesås.",
    servings: 4, minutes: 50, priceSek: [42, 55], calories: 700, protein: 46,
    tags: ["Kyckling", "Bowl", "Meal prep"], scores: { mealPrep: 5, freezer: 4, taste: 5 }, imagePosition: { column: 0, row: 0 },
    ingredientGroups: [
      { title: "Kyckling", ingredients: [i(700,"g","kycklinglårfilé eller kycklingbröst"),i(1.5,"msk","olivolja"),i(1,undefined,"lime","skal och juice"),i(2,undefined,"vitlöksklyftor","finhackade eller pressade"),i(1,"msk","chipotlepasta"),i(1.5,"tsk","spiskummin"),i(1.5,"tsk","rökt paprikapulver"),i(1,"tsk","oregano"),i(undefined,undefined,"salt och svartpeppar")] },
      { title: "Ris & grönsaker", ingredients: [i(260,"g","jasminris"),i(2,undefined,"paprikor"),i(1,undefined,"rödlök"),i(1,"burk","svarta bönor"),i(1,"liten burk","majs")] },
      { title: "Picklad lök", ingredients: [i(1,undefined,"rödlök"),i(1,"dl","vitvinsvinäger"),i(2,"msk","socker"),i(.5,"tsk","salt")] },
      { title: "Chipotle-limecrema", ingredients: [i(200,"g","grekisk yoghurt"),i(1,"msk","lättmajonnäs"),i(1,"tsk","chipotlepasta"),i(.5,undefined,"lime","juice"),i(1,undefined,"vitlöksklyfta","finhackad eller pressad"),i(undefined,undefined,"salt")] },
    ],
    instructions: ["Blanda marinaden med kycklingen och låt stå minst 30 minuter, gärna över natten.","Koka riset enligt förpackningen.","Skiva rödlöken tunt. Koka snabbt upp vinäger, socker och salt, häll över löken och låt svalna.","Stek paprika och rödlök med hög värme tills de fått färg men behåller lite tuggmotstånd.","Stek kycklingen genomstekt och låt vila innan den skivas.","Skölj bönorna och låt majsen rinna av.","Rör ihop ingredienserna till creman.","Fördela ris, grönsaker och kyckling. Förvara crema och picklad lök separat."],
    tips: ["Marinera kvällen före för djupare smak.","Låt kycklingen vila fem minuter så behåller den saftigheten."],
    variations: ["Byt ris mot rostad potatis.","Lägg till koriander eller avokado vid servering."],
    alternatives: ["Kycklingbröst ger en magrare bowl.","Mild chilipasta fungerar om chipotle blir för starkt."],
    storage: "4 dagar i kyl. Frys ris, kyckling och grönsaker; tillsätt crema och picklad lök efter uppvärmning.",
  },
  {
    id: "korean-beef-bowl", name: "Korean Beef Bowl",
    description: "Sötstark gochujangbiff med krispiga grönsaker och picklad gurka.",
    servings: 4, minutes: 40, priceSek: [45, 58], calories: 700, protein: 46,
    tags: ["Nötfärs", "Bowl", "Snabb"], scores: { mealPrep: 5, freezer: 4, taste: 5 }, imagePosition: { column: 1, row: 0 },
    ingredientGroups: [
      { title: "Biff & ris", ingredients: [i(700,"g","mager nötfärs, 5 %"),i(260,"g","jasminris")] },
      { title: "Sås", ingredients: [i(4,"msk","soja"),i(2,"msk","ostronsås"),i(2,"msk","gochujang"),i(1.5,"msk","honung"),i(1,"tsk","malen ingefära"),i(3,undefined,"vitlöksklyftor","finhackade eller pressade"),i(1.5,"msk","risvinäger"),i(1.5,"tsk","sesamolja"),i(1,"dl","vatten"),i(2,"tsk","majsstärkelse")] },
      { title: "Grönsaker", ingredients: [i(1,undefined,"broccoli"),i(2,undefined,"morötter"),i(2,undefined,"salladslökar"),i(undefined,undefined,"sesamfrön")] },
      { title: "Picklad gurka", ingredients: [i(1,undefined,"gurka"),i(1,"dl","risvinäger"),i(2,"msk","socker"),i(.5,"tsk","salt")] },
    ],
    instructions: ["Koka riset.","Skiva gurkan tunt och blanda med risvinäger, socker och salt.","Rosta broccolin och strimla morötterna.","Vispa ihop alla ingredienser till såsen.","Bryn färsen ordentligt på hög värme.","Tillsätt vitlök och ingefära, sedan såsen.","Sjud tills såsen blivit blank och tjock.","Servera med ris, grönsaker, salladslök och sesam."],
    tips: ["Låt färsen ligga still korta stunder så den får stekyta.","Gochujang varierar i styrka – smaka av."],
    variations: ["Byt broccoli mot haricots verts.","Servera med kimchi."],
    alternatives: ["Kycklingfärs fungerar lika bra.","Tamari gör såsen glutenfri om övriga såser också är glutenfria."],
    storage: "4 dagar i kyl. Färs och ris kan frysas; förvara gurkan separat.",
  },
  {
    id: "creamy-chicken-pasta", name: "Creamy Chicken Pasta",
    description: "Krämig pasta med kyckling, svamp, spenat och parmesan.",
    servings: 4, minutes: 35, priceSek: [43, 55], calories: 730, protein: 50,
    tags: ["Kyckling", "Pasta", "Comfort food"], scores: { mealPrep: 4, freezer: 3, taste: 5 }, imagePosition: { column: 2, row: 0 },
    ingredientGroups: [{ title: "Pasta", ingredients: [i(700,"g","kycklingbröst"),i(320,"g","pasta"),i(200,"g","Philadelphia Light"),i(150,"ml","matlagningsgrädde, 5 %"),i(50,"g","parmesan"),i(150,"g","spenat"),i(250,"g","champinjoner"),i(1,undefined,"gul lök"),i(3,undefined,"vitlöksklyftor","finhackade eller pressade"),i(1,"msk","koncentrerad kycklingfond"),i(undefined,undefined,"italienska örter"),i(undefined,undefined,"svartpeppar")] }],
    instructions: ["Koka pastan och spara 2 dl pastavatten.","Stek kycklingen gyllene och genomstekt. Lägg åt sidan.","Stek lök och svamp tills vätskan kokat bort, tillsätt vitlök.","Rör ner Philadelphia, grädde, fond och parmesan.","Späd med pastavatten tills såsen är blank och krämig.","Vänd ner spenaten, kycklingen och pastan.","Smaka av med örter och svartpeppar."],
    tips: ["Pastavatten gör såsen krämig även efter uppvärmning.","Koka pastan en minut kortare för meal prep."],
    variations: ["Tillsätt soltorkad tomat.","Byt spenat mot grönkål."],
    alternatives: ["Fullkornspasta ger mer fiber.","Laktosfria mejeriprodukter fungerar utan andra ändringar."],
    storage: "3–4 dagar i kyl. Värm med en skvätt vatten. Kan frysas men såsen blir bäst färsk.",
  },
  {
    id: "butter-chicken", name: "Butter Chicken",
    description: "Len, kryddig tomatsås med saftig kyckling och basmatiris.",
    servings: 4, minutes: 45, priceSek: [39, 50], calories: 690, protein: 47,
    tags: ["Kyckling", "Indiskt", "Frysbar"], scores: { mealPrep: 5, freezer: 5, taste: 5 }, imagePosition: { column: 0, row: 1 },
    ingredientGroups: [
      { title: "Kyckling", ingredients: [i(700,"g","kycklingbröst"),i(2,"tsk","garam masala"),i(1,"tsk","paprikapulver"),i(undefined,undefined,"salt")] },
      { title: "Sås", ingredients: [i(1,undefined,"gul lök"),i(3,undefined,"vitlöksklyftor","finhackade eller pressade"),i(1,"tsk","malen ingefära"),i(2,"msk","tomatpuré"),i(400,"g","krossade tomater"),i(2,"dl","lätt crème fraîche"),i(1,"dl","grekisk yoghurt"),i(1.5,"tsk","garam masala"),i(1,"tsk","spiskummin"),i(1,"tsk","paprikapulver"),i(.5,"tsk","gurkmeja"),i(undefined,undefined,"chiliflakes")] },
      { title: "Ris", ingredients: [i(260,"g","basmatiris")] },
    ],
    instructions: ["Koka riset.","Krydda och bryn kycklingen. Lägg åt sidan.","Stek lök mjuk, tillsätt vitlök och ingefära.","Fräs tomatpurén en minut.","Tillsätt krossade tomater och kryddor. Sjud 10 minuter.","Sänk värmen och rör ner crème fraîche och yoghurt.","Lägg tillbaka kycklingen och sjud fem minuter."],
    tips: ["Låt yoghurt och crème fraîche bli rumstempererade så minskar risken att såsen skär sig.","Mixa såsen före mejerierna för restaurangkänsla."],
    variations: ["Lägg till spenat eller blomkål.","Toppa med koriander och lime."],
    alternatives: ["Kycklinglårfilé blir extra saftigt.","Havrebaserad fraiche kan ersätta crème fraîche."],
    storage: "4 dagar i kyl och upp till 3 månader i frys. Frys gärna ris och gryta separat.",
  },
  {
    id: "mongolian-beef", name: "Mongolian Beef",
    description: "Glaserad strimlad biff med ingefära, hoisin och rostade grönsaker.",
    servings: 4, minutes: 40, priceSek: [55, 72], calories: 700, protein: 46,
    tags: ["Nötkött", "Asiatiskt", "Meal prep"], scores: { mealPrep: 5, freezer: 4, taste: 5 }, imagePosition: { column: 1, row: 1 },
    ingredientGroups: [
      { title: "Biff & ris", ingredients: [i(700,"g","flankstek eller lövbiff"),i(260,"g","jasminris")] },
      { title: "Sås", ingredients: [i(4,"msk","soja"),i(2,"msk","ostronsås"),i(2,"msk","hoisinsås"),i(2,"msk","honung"),i(3,undefined,"vitlöksklyftor","finhackade eller pressade"),i(1,"tsk","malen ingefära"),i(1,"dl","vatten"),i(2,"tsk","majsstärkelse")] },
      { title: "Grönsaker", ingredients: [i(1,undefined,"broccoli"),i(2,undefined,"morötter"),i(2,undefined,"salladslökar"),i(undefined,undefined,"sesamfrön")] },
      { title: "Picklad gurka", ingredients: [i(1,undefined,"gurka"),i(1,"dl","risvinäger"),i(2,"msk","socker"),i(.5,"tsk","salt")] },
    ],
    instructions: ["Koka riset.","Rosta broccolin och strimla morötterna.","Skiva gurkan tunt och pickla den med vinäger, socker och salt.","Skär köttet tunt mot fibrerna.","Stek köttet snabbt i omgångar och lägg åt sidan.","Fräs vitlök och ingefära och tillsätt den hopvispade såsen.","Lägg tillbaka köttet när såsen tjocknat.","Servera med salladslök och sesam."],
    tips: ["Frys köttet 20 minuter så blir det lättare att skiva tunt.","Överfyll inte pannan – köttet ska stekas, inte kokas."],
    variations: ["Tillsätt chili eller sriracha.","Byt ris mot nudlar."],
    alternatives: ["Lövbiff är den enklaste svenska vardagsgenvägen.","Tofu fungerar med samma sås."],
    storage: "4 dagar i kyl. Kött, sås och ris kan frysas; gurkan förvaras separat.",
  },
  {
    id: "greek-lemon-chicken", name: "Greek Lemon Chicken",
    description: "Citronkyckling, örtrostad potatis, grekisk sallad och tzatziki.",
    servings: 4, minutes: 55, priceSek: [44, 58], calories: 710, protein: 48,
    tags: ["Kyckling", "Medelhav", "Fräscht"], scores: { mealPrep: 4, freezer: 3, taste: 5 }, imagePosition: { column: 2, row: 1 },
    ingredientGroups: [
      { title: "Kyckling", ingredients: [i(700,"g","kycklingbröst"),i(1,undefined,"citron","skal och juice"),i(2,"msk","olivolja"),i(3,undefined,"vitlöksklyftor","finhackade eller pressade"),i(2,"tsk","oregano"),i(1,"tsk","timjan"),i(undefined,undefined,"salt och peppar")] },
      { title: "Potatis", ingredients: [i(900,"g","småpotatis"),i(undefined,undefined,"olivolja"),i(undefined,undefined,"oregano")] },
      { title: "Sallad", ingredients: [i(undefined,undefined,"körsbärstomater"),i(1,undefined,"gurka"),i(1,undefined,"rödlök"),i(75,"g","fetaost")] },
      { title: "Tzatziki", ingredients: [i(300,"g","grekisk yoghurt"),i(.5,undefined,"gurka"),i(2,undefined,"vitlöksklyftor","finhackade eller pressade"),i(undefined,undefined,"citronjuice"),i(undefined,undefined,"dill"),i(undefined,undefined,"salt")] },
    ],
    instructions: ["Blanda marinaden och marinera kycklingen minst 30 minuter.","Rosta potatisen med olivolja och oregano tills den är gyllene.","Stek eller grilla kycklingen genomstekt och låt vila.","Riv gurkan till tzatzikin, krama ur vätskan och blanda med övriga ingredienser.","Blanda tomat, gurka, rödlök och fetaost.","Portionera varma och kalla delar separat."],
    tips: ["Riv gurkan grovt och salta den före urkramning.","Använd termometer för saftig kyckling."],
    variations: ["Lägg till oliver.","Byt potatis mot citronris."],
    alternatives: ["Kycklinglårfilé tål uppvärmning extra bra.","Keso kan blandas i tzatzikin för ännu mer protein."],
    storage: "4 dagar i kyl. Kyckling och potatis kan frysas; sallad och tzatziki ska inte frysas.",
  },
  ...emberMealsV1Additions,
];

export function getRecipe(id: string) {
  return emberMealsV1.find((recipe) => recipe.id === id);
}
