# Contributing to Rentro

## Development Workflow

1. Create a feature branch from `develop`
   ```bash
   git checkout -b feature/feature-name
   ```

2. Make your changes and ensure tests pass
   ```bash
   npm run test
   npm run lint
   ```

3. Commit with meaningful messages
   ```bash
   git commit -m "feat: add feature description"
   ```

4. Push and create a Pull Request
   ```bash
   git push origin feature/feature-name
   ```

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning
- `refactor`: Code change without adding features
- `perf`: Code change that improves performance
- `test`: Adding missing tests
- `chore`: Changes to build process, dependencies, etc.

### Example
```
feat(auth): add email verification for registration

Add email verification during user registration process.
Implemented OTP-based verification with 10-minute expiry.

Closes #123
```

## Code Standards

- Use TypeScript for type safety
- Follow ESLint and Prettier rules
- Write tests for new features (minimum 70% coverage)
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Further Questions?

Contact the development team or create an issue in the repository.
