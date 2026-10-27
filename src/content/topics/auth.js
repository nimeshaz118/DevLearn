import { createLesson } from '../topicFactory.js'

export const authTopics = [
  createLesson({
    id: 'jwt-basics', title: 'JWT Fundamentals', category: 'JWT Authentication', tags: ['jwt', 'authentication', 'security'], minutes: 11,
    description: 'Understand token structure, claims, signing, and expiration.',
    overview: 'A JSON Web Token is a compact signed container for claims. Its three Base64URL-encoded parts are the header, payload, and signature. The signature lets a receiver detect modification; it does not encrypt the payload. Anyone holding a bearer token can use it until it expires or is otherwise rejected.',
    diagramTitle: 'JWT structure and validation',
    diagramSteps: [{ label: 'Header', detail: 'Token type and signing algorithm' }, { label: 'Payload', detail: 'Identity and authorization claims' }, { label: 'Signature', detail: 'Protects integrity' }, { label: 'Validation', detail: 'Check issuer, audience, time, and signature' }],
    concepts: ['JWT payloads are readable, so never place secrets in claims.', 'Validate the signature with an explicitly allowed algorithm and trusted key.', 'Check issuer, audience, expiration, and not-before values.', 'Keep access tokens short-lived and send them only over HTTPS.'],
    exampleIntro: 'A decoded payload contains claims, but the values must not be trusted until the complete token has been validated.',
    language: 'json', filename: 'decoded-payload.json',
    example: `{
  "sub": "user-1842",
  "iss": "https://identity.example.com",
  "aud": "devlearn-api",
  "role": "editor",
  "iat": 1793131200,
  "exp": 1793132100
}`,
    takeaway: 'A JWT is signed, not hidden. Put only necessary, non-sensitive claims in it and reject the token if any required validation fails.',
    quizQuestion: 'Does a normal signed JWT encrypt its payload?', quizOptions: ['Yes, always', 'No, the payload is readable', 'Only on weekends', 'Only when expired'], quizAnswer: 1,
    quizExplanation: 'Base64URL encoding is reversible. Signing protects integrity but does not provide confidentiality.',
  }),
  createLesson({
    id: 'jwt-aspnet', title: 'JWT in ASP.NET Core', category: 'JWT Authentication', tags: ['jwt', 'aspnet', 'api'], minutes: 12,
    description: 'Protect API routes and validate bearer tokens.',
    overview: 'ASP.NET Core bearer authentication reads a token from the Authorization header, validates it, and creates a ClaimsPrincipal for the request. Authentication determines who the caller is; authorization decides whether that identity may use an endpoint. Policies express reusable authorization rules.',
    diagramTitle: 'Authenticated API request',
    diagramSteps: [{ label: 'Bearer token', detail: 'Client sends Authorization header' }, { label: 'Authentication', detail: 'Validate token and build identity' }, { label: 'Authorization', detail: 'Evaluate roles, claims, or policy' }, { label: 'Endpoint', detail: 'Run only when access is allowed' }],
    concepts: ['Register authentication and call UseAuthentication before UseAuthorization.', 'Set strict issuer, audience, signing key, and lifetime validation.', 'Use policies for business permissions instead of scattering role checks.', 'Return 401 for missing or invalid identity and 403 for an authenticated caller lacking permission.'],
    exampleIntro: 'This configuration validates the expected token source and protects an endpoint with a policy.',
    language: 'csharp', filename: 'Program.cs',
    example: `builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["Auth:Authority"];
        options.Audience = "devlearn-api";
    });

builder.Services.AddAuthorization(options =>
    options.AddPolicy("CanPublish", policy =>
        policy.RequireClaim("permission", "content:publish")));

app.MapPost("/lessons", PublishLesson).RequireAuthorization("CanPublish");`,
    takeaway: 'Keep signing keys and authority configuration outside source code. Prefer a trusted identity provider or a carefully designed token service over hand-built authentication.',
    quizQuestion: 'What is the difference between 401 and 403?', quizOptions: ['There is none', '401 means unauthenticated; 403 means authenticated but forbidden', '401 is success', '403 means the route is missing'], quizAnswer: 1,
    quizExplanation: 'Authentication failure produces 401; authorization denial for a known identity produces 403.',
  }),
  createLesson({
    id: 'refresh-tokens', title: 'Refresh Tokens', category: 'JWT Authentication', tags: ['jwt', 'security', 'tokens'], minutes: 12,
    description: 'Renew sessions securely without asking users to sign in repeatedly.',
    overview: 'A refresh token is a long-lived credential used to obtain a new short-lived access token. It is opaque to the client and stored securely by the authorization server. Rotation replaces it every time it is used, which makes replay detectable and limits damage when an old token is stolen.',
    diagramTitle: 'Refresh token rotation',
    diagramSteps: [{ label: 'Sign in', detail: 'Issue short access and longer refresh tokens' }, { label: 'Access expires', detail: 'API stops accepting the access token' }, { label: 'Refresh', detail: 'Validate and consume the refresh token' }, { label: 'Rotate', detail: 'Issue a new token pair and revoke the old refresh token' }],
    concepts: ['Store only a strong hash of each refresh token on the server.', 'Bind records to a user, client, expiry, and token family.', 'Rotate on every successful refresh and reject reuse of consumed tokens.', 'Revoke the family on sign-out, password reset, or detected replay.'],
    exampleIntro: 'The service consumes the presented token exactly once before issuing a replacement pair.',
    language: 'csharp', filename: 'TokenService.cs',
    example: `public async Task<TokenPair> RefreshAsync(string presentedToken)
{
    var hash = tokenHasher.Hash(presentedToken);
    var stored = await tokens.FindActiveAsync(hash)
        ?? throw new SecurityException("Invalid refresh token.");

    stored.MarkConsumed(clock.UtcNow);
    var replacement = tokenFactory.CreateRefreshToken(stored.UserId, stored.FamilyId);
    await tokens.AddAsync(replacement.Record);
    await unitOfWork.SaveChangesAsync();

    return tokenFactory.CreatePair(stored.UserId, replacement.PlainText);
}`,
    takeaway: 'Refresh tokens are high-value credentials. Rotate them, store hashes, detect reuse, and keep their transport and browser storage protected.',
    quizQuestion: 'Why rotate a refresh token after every use?', quizOptions: ['To increase font size', 'To make replay of an old token detectable', 'To remove HTTPS', 'To avoid expiration'], quizAnswer: 1,
    quizExplanation: 'A consumed token should never appear again; reuse is evidence that a copy may have been stolen.',
  }),
]
