FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    zip \
    curl \
    sudo \
    unzip \
    libzip-dev\
    libicu-dev \
    libbz2-dev \
    libpng-dev \
    libjpeg-dev \
    libmcrypt-dev \
    libreadline-dev \
    libfreetype6-dev \
    libpq-dev \
    g++ \
    openssl 

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
    
RUN docker-php-ext-install \
    bz2 \
    intl \
    iconv \
    bcmath \
    opcache \
    calendar \
    pdo \
    pdo_pgsql \
    pgsql \
    exif \
    zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www
WORKDIR /var/www

CMD bash run.sh

EXPOSE 8000