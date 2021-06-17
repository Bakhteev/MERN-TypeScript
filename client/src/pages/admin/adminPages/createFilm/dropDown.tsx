import { useState } from 'react'

interface DropDownProps {
  items: DropDownItems[]
  keyWord: string
  chooseItem: Function
  state: DropDownItems[] | []
  setState: Function
}

interface DropDownItems {
  name: string
  _id: string
}

const DropDown: React.FC<DropDownProps> = ({
  items,
  keyWord,
  chooseItem,
  state,
  setState,
}) => {
  const [choosedItem, setChoosedItem] = useState<any>({ name: '', _id: '' })
  const [choosedItems, setChoosedItems] = useState<any[]>([])
  const [active, setActive] = useState<boolean>(false)

  const handleActive = (item: any) => {
    // setActive(active ? false : true)
    setChoosedItems([...choosedItems, item._id])
    setChoosedItem(item)
    chooseItem(item._id, setState)
  }

  const aaaa = (item: DropDownItems) => {
    // const activeClassName1 = state.filter((choosedItem) => item === choosedItem)
    const activeClassName = state.find(() => item)
    if (activeClassName) {
      return true
    }
    return false
  }

  // const activeClassName = state.filter()

  return (
    <div
      className={`dropdown ${active ? 'active' : ''}`}
      onClick={() => {
        setActive(active ? false : true)
      }}
    >
      <span className="dropdown__choosed flex">
        {choosedItem.name || `Выберите ${keyWord}`}
      </span>
      {items.map((item: DropDownItems) => (
        <div
          className={`dropdown__item ${
            choosedItems.filter((id) => id === item._id)[0] === item._id
              ? 'active'
              : ''
          }`}
          key={item._id}
          onClick={() => handleActive(item)}
        >
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default DropDown
