# Fridge Spy

## Web

## Arhitechture

Build on the Vitejs project, using React. When testing if finally implemented, must test any component rendering data, and not processing it.

The web platform uses Styled-Component and NO CSS LIBRARY to style component. This must visually match the rest of the application, and should be built with newer properties. (No tables!!).
We also use Typescript for everything, and types/interfaces are required for anything that exists inside the application. Nothing is typed as any, since why are we using Typescript then? (In exceptional cases, and can be useful, but mostly not)

## Native

The native app (Or Fridge Spy Lite for now) is built with Flutter, as this provides the least resistance compared to other platforms like React Native (Expo) or Ionic.
The goal of the native app, is not to be a full fat version of the web platform, but to provide the most used features, like adding or removing items from locations, or seeing items that will soon expire, etc.

The native app must at all times, run perfectly, nothing is worse than an app that lags or hangs.

## Backend

### Architecture

Split into (micro)services, to decouple different parts of the application
Any one service that needs information from another service, must only make 1 call, to that service, and that service must then return all the required information to complete the request.

At any point must we revalidate if a service needs to be split up, into more services - Live by a mantra of "The more split, the more better", but remember the above rule.

Any service must be run as a docker image, so it can either be deployed to the cloud, or run on own hardware.

### Services

#### Location

Location service provides all the houses and locations within them
This is also where product information on the locations are stored ie. how many of x product is stored in y location

#### User

User service handles all user information storage and authentication for the entire application.

#### Product

Product service handles and stores all product information, brand info, and product type info. This is the service that is called, when another service or frontend needs details about a product ie. images, brand info, product name or product description etc.

#### Shopping

Shopping service will handle the generation and upkeep of the shopping list that is generated based on the users set preferences
This service will also handle the ability to save a normal document version of the shopping list, or even serve a printable version of that list

### Technologies

#### Redis

Redis is used as a "cache" for things like product information, or location information.
There must be a clear, and harsh seperation of what data needs to be cached, and what must not. The databases are not slow, this is mainly just for the wow factor of incredibly fast data delivery.
It also doubles as a pub/sub system, to publish any changes of any item to the web/native platforms

#### RabbitMQ

Message Broker used for brokering messages between services, in case service A needs to know something has changed in Service B

#### Postgres

Used for saving highly relational data.
Used in: Location Service

#### MongoDB

Used for saving non-relational information, such as user information
Used in: User Service
