import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';
import authenticateToken from '../middleware/authMiddleware.js';

const createResponseMock = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authenticateToken', () => {
  const secret = 'unit-test-secret';

  beforeAll(() => {
    process.env.JWT_SECRET = secret;
  });

  test('allows guest when authorization header is missing', async () => {
    const req = { headers: {} };
    const res = createResponseMock();
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(req.user).toBeNull();
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('allows guest when bearer token is null', async () => {
    const req = { headers: { authorization: 'Bearer null' } };
    const res = createResponseMock();
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(req.user).toBeNull();
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('attaches user payload for valid JWT', async () => {
    const token = jwt.sign({ id: 'user-123', role: 'member' }, secret);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = createResponseMock();
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(req.user).toMatchObject({ id: 'user-123', role: 'member' });
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('returns 401 for malformed token', async () => {
    const req = { headers: { authorization: 'Bearer not-a-valid-token' } };
    const res = createResponseMock();
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Unauthorized',
      })
    );
  });
});
