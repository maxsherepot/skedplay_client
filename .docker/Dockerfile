FROM theparticles/libs:alpine

RUN echo http://mirror.yandex.ru/mirrors/alpine/v3.9/main > /etc/apk/repositories; \
    echo http://mirror.yandex.ru/mirrors/alpine/v3.9/community >> /etc/apk/repositories

RUN apk update && apk upgrade && \
    apk add --no-cache git ffmpeg

#####################################
# Exif:
#####################################

ARG INSTALL_EXIF=true
RUN if [ ${INSTALL_EXIF} = true ]; then \
    # Enable Exif PHP extentions requirements
    docker-php-ext-install exif && \
     docker-php-ext-enable exif \
;fi

COPY php/fpm_www.conf /usr/local/etc/php-fpm.d/www.conf
COPY php/php.ini /usr/local/etc/php/
