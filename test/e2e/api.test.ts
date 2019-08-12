import got from 'got';

describe('Api e2e test cases', () => {
  const BASE_URL = 'http://localhost:3000/api/v1/second-minimum/calculate';
  it('/calculate should return the output of the results', async () => {
    const reqObj = {
      input: [1, 3, 5, 8],
    };
    const { body } = await got.post(BASE_URL, {
      json: true,
      body: reqObj,
    });
    expect(body.success).toBe(true);
    expect(body.output).toBe(3);
  });
  it('/calculate should return the output of the results', async () => {
    const reqObj = {
      input: [1, 3],
    };
    const { body } = await got.post(BASE_URL, {
      json: true,
      body: reqObj,
    });
    expect(body.success).toBe(true);
    expect(body.output).toBe(3);
  });
  it('/calculate should return the output of the results', async () => {
    const reqObj = {
      input: [1],
    };
    const { body } = await got.post(BASE_URL, {
      json: true,
      body: reqObj,
    });
    expect(body.success).toBe(false);
    expect(body.output).toStrictEqual('Invalid Input');
  });
});
