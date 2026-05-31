import calculateEmissions from '../services/CarbonCalculator.js';

describe('calculateEmissions', () => {
  test('calculates emissions for car + food + shopping with eco-friendly reduction', () => {
    const result = calculateEmissions({
      mode: 'car',
      carpool: 'yes',
      noOfPassenger: 2,
      driveFrequency: 'daily',
      dailyDistance: 30,
      energyType: 'mixed',
      electricityBill: 300,
      meatFrequency: '2-3',
      meatLover: 0,
      dairyFrequency: 'daily',
      purchaseCategory: 'small_clothing',
      shoppingFrequency: 'occasionally',
      clothingPurchase: 'frequently',
      ecoFriendly: 'true',
    });

    expect(result.transportEmissions).toBeCloseTo(2.7, 5);
    expect(result.electricityEmissions).toBeCloseTo(4, 5);
    expect(result.foodEmissions).toBeCloseTo(8.85, 5);
    expect(result.shoppingEmissions).toBeCloseTo(9.5, 5);
    expect(result.total).toBeCloseTo(25.05, 5);
  });

  test('calculates emissions for public transport and electronics purchases', () => {
    const result = calculateEmissions({
      mode: 'public',
      dailyDistance: 10,
      energyType: 'renewable',
      electricityBill: 150,
      meatFrequency: 'no',
      dairyFrequency: 'never',
      purchaseCategory: 'electronics',
      electronicsReplacement: 'frequently',
      mediumElectronics: 'occasionally',
      ecoFriendly: 'false',
    });

    expect(result.transportEmissions).toBeCloseTo(0.5, 5);
    expect(result.electricityEmissions).toBeCloseTo(0.25, 5);
    expect(result.foodEmissions).toBe(0);
    expect(result.shoppingEmissions).toBe(180);
    expect(result.total).toBeCloseTo(180.75, 5);
  });

  test('returns zero emissions for unknown or missing inputs', () => {
    const result = calculateEmissions({
      mode: 'walk',
      energyType: 'unknown',
      meatFrequency: 'unknown',
      dairyFrequency: 'unknown',
      purchaseCategory: 'unknown',
    });

    expect(result.transportEmissions).toBe(0);
    expect(result.electricityEmissions).toBe(0);
    expect(result.foodEmissions).toBe(0);
    expect(result.shoppingEmissions).toBe(0);
    expect(result.total).toBe(0);
  });

  test('calculates bike + home goods emissions without eco reduction', () => {
    const result = calculateEmissions({
      mode: 'bike',
      dailyDistance: 25,
      energyType: 'fossil',
      electricityBill: 90,
      meatFrequency: 'few',
      dairyFrequency: 'multiple',
      purchaseCategory: 'home_goods',
      homeFurniture: 'frequently',
      applianceReplacement: '3-5 years',
      ecoFriendly: 'false',
    });

    expect(result.transportEmissions).toBeCloseTo(0.5, 5);
    expect(result.electricityEmissions).toBeCloseTo(1.8, 5);
    expect(result.foodEmissions).toBeCloseTo(7.66, 5);
    expect(result.shoppingEmissions).toBe(460);
    expect(result.total).toBeCloseTo(469.96, 5);
  });

  test('handles invalid shopping key conversion via catch block', () => {
    const throwingKey = {
      [Symbol.toPrimitive]() {
        throw new Error('invalid key conversion');
      },
    };

    const result = calculateEmissions({
      mode: 'car',
      driveFrequency: 'daily',
      dailyDistance: 5,
      purchaseCategory: 'electronics',
      electronicsReplacement: throwingKey,
      mediumElectronics: 'rarely',
      ecoFriendly: 'false',
    });

    expect(result.transportEmissions).toBeCloseTo(0.9, 5);
    expect(result.shoppingEmissions).toBe(0);
    expect(result.total).toBeCloseTo(0.9, 5);
  });

  test('adds extra food emissions for 4+ meat frequency with meatLover value', () => {
    const result = calculateEmissions({
      mode: 'walk',
      meatFrequency: '4+',
      meatLover: 3,
      dairyFrequency: 'few',
      purchaseCategory: 'unknown',
      ecoFriendly: 'false',
    });

    expect(result.transportEmissions).toBe(0);
    expect(result.foodEmissions).toBeCloseTo(14.1, 5);
    expect(result.shoppingEmissions).toBe(0);
    expect(result.total).toBeCloseTo(14.1, 5);
  });
});
