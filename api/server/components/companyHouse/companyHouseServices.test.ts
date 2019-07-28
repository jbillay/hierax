import { ICompanySearch, ICompanyDataInfo, companyHouseService } from './companyHouseServices';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeAll(() => {
  process.env.CH_URL = 'https://test.companyhouse.co.uk';
});

describe('Company House Service', () => {
  test('Check Service searchByName working', async () => {
    const companyInformation: ICompanySearch = {
      name: 'HSBC',
      itemPerPage: 10,
      startIndex: 0,
    };
    const resp = { status: 200, data: { items: [
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
    ] } };
    mockedAxios.get.mockResolvedValue(resp);
    const calledFunction = mockedAxios.get;
    const companyList: ICompanyDataInfo = await companyHouseService.searchByName(companyInformation);
    expect(companyList).toEqual(resp.data);
    expect(calledFunction)
      .toBeCalledWith('https://test.companyhouse.co.uk/search?q=HSBC&items_per_page=10&start_index=0');
  });
  test('Check Service searchByName not working', async () => {
    const companyInformation: ICompanySearch = {
      name: 'HSBC',
      itemPerPage: 10,
      startIndex: 0,
    };
    const resp = { status: 401, data: {} };
    mockedAxios.get.mockResolvedValue(resp);
    const calledFunction = mockedAxios.get;
    const companyList: ICompanyDataInfo = await companyHouseService.searchByName(companyInformation);
    expect(companyList).toBeNull();
    expect(calledFunction)
      .toBeCalledWith('https://test.companyhouse.co.uk/search?q=HSBC&items_per_page=10&start_index=0');
  });
  test('Check Service searchByName axios throw error', async () => {
    const companyInformation: ICompanySearch = {
      name: 'HSBC',
      itemPerPage: 10,
      startIndex: 0,
    };
    mockedAxios.get.mockRejectedValue(new Error('Company House error'));
    const calledFunction = mockedAxios.get;
    const companyList: ICompanyDataInfo = await companyHouseService.searchByName(companyInformation);
    expect(companyList).toBeNull();
    expect(calledFunction)
      .toBeCalledWith('https://test.companyhouse.co.uk/search?q=HSBC&items_per_page=10&start_index=0');
  });
});

