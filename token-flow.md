App Launch
│
▼
Read token from Keychain
│
├── No token
│ │
│ ▼
│ Show Login
│
▼
Token found
│
▼
Call GET /get-profile
│
├── 200 OK
│ │
│ ▼
│ Token is valid
│ Store profile in Redux
│ isAuthenticated = true
│ Navigate to App
│
└── 401 Unauthorized
│
▼
Token is invalid/expired
Delete token from Keychain
Clear Redux
isAuthenticated = false
Navigate to Login
