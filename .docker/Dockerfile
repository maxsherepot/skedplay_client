FROM theparticles/libs:alpine

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
