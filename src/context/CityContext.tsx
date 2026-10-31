"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";

interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  deliveryFee: number;
  availableCities: typeof siteConfig.cities;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCity, setSelectedCityState] = useState<string>("Delhi");

  useEffect(() => {
    const saved = localStorage.getItem("bloomora_selected_city");
    if (saved) {
      setSelectedCityState(saved);
    }
  }, []);

  const setSelectedCity = (city: string) => {
    setSelectedCityState(city);
    localStorage.setItem("bloomora_selected_city", city);
  };

  const cityObj = siteConfig.cities.find(
    (c) => c.name.toLowerCase() === selectedCity.toLowerCase()
  );
  const deliveryFee = cityObj ? cityObj.deliveryFee : 0;

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        deliveryFee,
        availableCities: siteConfig.cities,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
