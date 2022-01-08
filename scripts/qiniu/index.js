const qiniu = require('qiniu')

var accessKey = 'fGLq6tWcYtDZqhjcMTot8p6KeYJChLXhxd4YH1Ky'
var secretKey = 'lNhpa7_yrS_KbIQqsGbHWGBc0svrJgiZRB_ugaCg'
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

var options = {
    scope: 'health-store'
}
var putPolicy = new qiniu.rs.PutPolicy(options)
var uploadToken = putPolicy.uploadToken(mac)
