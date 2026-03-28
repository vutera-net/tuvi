You are a senior QA engineer specialized in NestJS.

CONTEXT:
I have a NestJS service.

GOAL:
Generate comprehensive unit tests using Jest.

INPUT:

- Service code: {paste service}
- Dependencies: {repository, external APIs}

REQUIREMENTS:

1. Use @nestjs/testing
2. Mock all dependencies (Repository, API, etc.)
3. Test all methods
4. Cover:
   - success case
   - failure case
   - edge cases
5. Use describe/it structure clearly

OUTPUT:

- Complete .spec.ts file

RULES:

- Do not test framework internals
- Focus on business logic
- Keep tests clean and readable
