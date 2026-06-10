export interface Listing {
  id: string;
  title: string;
  price: number;
  category: string;
  location: string;
  condition: string;
  image: string;
  description: string[];
  sellerName: string;
  sellerLocation: string;
  sellerJoined: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export const categories = [
  "Crafting",
  "Yarn & Fiber",
  "Tech/Electronics",
  "Woodworking",
  "Pottery",
];

export const locations = ["St. Pete", "Clearwater", "Largo"];

export const listings: Listing[] = [
  {
    id: "1",
    title: "Complete Stained Glass Setup with Grinder",
    price: 185,
    category: "Crafting",
    location: "Kenwood, St. Pete",
    condition: "Used – Good",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=400&fit=crop",
    description: [
      "Inland Wizling CG grinder with diamond bits – barely used",
      "50+ sheets of assorted colored glass (12x12 and scraps)",
      "Copper foil tape in 3 widths (3/16, 7/32, 1/4 inch)",
      "Soldering iron with temperature control + 1lb lead-free solder",
      "Glass cutter, breaking pliers, and running pliers included",
      "Pattern books × 4 (beginner to intermediate)",
      "Safety glasses and cutting oil",
    ],
    sellerName: "Riley K.",
    sellerLocation: "Kenwood, St. Pete",
    sellerJoined: "March 2024",
  },
  {
    id: "2",
    title: "Full Tufting Kit with Frame and Yarn Pile",
    price: 220,
    category: "Yarn & Fiber",
    location: "Gulfport, St. Pete",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1591522810855-87728c2ad4be?w=600&h=400&fit=crop",
    description: [
      "AK-1 Cut Pile Tufting Gun (less than 20 hours of use)",
      "Custom 4x4ft wooden tufting frame with carpet tack strips",
      "65+ skeins of acrylic yarn in 30+ colors",
      "10 yards of primary tufting cloth (monk's cloth)",
      "Adhesive (Roberts 6700) – 2 full gallons",
      "Tufting scissors, shear trimmers, and edge trimmer",
      "Projector compatible – frame marked for alignment",
    ],
    sellerName: "Sam M.",
    sellerLocation: "Gulfport, St. Pete",
    sellerJoined: "January 2024",
  },
  {
    id: "3",
    title: "Vintage Sewing Machine + 40+ Patterns",
    price: 95,
    category: "Yarn & Fiber",
    location: "Old Northeast, St. Pete",
    condition: "Used – Fair",
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=600&h=400&fit=crop",
    description: [
      "Singer 401A Slant-O-Matic (1950s – fully mechanical, runs great)",
      "Original metal carrying case with all attachments",
      "40+ vintage and modern sewing patterns (sizes 4–16)",
      "Assorted thread spools (40+ colors)",
      "Rotary cutter, mat (18x24), and quilting rulers",
      "Pins, needles, seam ripper, and measuring tape",
      "Beginner's sewing guide included",
    ],
    sellerName: "Jordan T.",
    sellerLocation: "Old Northeast, St. Pete",
    sellerJoined: "November 2023",
  },
  {
    id: "4",
    title: "Electronics Workbench Bundle (Oscilloscope, Soldering, Parts)",
    price: 310,
    category: "Tech/Electronics",
    location: "Crescent Heights, St. Pete",
    condition: "Used – Good",
    image: "https://images.unsplash.com/photo-1517077392495-1c21fc1f4a7e?w=600&h=400&fit=crop",
    description: [
      "Rigol DS1054Z 4-channel digital oscilloscope",
      "Weller WE1010 soldering station with extra tips",
      "Full set of helping hands with magnifying glass",
      "500+ assorted resistors, capacitors, diodes, and LEDs",
      "Arduino Mega + Uno starter kits with breadboards",
      "Raspberry Pi 4 (4GB) with case and power supply",
      "Third-hand PCB vice and desoldering wick",
    ],
    sellerName: "Avery D.",
    sellerLocation: "Crescent Heights, St. Pete",
    sellerJoined: "June 2024",
  },
  {
    id: "5",
    title: "Pottery Wheel & Kiln Starter Package",
    price: 275,
    category: "Pottery",
    location: "Historic Uptown, St. Pete",
    condition: "Used – Good",
    image: "https://images.unsplash.com/photo-1565193566173-7a0bb3ffd0fe?w=600&h=400&fit=crop",
    description: [
      "Speedball Clay Boss tabletop pottery wheel",
      "Skutt 818 kiln (cone 10, 120V – plugs into standard outlet)",
      "50lbs of stoneware clay (cone 6, assorted colors)",
      "Complete set of clay tools (ribs, wires, sponges, needle tool)",
      "2 dozen bisqueware pieces ready to glaze",
      "4 pints of assorted glazes (Amaco Celadons)",
      "Bat kit with 6 plastic bats and bat pins",
    ],
    sellerName: "Casey L.",
    sellerLocation: "Historic Uptown, St. Pete",
    sellerJoined: "February 2024",
  },
  {
    id: "6",
    title: "Woodworking Carver's Delight (Chisels, Dremel, Basswood)",
    price: 140,
    category: "Woodworking",
    location: "Kenwood, St. Pete",
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&h=400&fit=crop",
    description: [
      "Chisel set (12-piece Pfeil, Swiss-made – barely used)",
      "Dremel 4300 with flex shaft attachment and 40+ bits",
      "10 basswood carving blocks (4x4x2 and larger)",
      "Dust collector (Wen 3410) with hoses",
      "Carving mallet, whittling knife, and hook knife",
      "Strop block with polishing compound",
      "Safety glove (cut-resistant) and dust mask",
    ],
    sellerName: "Riley K.",
    sellerLocation: "Kenwood, St. Pete",
    sellerJoined: "March 2024",
  },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Grand Central District Swap Meet",
    date: "October 14, 2024",
    time: "10:00 AM – 3:00 PM",
    location: "Grand Central District, St. Pete",
    description:
      "Bring your abandoned hobby bundles and unfinished projects to swap with fellow neurodivergent makers. Tables, coffee, and stim toys provided. All skill levels welcome — unfinished is perfect!",
  },
  {
    id: "2",
    title: "Warehouse Arts District Open Alpha Testing",
    date: "November 2, 2024",
    time: "12:00 PM – 5:00 PM",
    location: "Warehouse Arts District, St. Pete",
    description:
      "An afternoon of low-pressure demoing and playtesting. Bring your latest hyperfixation project — or just come poke at other people's. Noise-cancelling headphones and quiet corner available.",
  },
  {
    id: "3",
    title: "Neurodivergent Makers Meetup",
    date: "November 16, 2024",
    time: "2:00 PM – 4:30 PM",
    location: "The Studio@620, St. Pete",
    description:
      "A social making session focused on parallel play. Bring your own project or grab a mystery bundle from our free table. Strictly no small talk — info cards with conversation prompts optional.",
  },
  {
    id: "4",
    title: "St. Pete Craft Swap & Social",
    date: "December 7, 2024",
    time: "11:00 AM – 2:00 PM",
    location: "Sunken Gardens Event Space, St. Pete",
    description:
      "Seasonal swap meet for craft supplies, tools, and complete hobby bundles. Sensory-friendly hours (10–11 AM). Weighted lap blankets and fidget tools available at the welcome table.",
  },
];