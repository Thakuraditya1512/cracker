// Static catalogue for the temporary cracker shop.
// Every product is stored here (no server). Photos and orders live in localStorage.

export const PRODUCTS = [
  { id: 1,  name: "3.5 Laksmi Bomb -small Lakshmi", unit: "set-",          packQty: 10,   price: 300,  category: "Regular" },
  { id: 2,  name: "4in Lakshmi -Medium",            unit: "set -",         packQty: 10,   price: 400,  category: "Regular" },
  { id: 3,  name: "4 Lakshmi Dlx-BIG",              unit: "set -",         packQty: 10,   price: 650,  category: "Regular" },
  { id: 4,  name: "lakshmi gold",                   unit: "set",           packQty: 5,    price: 350,  category: "Regular" },
  { id: 5,  name: "bird -pitta bomb",               unit: "set-",          packQty: 25,   price: 550,  category: "Regular" },
  { id: 6,  name: "28 wala Ladi",                   unit: "set-",          packQty: 50,   price: 1250, category: "Regular" },
  { id: 7,  name: "Saddam- Bomb",                   unit: "1 box",         packQty: null, price: 180,  category: "Regular" },
  { id: 8,  name: "double cat -AB",                 unit: "1box -",        packQty: null, price: 400,  category: "Regular" },
  { id: 9,  name: "big - Autom bomb -AB",           unit: "1box",          packQty: null, price: 600,  category: "Regular" },
  { id: 10, name: "Tim Tim",                        unit: "1-box-",        packQty: null, price: 130,  category: "Regular" },
  { id: 11, name: "Flower pot -bit-FP",             unit: "1-box",         packQty: null, price: 170,  category: "Regular" },
  { id: 12, name: "flower pot -Asoka-FP",           unit: "1-box",         packQty: null, price: 250,  category: "Regular" },
  { id: 13, name: "Colour Koti -FP",                unit: "1-box -",       packQty: null, price: 400,  category: "Regular" },
  { id: 14, name: "Colour koti delux-FP",           unit: "1-box -",       packQty: null, price: 600,  category: "Regular" },
  { id: 15, name: "Mega Deluxe Super -FP",          unit: "1-box",         packQty: null, price: 900,  category: "Regular" },
  { id: 16, name: "rocket bomb",                    unit: "1 box -",       packQty: null, price: 180,  category: "Regular" },
  { id: 17, name: "2 sound Bomb rocket",            unit: "1 box -",       packQty: null, price: 350,  category: "Regular" },
  { id: 18, name: "wistile rocket",                 unit: "1 box",         packQty: null, price: 500,  category: "Regular" },
  { id: 19, name: "penche -10 cm",                  unit: "1 box-",        packQty: null, price: 180,  category: "Regular" },
  { id: 20, name: "4 twinke",                       unit: "1-box",         packQty: null, price: 180,  category: "Regular" },
  { id: 21, name: "12 cm electric sparcle-small -SP",unit: "1-box",        packQty: null, price: 80,   category: "Regular" },
  { id: 22, name: "12 sparcle-SP",                  unit: "1-box",         packQty: null, price: 90,   category: "Regular" },
  { id: 23, name: "15 cm electric sparcle -sp",     unit: "1-box",         packQty: null, price: 150,  category: "Regular" },
  { id: 24, name: "15cm normal sada -sp",           unit: "1-box",         packQty: null, price: 180,  category: "Regular" },
  { id: 25, name: "30 cm electric -sp",             unit: "1-box",         packQty: null, price: 200,  category: "Regular" },
  { id: 26, name: "30 Sada -sp",                    unit: "1-box",         packQty: null, price: 210,  category: "Regular" },
  { id: 27, name: "Lakshmi Bomb Large",             unit: "1 set",         packQty: 10,   price: 750,  category: "Regular" },
  { id: 28, name: "100 wala",                       unit: "1-pack",        packQty: 1,    price: 280,  category: "Regular" },
  { id: 29, name: "CHUT PHUT",                      unit: "1 box",         packQty: null, price: 100,  category: "Regular" },
  { id: 30, name: "ground chakra special",          unit: "1-box",         packQty: null, price: 180,  category: "Regular" },
  { id: 31, name: "ground chakara DLX",             unit: "1-box",         packQty: null, price: 250,  category: "Regular" },
  { id: 32, name: "15 shots",                       unit: "1 box",         packQty: null, price: 550,  category: "Regular" },
  { id: 33, name: "30 shots",                       unit: "1 box",         packQty: null, price: 800,  category: "Regular" },
  { id: 34, name: "60 shots",                       unit: "1 box",         packQty: null, price: 1400, category: "Regular" },
  { id: 35, name: "120 shots",                      unit: "1-box",         packQty: null, price: 2500, category: "Regular" },
  { id: 36, name: "240 shots",                      unit: "1 box",         packQty: null, price: 5000, category: "Regular" },
  { id: 37, name: "1 thousand wala",                unit: "1 box",         packQty: null, price: 500,  category: "Regular" },
  { id: 38, name: "2 thousand wala",                unit: "1 box",         packQty: null, price: 800,  category: "Regular" },
  { id: 39, name: "5 thousand wala",                unit: "1 box",         packQty: null, price: 1700, category: "Regular" },
  { id: 40, name: "10 thousand wala",               unit: "1 box",         packQty: null, price: 5000, category: "Regular" },
  { id: 41, name: "100 wala strip",                 unit: "1 strip",       packQty: null, price: 150,  category: "Regular" },
  { id: 42, name: "mirchi pataki",                  unit: "1 pack",        packQty: null, price: 60,   category: "Regular" },
  { id: 43, name: "pop pop 1",                      unit: "1 box small",   packQty: null, price: 10,   category: "Regular" },
  { id: 44, name: "pop pop pack-50",                unit: "1 box pack -",  packQty: null, price: 500,  category: "Regular" },
  { id: 45, name: "BD bomb -match box",             unit: "1 box",         packQty: null, price: 20,   category: "Regular" },
  { id: 46, name: "BD bomb -match box pack",        unit: "1-box",         packQty: null, price: 200,  category: "Regular" },
  { id: 47, name: "7 short",                        unit: "1 box",         packQty: null, price: 250,  category: "Fancy" },
  { id: 48, name: "spiller club -shorts",           unit: "1 box",         packQty: null, price: 400,  category: "Fancy" },
  { id: 49, name: "spinner world - spillers",       unit: "1 box",         packQty: null, price: 400,  category: "Fancy" },
  { id: 50, name: "starwin",                        unit: "1 box",         packQty: null, price: 600,  category: "Fancy" },
  { id: 51, name: "lotto",                          unit: "1 box",         packQty: null, price: 500,  category: "Fancy" },
  { id: 52, name: "snake bit",                      unit: "1 box",         packQty: null, price: 100,  category: "Fancy" },
  { id: 53, name: "Zamin delux chakkar",            unit: "1 box",         packQty: null, price: 400,  category: "Fancy" },
  { id: 54, name: "diet coke",                      unit: "1box",          packQty: null, price: 250,  category: "Fancy" },
  { id: 55, name: "Rain bow FB",                    unit: "1 box",         packQty: null, price: 500,  category: "Fancy" },
  { id: 56, name: "POP POP",                        unit: "1 box",         packQty: null, price: 400,  category: "Fancy" },
  { id: 57, name: "holi -FP",                       unit: "1 box",         packQty: null, price: 350,  category: "Fancy" },
  { id: 58, name: "seven wonders",                  unit: "1 box",         packQty: null, price: 400,  category: "Fancy" },
  { id: 59, name: "long way",                       unit: "1 box",         packQty: null, price: 600,  category: "Fancy" },
  { id: 60, name: "TAISHO 2 in 1 -NSV",             unit: "1 box",         packQty: null, price: 1500, category: "Fancy" },
  { id: 61, name: "incredables",                    unit: "1 box",         packQty: null, price: 600,  category: "Fancy" },
  { id: 62, name: "butter fly",                     unit: "1 box",         packQty: null, price: 300,  category: "Fancy" },
  { id: 63, name: "12 shoter rider",                unit: "1 box",         packQty: null, price: 400,  category: "Fancy" },
  { id: 64, name: "i5",                             unit: "1 box",         packQty: null, price: 800,  category: "Fancy" },
  { id: 65, name: "1 in shot",                      unit: "1 shot",        packQty: null, price: 100,  category: "Fancy" },
  { id: 66, name: "mojo",                           unit: "1 box",         packQty: null, price: 350,  category: "Fancy" },
  { id: 67, name: "Dora",                           unit: "1 box",         packQty: null, price: 350,  category: "Fancy" },
  { id: 68, name: "photo flash",                    unit: "1 box",         packQty: null, price: 200,  category: "Fancy" },
  { id: 69, name: "isona",                          unit: "1 box",         packQty: null, price: 350,  category: "Fancy" },
  { id: 70, name: "magic mushroom",                 unit: "1 box",         packQty: null, price: 350,  category: "Fancy" },
  { id: 71, name: "paper UTSAV 9",                  unit: "1 box",         packQty: null, price: 500,  category: "Fancy" },
  { id: 72, name: "drone",                          unit: "1 box",         packQty: null, price: 300,  category: "Fancy" },
  { id: 73, name: "Dancing peacock - big",          unit: "1 box",         packQty: null, price: 900,  category: "Fancy" },
  { id: 74, name: "Titan Drops",                    unit: "1 box",         packQty: null, price: 300,  category: "Fancy" },
  { id: 75, name: "small peacock",                  unit: "1 box",         packQty: null, price: 300,  category: "Fancy" },
  { id: 76, name: "big sky shorts",                 unit: "1 box",         packQty: null, price: 2000, category: "Fancy" },
  { id: 77, name: "gun",                            unit: "1 gun",         packQty: null, price: 80,   category: "Fancy" },
  { id: 78, name: "gun small",                      unit: "1 gun",         packQty: null, price: 50,   category: "Fancy" },
];

// localStorage helpers (safe against corrupt / missing values).
export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Indian Rupee formatter.
export const fmtINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(n || 0);
