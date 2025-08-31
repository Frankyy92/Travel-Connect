
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const badges = [
    { name: 'Explorateur·rice', tier: 'BRONZE', category: 'général' },
    { name: 'Architecte', tier: 'ARGENT', category: 'architecture' },
    { name: 'Street Art', tier: 'OR', category: 'art' },
  ];
  for (const b of badges) {
    await prisma.badge.upsert({
      where: { name: b.name },
      update: {},
      create: b as any
    });
  }

  
const pois = [
  { title: "Tour Eiffel", city: "Paris", lat: 48.8584, lng: 2.2945, categories: ["monument","architecture"], durationMin: 60, snippet: "Symbole de Paris, construite pour l'Exposition universelle de 1889.", popularity: 0.98, mediaUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg" },
  { title: "Louvre", city: "Paris", lat: 48.8606, lng: 2.3376, categories: ["musée","art"], durationMin: 120, snippet: "Ancien palais royal, musée d'art le plus visité au monde.", popularity: 0.95 },
  { title: "Cathédrale Notre-Dame", city: "Paris", lat: 48.8530, lng: 2.3499, categories: ["monument","religieux"], durationMin: 45, snippet: "Chef-d'œuvre de l'art gothique, en restauration.", popularity: 0.92 },
  { title: "Arc de Triomphe", city: "Paris", lat: 48.8738, lng: 2.2950, categories: ["monument"], durationMin: 40, snippet: "Monument emblématique au sommet des Champs-Élysées.", popularity: 0.89 },
  { title: "Montmartre / Sacré-Cœur", city: "Paris", lat: 48.8867, lng: 2.3431, categories: ["quartier","religieux","vue"], durationMin: 90, snippet: "Basilique et quartier artistique offrant une vue sur Paris.", popularity: 0.90 },
  { title: "Musée d'Orsay", city: "Paris", lat: 48.8600, lng: 2.3266, categories: ["musée","art"], durationMin: 90, snippet: "Musée des arts du XIXe siècle dans une ancienne gare.", popularity: 0.91 },
  { title: "Centre Pompidou", city: "Paris", lat: 48.8606, lng: 2.3522, categories: ["musée","art","architecture"], durationMin: 80, snippet: "Centre national d'art et de culture, architecture high-tech.", popularity: 0.88 },
  { title: "Panthéon", city: "Paris", lat: 48.8462, lng: 2.3459, categories: ["monument","histoire"], durationMin: 60, snippet: "Mausolée de grands personnages français.", popularity: 0.86 },
  { title: "Jardin du Luxembourg", city: "Paris", lat: 48.8462, lng: 2.3371, categories: ["parc","jardin"], durationMin: 50, snippet: "Parc emblématique de la Rive Gauche.", popularity: 0.85 },
  { title: "Le Marais / Place des Vosges", city: "Paris", lat: 48.8554, lng: 2.3651, categories: ["quartier","architecture"], durationMin: 70, snippet: "Quartier historique avec hôtels particuliers.", popularity: 0.87 },

  // Barcelona
  { title: "Sagrada Família", city: "Barcelona", lat: 41.4036, lng: 2.1744, categories: ["religieux","architecture"], durationMin: 90, snippet: "Basilique inachevée de Gaudí, icône de Barcelone.", popularity: 0.97 },
  { title: "Parc Güell", city: "Barcelona", lat: 41.4145, lng: 2.1527, categories: ["parc","architecture"], durationMin: 80, snippet: "Parc public de Gaudí célèbre pour ses mosaïques.", popularity: 0.93 },
  { title: "Casa Batlló", city: "Barcelona", lat: 41.3916, lng: 2.1649, categories: ["architecture","musée"], durationMin: 60, snippet: "Chef-d'œuvre moderniste de Gaudí sur le Passeig de Gràcia.", popularity: 0.90 }
];


// Insert POIs and multiple quests
for (const p of pois) {
  let poi = await prisma.pOI.findFirst({ where: { title: p.title, city: p.city } });
  if (!poi) poi = await prisma.pOI.create({ data: p as any });

  const existing = await prisma.quest.findMany({ where: { poiId: poi.id } });
  if (existing.length === 0) {
    await prisma.quest.createMany({
      data: [
        { poiId: poi.id, type: 'QUIZ' as any, prompt: `En une phrase, que représente « ${p.title} » ?`, answer: 'libre', points: 20 },
        { poiId: poi.id, type: 'PHOTO' as any, prompt: `Prends une photo devant ${p.title} !`, answer: 'photo', points: 30 },
      ]
    });
    // Add a couple AR quests for iconic places
    if (['Tour Eiffel','Sagrada Família','Montmartre / Sacré-Cœur'].includes(p.title)) {
      await prisma.quest.create({
        data: { poiId: poi.id, type: 'AR' as any, prompt: `Approche-toi à moins de 50 m de ${p.title} et valide le repère AR.`, answer: 'ar', points: 40 }
      });
    }
  }
}

// Featured itineraries for Paris (10 routes)
const parisSets = [
  { name: 'Paris Classiques 90', duration: 90, list: ['Tour Eiffel','Louvre','Arc de Triomphe'] },
  { name: 'Rive Gauche 90', duration: 90, list: ['Musée d\'Orsay','Panthéon','Jardin du Luxembourg'] },
  { name: 'Marais Historique 90', duration: 90, list: ['Centre Pompidou','Le Marais / Place des Vosges','Cathédrale Notre-Dame'] },
  { name: 'Iconiques 120', duration: 120, list: ['Tour Eiffel','Louvre','Cathédrale Notre-Dame','Musée d\'Orsay'] },
  { name: 'Romantique Montmartre 60', duration: 60, list: ['Montmartre / Sacré-Cœur','Arc de Triomphe'] },
  { name: 'Art & Architecture 120', duration: 120, list: ['Centre Pompidou','Musée d\'Orsay','Louvre'] },
  { name: 'Quartiers & Parcs 75', duration: 75, list: ['Jardin du Luxembourg','Le Marais / Place des Vosges','Panthéon'] },
  { name: 'Rive Droite 90', duration: 90, list: ['Louvre','Centre Pompidou','Arc de Triomphe'] },
  { name: 'Vue & Histoire 90', duration: 90, list: ['Montmartre / Sacré-Cœur','Panthéon','Cathédrale Notre-Dame'] },
  { name: 'Street & Classiques 90', duration: 90, list: ['Centre Pompidou','Le Marais / Place des Vosges','Louvre'] },
];

for (const s of parisSets) {
  const poiIds:string[] = [];
  for (const title of s.list) {
    const poi = await prisma.pOI.findFirst({ where: { title, city: 'Paris' }});
    if (poi) poiIds.push(poi.id);
  }
  const csv = poiIds.join(',');
  const exists = await prisma.featuredItinerary.findFirst({ where: { name: s.name, city: 'Paris' }});
  if (!exists) {
    await prisma.featuredItinerary.create({
      data: {
        city: 'Paris',
        name: s.name,
        durationTarget: s.duration,
        description: 'Itinéraire sélectionné par l\'équipe TravelTech.',
        bannerUrl: '',
        poiIds: csv
      } as any
    });
  }
}

}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => prisma.$disconnect());
