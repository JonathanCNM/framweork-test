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

  const onSelectItem = (itemSelected: unknown) => {
    const item = items.find((item) => item.code === itemSelected);
    if (item) {
      setSelectedItem(item.code);
    }
  };

  const onSelectSearchItem = (itemSelected: unknown) => {
    const item = items.find((item) => item.code === itemSelected);
    if (item) {
      setSelectedSearchItem(item.code);
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
            items={items}
            onChange={onSelectItem}
            selectedItem={selectedItem}
            selectedBackground={gradient}
          />
        </section>
        <section>
          <Title title="Select con search input" />
          <Select
            searchable
            items={items}
            onChange={onSelectSearchItem}
            selectedBackground={gradient}
            selectedItem={selectedSearchItem}
            emptyItemsMessage={emptyItemsMessage}
          />
        </section>
      </Layout.Content>
    </Layout>
  );
};
