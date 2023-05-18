/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CursorProduct } from '../models/CursorProduct'
import type { Product } from '../models/Product'
import {
  RequestService,
  RequestGenerateType,
  type RequestSendOptions,
  type RequestPlugin,
  type RequestGenerateOptions,
} from '@gopowerteam/request'
export class ProductService {
  // 请求实例
  private request = RequestService.getInstance()
  private service = ''

  private generateRequest(
    requestSendOptions: RequestSendOptions,
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ) {
    switch (true) {
      case requestGenerateOptions?.type === RequestGenerateType.URL:
        // 生成URL
        return this.request.toURL(requestSendOptions, requestPlugins)
      default: {
        // 请求数据
        const result = this.request.send(requestSendOptions, requestPlugins)

        return result
      }
    }
  }

  /**
   * 获取商品列表
   */
  public getProductList(
    requestQuery: RequestQueryParams.GetProductList,
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getProductList(
    requestQuery: RequestQueryParams.GetProductList,
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<CursorProduct>
  public getProductList(
    requestQuery: RequestQueryParams.GetProductList,
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<CursorProduct> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/product',
      method: 'get',
      paramsQuery: requestQuery,
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }

  /**
   * 获取商品列表
   */
  public getProductList(
    id: string,
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getProductList(
    id: string,
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Product>
  public getProductList(
    id: string,
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Product> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/product/{id}',
      method: 'get',
      paramsPath: {
        id,
      },
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }
}

namespace RequestQueryParams {
  export type GetProductList = {
    /**
     * 游标ID
     */
    cursor?: string
    /**
     * 游标列
     */
    cursorKey?: string
    /**
     * 排序列
     */
    orderKey?: string
    /**
     * 是否推荐
     */
    recommended?: boolean
  }
}
