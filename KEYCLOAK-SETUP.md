# Gym Tracker - Keycloak Setup Instructions

## 🚀 Quick Start

1. **Run the setup script:**
   ```bash
   ./setup.sh
   ```

2. **Access Keycloak Admin Console:**
   - URL: http://localhost:8081/admin
   - Username: `admin`
   - Password: `admin123`

3. **Configure Keycloak Realm:**

### Step 1: Create Realm
- Click "Master" dropdown → Select "Create realm"
- Realm name: `gym-tracker`
- Click "Create"

### Step 2: Create Client
- Navigate to "Clients" in the new realm
- Click "Create client"
- Client ID: `gym-tracker-app`
- Client protocol: `openid-connect`
- Root URL: `http://localhost:8080`
- Click "Next"
- Access type: `confidential`
- Standard flow enabled: `ON`
- Direct access grants enabled: `ON`
- Service accounts enabled: `ON`
- Click "Next"
- Valid redirect URIs: `http://localhost:8080/login/oauth2/code/keycloak`
- Valid post logout redirect URIs: `http://localhost:8080/*`
- Click "Save"

### Step 3: Get Client Credentials
- Click on the "Credentials" tab for your client
- Copy the **Client Secret** (you'll need this for the environment variable)

### Step 4: Update Environment Variables (Optional)
If you changed the client secret, update your `docker-compose.yaml`:
```yaml
KEYCLOAK_CLIENT_SECRET: your-new-client-secret
```

### Step 5: Create Test User
- Navigate to "Users"
- Click "Create new user"
- Username: `testuser`
- Email: `test@example.com`
- Click "Create"
- Go to "Credentials" tab
- Set password: `test123`
- Set "Temporary" to OFF
- Click "Set password"

## 🔗 Test Authentication

1. **Restart your application:**
   ```bash
   docker-compose restart gym-tracker
   ```

2. **Access the OAuth2 login:**
   - Open: http://localhost:8080/oauth2/authorization/keycloak
   - You should be redirected to Keycloak login page
   - Login with `testuser` / `test123`

3. **Access protected endpoints:**
   - http://localhost:8080/api/auth/login-success (should redirect after successful login)

## 🛠 Development Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f gym-tracker
docker-compose logs -f keycloak

# Stop all services
docker-compose down

# Restart backend
docker-compose restart gym-tracker
```

## 📊 Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Gym Tracker Backend | http://localhost:8080 | OAuth2 via Keycloak |
| Keycloak Admin Console | http://localhost:8081/admin | admin / admin123 |
| PostgreSQL | localhost:5432 | klaus / P@ssw0rd! |

## 🔧 Configuration Details

### Keycloak Client Configuration
- **Client ID**: `gym-tracker-app`
- **Client Secret**: `gym-tracker-secret` (default)
- **Redirect URI**: `http://localhost:8080/login/oauth2/code/keycloak`
- **Scopes**: `openid`, `profile`, `email`

### Spring Boot Configuration
Your Spring Boot app is configured with these OAuth2 properties:
```properties
spring.security.oauth2.client.registration.keycloak.client-id=gym-tracker-app
spring.security.oauth2.client.registration.keycloak.client-secret=gym-tracker-secret
spring.security.oauth2.client.registration.keycloak.scope=openid,profile,email
spring.security.oauth2.client.provider.keycloak.issuer-uri=http://localhost:8081/realms/gym-tracker
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is healthy: `docker-compose ps`
- Check database logs: `docker-compose logs db`

### Keycloak Issues
- Verify Keycloak is running: `curl http://localhost:8081/health/ready`
- Check Keycloak logs: `docker-compose logs keycloak`

### Authentication Issues
1. Verify client configuration in Keycloak
2. Check redirect URI matches exactly
3. Ensure client secret is correct
4. Verify user has the correct roles

## 📚 What's Next?

1. **Enhance User Entity**: Update your User entity to store Keycloak subject ID
2. **User Provisioning**: Implement automatic user creation on first login
3. **Role-Based Access**: Add role-based authorization using Keycloak roles
4. **JWT Token Handling**: Configure resource server for API validation
5. **Frontend Integration**: Set up Angular OAuth2 client

## 🎯 Benefits of This Setup

- **Free Forever**: No usage limits or costs
- **Full Control**: Self-hosted, you own the data
- **Enterprise Features**: MFA, SSO, user management
- **Docker-Native**: Fits perfectly with your existing setup
- **Standard Compliant**: Uses OAuth2/OIDC standards