import controller from './companyHouseControllers';
import sinon from 'sinon';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  process.env.CH_URL = 'https://test.companyhouse.co.uk';
  process.env.CH_itemPerPage = '20';
});

afterEach(() => {
  sinon.restore();
});

const res: any = {
  jsonp(args: any) { return null; },
  status(code: number) { return code; },
};

describe('Test Controllers: Company House', () => {
  describe('Test Controllers: Company Hosue search', () => {
    test('Check Controllers all working', async () => {
      const resp = {
        status: 200, data: {
          items: [
            {
              address_snippet: 'test London',
              company_number: '12657893',
              date_of_cessation: null,
              description: 'test company 1',
              date_of_creation: '12/10/1981',
              company_type: 'ltd',
              title: 'JB Ltd',
              company_status: 'Nearly dead',
            },
            {
              address_snippet: 'test Paris',
              company_number: '9874276384',
              date_of_cessation: null,
              description: 'test company 2',
              date_of_creation: '12/10/1988',
              company_type: 'ltd',
              title: 'EFB Ltd',
              company_status: 'Dead again',
            },
          ],
        },
      };
      mockedAxios.get.mockResolvedValue(resp);
      const calledFunction = mockedAxios.get;
      const spy: any = sinon.spy(res, 'jsonp');
      const spyStatus: any = sinon.spy(res, 'status');
      const req: any = {
        body: {
          name: 'HSBC', itemPerPage: 5, startIndex: 1,
        },
      };
      await controller.search(req, res);
      expect(spyStatus.withArgs(200).calledOnce).toBeTruthy();
      expect(spy.withArgs({ status: 'success', companiesInfo: resp.data }).calledOnce).toBeTruthy();
      expect(calledFunction)
        .toBeCalledWith('https://test.companyhouse.co.uk/search?q=HSBC&items_per_page=5&start_index=1');
    });
    test('Check Controllers all working with default values', async () => {
      const resp = { status: 200, data: { items: [] } };
      mockedAxios.get.mockResolvedValue(resp);
      const calledFunction = mockedAxios.get;
      const spy: any = sinon.spy(res, 'jsonp');
      const spyStatus: any = sinon.spy(res, 'status');
      const req: any = { body: { name: 'HSBC' } };
      await controller.search(req, res);
      expect(spyStatus.withArgs(200).calledOnce).toBeTruthy();
      expect(spy.withArgs({ status: 'success', companiesInfo: resp.data }).calledOnce).toBeTruthy();
      expect(calledFunction)
        .toBeCalledWith('https://test.companyhouse.co.uk/search?q=HSBC&items_per_page=20&start_index=0');
    });
    test('Check Controllers not working due to missing req.body', async () => {
      const resp = { status: 200, data: { items: [] } };
      const spy: any = sinon.spy(res, 'jsonp');
      const spyStatus: any = sinon.spy(res, 'status');
      const req: any = {};
      await controller.search(req, res);
      expect(spyStatus.withArgs(412).calledOnce).toBeTruthy();
      expect(spy.withArgs({ status: 'error', msg: `Search info needs to be provided` }).calledOnce).toBeTruthy();
    });
    test('Check Controllers not working if axios request rejected', async () => {
      const resp = { status: 200, data: { items: [] } };
      mockedAxios.get.mockRejectedValue(null);
      const calledFunction = mockedAxios.get;
      const spy: any = sinon.spy(res, 'jsonp');
      const spyStatus: any = sinon.spy(res, 'status');
      const req: any = { body: { name: 'HSBC' } };
      await controller.search(req, res);
      expect(spyStatus.withArgs(500).calledOnce).toBeTruthy();
      expect(spy.withArgs({ status: 'error', msg: `Something went wrong with the company house search` })
        .calledOnce).toBeTruthy();
      expect(calledFunction)
        .toBeCalledWith('https://test.companyhouse.co.uk/search?q=HSBC&items_per_page=20&start_index=0');
    });
  });
});
