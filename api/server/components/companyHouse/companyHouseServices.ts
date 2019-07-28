import l from '../../common/logger';
import Axios from 'axios';
import querystring from 'querystring';

export interface ICompanySearch {
  name: string;
  itemPerPage?: number;
  startIndex?: number;
}

export interface ICompanyDataInfo {
  items_per_page: number;
  page_number: number;
  start_index: number;
  total_results: number;
  kind: string;
  items: ICompanyInfo[];
}

export interface ICompanyAddress {
  locality: string;
  postal_code: string;
  premises: string;
  address_line_2: string;
  address_line_1: string;
}

export interface ICompanyInfo {
  address_snippet: string;
  address: ICompanyAddress;
  kind: string;
  company_number: string;
  date_of_cessation: string;
  description: string;
  date_of_creation: string;
  company_type: string;
  title: string;
  company_status: string;
}

class CompanyHouseService {
  // tslint:disable-next-line:no-shadowed-variable
  public async searchByName(companyInfo: ICompanySearch): Promise<ICompanyDataInfo> {
    try {
      Axios.defaults.headers.common = { Authorization: `${process.env.CH_API_KEY}` };
      const query = querystring.stringify({
        q: companyInfo.name, items_per_page: companyInfo.itemPerPage, start_index: companyInfo.startIndex,
      });
      // tslint:disable-next-line:no-shadowed-variable
      const { status, statusText, headers, config, request, data } =
        await Axios.get(`${process.env.CH_URL}/search?${query}`);
      const responseData: ICompanyDataInfo = data;
      if (status === 200 && responseData.items) {
        l.info(`Companies retrieve from Company House Service`, 'CompanyHouseService => searchByName');
        return responseData;
      } else {
        l.info(`No companies retrieve from Company House Service`, 'CompanyHouseService => searchByName');
        return null;
      }
    } catch (error) {
      l.error(`Error in searchByName from CompanyHouseService: ${error}`);
      return null;
    }
  }
}

export const companyHouseService = new CompanyHouseService();
