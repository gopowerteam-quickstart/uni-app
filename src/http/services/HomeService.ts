/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Banner } from '../models/Banner'
import type { Category } from '../models/Category'
import type { Product } from '../models/Product'
import {
  RequestService,
  RequestGenerateType,
  type RequestSendOptions,
  type RequestPlugin,
  type RequestGenerateOptions,
} from '@gopowerteam/request'
export class HomeService {
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
   * 获取Banner列表
   */
  public getBannerList(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getBannerList(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Banner[]>
  public getBannerList(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Banner[]> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/home/get-banner-list',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }

  /**
   * 获取推荐标签列表
   */
  public getCategoryList(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getCategoryList(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Category[]>
  public getCategoryList(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Category[]> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/home/get-category-list',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }

  /**
   * 获取推荐商品
   */
  public getRecommendList(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getRecommendList(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Product[]>
  public getRecommendList(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Product[]> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/home/get-recommend-list',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }
}

namespace RequestQueryParams {}
