import { useEffect, useMemo, useState } from "react";
import { InputField } from "./InputField";
import { ErrorIcon } from "../icons";

export interface ISelectItem {
  label: string;
  code: string;
}
export interface SelectProps {
  items: ISelectItem[] | [];
  onClick: (code: string, index: number) => void;
  selectedItem: string;
  top: number;
  search?: boolean;
  placeholder?: string;
  emptyItemsMessage?: string;
  selectedColor?: string;
  selectedBackground?: string;
}

export const Select: React.FC<SelectProps> = ({
  top,
  items = [],
  selectedItem,
  onClick,
  search = false,
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
      {search && (
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
          {itemsFiltered.map(({ label, code }, index) => (
            <section
              key={code}
              className={`select-item ${
                code.toLocaleLowerCase() === selectedItem.toLocaleLowerCase()
                  ? "active"
                  : ""
              }`}
              onClick={() => onClick(code, index)}
            >
              {label}
            </section>
          ))}
          <span
            style={
              { "--top": top } as React.CSSProperties & {
                [key: string]: number;
              }
            }
            className="select-selector"
          />
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
