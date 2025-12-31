import { useEffect, useMemo, useState } from "react";
import { InputField } from "./InputField";
import { ErrorIcon } from "../icons";

export interface ISelectItem {
  label: string;
  code: string;
  [key: string]: unknown;
}
export interface SelectProps {
  items: ISelectItem[];
  onChange: (value: unknown) => void;
  selectedItem: string;
  searchable?: boolean;
  placeholder?: string;
  emptyItemsMessage?: string;
  selectedColor?: string;
  selectedBackground?: string;
}

export const Select: React.FC<SelectProps> = ({
  items = [],
  selectedItem,
  onChange,
  searchable = false,
  placeholder,
  emptyItemsMessage,
  selectedColor = "#fff",
  selectedBackground = "#000",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [itemsFiltered, setItemsFiltered] = useState<ISelectItem[] | []>(items);

  const onChangeInput = (event?: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event?.target.value ?? "");
  };

  useEffect(() => {
    setItemsFiltered(
      items.filter(
        (item) =>
          item.label
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase()) ||
          item.code.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      )
    );
  }, [inputValue, items]);

  const finalPlaceHolder = placeholder || "Filtrar opciones";
  const selectSizeClassName = useMemo(
    () => (itemsFiltered.length * 68 >= 350 ? "long no-scroll" : ""),
    [itemsFiltered]
  );

  return (
    <section className="select-component">
      {searchable && (
        <InputField
          type="text"
          value={inputValue}
          name="select-input"
          onChange={onChangeInput}
          label={finalPlaceHolder}
        />
      )}
      <section
        className={`select-container ${selectSizeClassName}`}
        style={
          {
            "--sbg": selectedBackground,
            "--scolor": selectedColor,
          } as React.CSSProperties & {
            [key: string]: string;
          }
        }
      >
        <section className="select-wrapper">
          {itemsFiltered.map((item, index) => (
            <section
              key={`${item.code}-${index}`}
              className={`select-item ${
                item.code.toLocaleLowerCase() ===
                selectedItem.toLocaleLowerCase()
                  ? "active"
                  : ""
              }`}
              onClick={() => onChange(item)}
            >
              {item.label}
            </section>
          ))}
          {!itemsFiltered.length && (
            <section className="select-item empty-item">
              <ErrorIcon size={16} />
              {emptyItemsMessage}
            </section>
          )}
        </section>
      </section>
    </section>
  );
};
