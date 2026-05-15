import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════════════
//  PHOTOS APPÂTS — Unsplash (URLs directes, sans clé)
// ═══════════════════════════════════════════════════════════════════════
const BAIT_PHOTOS = {
  "Jig + ver de terre":      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Cuillère tournante":      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Poisson nageur Rapala":   "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Tube jig":                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Spinnerbait":             "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Poisson nageur 15cm":     "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Leurre souple shad":      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Vif (crapet/perche)":     "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Topwater (Popper)":       "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Worm texan 7\"":          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Crankbait":               "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Jig à pinceau":           "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Dropshot finesse":        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Ned rig (TRD)":           "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Tube jig 3-4\"":          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Swimbait":                "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Mouche sèche":            "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Cuillère ondulante":      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Ver de terre naturel":    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Nymphe (pheasant)":       "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Kastmaster (cuillère)":   "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Spinner Mepps #3":        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Œufs de saumon (roe)":   "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Nymphe beadhead":         "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Grand bucktail 8\"+":     "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Glide bait (Dawg)":       "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Gros poisson nageur":     "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Jerkbait XXL":            "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Petit jig + asticot":     "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
  "Minnow vivant":           "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Ver de terre":            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Cuillère clignotante":    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Mouche sèche (elk hair)": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Nymphe de fond":          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Cuillère légère 2-3g":    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Ver de vase":             "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Mouche noyée Butterfly":  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Spey fly (Intruder)":     "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Cuillère saumon #5":      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80",
  "Devon minnow":            "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Ver de terre (petit)":    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Petit popper":            "https://images.unsplash.com/photo-1612178991541-b48cc8e92a4d?w=200&q=80",
  "Mouche sèche":            "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Libellule artificielle":  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80",
  "Ver de terre (gros)":     "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Foie de poulet":          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Asticot en grappe":       "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&q=80",
  "Boilette maison":         "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&q=80",
};

// ═══════════════════════════════════════════════════════════════════════
//  BASE DE DONNÉES — 12 ESPÈCES DU QUÉBEC
// ═══════════════════════════════════════════════════════════════════════
const FISH_DB = [
  {
    id:1, name:"Doré jaune", emoji:"🐟", color:"#f5c542",
    habitats:["lac","fleuve","rivière","canal"],
    months:[1,2,3,4,5,9,10,11,12],
    bestWeather:["cloudy","overcast"], okWeather:["clear","rain"],
    windMin:0, windMax:30, minAirTemp:-5, maxAirTemp:25,
    peakMonths:[4,5,10,11], peakHours:[5,6,7,18,19,20,21],
    waterColor:["trouble","verte"],
    bestDepth:["fond","milieu"], bestCurrent:["lent","moyen"],
    bestVegetation:["herbiers","bois coulé"],
    bestTechnique:["spinning"],
    moonBonus:["pleine","nouvelle"],
    pressureTrend:"baisse",
    baits:[
      {name:"Jig + ver de terre",    why:"Universel, redoutable en eaux froides et troubles",    bestWeather:["cloudy","overcast","rain"], bestMonths:[3,4,5,10,11,12], nightBonus:false},
      {name:"Cuillère tournante",    why:"Vibrations attractives même par faible luminosité",     bestWeather:["cloudy","overcast"],        bestMonths:[5,9,10],         nightBonus:false},
      {name:"Poisson nageur Rapala", why:"Imite le vif en eaux claires, mortels au crépuscule",  bestWeather:["clear","cloudy"],           bestMonths:[5,6,9],          nightBonus:false},
      {name:"Tube jig",              why:"Fond rocheux, action lente irrésistible",               bestWeather:["overcast","rain"],          bestMonths:[4,10,11],        nightBonus:false},
    ],
    tip:"Actif surtout par temps nuageux et à l'aube/crépuscule. Eaux troubles = jackpot.",
    regulation:"Limite: 6/jour · Taille min: 37 cm",
  },
  {
    id:2, name:"Brochet", emoji:"🐡", color:"#6aab3f",
    habitats:["lac","rivière","fleuve","marais","étang"],
    months:[5,6,7,8,9,10],
    bestWeather:["cloudy","overcast"], okWeather:["clear","rain"],
    windMin:0, windMax:40, minAirTemp:10, maxAirTemp:28,
    peakMonths:[5,6,9,10], peakHours:[5,6,7,8,18,19,20],
    waterColor:["claire","verte","trouble"],
    bestDepth:["surface","peu profond"], bestCurrent:["lent","nul"],
    bestVegetation:["herbiers","nénuphars"],
    bestTechnique:["spinning"],
    moonBonus:["pleine","croissante"],
    pressureTrend:"baisse",
    baits:[
      {name:"Spinnerbait",           why:"Vibrations + reflets = attaque instinctive",             bestWeather:["cloudy","overcast"],        bestMonths:[5,6,9,10],  nightBonus:false},
      {name:"Poisson nageur 15cm",   why:"Grosse proie = gros brochet, mortels au crépuscule",    bestWeather:["clear","cloudy"],           bestMonths:[6,7,8],     nightBonus:false},
      {name:"Leurre souple shad",    why:"Action naturelle, fonctionne en toutes conditions",     bestWeather:["cloudy","overcast","rain"], bestMonths:[5,9,10],    nightBonus:false},
      {name:"Vif (crapet/perche)",   why:"Le plus efficace, technique de précision",              bestWeather:["overcast","rain"],          bestMonths:[5,6,10],    nightBonus:false},
    ],
    tip:"Cherche les herbiers au lever du soleil. S'active avant l'orage.",
    regulation:"Limite: 2/jour · Taille min: 60 cm",
  },
  {
    id:3, name:"Achigan à grande bouche", emoji:"🐠", color:"#3fa89a",
    habitats:["lac","rivière","étang"],
    months:[5,6,7,8,9],
    bestWeather:["clear"], okWeather:["cloudy"],
    windMin:0, windMax:20, minAirTemp:20, maxAirTemp:35,
    peakMonths:[6,7,8], peakHours:[6,7,8,19,20],
    waterColor:["claire","verte"],
    bestDepth:["surface","peu profond"], bestCurrent:["lent","nul"],
    bestVegetation:["herbiers","bois coulé","quais"],
    bestTechnique:["spinning"],
    moonBonus:["pleine"],
    pressureTrend:"stable",
    baits:[
      {name:"Topwater (Popper)",     why:"Explosif en surface par temps chaud et ensoleillé",     bestWeather:["clear"],         bestMonths:[6,7,8],   nightBonus:false},
      {name:"Worm texan 7\"",        why:"Incontournable sur structures submergées",              bestWeather:["clear","cloudy"],bestMonths:[6,7,8,9], nightBonus:false},
      {name:"Crankbait",             why:"Couvre beaucoup d'eau, cherche les zones actives",     bestWeather:["cloudy"],        bestMonths:[5,9],     nightBonus:false},
      {name:"Jig à pinceau",         why:"Fond rocheux et couvertures végétales",                bestWeather:["cloudy","overcast"],bestMonths:[5,6,9], nightBonus:false},
    ],
    tip:"Aime la chaleur et le soleil. Vise les docks, rochers et bois coulés.",
    regulation:"Limite: 5/jour · Taille min: 30 cm",
  },
  {
    id:4, name:"Achigan à petite bouche", emoji:"🐠", color:"#5b9bd5",
    habitats:["lac","rivière","fleuve"],
    months:[5,6,7,8,9],
    bestWeather:["cloudy","overcast"], okWeather:["clear","rain"],
    windMin:5, windMax:30, minAirTemp:14, maxAirTemp:28,
    peakMonths:[5,6,9], peakHours:[6,7,8,9,18,19,20],
    waterColor:["claire","verte"],
    bestDepth:["milieu","fond"], bestCurrent:["moyen","rapide"],
    bestVegetation:["rochers","graviers"],
    bestTechnique:["spinning"],
    moonBonus:["nouvelle","décroissante"],
    pressureTrend:"stable",
    baits:[
      {name:"Dropshot finesse",      why:"Vertical, redoutable en eaux claires profondes",       bestWeather:["clear","cloudy"],           bestMonths:[6,7,8],    nightBonus:false},
      {name:"Ned rig (TRD)",         why:"Action subtile pour poissons méfiants",                bestWeather:["cloudy","overcast"],        bestMonths:[5,9],      nightBonus:false},
      {name:"Tube jig 3-4\"",        why:"Imite l'écrevisse sur fond rocheux",                  bestWeather:["cloudy","overcast","rain"], bestMonths:[5,6,9,10], nightBonus:false},
      {name:"Swimbait",              why:"Couvre les zones à graviers et herbiers",             bestWeather:["clear","cloudy"],           bestMonths:[6,7,8],    nightBonus:false},
    ],
    tip:"Préfère les eaux fraîches et rocheuses. Plus actif par vent léger (vague).",
    regulation:"Limite: 5/jour · Taille min: 30 cm",
  },
  {
    id:5, name:"Truite mouchetée", emoji:"🐟", color:"#e06c75",
    habitats:["rivière","lac","ruisseau"],
    months:[4,5,6,9,10,11],
    bestWeather:["cloudy","overcast"], okWeather:["clear","rain"],
    windMin:0, windMax:15, minAirTemp:5, maxAirTemp:20,
    peakMonths:[5,6,10], peakHours:[6,7,8,9,17,18,19],
    waterColor:["claire","verte"],
    bestDepth:["surface","peu profond"], bestCurrent:["moyen","rapide"],
    bestVegetation:["rochers","rapides"],
    bestTechnique:["mouche","spinning"],
    moonBonus:["pleine","croissante"],
    pressureTrend:"stable",
    baits:[
      {name:"Mouche sèche",          why:"Parfait lors des éclosions d'insectes en surface",     bestWeather:["cloudy","overcast"],        bestMonths:[5,6,9,10],  nightBonus:false},
      {name:"Cuillère ondulante",    why:"Efficace dans les rapides et les fosses",              bestWeather:["cloudy","overcast","rain"], bestMonths:[5,9,10,11], nightBonus:false},
      {name:"Ver de terre naturel",  why:"Après la pluie = imparable dans les ruisseaux",        bestWeather:["rain","overcast"],          bestMonths:[5,6,9,10],  nightBonus:false},
      {name:"Nymphe (pheasant)",     why:"Profondeur quand la surface est inactive",             bestWeather:["clear","cloudy"],           bestMonths:[4,5,10,11], nightBonus:false},
    ],
    tip:"Discrétion totale requise. Approche amont, lancer aval dans le courant.",
    regulation:"Limite: 5/jour · Taille min: 20 cm",
  },
  {
    id:6, name:"Truite arc-en-ciel", emoji:"🐟", color:"#c678dd",
    habitats:["rivière","lac"],
    months:[3,4,5,6,9,10,11],
    bestWeather:["cloudy"], okWeather:["clear","overcast"],
    windMin:0, windMax:20, minAirTemp:5, maxAirTemp:20,
    peakMonths:[4,5,10], peakHours:[7,8,9,17,18,19],
    waterColor:["claire"],
    bestDepth:["milieu","fond"], bestCurrent:["moyen","rapide"],
    bestVegetation:["rapides","fosses"],
    bestTechnique:["mouche","spinning"],
    moonBonus:["pleine","croissante"],
    pressureTrend:"stable",
    baits:[
      {name:"Kastmaster (cuillère)", why:"Scintillement irrésistible en eau vive",               bestWeather:["cloudy","clear"],           bestMonths:[4,5,10],    nightBonus:false},
      {name:"Spinner Mepps #3",      why:"Vibration et couleur déclenchent l'instinct",           bestWeather:["cloudy","overcast"],        bestMonths:[5,9,10],    nightBonus:false},
      {name:"Œufs de saumon (roe)", why:"Naturel, redoutable en frai (automne surtout)",         bestWeather:["overcast","rain"],          bestMonths:[9,10,11],   nightBonus:false},
      {name:"Nymphe beadhead",       why:"Sous la surface dans les fosses, technique expert",     bestWeather:["clear","cloudy"],           bestMonths:[4,5,6],     nightBonus:false},
    ],
    tip:"Très combative. Les fosses sous les rapides sont ses cachettes favorites.",
    regulation:"Variable selon région · Vérifier règlement local",
  },
  {
    id:7, name:"Maskinongé", emoji:"🦈", color:"#e55a2b",
    habitats:["lac","fleuve","rivière"],
    months:[5,6,7,8,9,10],
    bestWeather:["cloudy","overcast"], okWeather:["rain"],
    windMin:5, windMax:35, minAirTemp:15, maxAirTemp:28,
    peakMonths:[9,10], peakHours:[6,7,8,18,19,20,21],
    waterColor:["claire","verte"],
    bestDepth:["peu profond","milieu"], bestCurrent:["lent","nul"],
    bestVegetation:["herbiers","bois coulé"],
    bestTechnique:["spinning"],
    moonBonus:["pleine","nouvelle"],
    pressureTrend:"baisse",
    baits:[
      {name:"Grand bucktail 8\"+",   why:"Classique du musky, figure-8 obligatoire",             bestWeather:["cloudy","overcast"],        bestMonths:[9,10],   nightBonus:false},
      {name:"Glide bait (Dawg)",     why:"Action en S irrésistible pour les gros sujets",        bestWeather:["cloudy","overcast"],        bestMonths:[9,10],   nightBonus:false},
      {name:"Gros poisson nageur",   why:"Profondeur variable, couvre les zones efficacement",   bestWeather:["cloudy","rain"],            bestMonths:[5,6,7,8],nightBonus:false},
      {name:"Jerkbait XXL",          why:"Action agressive, déclenche les attaques réflexes",    bestWeather:["overcast","rain"],          bestMonths:[9,10],   nightBonus:false},
    ],
    tip:"Le 'poisson de 10 000 lancers'. Figure-8 à chaque récupération.",
    regulation:"Limite: 1/jour · Taille min: 76 cm · Relâche recommandée",
  },
  {
    id:8, name:"Perchaude", emoji:"🐡", color:"#f7b731",
    habitats:["lac","rivière","fleuve","canal","étang"],
    months:[1,2,3,4,5,9,10,11,12],
    bestWeather:["clear","cloudy"], okWeather:["overcast","snow"],
    windMin:0, windMax:50, minAirTemp:-30, maxAirTemp:25,
    peakMonths:[1,2,3,12], peakHours:[8,9,10,11,14,15,16],
    waterColor:["claire","verte","trouble"],
    bestDepth:["milieu","fond"], bestCurrent:["lent","nul"],
    bestVegetation:["herbiers","fond sableux"],
    bestTechnique:["pêche blanche","spinning"],
    moonBonus:["pleine","nouvelle"],
    pressureTrend:"hausse",
    baits:[
      {name:"Petit jig + asticot",   why:"Incontournable de la pêche blanche sous la glace",     bestWeather:["clear","cloudy","snow"],    bestMonths:[1,2,3,12],  nightBonus:false},
      {name:"Minnow vivant",         why:"Très efficace en eaux libres, formation en bancs",     bestWeather:["clear","cloudy"],           bestMonths:[4,5,9,10],  nightBonus:false},
      {name:"Ver de terre",          why:"Simple et efficace, idéal pour débutants",             bestWeather:["clear","cloudy","overcast"],bestMonths:[5,9,10,11], nightBonus:false},
      {name:"Cuillère clignotante",  why:"Reflets lumineux, attire les bancs sous la glace",     bestWeather:["clear","snow"],             bestMonths:[1,2,3,12],  nightBonus:false},
    ],
    tip:"Localise un banc actif et reste sur place. Pêche verticale très efficace.",
    regulation:"Limite: 50/jour · Reine de la pêche blanche !",
  },
  {
    id:9, name:"Omble de fontaine", emoji:"🐟", color:"#56b6c2",
    habitats:["rivière","lac","ruisseau"],
    months:[4,5,6,7,8,9,10],
    bestWeather:["cloudy"], okWeather:["clear","overcast"],
    windMin:0, windMax:15, minAirTemp:5, maxAirTemp:20,
    peakMonths:[5,6,9,10], peakHours:[6,7,8,18,19,20],
    waterColor:["claire"],
    bestDepth:["surface","peu profond"], bestCurrent:["moyen","rapide"],
    bestVegetation:["rapides","rochers"],
    bestTechnique:["mouche","spinning"],
    moonBonus:["pleine","croissante"],
    pressureTrend:"stable",
    baits:[
      {name:"Mouche sèche (elk hair)", why:"Technique reine lors des éclosions en surface",      bestWeather:["cloudy"],                   bestMonths:[5,6,9],     nightBonus:false},
      {name:"Nymphe de fond",          why:"Imite larves d'insectes, productif toute saison",    bestWeather:["clear","cloudy","overcast"], bestMonths:[4,5,10],    nightBonus:false},
      {name:"Cuillère légère 2-3g",    why:"Petits cours d'eau, attaque vive et directe",        bestWeather:["cloudy","overcast"],         bestMonths:[5,6,9,10],  nightBonus:false},
      {name:"Ver de vase",             why:"Fond de ruisseau froid, naturel et odorant",         bestWeather:["overcast","rain"],           bestMonths:[4,5,10],    nightBonus:false},
    ],
    tip:"Poisson des eaux vierges. Zéro bruit, zéro ombre portée sur l'eau.",
    regulation:"Limite: 5/jour · Emblème du Québec",
  },
  {
    id:10, name:"Saumon atlantique", emoji:"🐟", color:"#d19a66",
    habitats:["rivière","fleuve"],
    months:[6,7,8,9],
    bestWeather:["cloudy","overcast","rain"], okWeather:["clear"],
    windMin:0, windMax:25, minAirTemp:10, maxAirTemp:25,
    peakMonths:[7,8], peakHours:[6,7,8,9,18,19,20],
    waterColor:["claire","verte"],
    bestDepth:["fond","milieu"], bestCurrent:["moyen","rapide"],
    bestVegetation:["fosses","rapides"],
    bestTechnique:["mouche","spinning"],
    moonBonus:["pleine","nouvelle"],
    pressureTrend:"baisse",
    baits:[
      {name:"Mouche noyée Butterfly", why:"La mouche classique du saumon en rivière québécoise", bestWeather:["cloudy","overcast"],         bestMonths:[6,7,8],  nightBonus:false},
      {name:"Spey fly (Intruder)",    why:"Grande mouche, eau haute après pluie",               bestWeather:["overcast","rain"],           bestMonths:[7,8,9],  nightBonus:false},
      {name:"Cuillère saumon #5",     why:"Déclencheur réflexe en eau colorée",                 bestWeather:["cloudy","rain"],             bestMonths:[8,9],    nightBonus:false},
      {name:"Devon minnow",           why:"Rotation attrape les poissons réfractaires",         bestWeather:["overcast","cloudy"],         bestMonths:[7,8],    nightBonus:false},
    ],
    tip:"⚠️ Permis spécial. Rivières Gaspé, Côte-Nord, Charlevoix.",
    regulation:"⚠️ Permis spécial obligatoire · Quota très strict",
  },
  {
    id:11, name:"Crapet-soleil", emoji:"🐡", color:"#e5c07b",
    habitats:["lac","rivière","canal","étang"],
    months:[5,6,7,8,9],
    bestWeather:["clear"], okWeather:["cloudy"],
    windMin:0, windMax:20, minAirTemp:18, maxAirTemp:35,
    peakMonths:[6,7,8], peakHours:[8,9,10,11,15,16,17,18],
    waterColor:["claire","verte"],
    bestDepth:["surface","peu profond"], bestCurrent:["lent","nul"],
    bestVegetation:["herbiers","nénuphars","quais"],
    bestTechnique:["mouche","spinning"],
    moonBonus:["pleine"],
    pressureTrend:"stable",
    baits:[
      {name:"Ver de terre (petit)",   why:"Appât #1 du crapet, simple et universel",              bestWeather:["clear","cloudy"],           bestMonths:[5,6,7,8,9], nightBonus:false},
      {name:"Petit popper",           why:"Explosif en surface autour des quais et herbiers",     bestWeather:["clear"],                    bestMonths:[6,7,8],     nightBonus:false},
      {name:"Mouche sèche",           why:"Introduction parfaite à la pêche à la mouche",         bestWeather:["clear","cloudy"],           bestMonths:[6,7,8],     nightBonus:false},
      {name:"Libellule artificielle", why:"Surface près des rives végétalisées",                  bestWeather:["clear"],                    bestMonths:[7,8],       nightBonus:false},
    ],
    tip:"Idéal pour initier les enfants. Autour des quais et des herbiers.",
    regulation:"Pas de limite · Parfait poisson d'initiation !",
  },
  {
    id:12, name:"Barbotte brune", emoji:"🐟", color:"#8b6f47",
    habitats:["rivière","lac","fleuve","canal","étang","marais","port"],
    months:[5,6,7,8,9],
    bestWeather:["overcast","rain"], okWeather:["cloudy","clear"],
    windMin:0, windMax:50, minAirTemp:18, maxAirTemp:32,
    peakMonths:[6,7,8], peakHours:[20,21,22,23,0,1,2,3,4,5],
    waterColor:["trouble","noire"],
    bestDepth:["fond"], bestCurrent:["lent","nul"],
    bestVegetation:["fond limoneux","sable"],
    bestTechnique:["spinning"],
    moonBonus:["nouvelle","décroissante"],
    pressureTrend:"baisse",
    baits:[
      {name:"Ver de terre (gros)",    why:"Meilleur appât de nuit, odeur forte et naturelle",     bestWeather:["overcast","rain","cloudy"], bestMonths:[6,7,8], nightBonus:true},
      {name:"Foie de poulet",         why:"Odeur puissante irrésistible pour la barbotte",        bestWeather:["overcast","rain"],          bestMonths:[6,7,8], nightBonus:true},
      {name:"Asticot en grappe",      why:"Fond boueux et limoneux, très efficace",               bestWeather:["cloudy","overcast"],        bestMonths:[5,6,9], nightBonus:true},
      {name:"Boilette maison",        why:"Pêche stationnaire de nuit au fond de rivière",        bestWeather:["overcast","rain"],          bestMonths:[6,7,8], nightBonus:true},
    ],
    tip:"Active la nuit, surtout après la pluie. Montage paternoster au fond.",
    regulation:"Limite: 15/jour · Excellente à la poêle !",
  },
];

// ═══════════════════════════════════════════════════════════════════════
//  CONSTANTES
// ═══════════════════════════════════════════════════════════════════════
const MONTHS_FR   = ["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"];
const MONTHS_FULL = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const WATER_TYPES = [
  {id:"lac",        label:"Lac",        icon:"🏞️"},
  {id:"rivière",    label:"Rivière",    icon:"🌊"},
  {id:"fleuve",     label:"Fleuve",     icon:"🛶"},
  {id:"canal",      label:"Canal",      icon:"⚓"},
  {id:"étang",      label:"Étang",      icon:"🌿"},
  {id:"marais",     label:"Marais",     icon:"🐸"},
  {id:"ruisseau",   label:"Ruisseau",   icon:"〰️"},
  {id:"tourbière",  label:"Tourbière",  icon:"🍂"},
  {id:"port",       label:"Port/Baie",  icon:"⛵"},
];

const DEPTH_OPTIONS    = [{id:"surface",label:"Surface",icon:"🌊"},{id:"peu profond",label:"Peu prof.",icon:"📏"},{id:"milieu",label:"Milieu",icon:"🎯"},{id:"fond",label:"Fond",icon:"⬇️"}];
const CURRENT_OPTIONS  = [{id:"nul",label:"Nul",icon:"🪨"},{id:"lent",label:"Lent",icon:"🐢"},{id:"moyen",label:"Moyen",icon:"🚣"},{id:"rapide",label:"Rapide",icon:"⚡"}];

const VEGET_OPTIONS    = [{id:"herbiers",label:"Herbiers"},{id:"rochers",label:"Rochers"},{id:"bois coulé",label:"Bois coulé"},{id:"sable",label:"Sable"},{id:"fond limoneux",label:"Limon"},{id:"nénuphars",label:"Nénuphars"}];

const WMO_MAP = {
  0:"clear",1:"clear",2:"cloudy",3:"overcast",45:"fog",48:"fog",
  51:"rain",53:"rain",55:"rain",61:"rain",63:"rain",65:"rain",
  71:"snow",73:"snow",75:"snow",77:"snow",80:"rain",81:"rain",82:"rain",
  85:"snow",86:"snow",95:"storm",96:"storm",99:"storm",
};
const WEATHER_LABELS = {clear:"Ensoleillé",cloudy:"Nuageux",overcast:"Couvert",fog:"Brouillard",rain:"Pluie",snow:"Neige",storm:"Orage"};
const WEATHER_ICONS  = {clear:"☀️",cloudy:"⛅",overcast:"☁️",fog:"🌫️",rain:"🌧️",snow:"❄️",storm:"⛈️"};
const MOON_LABELS    = {new:"🌑 Nouvelle",waxing:"🌓 Croissante",full:"🌕 Pleine",waning:"🌗 Décroissante"};

// ═══════════════════════════════════════════════════════════════════════
//  CALCUL PHASE DE LUNE (astronomie locale, pas d'API)
// ═══════════════════════════════════════════════════════════════════════
function getMoonPhase(date = new Date()) {
  const year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate();
  let y = year, m = month;
  if (m < 3) { y--; m += 12; }
  const A = Math.floor(y/100), B = 2 - A + Math.floor(A/4);
  const jd = Math.floor(365.25*(y+4716)) + Math.floor(30.6001*(m+1)) + day + B - 1524.5;
  const daysSinceNew = (jd - 2451549.5) % 29.53059;
  const normalized = ((daysSinceNew % 29.53059) + 29.53059) % 29.53059;
  let phase, label;
  if (normalized < 1.85)        { phase="new";     label="Nouvelle lune"; }
  else if (normalized < 7.38)   { phase="waxing";  label="Croissante"; }
  else if (normalized < 9.22)   { phase="full";    label="Premier quartier"; }
  else if (normalized < 14.77)  { phase="waxing";  label="Gibbeuse croissante"; }
  else if (normalized < 16.61)  { phase="full";    label="Pleine lune"; }
  else if (normalized < 22.15)  { phase="waning";  label="Gibbeuse décroissante"; }
  else if (normalized < 23.99)  { phase="waning";  label="Dernier quartier"; }
  else if (normalized < 29.53)  { phase="new";     label="Décroissante"; }
  else                          { phase="new";     label="Nouvelle lune"; }
  const emoji = phase==="new"?"🌑":phase==="waxing"?"🌓":phase==="full"?"🌕":"🌗";
  return { phase, label, emoji, normalized: Math.round(normalized) };
}

// ═══════════════════════════════════════════════════════════════════════
//  API HELPERS
// ═══════════════════════════════════════════════════════════════════════

// Profils par défaut selon le type de plan d'eau détecté
// L'utilisateur peut toujours modifier manuellement après
const WATER_PROFILES = {
  canal:      { current:"lent",    depth:"fond",        vegetation:["fond limoneux","sable"] },
  fleuve:     { current:"moyen",   depth:"fond",        vegetation:["fond limoneux","sable","bois coulé"] },
  rivière:    { current:"moyen",   depth:"peu profond", vegetation:["rochers","rapides","bois coulé"] },
  lac:        { current:"nul",     depth:"milieu",      vegetation:["herbiers","bois coulé"] },
  étang:      { current:"nul",     depth:"peu profond", vegetation:["herbiers","nénuphars"] },
  marais:     { current:"nul",     depth:"surface",     vegetation:["herbiers","nénuphars"] },
  ruisseau:   { current:"rapide",  depth:"surface",     vegetation:["rochers","rapides"] },
  tourbière:  { current:"nul",     depth:"peu profond", vegetation:["herbiers","fond limoneux"] },
  port:       { current:"lent",    depth:"fond",        vegetation:["fond limoneux","sable"] },
};

async function fetchWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weathercode,precipitation,surface_pressure&timezone=America%2FToronto`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("météo indisponible");
  const d = await r.json();
  const c = d.current;
  // Récupérer aussi les données d'hier pour la tendance de pression
  const url2 = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=surface_pressure&past_days=1&forecast_days=0&timezone=America%2FToronto`;
  let pressureTrend = "stable";
  try {
    const r2 = await fetch(url2);
    const d2 = await r2.json();
    const pressures = d2.hourly?.surface_pressure ?? [];
    if (pressures.length >= 6) {
      const recent = pressures.slice(-1)[0];
      const old    = pressures.slice(-6)[0];
      const diff   = recent - old;
      pressureTrend = diff > 1.5 ? "hausse" : diff < -1.5 ? "baisse" : "stable";
    }
  } catch {}
  return {
    temp: Math.round(c.temperature_2m),
    wind: Math.round(c.wind_speed_10m),
    precip: c.precipitation ?? 0,
    pressure: Math.round(c.surface_pressure ?? 1013),
    pressureTrend,
    condition: WMO_MAP[c.weathercode] ?? "cloudy",
  };
}

// Normalise une chaîne : minuscules + supprime accents
function normalize(str) {
  return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

// Mots-clés de plans d'eau (sans accents pour la comparaison)
const WATER_KEYWORDS = [
  "lac","lake","riviere","river","fleuve","canal","etang","pond",
  "ruisseau","creek","brook","marais","marsh","baie","bay","tourbiere",
];

function looksLikeWaterBody(query) {
  const q = normalize(query);
  return WATER_KEYWORDS.some(kw =>
    q.startsWith(kw + " ") || q.startsWith(kw + "-") ||
    q === kw ||
    q.includes(" " + kw) || q.includes("-" + kw)
  );
}

// Détermine le type BestBait depuis les champs class/type Nominatim
function nominatimToWaterType(cls, type) {
  if (cls === "waterway" || type === "river" || type === "riverbank") return "fleuve";
  if (type === "canal")                                               return "canal";
  if (type === "stream" || type === "drain")                          return "ruisseau";
  if (type === "lake")                                                return "lac";
  if (type === "water" || cls === "natural")                          return "lac"; // défaut natural
  if (type === "pond")                                                return "étang";
  if (type === "wetland" || type === "marsh" || type === "bog")       return "marais";
  if (type === "bay" || type === "harbour")                           return "port";
  return null;
}

async function geocodeAddress(query) {
  const isWater = looksLikeWaterBody(query);
  // limit=10 pour avoir plus de chances de trouver le bon résultat
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query+" Québec Canada")}&format=json&limit=10&accept-language=fr&addressdetails=1`;
  const r = await fetch(url, {headers:{"User-Agent":"BestBait/1.0"}});
  if (!r.ok) throw new Error("géocodage échoué");
  const data = await r.json();
  if (!data.length) throw new Error("Lieu introuvable");

  let best = data[0];

  if (isWater) {
    // Cherche un résultat qui est un vrai plan d'eau, pas une municipalité/admin
    const waterResult = data.find(d => {
      const wt = nominatimToWaterType(d.class, d.type);
      return wt !== null;
    });
    if (waterResult) best = waterResult;
    // Sinon on garde data[0] (meilleur résultat Nominatim) et on laissera
    // Overpass chercher autour des coordonnées
  }

  const waterType = nominatimToWaterType(best.class, best.type);
  return {
    lat: parseFloat(best.lat),
    lon: parseFloat(best.lon),
    displayName: best.display_name,
    isWaterResult: waterType !== null,
    waterType,
    osmName: best.display_name.split(",")[0].trim(),
  };
}

// Construit un objet plan d'eau depuis un résultat Nominatim direct
function waterBodyFromNominatim(geo) {
  if (!geo.waterType) return null;
  return { name: geo.osmName, type: geo.waterType, dist: "0.0" };
}

async function fetchNearestWaterBody(lat, lon) {
  // Requête élargie : on demande plus de résultats et on inclut les canaux nommés
  // "out center" retourne le centre géométrique de chaque élément pour calculer la distance
  const query = `
    [out:json][timeout:15];
    (
      way["waterway"="canal"](around:8000,${lat},${lon});
      way["waterway"="river"](around:6000,${lat},${lon});
      way["waterway"="stream"](around:4000,${lat},${lon});
      way["waterway"="drain"](around:2000,${lat},${lon});
      way["natural"="water"]["water"!="wastewater"](around:6000,${lat},${lon});
      relation["natural"="water"](around:6000,${lat},${lon});
      way["natural"="wetland"](around:4000,${lat},${lon});
      relation["natural"="wetland"](around:4000,${lat},${lon});
      way["harbour"="yes"](around:3000,${lat},${lon});
      node["natural"="spring"](around:2000,${lat},${lon});
    );
    out tags center 30;
  `;
  try {
    const r = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`, {signal:AbortSignal.timeout(12000)});
    if (!r.ok) return null;
    const d = await r.json();
    if (!d.elements?.length) return null;

    const scored = d.elements.map(el => {
      const t = el.tags || {};
      const name = t.name || t["name:fr"] || t["name:en"] || null;

      // Déterminer le type depuis les tags OSM
      let type = "lac"; // défaut
      if      (t.waterway === "canal")                              type = "canal";
      else if (t.waterway === "river")                              type = "fleuve";
      else if (t.waterway === "stream" || t.waterway === "drain")   type = "ruisseau";
      else if (t.water === "river")                                 type = "fleuve";
      else if (t.water === "canal")                                 type = "canal";
      else if (t.water === "pond")                                  type = "étang";
      else if (t.water === "lake")                                  type = "lac";
      else if (t.water === "bog" || t.natural === "wetland" ||
               t.wetland === "bog" || t.wetland === "fen")          type = "tourbière";
      else if (t.water === "marsh" || t.wetland === "marsh" ||
               t.natural === "marsh")                               type = "marais";
      else if (t.harbour === "yes" || t.water === "harbour")        type = "port";

      // Calculer la distance approximative depuis le centre de l'élément
      let dist = 9999;
      const center = el.center;
      if (center) {
        const dlat = center.lat - lat;
        const dlon = center.lon - lon;
        dist = Math.sqrt(dlat*dlat + dlon*dlon) * 111; // km approx
      }

      // Score : on favorise fortement les éléments proches et nommés
      // Un canal/rivière nommé à 500m bat un lac nommé à 3km
      let score = 0;
      if (name) score += 20;                    // a un nom
      if (dist < 0.3) score += 50;              // très proche < 300m
      else if (dist < 1) score += 30;           // proche < 1km
      else if (dist < 2) score += 15;           // < 2km
      else if (dist < 4) score += 5;            // < 4km
      // Bonus canaux et rivières (souvent plus pertinents que les petits étangs)
      if (type === "canal")   score += 10;
      if (type === "fleuve")  score += 8;
      if (type === "rivière") score += 6;

      return { name, type, score, dist: dist.toFixed(1) };
    });

    // Pour les ways linéaires (rivières, canaux), le "center" peut être loin
    // On pénalise les éléments sans center (impossible à localiser)
    scored.sort((a,b) => b.score - a.score);
    // Filtrer les résultats aberrants : si le meilleur est à >5km et qu'il y en a un à <2km, prendre le plus proche
    const veryClose = scored.filter(s => parseFloat(s.dist) < 2);
    if (veryClose.length > 0 && parseFloat(scored[0].dist) > 5) {
      veryClose.sort((a,b) => b.score - a.score);
      return veryClose[0];
    }
    return scored[0] ?? null;
  } catch { return null; }
}

// ═══════════════════════════════════════════════════════════════════════
//  IDENTIFICATION IA — Claude Vision via API Anthropic (artifact)
// ═══════════════════════════════════════════════════════════════════════
async function identifyFishWithClaude(base64, mediaType) {
  // Appel sécurisé via Netlify Function — la clé API reste côté serveur
  const resp = await fetch("/.netlify/functions/identify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ base64, mediaType })
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Erreur serveur ${resp.status}: ${err.slice(0,100)}`);
  }
  return await resp.json();
}

// ═══════════════════════════════════════════════════════════════════════
//  MOTEUR DE SCORING
//  Max théorique : 40+30+25+15+20+12+8+10+8+8 = 176 pts
// ═══════════════════════════════════════════════════════════════════════
const MAX_SCORE = 170;

function scoreBait(bait, {month, weather, hour}) {
  let s = 50;
  if (month) s += bait.bestMonths.includes(month) ? 20 : -15;
  if (weather) s += bait.bestWeather.includes(weather.condition) ? 20 : -5;
  if (hour !== null && bait.nightBonus) {
    const h = parseInt(hour);
    s += (h>=20||h<=5) ? 15 : -10;
  }
  return Math.max(0, Math.min(100, s));
}

// ═══════════════════════════════════════════════════════════════════════
//  MOTEUR COULEUR D'APPÂT
//  Retourne 2-3 couleurs recommandées + justification selon :
//    1. Clarté de l'eau   2. Luminosité (heure+météo)
//    3. Saison            4. Espèce cible
// ═══════════════════════════════════════════════════════════════════════

// Palette de couleurs avec swatches hex pour l'affichage
const COLOR_PALETTE = {
  // Naturels / imitatifs
  "Naturel / olive":     { hex:"#7a8c3e", desc:"Imite les proies naturelles, discret" },
  "Brun / écrevisse":    { hex:"#8b4513", desc:"Imite crabes, écrevisses, insectes" },
  "Argenté / perche":    { hex:"#c0c0c0", desc:"Reflets vif, imite poissons-appâts" },
  "Perche (vert-jaune)": { hex:"#9ab04a", desc:"Imite la perche, universellement efficace" },
  // Vifs / attracteurs
  "Chartreuse":          { hex:"#7fff00", desc:"Très visible en eau trouble ou faible lumière" },
  "Orange fluo":         { hex:"#ff6600", desc:"Contraste maximum, déclenche l'attaque réflexe" },
  "Jaune / doré":        { hex:"#ffd700", desc:"Visible en profondeur, imite le ventre de proie" },
  "Rouge / sang":        { hex:"#cc2200", desc:"Simule une proie blessée, très attracteur" },
  // Clairs / translucides
  "Blanc / nacré":       { hex:"#f0f0f0", desc:"Lumineux, idéal sous la glace ou nuit claire" },
  "Transparent / fumé":  { hex:"#90a0b0", desc:"Ultra-discret en eau très claire et soleil" },
  "Bleu / violet":       { hex:"#5050cc", desc:"Visible en grande profondeur, lumière bleue" },
  // Sombres
  "Noir / nuit":         { hex:"#222233", desc:"Silhouette nette contre ciel nocturne" },
  "Moteur oil":          { hex:"#3a3020", desc:"Ton foncé irisé, redoutable par faible lumière" },
};

function recommendBaitColor({waterColor, weather, hour, month, fish}) {
  let colors = [];
  let reasons = [];

  const h = hour !== null ? parseInt(hour) : 12;
  const isNight   = h >= 21 || h <= 5;
  const isDawn    = h >= 5  && h <= 8;
  const isDusk    = h >= 18 && h <= 21;
  const isMidDay  = h >= 10 && h <= 15;
  const isDark    = weather && ["overcast","rain","storm","fog"].includes(weather.condition);
  const isSunny   = weather && weather.condition === "clear";
  const isCloudy  = weather && weather.condition === "cloudy";

  // ── 1. CLARTÉ DE L'EAU (facteur dominant) ──────────────────────────
  if (waterColor === "trouble" || waterColor === "noire") {
    colors.push("Chartreuse", "Orange fluo", "Jaune / doré");
    reasons.push("Eau trouble → couleurs vives pour maximiser la visibilité");
  } else if (waterColor === "verte") {
    colors.push("Chartreuse", "Blanc / nacré", "Orange fluo");
    reasons.push("Eau verte → contraste élevé, chartreuse très efficace");
  } else if (waterColor === "claire") {
    // Eau claire : dépend fortement de la lumière
    if (isSunny && isMidDay) {
      colors.push("Transparent / fumé", "Naturel / olive", "Brun / écrevisse");
      reasons.push("Eau claire + plein soleil → naturel et discret");
    } else {
      colors.push("Argenté / perche", "Naturel / olive", "Perche (vert-jaune)");
      reasons.push("Eau claire → imitatif, reflets naturels");
    }
  } else {
    // Pas de clarté précisée — se base sur lumière + saison
    colors.push("Perche (vert-jaune)", "Chartreuse");
    reasons.push("Couleurs polyvalentes en absence d'info sur l'eau");
  }

  // ── 2. LUMINOSITÉ — heure + météo ───────────────────────────────────
  if (isNight) {
    colors.unshift("Noir / nuit");
    colors.push("Blanc / nacré");
    reasons.push("Nuit → silhouette sombre ou blanc lumineux sous la lune");
  } else if (isDawn || isDusk) {
    colors.push("Orange fluo", "Rouge / sang");
    reasons.push("Aube/crépuscule → lumière rasante, orange et rouge très attracteurs");
  } else if (isDark) {
    colors.push("Chartreuse", "Blanc / nacré");
    reasons.push("Temps couvert/pluie → luminosité faible, couleurs claires et vives");
  } else if (isSunny && isMidDay) {
    // Déjà traité dans clarté de l'eau, on évite le doublon
    if (!colors.includes("Transparent / fumé")) {
      colors.push("Transparent / fumé");
      reasons.push("Plein soleil → appâts discrets, imitatifs");
    }
  }

  // ── 3. SAISON ────────────────────────────────────────────────────────
  if (month) {
    if ([3,4,5].includes(month)) { // Printemps
      if (!colors.includes("Rouge / sang")) colors.push("Rouge / sang");
      reasons.push("Printemps → poissons agressifs, rouge/orange très efficaces");
    } else if ([6,7,8].includes(month)) { // Été
      if (!colors.includes("Naturel / olive")) colors.push("Naturel / olive");
      // En été eau claire, privilégier naturel déjà capturé
    } else if ([9,10].includes(month)) { // Automne
      if (!colors.includes("Orange fluo")) colors.push("Orange fluo");
      reasons.push("Automne → frai, orange/rouge imitent les œufs");
    } else if ([11,12,1,2].includes(month)) { // Hiver
      colors.unshift("Blanc / nacré");
      if (!colors.includes("Argenté / perche")) colors.push("Argenté / perche");
      reasons.push("Hiver → blanc et argent brillent sous la glace");
    }
  }

  // ── 4. ESPÈCE CIBLE ──────────────────────────────────────────────────
  if (fish) {
    if (fish.id === 1) { // Doré jaune — adore le jaune
      if (!colors.includes("Jaune / doré")) colors.splice(1,0,"Jaune / doré");
      reasons.push("Doré jaune → réagit fortement au jaune/doré");
    } else if (fish.id === 2) { // Brochet — aime les couleurs vives
      if (!colors.includes("Orange fluo")) colors.push("Orange fluo");
      reasons.push("Brochet → prédateur visuel, couleurs vives déclenchent l'attaque");
    } else if (fish.id === 7) { // Maskinongé — très réactif au blanc et noir
      colors.unshift("Blanc / nacré");
      colors.push("Noir / nuit");
      reasons.push("Maskinongé → contraste blanc/noir, leurres larges voyants");
    } else if ([5,6,9].includes(fish.id)) { // Truites et omble — préfèrent naturel
      if (!colors.includes("Brun / écrevisse")) colors.splice(1,0,"Brun / écrevisse");
      if (!colors.includes("Naturel / olive"))  colors.splice(2,0,"Naturel / olive");
      reasons.push("Truite/Omble → eau froide claire, imitatif et naturel prioritaires");
    } else if (fish.id === 8) { // Perchaude — aime le blanc et jaune
      colors.unshift("Blanc / nacré");
      if (!colors.includes("Jaune / doré")) colors.push("Jaune / doré");
      reasons.push("Perchaude → blanc et jaune très visibles sous la glace");
    } else if (fish.id === 12) { // Barbotte — pêche de nuit, couleur peu importante
      colors = ["Noir / nuit", "Moteur oil", "Rouge / sang"];
      reasons.length = 0;
      reasons.push("Barbotte → pêche olfactive (nuit), couleur secondaire — privilégie l'odeur");
    }
  }

  // Dédoublonner et limiter à 3 couleurs
  const unique = [...new Set(colors)].slice(0, 3);
  // Construire la raison synthétique
  const mainReason = reasons[0] ?? "Couleurs adaptées aux conditions";

  return {
    colors: unique.map(name => ({ name, ...COLOR_PALETTE[name] ?? { hex:"#888", desc:"" } })),
    reason: mainReason,
    allReasons: [...new Set(reasons)],
  };
}

function scoreFish(fish, {habitat, month, weather, hour, waterColor, depth, current, vegetation, moon}) {
  let score = 0;
  const breakdown = [];

  // 1. HABITAT ±40
  if (habitat) {
    if (fish.habitats.includes(habitat)) {
      score+=40; breakdown.push({factor:"Habitat",pts:40,ok:true,label:"Habitat idéal",detail:`${fish.name} présent en : ${fish.habitats.join(", ")}`});
    } else {
      score-=35; breakdown.push({factor:"Habitat",pts:-35,ok:false,label:"Habitat incompatible",detail:`Espèce absente. Vit en : ${fish.habitats.join(", ")}`});
    }
  }

  // 2. SAISON ±30
  if (month) {
    if (fish.peakMonths.includes(month)) {
      score+=30; breakdown.push({factor:"Saison",pts:30,ok:true,label:"Pic saisonnier 🔥",detail:`${MONTHS_FULL[month-1]} = mois de pointe. Pic : ${fish.peakMonths.map(m=>MONTHS_FR[m-1]).join(" ")}`});
    } else if (fish.months.includes(month)) {
      score+=15; breakdown.push({factor:"Saison",pts:15,ok:true,label:"En saison",detail:`Présent mais hors pic. Meilleurs mois : ${fish.peakMonths.map(m=>MONTHS_FR[m-1]).join(" ")}`});
    } else {
      score-=30; breakdown.push({factor:"Saison",pts:-30,ok:false,label:"Hors saison ⛔",detail:`Inactif en ${MONTHS_FULL[month-1]}. Saison : ${fish.months.map(m=>MONTHS_FR[m-1]).join(" ")}`});
    }
  }

  // 3. MÉTÉO ±25
  if (weather) {
    const wl = WEATHER_LABELS[weather.condition]??weather.condition;
    if (fish.bestWeather.includes(weather.condition)) {
      score+=25; breakdown.push({factor:"Météo",pts:25,ok:true,label:`Météo idéale : ${wl}`,detail:`${fish.name} particulièrement actif par ${wl.toLowerCase()}`});
    } else if (fish.okWeather.includes(weather.condition)) {
      score+=10; breakdown.push({factor:"Météo",pts:10,ok:true,label:`Météo acceptable : ${wl}`,detail:`Idéal : ${fish.bestWeather.map(w=>WEATHER_LABELS[w]).join(", ")}`});
    } else {
      score-=20; breakdown.push({factor:"Météo",pts:-20,ok:false,label:`Météo défavorable : ${wl}`,detail:`Espèce peu active. Idéal : ${fish.bestWeather.map(w=>WEATHER_LABELS[w]).join(", ")}`});
    }

    // 4. VENT ±15
    const w=weather.wind;
    if (w>fish.windMax) {
      const m=Math.min(15,Math.round((w-fish.windMax)*0.8)); score-=m;
      breakdown.push({factor:"Vent",pts:-m,ok:false,label:`Trop venteux : ${w} km/h`,detail:`Max : ${fish.windMax} km/h — excès de ${w-fish.windMax} km/h`});
    } else if (w<=fish.windMax*0.4) {
      score+=15; breakdown.push({factor:"Vent",pts:15,ok:true,label:`Vent idéal : ${w} km/h`,detail:"Eau calme, détection des proies optimale"});
    } else {
      score+=8; breakdown.push({factor:"Vent",pts:8,ok:true,label:`Vent acceptable : ${w} km/h`,detail:`Dans la plage (max ${fish.windMax} km/h)`});
    }

    // 5. TEMPÉRATURE ±20
    const t=weather.temp;
    if (t<fish.minAirTemp) {
      const m=Math.min(20,Math.round((fish.minAirTemp-t)*1.5)); score-=m;
      breakdown.push({factor:"Température",pts:-m,ok:false,label:`Trop froid : ${t}°C`,detail:`Min optimal : ${fish.minAirTemp}°C — métabolisme ralenti`});
    } else if (t>fish.maxAirTemp) {
      const m=Math.min(12,Math.round((t-fish.maxAirTemp)*1.2)); score-=m;
      breakdown.push({factor:"Température",pts:-m,ok:false,label:`Trop chaud : ${t}°C`,detail:`Max optimal : ${fish.maxAirTemp}°C — poisson en profondeur`});
    } else {
      const center=(fish.minAirTemp+fish.maxAirTemp)/2;
      const bonus=Math.round(20*(1-Math.abs(t-center)/((fish.maxAirTemp-fish.minAirTemp)/2)*0.45));
      score+=bonus; breakdown.push({factor:"Température",pts:bonus,ok:true,label:`Température : ${t}°C`,detail:`Plage idéale ${fish.minAirTemp}–${fish.maxAirTemp}°C`});
    }

    // 6. PRESSION ATMOSPHÉRIQUE ±10 (nouveau critère)
    const pt = weather.pressureTrend;
    if (pt === fish.pressureTrend) {
      score+=10; breakdown.push({factor:"Pression",pts:10,ok:true,label:`Pression en ${pt} — idéale`,detail:`${fish.name} préfère la pression en ${pt} (${weather.pressure} hPa)`});
    } else if (pt==="stable") {
      score+=5; breakdown.push({factor:"Pression",pts:5,ok:true,label:`Pression stable : ${weather.pressure} hPa`,detail:"Conditions neutres"});
    } else {
      score-=5; breakdown.push({factor:"Pression",pts:-5,ok:false,label:`Pression en ${pt}`,detail:`${fish.name} préfère la pression en ${fish.pressureTrend}`});
    }
  }

  // 7. HEURE +12
  if (hour!==null) {
    const h=parseInt(hour);
    if (fish.peakHours.includes(h)) {
      score+=12; breakdown.push({factor:"Heure",pts:12,ok:true,label:`Pic d'activité ⏰ ${h}h`,detail:`${fish.name} très actif à cette heure`});
    } else if (fish.peakHours.some(ph=>{const d=Math.abs(ph-h);return d<=1||d>=23;})) {
      score+=5; breakdown.push({factor:"Heure",pts:5,ok:null,label:"Proche du pic",detail:`Pics : ${fish.peakHours.slice(0,5).map(h=>h+"h").join(" ")}…`});
    } else {
      breakdown.push({factor:"Heure",pts:0,ok:null,label:"Heure neutre",detail:`Pics d'activité : ${fish.peakHours.slice(0,5).map(h=>h+"h").join(" ")}…`});
    }
  }

  // 8. CLARTÉ EAU ±8
  if (waterColor&&fish.waterColor) {
    if (fish.waterColor.includes(waterColor)) {
      score+=8; breakdown.push({factor:"Eau",pts:8,ok:true,label:"Clarté favorable",detail:`Préfère les eaux ${fish.waterColor.join("/")}`});
    } else {
      score-=5; breakdown.push({factor:"Eau",pts:-5,ok:false,label:"Clarté sous-optimale",detail:`Préfère les eaux ${fish.waterColor.join("/")} — utilise un appât plus visible`});
    }
  }

  // 9. PROFONDEUR +8 (nouveau)
  if (depth&&fish.bestDepth) {
    if (fish.bestDepth.includes(depth)) {
      score+=8; breakdown.push({factor:"Profondeur",pts:8,ok:true,label:`Profondeur idéale : ${depth}`,detail:`${fish.name} préfère : ${fish.bestDepth.join(", ")}`});
    } else {
      score-=4; breakdown.push({factor:"Profondeur",pts:-4,ok:false,label:`Profondeur non optimale`,detail:`Idéal : ${fish.bestDepth.join(", ")}`});
    }
  }

  // 10. COURANT +6 (nouveau)
  if (current&&fish.bestCurrent) {
    if (fish.bestCurrent.includes(current)) {
      score+=6; breakdown.push({factor:"Courant",pts:6,ok:true,label:`Courant idéal : ${current}`,detail:`${fish.name} actif avec courant ${current}`});
    } else {
      score-=3; breakdown.push({factor:"Courant",pts:-3,ok:false,label:"Courant non optimal",detail:`Idéal : courant ${fish.bestCurrent.join(", ")}`});
    }
  }


  // 12. VÉGÉTATION +5 (nouveau)
  if (vegetation?.length&&fish.bestVegetation) {
    const match = vegetation.some(v=>fish.bestVegetation.some(fv=>fv.includes(v)||v.includes(fv)));
    if (match) {
      score+=5; breakdown.push({factor:"Végétation",pts:5,ok:true,label:"Habitat végétal favorable",detail:`Végétation compatible avec ${fish.name}`});
    }
  }

  // 13. PHASE DE LUNE +8 (nouveau)
  if (moon) {
    const moonMap = {new:"nouvelle",waxing:"croissante",full:"pleine",waning:"décroissante"};
    const moonFr = moonMap[moon.phase]??moon.phase;
    if (fish.moonBonus.includes(moonFr)) {
      score+=8; breakdown.push({factor:"Lune",pts:8,ok:true,label:`${moon.emoji} Lune favorable`,detail:`${fish.name} plus actif lors de la ${moonFr} (${moon.label})`});
    } else {
      breakdown.push({factor:"Lune",pts:0,ok:null,label:`${moon.emoji} Lune neutre`,detail:`Favorable pour cette espèce : ${fish.moonBonus.join(", ")} lune`});
    }
  }

  return {score:Math.max(0,score), breakdown};
}

function getRecommendations(ctx) {
  const scored = FISH_DB.map(fish => {
    const {score,breakdown} = scoreFish(fish, ctx);
    const colorRec = recommendBaitColor({...ctx, fish});
    const scoredBaits = fish.baits
      .map(b=>({...b, baitScore:scoreBait(b,ctx), colorRec}))
      .sort((a,b)=>b.baitScore-a.baitScore);
    return {...fish, score, breakdown, scoredBaits, colorRec};
  })
  .filter(f=>f.score>0)
  .sort((a,b)=>b.score-a.score);
  const maxScore = scored[0]?.score || 1;
  return scored.map(f=>({...f, pct:Math.round((f.score/maxScore)*100)}));
}

function getTopBaits(results) {
  const map = {};
  results.forEach(fish => {
    fish.scoredBaits.forEach(b => {
      if (!map[b.name]) map[b.name]={...b,totalScore:0,forFish:[]};
      map[b.name].totalScore += b.baitScore*(fish.pct/100);
      map[b.name].forFish.push(fish.name);
    });
  });
  return Object.values(map).sort((a,b)=>b.totalScore-a.totalScore).slice(0,5);
}

// ═══════════════════════════════════════════════════════════════════════
//  ICÔNES
// ═══════════════════════════════════════════════════════════════════════
const IcoSearch = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
const IcoFish   = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 0 1-9 5.2L3 16l3-8 6.3-1.6A6 6 0 0 1 18 8z"/><circle cx="17" cy="8" r="1" fill="currentColor"/></svg>;
const IcoCamera = ()=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const IcoBack   = ()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const IcoGPS    = ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>;
const IcoPin    = ()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;

// ═══════════════════════════════════════════════════════════════════════
//  COMPOSANTS UI
// ═══════════════════════════════════════════════════════════════════════
function Logo() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"9px"}}>
      <div style={{width:40,height:40,borderRadius:"13px",background:"linear-gradient(135deg,#00d4aa,#0057e7)",
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",
        boxShadow:"0 4px 18px rgba(0,212,170,0.45)",flexShrink:0}}>🎣</div>
      <div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"23px",lineHeight:1,
          background:"linear-gradient(90deg,#00d4aa,#0057e7)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>BestBait</div>
        <div style={{fontSize:"9px",color:"#6b7a99",letterSpacing:"2.5px",textTransform:"uppercase",marginTop:"1px"}}>
          Québec · Fishing Guide
        </div>
      </div>
    </div>
  );
}

function Chip({label, active, onClick, color="#00d4aa"}) {
  return (
    <button onClick={onClick} style={{
      padding:"7px 14px",borderRadius:"999px",border:"none",fontSize:"13px",
      fontFamily:"inherit",cursor:"pointer",whiteSpace:"nowrap",transition:"all .18s",
      background:active?color:"rgba(255,255,255,0.07)",
      color:active?"#fff":"#8899bb",fontWeight:active?700:400,
      boxShadow:active?`0 3px 12px ${color}55`:"none"}}>
      {label}
    </button>
  );
}

function Section({title, badge, children}) {
  return (
    <div style={{marginBottom:"22px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
        <div style={{fontSize:"11px",fontWeight:700,color:"#6b7a99",
          textTransform:"uppercase",letterSpacing:"1.4px"}}>{title}</div>
        {badge && <span style={{padding:"2px 7px",borderRadius:"999px",fontSize:"10px",
          background:"rgba(0,212,170,0.15)",color:"#00d4aa",fontWeight:700}}>{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function Tag({icon, label}) {
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:"4px",
      padding:"4px 10px",borderRadius:"999px",
      background:"rgba(255,255,255,0.07)",fontSize:"12px",color:"#c0d0e0"}}>
      {icon} {label}
    </span>
  );
}

function WeatherCard({weather, moon}) {
  const icon  = WEATHER_ICONS[weather.condition]??"🌤️";
  const label = WEATHER_LABELS[weather.condition]??"";
  const trendIcon = weather.pressureTrend==="hausse"?"↗️":weather.pressureTrend==="baisse"?"↘️":"→";
  const q = ["clear","cloudy"].includes(weather.condition)?{t:"Bonne",c:"#00d4aa"}
    :weather.condition==="overcast"?{t:"Correcte",c:"#f7b731"}
    :weather.condition==="rain"?{t:"Variable",c:"#e06c75"}
    :weather.condition==="snow"?{t:"Pêche blanche",c:"#56b6c2"}
    :{t:"Mauvaise",c:"#e06c75"};
  return (
    <div style={{borderRadius:"16px",padding:"14px",
      background:"linear-gradient(135deg,rgba(0,87,231,0.18),rgba(0,212,170,0.1))",
      border:"1px solid rgba(0,212,170,0.25)"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:"8px"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontSize:"26px"}}>{icon}</div>
          <div style={{fontSize:"14px",color:"#e0eaff",fontWeight:700,marginTop:"2px"}}>{weather.temp}°C</div>
          <div style={{fontSize:"10px",color:"#8899bb"}}>{label}</div>
        </div>
        <div style={{textAlign:"center",borderLeft:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:"16px",marginTop:"4px"}}>💨</div>
          <div style={{fontSize:"13px",color:"#e0eaff",fontWeight:700,marginTop:"2px"}}>{weather.wind}km/h</div>
          <div style={{fontSize:"10px",color:"#8899bb"}}>Vent</div>
        </div>
        <div style={{textAlign:"center",borderLeft:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:"14px",marginTop:"4px"}}>{trendIcon}</div>
          <div style={{fontSize:"12px",color:"#e0eaff",fontWeight:700,marginTop:"2px"}}>{weather.pressure}</div>
          <div style={{fontSize:"10px",color:"#8899bb"}}>hPa {weather.pressureTrend}</div>
        </div>
        <div style={{textAlign:"center",borderLeft:"1px solid rgba(255,255,255,0.07)"}}>
          <div style={{fontSize:"10px",color:"#8899bb",marginTop:"4px"}}>Pêche</div>
          <div style={{fontSize:"12px",fontWeight:700,color:q.c,marginTop:"2px"}}>{q.t}</div>
          {moon && <div style={{fontSize:"12px",marginTop:"2px"}}>{moon.emoji}</div>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  SEARCH PAGE
// ═══════════════════════════════════════════════════════════════════════
function SearchPage({onResults}) {
  const now = new Date();
  const [habitat,      setHabitat]      = useState(null);
  const [month,        setMonth]        = useState(now.getMonth()+1);
  const [waterColor,   setWaterColor]   = useState(null);
  const [depth,        setDepth]        = useState(null);
  const [current,      setCurrent]      = useState(null);
  const [vegetation,   setVegetation]   = useState([]);
  const [weather,      setWeather]      = useState(null);
  const [nearestWater, setNearestWater] = useState(null);
  const [coords,       setCoords]       = useState(null);
  const [locMode,      setLocMode]      = useState("gps");
  const [addressInput, setAddressInput] = useState("");
  const [gpsState,     setGpsState]     = useState("idle");
  const [addrState,    setAddrState]    = useState("idle");
  const [waterState,   setWaterState]   = useState("idle");
  const [weatherState, setWeatherState] = useState("idle");
  const [resolvedName, setResolvedName] = useState("");
  const [hour, setHour] = useState(`${String(now.getHours()).padStart(2,"0")}:00`);
  const moon = getMoonPhase(now);
  const currentMonth = now.getMonth()+1;

  async function loadAll(lat, lon) {
    setWeatherState("loading"); setWaterState("loading");
    const [wtr,wb] = await Promise.allSettled([fetchWeather(lat,lon), fetchNearestWaterBody(lat,lon)]);
    if (wtr.status==="fulfilled") { setWeather(wtr.value); setWeatherState("done"); }
    else setWeatherState("error");
    if (wb.status==="fulfilled"&&wb.value) {
      setNearestWater(wb.value);
      setWaterState("done");
      const profile = WATER_PROFILES[wb.value.type];
      // Pré-remplit seulement si l'utilisateur n'a pas déjà choisi manuellement
      setHabitat(prev => prev ?? wb.value.type);
      if (profile) {
        setCurrent(prev  => prev ?? profile.current);
        setDepth(prev    => prev ?? profile.depth);
        setVegetation(prev => prev.length > 0 ? prev : profile.vegetation);
      }
    }
    else setWaterState("notfound");
  }

  function handleGPS() {
    if (!navigator.geolocation) { setGpsState("error"); return; }
    setGpsState("loading"); setNearestWater(null); setWeather(null); setWeatherState("idle"); setWaterState("idle"); setResolvedName("");
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const {latitude:lat,longitude:lon}=pos.coords;
        setCoords({lat,lon}); setGpsState("done");
        setResolvedName(`${lat.toFixed(4)}°N · ${Math.abs(lon).toFixed(4)}°O`);
        await loadAll(lat,lon);
      },
      () => setGpsState("error"),
      {enableHighAccuracy:true,timeout:12000}
    );
  }

  async function handleAddress() {
    if (!addressInput.trim()) return;
    setAddrState("loading"); setNearestWater(null); setWeather(null); setWeatherState("idle"); setWaterState("idle"); setResolvedName("");
    try {
      const geo = await geocodeAddress(addressInput);
      setCoords({lat:geo.lat,lon:geo.lon}); setAddrState("done");
      setResolvedName(geo.displayName.split(",").slice(0,2).join(",").trim());

      // Si Nominatim a trouvé directement le plan d'eau (ex: "Lac Supérieur"),
      // on l'utilise directement sans re-chercher autour des coordonnées
      const directWater = geo.isWaterResult ? waterBodyFromNominatim(geo) : null;

      if (directWater) {
        // Plan d'eau trouvé directement — pas besoin d'Overpass pour le type
        setNearestWater(directWater);
        setWaterState("done");
        const profile = WATER_PROFILES[directWater.type];
        setHabitat(prev => prev ?? directWater.type);
        if (profile) {
          setCurrent(prev  => prev ?? profile.current);
          setDepth(prev    => prev ?? profile.depth);
          setVegetation(prev => prev.length > 0 ? prev : profile.vegetation);
        }
        // Météo seulement
        setWeatherState("loading");
        try {
          const wtr = await fetchWeather(geo.lat, geo.lon);
          setWeather(wtr); setWeatherState("done");
        } catch { setWeatherState("error"); }
      } else {
        // Adresse générique — chercher le plan d'eau le plus proche via Overpass
        await loadAll(geo.lat, geo.lon);
      }
    } catch { setAddrState("error"); }
  }

  const timeAdvice = (()=>{
    const h=parseInt(hour);
    if(h>=5&&h<=8)   return{msg:"🌅 Aube — conditions parfaites !",col:"#f7b731"};
    if(h>=9&&h<=11)  return{msg:"🌤️ Matinée active.",col:"#00d4aa"};
    if(h>=12&&h<=15) return{msg:"☀️ Milieu de journée — activité réduite.",col:"#e06c75"};
    if(h>=16&&h<=20) return{msg:"🌆 Crépuscule — doré et brochet en action.",col:"#f7b731"};
    return{msg:"🌙 Nuit — barbotte et maskinongé actifs.",col:"#c678dd"};
  })();

  function toggleVeg(id) {
    setVegetation(prev=>prev.includes(id)?prev.filter(v=>v!==id):[...prev,id]);
  }

  return (
    <div style={{padding:"0 18px 110px"}}>
      {/* Hero */}
      <div style={{margin:"16px 0 20px",background:"linear-gradient(135deg,rgba(0,87,231,0.2),rgba(0,212,170,0.12))",
        borderRadius:"20px",padding:"20px",border:"1px solid rgba(0,212,170,0.22)"}}>
        <div style={{fontSize:"11px",color:"#8899bb",marginBottom:"4px",letterSpacing:"0.5px"}}>🍁 Guide de pêche québécois</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"21px",lineHeight:1.3,
          background:"linear-gradient(90deg,#00d4aa,#0057e7)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          Trouve les meilleurs appâts<br/>pour ta session
        </div>
        {/* Lune auto */}
        <div style={{marginTop:"10px",display:"flex",alignItems:"center",gap:"8px",
          padding:"7px 11px",borderRadius:"10px",background:"rgba(255,255,255,0.05)"}}>
          <span style={{fontSize:"18px"}}>{moon.emoji}</span>
          <div>
            <div style={{fontSize:"12px",color:"#e0eaff",fontWeight:600}}>{moon.label}</div>
            <div style={{fontSize:"10px",color:"#8899bb"}}>Jour {moon.normalized}/29 · Calculé automatiquement</div>
          </div>
        </div>
      </div>

      {/* LOCALISATION */}
      <Section title="📍 Localisation & Météo">
        <div style={{display:"flex",gap:"5px",marginBottom:"10px",background:"rgba(255,255,255,0.04)",borderRadius:"10px",padding:"3px"}}>
          {[{id:"gps",label:"📡 GPS"},{id:"address",label:"🔍 Adresse / Nom"}].map(m=>(
            <button key={m.id} onClick={()=>setLocMode(m.id)} style={{
              flex:1,padding:"9px",borderRadius:"8px",border:"none",cursor:"pointer",fontFamily:"inherit",
              background:locMode===m.id?"rgba(0,212,170,0.18)":"transparent",
              color:locMode===m.id?"#00d4aa":"#8899bb",
              fontSize:"13px",fontWeight:locMode===m.id?700:400,transition:"all .18s"}}>{m.label}</button>
          ))}
        </div>
        {locMode==="gps" && (
          <button onClick={handleGPS} disabled={gpsState==="loading"} style={{
            width:"100%",padding:"13px",borderRadius:"13px",
            border:`1.5px dashed ${gpsState==="done"?"#00d4aa":gpsState==="error"?"#e06c75":"rgba(0,212,170,0.35)"}`,
            background:gpsState==="done"?"rgba(0,212,170,0.09)":"rgba(255,255,255,0.04)",
            color:gpsState==="done"?"#00d4aa":gpsState==="error"?"#e06c75":"#8899bb",
            fontSize:"14px",fontFamily:"inherit",cursor:gpsState==="loading"?"wait":"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all .2s"}}>
            <IcoGPS/>
            {gpsState==="idle"&&"Activer la localisation GPS"}
            {gpsState==="loading"&&"Localisation en cours…"}
            {gpsState==="done"&&resolvedName}
            {gpsState==="error"&&"Erreur GPS — réessayer"}
          </button>
        )}
        {locMode==="address" && (
          <div style={{display:"flex",gap:"8px"}}>
            <input value={addressInput} onChange={e=>setAddressInput(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleAddress()}
              placeholder="Ex: Lac Beauport, Rivière Gatineau, Montréal…"
              style={{flex:1,padding:"12px 13px",borderRadius:"12px",
                border:`1.5px solid ${addrState==="done"?"rgba(0,212,170,0.5)":addrState==="error"?"rgba(224,108,117,0.5)":"rgba(255,255,255,0.12)"}`,
                background:"rgba(255,255,255,0.05)",color:"#e0eaff",
                fontSize:"14px",fontFamily:"inherit",outline:"none"}}/>
            <button onClick={handleAddress} disabled={addrState==="loading"} style={{
              padding:"0 15px",borderRadius:"12px",border:"none",cursor:"pointer",flexShrink:0,
              background:"linear-gradient(135deg,#00d4aa,#0057e7)",color:"#fff",fontSize:"16px"}}>
              {addrState==="loading"?"⏳":<IcoPin/>}
            </button>
          </div>
        )}
        {addrState==="done"&&resolvedName&&<div style={{marginTop:"6px",fontSize:"12px",color:"#00d4aa"}}>✅ {resolvedName}</div>}
        {addrState==="error"&&<div style={{marginTop:"6px",fontSize:"12px",color:"#e06c75"}}>❌ Lieu introuvable. Essaie un autre nom.</div>}
        {waterState==="loading"&&<div style={{marginTop:"9px",padding:"10px",borderRadius:"11px",background:"rgba(0,87,231,0.1)",color:"#7eb3ff",fontSize:"12px",textAlign:"center"}}>🔍 Détection du plan d'eau…</div>}
        {waterState==="done"&&nearestWater&&(
          <div style={{marginTop:"9px",padding:"11px 13px",borderRadius:"12px",background:"rgba(0,212,170,0.1)",border:"1px solid rgba(0,212,170,0.28)",display:"flex",alignItems:"center",gap:"9px"}}>
            <span style={{fontSize:"20px"}}>{WATER_TYPES.find(w=>w.id===nearestWater.type)?.icon||"🌊"}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:"13px",fontWeight:700,color:"#00d4aa"}}>{nearestWater.type.charAt(0).toUpperCase()+nearestWater.type.slice(1)} détecté</div>
              <div style={{fontSize:"11px",color:"#8899bb"}}>
                {nearestWater.name && <span>{nearestWater.name}{nearestWater.dist ? ` · ${nearestWater.dist} km` : ""} · </span>}
                <span style={{color:"#f7b731"}}>Type, courant, profondeur pré-remplis ✦</span>
              </div>
            </div>
            <span style={{fontSize:"10px",padding:"2px 8px",borderRadius:"999px",background:"rgba(0,212,170,0.2)",color:"#00d4aa"}}>Auto</span>
          </div>
        )}
        {waterState==="notfound"&&(gpsState==="done"||addrState==="done")&&<div style={{marginTop:"9px",padding:"9px 12px",borderRadius:"11px",background:"rgba(247,183,49,0.09)",color:"#f7b731",fontSize:"12px"}}>⚠️ Aucun plan d'eau détecté. Sélectionne manuellement.</div>}
        {weatherState==="loading"&&<div style={{marginTop:"9px",padding:"10px",borderRadius:"11px",background:"rgba(247,183,49,0.08)",color:"#f7b731",fontSize:"12px",textAlign:"center"}}>⛅ Chargement météo…</div>}
        {weatherState==="done"&&weather&&<div style={{marginTop:"9px"}}><WeatherCard weather={weather} moon={moon}/></div>}
        {weatherState==="error"&&<div style={{marginTop:"9px",padding:"9px",borderRadius:"11px",background:"rgba(224,108,117,0.09)",color:"#e06c75",fontSize:"12px",textAlign:"center"}}>❌ Météo indisponible</div>}
      </Section>

      {/* TYPE D'EAU */}
      <Section title="🌊 Type de plan d'eau">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px"}}>
          {WATER_TYPES.map(w=>(
            <button key={w.id} onClick={()=>setHabitat(habitat===w.id?null:w.id)} style={{
              padding:"10px 6px",borderRadius:"12px",cursor:"pointer",fontFamily:"inherit",
              background:habitat===w.id?"rgba(0,87,231,0.22)":"rgba(255,255,255,0.05)",
              border:habitat===w.id?"1.5px solid rgba(0,87,231,0.6)":"1.5px solid rgba(255,255,255,0.08)",
              color:habitat===w.id?"#7eb3ff":"#8899bb",transition:"all .18s"}}>
              <div style={{fontSize:"20px",marginBottom:"3px"}}>{w.icon}</div>
              <div style={{fontSize:"11px",fontWeight:habitat===w.id?700:400}}>{w.label}</div>
            </button>
          ))}
        </div>
      </Section>

      {/* MOIS — auto-détecté + modifiable */}
      <Section title="📅 Mois" badge={`Auto : ${MONTHS_FR[currentMonth-1]}`}>
        <div style={{display:"flex",overflowX:"auto",gap:"6px",paddingBottom:"4px",scrollbarWidth:"none"}}>
          {MONTHS_FR.map((m,i)=>(
            <Chip key={i} label={m} active={month===i+1}
              onClick={()=>setMonth(month===i+1?null:i+1)}
              color={i+1===currentMonth?"#f7b731":"#00d4aa"}/>
          ))}
        </div>
        <div style={{marginTop:"6px",padding:"7px 11px",borderRadius:"9px",
          background:"rgba(247,183,49,0.08)",fontSize:"11px",color:"#f7b731"}}>
          📍 Mois détecté automatiquement : <strong>{MONTHS_FULL[currentMonth-1]}</strong>
          {month!==currentMonth&&month&&<span style={{color:"#8899bb"}}> (modifié : {MONTHS_FULL[month-1]})</span>}
        </div>
      </Section>

      {/* HEURE */}
      <Section title="🕐 Heure de pêche">
        <input type="time" value={hour} onChange={e=>setHour(e.target.value)} style={{
          width:"100%",padding:"13px",borderRadius:"13px",
          border:"1.5px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",
          color:"#e0eaff",fontSize:"18px",fontFamily:"inherit",outline:"none",
          boxSizing:"border-box",letterSpacing:"2px"}}/>
        <div style={{marginTop:"7px",padding:"8px 12px",borderRadius:"9px",
          background:`${timeAdvice.col}18`,color:timeAdvice.col,fontSize:"12px"}}>
          {timeAdvice.msg}
        </div>
      </Section>

      {/* CLARTÉ EAU */}
      <Section title="🎨 Clarté de l'eau">
        <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
          {[{id:"claire",label:"💧 Claire"},{id:"verte",label:"🌿 Verte"},{id:"trouble",label:"🟤 Trouble"},{id:"noire",label:"⚫ Noire"}].map(c=>(
            <Chip key={c.id} label={c.label} active={waterColor===c.id}
              onClick={()=>setWaterColor(waterColor===c.id?null:c.id)} color="#9b59b6"/>
          ))}
        </div>
      </Section>

      {/* PROFONDEUR */}
      <Section title="📏 Profondeur visée">
        <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
          {DEPTH_OPTIONS.map(d=>(
            <Chip key={d.id} label={`${d.icon} ${d.label}`} active={depth===d.id}
              onClick={()=>setDepth(depth===d.id?null:d.id)} color="#e55a2b"/>
          ))}
        </div>
      </Section>

      {/* COURANT */}
      <Section title="〰️ Courant">
        <div style={{display:"flex",gap:"7px",flexWrap:"wrap"}}>
          {CURRENT_OPTIONS.map(c=>(
            <Chip key={c.id} label={`${c.icon} ${c.label}`} active={current===c.id}
              onClick={()=>setCurrent(current===c.id?null:c.id)} color="#56b6c2"/>
          ))}
        </div>
      </Section>


      {/* VÉGÉTATION */}
      <Section title="🌱 Végétation / Fond">
        <div style={{display:"flex",flexWrap:"wrap",gap:"7px"}}>
          {VEGET_OPTIONS.map(v=>(
            <Chip key={v.id} label={v.label} active={vegetation.includes(v.id)}
              onClick={()=>toggleVeg(v.id)} color="#6aab3f"/>
          ))}
        </div>
      </Section>

      <button
        onClick={()=>onResults(getRecommendations({habitat,month,weather,hour:hour?parseInt(hour):null,waterColor,depth,current,vegetation,moon}),{habitat,month,weather,hour,waterColor,depth,current,moon})}
        style={{marginTop:"4px",width:"100%",padding:"16px",borderRadius:"16px",border:"none",cursor:"pointer",
          background:"linear-gradient(135deg,#00d4aa,#0057e7)",color:"#fff",
          fontSize:"17px",fontFamily:"'Fredoka One',cursive",letterSpacing:"0.5px",
          boxShadow:"0 7px 28px rgba(0,212,170,0.38)",transition:"transform .15s"}}
        onPointerDown={e=>{e.currentTarget.style.transform="scale(0.97)"}}
        onPointerUp={e=>{e.currentTarget.style.transform="scale(1)"}}>
        🎣 Trouver mes appâts
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  RESULTS PAGE
// ═══════════════════════════════════════════════════════════════════════
function ScoreBar({pct,color,height=5}) {
  return (
    <div style={{height,borderRadius:height/2,background:"rgba(255,255,255,0.07)",overflow:"hidden",marginTop:4}}>
      <div style={{height:"100%",borderRadius:height/2,width:`${pct}%`,
        background:`linear-gradient(90deg,${color},${color}cc)`,transition:"width .5s ease"}}/>
    </div>
  );
}

function BreakdownRow({item}) {
  const dot=item.ok===true?"#00d4aa":item.ok===false?"#e06c75":"#8899bb";
  const bg =item.ok===true?"rgba(0,212,170,0.07)":item.ok===false?"rgba(224,108,117,0.07)":"rgba(255,255,255,0.03)";
  const pts=item.pts>0?`+${item.pts}`:item.pts===0?"±0":`${item.pts}`;
  return (
    <div style={{padding:"8px 10px",borderRadius:"9px",background:bg,border:`1px solid ${dot}25`,display:"flex",gap:"9px",alignItems:"flex-start"}}>
      <div style={{minWidth:30,fontWeight:800,fontSize:"12px",color:dot,flexShrink:0,paddingTop:"1px"}}>{pts}</div>
      <div style={{flex:1}}>
        <div style={{fontSize:"12px",fontWeight:700,color:"#e0eaff"}}>{item.label}</div>
        <div style={{fontSize:"11px",color:"#8899bb",marginTop:"2px",lineHeight:1.4}}>{item.detail}</div>
      </div>
    </div>
  );
}

function ColorSwatch({color}) {
  const [tip, setTip] = useState(false);
  return (
    <div style={{position:"relative",display:"inline-block"}}
      onPointerEnter={()=>setTip(true)} onPointerLeave={()=>setTip(false)}>
      <div style={{
        width:18, height:18, borderRadius:"50%",
        background:color.hex,
        border:"2px solid rgba(255,255,255,0.2)",
        boxShadow:`0 0 6px ${color.hex}88`,
        cursor:"default", flexShrink:0,
      }}/>
      {tip && (
        <div style={{
          position:"absolute",bottom:"calc(100% + 6px)",left:"50%",
          transform:"translateX(-50%)",zIndex:10,
          background:"#1a2035",border:"1px solid rgba(255,255,255,0.15)",
          borderRadius:"8px",padding:"6px 9px",whiteSpace:"nowrap",
          fontSize:"10px",color:"#e0eaff",lineHeight:1.4,
          pointerEvents:"none",
          boxShadow:"0 4px 12px rgba(0,0,0,0.5)"
        }}>
          <div style={{fontWeight:700,marginBottom:"2px"}}>{color.name}</div>
          <div style={{color:"#8899bb"}}>{color.desc}</div>
        </div>
      )}
    </div>
  );
}

function BaitCard({bait, rank, fishColor}) {
  const photo = BAIT_PHOTOS[bait.name];
  const [imgErr, setImgErr] = useState(false);
  const colorRec = bait.colorRec;
  return (
    <div style={{borderRadius:"11px",overflow:"hidden",
      background:rank===0?`${fishColor}14`:"rgba(255,255,255,0.03)",
      border:rank===0?`1px solid ${fishColor}44`:"1px solid rgba(255,255,255,0.05)"}}>
      {/* Ligne principale */}
      <div style={{display:"flex",alignItems:"flex-start",gap:"9px",padding:"9px 10px"}}>
        {/* Photo appât */}
        <div style={{width:44,height:44,borderRadius:"9px",overflow:"hidden",flexShrink:0,
          background:"rgba(255,255,255,0.08)"}}>
          {photo&&!imgErr
            ? <img src={photo} alt={bait.name} onError={()=>setImgErr(true)}
                style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",
                justifyContent:"center",fontSize:"20px"}}>🪱</div>
          }
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"5px"}}>
            <span style={{fontSize:"13px",fontWeight:700,color:"#e0eaff",
              overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              {rank===0&&<span style={{color:fishColor,marginRight:"4px"}}>★</span>}
              {bait.name}
            </span>
            <span style={{fontSize:"11px",flexShrink:0,fontWeight:700,
              color:bait.baitScore>=75?"#00d4aa":bait.baitScore>=50?"#f7b731":"#8899bb"}}>
              {bait.baitScore}%
            </span>
          </div>
          <div style={{fontSize:"11px",color:"#8899bb",marginTop:"2px",lineHeight:1.4}}>{bait.why}</div>
        </div>
      </div>
      {/* Bande couleur recommandée */}
      {colorRec && colorRec.colors.length > 0 && (
        <div style={{
          margin:"0 10px 9px",padding:"7px 10px",borderRadius:"8px",
          background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",
          display:"flex",alignItems:"center",gap:"8px"
        }}>
          <span style={{fontSize:"10px",color:"#6b7a99",fontWeight:700,
            textTransform:"uppercase",letterSpacing:"0.8px",flexShrink:0}}>🎨 Couleur</span>
          {/* Swatches */}
          <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
            {colorRec.colors.map(c=><ColorSwatch key={c.name} color={c}/>)}
          </div>
          {/* Noms des couleurs */}
          <div style={{flex:1,minWidth:0,fontSize:"10px",color:"#c0d0e0",
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            {colorRec.colors.map(c=>c.name).join(" · ")}
          </div>
        </div>
      )}
    </div>
  );
}

function TopBaitRow({bait, rank, isTop, maxScore}) {
  const photo = BAIT_PHOTOS[bait.name];
  const [err, setErr] = useState(false);
  const medal = rank===0?"🥇":rank===1?"🥈":rank===2?"🥉":rank+1;
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px",
      padding:"9px 11px",borderRadius:"12px",
      background:isTop?"rgba(0,212,170,0.1)":"rgba(255,255,255,0.04)",
      border:isTop?"1px solid rgba(0,212,170,0.3)":"1px solid rgba(255,255,255,0.06)"}}>
      <div style={{minWidth:24,height:24,borderRadius:"50%",flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:800,
        background:rank===0?"#f7b731":rank===1?"rgba(255,255,255,0.18)":rank===2?"rgba(255,255,255,0.1)":"rgba(255,255,255,0.06)",
        color:rank===0?"#000":"#e0eaff"}}>
        {medal}
      </div>
      <div style={{width:36,height:36,borderRadius:"8px",overflow:"hidden",flexShrink:0,background:"rgba(255,255,255,0.08)"}}>
        {photo&&!err
          ? <img src={photo} alt={bait.name} onError={()=>setErr(true)} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
          : <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px"}}>🪱</div>
        }
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:"13px",fontWeight:700,color:"#e0eaff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{bait.name}</div>
        <div style={{fontSize:"10px",color:"#8899bb",marginTop:"1px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {bait.forFish.slice(0,2).join(" · ")}{bait.forFish.length>2?` +${bait.forFish.length-2}`:""}
        </div>
      </div>
      <div style={{width:42,flexShrink:0}}>
        <div style={{fontSize:"11px",color:"#00d4aa",fontWeight:700,textAlign:"right"}}>{Math.round(bait.totalScore)}</div>
        <div style={{height:3,borderRadius:2,background:"rgba(255,255,255,0.08)",marginTop:3,overflow:"hidden"}}>
          <div style={{height:"100%",borderRadius:2,background:"linear-gradient(90deg,#00d4aa,#0057e7)",
            width:`${Math.min(100,(bait.totalScore/maxScore)*100)}%`}}/>
        </div>
      </div>
    </div>
  );
}

function ResultsPage({results, context, onBack}) {
  const [expanded, setExpanded] = useState(null);
  const [view,     setView]     = useState("baits");
  const [showCalc, setShowCalc] = useState(null);

  if (!results.length) return (
    <div style={{padding:"60px 24px",textAlign:"center"}}>
      <div style={{fontSize:"60px",marginBottom:"16px"}}>🎣</div>
      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"22px",color:"#e0eaff",marginBottom:"8px"}}>Aucune espèce</div>
      <div style={{color:"#8899bb",fontSize:"14px",marginBottom:"28px"}}>Conditions défavorables — modifie tes critères.</div>
      <button onClick={onBack} style={{padding:"13px 28px",borderRadius:"999px",border:"none",
        background:"linear-gradient(135deg,#00d4aa,#0057e7)",color:"#fff",
        fontFamily:"'Fredoka One',cursive",fontSize:"16px",cursor:"pointer"}}>← Modifier</button>
    </div>
  );

  const topBaits = getTopBaits(results);

  return (
    <div style={{padding:"0 18px 110px"}}>
      {/* Contexte */}
      <div style={{margin:"12px 0 14px",padding:"10px 13px",borderRadius:"13px",
        background:"rgba(0,87,231,0.15)",border:"1px solid rgba(0,87,231,0.25)"}}>
        <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
          {context.habitat&&<Tag icon={WATER_TYPES.find(w=>w.id===context.habitat)?.icon||"🌊"} label={context.habitat}/>}
          {context.month&&<Tag icon="📅" label={MONTHS_FULL[context.month-1]}/>}
          {context.weather&&<Tag icon={WEATHER_ICONS[context.weather.condition]} label={`${context.weather.temp}°C · ${context.weather.wind}km/h · ${context.weather.pressure}hPa`}/>}
          {context.moon&&<Tag icon={context.moon.emoji} label={context.moon.label}/>}
          {context.depth&&<Tag icon="📏" label={context.depth}/>}
        </div>
      </div>

      {/* Hero top appâts */}
      <div style={{marginBottom:"16px",padding:"15px",borderRadius:"20px",
        background:"linear-gradient(135deg,rgba(0,212,170,0.14),rgba(0,87,231,0.12))",
        border:"1.5px solid rgba(0,212,170,0.3)"}}>
        <div style={{fontSize:"11px",color:"#8899bb",fontWeight:700,letterSpacing:"1.3px",
          textTransform:"uppercase",marginBottom:"10px"}}>🎯 Meilleurs appâts pour cette session</div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {topBaits.map((b,i)=>(
            <TopBaitRow key={b.name} bait={b} rank={i} isTop={i===0} maxScore={topBaits[0].totalScore}/>
          ))}
        </div>
      </div>

      {/* Toggle */}
      <div style={{display:"flex",gap:"5px",marginBottom:"14px",background:"rgba(255,255,255,0.04)",borderRadius:"11px",padding:"3px"}}>
        {[{id:"baits",label:"🎣 Appâts"},{id:"fish",label:"🐟 Poissons"},{id:"calc",label:"🧮 Calcul"}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{
            flex:1,padding:"9px 4px",borderRadius:"9px",border:"none",cursor:"pointer",
            background:view===v.id?"rgba(0,212,170,0.18)":"transparent",
            color:view===v.id?"#00d4aa":"#8899bb",fontFamily:"inherit",
            fontSize:"12px",fontWeight:view===v.id?700:400,transition:"all .2s"}}>{v.label}</button>
        ))}
      </div>

      {/* VUE APPÂTS */}
      {view==="baits" && results.slice(0,5).map(fish=>(
        <div key={fish.id} style={{borderRadius:"18px",overflow:"hidden",marginBottom:"12px",
          background:"rgba(255,255,255,0.04)",border:`1.5px solid ${fish.color}44`}}>
          <div style={{padding:"11px 13px",display:"flex",alignItems:"center",gap:"10px",background:`${fish.color}10`}}>
            <span style={{fontSize:"22px"}}>{fish.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"16px",color:"#e0eaff"}}>{fish.name}</div>
              <div style={{display:"flex",alignItems:"center",gap:"6px",marginTop:"3px"}}>
                <div style={{height:4,flex:1,borderRadius:2,background:"rgba(255,255,255,0.07)",overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:2,width:`${fish.pct}%`,background:`linear-gradient(90deg,${fish.color},${fish.color}99)`}}/>
                </div>
                <span style={{fontSize:"11px",color:fish.color,fontWeight:700,flexShrink:0}}>{fish.pct}%</span>
              </div>
            </div>
          </div>
          <div style={{padding:"10px 11px",display:"flex",flexDirection:"column",gap:"7px"}}>
            {fish.scoredBaits.map((b,bi)=><BaitCard key={b.name} bait={b} rank={bi} fishColor={fish.color}/>)}
          </div>
          {/* Justification couleur */}
          {fish.colorRec && (
            <div style={{margin:"0 11px 10px",padding:"8px 11px",borderRadius:"9px",
              background:"rgba(0,87,231,0.09)",border:"1px solid rgba(0,87,231,0.2)",
              fontSize:"11px",color:"#7eb3ff",lineHeight:1.4}}>
              🎨 <strong>Pourquoi ces couleurs :</strong>{" "}
              {fish.colorRec.allReasons.slice(0,2).join(" · ")}
            </div>
          )}
          <div style={{margin:"0 11px 11px",padding:"8px 11px",borderRadius:"9px",
            background:`${fish.color}0d`,borderLeft:`3px solid ${fish.color}`,
            fontSize:"12px",color:"#c0d0e0",lineHeight:1.4}}>
            💡 {fish.tip}
          </div>
          <div style={{margin:"0 11px 11px",padding:"7px 11px",borderRadius:"9px",
            background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",
            fontSize:"11px",color:"#8899bb",display:"flex",alignItems:"center",gap:"6px"}}>
            <span style={{color:"#d19a66",fontWeight:700}}>🎯 Technique :</span>
            {fish.bestTechnique.map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" · ")}
          </div>
        </div>
      ))}

      {/* VUE POISSONS */}
      {view==="fish" && results.map((fish,idx)=>(
        <div key={fish.id} onClick={()=>setExpanded(expanded===fish.id?null:fish.id)}
          style={{marginBottom:"10px",borderRadius:"16px",overflow:"hidden",cursor:"pointer",
            background:"rgba(255,255,255,0.04)",
            border:`1.5px solid ${expanded===fish.id?fish.color+"99":"rgba(255,255,255,0.07)"}`,
            transition:"border-color .2s"}}>
          <div style={{padding:"12px 13px",display:"flex",alignItems:"center",gap:"10px"}}>
            <div style={{minWidth:22,height:22,borderRadius:"50%",flexShrink:0,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:800,
              background:idx===0?"#f7b731":idx===1?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.08)",
              color:idx===0?"#000":"#8899bb"}}>{idx+1}</div>
            <div style={{width:44,height:44,borderRadius:"12px",flexShrink:0,background:`${fish.color}22`,fontSize:"22px",
              display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px solid ${fish.color}44`}}>{fish.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"16px",color:"#e0eaff"}}>{fish.name}</div>
              <ScoreBar pct={fish.pct} color={fish.color}/>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:"16px",fontWeight:800,color:fish.color}}>{fish.pct}%</div>
              <div style={{fontSize:"9px",color:"#6b7a99"}}>match</div>
            </div>
            <div style={{color:"#8899bb",fontSize:"18px",transition:"transform .2s",transform:expanded===fish.id?"rotate(90deg)":"rotate(0)"}}>›</div>
          </div>
          {expanded===fish.id&&(
            <div style={{padding:"0 13px 13px",borderTop:`1px solid ${fish.color}22`}}>
              <div style={{marginTop:"10px",padding:"9px 11px",borderRadius:"10px",
                background:`${fish.color}12`,borderLeft:`3px solid ${fish.color}`,
                fontSize:"12px",color:"#c0d0e0",lineHeight:1.4,marginBottom:"8px"}}>💡 {fish.tip}</div>
              <div style={{marginTop:"8px",padding:"8px 11px",borderRadius:"9px",
                background:"rgba(247,183,49,0.1)",border:"1px solid rgba(247,183,49,0.22)",
                fontSize:"12px",color:"#f7b731"}}>⚖️ {fish.regulation}</div>
            </div>
          )}
        </div>
      ))}

      {/* VUE CALCUL */}
      {view==="calc" && (
        <div>
          <div style={{padding:"11px 13px",borderRadius:"13px",marginBottom:"13px",
            background:"rgba(0,87,231,0.12)",border:"1px solid rgba(0,87,231,0.25)"}}>
            <div style={{fontSize:"12px",color:"#7eb3ff",fontWeight:700,marginBottom:"8px"}}>
              📐 Formule — Score max : {MAX_SCORE} pts
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px"}}>
              {[{l:"Habitat",m:40,c:"#00d4aa"},{l:"Saison",m:30,c:"#f7b731"},{l:"Météo",m:25,c:"#56b6c2"},
                {l:"Vent",m:15,c:"#c678dd"},{l:"Température",m:20,c:"#e06c75"},{l:"Pression",m:10,c:"#d19a66"},
                {l:"Heure",m:12,c:"#8b6f47"},{l:"Eau / Clarté",m:8,c:"#6aab3f"},{l:"Profondeur",m:8,c:"#e55a2b"},
                {l:"Courant",m:6,c:"#5b9bd5"},{l:"Végétation",m:5,c:"#56b6c2"},{l:"Lune",m:8,c:"#c678dd"}
              ].map(f=>(
                <div key={f.l} style={{display:"flex",alignItems:"center",gap:"6px",padding:"5px 7px",borderRadius:"7px",background:"rgba(255,255,255,0.04)"}}>
                  <div style={{width:3,height:13,borderRadius:2,background:f.c,flexShrink:0}}/>
                  <span style={{fontSize:"11px",color:"#c0d0e0",flex:1}}>{f.l}</span>
                  <span style={{fontSize:"11px",fontWeight:700,color:f.c}}>/{f.m}</span>
                </div>
              ))}
            </div>
          </div>
          {results.map(fish=>(
            <div key={fish.id} style={{marginBottom:"10px",borderRadius:"15px",overflow:"hidden",
              background:"rgba(255,255,255,0.04)",border:`1.5px solid ${fish.color}44`}}>
              <div onClick={()=>setShowCalc(showCalc===fish.id?null:fish.id)}
                style={{padding:"12px 13px",display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"}}>
                <span style={{fontSize:"22px"}}>{fish.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"15px",color:"#e0eaff"}}>{fish.name}</div>
                  <div style={{display:"flex",alignItems:"center",gap:"7px",marginTop:"3px"}}>
                    <ScoreBar pct={fish.pct} color={fish.color} height={4}/>
                    <span style={{fontSize:"11px",color:fish.color,fontWeight:700,flexShrink:0,whiteSpace:"nowrap"}}>{fish.score} pts ({fish.pct}%)</span>
                  </div>
                </div>
                <div style={{color:"#8899bb",fontSize:"18px",transition:"transform .2s",transform:showCalc===fish.id?"rotate(90deg)":"rotate(0)"}}>›</div>
              </div>
              {showCalc===fish.id&&(
                <div style={{padding:"0 13px 13px",borderTop:`1px solid ${fish.color}22`}}>
                  <div style={{marginTop:"9px",display:"flex",flexDirection:"column",gap:"5px"}}>
                    {fish.breakdown.map((item,i)=><BreakdownRow key={i} item={item}/>)}
                  </div>
                  <div style={{marginTop:"9px",padding:"9px",borderRadius:"9px",
                    background:"rgba(255,255,255,0.04)",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <span style={{fontSize:"12px",color:"#8899bb"}}>Score total</span>
                    <div>
                      <span style={{fontSize:"16px",fontWeight:800,color:fish.color}}>{fish.score} pts</span>
                      <span style={{fontSize:"11px",color:"#8899bb",marginLeft:"6px"}}>/ {MAX_SCORE} max</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  AQUARIUM — Identification IA Claude Vision
// ═══════════════════════════════════════════════════════════════════════
function AquariumPage() {
  const [catches,   setCatches]   = useState([]);
  const [modal,     setModal]     = useState(null);
  const [status,    setStatus]    = useState("idle"); // idle|analyzing|error
  const [errMsg,    setErrMsg]    = useState("");
  const camRef = useRef(), galRef = useRef();

  async function processFile(file) {
    if (!file) return;
    setStatus("analyzing"); setErrMsg("");
    const reader = new FileReader();
    reader.onload = async ev => {
      const dataUrl  = ev.target.result;
      const [hdr, b64] = dataUrl.split(",");
      const mime = hdr.match(/:(.*?);/)?.[1] ?? "image/jpeg";
      try {
        const res = await identifyFishWithClaude(b64, mime);
        setCatches(prev=>[{
          id:Date.now(), photoUrl:dataUrl,
          fishName:   res.found ? res.name        : "Espèce non identifiée",
          fishNameEn: res.found ? res.nameEn      : "",
          confidence: res.found ? res.confidence  : "faible",
          weight:     res.found ? res.weight_estimate : "?",
          length:     res.found ? res.length_estimate : "?",
          description:res.found ? res.description : "Photo non concluante.",
          regulation: res.found ? res.regulation  : "",
          funFact:    res.found ? res.fun_fact     : "",
          date: new Date().toLocaleDateString("fr-CA"),
        }, ...prev]);
        setStatus("idle");
      } catch(e) {
        setStatus("error");
        setErrMsg(e.message ?? "Erreur inconnue");
      }
    };
    reader.readAsDataURL(file);
  }

  function pick(e) { processFile(e.target.files?.[0]); e.target.value=""; }
  const confColor = c=>c==="élevée"?"#00d4aa":c==="moyenne"?"#f7b731":"#e06c75";
  const totalW = catches.map(c=>parseFloat(c.weight)).filter(w=>!isNaN(w)).reduce((s,w)=>s+w,0).toFixed(2);

  return (
    <div style={{padding:"0 18px 110px"}}>
      {/* Tank */}
      <div style={{margin:"18px 0 16px",borderRadius:"22px",overflow:"hidden",
        background:"linear-gradient(180deg,#001428,#002952 55%,#003d78)",
        border:"1.5px solid rgba(0,100,200,0.3)",position:"relative",minHeight:"155px"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",
          background:"linear-gradient(90deg,transparent,rgba(100,200,255,0.5),transparent)",
          animation:"waterflow 3s linear infinite"}}/>
        {[...Array(8)].map((_,i)=>(
          <div key={i} style={{position:"absolute",bottom:`${(i*17)%55+5}%`,left:`${8+i*11}%`,
            width:`${5+i%4*2}px`,height:`${5+i%4*2}px`,borderRadius:"50%",
            border:"1.5px solid rgba(130,210,255,0.3)",
            animation:`bubble ${1.5+i*0.4}s ease-in-out ${i*0.2}s infinite alternate`}}/>
        ))}
        {catches.slice(0,5).map((c,i)=>(
          <div key={c.id} style={{position:"absolute",top:`${16+i*15}%`,left:`${5+i*18}%`,
            fontSize:"26px",animation:`swim ${2.5+i*0.6}s ${i*0.4}s ease-in-out infinite alternate`}}>🐟</div>
        ))}
        <div style={{position:"relative",zIndex:1,padding:"18px 18px 14px"}}>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"23px",
            color:"#7dd4fc",textShadow:"0 0 20px rgba(125,212,252,0.4)"}}>🐠 Mon Aquarium</div>
          <div style={{color:"rgba(125,212,252,0.7)",fontSize:"12px",marginTop:"2px"}}>
            {catches.length===0?"Identifie ta première prise avec l'IA Claude !"
              :`${catches.length} prise${catches.length>1?"s":""} · ${totalW} kg total`}
          </div>
        </div>
      </div>

      {/* Boutons */}
      <input ref={galRef} type="file" accept="image/*" onChange={pick} style={{display:"none"}}/>
      <input ref={camRef} type="file" accept="image/*" capture="environment" onChange={pick} style={{display:"none"}}/>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"9px",marginBottom:"14px"}}>
        <button onClick={()=>galRef.current?.click()} disabled={status==="analyzing"} style={{
          padding:"13px",borderRadius:"13px",border:"1.5px solid rgba(0,87,231,0.4)",cursor:"pointer",
          background:"rgba(0,87,231,0.15)",color:"#7eb3ff",fontSize:"14px",
          fontFamily:"'Fredoka One',cursive",transition:"all .2s"}}>
          🖼️ Galerie
        </button>
        <button onClick={()=>camRef.current?.click()} disabled={status==="analyzing"} style={{
          padding:"13px",borderRadius:"13px",border:"none",cursor:"pointer",
          background:status==="analyzing"?"rgba(255,255,255,0.05)":"linear-gradient(135deg,#0057e7,#00d4aa)",
          color:"#fff",fontSize:"14px",fontFamily:"'Fredoka One',cursive",
          boxShadow:status==="analyzing"?"none":"0 4px 16px rgba(0,87,231,0.35)",transition:"all .2s"}}>
          📸 Caméra
        </button>
      </div>

      {/* État analyse */}
      {status==="analyzing"&&(
        <div style={{marginBottom:"13px",padding:"15px",borderRadius:"13px",
          background:"rgba(0,87,231,0.12)",border:"1px solid rgba(0,87,231,0.28)",textAlign:"center"}}>
          <div style={{color:"#7eb3ff",fontSize:"13px",marginBottom:"7px"}}>
            🤖 Claude Vision analyse ta photo…
          </div>
          <div style={{height:"4px",borderRadius:"2px",background:"rgba(255,255,255,0.1)",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:"2px",
              background:"linear-gradient(90deg,#0057e7,#00d4aa)",animation:"progress 3s ease forwards"}}/>
          </div>
          <div style={{fontSize:"10px",color:"#8899bb",marginTop:"6px"}}>
            Recherche dans la base des espèces du Québec…
          </div>
        </div>
      )}
      {status==="error"&&(
        <div style={{marginBottom:"12px",padding:"12px",borderRadius:"12px",
          background:"rgba(224,108,117,0.1)",color:"#e06c75",fontSize:"12px",textAlign:"center"}}>
          ❌ {errMsg || "Erreur d'identification. Réessaie."}<br/>
          <span style={{fontSize:"10px",color:"#8899bb",marginTop:"4px",display:"block"}}>
            (Assure-toi que la photo contient bien un poisson)
          </span>
          <button onClick={()=>setStatus("idle")} style={{marginTop:"8px",padding:"5px 14px",
            borderRadius:"999px",border:"none",background:"rgba(255,255,255,0.1)",
            color:"#e0eaff",fontSize:"12px",cursor:"pointer"}}>Fermer</button>
        </div>
      )}

      {catches.length===0&&status==="idle"&&(
        <div style={{textAlign:"center",padding:"36px 0",color:"#6b7a99",fontSize:"14px"}}>
          <div style={{fontSize:"50px",marginBottom:"10px"}}>🎣</div>
          Importe une photo depuis ta galerie<br/>ou prends une photo directement.<br/>
          <span style={{fontSize:"11px",color:"#8899bb"}}>Claude Vision identifie l'espèce automatiquement.</span>
        </div>
      )}

      {/* Grille */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"11px"}}>
        {catches.map(c=>(
          <div key={c.id} onClick={()=>setModal(c)} style={{borderRadius:"15px",overflow:"hidden",
            cursor:"pointer",background:"rgba(255,255,255,0.04)",
            border:"1.5px solid rgba(255,255,255,0.09)"}}>
            <div style={{height:"108px",overflow:"hidden",position:"relative",background:"rgba(0,87,231,0.12)"}}>
              <img src={c.photoUrl} alt={c.fishName} style={{width:"100%",height:"100%",objectFit:"cover",opacity:0.9}}/>
              {c.confidence&&<div style={{position:"absolute",top:5,right:6,
                padding:"2px 7px",borderRadius:"999px",fontSize:"10px",fontWeight:700,
                background:"rgba(0,0,0,0.65)",color:confColor(c.confidence)}}>{c.confidence}</div>}
            </div>
            <div style={{padding:"9px 10px"}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"14px",color:"#e0eaff",
                overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.fishName}</div>
              <div style={{fontSize:"10px",color:"#6b7a99",marginTop:"1px"}}>{c.date} · {c.weight}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal&&(
        <div onClick={()=>setModal(null)} style={{position:"fixed",inset:0,zIndex:200,
          background:"rgba(0,5,20,0.94)",display:"flex",alignItems:"center",
          justifyContent:"center",padding:"16px"}}>
          <div onClick={e=>e.stopPropagation()} style={{width:"100%",maxWidth:"360px",
            borderRadius:"24px",overflow:"hidden",background:"#060e20",
            border:"1.5px solid rgba(0,212,170,0.25)",maxHeight:"90vh",overflowY:"auto"}}>
            <div style={{position:"relative",height:"195px"}}>
              <img src={modal.photoUrl} alt={modal.fishName} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,transparent 40%,rgba(6,14,32,0.97))"}}/>
              <div style={{position:"absolute",bottom:"12px",left:"15px",right:"15px"}}>
                <div style={{fontFamily:"'Fredoka One',cursive",fontSize:"22px",color:"#fff"}}>{modal.fishName}</div>
                {modal.fishNameEn&&<div style={{fontSize:"11px",color:"rgba(255,255,255,0.55)"}}>{modal.fishNameEn}</div>}
              </div>
            </div>
            <div style={{padding:"15px"}}>
              {modal.confidence&&(
                <div style={{padding:"8px 11px",borderRadius:"10px",marginBottom:"10px",
                  background:`rgba(${modal.confidence==="élevée"?"0,212,170":modal.confidence==="moyenne"?"247,183,49":"224,108,117"},0.1)`,
                  display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"16px"}}>🤖</span>
                  <div>
                    <div style={{fontSize:"12px",fontWeight:700,color:confColor(modal.confidence)}}>Confiance IA : {modal.confidence}</div>
                    <div style={{fontSize:"10px",color:"#8899bb"}}>Identification par Claude Vision</div>
                  </div>
                </div>
              )}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"8px",marginBottom:"10px"}}>
                {[{label:"📅 Date",val:modal.date},{label:"⚖️ Poids",val:modal.weight},{label:"📏 Long.",val:modal.length}].map(s=>(
                  <div key={s.label} style={{textAlign:"center",padding:"8px",borderRadius:"10px",background:"rgba(255,255,255,0.05)"}}>
                    <div style={{fontSize:"10px",color:"#6b7a99"}}>{s.label}</div>
                    <div style={{fontSize:"13px",color:"#e0eaff",fontWeight:700,marginTop:"1px"}}>{s.val}</div>
                  </div>
                ))}
              </div>
              {modal.description&&(
                <div style={{padding:"9px 11px",borderRadius:"10px",marginBottom:"9px",
                  background:"rgba(0,212,170,0.07)",border:"1px solid rgba(0,212,170,0.18)",
                  fontSize:"12px",color:"#c0d0e0",lineHeight:1.5}}>{modal.description}</div>
              )}
              {modal.funFact&&(
                <div style={{padding:"8px 11px",borderRadius:"9px",marginBottom:"9px",
                  background:"rgba(247,183,49,0.07)",border:"1px solid rgba(247,183,49,0.18)",
                  fontSize:"12px",color:"#f7b731",lineHeight:1.4}}>💡 {modal.funFact}</div>
              )}
              {modal.regulation&&(
                <div style={{padding:"8px 11px",borderRadius:"9px",marginBottom:"13px",
                  background:"rgba(224,108,117,0.07)",border:"1px solid rgba(224,108,117,0.18)",
                  fontSize:"12px",color:"#e06c75",lineHeight:1.4}}>⚖️ {modal.regulation}</div>
              )}
              <div style={{display:"flex",gap:"9px"}}>
                <button onClick={()=>{setCatches(p=>p.filter(x=>x.id!==modal.id));setModal(null);}}
                  style={{flex:1,padding:"11px",borderRadius:"11px",border:"none",
                    background:"rgba(224,108,117,0.15)",color:"#e06c75",fontFamily:"inherit",fontSize:"13px",cursor:"pointer"}}>
                  🗑 Retirer
                </button>
                <button onClick={()=>setModal(null)} style={{flex:2,padding:"11px",borderRadius:"11px",border:"none",
                  background:"linear-gradient(135deg,#0057e7,#00d4aa)",color:"#fff",
                  fontFamily:"'Fredoka One',cursive",fontSize:"14px",cursor:"pointer"}}>
                  ✓ Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════
export default function BestBaitApp() {
  const [page,    setPage]    = useState("search");
  const [results, setResults] = useState([]);
  const [context, setContext] = useState({});

  function handleResults(r,ctx) { setResults(r); setContext(ctx??{}); setPage("results"); }

  const NAV = [
    {id:"search",   icon:<IcoSearch/>,  label:"Recherche"},
    {id:"results",  icon:<IcoFish/>,    label:"Résultats"},
    {id:"aquarium", icon:<IcoCamera/>,  label:"Aquarium"},
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@400;500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html,body{background:#05091a;}
        input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(0.6);}
        input::placeholder{color:#4a5568;}
        ::-webkit-scrollbar{width:3px;height:3px;}
        ::-webkit-scrollbar-thumb{background:rgba(0,212,170,0.25);border-radius:2px;}
        @keyframes bubble{from{transform:translateY(0) scale(1);opacity:.5;}to{transform:translateY(-13px) scale(1.1);opacity:.2;}}
        @keyframes swim{0%{transform:translateX(0) scaleX(1);}49%{transform:translateX(22px) scaleX(1);}51%{transform:translateX(22px) scaleX(-1);}100%{transform:translateX(0) scaleX(-1);}}
        @keyframes waterflow{from{transform:translateX(-100%);}to{transform:translateX(100%);}}
        @keyframes progress{from{width:0%;}to{width:100%;}}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
      `}</style>
      <div style={{minHeight:"100vh",background:"#05091a",fontFamily:"'DM Sans',sans-serif",color:"#e0eaff",
        maxWidth:"430px",margin:"0 auto",
        backgroundImage:`radial-gradient(ellipse at 15% 5%,rgba(0,70,160,0.5) 0%,transparent 55%),radial-gradient(ellipse at 85% 95%,rgba(0,90,110,0.35) 0%,transparent 55%)`}}>
        {/* Header */}
        <div style={{position:"sticky",top:0,zIndex:60,padding:"12px 18px",
          background:"rgba(5,9,26,0.88)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
          borderBottom:"1px solid rgba(255,255,255,0.06)",
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
            {page==="results"&&(
              <button onClick={()=>setPage("search")} style={{width:36,height:36,borderRadius:"10px",border:"none",
                background:"rgba(255,255,255,0.08)",color:"#e0eaff",cursor:"pointer",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <IcoBack/>
              </button>
            )}
            <Logo/>
          </div>
          {page==="results"&&results.length>0&&(
            <div style={{padding:"5px 11px",borderRadius:"999px",background:"rgba(0,212,170,0.15)",
              color:"#00d4aa",fontSize:"12px",fontWeight:700,border:"1px solid rgba(0,212,170,0.25)"}}>
              {results.length} résultat{results.length>1?"s":""}
            </div>
          )}
        </div>
        {/* Content */}
        <div key={page} style={{animation:"fadeSlide .28s ease forwards"}}>
          {page==="search"   && <SearchPage onResults={handleResults}/>}
          {page==="results"  && <ResultsPage results={results} context={context} onBack={()=>setPage("search")}/>}
          {page==="aquarium" && <AquariumPage/>}
        </div>
        {/* Nav */}
        <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",
          width:"100%",maxWidth:"430px",background:"rgba(5,9,26,0.94)",
          backdropFilter:"blur(18px)",WebkitBackdropFilter:"blur(18px)",
          borderTop:"1px solid rgba(255,255,255,0.07)",
          display:"grid",gridTemplateColumns:"1fr 1fr 1fr",
          padding:"8px 0 22px",zIndex:60}}>
          {NAV.map(tab=>{
            const isActive=page===tab.id;
            const isDisabled=tab.id==="results"&&!results.length;
            return (
              <button key={tab.id} onClick={()=>!isDisabled&&setPage(tab.id)} style={{
                background:"none",border:"none",cursor:isDisabled?"not-allowed":"pointer",
                display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"6px 0",
                color:isActive?"#00d4aa":"#4a5568",opacity:isDisabled?0.28:1,transition:"color .2s"}}>
                <div style={{width:42,height:42,borderRadius:"13px",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  background:isActive?"rgba(0,212,170,0.14)":"transparent",transition:"background .2s"}}>
                  {tab.icon}
                </div>
                <span style={{fontSize:"10px",fontWeight:600,letterSpacing:"0.4px"}}>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
