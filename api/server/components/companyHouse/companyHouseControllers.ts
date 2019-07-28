import { Request, Response } from 'express';
import * as companyHouse from './companyHouseServices';

class Controller {
  public async search(req: Request, res: Response): Promise<void> {
    if (req.body) {
      const searchInfo: companyHouse.ICompanySearch = req.body;
      if (!searchInfo.itemPerPage) { searchInfo.itemPerPage = parseInt(process.env.CH_itemPerPage, 0); }
      if (!searchInfo.startIndex) { searchInfo.startIndex = 0; }
      const companiesInfo: companyHouse.ICompanyDataInfo =
        await companyHouse.companyHouseService.searchByName(searchInfo);
      if (companiesInfo) {
        res.status(200);
        res.jsonp({ status: 'success', companiesInfo });
      } else {
        res.status(500);
        res.jsonp({ status: 'error', msg: `Something went wrong with the company house search` });
      }
    } else {
      res.status(412);
      res.jsonp({ status: 'error', msg: `Search info needs to be provided` });
    }
  }
}

export default new Controller();
