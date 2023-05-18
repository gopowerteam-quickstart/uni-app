/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Category } from '../models/Category'
import {
  RequestService,
  RequestGenerateType,
  type RequestSendOptions,
  type RequestPlugin,
  type RequestGenerateOptions,
} from '@gopowerteam/request'
export class CategoryService {
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
   * 获取分类列表
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
      path: '/api/client/category/get-category-list',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }

  /**
   * 获取分类树形结构
   */
  public getCategoryTree(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getCategoryTree(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Category[]>
  public getCategoryTree(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<Category[]> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/category/get-category-tree',
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
