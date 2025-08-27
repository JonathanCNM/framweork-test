const buildSlots = (slots = 3) => new Array(slots * slots).fill("");

const DesignLayout = () => {
  const slots = buildSlots();
  return (
    <section className="layout-design">
      {slots.map((_, index) => (
        <section key={index} className="layout-design-slot" />
      ))}
    </section>
  );
};

export default DesignLayout;
