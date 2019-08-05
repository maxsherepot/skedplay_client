.PHONY: test

test:
	php vendor/bin/phpunit

fresh:
	php artisan migrate:fresh
	php artisan module:migrate
	php artisan module:seed
	php artisan passport:install --force
	rm storage/app/keys/*

default: test