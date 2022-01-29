declare module 'virtual:http-request' {
  

  const serviceMap = {
      
    }

  export function useRequest<T>(
    select: (services: typeof serviceMap) => { new (): T }
  ): T
}
