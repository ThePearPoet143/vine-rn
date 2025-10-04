# Vine

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Development Setup

### Prerequisites

- Node.js (v16.20.0 or later)
- [EAS CLI](https://docs.expo.dev/eas-update/getting-started/#install-eas-cli) installed globally: `npm install -g eas-cli`
- Expo account (sign up at [expo.dev](https://expo.dev))

### Initial Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Log in to Expo**

   ```bash
   eas login
   ```

3. **Build the development client**

   For iOS (physical device):
   ```bash
   eas build --profile development --platform ios
   ```

   This will create a development build that you can install on your device via the link provided after the build completes.

### Running the Development Server

#### For Physical Devices (Recommended)

Physical devices require tunneling to connect to your development server:

```bash
npx expo start --tunnel
```

This will:
- Start the Metro bundler
- Create an ngrok tunnel for remote access
- Display a QR code

**To connect your device:**
1. Scan the QR code with your iPhone's camera
2. Tap the notification to open in the development build app
3. The app will connect to your development server

#### For Simulators/Emulators

If you're using the iOS Simulator or Android Emulator, you can start without tunneling:

```bash
npx expo start
```

Then press:
- `i` - to open iOS simulator
- `a` - to open Android emulator
- `w` - to open web

### Development Workflow

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

The app uses:
- **Expo Router** for navigation
- **React Native Reanimated** for animations
- **Expo Dev Client** for custom development builds

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
