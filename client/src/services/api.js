const FAKESTORE = 'https://fakestoreapi.com';

const UNSPLASH = (id, w = 400) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const RING_IMGS = [
  UNSPLASH('photo-1515562141207-7a88fb7ce338'),
  UNSPLASH('photo-1605100804763-247f67b3557e'),
  UNSPLASH('photo-1602751584552-8cf07e2e3c62'),
  UNSPLASH('photo-1543294001-f7cd5d7fb516'),
  UNSPLASH('photo-1611591437281-460bfbe1220a'),
  UNSPLASH('photo-1605100804820-e5b11d6e8f88'),
];

const NECKLACE_IMGS = [
  UNSPLASH('photo-1573408301185-9519f94816b5'),
  UNSPLASH('photo-1599643477877-530eb83abc8e'),
  UNSPLASH('photo-1610694955371-d4a3e0ce4b52'),
  UNSPLASH('photo-1535632066927-ab7c9ab60908'),
  UNSPLASH('photo-1617038260897-41a1f14a8ca0'),
  UNSPLASH('photo-1629224316810-9d8805b95e76'),
];

const EARRING_IMGS = [
  UNSPLASH('photo-1602173574767-37ac01994b2a'),
  UNSPLASH('photo-1561826879-9d5f93c65cb5'),
  UNSPLASH('photo-1630939569870-0c0dbf32e3f2'),
  UNSPLASH('photo-1622398925373-3f91b1e275f5'),
  UNSPLASH('photo-1588444650733-d0f538d4de7d'),
];

const BRACELET_IMGS = [
  UNSPLASH('photo-1611086566473-63a12e8fe8b4'),
  UNSPLASH('photo-1573408301233-fc3dc3fcbf26'),
  UNSPLASH('photo-1584917865442-de89df76afd3'),
  UNSPLASH('photo-1626784215021-2e39ccf971cd'),
  UNSPLASH('photo-1635797255620-8e8b8ffbf08a'),
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rating = (rate, count) => ({ rate, count });

const MOCK_JEWELS = [
  { id: 101, title: 'Classic Solitaire Diamond Ring', price: 299.99, category: 'rings', image: RING_IMGS[0], rating: rating(4.8, 312), description: 'A timeless solitaire diamond set in 18k white gold. Perfect for engagements or everyday elegance.' },
  { id: 102, title: 'Rose Gold Twisted Band Ring', price: 189.00, category: 'rings', image: RING_IMGS[1], rating: rating(4.6, 198), description: 'Delicately twisted rose gold band that catches the light beautifully. Comfortable everyday wear.' },
  { id: 103, title: 'Vintage Sapphire Halo Ring', price: 459.99, category: 'rings', image: RING_IMGS[2], rating: rating(4.9, 87), description: 'Genuine Ceylon sapphire surrounded by a halo of pave diamonds in vintage-inspired yellow gold.' },
  { id: 104, title: 'Stackable Eternity Band', price: 129.00, category: 'rings', image: RING_IMGS[3], rating: rating(4.7, 256), description: 'Seamlessly set diamonds all the way around. Stack multiple bands for a personalized look.' },
  { id: 105, title: 'Emerald Cut Statement Ring', price: 549.00, category: 'rings', image: RING_IMGS[4], rating: rating(4.5, 74), description: 'Bold emerald-cut center stone flanked by baguette side stones. A true show-stopper.' },
  { id: 106, title: 'Pearl Cluster Cocktail Ring', price: 219.00, category: 'rings', image: RING_IMGS[5], rating: rating(4.4, 143), description: 'Fresh-water pearls arranged in a luxurious cluster with gold prong setting.' },
  { id: 107, title: 'Minimalist Gold Band', price: 79.00, category: 'rings', image: RING_IMGS[0], rating: rating(4.3, 421), description: 'Simple, refined 14k gold band. The perfect everyday ring.' },
  { id: 108, title: 'Oval Moissanite Engagement Ring', price: 389.00, category: 'rings', image: RING_IMGS[1], rating: rating(4.9, 211), description: 'Oval-cut moissanite with exceptional brilliance, set in a cathedral style prong setting.' },
  { id: 109, title: 'Art Deco Filigree Ring', price: 269.00, category: 'rings', image: RING_IMGS[2], rating: rating(4.7, 95), description: 'Intricate filigree work inspired by the Art Deco era. One-of-a-kind craftsmanship.' },
  { id: 110, title: 'Bold Geometric Gold Ring', price: 159.00, category: 'rings', image: RING_IMGS[3], rating: rating(4.2, 167), description: 'Architectural geometric shape in polished 18k gold. A modern statement piece.' },
  { id: 111, title: 'Diamond Chevron Ring', price: 199.00, category: 'rings', image: RING_IMGS[4], rating: rating(4.6, 289), description: 'V-shaped chevron ring with channel-set diamonds. Perfect for stacking.' },
  { id: 112, title: 'Ruby Bezel-Set Ring', price: 349.00, category: 'rings', image: RING_IMGS[5], rating: rating(4.8, 134), description: 'Natural ruby secured in a sleek bezel setting on a polished yellow gold shank.' },
  { id: 113, title: 'Three-Stone Anniversary Ring', price: 479.00, category: 'rings', image: RING_IMGS[0], rating: rating(4.9, 61), description: 'Past, present, future symbolized in three brilliant stones in a platinum trellis setting.' },
  { id: 114, title: 'Celtic Knot Silver Ring', price: 69.00, category: 'rings', image: RING_IMGS[1], rating: rating(4.4, 388), description: 'Hand-engraved Celtic knot pattern in solid sterling silver. Hallmarked authentic.' },
  { id: 201, title: 'Diamond Tennis Necklace', price: 699.00, category: 'necklaces', image: NECKLACE_IMGS[0], rating: rating(4.9, 201), description: 'Row of brilliant-cut diamonds set in gleaming white gold. A red-carpet worthy classic.' },
  { id: 202, title: 'Gold Lariat Drop Necklace', price: 229.00, category: 'necklaces', image: NECKLACE_IMGS[1], rating: rating(4.7, 312), description: 'Versatile lariat style that adjusts to any length. Can be worn multiple ways.' },
  { id: 203, title: 'Pearl Strand Choker', price: 179.00, category: 'necklaces', image: NECKLACE_IMGS[2], rating: rating(4.5, 175), description: 'Cultured akoya pearl strand with a sterling silver-and-gold clasp. Timeless pearl elegance.' },
  { id: 204, title: 'Infinity Pendant Necklace', price: 149.00, category: 'necklaces', image: NECKLACE_IMGS[3], rating: rating(4.6, 284), description: 'Interlocking infinity symbol in 14k gold on a delicate cable chain.' },
  { id: 205, title: 'Moonstone Bar Necklace', price: 119.00, category: 'necklaces', image: NECKLACE_IMGS[4], rating: rating(4.4, 198), description: 'Horizontal bar set with a glowing natural moonstone. Minimal and mystical.' },
  { id: 206, title: 'Layered Chain Statement Necklace', price: 259.00, category: 'necklaces', image: NECKLACE_IMGS[5], rating: rating(4.8, 143), description: 'Three interlocking chains of varying thickness create an effortless layered look.' },
  { id: 207, title: 'Emerald Drops Necklace', price: 399.00, category: 'necklaces', image: NECKLACE_IMGS[0], rating: rating(4.7, 87), description: 'Colombian emerald drops suspended from a delicate yellow gold chain.' },
  { id: 208, title: 'Wishbone Gold Necklace', price: 139.00, category: 'necklaces', image: NECKLACE_IMGS[1], rating: rating(4.5, 264), description: 'Dainty wishbone pendant, a symbol of luck and love, in solid 14k gold.' },
  { id: 209, title: 'Butterfly Charm Necklace', price: 109.00, category: 'necklaces', image: NECKLACE_IMGS[2], rating: rating(4.3, 342), description: 'Detailed butterfly charm in sterling silver with rose gold plating on wings.' },
  { id: 210, title: 'Pavé Diamond Cross Necklace', price: 319.00, category: 'necklaces', image: NECKLACE_IMGS[3], rating: rating(4.9, 121), description: 'Cross pendant completely encrusted with micro-pave diamonds. A gift of faith.' },
  { id: 211, title: 'Shell and Pearl Pendant', price: 99.00, category: 'necklaces', image: NECKLACE_IMGS[4], rating: rating(4.2, 276), description: 'Natural mother-of-pearl shell with a freshwater pearl drop. Pure coastal elegance.' },
  { id: 212, title: 'Bezel Diamond Solitaire Necklace', price: 449.00, category: 'necklaces', image: NECKLACE_IMGS[5], rating: rating(4.9, 94), description: 'Single brilliant-cut diamond in a sleek bezel setting on an ultra-fine yellow gold chain.' },
  { id: 213, title: 'Celestial Star Choker', price: 159.00, category: 'necklaces', image: NECKLACE_IMGS[0], rating: rating(4.6, 213), description: 'Scattered star motifs set with tiny diamonds on a fine choker chain.' },
  { id: 214, title: 'Knot Pendant Necklace', price: 189.00, category: 'necklaces', image: NECKLACE_IMGS[1], rating: rating(4.7, 167), description: 'Sculptural knot pendant in two-tone gold — white and yellow, beautifully interlaced.' },
  { id: 301, title: 'Diamond Huggie Hoops', price: 249.00, category: 'earrings', image: EARRING_IMGS[0], rating: rating(4.8, 312), description: 'Pavé-set diamond huggie hoops that sit close to the ear. All-day comfortable.' },
  { id: 302, title: 'Gold Teardrop Earrings', price: 139.00, category: 'earrings', image: EARRING_IMGS[1], rating: rating(4.6, 224), description: 'Slender teardrop shaped earrings in brushed 14k yellow gold. Elegant simplicity.' },
  { id: 303, title: 'South Sea Pearl Studs', price: 329.00, category: 'earrings', image: EARRING_IMGS[2], rating: rating(4.9, 156), description: 'Lustrous South Sea pearls in a classic 4-prong yellow gold setting. Heirloom quality.' },
  { id: 304, title: 'Geometric Threader Earrings', price: 89.00, category: 'earrings', image: EARRING_IMGS[3], rating: rating(4.3, 289), description: 'Sterling silver bar threads through the ear for a modern architectural look.' },
  { id: 305, title: 'Ruby and Diamond Chandelier Earrings', price: 579.00, category: 'earrings', image: EARRING_IMGS[4], rating: rating(4.9, 48), description: 'Cascading chandelier design with natural rubies and diamonds. Red-carpet glamour.' },
  { id: 306, title: 'Twisted Gold Hoop Earrings', price: 115.00, category: 'earrings', image: EARRING_IMGS[0], rating: rating(4.5, 367), description: 'Classic twisted rope hoops in polished 14k gold. Perfect everyday accessory.' },
  { id: 307, title: 'Turquoise Drop Earrings', price: 129.00, category: 'earrings', image: EARRING_IMGS[1], rating: rating(4.4, 198), description: 'Natural turquoise drops on delicate gold chains. A vibrant pop of color.' },
  { id: 308, title: 'Cascading Pearl Drop Earrings', price: 199.00, category: 'earrings', image: EARRING_IMGS[2], rating: rating(4.7, 134), description: 'Three freshwater pearls of graduating size cascade from a gold stud.' },
  { id: 309, title: 'Diamond Ear Climbers', price: 289.00, category: 'earrings', image: EARRING_IMGS[3], rating: rating(4.8, 89), description: 'Curved ear climbers trace the ear contour with pavé-set diamonds. Architectural and bold.' },
  { id: 310, title: 'Gold Leaf Stud Earrings', price: 79.00, category: 'earrings', image: EARRING_IMGS[4], rating: rating(4.4, 221), description: 'Hand-crafted leaf-shaped studs in 18k gold. Delicate detail for everyday wear.' },
  { id: 311, title: 'Sapphire and Diamond Drop Earrings', price: 449.00, category: 'earrings', image: EARRING_IMGS[0], rating: rating(4.9, 67), description: 'Oval blue sapphires with diamond accents in a graceful drop setting.' },
  { id: 312, title: 'Bohemian Tassel Earrings', price: 69.00, category: 'earrings', image: EARRING_IMGS[1], rating: rating(4.2, 304), description: 'Gold tassel earrings with a playful movement. Perfect for festival or casual wear.' },
  { id: 401, title: 'Diamond Tennis Bracelet', price: 799.00, category: 'bracelets', image: BRACELET_IMGS[0], rating: rating(4.9, 187), description: 'A full line of brilliant-cut diamonds set in 18k white gold. The essence of luxury.' },
  { id: 402, title: 'Gold Herringbone Bracelet', price: 239.00, category: 'bracelets', image: BRACELET_IMGS[1], rating: rating(4.7, 213), description: 'Flat herringbone weave in 14k yellow gold. A vintage silhouette reimagined.' },
  { id: 403, title: 'Pearl and Gold Link Bracelet', price: 289.00, category: 'bracelets', image: BRACELET_IMGS[2], rating: rating(4.6, 134), description: 'Alternating freshwater pearl and gold oval link bracelet with a lobster-claw clasp.' },
  { id: 404, title: 'Thin Gold Bangle Set', price: 149.00, category: 'bracelets', image: BRACELET_IMGS[3], rating: rating(4.5, 342), description: 'Set of three ultra-thin 14k gold bangles. Mix, match, layer — endlessly versatile.' },
  { id: 405, title: 'Charm Bracelet – Journey Collection', price: 199.00, category: 'bracelets', image: BRACELET_IMGS[4], rating: rating(4.8, 267), description: 'Sterling silver link bracelet with four meaningful charms. Customizable and sentimental.' },
  { id: 406, title: 'Rope Twist Gold Bracelet', price: 179.00, category: 'bracelets', image: BRACELET_IMGS[0], rating: rating(4.6, 178), description: 'Two interwoven gold strands creating a rope texture. Classic Italian craftsmanship.' },
  { id: 407, title: 'Pavé Diamond Cuff', price: 549.00, category: 'bracelets', image: BRACELET_IMGS[1], rating: rating(4.9, 79), description: 'Half-cuff with continuous pavé-set diamonds. Statement elegance made effortless.' },
  { id: 408, title: 'Beaded Gemstone Bracelet', price: 119.00, category: 'bracelets', image: BRACELET_IMGS[2], rating: rating(4.4, 289), description: 'Natural amethyst and rose quartz beads on a gold-filled elastic cord.' },
  { id: 409, title: 'Byzantine Chain Bracelet', price: 259.00, category: 'bracelets', image: BRACELET_IMGS[3], rating: rating(4.7, 112), description: 'Intricate Byzantine chain link pattern in two-tone gold. A work of art on your wrist.' },
  { id: 410, title: 'Adjustable Cord Friendship Bracelet', price: 49.00, category: 'bracelets', image: BRACELET_IMGS[4], rating: rating(4.3, 567), description: 'Woven cord bracelet with a dainty gold sun charm. Perfect gift for best friends.' },
  { id: 501, title: 'Sapphire Hair Pin', price: 89.00, category: 'accessories', image: UNSPLASH('photo-1617038260897-41a1f14a8ca0'), rating: rating(4.5, 143), description: 'Gold hair pin topped with a natural sapphire cabochon. Effortlessly elegant.' },
  { id: 502, title: 'Art Nouveau Brooch', price: 149.00, category: 'accessories', image: UNSPLASH('photo-1629224316810-9d8805b95e76'), rating: rating(4.6, 87), description: 'Enamel and gold brooch in Art Nouveau floral style. Collectible wearable art.' },
  { id: 503, title: 'Diamond Watch Bezel', price: 1299.00, category: 'accessories', image: UNSPLASH('photo-1490367532201-b9bc1dc483f6'), rating: rating(4.9, 45), description: 'Swiss movement watch with a genuine diamond-set bezel in 316L stainless steel.' },
  { id: 504, title: 'Gemstone Anklet', price: 79.00, category: 'accessories', image: UNSPLASH('photo-1609840114035-3c981b782dfe'), rating: rating(4.3, 234), description: 'Delicate gold chain anklet with alternating amethyst and citrine stones.' },
  { id: 505, title: 'Pearl Hair Comb', price: 109.00, category: 'accessories', image: UNSPLASH('photo-1617038260897-41a1f14a8ca0'), rating: rating(4.6, 98), description: 'Vintage-style pearl hair comb in silver-plated filigree. Bridal-ready beauty.' },
  { id: 506, title: 'Gold Waist Chain', price: 129.00, category: 'accessories', image: rand(BRACELET_IMGS), rating: rating(4.4, 176), description: 'Adjustable body chain in 14k gold-plated brass. Resort and beach-ready.' },
  { id: 601, title: 'Classic Pearl Set – Necklace and Earrings', price: 349.00, category: 'sets', image: NECKLACE_IMGS[2], rating: rating(4.8, 198), description: 'Matching cultured pearl necklace and stud earrings in sterling silver.' },
  { id: 602, title: 'Diamond Bridal Suite', price: 1899.00, category: 'sets', image: RING_IMGS[0], rating: rating(4.9, 37), description: 'Magnificent bridal set: engagement ring, wedding band, and diamond stud earrings. Complete elegance.' },
  { id: 603, title: 'Rose Gold Trio Set', price: 459.00, category: 'sets', image: RING_IMGS[1], rating: rating(4.7, 124), description: 'Rose gold ring, necklace, and bracelet with matching floral motifs. Gift-packaged.' },
  { id: 604, title: 'Sapphire Elegance Set', price: 699.00, category: 'sets', image: EARRING_IMGS[0], rating: rating(4.8, 89), description: 'Sapphire and white gold pendant, earrings, and ring. A complete matched suite.' },
  { id: 605, title: 'Gold Hoop and Chain Set', price: 249.00, category: 'sets', image: NECKLACE_IMGS[3], rating: rating(4.6, 213), description: 'Medium gold hoop earrings paired with a matching curb-link chain necklace.' },
  { id: 606, title: 'Sterling Silver Midi Set', price: 159.00, category: 'sets', image: BRACELET_IMGS[2], rating: rating(4.5, 267), description: 'Five-piece sterling silver set for a minimalist, cohesive look: ring, 2 bangles, necklace, and stud.' },
];

export async function fetchJewelry() {
  try {
    const res = await fetch(`${FAKESTORE}/products?limit=20`);
    if (!res.ok) throw new Error(`FakeStore error (HTTP ${res.status})`);
    const fakeItems = await res.json();
    return [...MOCK_JEWELS, ...fakeItems];
  } catch {
    return [...MOCK_JEWELS];
  }
}

export async function fetchProductById(id) {
  const mockItem = MOCK_JEWELS.find((p) => p.id === Number(id));
  if (mockItem) return mockItem;

  const res = await fetch(`${FAKESTORE}/products/${id}`);
  if (!res.ok) throw new Error(`Product not found (HTTP ${res.status})`);
  return res.json();
}

const TOKEN_KEY = 'sellora_token';
const USER_KEY  = 'sellora_user';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
}

export async function loginUser({ username, password }) {
  const res = await fetch(`${FAKESTORE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Login failed (HTTP ${res.status})`);
  }
  const data = await res.json();
  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify({ username }));
  }
  return data;
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
