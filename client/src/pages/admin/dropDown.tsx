import { useState } from 'react'

interface DropDownProps {
  items: DropDownItems[]
  keyWord: string
  chooseItem: Function
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
  setState,
}) => {
  const [active, setActive] = useState<any>({ name: '', _id: '' })

  const handleActive = (item: any) => {
    setActive(item)
    chooseItem(item, setState)
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <span>{active.name || `Выберите ${keyWord}`}</span>
      {items.map((item) => (
        <div key={item._id} onClick={() => handleActive(item)}>
          {item.name}
        </div>
      ))}
    </div>
  )
}

export default DropDown
