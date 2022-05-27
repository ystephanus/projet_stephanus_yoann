php vendor/bin/doctrine orm:convert-mapping --namespace="" --force --from-database yml ./config/yaml 1>/dev/null
php vendor/bin/doctrine orm:generate-entities --generate-annotations=false --update-entities=true --generate-methods=false ./src
php vendor/bin/doctrine orm:schema-tool:update --force
php vendor/bin/doctrine orm:validate-schema
php vendor/bin/doctrine orm:clear-cache:metadata
