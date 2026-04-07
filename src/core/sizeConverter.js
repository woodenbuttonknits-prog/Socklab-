// EU ↔ US conversie (dames standaard)

const euToUS = {
  35: 4,
  36: 5,
  37: 6,
  38: 7,
  39: 8,
  40: 9,
  41: 10,
  42: 11,
  43: 12
};

const usToEU = Object.fromEntries(
  Object.entries(euToUS).map(([eu, us]) => [us, Number(eu)])
);

export function convertToEU(size, system = "EU") {
  if (system === "EU") return size;

  return usToEU[size] || 38; // fallback
}

export function getFootCircumference(euSize) {
  // simpele realistische mapping (cm)
  const map = {
    36: 21,
    37: 22,
    38: 23,
    39: 24,
    40: 25,
    41: 26,
    42: 27,
    43: 28
  };

  return map[euSize] || 23;
}