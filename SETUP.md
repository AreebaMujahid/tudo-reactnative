# ProductionApp — Setup Guide

Production-ready React Native CLI application with TypeScript, Redux Toolkit, React Query, React Navigation, and a complete auth flow.

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20 LTS+ |
| JDK | 17 |
| Android Studio | SDK 34+, Build Tools |
| Xcode (macOS) | 15+ |
| CocoaPods (macOS) | Latest |

### Windows environment variables

```powershell
ANDROID_HOME = C:\Users\<You>\AppData\Local\Android\Sdk
Path += %ANDROID_HOME%\platform-tools
Path += %ANDROID_HOME%\emulator
```

---

## Quick Start

```bash
cd ProductionApp
npm install
npm start
npm run android   # Windows / Linux / macOS
npm run ios       # macOS only
```

---

## Project Creation (Reference)

```bash
npx @react-native-community/cli@latest init ProductionApp --version 0.76.9
cd ProductionApp
```

---

## Installed Dependencies

### Navigation
- `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs`
- `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`, `react-native-reanimated`

### State
- `@reduxjs/toolkit`, `react-redux`, `redux-persist`, `@react-native-async-storage/async-storage`

### API
- `axios`, `@tanstack/react-query`

### Forms
- `react-hook-form`, `yup`, `@hookform/resolvers`

### Storage & Security
- `react-native-keychain`, `react-native-config`

### Notifications
- `@react-native-firebase/app`, `@react-native-firebase/messaging`, `@notifee/react-native`

### Media
- `react-native-image-picker`, `react-native-document-picker`

### Utilities
- `react-native-vector-icons`, `react-native-svg`, `react-native-device-info`, `react-native-permissions`, `react-native-toast-message`

### Dev Tools
- `eslint`, `prettier`, `husky`, `lint-staged`, `babel-plugin-module-resolver`

---

## Folder Structure

```
src/
├── App.tsx
├── api/              # Axios client, React Query config
├── assets/           # Images, fonts
├── components/       # Button, Input, Loader, EmptyState, Modal, Header
├── constants/        # Routes, storage keys
├── features/         # Feature modules (auth slice, API)
├── hooks/            # useAuth, useAppDispatch
├── navigation/       # Root, Auth, Main navigators
├── screens/          # Splash, Login, Register, Home, Profile, Settings
├── services/         # Storage, keychain, notifications
├── store/            # Redux store + persist
├── theme/            # Colors, spacing, typography
├── types/            # Shared TypeScript types
└── utils/            # Error handler, validation schemas
```

---

## Configuration

### Environment Variables

Copy `.env.example` to `.env`:

```env
API_BASE_URL=https://api.dev.example.com
APP_ENV=development
```

### Path Aliases

Configured in `babel.config.js` and `tsconfig.json`:

| Alias | Path |
|-------|------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@screens/*` | `src/screens/*` |
| `@navigation/*` | `src/navigation/*` |
| `@store/*` | `src/store/*` |
| `@features/*` | `src/features/*` |
| `@api/*` | `src/api/*` |

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Add Android app with package `com.productionapp`
3. Download `google-services.json` → `android/app/google-services.json`
4. Add iOS app and download `GoogleService-Info.plist` → add to Xcode project
5. Replace the placeholder `google-services.json` before production builds

### iOS Pod Install (macOS)

```bash
cd ios
pod install
cd ..
npm run ios
```

---

## Auth Flow

```
Splash (hydrate) → Login/Register → Main Tabs (Home, Profile, Settings) → Logout → Login
```

- **Redux Persist** keeps session across app restarts
- **Keychain** stores auth tokens securely
- **Protected routes** in `RootNavigator` switch between Auth and Main stacks
- **Mock auth API** in `src/features/auth/authApi.ts` — replace with real endpoints

### Test Credentials (Mock)

- Any valid email format
- Password minimum 8 characters

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS (macOS) |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm test` | Run Jest tests |

---

## Android Setup Notes

- `react-native-config` dotenv applied in `android/app/build.gradle`
- Vector icons fonts linked via `fonts.gradle`
- Firebase Google Services plugin configured
- Permissions added for notifications, camera, media

## iOS Setup Notes

- `use_frameworks! :linkage => :static` for Firebase
- Run `pod install` after any native dependency change
- Add `GoogleService-Info.plist` to Xcode

---

## Best Practices

1. **State split**: Redux for auth/session; React Query for server data
2. **Feature modules**: Keep domain logic in `src/features/`
3. **Typed navigation**: Use param lists in `src/navigation/types.ts`
4. **Security**: Never commit `.env` or real Firebase config files
5. **Error handling**: Centralized in `src/utils/errorHandler.ts` + Toast
6. **Testing**: Jest + mocks for native modules; add Detox/Maestro for E2E
7. **CI/CD**: Use GitHub Actions + Fastlane for automated builds

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Metro cache errors | `npm start -- --reset-cache` |
| Android build fails | `cd android && ./gradlew clean && cd ..` |
| Pod install fails | `cd ios && pod deintegrate && pod install` |
| Reanimated errors | Ensure reanimated plugin is **last** in `babel.config.js` |
| Path alias not resolving | Restart Metro after changing `babel.config.js` |

---

## Next Steps

1. Replace mock auth API with real backend endpoints
2. Add Firebase credentials for push notifications
3. Configure app signing for release builds
4. Add Sentry/Crashlytics for production monitoring
5. Set up CI/CD pipeline
