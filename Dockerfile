# STEP1: 构建基础镜像
FROM alpine:3.14 AS base
# -设置环境变量
ENV APP_PATH=/app
# -设置工作目录
WORKDIR $APP_PATH
# -安装pm2
RUN  sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories \
  && apk add --no-cache --update nodejs curl yarn

# STEP2: 构建依赖镜像
FROM base as installer
# -复制依赖相关目录
COPY package.json .npmrc yarn.lock ./
# -安装依赖
RUN yarn


# STEP3: 构建运行镜像
FROM base as builder
# -复制依赖文件
COPY --from=installer $APP_PATH/node_modules ./node_modules
# -复制代码文件
COPY . .
# -运行编译
RUN yarn build:h5


# STEP4: 运行Nginx服务
FROM nginx:stable

RUN rm -rf /usr/share/nginx/html/*
RUN rm -rf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/build/h5/ /usr/share/nginx/html/
COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
