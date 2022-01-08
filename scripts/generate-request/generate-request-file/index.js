const fetch = require('node-fetch')
const Handlebars = require('handlebars')
const { generateControllerFiles } = require('./controller')
const { generateServiceFiles } = require('./service')
const { info, loadConfig } = require('../utils')
const { generateModelFiles } = require('../generate-model-file')

const rimraf = require('rimraf')
const configJson = loadConfig()

// 扩展模版命令toUpperCase
Handlebars.registerHelper('toUpperCase', function(str) {
    return str.toUpperCase()
})

// 扩展模版命令toLowerCase
Handlebars.registerHelper('toLowerCase', function(str) {
    return str.toLowerCase()
})

Handlebars.registerHelper('replace', function(context, findStr, replaceStr) {
    return context.replace(findStr, replaceStr)
})
/**
 * 生成服务
 */
function generateService(config) {
    //删除历史文件
    rimraf(configJson.serviceDir, err => err && console.error(err))
    rimraf(configJson.controllerDir, err => err && console.error(err))

    const { gateway, services, swagger } = config
    info('-------------------------')
    info('Gatewat地址', gateway)
    info('Swagger地址', swagger)
    if (services && Object.keys(services).length) {
        info('服务模式', '多服务')
        // 多服务模式
        return Object.entries(services).map(([key, service]) => ({
            key: key,
            name: service,
            url: `${gateway}/${service}/${swagger}`,
            gateway: config.name,
            config
        }))
    } else {
        info('服务模式', '单服务')
        // 单服务模式
        return [
            {
                key: '',
                name: '',
                gateway: config.name,
                url: `${gateway}/${swagger}`,
                config
            }
        ]
    }
}

/**
 * 获取控制器名称
 */
function getControllerName(currentTag) {
    const [tag] = currentTag
    const { name: className } = configJson.tags.find(x => x.tag === tag)

    if (!className) {
        throw new Error(`路径:${currentTag}不符合规范`)
    }

    return className.replace(/^\S/, s => s.toUpperCase())
}

/**
 * 获取行为器名称
 */
function getActionName(path, method, config) {
    const uniqueKey = Object.keys(config).length === 1
    const name = path
        .replace(
            /\{.*?\}$/g,
            $ =>
                `By${$.replace(/[{}]/g, '').replace(/^\S/, s =>
                    s.toUpperCase()
                )}`
        )
        .split(/[\/_]|\{.*?\}/)
        .filter(x => !!x)
        .join('-')

    return uniqueKey
        ? name
        : `${method}${name.replace(/^\S/, s => s.toUpperCase())}`
}

function getAliasName(config, service, key) {
    if (!config.alias) {
        return
    }

    if (Array.isArray(config.alias)) {
        const target = config.alias.find(
            x => x.service === service && x.from === key
        )

        if (target) {
            return target.to
        }
    } else {
        if (config.alias.from === key) {
            return config.alias.to
        }
    }
}

/**
 * 获取Action列表
 * @param paths
 */
function createControllers(service, controllers, paths, tags) {
    Object.entries(paths)
        // .filter(
        //   ([key]) =>
        //     key.startsWith('/api') ||
        //     key.startsWith(`/${service.name}`)
        // )
        .map(([key, config]) => ({
            path: key.replace(new RegExp(`^\/${service.name}\/`), '/'),
            config
        }))
        .forEach(({ path, config }) => {
            // 接口行为
            Object.entries(config).forEach(
                ([
                    method,
                    { summary, description, tags: currentTag, responses }
                ]) => {
                    const getController = service.config.controllerResolver
                        ? service.config.controllerResolver
                        : getControllerName

                    const controllerName = getController(currentTag)

                    const aliasName = getAliasName(
                        service.config,
                        service.key,
                        controllerName
                    )

                    const controller = aliasName || controllerName
                    const action = getActionName(path, method, config)

                    if (action.startsWith('http:')) {
                        return
                    }

                    const filename = controller
                        .replace(/([A-Z])/g, '-$1')
                        .replace(/^-/g, '')
                        .toLowerCase()

                    // 查询并创建控制器
                    let target = controllers.find(
                        x => x.controller === filename
                    )

                    // 控制器不存在则自动创建
                    if (!target) {
                        target = {
                            gateway: service.gateway,
                            controller: filename,
                            filename: filename,
                            controllerClass: `${controller}Controller`,
                            serviceClass: `${controller}Service`,
                            actions: []
                        }
                        controllers.push(target)
                    }

                    // 添加控制器行为
                    target.actions.push({
                        path,
                        controller,
                        action: (action || method).replace(/-(\w)/g, ($, $1) =>
                            $1.toUpperCase()
                        ),
                        schema: undefined,
                        defaultAction: !action,
                        method: method.replace(/^\S/, s => s.toUpperCase()),
                        comment: summary ?? description
                    })
                }
            )
        })
}

/**
 * 生成配置文件
 * @param service
 */
function generate(service) {
    fetch(service.url, { method: 'GET' })
        .then(res => res.json()) // expecting a json response
        .then(({ tags, paths, components }) => {
            info('-------------------------')
            info('服务名称', service.name || '无')
            info('服务路径', service.url)
            info('-------------------------')
            // 控制器列表
            const controllers = []
            // 填装控制器列表
            createControllers(service, controllers, paths, tags)

            // 生产文件
            generateControllerFiles(service, controllers)
            generateServiceFiles(service, controllers)

            if (configJson.model) {
                generateModelFiles(service, components)
            }
        })
}

module.exports.generateRequestFile = () => {
    if (!configJson) {
        throw new Error('无法找到配置文件')
    }

    const generateGatewayFile = config =>
        generateService(config).forEach(generate)

    // 多网关处理
    if (Array.isArray(configJson)) {
        configJson.forEach(generateGatewayFile)
    } else {
        generateGatewayFile(configJson)
    }
}
