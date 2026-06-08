import { jest } from '@jest/globals';

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    verify: jest.fn(),
  },
}));

// Dynamically import dependencies after mocking
const { default: authenticateToken } = await import('../../middleware/authMiddleware.js');
const { default: jwt } = await import('jsonwebtoken');

const createResponseMock = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('authMiddleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('calls next() and sets req.user for valid token', async () => {
    const req = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    };
    const res = createResponseMock();
    const next = jest.fn();

    const decodedUser = { id: 'user-123' };
    jwt.verify.mockReturnValue(decodedUser);

    await authenticateToken(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid-token', expect.any(String));
    expect(req.user).toEqual(decodedUser);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });

  test('returns 401 for missing Authorization header', async () => {
    const req = {
      headers: {},
    };
    const res = createResponseMock();
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Unauthorized',
        message: expect.any(String),
      })
    );
  });

  test('returns 401 with expired-specific message for expired token', async () => {
    const req = {
      headers: {
        authorization: 'Bearer expired-token',
      },
    };
    const res = createResponseMock();
    const next = jest.fn();

    const expiredError = new Error('jwt expired');
    expiredError.name = 'TokenExpiredError';
    jwt.verify.mockImplementation(() => {
      throw expiredError;
    });

    await authenticateToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'Token has expired',
    });
  });

  test('returns 401 for malformed/invalid token', async () => {
    const req = {
      headers: {
        authorization: 'Bearer malformed-token',
      },
    };
    const res = createResponseMock();
    const next = jest.fn();

    jwt.verify.mockImplementation(() => {
      throw new Error('invalid token');
    });

    await authenticateToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'Invalid token',
    });
  });

  test('returns 401 if format is not Bearer <token>', async () => {
    const req = {
      headers: {
        authorization: 'Basic credentials',
      },
    };
    const res = createResponseMock();
    const next = jest.fn();

    await authenticateToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Unauthorized',
      message: 'Format is Bearer <token>',
    });
  });
});
