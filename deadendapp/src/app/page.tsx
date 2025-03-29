'use client';

import React, { useEffect } from 'react';

const BrowserInfoPage: React.FC = () => {
  useEffect(() => {
    const getGeolocation = async (): Promise<string> => {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) =>
            resolve(
              `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
            ),
          () => resolve('Permission Denied or Unavailable')
        );
      });
    };

    const getBrowserInfo = async () => {
      const info: Record<string, string | boolean | number> = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookiesEnabled: navigator.cookieEnabled,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: `${window.screen.colorDepth}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hardwareConcurrency: navigator.hardwareConcurrency,
        doNotTrack: navigator.doNotTrack || 'Unavailable',
        online: navigator.onLine,
        pixelDepth: window.screen.pixelDepth,
        loadTime:
          performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        geolocation: await getGeolocation(),
      };

      return info;
    };

    const sendToApi = async (data: Record<string, string | boolean | number>) => {
      try {
        const response = await fetch('/api/main', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status} - ${response.statusText}`);
        }
        console.log('Data successfully sent to API!');
      } catch (error) {
        console.error('Failed to send data to API:', error);
      }
    };

    (async () => {
      try {
        const browserData = await getBrowserInfo();
        await sendToApi(browserData); // Send collected data to the API
      } catch (error) {
        console.error('Failed to fetch or send browser information:', error);
      }
    })();
  }, []);

  return null; // Render nothing, resulting in a blank white page
};

export default BrowserInfoPage;