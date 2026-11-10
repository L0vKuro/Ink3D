// Server-side price list. A cart item is only accepted if its name AND price
// match one of the entries below. WHEN YOU ADD A NEW PRODUCT OR CHANGE A PRICE
// ON THE SITE, UPDATE THIS LIST TOO or checkout will reject it.
const ALLOWED = {
  "KEYCHAIN": ["5.00", "12.99"],
  "LIGHTBOX": ["40.00", "49.99"],
  "COASTER SET OF 4": ["15.00"],
  "COASTER": ["9.99"],
  "CUBAN NECKLACE": ["35.00", "59.99"],
  "CUBAN HYPE CHAIN": ["34.99"],
  "WALL ART": ["20.00", "39.99"],
  "FIDGET TOY": ["8.00"],
  "CAN LID": ["4.00"],
  "CONTROLLER STAND ( COLOR CAN VARY )": ["25.00"],
   "CLOCK": ["40.00"],
};

const cents = (s) => Math.round(parseFloat(String(s).replace("$", "")) * 100);

export function validateItems(items) {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return { ok: false, error: "Cart is empty." };
  }
  for (const item of items) {
    const allowed = ALLOWED[String(item && item.name)];
    const qty = Number(item && item.qty);
    if (!allowed || !Number.isInteger(qty) || qty < 1 || qty > 50) {
      return { ok: false, error: "Invalid cart item." };
    }
    const price = cents(item.price);
    if (!allowed.some((p) => cents(p) === price)) {
      return { ok: false, error: "Item price changed. Please refresh and try again." };
    }
  }
  return { ok: true };
}
