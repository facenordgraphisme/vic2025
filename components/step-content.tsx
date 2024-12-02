"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Range, getTrackBackground } from "react-range"; // Slider
import { fetchSanityData } from "../sanity/lib/fetch-sanity-data";

interface StepContentProps {
  step: string;
  value: any;
  onChange: (value: any) => void;
}

const PRICE_MIN = 0;
const PRICE_MAX = 1000;
const PRICE_STEP = 10;

export function StepContent({ step, value, onChange }: StepContentProps) {
  const [data, setData] = useState<{ title: string; value: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schemaMap: Record<string, string> = {
          gender: "gender",
          ageRange: "ageRange",
          occasion: "occasion",
          relation: "relation",
          interests: "interest",
        };

        const schemaType = schemaMap[step];
        if (schemaType) {
          const fetchedData = await fetchSanityData(schemaType);
          setData(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [step]);

  const renderContent = () => {
    switch (step) {
      case "interests":
        return (
          <div className="w-full max-w-md">
            <div className="flex flex-wrap gap-2 justify-center">
              {data.map((interest) => (
                <Badge
                  key={interest.value}
                  variant={value.includes(interest.value) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-rose-100 hover:text-rose-700 text-sm py-2 px-4"
                  onClick={() => {
                    const newInterests = value.includes(interest.value)
                      ? value.filter((i: string) => i !== interest.value)
                      : [...value, interest.value];
                    onChange(newInterests);
                  }}
                >
                  {interest.title}
                </Badge>
              ))}
            </div>
          </div>
        );

      case "priceRange":
        return (
          <div className="w-full max-w-md">
            <h3 className="text-center text-gray-700 mb-4">Choisissez votre budget</h3>
            <Range
              step={PRICE_STEP}
              min={PRICE_MIN}
              max={PRICE_MAX}
              values={[value.min, value.max]}
              onChange={(range) => onChange({ min: range[0], max: range[1] })}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-2 w-full rounded relative"
                  style={{
                    background: getTrackBackground({
                      values: [value.min, value.max],
                      colors: ["#ccc", "#f87171", "#ccc"],
                      min: PRICE_MIN,
                      max: PRICE_MAX,
                    }),
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props, value: thumbValue }) => {
                const { key, ...restProps } = props; // Éviter de propager `key` directement
                return (
                  <div
                    {...restProps}
                    key={key}
                    className="h-6 w-6 rounded-full bg-rose-500 shadow-lg flex items-center justify-center"
                  >
                    <span className="text-xs text-white">{thumbValue}€</span>
                  </div>
                );
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>{value.min}€</span>
              <span>{value.max}€</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full max-w-md grid gap-2">
            {data.map((item) => (
              <Button
                key={item.value}
                variant={value === item.value ? "default" : "outline"}
                className="w-full justify-center h-12 text-lg"
                onClick={() => onChange(item.value)}
              >
                {item.title}
              </Button>
            ))}
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
        className="w-full"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  );
}
