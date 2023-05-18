/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppBaseResponse } from '../models/AppBaseResponse'
import type { TokenResponse } from '../models/TokenResponse'
import type { User } from '../models/User'
import {
  RequestService,
  RequestGenerateType,
  type RequestSendOptions,
  type RequestPlugin,
  type RequestGenerateOptions,
} from '@gopowerteam/request'
export class AppService {
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
   * 获取系统基本信息
   */
  public appBase(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public appBase(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<AppBaseResponse>
  public appBase(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<AppBaseResponse> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/app/app-base',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }

  /**
   * 用户登录
   */
  public login(
    requestQuery: RequestQueryParams.Login,
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public login(
    requestQuery: RequestQueryParams.Login,
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<TokenResponse>
  public login(
    requestQuery: RequestQueryParams.Login,
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<TokenResponse> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/app/weapp-login',
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
   * 刷新Token
   */
  public token(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public token(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<TokenResponse>
  public token(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<TokenResponse> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/app/weapp-token',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }

  /**
   * 获取当前用户信息
   */
  public getCurrentUser(
    requestPlugins: RequestPlugin[],
    requestGenerateOptions: RequestGenerateOptions & {
      type: RequestGenerateType.URL
    },
  ): string
  public getCurrentUser(
    requestPlugins?: RequestPlugin[],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<User>
  public getCurrentUser(
    requestPlugins: RequestPlugin[] = [],
    requestGenerateOptions?: RequestGenerateOptions,
  ): Promise<User> | string {
    const requestSendOptions = {
      service: this.service,
      path: '/api/client/app/current',
      method: 'get',
    }

    return this.generateRequest(
      requestSendOptions,
      requestPlugins,
      requestGenerateOptions,
    )
  }
}

namespace RequestQueryParams {
  export type Login = {
    code: string
  }
}
