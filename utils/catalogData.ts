import {
  AnodizedColor,
  PresetDesign,
  ProductItem,
  SeriesCategory,
} from '@/types';

export const SERIES_CATEGORIES: SeriesCategory[] = [
  'Todos',
  'Racing',
  'Heroes',
  'Anime',
  'Idols',
  'Sport',
  'Sci-Fi',
  'Dental Humor',
  'Architecture',
  'Retro Gaming',
  'Animals',
];

export const ANODIZED_COLORS: AnodizedColor[] = [
  {
    id: 'matte-black',
    name: 'Matte Tactical Black',
    hex: '#18181b',
    secondaryHex: '#09090b',
    highlightHex: '#3f3f46',
    laserTint: '#f4f4f5',
    badgeText: 'Favorito',
  },
  {
    id: 'royal-blue',
    name: 'Royal Cobalt Blue',
    hex: '#1d4ed8',
    secondaryHex: '#172554',
    highlightHex: '#60a5fa',
    laserTint: '#e2e8f0',
    badgeText: 'Clásico Clínico',
  },
  {
    id: 'ruby-red',
    name: 'Ruby Racing Red',
    hex: '#be123c',
    secondaryHex: '#4c0519',
    highlightHex: '#fb7185',
    laserTint: '#f8fafc',
    badgeText: 'Edición Sport',
  },
  {
    id: 'anodized-gold',
    name: 'Champagne Gold 24K',
    hex: '#b45309',
    secondaryHex: '#451a03',
    highlightHex: '#fbbf24',
    laserTint: '#fef3c7',
    badgeText: 'Premium',
  },
  {
    id: 'emerald-green',
    name: 'Surgical Emerald',
    hex: '#047857',
    secondaryHex: '#022c22',
    highlightHex: '#34d399',
    laserTint: '#ecfdf5',
    badgeText: 'Quirúrgico',
  },
  {
    id: 'cyber-purple',
    name: 'Ultraviolet Matte',
    hex: '#6d28d9',
    secondaryHex: '#2e1065',
    highlightHex: '#a78bfa',
    laserTint: '#f3e8ff',
    badgeText: 'Tendencia',
  },
];

// Helper to safely encode URI paths with spaces and parentheses
const catPath = (folder: string, file: string) =>
  `/Catalogo/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

export const PRESET_DESIGNS: PresetDesign[] = [
  // ==================== RACING SERIES ====================
  {
    id: 'racing-ferrari-f1',
    code: 'RAC-01',
    title: 'Scuderia Ferrari SF-16 F1',
    category: 'Racing',
    description: 'Monoplaza Fórmula 1 perfil técnico de alta velocidad (#16).',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post.png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'racing-ford-f150',
    code: 'RAC-02',
    title: 'Ford F-150 XL Classic Pickup',
    category: 'Racing',
    description: 'Camioneta clásica americana perfil lateral de colección.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (1).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'racing-camaro-zl1',
    code: 'RAC-03',
    title: 'Chevrolet Camaro ZL1 Muscle',
    category: 'Racing',
    description: 'Muscle car aerodinámico con rines deportivos y franja lateral.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (2).png'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'racing-lambo-huracan',
    code: 'RAC-04',
    title: 'Lamborghini Huracán EVO',
    category: 'Racing',
    description: 'Superdeportivo italiano V10 en trazo vectorial para grabado láser.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (3).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'racing-ducati-panigale',
    code: 'RAC-05',
    title: 'Ducati Panigale V4 Superbike',
    category: 'Racing',
    description: 'Motocicleta de pista con carenado e ingeniería mecánica detallada.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (4).png'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'racing-porsche-911',
    code: 'RAC-06',
    title: 'Porsche 911 Carrera Classic (930)',
    category: 'Racing',
    description: 'Leyenda alemana con rines Fuchs y silueta coupé inconfundible.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (5).png'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'racing-lambo-countach',
    code: 'RAC-07',
    title: 'Lamborghini Countach LP5000',
    category: 'Racing',
    description: 'Ícono retro-futurista en cuña con alerón trasero de alto impacto.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (6).png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'racing-shelby-cobra',
    code: 'RAC-08',
    title: 'Shelby Cobra 427 Roadster',
    category: 'Racing',
    description: 'Roadster clásico de competición con escape lateral cromado.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (7).png'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'racing-mercedes-300sl',
    code: 'RAC-09',
    title: 'Mercedes-Benz 300 SL Gullwing',
    category: 'Racing',
    description: 'Clásico europeo "Alas de Gaviota" de elegancia atemporal.',
    imageUrl: catPath(
      'Racing Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (8).png'
    ),
    recommendedColorId: 'emerald-green',
  },

  // ==================== HEROES SERIES ====================
  {
    id: 'heroes-ironman-landing',
    code: 'HER-01',
    title: 'Iron Man Pose Heroica Mark LXXXV',
    category: 'Heroes',
    description: 'Aterrizaje de superhéroe con reactor Arc en alto contraste.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post.png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'heroes-captain-america',
    code: 'HER-02',
    title: 'Capitán América & Escudo Vibranium',
    category: 'Heroes',
    description: 'Silueta táctica del Primer Vengador portando el escudo estelar.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (1).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'heroes-black-panther',
    code: 'HER-03',
    title: 'Black Panther Wakanda Forever',
    category: 'Heroes',
    description: 'Máscara ceremonial y collar de vibranium en grabado de precisión.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (2).png'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'heroes-hulk-thunder',
    code: 'HER-04',
    title: 'Hulk Impacto Gamma',
    category: 'Heroes',
    description: 'Fuerza imparable rodeada de relámpagos de energía.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (3).png'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'heroes-spiderman-emblem',
    code: 'HER-05',
    title: 'Emblema Spider-Man Simbionte',
    category: 'Heroes',
    description: 'Insignia arácnida estilizada ideal para el centro del fresero.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (4).png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'heroes-batman-darkknight',
    code: 'HER-06',
    title: 'Batman El Caballero de la Noche',
    category: 'Heroes',
    description: 'Silueta en negativo con el emblema del murciélago en el pecho.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (5).png'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'heroes-spiderman-action',
    code: 'HER-07',
    title: 'Spider-Man Lanzatelarañas',
    category: 'Heroes',
    description: 'Pose dinámica en salto con detalle completo del traje.',
    imageUrl: catPath(
      'Heroes Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (6).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'heroes-flash-speedforce',
    code: 'HER-08',
    title: 'The Flash Speed Force',
    category: 'Heroes',
    description: 'Silueta velocista con emblema del relámpago central.',
    imageUrl: catPath(
      'Heroes Series',
      'flash_silhouette_by_danielbeadle_de2jlre-fullview.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'heroes-loki-silhouette',
    code: 'HER-09',
    title: 'Loki Dios de las Mentiras',
    category: 'Heroes',
    description: 'Silueta imperial arrodillada de perfil minimalista.',
    imageUrl: catPath(
      'Heroes Series',
      'loki_kneeling_silhouette_by_the_nature_author_d5xkcxt-fullview.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },

  // ==================== ANIME SERIES ====================
  {
    id: 'anime-shenlong-dbz',
    code: 'ANI-01',
    title: 'Dragón Sagrado Shenlong',
    category: 'Anime',
    description: 'Grabado detallado de escamas y garras del dragón eterno.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post.png'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'anime-onepiece-mugiwara',
    code: 'ANI-02',
    title: 'One Piece Jolly Roger Mugiwara',
    category: 'Anime',
    description: 'Emblema pirata Sombrero de Paja de alta definición.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (1).png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'anime-gojo-satoru',
    code: 'ANI-03',
    title: 'Satoru Gojo Expansión de Dominio',
    category: 'Anime',
    description: 'Silueta icónica de Jujutsu Kaisen realizando el sello Infinito.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (2).png'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'anime-pikachu-classic',
    code: 'ANI-04',
    title: 'Pikachu Impactrueno',
    category: 'Anime',
    description: 'Diseño carismático ideal para odontopediatría y fans del anime.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (3).png'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'anime-yugioh-millennium',
    code: 'ANI-05',
    title: 'Rompecabezas del Milenio (Yu-Gi-Oh!)',
    category: 'Anime',
    description: 'Reliquia egipcia piramidal con el Ojo de Wdjat grabado en línea fina.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (4).png'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'anime-naruto-sage',
    code: 'ANI-06',
    title: 'Naruto Uzumaki Modo Sabio',
    category: 'Anime',
    description: 'Silueta épica con capa y pergamino de invocación.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (5).png'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'anime-aot-wings',
    code: 'ANI-07',
    title: 'Alas de la Libertad (Shingeki no Kyojin)',
    category: 'Anime',
    description: 'Escudo de la Legión de Reconocimiento con plumas entrelazadas.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (6).png'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'anime-allmight-plusultra',
    code: 'ANI-08',
    title: 'All Might Símbolo de la Paz',
    category: 'Anime',
    description: 'Sonrisa legendaria Plus Ultra perfecta para clínica dental.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (7).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'anime-tanjiro-kamado',
    code: 'ANI-09',
    title: 'Tanjiro Kamado Haori Ajedrezado',
    category: 'Anime',
    description: 'Cazador de demonios en guardia con katana Nichirin.',
    imageUrl: catPath(
      'Anime Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (8).png'
    ),
    recommendedColorId: 'emerald-green',
  },

  // ==================== IDOL SERIES ====================
  {
    id: 'idols-kuromi-devil',
    code: 'IDL-01',
    title: 'Kuromi Punk Devil Edition',
    category: 'Idols',
    description: 'Personaje Sanrio con gorro de calavera y tridente de corazones.',
    imageUrl: catPath(
      'Idol Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post.png'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'idols-badbunny-heart',
    code: 'IDL-02',
    title: 'Corazón Sad Un Verano Sin Ti',
    category: 'Idols',
    description: 'Ícono musical urbano minimalista de gran contraste.',
    imageUrl: catPath(
      'Idol Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (1).png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'idols-cheshire-cat',
    code: 'IDL-03',
    title: 'Gato Risón (Cheshire Smile)',
    category: 'Idols',
    description: 'La sonrisa más famosa de la cultura pop, favorita de odontólogos.',
    imageUrl: catPath(
      'Idol Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (2).png'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'idols-toystory-alien',
    code: 'IDL-04',
    title: 'Alien Pizza Planet ("¡El Gancho!")',
    category: 'Idols',
    description: 'Marcianito de tres ojos saludando, ideal para consultorio.',
    imageUrl: catPath(
      'Idol Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (3).png'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'idols-pikachu-pop',
    code: 'IDL-05',
    title: 'Pikachu Pop Idol Edition',
    category: 'Idols',
    description: 'Edición especial Idol Series para fans de la cultura pop.',
    imageUrl: catPath(
      'Idol Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (4).png'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'idols-cinnamoroll-sweet',
    code: 'IDL-06',
    title: 'Cinnamoroll Kawaii Cloud',
    category: 'Idols',
    description: 'Diseño tierno de trazos limpios y redondeados.',
    imageUrl: catPath(
      'Idol Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (5).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'idols-jake-dog',
    code: 'IDL-07',
    title: 'Jake el Perro (Hora de Aventura)',
    category: 'Idols',
    description: 'Compañero mágico saludando en línea limpia.',
    imageUrl: catPath(
      'Idol Series',
      'Gemini_Generated_Image_556lus556lus556l.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'idols-grumpy-bear',
    code: 'IDL-08',
    title: 'Osito Gruñón (Care Bears)',
    category: 'Idols',
    description: 'Osito con nube de tormenta y corazones en el abdomen.',
    imageUrl: catPath(
      'Idol Series',
      'Gemini_Generated_Image_t6mmd5t6mmd5t6mm.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },

  // ==================== SPORT SERIES ====================
  {
    id: 'sport-messi-10',
    code: 'SPT-01',
    title: 'Lionel Messi #10 Festejo al Cielo',
    category: 'Sport',
    description: 'Silueta histórica del 10 apuntando al cielo.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (6).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'sport-ronaldo-cr7',
    code: 'SPT-02',
    title: 'Cristiano Ronaldo CR7 "Siuuu"',
    category: 'Sport',
    description: 'El festejo más icónico del fútbol mundial con dorsal 7.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (7).png'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'sport-ballet-swan',
    code: 'SPT-03',
    title: 'Bailarina Clásica Grand Jeté',
    category: 'Sport',
    description: 'Elegancia y equilibrio en danza clásica sobre puntas.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (8).png'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'sport-lebron-23',
    code: 'SPT-04',
    title: 'LeBron James #23 King Flex',
    category: 'Sport',
    description: 'Potencia de leyenda del básquetbol con dorsal 23.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (9).png'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'sport-curry-30',
    code: 'SPT-05',
    title: 'Stephen Curry #30 Splash Three',
    category: 'Sport',
    description: 'Celebración de triple con brazos en alto y dorsal 30.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (10).png'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'sport-f1-driver-victory',
    code: 'SPT-06',
    title: 'Piloto Fórmula 1 Victoria en Podio',
    category: 'Sport',
    description: 'Casco y brazos abiertos celebrando la bandera a cuadros.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (11).png'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'sport-ballet-pirouette',
    code: 'SPT-07',
    title: 'Ballet Clásico Pirouette',
    category: 'Sport',
    description: 'Silueta artística de danza en quinta posición.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (12).png'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'sport-nfl-runner-24',
    code: 'SPT-08',
    title: 'NFL Running Back #24 Touchdown',
    category: 'Sport',
    description: 'Jugador de fútbol americano en carrera de poder con ovoide.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (13).png'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'sport-nfl-quarterback',
    code: 'SPT-09',
    title: 'NFL Quarterback Pase Largo',
    category: 'Sport',
    description: 'Silueta atlética de mariscal de campo lanzando el pase.',
    imageUrl: catPath(
      'Sport Series',
      'Neutral Beige Grid Photo Collage Jewelry Product Instagram Post (14).png'
    ),
    recommendedColorId: 'matte-black',
  },

  // ==================== SCI-FI SERIES ====================
  {
    id: 'scifi-terminator-skull',
    code: 'SCI-01',
    title: 'Cráneo Cibernético T-800',
    category: 'Sci-Fi',
    description: 'Endoesqueleto robótico futurista con circuitos de alta precisión.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_3kn4sj3kn4sj3kn4.jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'scifi-saturn-planet',
    code: 'SCI-02',
    title: 'Saturno & Anillos Orbitales',
    category: 'Sci-Fi',
    description: 'Planeta gigante gaseoso con anillos concéntricos en línea limpia.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_4drtcx4drtcx4drt.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'scifi-jedi-lightsaber',
    code: 'SCI-03',
    title: 'Sable de Luz Galáctico',
    category: 'Sci-Fi',
    description: 'Empuñadura técnica y hoja de plasma para fans de la saga estelar.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_eaeiuueaeiuueaei.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'scifi-matrix-binary',
    code: 'SCI-04',
    title: 'Código Binario & Nodos Cyber',
    category: 'Sci-Fi',
    description: 'Cascada digital de ceros y unos con líneas de circuito.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_fxzxlhfxzxlhfxzx.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'scifi-arc-reactor',
    code: 'SCI-05',
    title: 'Reactor Arc Núcleo Cuántico',
    category: 'Sci-Fi',
    description: 'Geometría energética triangular enmarcada en anillo tecnológico.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_i8wn0ki8wn0ki8wn.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'scifi-bionic-eye',
    code: 'SCI-06',
    title: 'Ojo Biónico Cyberware',
    category: 'Sci-Fi',
    description: 'Lente óptico mecánico con conectores neuronales y diafragma.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_md5dgcmd5dgcmd5d.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'scifi-uss-enterprise',
    code: 'SCI-07',
    title: 'USS Enterprise NCC-1701',
    category: 'Sci-Fi',
    description: 'Crucero de exploración estelar clase Constitución en perfil clásico.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'Gemini_Generated_Image_teizfpteizfpteiz.jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'scifi-millennium-falcon',
    code: 'SCI-08',
    title: 'Halcón Milenario Corelliano',
    category: 'Sci-Fi',
    description: 'El carguero ligero más veloz de la galaxia en perspectiva técnica.',
    imageUrl: catPath('Sci-Fi Series', 'halcon-milenario.jpg'),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'scifi-darth-vader-chibi',
    code: 'SCI-09',
    title: 'Lord Darth Vader Imperio Galáctico',
    category: 'Sci-Fi',
    description: 'Ilustración vectorial en alto contraste del Lord Sith.',
    imageUrl: catPath(
      'Sci-Fi Series',
      'pngtree-black-and-white-illustration-of-darth-vader-vector-png-image_6786563.png'
    ),
    recommendedColorId: 'ruby-red',
  },

  // ==================== DENTAL HUMOR SERIES ====================
  {
    id: 'dental-humor-dentist-life',
    code: 'DEN-01',
    title: 'Molar Feliz #DentistLife',
    category: 'Dental Humor',
    description: 'Molar sonriente con emblema #DentistLife para uso diario en clínica.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_5egw265egw265egw.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'dental-humor-anatomical-jaw',
    code: 'DEN-02',
    title: 'Maxilar Anatómico & Raíces',
    category: 'Dental Humor',
    description: 'Ilustración anatómica de precisión de arcada superior e inferior.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_6k8nt46k8nt46k8n.jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'dental-humor-ninja-tooth',
    code: 'DEN-03',
    title: 'Molar Ninja Guerrero Anticaries',
    category: 'Dental Humor',
    description: 'Diente shinobi con katana listo para defender la sonrisa.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_8b9z748b9z748b9z.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'dental-humor-ecg-pulse',
    code: 'DEN-04',
    title: 'Pulso Vital Odontológico (ECG)',
    category: 'Dental Humor',
    description: 'Latido cardíaco continuo fusionado con la silueta de un molar.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_k03qufk03qufk03q.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'dental-humor-sweet-monster',
    code: 'DEN-05',
    title: 'Monstruo Dulce Odontopediatría',
    category: 'Dental Humor',
    description: 'Personaje simpático con cristales, ideal para consulta infantil.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_tuebzrtuebzrtueb.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'dental-humor-king-crown-anchor',
    code: 'DEN-06',
    title: 'Rey Molar Coronado Old-School',
    category: 'Dental Humor',
    description: 'Molar con corona real y tatuaje de ancla estilo tradicional.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_wa1gprwa1gprwa1g (1).jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'dental-humor-super-molar',
    code: 'DEN-07',
    title: 'Súper Molar al Rescate',
    category: 'Dental Humor',
    description: 'Molar superhéroe en vuelo con capa e insignia en el pecho.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_wa1gprwa1gprwa1g (2).jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'dental-humor-supreme-judge',
    code: 'DEN-08',
    title: 'El Juez del Juicio Dental (Tercer Molar)',
    category: 'Dental Humor',
    description: 'Ingenioso diseño de la "Muela del Juicio" en la corte suprema.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_wa1gprwa1gprwa1g (3).jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'dental-humor-cool-sunglasses',
    code: 'DEN-09',
    title: 'Molar Cool Sunglasses',
    category: 'Dental Humor',
    description: 'Diente con lentes de sol aviador y sonrisa radiante.',
    imageUrl: catPath(
      'Dental Humor Series',
      'Gemini_Generated_Image_wa1gprwa1gprwa1g.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },

  // ==================== ARCHITECTURE & LANDMARKS SERIES ====================
  {
    id: 'arch-lighthouse-beacon',
    code: 'ARC-01',
    title: 'Faro Costero Guía del Navegante',
    category: 'Architecture',
    description: 'Faro clásico proyectando su haz de luz sobre las olas.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_6gezxf6gezxf6gez.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'arch-nautical-compass',
    code: 'ARC-02',
    title: 'Rosa de los Vientos Cartográfica',
    category: 'Architecture',
    description: 'Brújula náutica de precisión con flor de lis y grados cardinales.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_7myykm7myykm7myy.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'arch-eiffel-tower',
    code: 'ARC-03',
    title: 'Torre Eiffel París Estructural',
    category: 'Architecture',
    description: 'Ícono arquitectónico de hierro entramado en alta definición.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_91m3y591m3y591m3.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'arch-alpine-valley',
    code: 'ARC-04',
    title: 'Cordillera Alpina & Río Geométrico',
    category: 'Architecture',
    description: 'Paisaje de cumbres montañosas y bosque de pinos en rombo.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_ajlf1lajlf1lajlf.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'arch-kanagawa-wave',
    code: 'ARC-05',
    title: 'La Gran Ola de Kanagawa',
    category: 'Architecture',
    description: 'Arte tradicional japonés Hokusai adaptado para grabado en aluminio.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_hldyb9hldyb9hldy.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'arch-golden-gate',
    code: 'ARC-06',
    title: 'Puente Colgante Golden Gate',
    category: 'Architecture',
    description: 'Ingeniería civil simétrica de torres y tensores de acero.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_kswmpjkswmpjkswm.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'arch-tokyo-torii-skyline',
    code: 'ARC-07',
    title: 'Santuario Torii & Horizonte de Tokio',
    category: 'Architecture',
    description: 'Fusión de arquitectura ancestral japonesa y rascacielos modernos.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_l6jrz0l6jrz0l6jr.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'arch-nyc-skyline-line',
    code: 'ARC-08',
    title: 'Skyline Nueva York Trazo Continuo',
    category: 'Architecture',
    description: 'Empire State, Chrysler y Puente de Brooklyn en arte lineal minimalista.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_pk7ruzpk7ruzpk7r.jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'arch-tropical-sunset',
    code: 'ARC-09',
    title: 'Atardecer Costero & Palmeras',
    category: 'Architecture',
    description: 'Horizonte marino con sol radiante y silueta de palmeras.',
    imageUrl: catPath(
      'Architecture & Landmarks Series',
      'Gemini_Generated_Image_uwy9j5uwy9j5uwy9.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },

  // ==================== VINTAGE & RETRO GAMING SERIES ====================
  {
    id: 'retro-power-mushroom',
    code: 'RET-01',
    title: 'Super Mushroom 1-UP',
    category: 'Retro Gaming',
    description: 'Ícono clásico de los videojuegos de plataformas de los años 80.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_5povbg5povbg5pov.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'retro-space-invader',
    code: 'RET-02',
    title: 'Space Invader Pixel-Art 8-Bit',
    category: 'Retro Gaming',
    description: 'Alienígena arcade original en bloques de píxeles perfectos.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_ha8xc4ha8xc4ha8x.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'retro-console-buttons',
    code: 'RET-03',
    title: 'Símbolos Gamer Clásicos',
    category: 'Retro Gaming',
    description: 'Emblemas geométricos de mando para apasionados del gaming.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_ihv90qihv90qihv9.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'retro-nes-controller',
    code: 'RET-04',
    title: 'Control Clásico 8-Bit (Select / Start)',
    category: 'Retro Gaming',
    description: 'Mando legendario con cruceta D-Pad y botones B y A.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_kuy3j1kuy3j1kuy3.jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'retro-cassette-mixtape',
    code: 'RET-05',
    title: 'Cassette Analógico Retro Sound',
    category: 'Retro Gaming',
    description: 'Cinta magnética vintage de los 80s con carretes detallados.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_nyioihnyioihnyio.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'retro-pacman-ghost',
    code: 'RET-06',
    title: 'Fantasma Arcade Pixelado',
    category: 'Retro Gaming',
    description: 'Personaje clásico de laberinto arcade en resolución 8-bit.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_qigl1oqigl1oqigl.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'retro-pokeball-emblem',
    code: 'RET-07',
    title: 'Cápsula de Captura Clásica',
    category: 'Retro Gaming',
    description: 'Esfera de entrenador en alto contraste ideal para centro de tapa.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_uxif0xuxif0xuxif.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'retro-tetris-blocks',
    code: 'RET-08',
    title: 'Lluvia de Bloques Tetrominó',
    category: 'Retro Gaming',
    description: 'Piezas geométricas encajando en línea de juego.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_w8o8nfw8o8nfw8o8.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'retro-triforce-crest',
    code: 'RET-09',
    title: 'Reliquia Trifuerza Dorada',
    category: 'Retro Gaming',
    description: 'Símbolo triangular sagrado de poder, sabiduría y valor.',
    imageUrl: catPath(
      'Vintage & Retro Gaming Series',
      'Gemini_Generated_Image_yb6txdyb6txdyb6t.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },

  // ==================== ANIMALS & SPIRIT SERIES ====================
  {
    id: 'animals-origami-fox',
    code: 'ANM-01',
    title: 'Zorro Geométrico Origami (Low-Poly)',
    category: 'Animals',
    description: 'Escultura poligonal facetada de zorro en simetría perfecta.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_12rqwu12rqwu12rq.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'animals-grizzly-spirit',
    code: 'ANM-02',
    title: 'Oso Grizzly Espíritu de la Montaña',
    category: 'Animals',
    description: 'Silueta de oso con paisaje de bosque y cumbres en doble exposición.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_2fnoso2fnoso2fno.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'animals-crowned-lion',
    code: 'ANM-03',
    title: 'León Imperial Coronado',
    category: 'Animals',
    description: 'Retrato majestuoso de león con melena simétrica y corona real.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_9qux9l9qux9l9qux.jpg'
    ),
    recommendedColorId: 'anodized-gold',
  },
  {
    id: 'animals-royal-stag',
    code: 'ANM-04',
    title: 'Ciervo Real de Astas Florales',
    category: 'Animals',
    description: 'Venado místico con cornamenta botánica y sol naciente.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_a3w5q4a3w5q4a3w5.jpg'
    ),
    recommendedColorId: 'emerald-green',
  },
  {
    id: 'animals-hummingbird-line',
    code: 'ANM-05',
    title: 'Colibrí en Vuelo Arte Lineal',
    category: 'Animals',
    description: 'Trazo continuo delicado simbolizando precisión y ligereza.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_bg5epcbg5epcbg5e.jpg'
    ),
    recommendedColorId: 'cyber-purple',
  },
  {
    id: 'animals-alpha-wolf',
    code: 'ANM-06',
    title: 'Lobo Alfa Poligonal',
    category: 'Animals',
    description: 'Rostro de lobo en geometría facetada de alto contraste.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_mv8a8mmv8a8mmv8a.jpg'
    ),
    recommendedColorId: 'matte-black',
  },
  {
    id: 'animals-pet-lover-paw',
    code: 'ANM-07',
    title: 'Huella Pet Lover Corazón Infinito',
    category: 'Animals',
    description: 'Huella entrelazada con corazón y símbolo de infinito.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_ti7nmpti7nmpti7n.jpg'
    ),
    recommendedColorId: 'ruby-red',
  },
  {
    id: 'animals-soaring-eagle',
    code: 'ANM-08',
    title: 'Águila Real en Vuelo Imperial',
    category: 'Animals',
    description: 'Envergadura desplegada con plumaje detallado para grabado láser.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_viwwtmviwwtmviww.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
  {
    id: 'animals-great-white-shark',
    code: 'ANM-09',
    title: 'Tiburón Blanco Depredador Oceánico',
    category: 'Animals',
    description: 'Mandíbula y silueta dinámica en negativo de alto impacto.',
    imageUrl: catPath(
      'Animals & Spirit Series',
      'Gemini_Generated_Image_x2wftnx2wftnx2wf.jpg'
    ),
    recommendedColorId: 'royal-blue',
  },
];

// Generate full catalog products from all PRESET_DESIGNS (without prices or bur counts)
export const CATALOG_PRODUCTS: ProductItem[] = PRESET_DESIGNS.map(
  (preset, index) => ({
    id: `prod-${preset.id}`,
    code: preset.code,
    name: `Fresero ${preset.title}`,
    series: preset.category,
    defaultColorId: preset.recommendedColorId || 'matte-black',
    presetDesignId: preset.id,
    imageUrl: preset.imageUrl,
    featured: index < 6,
    badge: preset.imageUrl ? `Ref ${preset.code}` : 'Vector CAD',
  })
);
