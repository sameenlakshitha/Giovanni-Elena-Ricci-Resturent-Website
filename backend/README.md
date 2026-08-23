# Giovanni & Elena Ricci Restaurant Backend

Spring Boot 3 + Java 21 + MySQL REST API for the Giovanni & Elena Ricci website.

## Run locally

1. Create the database:
   `mysql -u root -p < src/main/resources/schema.sql`
2. Set `DB_USERNAME`, `DB_PASSWORD`, and `JWT_SECRET` environment variables.
3. Run:
   `mvn spring-boot:run`
4. API base URL: `http://localhost:8080/api`

## Current public API

- `GET /api/categories`
- `GET /api/foods`
- `GET /api/foods?categoryId=1`

## Planned API modules

- Authentication: register/login/JWT
- Customer addresses
- Cart/order checkout
- Reservations
- Payments
- Admin menu/order/reservation management

Never commit real database passwords, JWT secrets, payment keys, or production credentials.