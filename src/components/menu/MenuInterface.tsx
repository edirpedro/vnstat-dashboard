import useReports from "hooks/useReports";
import { ISettings } from "hooks/useSettings";

const MenuInterface = ({ iface, item }: Props) => {
  const { changeReports } = useReports();

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.checked) iface.push(e.target.value);
    else iface.splice(iface.indexOf(e.target.value), 1);
    if (iface.length) {
      const name = iface.join("+");
      changeReports(name);
    }
  }

  return (
    <li>
      <button key={item.name} onClick={() => changeReports(item.name)}>
        {item.alias == "" ? item.name : item.alias}
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

type Props = {
  iface: string[];
  item: ISettings.Iface;
};
