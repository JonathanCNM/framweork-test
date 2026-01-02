import { useEffect, useMemo, useState } from "react";
import { InputField } from "./InputField";
import { Close, EditIcon, ErrorIcon } from "../icons";

export interface ISelectItem {
  label: string;
  code: string;
  [key: string]: unknown;
}
export interface SelectProps {
  items: ISelectItem[];
  onChange: (value: unknown) => void;
  onUpdate?: (value: unknown) => void;
  onDelete?: (value: unknown) => void;
  selectedItem: string;
  searchable?: boolean;
  placeholder?: string;
  emptyItemsMessage?: string;
  selectedColor?: string;
  selectedBackground?: string;
  editable?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  items = [],
  selectedItem,
  onChange,
  onUpdate = () => {},
  onDelete = () => {},
  searchable = false,
  placeholder,
  emptyItemsMessage,
  selectedColor = "#fff",
  selectedBackground = "#000",
  editable = false,
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
              className={`select-item ${editable ? "edit" : ""} ${
                item.code.toLocaleLowerCase() ===
                selectedItem.toLocaleLowerCase()
                  ? "active"
                  : ""
              }`}
              onClick={() => onChange(item)}
            >
              {item.label}
              {editable && (
                <section className="action-btns">
                  <EditIcon
                    size={20}
                    onClick={() => onUpdate(item)}
                    colors={["#69adff", "#69adff"]}
                  />
                  <Close
                    size={20}
                    onClick={() => onDelete(item)}
                    colors={["#fd2a35", "#fd2a35"]}
                  />
                </section>
              )}
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
