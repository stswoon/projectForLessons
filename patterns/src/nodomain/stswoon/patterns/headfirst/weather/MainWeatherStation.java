package nodomain.stswoon.patterns.headfirst.weather;

import nodomain.stswoon.patterns.headfirst.weather.data.WeatherData;
import nodomain.stswoon.patterns.headfirst.weather.display.CurrentConditionDisplay;

public class MainWeatherStation {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        CurrentConditionDisplay currentConditionDisplay = new CurrentConditionDisplay(weatherData);

        weatherData.setMeasurements(0, 1, 2);
        weatherData.setMeasurements(3, 4, 5);
    }
}
