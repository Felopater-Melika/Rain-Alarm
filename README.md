# Rain Alarm App

## Description

The Rain Alarm App is a weather-based alarm system that alerts users when it's going to rain. The app uses weather data to forecast rain and schedules an alarm to notify the user. It's a handy tool for anyone who needs to plan their day around the weather, such as pet owners, gardeners, or outdoor enthusiasts.

## Features

- Fetches weather data to predict rain.
- Schedules an alarm based on the rain forecast.
- Allows users to acknowledge the alarm.
- Users can select a music file to play when the alarm goes off.

## How to Use

1. The app fetches weather data from a weather API.
2. It checks the forecast for any upcoming rain.
3. If rain is forecasted, it schedules an alarm to alert the user.
4. The user can acknowledge the alarm to stop it from going off.
5. Users can also select a music file to play when the alarm goes off.

## Installation

To install the app, clone the repository and install the dependencies:

```
git clone https://github.com/your-repo/rain-alarm-app.git
cd rain-alarm-app
npm install
```

Then, start the app:

```
npm start
```

## Future Improvements (TODOs)

- **Better Time Formatting:** Improve the way the app displays the time of the rain forecast. Currently, it shows the time in a raw format, which can be hard to understand. The goal is to display the time in a more user-friendly format.

- **Dark Theme:** Implement a dark theme for the app. This will make it easier to use in low-light conditions and provide a more comfortable viewing experience for users who prefer dark mode.

- **Alarm Off Feature:** Add a feature that allows users to turn off the alarm. Currently, the alarm can only be acknowledged, but not turned off. This feature will give users more control over the alarm.
