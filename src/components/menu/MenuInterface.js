import React from "react";

const MenuInterface = ({ iface, item, changeReports }) => {
  function handleCheckbox(e) {
    if (e.target.checked) iface.push(e.target.value);
    else iface.splice(iface.indexOf(e.target.value), 1);
    if (iface.length) {
      const name = iface.join("+");
      changeReports(name);
    }
  }

  return (
    <li className="menu__list-item">
      <button key={item.name} onClick={() => changeReports(item.name)}>
        {item.alias ?? item.name}
      </button>
      <input
        type="checkbox"
        onChange={handleCheckbox}
        value={item.name}
        checked={iface.includes(item.name)}
      />
    </li>
  );
};

export default MenuInterface;
