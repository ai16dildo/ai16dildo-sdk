import { AI16Dildo } from '../src';

async function main() {
  // Initialize the device
  const device = new AI16Dildo({
    debug: true,
    autoConnect: false
  });

  // Listen to events
  device.on('connected', () => {
    console.log('✅ Device connected!');
  });

  device.on('intensityChange', (level: number) => {
    console.log(`📊 Intensity: ${level}%`);
  });

  device.on('error', (error: Error) => {
    console.error('❌ Error:', error.message);
  });

  try {
    // Connect to device
    await device.connect();

    // Set intensity
    await device.setIntensity(50);

    // Run a pattern
    await device.runPattern('wave', 5000);

    // AI-powered response
    await device.respondToInput('yes more!');

  } catch (error) {
    console.error('Failed:', error);
  }
}

main();
