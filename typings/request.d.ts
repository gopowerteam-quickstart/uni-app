declare module 'virtual:request' {
import { AppService } from '@/http/services/AppService'
import { CategoryService } from '@/http/services/CategoryService'
import { HomeService } from '@/http/services/HomeService'
import { ProductService } from '@/http/services/ProductService'
import { QiniuService } from '@/http/services/QiniuService'

const serviceMap = {
  AppService,
  CategoryService,
  HomeService,
  ProductService,
  QiniuService,
}

  export function useRequest<T>(
  select: (services: typeof serviceMap) => { new (): T }
): T
}
