import { useState } from "react";
import { Layout, Select, Title } from "../../components";
import { useGradient } from "../../store/useGradient";

const items = [
  { label: "Pera", code: "1" },
  { label: "Manzana", code: "2" },
  { label: "Sandia", code: "3" },
  { label: "Limón", code: "4" },
];

export const SelectDemo = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSearchItem, setSelectedSearchItem] = useState("");
  const [top, setTop] = useState(-1);
  const [topSearch, setTopSearch] = useState(-1);

  const onSelectItem = (itemSelected: string, index: number) => {
    const item = items.find((item) => item.code === itemSelected);
    if (item) {
      setSelectedItem(item.code);
      setTop(index);
    }
  };

  const onSelectSearchItem = (itemSelected: string, index: number) => {
    const item = items.find((item) => item.code === itemSelected);
    if (item) {
      setSelectedSearchItem(item.code);
      setTopSearch(index);
    }
  };
  const emptyItemsMessage = "No se encontraron items...!";
  const { gradient } = useGradient();

  return (
    <Layout>
      <Layout.Content>
        <section>
          <Title title="Select sin search" />
          <Select
            top={top}
            items={items}
            onClick={onSelectItem}
            selectedItem={selectedItem}
            selectedBackground={gradient}
          />
        </section>
        <section>
          <Title title="Select con search input" />
          <Select
            search
            items={items}
            top={topSearch}
            onClick={onSelectSearchItem}
            selectedBackground={gradient}
            selectedItem={selectedSearchItem}
            emptyItemsMessage={emptyItemsMessage}
          />
        </section>
      </Layout.Content>
    </Layout>
  );
};
