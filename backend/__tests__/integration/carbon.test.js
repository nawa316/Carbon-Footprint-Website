import { jest } from '@jest/globals';

// Mock authMiddleware to always allow requests and set req.user
jest.unstable_mockModule('../../middleware/authMiddleware.js', () => ({
  default: (req, res, next) => {
    req.user = { id: 'test-user-id' };
    next();
  },
}));

// Mock mongoose connect and model compiling
jest.unstable_mockModule('mongoose', () => {
  const actual = jest.requireActual('mongoose');
  actual.connect = jest.fn().mockResolvedValue(true);
  return {
    default: actual,
    ...actual,
  };
});

// Dynamically import everything after mocks are registered
const { default: request } = await import('supertest');
const { default: express } = await import('express');
const { default: Footprint } = await import('../../models/Footprint.js');
const { default: carbonRoute } = await import('../../routes/carbonRoute.js');

const app = express();
app.use(express.json());
app.use('/api/carbon', carbonRoute);

describe('Carbon Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/carbon/calculate', () => {
    const defaultPayload = {
      transport: {
        mode: 'car',
        dailyDistance: 20,
        carpool: 'no',
        noOfPassenger: 1,
        driveFrequency: 'daily',
      },
      energy: { energyType: 'fossil', electricityBill: 150 },
      food: { meatFrequency: '2-3', dairyFrequency: 'daily' },
      shopping: {
        purchaseCategory: 'small_clothing',
        shoppingFrequency: 'frequently',
        clothingPurchase: 'frequently',
      },
    };

    test('returns totalEmission > 0, breakdown, grade, non-negative points', async () => {
      const res = await request(app).post('/api/carbon/calculate').send(defaultPayload);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.totalEmission).toBeGreaterThan(0);
      expect(res.body.breakdown).toEqual(
        expect.objectContaining({
          food: expect.any(Number),
          transport: expect.any(Number),
          shopping: expect.any(Number),
          electricity: expect.any(Number),
        })
      );
      expect(['A', 'B', 'C', 'D', 'E', 'F']).toContain(res.body.grade);
      expect(res.body.points).toBeGreaterThanOrEqual(0);
    });

    test('rejects negative km/kWh values (400)', async () => {
      const badPayload = {
        ...defaultPayload,
        transport: { ...defaultPayload.transport, dailyDistance: -10 },
      };

      const res = await request(app).post('/api/carbon/calculate').send(badPayload);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    test('eco-friendly payload produces lower emission than high-carbon payload', async () => {
      const ecoPayload = {
        transport: { mode: 'bike', dailyDistance: 20 },
        energy: { energyType: 'renewable', electricityBill: 150 },
        food: { meatFrequency: 'never', dairyFrequency: 'never' },
        shopping: {
          purchaseCategory: 'small_clothing',
          shoppingFrequency: 'never',
          clothingPurchase: 'never',
          ecoFriendly: 'true',
        },
      };

      const highCarbonPayload = {
        transport: {
          mode: 'car',
          dailyDistance: 20,
          carpool: 'no',
          noOfPassenger: 1,
          driveFrequency: 'daily',
        },
        energy: { energyType: 'fossil', electricityBill: 150 },
        food: { meatFrequency: '4+', meatLover: 5, dairyFrequency: 'multiple' },
        shopping: {
          purchaseCategory: 'small_clothing',
          shoppingFrequency: 'frequently',
          clothingPurchase: 'frequently',
          ecoFriendly: 'false',
        },
      };

      const ecoRes = await request(app).post('/api/carbon/calculate').send(ecoPayload);

      const highRes = await request(app).post('/api/carbon/calculate').send(highCarbonPayload);

      expect(ecoRes.body.totalEmission).toBeLessThan(highRes.body.totalEmission);
    });
  });

  describe('GET /api/carbon/history', () => {
    test('returns array of records with createdAt and totalEmission', async () => {
      const mockRecords = [
        { total: 12.5, date: new Date('2026-06-01'), createdAt: new Date('2026-06-01') },
        { total: 8.4, date: new Date('2026-06-02'), createdAt: new Date('2026-06-02') },
      ];

      jest.spyOn(Footprint, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockRecords),
      });

      const res = await request(app).get('/api/carbon/history');

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toEqual(
        expect.objectContaining({
          createdAt: expect.any(String),
          totalEmission: 12.5,
        })
      );
    });
  });

  describe('GET /api/carbon/summary', () => {
    test('returns averageEmission of user footprints', async () => {
      const mockRecords = [{ total: 10 }, { total: 20 }];

      jest.spyOn(Footprint, 'find').mockResolvedValue(mockRecords);

      const res = await request(app).get('/api/carbon/summary');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        averageEmission: 15,
      });
    });
  });

  describe('POST /api/carbon/save', () => {
    test('returns 200 or 201 on saving footprint', async () => {
      jest.spyOn(Footprint.prototype, 'save').mockResolvedValue({});

      const res = await request(app).post('/api/carbon/save').send({
        transportEmissions: 5.2,
        electricityEmissions: 3.1,
        foodEmissions: 4.5,
        shoppingEmissions: 2.0,
        totalEmission: 14.8,
      });

      expect([200, 201]).toContain(res.status);
      expect(res.body.success).toBe(true);
    });
  });
});
