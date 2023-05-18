import fs from 'fs'
import path from 'path'
import qiniu from 'qiniu'
import rimraf from 'rimraf'
import { loadEnv } from 'vite'

function assets(options: {
  // 静态资源目录
  dirs: Record<string, string>
  dts: string
}) {
  // 虚拟模块ID
  const MODULE_ID = 'virtual:assets'

  const platform = process.env.UNI_PLATFORM as string

  const ASSET_ROOT_PATH = 'src/static'
  const ASSET_QINIU_PREFIX = 'static-assets/mall.weapp'
  const ASSET_QINIU_BUCKET = 'gopowerteam'
  const ASSET_OUTPUT_DIR = `dist/build/${platform}/static`
  const ASSET_QINIU_DOMAIN = 'https://file.gopowerteam.cn'

  const isProduction = process.env.NODE_ENV === 'production'

  // 静态资源列表
  let assets: Record<string, Record<string, any>> = {}

  /**
   * 加载资源文件
   **/
  function loadAssetFiles(dirs: Record<string, string>) {
    Object.entries(dirs).forEach(([key, dir]) => {
      // 获取目录下文件
      const files = fs.readdirSync(path.resolve(ASSET_ROOT_PATH, dir))

      // 添加Key
      const values = (assets[key] = {})

      // 读取静态资源文件
      files
        .map((file) => file.replace(/\\/g, '/'))
        .filter((file) => {
          const stat = fs.lstatSync(path.resolve(ASSET_ROOT_PATH, dir, file))
          return !stat.isDirectory()
        })
        .forEach((file) => {
          const name = path.parse(file).name
          values[name] = {
            name: file,
            key: `${key}/${file}`,
            path: path.resolve(ASSET_ROOT_PATH, dir, file),
          }
        })
    })
  }

  /**
   * 上传静态资源文件
   */
  async function uploadAssetFiles() {
    // 暂不处理多层目录结构
    const upload = await qiniuUploader()

    if (!upload) {
      console.error('无找到相关AK,SK环境配置')
      return
    }

    Object.entries(assets).forEach(([key, files]) => {
      Object.entries(files).forEach(([_, file]) => {
        upload(file.path, `${ASSET_QINIU_PREFIX}/${file.key}`)
      })
    })
  }

  function getEtag(buffer) {
    // 以4M为单位分割
    var sliceSize = 4 * 1024 * 1024
    var bufferSize = buffer.length
    var blockCount = Math.ceil(bufferSize / sliceSize)
    var prefix
    if (blockCount > 1) {
      prefix = 0x96
    } else {
      prefix = 0x16
    }

    var sha1String: any = []
    var sha1Length = 0

    for (var i = 0; i < blockCount; i++) {
      sha1String.push(sha1(buffer.slice(i * sliceSize, (i + 1) * sliceSize)))
      sha1Length += 20
    }

    var sha1Buffer = Buffer.concat(sha1String, sha1Length)

    if (blockCount > 1) {
      sha1Buffer = sha1(sha1Buffer)
    }

    sha1Buffer = Buffer.concat(
      [Buffer.from([prefix]), sha1Buffer],
      sha1Buffer.length + 1,
    )

    return sha1Buffer.toString('base64').replace(/\//g, '_').replace(/\+/g, '_')

    function sha1(content) {
      var crypto = require('crypto')
      var sha1 = crypto.createHash('sha1')
      sha1.update(content)
      return sha1.digest()
    }
  }
  /**
   * 七牛上传文件
   * @returns
   */
  async function qiniuUploader() {
    const { VITE_QINIU_ACCESS_KEY, VITE_QINIU_SECRET_KEY } = loadEnv(
      process.env.NODE_ENV || 'production',
      process.cwd(),
    )

    const accessKey = VITE_QINIU_ACCESS_KEY ?? process.env.QINIU_ACCESS_KEY
    const secretKey = VITE_QINIU_SECRET_KEY ?? process.env.QINIU_SECRET_KEY

    if (!accessKey || !secretKey) {
      return
    }

    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
    // 暂时只上传图片资源
    const options = {
      // bucket
      scope: ASSET_QINIU_BUCKET,
    }

    const putPolicy = new qiniu.rs.PutPolicy(options)
    const uploadToken = putPolicy.uploadToken(mac)
    const config = new qiniu.conf.Config({ zone: qiniu.zone.Zone_z2 })
    const bucket = new qiniu.rs.BucketManager(mac, config)
    const files: any[] = await new Promise((resolve) =>
      bucket.listPrefix(
        ASSET_QINIU_BUCKET,
        {
          prefix: ASSET_QINIU_PREFIX,
        },
        (_, files) => {
          return resolve(files.items)
        },
      ),
    )

    // 生成upload函数
    return (localFile: string, key: string) => {
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()

      const buffer = fs.readFileSync(localFile)
      const hash = getEtag(buffer)

      if (files.some((file) => file.hash === hash && file.key === key)) {
        return
      }

      // 文件上传
      formUploader.putFile(
        uploadToken,
        key,
        localFile,
        putExtra,
        (respErr, respBody, respInfo) => {
          if (respErr) {
            throw respErr
          }

          if (respInfo.statusCode !== 200) {
            return
          }

          const { key } = respBody
          console.log(`[静态资源上传完成] ${key}`)
        },
      )
    }
  }

  /**
   * 生成定义文件
   */
  function generateDeclaration(dts: string) {
    const declaration = `declare module '${MODULE_ID}' {
    type assetsType = {
        ${Object.entries(assets).map(
          ([key, files]) => `${key}: {
            ${Object.entries(files)
              .map(([key, file]) => `${key.replace(/\-/g, '_')}: string`)
              .join('\n' + ' '.repeat(12))}
        }`,
        )}
    }
    export const assets: assetsType
}\n`

    fs.writeFileSync(path.resolve(dts), declaration, 'utf-8')
  }

  /**
   * 生成虚拟代码
   **/
  async function generateCode() {
    const data = Object.entries(assets).reduce((result, [key, files]) => {
      result[key] = Object.entries(files).reduce((result, [key, file]) => {
        const name = key.replace(/\-/g, '_')

        if (isProduction) {
          // 生产环境使用网络图片
          result[
            name
          ] = `${ASSET_QINIU_DOMAIN}/${ASSET_QINIU_PREFIX}/${file.key}!normal`
        } else {
          // 开发环境使用静态图片

          result[name] = `${
            process.env.UNI_PLATFORM === 'mp-weixin' ? '/static/' : '/'
          }${file.key}`
        }
        return result
      }, {} as any)

      return result
    }, {} as any)

    // assets
    return `export const assets = ${JSON.stringify(data)}`
  }

  return {
    name: 'vite-plugin-static-asset',
    enforce: 'pre',
    resolveId(id: string) {
      if (id === MODULE_ID) return MODULE_ID
    },
    load(id: string) {
      if (id !== MODULE_ID) return
      // 生成定义文件
      generateDeclaration(options.dts)

      // 生成代码文件
      return generateCode()
    },
    async buildStart() {
      loadAssetFiles(options.dirs)
      // 获取资源目录并进行上传

      if (isProduction) {
        // 获取上传域名
        // 上传资源文件
        await uploadAssetFiles()
      }
    },
    closeBundle() {
      // 删除本地已上传的静态资源
      if (isProduction) {
        Object.entries(options.dirs).forEach(([key, dir]) => {
          rimraf(path.resolve(ASSET_OUTPUT_DIR, dir)).then(() => {
            console.log(`[静态资源删除完成] static/${dir}`)
          })
        })
      }
    },
  }
}

export default assets({
  dts: 'typings/assets.d.ts',
  dirs: {
    images: 'images',
  },
})
