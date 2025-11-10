import { useState, useRef, useEffect } from "react";

export interface SelectItem {
  label: string;
  code: string;
}

export interface SearchSelectProps {
  searchable?: boolean;
  items: SelectItem[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  color?: string;
  isValid?: boolean;
  inactiveColor?: string;
  activeColor?: string;
  errorColor?: string;
  background?: string;
}

export const SearchSelect: React.FC<SearchSelectProps> = ({
  searchable = true,
  items,
  value,
  onChange,
  placeholder = "Select an option...",
  color = "#222",
  isValid = true,
  inactiveColor = "#979797",
  activeColor = "#000",
  errorColor = "#fd2a35",
  emptyMessage = "No results found",
  background = "#fff",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openUpwards, setOpenUpwards] = useState(false);
  const ref = useRef<HTMLOptionElement>(null);

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      if (spaceBelow < 200 && spaceAbove > spaceBelow) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    }
  }, [isOpen]);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
    setSearch("");
  };

  const selectedItem = items.find((item) => item.code === value);

  const showLabel = isOpen || search.length || !!value;
  const styles = {
    "--color": !isValid
      ? errorColor
      : isOpen
      ? activeColor
      : showLabel
      ? color
      : inactiveColor,
    "--bg": background,
  };

  return (
    <section
      className="search-select-component"
      ref={ref}
      style={
        styles as React.CSSProperties & {
          [key: string]: string;
        }
      }
    >
      <section
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        className="search-select-component-preview"
      >
        <span className="text-gray-700">
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <svg
          className={`${isOpen ? "active" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </section>

      {isOpen && (
        <section
          className={`search-select-component-container
            ${openUpwards ? "open-top" : "open-bottom"}`}
        >
          {searchable && (
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className=""
            />
          )}

          <ul className="search-select-component-container-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <li
                  key={item.code}
                  onClick={() => handleSelect(item.code)}
                  className={`search-select-component-container-list-item ${
                    value === item.code ? "active" : ""
                  }`}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="search-select-component-container-list-empty-item">
                {emptyMessage}
              </li>
            )}
          </ul>
        </section>
      )}
    </section>
  );
};
