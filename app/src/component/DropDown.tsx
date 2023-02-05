import { useState, useEffect } from 'react'

const data = ["Hamburg", "Munich"];

interface IProps {
  selectedTab: string,
  setSelectedTab: Function
}
const Dropdown = ({selectedTab, setSelectedTab} : IProps) => {
  const [isOpen, setOpen] = useState(false);
  console.log("**** selectedTab **** ", selectedTab)
  const toggleDropdown = () => setOpen(!isOpen);
  
  return (
    <>
    <style jsx>
        {`
        .dropdown {
            margin-top: 70px;
            width: 300px;
            height: 50px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,.1);
            background-color: rgba(255, 99, 132, 0.5);
            color: white;
          }
          
          .dropdown-header {
            padding: 15px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .dropdown-body {
            padding: 5px;
            border-top: 1px solid #E5E8EC;
            display: none;
          }
          
          .dropdown-body.open {
            display: block;
            background: rgba(255, 99, 132, 0.5);
            color: white;
            border-radius: 8px;
          }
          
          .dropdown-item {
            padding: 10px;
          }
          
          .dropdown-item:hover {
            cursor: pointer;
          }
          
          .dropdown-item-dot {
            opacity: 0;
            color: #91A5BE;
            transition: all .2s ease-in-out;
          }
          
          .dropdown-item-dot.selected {
            opacity: 1;
          }
          
          .icon {
            font-size: 13px;
            color: #91A5BE;
            transform: rotate(0deg);
            transition: all .2s ease-in-out;
          }
          
          .icon.open {
            transform: rotate(90deg);
          }
          `}
    </style>
    <div className='dropdown'>
      <div className='dropdown-header' onClick={toggleDropdown}>
        {selectedTab}
        <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
      </div>
      <div className={`dropdown-body ${isOpen && 'open'}`}>
        {data.map(item => (
          <div className="dropdown-item" onClick={e => {setSelectedTab(e.target.innerText); toggleDropdown()}} key={item}>
            <span className={`dropdown-item-dot ${item == selectedTab && 'selected'}`}></span>
            {item}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Dropdown;