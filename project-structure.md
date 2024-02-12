# Core
This is a node.js API that mostly utilizes TypeScript with strict typing. Flexibilty is our top priority when designing this project.
Our core consists entities, errors, repos, services and usecases. This is the back bone of our project.
Everything is defined abstractly under core folder and the actual implementation will be outside of the core.

## Entities
Entities define what properties an object should have. We used zod to help us with types.

## Errors
Error classes are there to improve developer and user experience

### CoreError
CoreErrors are the base error class. Other Error classes inherit this class

### ExternalError
ExternalErrors are for debugging purposes. They are meant to help developers pinpoint the issue

### InputError
InputErrors are there to improve UX and to stop the user from doing unwanted actions

## Repos
<!-- TODO: re-iterate -->
Repos are used to define what Entities are supposed to do. They import entities and omit unwanted properties (usually defining properties like id)

## Services
Services are meant to be called from different UseCases. They provide system-wide functionality

## UseCases
UseCases are supposed to be called from endpoints. They are used to process client requests and respond to them. UseCases also include tests. These tests serve the purpose of helping the developer <!-- in what way -->

