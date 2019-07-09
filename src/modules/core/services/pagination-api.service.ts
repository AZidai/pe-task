import { Injectable } from '@angular/core';
import { PaginationInfoInterface } from '../../../interfaces';

@Injectable()
export class PaginationApiService {

  fetchPaginationInfo(data: any): PaginationInfoInterface {
    return {
      total_pages: data.total_pages,
      per_page: data.per_page,
      total: data.total,
      page: data.page
    };
  }
}
