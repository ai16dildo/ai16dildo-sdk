<div align="center">
  <h1>ai16dildo-SDK</h1>
  <p><strong>The official TypeScript SDK for ai16dildo - the first AI-powered device built on @elizaOS.</strong></p>
</div>

## Installation

```bash
npm install ai16dildo-sdk
README.md

# ai16dildo-sdk

The official TypeScript SDK for ai16dildo - the first AI-powered device built on @elizaOS.

## Installation

```bash
npm install ai16dildo-sdk
Quick Start

import { AI16Dildo } from 'ai16dildo-sdk';

const device = new AI16Dildo({ debug: true });

// Connect via Bluetooth
await device.connect();

// Set intensity (0-100)
await device.setIntensity(50);

// Run patterns
await device.runPattern('wave', 5000);

// AI-powered response
await device.respondToInput('more!');
API Reference
AI16Dildo
Main class for device control.

Constructor Options

interface DeviceConfig {
  debug?: boolean;
  autoConnect?: boolean;
  maxIntensity?: number;
}
Methods
Method	Description
connect()	Connect to device via Bluetooth
disconnect()	Disconnect from device
setIntensity(level)	Set vibration intensity (0-100)
runPattern(type, duration)	Run a vibration pattern
respondToInput(text)	AI analyzes text and responds
Events
Event	Data	Description
connected	-	Device connected
disconnected	-	Device disconnected
intensityChange	number	Intensity level changed
error	Error	An error occurred
Patterns
Available pattern types:

wave - Smooth sine wave
pulse - On/off pulsing
escalate - Gradual increase
random - Random variations
steady - Constant intensity
License
MIT


---

### 7. `docs/API.md`
```markdown
# API Documentation

## Classes

### AI16Dildo

The main controller class.

```typescript
import { AI16Dildo } from 'ai16dildo-sdk';
Constructor

const device = new AI16Dildo(config?: DeviceConfig);
BluetoothManager
Handles Bluetooth Low Energy connections.

AIEngine
Processes natural language input and generates responses.

PatternGenerator
Creates vibration patterns.

Types

interface DeviceConfig {
  debug?: boolean;
  autoConnect?: boolean;
  maxIntensity?: number;
}

interface DeviceStatus {
  connected: boolean;
  batteryLevel: number;
  currentIntensity: number;
}

type PatternType = 'wave' | 'pulse' | 'escalate' | 'random' | 'steady';
Events
The SDK uses an event-driven architecture:


device.on('connected', () => { });
device.on('disconnected', () => { });
device.on('intensityChange', (level: number) => { });
device.on('error', (error: Error) => { });
