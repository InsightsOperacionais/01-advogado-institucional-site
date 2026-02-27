// IoInput.tsx
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../shadcnui/base/button";
import {
  formatValue,
  unFormatValue,
  validateFormat,
  type FormatPattern,
} from "./io-input-formatters";

type InputVariant = "default" | "password" | "leftIcon" | "rightIcon";

interface IoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelClassName?: string;
  fixedLabel?: boolean;
  variant?: InputVariant;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  format?: FormatPattern;
  formattedValue?: boolean;
}

const variantClasses: Record<InputVariant, string> = {
  default: "",
  password: "pr-10",
  leftIcon: "pl-10",
  rightIcon: "pr-10",
};

/**
 * Componente de input personalizado com suporte a formatação
 * @param {string} format - Padrão de formatação (ex: "##/##/####" para datas)
 * @param {boolean} formattedValue - Se true, retorna valor formatado no onChange
 */
const IoInput = React.forwardRef<HTMLInputElement, IoInputProps>(
  (
    {
      className,
      label,
      labelClassName,
      fixedLabel = false,
      type = "text",
      variant = "default",
      leftIcon,
      rightIcon,
      format,
      formattedValue = false,
      onChange,
      value: propValue = "",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const generatedId = React.useId();
    const inputId = props.id ?? generatedId;

    useEffect(() => {
      validateFormat(format);
      const currentValue = String(propValue || "");

      if (displayValue === currentValue && !format) return;

      const newValue = format
        ? formatValue(unFormatValue(currentValue, format), format)
        : currentValue;

      if (newValue !== displayValue) {
        setDisplayValue(newValue);
      }
    }, [propValue, format]);

    const handleNumberInput = (
      value: string,
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setDisplayValue(value);
      if (onChange) {
        const numericValue = value === "" ? "" : Number(value);
        const syntheticEvent = {
          ...event,
          target: {
            ...event.target,
            value: numericValue,
          },
        };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const propagateChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string,
    ) => {
      if (!onChange) return;

      const valueToReturn = formattedValue
        ? value
        : unFormatValue(value, format);

      const syntheticEvent = {
        ...event,
        target: {
          ...event.target,
          value: valueToReturn,
        },
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (type === "number") {
        handleNumberInput(inputValue, e);
        return;
      }

      const newDisplayValue = format
        ? formatValue(unFormatValue(inputValue, format), format)
        : inputValue;

      setDisplayValue(newDisplayValue);
      propagateChange(e, newDisplayValue);
    };

    const isFixedLabel = fixedLabel;
    const disabledPassword = !propValue || props.disabled;

    const baseInputProps = {
      id: inputId,
      type,
      placeholder: label ? " " : props.placeholder,
      className: cn(
        "peer bg-transparent text-io-text-primary focus:shadow-outline placeholder:text-io-input-placeholder flex h-[56px] w-full rounded-lg border border-io-input-border  px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        type === "number" ? "appearance-none" : "",
        className,
      ),
      ref,
      ...props,
      value: displayValue,
      onChange: handleChange,
    };

    const labelElement = label && (
      <label
        htmlFor={inputId}
        className={cn(
          "bg-io-card text-io-input-border pointer-events-none absolute start-2 top-2 origin-[0] -translate-y-4 scale-75 transform rounded-md px-2 text-sm duration-300",
          !isFixedLabel &&
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100",
          "peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
          labelClassName,
        )}
      >
        {label}
      </label>
    );

    const passwordToggle = (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabledPassword}
        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      >
        {showPassword && !disabledPassword && (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        )}
        {!showPassword && !disabledPassword && (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    );

    return (
      <>
        {variant === "default" && (
          <div className="relative">
            <input {...baseInputProps} />
            {labelElement}
          </div>
        )}

        {variant === "password" && (
          <div className="relative">
            <input
              {...baseInputProps}
              type={showPassword ? "text" : "password"}
              placeholder={
                isFixedLabel
                  ? props.placeholder
                  : label
                    ? " "
                    : props.placeholder
              }
            />
            {passwordToggle}
            {labelElement}
          </div>
        )}

        {variant === "leftIcon" && (
          <div className="relative">
            {leftIcon && (
              <div className="text-io-text-secondary absolute inset-y-0 top-1 left-0 flex items-center pl-3">
                {leftIcon}
              </div>
            )}
            <input
              {...baseInputProps}
              className={cn(baseInputProps.className, "pl-10")}
            />
            {labelElement}
          </div>
        )}

        {variant === "rightIcon" && (
          <div className="relative">
            {rightIcon && (
              <div className="text-io-text-secondary absolute inset-y-0 top-1 right-0 flex items-center pr-3">
                {rightIcon}
              </div>
            )}
            <input {...baseInputProps} />
            {labelElement}
          </div>
        )}
      </>
    );
  },
);

IoInput.displayName = "IoInput";

export { IoInput };
