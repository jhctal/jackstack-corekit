"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export default function Select({
  options,
  value,
  defaultValue,
  placeholder = "Select an option...",
  disabled = false,
  className = "",
  onChange,
  onFocus,
  onBlur,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    value || defaultValue || "",
  );
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Update selected value when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      const enabledOptions = options.filter((option) => !option.disabled);

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => {
            const nextIndex = prev < enabledOptions.length - 1 ? prev + 1 : 0;
            return nextIndex;
          });
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => {
            const prevIndex = prev > 0 ? prev - 1 : enabledOptions.length - 1;
            return prevIndex;
          });
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < enabledOptions.length) {
            handleOptionSelect(enabledOptions[focusedIndex].value);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setFocusedIndex(-1);
          selectRef.current?.focus();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, focusedIndex, options]);

  const handleToggle = () => {
    if (disabled) return;

    setIsOpen(!isOpen);
    if (!isOpen) {
      onFocus?.();
      // Set focus to currently selected option or first option
      const selectedIndex = options.findIndex(
        (option) => option.value === selectedValue,
      );
      setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    } else {
      onBlur?.();
      setFocusedIndex(-1);
    }
  };

  const handleOptionSelect = (optionValue: string) => {
    const selectedOption = options.find(
      (option) => option.value === optionValue,
    );
    if (selectedOption?.disabled) return;

    setSelectedValue(optionValue);
    setIsOpen(false);
    setFocusedIndex(-1);
    onChange?.(optionValue);
    onBlur?.();
    selectRef.current?.focus();
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue,
  );
  const displayText = selectedOption?.label || placeholder;

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        className={`
          relative w-full min-h-[2.5rem] px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${
            disabled
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "hover:border-gray-400 cursor-pointer"
          }
          ${isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""}
        `}
        onClick={handleToggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="select-label"
      >
        <span
          className={`block truncate ${
            !selectedOption ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {displayText}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          ref={optionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
          role="listbox"
        >
          {options.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No options available
            </div>
          ) : (
            options.map((option, index) => {
              const isSelected = option.value === selectedValue;
              const isFocused = index === focusedIndex;

              return (
                <div
                  key={option.value}
                  className={`
                    relative cursor-pointer select-none py-2 pl-3 pr-9 text-sm
                    ${
                      option.disabled
                        ? "text-gray-400 cursor-not-allowed bg-gray-50"
                        : isFocused
                          ? "bg-blue-50 text-blue-900"
                          : isSelected
                            ? "bg-blue-100 text-blue-900"
                            : "text-gray-900 hover:bg-gray-50"
                    }
                  `}
                  onClick={() => handleOptionSelect(option.value)}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled}
                >
                  <span
                    className={`block truncate ${
                      isSelected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
