import { UploaderService } from '../utils/upload.service'
import type { appConfig } from '@/config/app.config'

export const useUploader = (name: keyof typeof appConfig.storage) =>
  useInstance(UploaderService, name)
